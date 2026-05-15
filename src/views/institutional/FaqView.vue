<template>
  <div class="institutional-page">
    <section class="institutional-hero">
      <p>Ajuda</p>
      <h1>Perguntas Frequentes</h1>
      <span>
        Tire dúvidas comuns sobre pedidos, entrega, pagamento, produtos e atendimento.
      </span>
    </section>

    <section class="institutional-content">
      <div class="faq-list">
        <article
          v-for="item in questions"
          :key="item.question"
          class="faq-item"
        >
          <button type="button" @click="toggleQuestion(item.question)">
            <span>{{ item.question }}</span>
            <strong>{{ openedQuestion === item.question ? '−' : '+' }}</strong>
          </button>

          <p v-if="openedQuestion === item.question">
            {{ item.answer }}
          </p>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const openedQuestion = ref('Como acompanho meu pedido?')

const questions = [
  {
    question: 'Como acompanho meu pedido?',
    answer:
      'Após a finalização da compra, o cliente receberá informações sobre o pedido e o acompanhamento será disponibilizado conforme a integração de envio definida para a loja.',
  },
  {
    question: 'Quais formas de pagamento são aceitas?',
    answer:
      'A loja poderá aceitar Pix, cartão de crédito e boleto, conforme configuração do meio de pagamento escolhido para o projeto.',
  },
  {
    question: 'O frete é grátis?',
    answer:
      'Nesta versão, a regra demonstrativa considera frete grátis acima de R$ 299,00. Essa regra poderá ser alterada conforme a política comercial da loja.',
  },
  {
    question: 'Posso trocar um produto?',
    answer:
      'Sim, desde que a solicitação respeite os prazos e condições definidos na política de trocas e devoluções da loja.',
  },
  {
    question: 'Os produtos são originais?',
    answer:
      'A loja deve trabalhar apenas com produtos originais e de procedência confiável, conforme definição comercial da marca.',
  },
]

function toggleQuestion(question) {
  openedQuestion.value = openedQuestion.value === question ? '' : question
}
</script>

<style scoped src="./InstitutionalPage.css"></style>