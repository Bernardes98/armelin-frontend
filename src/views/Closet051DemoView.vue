<template>
  <div class="closet-page" id="closet-top">
    <div class="closet-preview">PROPOSTA VISUAL NÃO OFICIAL · DEMONSTRAÇÃO DE SITE</div>
    <header class="closet-header">
      <a class="closet-brand" href="#closet-top" aria-label="Closet 051 — início">Closet <span>051</span></a>
      <nav class="closet-nav" aria-label="Navegação"><a href="#colecao">Coleção</a><a href="#closet-curadoria">Nossa curadoria</a><a href="#como-comprar">Como comprar</a></nav>
      <a class="closet-header-cta" :href="contactUrl" target="_blank" rel="noopener noreferrer">Atendimento <span>↗</span></a>
    </header>

    <main>
      <section class="closet-hero">
        <div class="closet-hero-text">
          <p class="closet-kicker">MODA FEMININA · PORTO ALEGRE</p>
          <h1>Seu estilo,<br><em>sua essência.</em></h1>
          <p class="closet-intro">Uma curadoria de moda feminina para acompanhar cada momento. Peças que combinam conforto, elegância e personalidade.</p>
          <div class="closet-hero-actions"><a class="closet-button" href="#colecao">Explorar coleção <span>↗</span></a><a class="closet-text-link" :href="contactUrl" target="_blank" rel="noopener noreferrer">Falar com a Closet ↗</a></div>
          <div class="closet-hero-foot"><span>CURADORIA EXCLUSIVA</span><span>ATENDIMENTO PERSONALIZADO</span></div>
        </div>
        <div class="closet-hero-visual"><img :src="heroImage" alt="Referência de look feminino da Closet 051"/><div class="closet-photo-label">LOOKS QUE CONTAM HISTÓRIAS <span>✳</span></div></div>
      </section>
      <div class="closet-strip"><div class="closet-strip-track"><span v-for="n in 2" :key="n">✦ &nbsp; ESTILO PARA TODOS OS MOMENTOS &nbsp; ✦ &nbsp; CURADORIA COM PERSONALIDADE &nbsp; ✦ &nbsp; ENCONTRE SEU PRÓXIMO LOOK &nbsp;</span></div></div>
      <section class="closet-trust" aria-label="Diferenciais">
        <div><span>✧</span><strong>Curadoria exclusiva</strong><small>Peças escolhidas com personalidade</small></div>
        <div><span>◷</span><strong>Atendimento agendado</strong><small>Uma experiência personalizada</small></div>
        <div><span>♡</span><strong>Estacionamento gratuito</strong><small>Para visitas com horário marcado</small></div>
        <div><span>↗</span><strong>Envios para todo o Brasil</strong><small>Consulte as condições com a loja</small></div>
      </section>

      <section id="colecao" class="closet-section closet-collection">
        <div class="closet-section-heading"><div><p class="closet-kicker">SUA PRÓXIMA DESCOBERTA</p><h2>Uma coleção para<br><em>chamar de sua.</em></h2></div><p>Inspirações que valorizam a individualidade. Descubra peças que fazem sentido para seu estilo.</p></div>
        <div class="closet-category-grid"><a v-for="category in categoryCards" :key="category.name" href="#vitrine" @click="categorySelected = category.filter"><img :src="category.image" :alt="category.name" loading="lazy"/><div class="closet-category-caption"><span>{{ category.name }}</span><b>↗</b></div></a></div>
      </section>

      <section id="vitrine" class="closet-section closet-catalog">
        <div class="closet-section-heading"><div><p class="closet-kicker">PEÇAS SELECIONADAS</p><h2>O seu próximo<br><em>look favorito.</em></h2></div><p>Explore esta vitrine conceitual. Disponibilidade e tamanhos serão confirmados diretamente com a boutique.</p></div>
        <div class="closet-filters"><label class="closet-search"><span>⌕</span><input v-model.trim="search" type="search" placeholder="Buscar uma peça..." aria-label="Buscar peças"/></label><div class="closet-filter-scroll" aria-label="Filtrar por categoria"><button v-for="item in filters" :key="item" type="button" :class="{ active: categorySelected === item }" @click="categorySelected = item">{{ item }}</button></div><label class="closet-size">Tamanho <select v-model="sizeSelected" aria-label="Filtrar por tamanho"><option value="Todos">Todos</option><option v-for="size in ['PP','P','M','G']" :key="size">{{size}}</option></select></label></div>
        <p class="closet-demo-notice">Fotos de referência do Instagram · Produtos, nomes e tamanhos ilustrativos para apresentação.</p>
        <div v-if="visibleProducts.length" class="closet-products"><article v-for="item in visibleProducts" :key="item.id" class="closet-item"><div class="closet-item-photo"><img :src="item.image" :alt="item.name" loading="lazy"/><span>CONCEITO</span></div><div class="closet-item-meta"><small>{{ item.category }}</small><h3>{{ item.name }}</h3><p>Tamanhos ilustrativos: {{item.sizes.join(' · ')}}</p><a :href="productContact(item)" target="_blank" rel="noopener noreferrer">Consultar disponibilidade ↗</a></div></article></div>
        <div v-else class="closet-empty">Nenhuma peça encontrada. Experimente outra categoria ou tamanho. <button type="button" @click="resetFilters">Limpar filtros</button></div>
      </section>

      <section id="closet-curadoria" class="closet-story"><div class="closet-story-photo"><img :src="storyImage" alt="Referência editorial com conjunto feminino rosé" loading="lazy"/></div><div class="closet-story-content"><p class="closet-kicker">A ESSÊNCIA DO NOSSO CLOSET</p><h2>Mais que vestir.<br><em>É sentir-se bem.</em></h2><p>A Closet 051 reúne propostas para diferentes estilos e ocasiões, com uma seleção de peças que valorizam sua personalidade.</p><p>Uma experiência de boutique, com atendimento próximo e atenção aos detalhes.</p><a :href="contactUrl" target="_blank" rel="noopener noreferrer">Agendar atendimento ↗</a></div></section>

      <section id="como-comprar" class="closet-section closet-how"><p class="closet-kicker">PRÁTICO E PERSONALIZADO</p><h2>Escolher bem é<br><em>simples assim.</em></h2><div class="closet-steps"><div><span>01</span><h3>Encontre seu estilo</h3><p>Explore a coleção e descubra os looks que combinam com você.</p></div><div><span>02</span><h3>Consulte sua peça</h3><p>Entre em contato para verificar numeração, disponibilidade e valores.</p></div><div><span>03</span><h3>Combine o atendimento</h3><p>Converse sobre envio ou visita com hora marcada.</p></div></div></section>
      <section class="closet-final"><p class="closet-kicker">CLOSET 051 · PORTO ALEGRE</p><h2>Seu próximo look<br><em>começa aqui.</em></h2><p>Uma curadoria especial espera por você.</p><a class="closet-button" :href="contactUrl" target="_blank" rel="noopener noreferrer">Conversar pelo WhatsApp ↗</a></section>
    </main>
    <footer class="closet-footer"><a class="closet-brand" href="#closet-top">Closet <span>051</span></a><div><a href="https://www.instagram.com/closet051/" target="_blank" rel="noopener noreferrer">Instagram ↗</a><a :href="contactUrl" target="_blank" rel="noopener noreferrer">WhatsApp ↗</a></div><small>DOC Santana · Porto Alegre/RS. Demonstração conceitual não oficial, sem compras reais.</small></footer>
  </div>
