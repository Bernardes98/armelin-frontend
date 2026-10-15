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
          <span>Preencha seus dados para criar o pedido e seguir para o pagamento seguro.</span>
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
            <h2>Pagamento seguro pelo Mercado Pago</h2>

            <p>Você escolherá as formas de pagamento disponíveis na página segura do Mercado Pago.</p>
          </div>

          <p v-if="checkoutError" role="alert" style="color:#a32424">{{ checkoutError }}</p>
          <button type="submit" class="finish-button" :disabled="submitting">
            {{ submitting ? 'Processando...' : 'Ir para o pagamento' }}
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
          O frete exibido é provisório. O pedido só será considerado pago após confirmação do Mercado Pago. A loja deve configurar sua política de entregas antes de operar.
        </p>
      </aside>
    </section>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { apiFetch } from '../services/api'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cartStore'

const router = useRouter()
const checkoutError = ref('')
const submitting = ref(false)
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

async function finishOrder() {
  if (submitting.value) return
  checkoutError.value = ''
  submitting.value = true
  try {
    const result = await apiFetch('/checkout', {
      method: 'POST',
      body: JSON.stringify({ ...form, items: cartStore.items.map(({ id, quantity }) => ({ id, quantity })) }),
    })
    if (!result.checkoutUrl?.startsWith('https://')) throw new Error('Link de pagamento inválido')
    // Carrinho mantido até retornar do pagamento, para permitir nova tentativa em falhas.
    window.location.assign(result.checkoutUrl)
  } catch (error) {
    checkoutError.value = error.message || 'Não foi possível criar o pedido'
  } finally {
    submitting.value = false
  }
}

function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}
</script>

<style scoped src="./CheckoutView.css"></style>