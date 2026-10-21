<template>
  <div class="checkout-view">
    <section v-if="cartStore.items.length === 0 && !paymentResult" class="empty-checkout">
      <h1>Seu carrinho está vazio</h1>
      <RouterLink to="/produtos">Ver produtos</RouterLink>
    </section>
    <section v-else class="checkout-section">
      <div class="checkout-content">
        <div class="checkout-header">
          <p>Finalização</p>
          <h1>Checkout seguro</h1>
          <span>Pix ou cartão sem sair da loja. O pedido será confirmado após a aprovação.</span>
        </div>

        <div v-if="paymentResult" class="form-card" aria-live="polite">
          <h2>Pedido {{ paymentResult.orderNumber }}</h2>
          <p v-if="paymentStatus === 'PAID'">Pagamento confirmado! Obrigado pela compra.</p>
          <p v-else>Pagamento aguardando confirmação. Não efetue outra cobrança para este pedido.</p>
          <p v-if="paymentStatus !== 'PAID' && automaticChecksLeft > 0" class="payment-hint" role="status">Verificando automaticamente o pagamento…</p>
          <template v-if="paymentResult.pixQrCode">
            <p>Abra o aplicativo do banco e leia o QR Code ou copie o Pix:</p>
            <img v-if="paymentResult.pixQrCodeBase64" class="pix-image" :src="`data:image/png;base64,${paymentResult.pixQrCodeBase64}`" alt="QR Code Pix para pagar este pedido" />
            <textarea readonly rows="4" :value="paymentResult.pixQrCode" aria-label="Código Pix copia e cola" />
            <button type="button" class="payment-action" @click="copyPix">Copiar código Pix</button>
          </template>
          <button v-if="paymentStatus !== 'PAID'" type="button" class="payment-action" :disabled="checkingStatus" @click="refreshPaymentStatus">
            {{ checkingStatus ? 'Consultando...' : 'Já paguei — verificar pagamento' }}
          </button>
          <p v-if="checkoutError" role="alert" class="payment-error">{{ checkoutError }}</p>
        </div>

        <template v-else>
          <form ref="formElement" class="checkout-form" @submit.prevent="finishOrder">
            <div class="form-card">
              <h2>Dados pessoais</h2>
              <div class="form-grid">
                <label>Nome completo<input v-model="form.name" type="text" autocomplete="name" required /></label>
                <label>E-mail<input v-model="form.email" type="email" autocomplete="email" required /></label>
                <label>Telefone<input v-model="form.phone" type="tel" required /></label>
                <label>CPF<input v-model="form.document" type="text" required /></label>
              </div>
            </div>
            <div class="form-card">
              <h2>Endereço de entrega</h2>
              <div class="form-grid">
                <label>CEP<input v-model="form.zipCode" type="text" required /></label>
                <label>Cidade<input v-model="form.city" type="text" required /></label>
                <label class="full-field">Endereço<input v-model="form.address" type="text" required /></label>
                <label>Número<input v-model="form.number" type="text" required /></label>
                <label>Complemento<input v-model="form.complement" type="text" /></label>
              </div>
            </div>
            <div class="form-card">
              <h2>Como deseja pagar?</h2>
              <label class="pay-choice"><input v-model="paymentMethod" type="radio" value="pix" /> Pix — QR Code e Copia e Cola</label>
              <label class="pay-choice"><input v-model="paymentMethod" type="radio" value="card" /> Cartão de crédito — sem sair da loja</label>
              <label class="pay-choice"><input v-model="paymentMethod" type="radio" value="pro" /> Mercado Pago — checkout externo (alternativa)</label>
              <p v-if="paymentMethod !== 'pro' && !transparentAvailable" class="payment-hint">Integração transparente ainda não configurada. Configure a chave pública no frontend e habilite o backend.</p>
            </div>
            <p v-if="checkoutError" role="alert" class="payment-error">{{ checkoutError }}</p>
            <button type="submit" class="finish-button" :disabled="submitting || (paymentMethod !== 'pro' && !transparentAvailable)">
              {{ submitting ? 'Processando...' : paymentMethod === 'pix' ? 'Gerar Pix' : paymentMethod === 'card' ? 'Continuar com cartão' : 'Ir para Mercado Pago' }}
            </button>
          </form>
          <div v-if="cardVisible" class="form-card card-brick-panel">
            <h2>Dados do cartão</h2>
            <p>Preencha os campos seguros do Mercado Pago. O valor definitivo é calculado pelo servidor.</p>
            <div id="cardPaymentBrick_container"></div>
            <p v-if="checkoutError" role="alert" class="payment-error">{{ checkoutError }}</p>
          </div>
        </template>
      </div>
      <aside class="order-summary">
        <h2>Resumo do pedido</h2>
        <div class="summary-items">
          <article v-for="item in cartStore.items" :key="item.id" class="summary-item">
            <img :src="item.image" :alt="item.name" />
            <div><strong>{{ item.name }} - {{ item.volume }}</strong><span>Qtd: {{ item.quantity }}</span><p>{{ formatCurrency(item.price * item.quantity) }}</p></div>
          </article>
        </div>
        <div class="summary-lines">
          <div><span>Subtotal</span><strong>{{ formatCurrency(cartStore.totalPrice) }}</strong></div>
          <div><span>Frete</span><strong>{{ shippingFee === 0 ? 'Grátis' : formatCurrency(shippingFee) }}</strong></div>
          <div class="summary-total"><span>Total estimado</span><strong>{{ formatCurrency(orderTotal) }}</strong></div>
        </div>
        <p class="summary-note">Frete provisório. Não considere o pedido pago até a confirmação do Mercado Pago.</p>
      </aside>
    </section>
  </div>
