<template>
  <div class="admin-shell">
    <aside class="admin-menu">
      <div class="admin-brand">ARMELIN <small>ADMINISTRAÇÃO</small></div>
      <template v-if="authenticated">
        <button :class="{ selected: tab==='dashboard' }" @click="tab='dashboard';load()">Visão geral</button>
        <button :class="{ selected: tab==='products' }" @click="tab='products';load()">Perfumes e estoque</button>
        <button :class="{ selected: tab==='orders' }" @click="tab='orders';load()">Pedidos</button>
        <button class="logout" @click="logout">Sair</button>
      </template>
      <RouterLink to="/">← Voltar à loja</RouterLink>
    </aside>
    <section class="admin-body">
      <div v-if="!authenticated" class="admin-login panel">
        <h1>Acesso administrativo</h1>
        <p>Entre com as credenciais configuradas no backend.</p>
        <form @submit.prevent="login" class="admin-form">
          <label>Usuário<input v-model.trim="username" autocomplete="username" required /></label>
          <label>Senha<input v-model="password" type="password" autocomplete="current-password" required /></label>
          <button type="submit" :disabled="busy">{{busy?'Validando...':'Entrar no painel'}}</button>
          <p class="admin-error" v-if="error" role="alert">{{error}}</p>
        </form>
      </div>
      <template v-else>
        <header class="admin-heading"><div><span>PAINEL DE CONTROLE</span><h1>{{tab==='dashboard'?'Visão geral':tab==='products'?'Gestão de perfumes':'Pedidos recebidos'}}</h1></div><button class="secondary" @click="load">Atualizar</button></header>
        <p v-if="error" class="admin-error" role="alert">{{error}}</p>
        <p v-if="busy">Carregando informações...</p>
        <template v-if="tab==='dashboard'">
          <div class="admin-metrics">
            <article class="panel"><span>Receita confirmada</span><strong>{{money(stats.revenue)}}</strong></article>
            <article class="panel"><span>Pedidos</span><strong>{{stats.orders??'—'}}</strong></article>
            <article class="panel"><span>Aguardando pagamento</span><strong>{{stats.pending??'—'}}</strong></article>
            <article class="panel"><span>Estoque baixo (≤ 5)</span><strong>{{stats.lowStock??'—'}}</strong></article>
          </div>
          <div class="panel"><h2>Operação da loja</h2><p>Confira os pedidos, revise produtos e mantenha o estoque atualizado. Somente pagamentos confirmados integram a receita.</p><button @click="tab='products';load()">Administrar produtos →</button></div>
        </template>
        <template v-if="tab==='products'">
          <div class="admin-toolbar"><p>{{products.length}} perfumes cadastrados</p><button @click="newProduct">+ Novo perfume</button></div>
          <div class="panel admin-table-wrap"><table><thead><tr><th>Produto</th><th>Preço</th><th>Estoque</th><th>Status</th><th></th></tr></thead><tbody><tr v-for="p in products" :key="p.id"><td><div class="product-cell"><img v-if="p.image" :src="p.image" alt="" /><div><b>{{p.name}}</b><small>{{p.volume}} · {{p.category}}</small></div></div></td><td>{{money(p.price)}}</td><td>{{p.stock}}</td><td>{{p.active?'Ativo':'Inativo'}}</td><td><button class="secondary" @click="editProduct(p)">Editar</button></td></tr></tbody></table></div>
          <div v-if="editing" class="admin-modal-backdrop" @click.self="editing=false"><form class="panel admin-editor" @submit.prevent="saveProduct"><div class="admin-editor-head"><h2>{{form.id?'Editar perfume':'Cadastrar perfume'}}</h2><button class="secondary" type="button" @click="editing=false">Fechar</button></div><div class="admin-fields">
            <label>Nome *<input v-model.trim="form.name" required maxlength="255" /></label>
            <label>Volume<input v-model.trim="form.volume" placeholder="100ml" /></label>
            <label>Preço *<input v-model.number="form.price" type="number" min="0" step="0.01" required /></label>
            <label>Preço anterior<input v-model.number="form.oldPrice" type="number" min="0" step="0.01" /></label>
            <label>Estoque *<input v-model.number="form.stock" type="number" min="0" step="1" required /></label>
            <label>Categoria<input v-model.trim="form.category" /></label>
            <label>Gênero<input v-model.trim="form.gender" /></label>
            <label>Família olfativa<input v-model.trim="form.family" /></label>
            <label>Imagem (URL HTTPS)<input v-model.trim="form.image" type="url" placeholder="https://..." /></label>
            <label>Subtítulo<input v-model.trim="form.subtitle" /></label>
            <label class="wide">Descrição<textarea v-model="form.description" rows="4"></textarea></label>
            <label class="inline"><input v-model="form.active" type="checkbox" /> Disponível na loja</label>
          </div><p class="admin-error" v-if="error" role="alert">{{error}}</p><button type="submit" :disabled="saving">{{saving?'Salvando...':'Salvar perfume'}}</button></form></div>
        </template>
        <template v-if="tab==='orders'"><div class="panel admin-table-wrap"><table><thead><tr><th>Nº pedido</th><th>Cliente</th><th>Data</th><th>Itens</th><th>Valor</th><th>Pagamento</th></tr></thead><tbody><tr v-for="o in orders" :key="o.id"><td><b>{{o.number}}</b></td><td>{{o.customerName}}<small>{{o.customerEmail}}</small></td><td>{{date(o.createdAt)}}</td><td><details><summary>{{o.items?.length || 0}} itens</summary><p v-for="item in o.items" :key="item.id">{{item.quantity}}x {{item.name}} ({{item.volume}})</p><p>Entrega: {{o.address}}, {{o.addressNumber}} — {{o.city}} / {{o.zipCode}}</p></details></td><td>{{money(o.total)}}</td><td><span class="status" :class="o.status">{{statusLabel(o.status)}}</span></td></tr><tr v-if="!orders.length"><td colspan="6">Nenhum pedido encontrado.</td></tr></tbody></table></div></template>
      </template>
    </section>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { apiFetch } from '../../services/api'
