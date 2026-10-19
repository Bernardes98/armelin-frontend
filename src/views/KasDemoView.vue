<template>
  <div class="kas-demo">
    <div class="kas-notice"><span>CONCEITO DIGITAL PARA KA’S · DEMONSTRAÇÃO NÃO OFICIAL</span><span>Catálogo e condições sujeitos à confirmação</span></div>
    <header class="kas-header">
      <a class="kas-logo" href="#inicio" @click="menuOpen = false"><span>KA’S</span><small>PERFUMARIA</small></a>
      <nav :class="{ 'kas-nav--open': menuOpen }" aria-label="Navegação da demonstração">
        <a href="#inicio" @click="menuOpen = false">Início</a>
        <a href="#categorias" @click="menuOpen = false">Categorias</a><a href="#colecao" @click="menuOpen = false">Produtos</a>
        <a href="#experiencia" @click="menuOpen = false">A Ka’s</a>
        <a href="https://www.instagram.com/kasperfumaria/" target="_blank" rel="noopener noreferrer" @click="menuOpen = false">Instagram ↗</a>
      </nav>
      <div class="kas-actions">
        <button type="button" class="kas-bag" :aria-label="`Abrir sacola demonstrativa com ${bagCount} itens`" @click="bagOpen = true">Sacola <span>{{ bagCount }}</span></button>
        <button type="button" class="kas-menu" :aria-expanded="menuOpen" aria-label="Abrir menu" @click="menuOpen = !menuOpen">☰</button>
      </div>
    </header>

    <main id="inicio">
      <section class="kas-hero">
        <div class="kas-hero-copy">
          <span class="kas-eyebrow"><i></i> KA’S PERFUMARIA · IMPORTADOS</span>
          <h1>Seu perfume.<br /><em>Sua presença.</em><br />Seu momento.</h1>
          <p>Perfumes importados, fragrâncias marcantes e presentes especiais. Uma nova experiência digital inspirada no universo da Ka’s Perfumaria.</p>
          <div class="kas-hero-actions"><a href="#colecao" class="kas-button kas-button--dark">Conhecer a vitrine <span>↗</span></a><a href="#experiencia" class="kas-text-link">Conheça a Ka’s →</a></div>
          <div class="kas-hero-foot"><span>01 / 03</span><span class="kas-line"></span><span>IMPORTADOS · PRESENTES · PERFUMARIA</span></div>
        </div>
        <div class="kas-hero-image" role="img" aria-label="Frasco de perfume em composição editorial elegante"><span class="kas-image-tag">Sua essência merece destaque.</span></div>
      </section>

      <div class="kas-ticker"><span>✦ PERFUMES IMPORTADOS ORIGINAIS</span><b>✦</b><span>ATENDIMENTO PRÓXIMO</span><b>✦</b><span>ATACADO E VAREJO</span></div>
      <section class="kas-benefits" aria-label="Diferenciais divulgados pela Ka’s">
        <div><strong>100% originais</strong><span>Compromisso divulgado pela loja</span></div>
        <div><strong>Mais de 5 anos</strong><span>Experiência informada no Instagram</span></div>
        <div><strong>Porto Alegre · RS</strong><span>Atendimento local e online</span></div>
        <div><strong>Até 6x sem juros</strong><span>Condição divulgada; confirmar vigência</span></div>
      </section>
      <section id="categorias" class="kas-categories">
        <div class="kas-section-heading"><div><span class="kas-eyebrow">ESCOLHA SEU ESTILO</span><h2>Um universo de <em>fragrâncias.</em></h2></div><span class="kas-section-aside">Selecione uma categoria para explorar a vitrine</span></div>
        <div class="kas-category-grid">
          <button v-for="category in categories" :key="category.name" type="button" class="kas-category" :style="{ '--category-photo': `url(${category.image})` }" @click="chooseCategory(category.filter)"><span>{{ category.eyebrow }}</span><strong>{{ category.name }}</strong><span>Explorar ↗</span></button>
        </div>
      </section>
      <section class="kas-feature" id="experiencia">
        <div><span class="kas-eyebrow">A MARCA POR TRÁS DE CADA ESCOLHA</span><h2>Uma loja com <em>personalidade.</em></h2></div>
        <p>A Ka’s Perfumaria apresenta nas redes sociais sua seleção de importados, presentes e novidades. Esta proposta leva a experiência de descoberta para uma vitrine digital exclusiva, com identidade preta e dourada.</p>
      </section>

      <section id="colecao" class="kas-collection">
        <div class="kas-section-heading"><div><span class="kas-eyebrow">VITRINE DEMONSTRATIVA</span><h2>Escolha o seu <em>próximo favorito.</em></h2></div><span class="kas-section-aside">Vitrine ilustrativa para apresentação</span></div>
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

      <section class="kas-editorial"><div class="kas-editorial-image" role="img" aria-label="Cena editorial com frasco de perfume"></div><div class="kas-editorial-content"><span class="kas-eyebrow">UMA EXPERIÊNCIA COM A CARA DA KA’S</span><h2>Presentear também é <em>encantar.</em></h2><p>De perfumes para marcar momentos a kits para presentear: uma loja online pensada para valorizar a curadoria da Ka’s e aproximar a marca de seus clientes.</p><a href="#colecao" class="kas-button kas-button--light">Descobrir a coleção <span>↗</span></a></div></section>

      <section id="contato" class="kas-contact"><span class="kas-eyebrow">KA’S PERFUMARIA</span><h2>Da descoberta ao <em>seu perfume.</em></h2><p>Conheça o perfil oficial da Ka’s no Instagram. Esta página é uma proposta independente e ainda não possui canal de pedidos, preços ou estoque oficiais integrados.</p><a href="https://www.instagram.com/kasperfumaria/" target="_blank" rel="noopener noreferrer" class="kas-button kas-button--dark">Conhecer o Instagram oficial ↗</a></section>
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
const categories = [
  { name: 'Femininos', eyebrow: 'ELEGÂNCIA', filter: 'Feminino', image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=650&q=80' },
  { name: 'Masculinos', eyebrow: 'PRESENÇA', filter: 'Masculino', image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=650&q=80' },
  { name: 'Body Splash', eyebrow: 'LEVEZA', filter: 'Body Splash', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=650&q=80' },
  { name: 'Kits & presentes', eyebrow: 'SURPREENDA', filter: 'Kits', image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=650&q=80' },
]
function chooseCategory(filter) { selectedFilter.value = filter; document.getElementById('colecao')?.scrollIntoView({ behavior: 'smooth' }) }
const filters = ['Todos', 'Feminino', 'Masculino', 'Unissex', 'Body Splash', 'Kits', 'Hidratantes', 'Miniaturas']
// Dados exclusivamente ilustrativos. Não representam o catálogo real da Ka's.
const demoProducts = [
  { id: 1, name: 'Aurora', notes: 'Floral · Delicado · Elegante', category: 'Feminino', price: 189.90, bg: '#ede6df', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=700&q=80' },
  { id: 2, name: 'Noir', notes: 'Amadeirado · Intenso · Marcante', category: 'Masculino', price: 249.90, bg: '#e9e9e7', image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=700&q=80' },
  { id: 3, name: 'Éclat', notes: 'Fresco · Luminoso · Versátil', category: 'Unissex', price: 219.90, bg: '#efe7d8', image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=700&q=80' },
  { id: 4, name: 'Belle', notes: 'Doce · Sofisticado · Aconchegante', category: 'Feminino', price: 199.90, bg: '#f0e2dd', image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=700&q=80' },
  { id: 5, name: 'Brisa', notes: 'Refrescante · Casual · Delicado', category: 'Body Splash', price: 79.90, bg: '#eee6df', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=700&q=80' },
  { id: 6, name: 'Duo Presente', notes: 'Conjunto · Presenteável', category: 'Kits', price: 299.90, bg: '#e9e0d0', image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=700&q=80' },
  { id: 7, name: 'Velvet', notes: 'Conforto · Hidratação', category: 'Hidratantes', price: 89.90, bg: '#e9ded7', image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=700&q=80' },
  { id: 8, name: 'Mini Essências', notes: 'Miniatura · Descoberta', category: 'Miniaturas', price: 59.90, bg: '#e8e5e2', image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=700&q=80' },
]
const filteredProducts = computed(() => demoProducts.filter(p => (selectedFilter.value === 'Todos' || p.category === selectedFilter.value) && `${p.name} ${p.notes} ${p.category}`.toLocaleLowerCase('pt-BR').includes(query.value.trim().toLocaleLowerCase('pt-BR'))))
const bagCount = computed(() => bag.value.length)
const total = computed(() => bag.value.reduce((sum, p) => sum + p.price, 0))
const formatPrice = amount => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(amount)
function addToBag(product) { bag.value.push(product); bagOpen.value = true }
</script>
