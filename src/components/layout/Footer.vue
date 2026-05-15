<template>
  <footer class="site-footer">
    <section class="footer-newsletter">
      <div class="footer-newsletter-content">
        <div>
          <p>Receba novidades</p>
          <h2>Fique por dentro dos lançamentos</h2>
          <span>
            Cadastre seu e-mail para receber novidades, promoções e conteúdos sobre fragrâncias.
          </span>
        </div>

        <form class="newsletter-form" @submit.prevent="handleNewsletterSubmit">
          <input v-model="email" type="email" placeholder="Digite seu e-mail" required />
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </section>

    <section class="footer-main">
      <div class="footer-brand">
        <RouterLink to="/" class="footer-logo">
          <span class="footer-logo-main">ARMELIN</span>
          <span class="footer-logo-subtitle">Perfumes</span>
        </RouterLink>

        <p>
          Fragrâncias selecionadas para transformar momentos em experiências marcantes, com
          elegância, personalidade e sofisticação.
        </p>

        <div class="social-links">
          <a href="#" aria-label="Instagram">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5A4.5 4.5 0 1 1 12 16.5 4.5 4.5 0 0 1 12 7.5Zm0 2A2.5 2.5 0 1 0 12 14.5 2.5 2.5 0 0 0 12 9.5ZM17.8 6.2a1 1 0 1 1-1 1 1 1 0 0 1 1-1Z"
              />
            </svg>
          </a>

          <a href="#" aria-label="Facebook">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.5 1.6-1.5h1.7V4.9c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V11H7.3v3h2.8v8h3.4Z"
              />
            </svg>
          </a>

          <a href="#" aria-label="WhatsApp">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M12 2a9.9 9.9 0 0 1 10 9.8 9.7 9.7 0 0 1-9.9 9.7 10.2 10.2 0 0 1-4.8-1.2L2 22l1.8-5.1A9.4 9.4 0 0 1 2.1 11.8 9.8 9.8 0 0 1 12 2Zm0 2a7.8 7.8 0 0 0-7.9 7.8 7.5 7.5 0 0 0 1.5 4.6l.4.5-1 2.7 2.9-.9.5.3a8 8 0 0 0 3.7.9 7.8 7.8 0 0 0 7.9-7.7A7.8 7.8 0 0 0 12 4Zm-3.2 3.7c.2 0 .4 0 .5.4l.7 1.7c.1.3.1.4-.1.6l-.4.5c-.2.2-.2.4 0 .6a8.2 8.2 0 0 0 1.4 1.7 6.8 6.8 0 0 0 2 1.2c.3.1.5.1.7-.1l.7-.8c.2-.2.4-.2.6-.1l1.7.8c.3.1.4.3.4.5a3 3 0 0 1-.7 1.6 3.3 3.3 0 0 1-2.3.8 8 8 0 0 1-3.6-1.2 9.6 9.6 0 0 1-3.7-4.2 4.2 4.2 0 0 1-.4-2.2 2.7 2.7 0 0 1 .9-1.9c.2-.2.4-.3.6-.3h.4Z"
              />
            </svg>
          </a>
        </div>
      </div>

      <div class="footer-column">
        <h3>Loja</h3>
        <RouterLink to="/produtos">Todos os produtos</RouterLink>
        <RouterLink to="/produtos?categoria=Feminino">Perfumes femininos</RouterLink>
        <RouterLink to="/produtos?categoria=Masculino">Perfumes masculinos</RouterLink>
        <RouterLink to="/produtos?categoria=Unissex">Perfumes unissex</RouterLink>
        <RouterLink to="/produtos?ordenacao=menor-preco">Promoções</RouterLink>
      </div>

      <div class="footer-column">
        <h3>Institucional</h3>
        <RouterLink to="/sobre">Sobre a Armelin</RouterLink>
        <RouterLink to="/politica-de-privacidade">Política de privacidade</RouterLink>
        <RouterLink to="/termos-de-uso">Termos de uso</RouterLink>
        <RouterLink to="/trocas-e-devolucoes">Trocas e devoluções</RouterLink>
        <RouterLink to="/perguntas-frequentes">Perguntas frequentes</RouterLink>
      </div>

      <div class="footer-column footer-contact">
        <h3>Atendimento</h3>

        <span>Segunda a sexta</span>
        <strong>09h às 18h</strong>

        <span>E-mail</span>
        <strong>contato@armelinperfumes.com.br</strong>

        <span>WhatsApp</span>
        <strong>(00) 00000-0000</strong>
      </div>
    </section>

    <section class="footer-payment">
      <div class="payment-content">
        <div>
          <p>Formas de pagamento</p>

          <div class="payment-tags">
            <span>Pix</span>
            <span>Cartão</span>
            <span>Boleto</span>
            <span>Mercado Pago</span>
          </div>
        </div>

        <div>
          <p>Compra segura</p>

          <div class="security-tags">
            <span>SSL</span>
            <span>Ambiente protegido</span>
          </div>
        </div>
      </div>
    </section>

    <section class="footer-bottom">
      <p>
        © {{ currentYear }} Armelin Perfumes. Todos os direitos reservados.
      </p>

      <span>
        Desenvolvido para fins de demonstração da loja virtual.
      </span>
    </section>
  </footer>
</template>

<script setup>
import { ref } from 'vue'
import { useNotificationStore } from '../../stores/notificationStore'

const email = ref('')
const currentYear = new Date().getFullYear()
const notificationStore = useNotificationStore()

function handleNewsletterSubmit() {
  notificationStore.success(
    'Cadastro realizado',
    `O e-mail ${email.value} foi cadastrado para receber novidades.`,
  )

  email.value = ''
}
</script>

<style scoped src="./Footer.css"></style>