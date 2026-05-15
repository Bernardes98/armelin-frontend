<template>
  <div class="order-success-view">
    <section v-if="order" class="success-section">
      <div class="success-card">
        <div class="success-icon">
          ✓
        </div>

        <p>Pedido recebido</p>
        <h1>Compra finalizada com sucesso</h1>

        <span>
          Obrigado, {{ order.customer.name }}. Seu pedido foi gerado e está aguardando a próxima
          etapa de processamento.
        </span>

        <div class="order-number-box">
          <small>Número do pedido</small>
          <strong>{{ order.number }}</strong>
        </div>

        <div class="success-actions">
          <RouterLink to="/produtos" class="primary-action">
            Continuar comprando
          </RouterLink>

          <RouterLink to="/" class="secondary-action">
            Voltar para início
          </RouterLink>
        </div>
      </div>

      <aside class="success-summary">
        <h2>Resumo do pedido</h2>

        <div class="order-info-grid">
          <div>
            <span>Data</span>
            <strong>{{ formattedDate }}</strong>
          </div>

          <div>
            <span>Pagamento</span>
            <strong>{{ paymentLabel }}</strong>
          </div>

          <div>
            <span>Entrega</span>
            <strong>{{ order.delivery.city }}</strong>
          </div>
        </div>

        <div class="success-items">
          <article v-for="item in order.items" :key="item.id" class="success-item">
            <img :src="item.image" :alt="item.name" />

            <div>
              <strong>{{ item.name }} - {{ item.volume }}</strong>
              <span>Quantidade: {{ item.quantity }}</span>
              <p>{{ formatCurrency(item.price * item.quantity) }}</p>
            </div>
          </article>
        </div>

        <div class="success-total-lines">
          <div>
            <span>Subtotal</span>
            <strong>{{ formatCurrency(order.subtotal) }}</strong>
          </div>

          <div>
            <span>Frete</span>
            <strong>{{ order.shippingFee === 0 ? 'Grátis' : formatCurrency(order.shippingFee) }}</strong>
          </div>

          <div class="success-total">
            <span>Total</span>
            <strong>{{ formatCurrency(order.total) }}</strong>
          </div>
        </div>

        <div class="delivery-box">
          <h3>Endereço de entrega</h3>
          <p>
            {{ order.delivery.address }}, {{ order.delivery.number }}
            <template v-if="order.delivery.complement">
              - {{ order.delivery.complement }}
            </template>
          </p>
          <p>{{ order.delivery.city }} - CEP {{ order.delivery.zipCode }}</p>
        </div>
      </aside>
    </section>

    <section v-else class="missing-order">
      <h1>Pedido não encontrado</h1>
      <p>
        Não encontramos os dados do último pedido nesta sessão. Volte para a loja e simule uma nova
        compra.
      </p>

      <RouterLink to="/produtos">
        Ver produtos
      </RouterLink>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const order = computed(() => {
  const storedOrder = sessionStorage.getItem('armelin-last-order')

  if (!storedOrder) {
    return null
  }

  try {
    const parsedOrder = JSON.parse(storedOrder)

    if (parsedOrder.number !== route.params.orderNumber) {
      return null
    }

    return parsedOrder
  } catch {
    sessionStorage.removeItem('armelin-last-order')
    return null
  }
})

const formattedDate = computed(() => {
  if (!order.value?.createdAt) {
    return ''
  }

  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(order.value.createdAt))
})

const paymentLabel = computed(() => {
  const labels = {
    pix: 'Pix',
    card: 'Cartão de crédito',
    boleto: 'Boleto',
  }

  return labels[order.value?.paymentMethod] || 'Não informado'
})

function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}
</script>

<style scoped src="./OrderSuccessView.css"></style>