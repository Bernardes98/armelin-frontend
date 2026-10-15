<template>
  <div class="account-view">
    <section class="account-hero">
      <p>Área do cliente</p>
      <h1>Minha conta</h1>
      <span>
        Acompanhe seus pedidos, dados cadastrais, informações de entrega e produtos favoritos.
      </span>
    </section>

    <section class="account-section">
      <aside class="account-sidebar">
        <div class="profile-card">
          <div class="profile-avatar">
            {{ userInitials }}
          </div>

          <strong>{{ user.name }}</strong>
          <span>{{ user.email }}</span>
        </div>

        <nav class="account-menu">
          <a href="#dados">Dados pessoais</a>
          <a href="#pedidos">Meus pedidos</a>
          <a href="#enderecos">Endereços</a>
          <a href="#favoritos">Favoritos</a>
        </nav>

        <button type="button" class="logout-button" @click="logout">
          Sair da conta
        </button>
      </aside>

      <div class="account-content">
        <section id="dados" class="account-card">
          <div class="card-header">
            <div>
              <p>Cadastro</p>
              <h2>Dados pessoais</h2>
            </div>

            <button type="button" @click="showMockMessage">
              Editar
            </button>
          </div>

          <div class="info-grid">
            <div>
              <span>Nome completo</span>
              <strong>{{ user.name }}</strong>
            </div>

            <div>
              <span>E-mail</span>
              <strong>{{ user.email }}</strong>
            </div>

            <div>
              <span>Telefone</span>
              <strong>{{ user.phone || 'Não cadastrado' }}</strong>
            </div>

            <div>
              <span>CPF</span>
              <strong>{{ user.document || 'Não cadastrado' }}</strong>
            </div>
          </div>
        </section>

        <section id="pedidos" class="account-card">
          <div class="card-header">
            <div>
              <p>Histórico</p>
              <h2>Meus pedidos</h2>
            </div>

            <RouterLink to="/produtos">
              Comprar novamente
            </RouterLink>
          </div>

          <p v-if="ordersError" role="alert">{{ ordersError }}</p>
          <div v-if="!orders.length && !ordersError" class="favorites-empty">Nenhum pedido encontrado.</div>
          <div class="orders-list">
            <article v-for="order in orders" :key="order.number" class="order-card">
              <div class="order-main">
                <div>
                  <span>Pedido</span>
                  <strong>{{ order.number }}</strong>
                </div>

                <div>
                  <span>Data</span>
                  <strong>{{ order.date }}</strong>
                </div>

                <div>
                  <span>Status</span>
                  <strong :class="['status-badge', order.statusClass]">
                    {{ order.status }}
                  </strong>
                </div>

                <div>
                  <span>Total</span>
                  <strong>{{ order.total }}</strong>
                </div>
              </div>

              <div class="order-products">
                <span>{{ order.items }}</span>

                <button type="button" @click="showMockMessage">
                  Ver detalhes
                </button>
              </div>
            </article>
          </div>
        </section>

        <section id="enderecos" class="account-card">
          <div class="card-header">
            <div>
              <p>Entrega</p>
              <h2>Endereços salvos</h2>
            </div>

            <button type="button" @click="showMockMessage">
              Novo endereço
            </button>
          </div>

          <div class="address-card">
            <strong>{{ address.title }}</strong>
            <span>{{ address.street }}, {{ address.number }}</span>
            <span>{{ address.city }} - CEP {{ address.zipCode }}</span>
          </div>
        </section>

        <section id="favoritos" class="account-card">
          <div class="card-header">
            <div>
              <p>Lista</p>
              <h2>Favoritos</h2>
            </div>

            <button
              v-if="favoriteProducts.length > 0"
              type="button"
              class="clear-favorites-button"
              @click="clearFavorites"
            >
              Limpar favoritos
            </button>
          </div>

          <div v-if="favoriteProducts.length > 0" class="favorites-grid">
            <ProductCard
              v-for="product in favoriteProducts"
              :key="product.id"
              :product="product"
              @add-to-cart="cartStore.addProduct"
            />
          </div>

          <div v-else class="favorites-empty">
            <strong>Nenhum favorito ainda</strong>
            <span>
              Clique no coração dos produtos para salvar seus perfumes preferidos.
            </span>

            <RouterLink to="/produtos">
              Ver produtos
            </RouterLink>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { authState, loadMe, signOut } from '../services/auth'
import { apiFetch } from '../services/api'
import { useRouter } from 'vue-router'
import ProductCard from '../components/product/ProductCard.vue'
import { products } from '../data/products'
import { useCartStore } from '../stores/cartStore'
import { useFavoriteStore } from '../stores/favoriteStore'
import { useNotificationStore } from '../stores/notificationStore'

const router = useRouter()
const cartStore = useCartStore()
const favoriteStore = useFavoriteStore()
const notificationStore = useNotificationStore()

const user = computed(()=>({...{name:'',email:'',phone:'',document:''},...authState.user}))
onMounted(async()=>{if(!await loadMe()){router.replace('/login');return}try{const result=await apiFetch('/auth/orders',{headers:{Authorization:'Bearer '+authState.token}});orders.value=result.map(o=>({number:o.number,date:new Date(o.createdAt).toLocaleDateString('pt-BR'),status:({AWAITING_PAYMENT:'Aguardando pagamento',PAID:'Pago',SHIPPED:'Enviado',DELIVERED:'Entregue',CANCELLED:'Cancelado'})[o.status]||o.status,statusClass:o.status==='DELIVERED'?'delivered':'processing',total:new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(o.total),items:(o.items||[]).map(i=>i.quantity+'x '+i.name).join(', ')}))}catch(e){ordersError.value='Não foi possível carregar seus pedidos: '+e.message}})

const address = {
  title: 'Endereço principal',
  street: 'Não cadastrado',
  number: '—',
  city: '—',
  zipCode: '—',
}

const orders = ref([])
const ordersError = ref('')

const userInitials = computed(() => {
  return (user.value.name || '')
    .split(' ')
    .map((name) => name[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
})

const favoriteProducts = computed(() => {
  return products.filter((product) => favoriteStore.favoriteIds.includes(product.id))
})

function clearFavorites() {
  favoriteStore.clearFavorites()

  notificationStore.info(
    'Favoritos limpos',
    'Sua lista de favoritos foi esvaziada.',
  )
}

function showMockMessage() {
  notificationStore.info(
    'Funcionalidade demonstrativa',
    'Essa ação será integrada ao backend em uma próxima etapa.',
  )
}

async function logout() { await signOut(); router.push('/login') }
</script>

<style scoped src="./AccountView.css"></style>