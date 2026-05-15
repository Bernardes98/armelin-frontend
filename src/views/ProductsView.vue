<template>
  <div class="products-view">
    <section class="products-hero">
      <p>Catálogo</p>
      <h1>Todos os produtos</h1>
      <span>
        Explore a seleção inicial de perfumes disponíveis na loja.
      </span>
    </section>

    <section class="products-list-section">
      <div class="products-toolbar">
        <div class="filters-area">
          <label>
            Buscar
            <input
              v-model="search"
              type="text"
              placeholder="Nome, categoria ou fragrância"
              @input="applyQueryParams"
            />
          </label>

          <label>
            Categoria
            <select v-model="selectedCategory" @change="applyQueryParams">
              <option value="">Todas</option>
              <option value="Feminino">Feminino</option>
              <option value="Masculino">Masculino</option>
              <option value="Unissex">Unissex</option>
            </select>
          </label>

          <label>
            Família olfativa
            <select v-model="selectedFamily" @change="applyQueryParams">
              <option value="">Todas</option>
              <option value="Oriental Floral">Oriental Floral</option>
              <option value="Ambarado">Ambarado</option>
              <option value="Aquático">Aquático</option>
              <option value="Frutado Floral">Frutado Floral</option>
              <option value="Cítrico">Cítrico</option>
            </select>
          </label>

          <label>
            Ordenar
            <select v-model="sortBy" @change="applyQueryParams">
              <option value="">Padrão</option>
              <option value="menor-preco">Menor preço</option>
              <option value="maior-preco">Maior preço</option>
              <option value="nome">Nome</option>
            </select>
          </label>
        </div>

        <div class="toolbar-result">
          <span>
            {{ filteredProducts.length }} produto(s) encontrado(s)
          </span>

          <button type="button" @click="clearFilters">
            Limpar filtros
          </button>
        </div>
      </div>

      <div v-if="filteredProducts.length > 0" class="products-grid">
        <ProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
          @add-to-cart="cartStore.addProduct"
        />
      </div>

      <div v-else class="empty-products">
        <h2>Nenhum produto encontrado</h2>
        <p>
          Tente buscar por outro nome, categoria ou família olfativa.
        </p>
        <button type="button" @click="clearFilters">Ver todos os produtos</button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ProductCard from '../components/product/ProductCard.vue'
import { products } from '../data/products'
import { useCartStore } from '../stores/cartStore'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()

const search = ref('')
const selectedCategory = ref('')
const selectedFamily = ref('')
const sortBy = ref('')

watch(
  () => route.query,
  () => {
    search.value = route.query.busca || ''
    selectedCategory.value = route.query.categoria || ''
    selectedFamily.value = route.query.familia || ''
    sortBy.value = route.query.ordenacao || ''
  },
  { immediate: true },
)

const filteredProducts = computed(() => {
  const searchNormalized = normalizeText(search.value)

  let result = products.filter((product) => {
    const matchesSearch =
      !searchNormalized ||
      normalizeText(product.name).includes(searchNormalized) ||
      normalizeText(product.subtitle).includes(searchNormalized) ||
      normalizeText(product.category).includes(searchNormalized) ||
      normalizeText(product.family).includes(searchNormalized)

    const matchesCategory = !selectedCategory.value || product.gender === selectedCategory.value
    const matchesFamily = !selectedFamily.value || product.family === selectedFamily.value

    return matchesSearch && matchesCategory && matchesFamily
  })

  if (sortBy.value === 'menor-preco') {
    result = [...result].sort((a, b) => a.price - b.price)
  }

  if (sortBy.value === 'maior-preco') {
    result = [...result].sort((a, b) => b.price - a.price)
  }

  if (sortBy.value === 'nome') {
    result = [...result].sort((a, b) => a.name.localeCompare(b.name))
  }

  return result
})

function applyQueryParams() {
  const query = {}

  if (search.value.trim()) {
    query.busca = search.value.trim()
  }

  if (selectedCategory.value) {
    query.categoria = selectedCategory.value
  }

  if (selectedFamily.value) {
    query.familia = selectedFamily.value
  }

  if (sortBy.value) {
    query.ordenacao = sortBy.value
  }

  router.replace({
    path: '/produtos',
    query,
  })
}

function clearFilters() {
  search.value = ''
  selectedCategory.value = ''
  selectedFamily.value = ''
  sortBy.value = ''

  router.replace('/produtos')
}

function normalizeText(value) {
  return String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}
</script>

<style scoped src="./ProductsView.css"></style>