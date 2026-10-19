<template>
  <div class="kas-demo">
    <div class="kas-notice"><span>PROPOSTA VISUAL · DEMONSTRAÇÃO NÃO OFICIAL</span><span>Produtos e valores ilustrativos</span></div>
    <header class="kas-header">
      <a class="kas-logo" href="#inicio" @click="menuOpen = false"><span>KA’S</span><small>PERFUMARIA</small></a>
      <nav :class="{ 'kas-nav--open': menuOpen }" aria-label="Navegação da demonstração">
        <a href="#inicio" @click="menuOpen = false">Início</a>
        <a href="#colecao" @click="menuOpen = false">Fragrâncias</a>
        <a href="#experiencia" @click="menuOpen = false">Nossa proposta</a>
        <a href="#contato" @click="menuOpen = false">Contato</a>
      </nav>
      <div class="kas-actions">
        <button type="button" class="kas-bag" :aria-label="`Abrir sacola demonstrativa com ${bagCount} itens`" @click="bagOpen = true">Sacola <span>{{ bagCount }}</span></button>
        <button type="button" class="kas-menu" :aria-expanded="menuOpen" aria-label="Abrir menu" @click="menuOpen = !menuOpen">☰</button>
      </div>
    </header>

    <main id="inicio">
      <section class="kas-hero">
        <div class="kas-hero-copy">
          <span class="kas-eyebrow"><i></i> SUA PRÓXIMA ESSÊNCIA</span>
          <h1>Uma fragrância.<br /><em>Mil maneiras</em><br />de ser você.</h1>
          <p>Elegância em cada detalhe. Uma experiência de perfumaria feita para descobrir novas sensações e encontrar a sua assinatura.</p>
          <div class="kas-hero-actions"><a href="#colecao" class="kas-button kas-button--dark">Explorar fragrâncias <span>↗</span></a><a href="#experiencia" class="kas-text-link">Conheça a experiência →</a></div>
          <div class="kas-hero-foot"><span>01 / 03</span><span class="kas-line"></span><span>BELEZA QUE PERMANECE</span></div>
        </div>
        <div class="kas-hero-image" role="img" aria-label="Frasco de perfume em composição editorial elegante"><span class="kas-image-tag">O perfume certo muda tudo.</span></div>
      </section>

      <div class="kas-ticker"><span>FRAGRÂNCIAS PARA CADA MOMENTO</span><b>✦</b><span>DESCUBRA SUA ESSÊNCIA</span><b>✦</b><span>ESCOLHAS COM PERSONALIDADE</span></div>

      <section class="kas-feature" id="experiencia">
        <div><span class="kas-eyebrow">MAIS DO QUE UM PERFUME</span><h2>Perfumes que contam <em>histórias.</em></h2></div>
        <p>Do aroma delicado ao mais marcante, uma seleção pensada para quem acredita que cada detalhe faz parte de quem somos. Conheça o conceito que pode dar vida à loja online da Ka’s.</p>
      </section>

      <section id="colecao" class="kas-collection">
        <div class="kas-section-heading"><div><span class="kas-eyebrow">A CURADORIA</span><h2>Encontre sua <em>essência.</em></h2></div><span class="kas-section-aside">Vitrine ilustrativa para apresentação</span></div>
        <div class="kas-filters" role="group" aria-label="Filtrar perfumes"><button v-for="filter in filters" :key="filter" type="button" :class="{ active: selectedFilter === filter }" @click="selectedFilter = filter">{{ filter }}</button><label class="kas-search"><span aria-hidden="true">⌕</span><input v-model="query" aria-label="Buscar produtos de demonstração" placeholder="Buscar fragrância" /></label></div>
        <div v-if="filteredProducts.length" class="kas-grid">
          <article v-for="product in filteredProducts" :key="product.id" class="kas-product">
            <div class="kas-product-image" :style="{ background: product.bg }"><span class="kas-product-category">{{ product.category }}</span><img :src="product.image" :alt="`Foto ilustrativa de perfume: ${product.name}`" loading="lazy" /><button class="kas-quick-add" type="button" :aria-label="`Adicionar ${product.name} à sacola de demonstração`" @click="addToBag(product)">+ Adicionar à sacola</button></div>
            <div class="kas-product-info"><div><h3>{{ product.name }}</h3><p>{{ product.notes }}</p></div><strong>{{ formatPrice(product.price) }}</strong></div>
          </article>
        </div>
        <div v-else class="kas-empty">Nenhuma fragrância encontrada. Experimente outra busca.</div>
        <p class="kas-disclaimer">* Fotos, descrições e preços acima são exemplos para demonstrar o layout. Não representam o estoque, as marcas comercializadas ou os valores reais da Ka’s Perfumaria.</p>
      </section>

      <section class="kas-editorial"><div class="kas-editorial-image" role="img" aria-label="Cena editorial com frasco de perfume"></div><div class="kas-editorial-content"><span class="kas-eyebrow">SEU PERFUME. SUA IDENTIDADE.</span><h2>O detalhe que fica <em>na memória.</em></h2><p>Uma loja feita para apresentar cada fragrância com cuidado — e transformar a descoberta do perfume ideal em uma experiência especial.</p><a href="#colecao" class="kas-button kas-button--light">Descobrir a coleção <span>↗</span></a></div></section>

      <section id="contato" class="kas-contact"><span class="kas-eyebrow">KA’S PERFUMARIA</span><h2>Uma nova forma de <em>encantar.</em></h2><p>Esta é uma proposta de site desenvolvida para apresentação. WhatsApp, Instagram, produtos e condições comerciais oficiais poderão ser integrados após a aprovação.</p><a href="#inicio" class="kas-text-link">Voltar ao início ↑</a></section>
    </main>
    <footer class="kas-footer"><div class="kas-logo"><span>KA’S</span><small>PERFUMARIA</small></div><span>Conceito de loja virtual · Projeto demonstrativo</span><span>© {{ new Date().getFullYear() }}</span></footer>

    <div v-if="bagOpen" class="kas-modal" @click.self="bagOpen = false"><section class="kas-drawer" role="dialog" aria-modal="true" aria-label="Sacola de demonstração"><header><div><span class="kas-eyebrow">SUA SELEÇÃO</span><h2>Minha sacola</h2></div><button type="button" class="kas-close" aria-label="Fechar sacola" @click="bagOpen = false">×</button></header><p class="kas-demo-alert">Simulação visual: nenhum pedido ou pagamento será realizado.</p><div v-if="!bag.length" class="kas-empty">Sua sacola está vazia.</div><div v-for="(item, index) in bag" :key="index" class="kas-bag-item"><img :src="item.image" :alt="item.name" /><div><strong>{{ item.name }}</strong><span>{{ formatPrice(item.price) }}</span></div><button type="button" :aria-label="`Remover ${item.name}`" @click="bag.splice(index, 1)">Remover</button></div><div class="kas-bag-total"><span>Total ilustrativo</span><strong>{{ formatPrice(total) }}</strong></div><button class="kas-button kas-button--dark kas-bag-end" type="button" @click="bagOpen = false">Continuar explorando</button></section></div>
  </div>
