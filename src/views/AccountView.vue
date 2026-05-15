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
              <strong>{{ user.phone }}</strong>
            </div>

            <div>
              <span>CPF</span>
              <strong>{{ user.document }}</strong>
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
import { computed } from 'vue'
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

const user = {
  name: 'Cliente Armelin',
  email: 'cliente@exemplo.com',
  phone: '(51) 99999-0000',
  document: '000.000.000-00',
}

const address = {
  title: 'Endereço principal',
  street: 'Rua das Fragrâncias',
  number: '120',
  city: 'Porto Alegre/RS',
  zipCode: '90000-000',
}

const orders = [
  {
    number: 'ARM-204815',
    date: '15/05/2026',
    status: 'Entregue',
    statusClass: 'delivered',
    total: 'R$ 379,80',
    items: 'Fine Silk - 100ml, Celtic Legacy - 100ml',
  },
  {
    number: 'ARM-193420',
    date: '02/05/2026',
    status: 'Em transporte',
    statusClass: 'shipping',
    total: 'R$ 189,90',
    items: 'Salt Crystal - 100ml',
  },
  {
    number: 'ARM-182901',
    date: '18/04/2026',
    status: 'Processando',
    statusClass: 'processing',
    total: 'R$ 169,90',
    items: 'Litchi Fiorito - 100ml',
  },
]

const userInitials = computed(() => {
  return user.name
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

function logout() {
  notificationStore.info(
    'Logout demonstrativo',
    'Você saiu da conta demonstrativa.',
  )

  router.push('/login')
}
</script>

<style scoped src="./AccountView.css"></style>