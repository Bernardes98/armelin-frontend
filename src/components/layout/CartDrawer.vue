<template>
  <Teleport to="body">
    <div v-if="cartStore.isOpen" class="cart-drawer-wrapper">
      <button
        class="cart-overlay"
        type="button"
        aria-label="Fechar carrinho"
        @click="closeCart"
      ></button>

      <aside class="cart-drawer">
        <header class="cart-header">
          <div>
            <p>Carrinho de compras</p>
            <h2>{{ cartStore.totalItems }} item(ns)</h2>
          </div>

          <button type="button" class="close-button" aria-label="Fechar carrinho" @click="closeCart">
            ×
          </button>
        </header>

        <div v-if="cartStore.items.length === 0" class="empty-cart">
          <strong>Seu carrinho está vazio</strong>
          <span>Adicione um perfume para continuar sua compra.</span>

          <RouterLink to="/produtos" class="continue-button" @click="closeCart">
            Ver produtos
          </RouterLink>
        </div>

        <div v-else class="cart-content">
          <div class="cart-items">
            <article v-for="item in cartStore.items" :key="item.id" class="cart-item">
              <img :src="item.image" :alt="item.name" />

              <div class="cart-item-info">
                <strong>{{ item.name }} - {{ item.volume }}</strong>
                <span>{{ item.subtitle }}</span>

                <div class="cart-item-price">
                  {{ formatCurrency(item.price) }}
                </div>

                <div class="quantity-control">
                  <button type="button" @click="cartStore.decreaseQuantity(item.id)">−</button>
                  <span>{{ item.quantity }}</span>
                  <button type="button" @click="cartStore.increaseQuantity(item.id)">+</button>
                </div>
              </div>

              <button type="button" class="remove-button" @click="cartStore.removeProduct(item.id)">
                Remover
              </button>
            </article>
          </div>

          <footer class="cart-footer">
            <div class="cart-total-line">
              <span>Subtotal</span>
              <strong>{{ formatCurrency(cartStore.totalPrice) }}</strong>
            </div>

            <p>
              Frete e descontos serão calculados na próxima etapa da compra.
            </p>

            <button type="button" class="checkout-button" @click="goToCheckout">
              Finalizar pedido
            </button>

            <button type="button" class="secondary-action" @click="closeCart">
              Continuar comprando
            </button>
          </footer>
        </div>
      </aside>
    </div>
  </Teleport>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useCartStore } from '../../stores/cartStore'

const router = useRouter()
const cartStore = useCartStore()

function closeCart() {
  cartStore.closeCart()
}

function goToCheckout() {
  if (cartStore.items.length === 0) {
    return
  }

  cartStore.closeCart()
  router.push('/checkout')
}

function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}
</script>

<style scoped src="./CartDrawer.css"></style>