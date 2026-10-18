<template>
  <div class="essential">
    <header class="essential__header">
      <RouterLink to="/" class="essential__logo">{{ storefront.name }}</RouterLink>
      <nav aria-label="Navegação principal">
        <a href="#sobre">A loja</a><a href="#destaques">Destaques</a><a href="#contato">Contato</a>
      </nav>
    </header>
    <main>
      <section class="essential__hero">
        <p class="essential__eyebrow">Bem-vindo à {{ storefront.name }}</p>
        <h1>{{ storefront.tagline }}</h1>
        <p>{{ storefront.description }}</p>
        <a v-if="whatsapp" :href="whatsappLink()" target="_blank" rel="noopener noreferrer" class="essential__button">Conversar no WhatsApp</a>
        <a v-else href="#destaques" class="essential__button">Conhecer os destaques</a>
      </section>
      <section id="sobre" class="essential__section essential__about">
        <p class="essential__eyebrow">Nossa essência</p>
        <h2>Perfumes selecionados com cuidado</h2>
        <p>Conheça nossa seleção e fale diretamente com a equipe para consultar disponibilidade, valores e entrega.</p>
      </section>
      <section id="destaques" class="essential__section">
        <p class="essential__eyebrow">Seleção especial</p><h2>Produtos em destaque</h2>
        <p v-if="catalogStatus.loading">Carregando produtos...</p>
        <p v-else-if="catalogStatus.error" role="alert">Não foi possível carregar os produtos. <button type="button" @click="refreshProducts(true)">Tentar novamente</button></p>
        <p v-else-if="!products.length">Em breve, novidades por aqui.</p>
        <div v-else class="essential__grid">
          <article v-for="product in products.slice(0, 8)" :key="product.id" class="essential__card">
            <img v-if="product.image" :src="product.image" :alt="product.name" loading="lazy" />
            <div v-else class="essential__placeholder">{{ storefront.name }}</div>
            <div class="essential__cardbody">
              <span>{{ product.category || 'Fragrância' }}</span>
              <h3>{{ product.name }} <small v-if="product.volume">{{ product.volume }}</small></h3>
              <strong>{{ currency(product.price) }}</strong>
              <a v-if="whatsapp" :href="whatsappLink(`Olá! Gostaria de saber mais sobre ${product.name}${product.volume ? ' ' + product.volume : ''}.`)" target="_blank" rel="noopener noreferrer">Consultar no WhatsApp</a>
              <span v-else>Entre em contato para comprar</span>
            </div>
          </article>
        </div>
      </section>
      <section id="contato" class="essential__section essential__contact">
        <p class="essential__eyebrow">Atendimento personalizado</p>
        <h2>Vamos encontrar a fragrância ideal?</h2>
        <a v-if="whatsapp" :href="whatsappLink()" target="_blank" rel="noopener noreferrer" class="essential__button">Chamar no WhatsApp</a>
        <a v-if="storefront.instagram" :href="instagramUrl" target="_blank" rel="noopener noreferrer">Conheça nosso Instagram</a>
        <p v-if="!whatsapp && !storefront.instagram">Em breve, nossos canais de atendimento.</p>
      </section>
    </main>
    <footer class="essential__footer">© {{ new Date().getFullYear() }} {{ storefront.name }} · Todos os direitos reservados.</footer>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { storefront, whatsappLink } from '../config/storefront'
import { products, catalogStatus, refreshProducts } from '../data/products'
const whatsapp = computed(() => Boolean(storefront.whatsapp))
const instagramUrl = computed(() => storefront.instagram.startsWith('https://') ? storefront.instagram : `https://instagram.com/${storefront.instagram.replace(/^@/, '')}`)
const currency = value => new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(Number(value || 0))
</script>
<style scoped src="./EssentialLandingView.css"></style>
