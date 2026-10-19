<template>
  <main class="platform-page">
    <header><h1>Perfumes <span>Plataforma</span></h1><p>Gestão das perfumarias cadastradas</p></header>
    <section v-if="!authenticated" class="panel login">
      <h2>Superadministrador</h2><p>Use as credenciais PLATFORM_USERNAME e PLATFORM_PASSWORD do backend.</p>
      <form @submit.prevent="login">
        <label>Usuário<input v-model.trim="username" required autocomplete="username" /></label>
        <label>Senha<input v-model="password" type="password" required autocomplete="current-password" /></label>
        <button :disabled="busy">Entrar</button>
      </form>
    </section>
    <section v-else>
      <div class="toolbar"><h2>{{ companies.length }} lojas cadastradas</h2><div><button @click="startCreate">+ Nova loja</button><button class="secondary" @click="logout">Sair</button></div></div>
      <div v-if="busy">Carregando...</div>
      <div class="table-wrap"><table><thead><tr><th>Loja</th><th>Plano</th><th>Situação</th><th></th></tr></thead><tbody>
        <tr v-for="c in companies" :key="c.id"><td><strong>{{ c.name }}</strong><small>{{ c.slug }}</small></td><td>{{ c.plan==='ESSENTIAL'?'Essencial':'Commerce' }}</td><td>{{ c.active?'Ativa':'Suspensa' }}</td><td><a v-if="c.active && c.plan === 'ESSENTIAL'" class="store-preview-link" :href="`/loja/${c.slug}`" target="_blank" rel="noopener noreferrer">Ver site</a> <button class="secondary" @click="startEdit(c)">Editar</button> <button class="secondary" @click="startOwner(c)">Acesso</button></td></tr>
      </tbody></table></div>
      <p class="notice">Lojas Essencial têm link público individual. O checkout Commerce de novas empresas permanece desabilitado até configurar pagamentos individuais.</p>
    </section>
    <section v-if="ownerEditing" class="modal" @click.self="ownerEditing=false"><form class="panel editor" @submit.prevent="saveOwner">
      <h2>Administrador — {{ownerCompany.name}}</h2>
      <p>Crie um login exclusivo para esta loja. A senha deve ter pelo menos 12 caracteres.</p>
      <label>Usuário<input v-model.trim="ownerUsername" pattern="[a-zA-Z0-9._-]{3,100}" minlength="3" required /></label>
      <label>Senha<input v-model="ownerPassword" type="password" minlength="12" required autocomplete="new-password" /></label>
      <div class="actions"><button :disabled="saving">{{saving?'Criando...':'Criar acesso'}}</button><button class="secondary" type="button" @click="ownerEditing=false">Cancelar</button></div>
    </form></section>
    <p v-if="error" class="error" role="alert">{{ error }}</p>
    <section v-if="editing" class="modal" @click.self="editing=false"><form class="panel editor" @submit.prevent="save">
      <h2>{{ form.id?'Editar loja':'Cadastrar perfumaria' }}</h2>
      <label>Identificador (slug)<input v-model.trim="form.slug" :disabled="!!form.id" pattern="[a-z0-9][a-z0-9-]*" required maxlength="63" /></label>
      <label>Nome da loja<input v-model.trim="form.name" required maxlength="255" /></label>
      <label>Plano<select v-model="form.plan"><option value="ESSENTIAL">Essencial</option><option value="COMMERCE">Commerce</option></select></label>
      <label>WhatsApp<input v-model.trim="form.whatsapp" maxlength="255" /></label>
      <label>Instagram<input v-model.trim="form.instagram" maxlength="255" /></label>
      <label>Cor principal <input v-model="form.accent" type="color" /></label>
      <label class="check"><input type="checkbox" v-model="form.active" :disabled="form.slug==='default'" /> Loja ativa</label>
      <div class="actions"><button :disabled="saving">{{ saving?'Salvando...':'Salvar' }}</button><button class="secondary" type="button" @click="editing=false">Cancelar</button></div>
    </form></section>
  </main>
</template>
<script setup>
import {ref,onMounted} from 'vue'
import {apiFetch} from '../../services/api'
const KEY='perfumes-platform-auth'
const auth=ref(sessionStorage.getItem(KEY)||'')
const authenticated=ref(false),username=ref(''),password=ref(''),busy=ref(false),saving=ref(false),error=ref(''),companies=ref([]),editing=ref(false),form=ref({}),ownerEditing=ref(false),ownerCompany=ref({}),ownerUsername=ref(''),ownerPassword=ref('')
function request(path,options={}) {return apiFetch('/platform'+path,{...options,headers:{...options.headers,Authorization:'Basic '+auth.value}})}
async function login(){busy.value=true;error.value='';try{auth.value=btoa(username.value+':'+password.value);await request('/me');sessionStorage.setItem(KEY,auth.value);authenticated.value=true;password.value='';await load()}catch(e){auth.value='';error.value='Acesso negado: confira as credenciais do superadministrador.'}finally{busy.value=false}}
function logout(){sessionStorage.removeItem(KEY);auth.value='';authenticated.value=false;companies.value=[]}
async function load(){busy.value=true;error.value='';try{companies.value=await request('/companies')}catch(e){error.value=e.message}finally{busy.value=false}}
function startCreate(){form.value={slug:'',name:'',plan:'ESSENTIAL',active:true,whatsapp:'',instagram:'',accent:'#a87c44'};editing.value=true;error.value=''}
function startEdit(c){form.value={...c};editing.value=true;error.value=''}
function startOwner(c){ownerCompany.value=c;ownerUsername.value='';ownerPassword.value='';error.value='';ownerEditing.value=true}
async function saveOwner(){saving.value=true;error.value='';try{
 await request('/companies/'+ownerCompany.value.id+'/owners',{method:'POST',body:JSON.stringify({username:ownerUsername.value,password:ownerPassword.value})});
 ownerPassword.value='';ownerEditing.value=false;
 }catch(e){error.value=e.message}finally{saving.value=false}}
async function save(){saving.value=true;error.value='';try{const c={...form.value};delete c.id;const update=!!form.value.id; if(update)delete c.slug;await request(update?'/companies/'+form.value.id:'/companies',{method:update?'PUT':'POST',body:JSON.stringify(c)});editing.value=false;await load()}catch(e){error.value=e.message}finally{saving.value=false}}
onMounted(async()=>{if(auth.value){try{await request('/me');authenticated.value=true;await load()}catch{logout()}}})
</script>
<style scoped src="./PlatformPanel.css"></style>
