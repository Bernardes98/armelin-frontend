<template>
  <div class="product-details-view">
    <section v-if="product" class="product-details-section">
      <div class="product-gallery">
        <div class="product-main-image">
          <img :src="selectedImage" :alt="product.name" />
        </div>

        <div class="thumbnail-list">
          <button
            v-for="image in galleryImages"
            :key="image"
            type="button"
            :class="{ active: image === selectedImage }"
            @click="selectedImage = image"
          >
            <img :src="image" :alt="product.name" />
          </button>
        </div>
      </div>

      <div class="product-details-info">
        <RouterLink to="/produtos" class="back-link">← Voltar para produtos</RouterLink>

        <p class="product-code">Código {{ product.id.toString().padStart(6, '0') }}</p>

        <h1>{{ product.name }} - {{ product.volume }}</h1>

        <div class="rating-area">
          <span>{{ ratingStars }}</span>
          <small>({{ product.reviews }} avaliações)</small>
        </div>

        <div class="price-area">
          <span v-if="product.oldPrice" class="old-price">
            {{ formatCurrency(product.oldPrice) }}
          </span>

          <strong>{{ formatCurrency(product.price) }}</strong>

          <small>4x de {{ formatCurrency(product.price / 4) }} sem juros</small>
        </div>

        <p class="product-description">
          {{ product.description }}
        </p>

        <div class="quantity-row">
          <button type="button" @click="decreaseQuantity">−</button>
          <span>{{ quantity }}</span>
          <button type="button" @click="increaseQuantity">+</button>
        </div>

        <button type="button" class="add-to-cart-button" @click="addToCart">
          Adicionar ao carrinho
        </button>

        <div class="delivery-box">
          <strong>Calcular entrega</strong>

          <div class="delivery-form">
            <input v-model="zipCode" type="text" placeholder="Digite seu CEP" />
            <button type="button" @click="calculateShipping">Calcular</button>
          </div>

          <p v-if="shippingMessage" class="shipping-message">
            {{ shippingMessage }}
          </p>
        </div>
      </div>
    </section>

    <section v-if="product" class="product-extra-section">
      <div class="tabs-card">
        <div class="tabs-header">
          <button
            type="button"
            :class="{ active: activeTab === 'description' }"
            @click="activeTab = 'description'"
          >
            Descrição
          </button>

          <button
            type="button"
            :class="{ active: activeTab === 'notes' }"
            @click="activeTab = 'notes'"
          >
            Notas olfativas
          </button>

          <button
            type="button"
            :class="{ active: activeTab === 'reviews' }"
            @click="activeTab = 'reviews'"
          >
            Avaliações
          </button>
        </div>

        <div class="tabs-content">
          <div v-if="activeTab === 'description'" class="tab-panel">
            <h2>Sobre o perfume</h2>
            <p>{{ product.description }}</p>

            <h3>Modo de uso</h3>
            <p>{{ product.useMode }}</p>
          </div>

          <div v-if="activeTab === 'notes'" class="tab-panel">
            <h2>Pirâmide olfativa</h2>

            <div class="notes-grid">
              <div>
                <span>Notas de saída</span>
                <strong>{{ product.notes.top }}</strong>
              </div>

              <div>
                <span>Notas de corpo</span>
                <strong>{{ product.notes.body }}</strong>
              </div>

              <div>
                <span>Notas de fundo</span>
                <strong>{{ product.notes.base }}</strong>
              </div>
            </div>
          </div>

          <div v-if="activeTab === 'reviews'" class="tab-panel">
            <h2>Avaliações dos clientes</h2>

            <div class="reviews-list">
              <article v-for="review in product.reviewsList" :key="review.name" class="review-card">
                <div>
                  <strong>{{ review.name }}</strong>
                  <span>{{ renderStars(review.rating) }}</span>
                </div>

                <p>{{ review.comment }}</p>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section v-if="product && relatedProducts.length > 0" class="related-section">
      <div class="section-header">
        <p>Você também pode gostar</p>
        <h2>Produtos relacionados</h2>
      </div>

      <div class="related-grid">
        <ProductCard
          v-for="relatedProduct in relatedProducts"
          :key="relatedProduct.id"
          :product="relatedProduct"
          @add-to-cart="cartStore.addProduct"
        />
      </div>
    </section>

    <section v-if="!product" class="product-not-found">
      <h1>Produto não encontrado</h1>
      <p>O produto selecionado não está disponível no catálogo.</p>
      <RouterLink to="/produtos">Voltar para produtos</RouterLink>
    </section>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import ProductCard from '../components/product/ProductCard.vue'
import { products } from '../data/products'
import { useCartStore } from '../stores/cartStore'

const route = useRoute()
const cartStore = useCartStore()

const quantity = ref(1)
const selectedImage = ref('')
const activeTab = ref('description')
const zipCode = ref('')
const shippingMessage = ref('')

const product = computed(() => {
  const productId = Number(route.params.id)
  return products.find((item) => item.id === productId)
})

const galleryImages = computed(() => {
  if (!product.value) {
    return []
  }

  if (product.value.gallery?.length) {
    return product.value.gallery
  }

  return [product.value.image]
})

const ratingStars = computed(() => {
  return renderStars(product.value?.rating || 0)
})

const relatedProducts = computed(() => {
  if (!product.value) {
    return []
  }

  const sameFamily = products.filter((item) => {
    return item.id !== product.value.id && item.family === product.value.family
  })

  const fallback = products.filter((item) => {
    return item.id !== product.value.id && item.gender === product.value.gender
  })

  const combined = [...sameFamily, ...fallback]

  return combined
    .filter((item, index, array) => {
      return array.findIndex((current) => current.id === item.id) === index
    })
    .slice(0, 4)
})

watch(
  product,
  (currentProduct) => {
    quantity.value = 1
    activeTab.value = 'description'
    shippingMessage.value = ''
    zipCode.value = ''

    if (currentProduct) {
      selectedImage.value = currentProduct.gallery?.[0] || currentProduct.image
    }
  },
  { immediate: true },
)

function increaseQuantity() {
  quantity.value += 1
}

function decreaseQuantity() {
  if (quantity.value > 1) {
    quantity.value -= 1
  }
}

function addToCart() {
  if (!product.value) {
    return
  }

  for (let index = 0; index < quantity.value; index += 1) {
    cartStore.addProduct(product.value)
  }
}

function calculateShipping() {
  const onlyNumbers = zipCode.value.replace(/\D/g, '')

  if (onlyNumbers.length !== 8) {
    shippingMessage.value = 'Digite um CEP válido com 8 números.'
    return
  }

  shippingMessage.value =
    'Entrega estimada entre 4 e 8 dias úteis. Frete grátis em compras acima de R$ 299,00.'
}

function renderStars(rating) {
  const fullStars = '★'.repeat(rating)
  const emptyStars = '☆'.repeat(5 - rating)

  return `${fullStars}${emptyStars}`
}

function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}
</script>

<style scoped src="./ProductDetailsView.css"></style>