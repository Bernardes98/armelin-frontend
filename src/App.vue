<template>
  <div class="app">
    <Header :cart-count="cartStore.totalItems" @open-cart="cartStore.openCart" />

    <main class="main-content">
      <RouterView />
    </main>

    <Footer />

    <CartDrawer />

    <ToastContainer />
  </div>
</template>

<script setup>
import Header from './components/layout/Header.vue'
import Footer from './components/layout/Footer.vue'
import CartDrawer from './components/layout/CartDrawer.vue'
import ToastContainer from './components/ui/ToastContainer.vue'
import { useCartStore } from './stores/cartStore'

const cartStore = useCartStore()
</script>