</template>
<script setup>
import { computed, ref } from 'vue'
import './KasDemoView.css'
const menuOpen = ref(false)
const bagOpen = ref(false)
const selectedFilter = ref('Todos')
const query = ref('')
const bag = ref([])
const filters = ['Todos', 'Feminino', 'Masculino', 'Unissex']
// Dados exclusivamente ilustrativos. Não representam o catálogo real da Ka's.
const demoProducts = [
  { id: 1, name: 'Aurora', notes: 'Floral · Delicado · Elegante', category: 'Feminino', price: 189.90, bg: '#ede6df', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=700&q=80' },
  { id: 2, name: 'Noir', notes: 'Amadeirado · Intenso · Marcante', category: 'Masculino', price: 249.90, bg: '#e9e9e7', image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=700&q=80' },
  { id: 3, name: 'Éclat', notes: 'Fresco · Luminoso · Versátil', category: 'Unissex', price: 219.90, bg: '#efe7d8', image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=700&q=80' },
  { id: 4, name: 'Belle', notes: 'Doce · Sofisticado · Aconchegante', category: 'Feminino', price: 199.90, bg: '#f0e2dd', image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=700&q=80' },
]
const filteredProducts = computed(() => demoProducts.filter(p => (selectedFilter.value === 'Todos' || p.category === selectedFilter.value) && `${p.name} ${p.notes} ${p.category}`.toLocaleLowerCase('pt-BR').includes(query.value.trim().toLocaleLowerCase('pt-BR'))))
const bagCount = computed(() => bag.value.length)
const total = computed(() => bag.value.reduce((sum, p) => sum + p.price, 0))
const formatPrice = amount => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(amount)
function addToBag(product) { bag.value.push(product); bagOpen.value = true }
</script>