const auth=ref(sessionStorage.getItem('armelin_admin_auth')||'')
const authenticated=ref(false), username=ref(''),password=ref(''),busy=ref(false),saving=ref(false),error=ref(''),tab=ref('dashboard'),stats=ref({}),products=ref([]),orders=ref([]),editing=ref(false),form=ref({})
const money=n=>new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(Number(n||0))
const date=d=>d?new Date(d).toLocaleString('pt-BR'):'—'
const statusLabel=s=>({PAID:'Pago',AWAITING_PAYMENT:'Aguardando pagamento',CANCELLED:'Cancelado',SHIPPED:'Enviado',DELIVERED:'Entregue'})[s]||s
async function request(path,options={}) { return apiFetch('/admin'+path,{...options,headers:{...options.headers,Authorization:'Basic '+auth.value}}) }
async function login(){error.value='';busy.value=true;const credentials=btoa(unescape(encodeURIComponent(username.value+':'+password.value)));auth.value=credentials;try{await request('/me');sessionStorage.setItem('armelin_admin_auth',credentials);authenticated.value=true;password.value='';await load()}catch(e){auth.value='';error.value='Credenciais inválidas ou API indisponível.'}finally{busy.value=false}}
function logout(){sessionStorage.removeItem('armelin_admin_auth');auth.value='';authenticated.value=false;username.value='';password.value='';error.value=''}
async function load(){if(!authenticated.value)return;error.value='';busy.value=true;try{if(tab.value==='dashboard')stats.value=await request('/dashboard');if(tab.value==='products')products.value=await request('/products');if(tab.value==='orders')orders.value=await request('/orders')}catch(e){error.value=e.message;if(/401|403/.test(e.message))logout()}finally{busy.value=false}}
function newProduct(){form.value={name:'',volume:'',subtitle:'',price:0,oldPrice:null,stock:0,category:'',gender:'',family:'',image:'',description:'',active:true};error.value='';editing.value=true}
function editProduct(p){form.value={...p};error.value='';editing.value=true}
async function saveProduct(){error.value='';saving.value=true;try{const id=form.value.id;await request(id?'/products/'+id:'/products',{method:id?'PUT':'POST',body:JSON.stringify(form.value)});editing.value=false;await load()}catch(e){error.value=e.message}finally{saving.value=false}}
onMounted(async()=>{if(auth.value){try{await request('/me');authenticated.value=true;await load()}catch{logout()}}})
</script>
<style scoped src="./AdminPanel.css"></style>
