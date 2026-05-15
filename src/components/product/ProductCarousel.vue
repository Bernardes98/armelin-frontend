<template>
  <section class="product-carousel-section">
    <div class="carousel-header">
      <div>
        <p>{{ kicker }}</p>
        <h1>{{ title }}</h1>
        <span>{{ description }}</span>
      </div>

      <div class="carousel-actions">
        <button type="button" aria-label="Voltar produtos" @click="scrollPrevious">
          ←
        </button>

        <button type="button" aria-label="Avançar produtos" @click="scrollNext">
          →
        </button>
      </div>
    </div>

    <div
      ref="carouselRef"
      :class="['carousel-track', { dragging: isDragging }]"
      @pointerdown="startDrag"
      @pointermove="moveDrag"
      @pointerup="endDrag"
      @pointercancel="endDrag"
      @pointerleave="endDrag"
      @dragstart.prevent
      @click.capture="preventClickAfterDrag"
      @scroll="handleScroll"
    >
      <div
        v-for="item in loopProducts"
        :key="item.loopKey"
        class="carousel-item"
      >
        <ProductCard
          :product="item.product"
          @add-to-cart="$emit('add-to-cart', item.product)"
        />
      </div>
    </div>

    <p class="drag-hint">
      Clique e arraste para o lado para ver mais produtos
    </p>
  </section>
</template>

<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import ProductCard from './ProductCard.vue'

const props = defineProps({
  kicker: {
    type: String,
    default: 'Produtos selecionados',
  },
  title: {
    type: String,
    default: 'Fragrâncias em destaque',
  },
  description: {
    type: String,
    default:
      'Conheça perfumes selecionados para diferentes estilos, momentos e ocasiões especiais.',
  },
  products: {
    type: Array,
    required: true,
  },
})

defineEmits(['add-to-cart'])

const carouselRef = ref(null)
const isDragging = ref(false)
const shouldPreventClick = ref(false)
const isResettingScroll = ref(false)

let isPointerDown = false
let startX = 0
let startScrollLeft = 0
let movedDistance = 0

const loopProducts = computed(() => {
  const repeatedProducts = [
    ...props.products,
    ...props.products,
    ...props.products,
  ]

  return repeatedProducts.map((product, index) => ({
    product,
    loopKey: `${index}-${product.id}`,
  }))
})

onMounted(() => {
  resetToMiddle()
})

watch(
  () => props.products,
  () => {
    resetToMiddle()
  },
  { deep: true },
)

function scrollPrevious() {
  scrollCarousel(-1)
}

function scrollNext() {
  scrollCarousel(1)
}

function scrollCarousel(direction) {
  if (!carouselRef.value) {
    return
  }

  const step = getItemStepSize()

  carouselRef.value.scrollBy({
    left: direction * step,
    behavior: 'smooth',
  })

  window.setTimeout(() => {
    normalizeLoopPosition()
  }, 360)
}

function startDrag(event) {
  const ignoredTags = ['BUTTON', 'INPUT', 'SELECT', 'TEXTAREA']

  if (ignoredTags.includes(event.target.tagName)) {
    return
  }

  if (!carouselRef.value) {
    return
  }

  isPointerDown = true
  isDragging.value = true
  shouldPreventClick.value = false
  movedDistance = 0

  startX = event.clientX
  startScrollLeft = carouselRef.value.scrollLeft

  carouselRef.value.setPointerCapture?.(event.pointerId)
}

function moveDrag(event) {
  if (!isPointerDown || !carouselRef.value) {
    return
  }

  const distance = event.clientX - startX
  movedDistance = Math.max(movedDistance, Math.abs(distance))

  carouselRef.value.scrollLeft = startScrollLeft - distance

  if (movedDistance > 3) {
    event.preventDefault()
  }
}

function endDrag(event) {
  if (!isPointerDown) {
    return
  }

  isPointerDown = false
  isDragging.value = false

  carouselRef.value?.releasePointerCapture?.(event.pointerId)

  normalizeLoopPosition()

  if (movedDistance > 5) {
    shouldPreventClick.value = true

    window.setTimeout(() => {
      shouldPreventClick.value = false
    }, 120)
  }
}

function preventClickAfterDrag(event) {
  if (!shouldPreventClick.value) {
    return
  }

  event.preventDefault()
  event.stopPropagation()
}

function handleScroll() {
  if (isResettingScroll.value || isPointerDown) {
    return
  }

  normalizeLoopPosition()
}

function resetToMiddle() {
  nextTick(() => {
    if (!carouselRef.value || props.products.length === 0) {
      return
    }

    isResettingScroll.value = true
    carouselRef.value.scrollLeft = getSingleSetWidth()

    requestAnimationFrame(() => {
      isResettingScroll.value = false
    })
  })
}

function normalizeLoopPosition() {
  if (!carouselRef.value || props.products.length === 0) {
    return
  }

  const singleSetWidth = getSingleSetWidth()
  const currentScroll = carouselRef.value.scrollLeft

  if (singleSetWidth <= 0) {
    return
  }

  if (currentScroll < singleSetWidth * 0.35) {
    jumpWithoutAnimation(currentScroll + singleSetWidth)
    return
  }

  if (currentScroll > singleSetWidth * 1.65) {
    jumpWithoutAnimation(currentScroll - singleSetWidth)
  }
}

function jumpWithoutAnimation(position) {
  if (!carouselRef.value) {
    return
  }

  isResettingScroll.value = true
  carouselRef.value.scrollLeft = position

  requestAnimationFrame(() => {
    isResettingScroll.value = false
  })
}

function getSingleSetWidth() {
  return getItemStepSize() * props.products.length
}

function getItemStepSize() {
  const carousel = carouselRef.value

  if (!carousel) {
    return 320
  }

  const firstItem = carousel.querySelector('.carousel-item')

  if (!firstItem) {
    return 320
  }

  const styles = window.getComputedStyle(carousel)
  const gap = Number.parseFloat(styles.columnGap || styles.gap || '24') || 24

  return firstItem.offsetWidth + gap
}
</script>

<style scoped src="./ProductCarousel.css"></style>