</template>
<script setup>
import { computed, ref } from 'vue'
import './Closet051DemoView.css'
import heroImage from '../assets/closet051/hero.webp'
import storyImage from '../assets/closet051/rose-editorial.webp'
import creamKnit from '../assets/closet051/cream-knit.webp'
import blackSet from '../assets/closet051/black-set.webp'
import roseCardigan from '../assets/closet051/rose-cardigan.webp'
import roseTop from '../assets/closet051/rose-top.webp'
import roseKnit from '../assets/closet051/rose-knit.webp'
import ivoryLook from '../assets/closet051/ivory-look.webp'
import casualLook from '../assets/closet051/casual-look.webp'
const contactUrl = 'https://wa.me/message/MEVUQYQGGFWCH1'
const categorySelected = ref('Todas')
const sizeSelected = ref('Todos')
const search = ref('')
const filters = ['Todas', 'Tricots', 'Casacos', 'Conjuntos', 'Vestidos', 'Casual']
const categoryCards = [
  {name:'Tricots',filter:'Tricots',image:creamKnit},
  {name:'Conjuntos',filter:'Conjuntos',image:ivoryLook},
  {name:'Casual',filter:'Casual',image:roseTop},
  {name:'Casacos',filter:'Casacos',image:roseCardigan},
]
const products = [
 {id:1,name:'Tricot off-white',category:'Tricots',sizes:['P','M','G'],image:creamKnit},
 {id:2,name:'Conjunto neutro',category:'Conjuntos',sizes:['PP','P','M'],image:ivoryLook},
 {id:3,name:'Cardigan rosé',category:'Casacos',sizes:['P','M','G'],image:roseCardigan},
 {id:4,name:'Blusa rosé',category:'Casual',sizes:['PP','P','M'],image:roseTop},
 {id:5,name:'Tricot rosa',category:'Tricots',sizes:['P','M'],image:roseKnit},
 {id:6,name:'Conjunto preto',category:'Conjuntos',sizes:['P','M','G'],image:blackSet},
 {id:7,name:'Look casual',category:'Casual',sizes:['PP','P','M'],image:casualLook},
 {id:8,name:'Conjunto rosé',category:'Conjuntos',sizes:['P','M','G'],image:storyImage},
]
const visibleProducts = computed(() => products.filter(item => {
 const categoryMatch = categorySelected.value === 'Todas' || item.category === categorySelected.value
 const sizeMatch = sizeSelected.value === 'Todos' || item.sizes.includes(sizeSelected.value)
 const searchMatch = `${item.name} ${item.category}`.toLocaleLowerCase('pt-BR').includes(search.value.toLocaleLowerCase('pt-BR'))
 return categoryMatch && sizeMatch && searchMatch
}))
function resetFilters(){categorySelected.value='Todas';sizeSelected.value='Todos';search.value=''}
function productContact(item){return contactUrl} // O link oficial é genérico; produtos e preços não estão confirmados.
</script>
