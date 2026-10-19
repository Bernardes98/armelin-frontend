<template>
  <div class="porto-demo" id="inicio">
    <div class="porto-demo-ribbon"><span>PROPOSTA DE SITE · DEMONSTRAÇÃO INDEPENDENTE, NÃO OFICIAL</span><span>Produtos e valores ilustrativos</span></div>
    <header class="porto-header">
      <a class="porto-brand" href="#inicio" @click="menuOpen = false"><span class="porto-mark">℘</span><span class="porto-wordmark">PORTO<small>PERFUMARIA</small></span></a>
      <nav :class="['porto-nav', { 'porto-nav-open': menuOpen }]" aria-label="Navegação da demonstração">
        <a href="#colecoes" @click="menuOpen = false">Coleções</a><a href="#vitrine" @click="menuOpen = false">Fragrâncias</a><a href="#historia" @click="menuOpen = false">A Porto</a><a href="#contato" @click="menuOpen = false">Contato</a>
      </nav>
      <div class="porto-head-actions"><button class="porto-outline-btn" type="button" @click="bagOpen = true" :aria-label="`Abrir sacola com ${bagCount} itens`">Sacola <span>{{ bagCount }}</span></button><button class="porto-mobile-toggle" type="button" :aria-expanded="menuOpen" aria-label="Abrir menu" @click="menuOpen = !menuOpen">☰</button></div>
    </header>

    <main>
      <section class="porto-hero">
        <div class="porto-hero-photo" role="img" aria-label="Fragrância em destaque, fotografia editorial ilustrativa"></div>
        <div class="porto-hero-shade"></div>
        <div class="porto-hero-inner">
          <div class="porto-overline"><span class="porto-overline-line"></span> CURADORIA DE FRAGRÂNCIAS</div>
          <h1>Um perfume.<br>Uma <em>história.</em><br>Uma presença.</h1>
          <p>Descubra fragrâncias que traduzem quem você é. Uma experiência inspirada no universo da Porto Perfumaria, de Porto Alegre para todo o Brasil.</p>
          <div class="porto-hero-actions"><a class="porto-primary" href="#vitrine">Explorar fragrâncias <span>↗</span></a><a class="porto-text-link" href="#historia">Conheça a proposta <span>↗</span></a></div>
        </div>
        <div class="porto-hero-side">PORTO PERFUMARIA <span>✦</span> PERFUMES & CUIDADOS</div>
      </section>

      <section class="porto-benefits" aria-label="Destaques da loja"><div><span>✦</span><strong>Perfumes importados</strong><small>Uma seleção especial de fragrâncias</small></div><div><span>✧</span><strong>Beleza & cuidados</strong><small>Perfumes, cremes e loções</small></div><div><span>◇</span><strong>Porto Alegre, RS</strong><small>Contato pelo perfil oficial</small></div></section>

      <section id="colecoes" class="porto-section porto-categories"><div class="porto-section-heading"><div><span class="porto-kicker">ESCOLHA O SEU UNIVERSO</span><h2>Para cada estilo, <em>uma essência.</em></h2></div><p>Da sofisticação clássica às fragrâncias mais marcantes, explore uma vitrine criada para encantar.</p></div><div class="porto-category-grid"><button v-for="cat in categories" :key="cat.name" type="button" class="porto-category" @click="chooseCategory(cat.filter)"><img :src="cat.image" :alt="`Foto ilustrativa da categoria ${cat.name}`" loading="lazy"><span class="porto-cat-overlay"></span><span class="porto-cat-copy"><small>{{ cat.caption }}</small><strong>{{ cat.name }}</strong><span>Explorar ↗</span></span></button></div></section>

      <section class="porto-manifesto"><span>✦</span><p>O perfume certo não é apenas sentido.<br><em>É lembrado.</em></p><span>✦</span></section>

      <section id="vitrine" class="porto-section porto-products-section"><div class="porto-section-heading"><div><span class="porto-kicker">VITRINE DEMONSTRATIVA</span><h2>Encontre sua próxima <em>assinatura.</em></h2></div><p>Uma prévia de como os produtos poderão ser apresentados com fotos, descrições e categorias.</p></div><div class="porto-filters"><div class="porto-chip-list" aria-label="Filtros de categorias"><button v-for="filter in filters" :key="filter" type="button" :class="['porto-chip', { active: selectedFilter === filter }]" :aria-pressed="selectedFilter === filter" @click="selectedFilter = filter">{{ filter }}</button></div><label class="porto-search"><span>⌕</span><input v-model="search" type="search" placeholder="Buscar fragrância..." aria-label="Buscar produtos"></label></div><div v-if="filteredProducts.length" class="porto-products"><article v-for="product in filteredProducts" :key="product.id" class="porto-product"><div class="porto-product-image"><img :src="product.image" :alt="`Imagem ilustrativa: ${product.name}`" loading="lazy"><span class="porto-product-tag">CONCEITO</span><button type="button" @click="addProduct(product)" :aria-label="`Adicionar ${product.name} à sacola ilustrativa`">＋</button></div><div class="porto-product-details"><span>{{ product.category }}</span><h3>{{ product.name }}</h3><p>{{ product.description }}</p><div><strong>{{ money(product.price) }}</strong><button type="button" @click="addProduct(product)">Adicionar +</button></div></div></article></div><p v-else class="porto-empty">Nenhum produto ilustrativo encontrado nessa seleção.</p><p class="porto-disclaimer">Os nomes, imagens, descrições, disponibilidade e preços são somente exemplos de layout. Não representam ofertas, estoque ou produtos confirmados da Porto Perfumaria.</p></section>

      <section id="historia" class="porto-story"><div class="porto-story-image" role="img" aria-label="Frascos de perfume em composição editorial ilustrativa"></div><div class="porto-story-content"><span class="porto-kicker">INSPIRADO NA PORTO PERFUMARIA</span><h2>Uma vitrine digital à altura da <em>sua marca.</em></h2><p>A Porto Perfumaria se apresenta no Instagram como uma loja de perfumes importados originais, além de produtos de beleza e cuidados pessoais.</p><p>Este conceito traduz essa proposta para uma loja online com navegação intuitiva, categorias organizadas e experiência personalizada em qualquer tela.</p><a class="porto-primary" href="https://www.instagram.com/portoperfumaria_/" target="_blank" rel="noopener noreferrer">Conhecer o Instagram oficial ↗</a></div></section>

      <section class="porto-section porto-gifting"><div><span class="porto-kicker">PARA MOMENTOS ESPECIAIS</span><h2>O presente ideal<br>tem a sua <em>essência.</em></h2><p>Kits, perfumes e cuidados para transformar gestos em memórias. Um espaço reservado para campanhas, datas comemorativas e lançamentos da loja.</p><a href="#vitrine" class="porto-primary porto-primary-dark">Explorar a vitrine ↗</a></div><div class="porto-gifting-photo" role="img" aria-label="Perfumes e presentes, imagem editorial ilustrativa"></div></section>

      <section id="contato" class="porto-contact"><span class="porto-kicker">VAMOS NOS CONECTAR?</span><h2>Seu próximo favorito<br>pode estar <em>a um clique.</em></h2><p>Conheça os produtos e novidades diretamente no perfil da Porto Perfumaria. Esta página é uma demonstração independente e não processa pedidos reais.</p><a class="porto-primary" href="https://www.instagram.com/portoperfumaria_/" target="_blank" rel="noopener noreferrer">Visitar @portoperfumaria_ ↗</a></section>
    </main>
    <footer class="porto-footer"><a href="#inicio" class="porto-brand"><span class="porto-mark">℘</span><span class="porto-wordmark">PORTO<small>PERFUMARIA</small></span></a><span>Conceito demonstrativo não oficial · {{ new Date().getFullYear() }}</span><a href="https://www.instagram.com/portoperfumaria_/" target="_blank" rel="noopener noreferrer">Instagram ↗</a></footer>

    <div v-if="bagOpen" class="porto-modal" @click.self="bagOpen = false"><section class="porto-drawer" role="dialog" aria-modal="true" aria-label="Sacola ilustrativa"><header><div><span class="porto-kicker">MINHA SELEÇÃO</span><h2>Sacola</h2></div><button type="button" aria-label="Fechar sacola" @click="bagOpen = false">×</button></header><p class="porto-bag-warning">Simulação visual: nenhum pedido ou pagamento será realizado.</p><div v-if="!bag.length" class="porto-empty">Sua sacola demonstrativa está vazia.</div><div v-for="item in bag" :key="item.id" class="porto-bag-item"><img :src="item.image" :alt="item.name"><div><strong>{{ item.name }}</strong><small>{{ item.quantity }} × {{ money(item.price) }}</small></div><button type="button" @click="removeProduct(item.id)">Remover</button></div><div class="porto-bag-total"><span>Subtotal ilustrativo</span><strong>{{ money(bagTotal) }}</strong></div><button class="porto-primary porto-primary-dark" type="button" @click="bagOpen = false">Continuar explorando</button></section></div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import './PortoDemoView.css'
