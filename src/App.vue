<template>
  <div class="app">
    <Header v-if="!isAdmin" :cart-count="cartStore.totalItems" @open-cart="cartStore.openCart" />

    <main class="main-content">
      <RouterView />
    </main>

    <Footer v-if="!isAdmin" />

    <CartDrawer v-if="!isAdmin" />

    <ToastContainer />
  </div>
</template>

<script setup>
import Header from './components/layout/Header.vue'
import Footer from './components/layout/Footer.vue'
import CartDrawer from './components/layout/CartDrawer.vue'
import ToastContainer from './components/ui/ToastContainer.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from './stores/cartStore'

const cartStore = useCartStore()
const route = useRoute()
const isAdmin = computed(() => route.path.startsWith('/admin'))
</script>