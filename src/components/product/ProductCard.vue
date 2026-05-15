<template>
  <article class="product-card">
    <RouterLink :to="`/produtos/${product.id}`" class="product-image-wrapper">
      <span v-if="hasDiscount" class="discount-badge">
        {{ discountPercentage }}% OFF
      </span>

      <button
        type="button"
        :class="['favorite-button', { active: favoriteStore.isFavorite(product.id) }]"
        :aria-label="favoriteStore.isFavorite(product.id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'"
        @click.prevent="favoriteStore.toggleFavorite(product)"
      >
        ♥
      </button>

      <img :src="product.image" :alt="product.name" />
    </RouterLink>

    <div class="product-info">
      <p class="product-category">{{ product.category }}</p>

      <RouterLink :to="`/produtos/${product.id}`" class="product-title">
        {{ product.name }} - {{ product.volume }}
      </RouterLink>

      <p class="product-subtitle">{{ product.subtitle }}</p>

      <div class="product-price-area">
        <span v-if="product.oldPrice" class="old-price">
          {{ formatCurrency(product.oldPrice) }}
        </span>

        <strong class="current-price">
          {{ formatCurrency(product.price) }}
        </strong>
      </div>

      <button type="button" class="add-button" @click="$emit('add-to-cart', product)">
        Adicionar ao carrinho
      </button>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import { useFavoriteStore } from '../../stores/favoriteStore'

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})

defineEmits(['add-to-cart'])

const favoriteStore = useFavoriteStore()

const hasDiscount = computed(() => {
  return props.product.oldPrice && props.product.oldPrice > props.product.price
})

const discountPercentage = computed(() => {
  if (!hasDiscount.value) {
    return 0
  }

  return Math.round(((props.product.oldPrice - props.product.price) / props.product.oldPrice) * 100)
})

function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}
</script>

<style scoped src="./ProductCard.css"></style>