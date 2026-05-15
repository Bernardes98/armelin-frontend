<template>
  <div class="checkout-view">
    <section v-if="cartStore.items.length === 0" class="empty-checkout">
      <h1>Seu carrinho está vazio</h1>
      <p>Adicione produtos ao carrinho antes de finalizar a compra.</p>
      <RouterLink to="/produtos">Ver produtos</RouterLink>
    </section>

    <section v-else class="checkout-section">
      <div class="checkout-content">
        <div class="checkout-header">
          <p>Finalização</p>
          <h1>Checkout</h1>
          <span>Preencha os dados abaixo para simular a finalização do pedido.</span>
        </div>

        <form class="checkout-form" @submit.prevent="finishOrder">
          <div class="form-card">
            <h2>Dados pessoais</h2>

            <div class="form-grid">
              <label>
                Nome completo
                <input v-model="form.name" type="text" placeholder="Digite seu nome" required />
              </label>

              <label>
                E-mail
                <input
                  v-model="form.email"
                  type="email"
                  placeholder="seuemail@exemplo.com"
                  required
                />
              </label>

              <label>
                Telefone
                <input v-model="form.phone" type="text" placeholder="(00) 00000-0000" required />
              </label>

              <label>
                CPF
                <input v-model="form.document" type="text" placeholder="000.000.000-00" required />
              </label>
            </div>
          </div>

          <div class="form-card">
            <h2>Endereço de entrega</h2>

            <div class="form-grid">
              <label>
                CEP
                <input v-model="form.zipCode" type="text" placeholder="00000-000" required />
              </label>

              <label>
                Cidade
                <input v-model="form.city" type="text" placeholder="Digite sua cidade" required />
              </label>

              <label class="full-field">
                Endereço
                <input v-model="form.address" type="text" placeholder="Rua, avenida..." required />
              </label>

              <label>
                Número
                <input v-model="form.number" type="text" placeholder="Número" required />
              </label>

              <label>
                Complemento
                <input v-model="form.complement" type="text" placeholder="Apartamento, bloco..." />
              </label>
            </div>
          </div>

          <div class="form-card">
            <h2>Pagamento</h2>

            <div class="payment-options">
              <label class="payment-option">
                <input v-model="form.paymentMethod" type="radio" value="pix" />
                <span>
                  <strong>Pix</strong>
                  <small>Aprovação rápida</small>
                </span>
              </label>

              <label class="payment-option">
                <input v-model="form.paymentMethod" type="radio" value="card" />
                <span>
                  <strong>Cartão de crédito</strong>
                  <small>Parcele em até 6x sem juros</small>
                </span>
              </label>

              <label class="payment-option">
                <input v-model="form.paymentMethod" type="radio" value="boleto" />
                <span>
                  <strong>Boleto</strong>
                  <small>Compensação em até 3 dias úteis</small>
                </span>
              </label>
            </div>
          </div>

          <button type="submit" class="finish-button">
            Finalizar pedido
          </button>
        </form>
      </div>

      <aside class="order-summary">
        <h2>Resumo do pedido</h2>

        <div class="summary-items">
          <article v-for="item in cartStore.items" :key="item.id" class="summary-item">
            <img :src="item.image" :alt="item.name" />

            <div>
              <strong>{{ item.name }} - {{ item.volume }}</strong>
              <span>Qtd: {{ item.quantity }}</span>
              <p>{{ formatCurrency(item.price * item.quantity) }}</p>
            </div>
          </article>
        </div>

        <div class="summary-lines">
          <div>
            <span>Subtotal</span>
            <strong>{{ formatCurrency(cartStore.totalPrice) }}</strong>
          </div>

          <div>
            <span>Frete</span>
            <strong>{{ shippingFee === 0 ? 'Grátis' : formatCurrency(shippingFee) }}</strong>
          </div>

          <div class="summary-total">
            <span>Total</span>
            <strong>{{ formatCurrency(orderTotal) }}</strong>
          </div>
        </div>

        <p class="summary-note">
          Este checkout é uma simulação visual. Pagamento, frete real e pedido no banco serão
          integrados em uma próxima etapa.
        </p>
      </aside>
    </section>
  </div>
</template>

<script setup>
import { computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cartStore'

const router = useRouter()
const cartStore = useCartStore()

const form = reactive({
  name: '',
  email: '',
  phone: '',
  document: '',
  zipCode: '',
  city: '',
  address: '',
  number: '',
  complement: '',
  paymentMethod: 'pix',
})

const shippingFee = computed(() => {
  return cartStore.totalPrice >= 299 ? 0 : 19.9
})

const orderTotal = computed(() => {
  return cartStore.totalPrice + shippingFee.value
})

function finishOrder() {
  const orderNumber = `ARM-${Date.now().toString().slice(-6)}`

  const order = {
    number: orderNumber,
    createdAt: new Date().toISOString(),
    customer: {
      name: form.name,
      email: form.email,
      phone: form.phone,
      document: form.document,
    },
    delivery: {
      zipCode: form.zipCode,
      city: form.city,
      address: form.address,
      number: form.number,
      complement: form.complement,
    },
    paymentMethod: form.paymentMethod,
    items: cartStore.items.map((item) => ({
      ...item,
    })),
    subtotal: cartStore.totalPrice,
    shippingFee: shippingFee.value,
    total: orderTotal.value,
  }

  sessionStorage.setItem('armelin-last-order', JSON.stringify(order))

  cartStore.clearCart()

  router.push(`/pedido-finalizado/${orderNumber}`)
}

function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}
</script>

<style scoped src="./CheckoutView.css"></style>