const menuOpen = ref(false)
const bagOpen = ref(false)
const selectedFilter = ref('Todos')
const search = ref('')
const bag = ref([])
const filters = ['Todos', 'Feminino', 'Masculino', 'Unissex', 'Cuidados', 'Presentes']
const categories = [
  { name: 'Femininos', caption: 'DELICADEZA & PERSONALIDADE', filter: 'Feminino', image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=950&q=85' },
  { name: 'Masculinos', caption: 'PRESENÇA & INTENSIDADE', filter: 'Masculino', image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=950&q=85' },
  { name: 'Cuidados', caption: 'RITUAIS DE BELEZA', filter: 'Cuidados', image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=950&q=85' },
  { name: 'Para presentear', caption: 'MOMENTOS MARCANTES', filter: 'Presentes', image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=950&q=85' },
]
// Itens e valores fictícios: não são produtos ou preços oficiais da Porto Perfumaria.
const products = [
  { id: 1, name: 'Aura Rosé', description: 'Floral envolvente · assinatura delicada', category: 'Feminino', price: 189.90, image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=750&q=85' },
  { id: 2, name: 'Noble Black', description: 'Amadeirado intenso · presença marcante', category: 'Masculino', price: 259.90, image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=750&q=85' },
  { id: 3, name: 'Golden Hour', description: 'Âmbar suave · equilíbrio atemporal', category: 'Unissex', price: 219.90, image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=750&q=85' },
  { id: 4, name: 'Florence', description: 'Flores brancas · elegância espontânea', category: 'Feminino', price: 199.90, image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=750&q=85' },
  { id: 5, name: 'Blue Essence', description: 'Notas frescas · intensidade moderna', category: 'Masculino', price: 239.90, image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=750&q=85' },
  { id: 6, name: 'Soft Ritual', description: 'Hidratação · cuidado diário', category: 'Cuidados', price: 89.90, image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=750&q=85' },
  { id: 7, name: 'Duo Momentos', description: 'Kit presenteável · seleção especial', category: 'Presentes', price: 279.90, image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=750&q=85' },
  { id: 8, name: 'Velvet Night', description: 'Notas quentes · final sofisticado', category: 'Unissex', price: 229.90, image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=750&q=85' },
]
const filteredProducts = computed(() => products.filter((item) => (selectedFilter.value === 'Todos' || item.category === selectedFilter.value) && `${item.name} ${item.description} ${item.category}`.toLocaleLowerCase('pt-BR').includes(search.value.toLocaleLowerCase('pt-BR').trim())))
const bagCount = computed(() => bag.value.reduce((n, item) => n + item.quantity, 0))
const bagTotal = computed(() => bag.value.reduce((n, item) => n + item.quantity * item.price, 0))
function money(value) { return Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }
function chooseCategory(value) { selectedFilter.value = value; document.querySelector('#vitrine')?.scrollIntoView({ behavior: 'smooth' }) }
function addProduct(product) { const existing = bag.value.find(item => item.id === product.id); if (existing) existing.quantity += 1; else bag.value.push({ ...product, quantity: 1 }); bagOpen.value = true }
function removeProduct(id) { bag.value = bag.value.filter(item => item.id !== id) }
</script>