</template>

<script setup>
import { computed, reactive, ref, nextTick, onBeforeUnmount, watch } from 'vue'
import { apiFetch } from '../services/api'
import { useCartStore } from '../stores/cartStore'

const cartStore = useCartStore()
const key = (import.meta.env.VITE_MP_PUBLIC_KEY || '').trim()
const transparentAvailable = !!key && import.meta.env.VITE_MP_TRANSPARENT_ENABLED === 'true'
const paymentMethod = ref(transparentAvailable ? 'pix' : 'pro')
const formElement = ref(null)
const form = reactive({ name: '', email: '', phone: '', document: '', zipCode: '', city: '', address: '', number: '', complement: '' })
const checkoutError = ref('')
const submitting = ref(false)
const cardVisible = ref(false)
const paymentResult = ref(null)
const paymentStatus = ref('')
const checkingStatus = ref(false)
const automaticChecksLeft = ref(0)
const STATUS_CHECK_INTERVAL_MS = 8000
const MAX_AUTOMATIC_CHECKS = 15
let statusTimer = null
let destroyed = false
let brickController = null
const shippingFee = computed(() => cartStore.totalPrice >= 299 ? 0 : 19.9)
const orderTotal = computed(() => cartStore.totalPrice + shippingFee.value)
const checkoutData = () => ({ ...form, items: cartStore.items.map(({ id, quantity }) => ({ id, quantity })) })

function loadMercadoPago() {
  if (window.MercadoPago) return Promise.resolve()
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = 'https://sdk.mercadopago.com/js/v2'
    script.onload = resolve
    script.onerror = () => reject(new Error('Não foi possível carregar o formulário de cartão'))
    document.head.appendChild(script)
  })
}

async function beginCard() {
  if (brickController) return
  cardVisible.value = true
  await nextTick()
  await loadMercadoPago()
  const mp = new window.MercadoPago(key, { locale: 'pt-BR' })
  brickController = await mp.bricks().create('cardPayment', 'cardPaymentBrick_container', {
    initialization: { amount: Number(orderTotal.value.toFixed(2)) },
    callbacks: {
      onReady: () => {},
      onError: () => { checkoutError.value = 'Verifique os campos do cartão ou tente novamente.' },
      onSubmit: async (cardData) => {
        if (submitting.value) return
        submitting.value = true
        checkoutError.value = ''
        try {
          const result = await apiFetch('/checkout/transparent', {
            method: 'POST',
            body: JSON.stringify({ checkout: checkoutData(), method: 'card', cardToken: cardData.token,
              brand: cardData.payment_method_id, installments: Number(cardData.installments) }),
          })
          paymentResult.value = result
          paymentStatus.value = result.status
        } catch (error) {
          checkoutError.value = error.message || 'Não foi possível processar o cartão'
          throw error
        } finally { submitting.value = false }
      },
    },
  })
}

