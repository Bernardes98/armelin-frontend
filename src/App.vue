<template>
  <div class="app">
    <Header v-if="!isAdmin && !isEssential && !isPublicStore" :cart-count="cartStore.totalItems" @open-cart="cartStore.openCart" />

    <main class="main-content">
      <RouterView />
    </main>

    <Footer v-if="!isAdmin && !isEssential && !isPublicStore" />

    <CartDrawer v-if="!isAdmin && !isEssential && !isPublicStore" />

    <ToastContainer />
  </div>
</template>

<script setup>
import Header from './components/layout/Header.vue'
import { storefront } from './config/storefront'
import Footer from './components/layout/Footer.vue'
import CartDrawer from './components/layout/CartDrawer.vue'
import ToastContainer from './components/ui/ToastContainer.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from './stores/cartStore'

const cartStore = useCartStore()
const route = useRoute()
const isPublicStore = computed(() => route.path.startsWith('/loja/') || ['/demo/kas', '/demo/porto'].includes(route.path))
const isAdmin = computed(() => route.path.startsWith('/admin') || route.path.startsWith('/plataforma'))
const isEssential = computed(() => storefront.plan === 'ESSENTIAL')
// A configuração visual é por implantação; não representa isolamento multiempresa.
if (typeof document !== 'undefined') { document.documentElement.style.setProperty('--store-accent', storefront.accent) }
</script>