async function finishOrder() {
  if (submitting.value || paymentResult.value) return
  checkoutError.value = ''
  if (!formElement.value?.checkValidity()) { formElement.value?.reportValidity(); return }
  if (paymentMethod.value === 'card') {
    try { await beginCard() } catch (error) { checkoutError.value = error.message || 'Falha ao carregar formulário' }
    return
  }
  submitting.value = true
  try {
    if (paymentMethod.value === 'pro') {
      const result = await apiFetch('/checkout', { method: 'POST', body: JSON.stringify(checkoutData()) })
      if (!result.checkoutUrl?.startsWith('https://')) throw new Error('Link de pagamento inválido')
      window.location.assign(result.checkoutUrl)
    } else {
      const result = await apiFetch('/checkout/transparent', { method: 'POST', body: JSON.stringify({ checkout: checkoutData(), method: 'pix' }) })
      paymentResult.value = result
      paymentStatus.value = result.status
    }
  } catch (error) { checkoutError.value = error.message || 'Não foi possível criar o pedido' }
  finally { submitting.value = false }
}

function stopAutomaticChecks() {
  if (statusTimer !== null) {
    clearTimeout(statusTimer)
    statusTimer = null
  }
  automaticChecksLeft.value = 0
}

// A consulta consulta a cobrança existente. Nunca cria uma nova cobrança.
function scheduleStatusCheck() {
  if (destroyed || !paymentResult.value || paymentStatus.value === 'PAID' || automaticChecksLeft.value <= 0) return
  if (statusTimer !== null) clearTimeout(statusTimer)
  statusTimer = setTimeout(async () => {
    statusTimer = null
    if (destroyed || paymentStatus.value === 'PAID') return
    // Não disputa a mesma requisição com o botão de consulta manual.
    if (checkingStatus.value) { scheduleStatusCheck(); return }
    automaticChecksLeft.value -= 1
    await refreshPaymentStatus(true)
    scheduleStatusCheck()
  }, STATUS_CHECK_INTERVAL_MS)
}

watch(paymentResult, (result) => {
  stopAutomaticChecks()
  if (result && paymentStatus.value !== 'PAID') {
    automaticChecksLeft.value = MAX_AUTOMATIC_CHECKS
    scheduleStatusCheck()
  }
})

watch(paymentStatus, (status) => {
  if (status === 'PAID') {
    stopAutomaticChecks()
    checkoutError.value = ''
  }
})

async function refreshPaymentStatus(silent = false) {
  if (!paymentResult.value || checkingStatus.value) return
  checkingStatus.value = true
  checkoutError.value = ''
  try {
    const result = await apiFetch(`/checkout/transparent/${encodeURIComponent(paymentResult.value.orderNumber)}/status`)
    paymentStatus.value = result.status
    if (!silent && result.status !== 'PAID') checkoutError.value = 'Pagamento ainda não confirmado. Aguarde e consulte novamente.'
  } catch (error) { if (!silent) checkoutError.value = error.message || 'Não foi possível consultar o pagamento' }
  finally { checkingStatus.value = false }
}

async function copyPix() {
  try { await navigator.clipboard.writeText(paymentResult.value.pixQrCode) }
  catch { checkoutError.value = 'Selecione e copie manualmente o código Pix.' }
}

onBeforeUnmount(() => { destroyed = true; stopAutomaticChecks(); brickController?.unmount?.() })
function formatCurrency(value) { return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value) }
</script>

<style scoped src="./CheckoutView.css"></style>
<style scoped>
.pay-choice { display:flex;align-items:center;gap:10px;margin:12px 0;cursor:pointer; }
.pay-choice input { width:auto;accent-color:#a87c44; }
.payment-hint {font-size:13px;color:#885628}
.payment-error {color:#ab2626;margin:12px 0}
.card-brick-panel {margin-top:22px}
.pix-image {display:block;width:min(100%,280px);height:auto;margin:16px auto}
.payment-action {display:block;padding:12px 18px;background:#3d2c20;color:white;border:0;border-radius:6px;margin:14px 0;cursor:pointer}
textarea {width:100%;box-sizing:border-box;padding:12px;overflow-wrap:anywhere}
</style>
