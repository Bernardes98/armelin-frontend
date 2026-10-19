<template>
  <div class="duda-page">
    <div class="duda-demo-ribbon">PROJETO CONCEITUAL · DEMONSTRAÇÃO NÃO OFICIAL</div>
    <header class="duda-header">
      <a class="duda-logo" href="#inicio" aria-label="Duda Piucco Sweet — início"><span class="duda-mark">DP</span><span class="duda-logoname">DUDA<br>PIUCCO <small>SWEET</small></span></a>
      <nav class="duda-nav" aria-label="Navegação principal">
        <a href="#sobre">Nossa essência</a><a href="#sabores">Delícias</a><a href="#como-pedir">Como pedir</a>
      </nav>
      <a class="duda-nav-cta" :href="cardapioUrl" target="_blank" rel="noopener noreferrer">Fazer meu pedido <span aria-hidden="true">↗</span></a>
    </header>
    <main>
      <section id="inicio" class="duda-hero">
        <div class="duda-hero-copy">
          <div class="duda-eyebrow"><span class="duda-eyebrow-line"></span> FEITO PARA ADOÇAR SEU DIA</div>
          <h1>Seu dia<br>merece um<br><em>doce momento.</em></h1>
          <p>Cookies irresistíveis, tortas no pote e sabores que transformam qualquer pausa em uma boa lembrança.</p>
          <div class="duda-hero-actions"><a class="duda-primary" :href="cardapioUrl" target="_blank" rel="noopener noreferrer">Explorar o cardápio <span>↗</span></a><a class="duda-link" href="#sabores">Conheça nossas delícias <span>↓</span></a></div>
          <div class="duda-hero-foot"><span>✦ Feitos com carinho</span><span>✦ Porto Alegre · RS</span></div>
        </div>
        <div class="duda-hero-art" aria-label="Seleção de doces da Duda Piucco Sweet">
          <div class="duda-hero-oval"></div>
          <div class="duda-hero-badge">PEQUENOS<br><strong>MOMENTOS,</strong><br>GRANDES<br>SABORES ✳</div>
          <img class="duda-hero-cookie" :src="cookieDuplo" alt="Cookie recheado de chocolate, imagem de referência do cardápio" />
          <img class="duda-hero-tray" :src="comboTortas" alt="Tortas no pote, imagem de referência do cardápio" />
          <div class="duda-sticker">feito pra<br><strong>ser feliz!</strong><span>✳</span></div>
        </div>
      </section>
      <div class="duda-marquee" aria-hidden="true">
        <div class="duda-marquee-track">
          <div class="duda-marquee-group">
            <span>✳ &nbsp; UM DOCE NUNCA É SÓ UM DOCE</span>
            <span>✳ &nbsp; É UM MOMENTO ESPECIAL</span>
            <span>✳ &nbsp; UM DOCE NUNCA É SÓ UM DOCE</span>
            <span>✳ &nbsp; É UM MOMENTO ESPECIAL</span>
          </div>
          <div class="duda-marquee-group">
            <span>✳ &nbsp; UM DOCE NUNCA É SÓ UM DOCE</span>
            <span>✳ &nbsp; É UM MOMENTO ESPECIAL</span>
            <span>✳ &nbsp; UM DOCE NUNCA É SÓ UM DOCE</span>
            <span>✳ &nbsp; É UM MOMENTO ESPECIAL</span>
          </div>
        </div>
      </div>
      <section id="sabores" class="duda-products section-wrap">
        <div class="duda-section-head"><div><p class="duda-kicker">NOSSO UNIVERSO DE SABORES</p><h2>Amor à<br><em>primeira mordida.</em></h2></div><p>Da vontade de um docinho à celebração especial. Descubra algumas das delícias do nosso cardápio.</p></div>
        <div class="duda-tabs" role="group" aria-label="Filtrar produtos"><button v-for="category in categories" :key="category" type="button" :class="{active: selectedCategory === category}" @click="selectedCategory=category">{{category}}</button></div>
        <div class="duda-grid">
          <a v-for="product in shownProducts" :key="product.name" class="duda-product" :href="cardapioUrl" target="_blank" rel="noopener noreferrer" :aria-label="`Ver ${product.name} no cardápio da Duda Piucco Sweet`">
            <div class="duda-product-image"><img :src="product.image" :alt="product.alt" loading="lazy" /><span class="duda-product-arrow">↗</span></div>
            <div class="duda-product-info"><div><span class="duda-product-category">{{product.category}}</span><h3>{{product.name}}</h3></div><span class="duda-product-more">Ver no cardápio ↗</span></div>
          </a>
        </div>
        <div class="duda-products-bottom"><p>Gostou do que viu? Tem muito mais esperando por você.</p><a class="duda-outline" :href="cardapioUrl" target="_blank" rel="noopener noreferrer">Ver cardápio completo ↗</a></div>
      </section>
      <section id="sobre" class="duda-about"><div class="duda-about-left"><div class="duda-about-shape">✳</div><p class="duda-kicker">DOCE É A NOSSA LINGUAGEM</p><h2>Uma explosão<br>de sensações<br><em>a cada mordida.</em></h2></div><div class="duda-about-right"><p>Tem momentos que pedem uma pausa. Outros, uma comemoração. E todos eles ficam ainda melhores com um doce especial.</p><p>Na Duda Piucco Sweet, a experiência começa no primeiro olhar e continua até a última colherada.</p><div class="duda-about-small"><span>01 /</span> SABOR QUE SURPREENDE <span>✳</span></div></div></section>
      <section id="como-pedir" class="duda-order section-wrap"><p class="duda-kicker">SIMPLES ASSIM</p><h2>Seu próximo doce<br>está a poucos <em>cliques.</em></h2><div class="duda-steps"><div><strong>01</strong><h3>Escolha suas delícias</h3><p>Explore o cardápio digital com os sabores disponíveis.</p></div><div><strong>02</strong><h3>Monte seu pedido</h3><p>Selecione seus favoritos diretamente no sistema de pedidos da loja.</p></div><div><strong>03</strong><h3>Combine a entrega</h3><p>Consulte as opções e os horários disponíveis no cardápio.</p></div></div><a class="duda-primary" :href="cardapioUrl" target="_blank" rel="noopener noreferrer">Ir para o cardápio oficial <span>↗</span></a></section>
      <section class="duda-final"><div class="duda-final-art">✳</div><p>SEU MOMENTO DOCE COMEÇA AQUI</p><h2>A vida fica mais<br><em>gostosa assim.</em></h2><a :href="cardapioUrl" class="duda-final-cta" target="_blank" rel="noopener noreferrer">Pedir agora ↗</a></section>
    </main>
    <footer class="duda-footer"><div class="duda-footer-brand">DUDA PIUCCO <span>SWEET</span></div><p>Uma proposta visual desenvolvida para demonstração. Não é o site oficial da marca.</p><div><a href="https://www.instagram.com/dudapiuccosweet/" target="_blank" rel="noopener noreferrer">Instagram ↗</a><a :href="cardapioUrl" target="_blank" rel="noopener noreferrer">Cardápio ↗</a></div></footer>
  </div>
</template>
<script setup>
import { computed, ref } from 'vue'
import './DudaDemoView.css'
import cookieDuplo from '../assets/duda/cookie-duplo.webp'
import comboTortas from '../assets/duda/combo-tortas.webp'
import comboCookies from '../assets/duda/combo-cookies.webp'
import comboBombons from '../assets/duda/combo-bombons.webp'
import cookieTradicional from '../assets/duda/cookie-tradicional.webp'
import cookieLotus from '../assets/duda/cookie-lotus.webp'
import cookieFramboesa from '../assets/duda/cookie-framboesa.webp'
import cookieNutella from '../assets/duda/cookie-nutella.webp'
const cardapioUrl = 'https://app.cardapioweb.com/dudapiuccosweet'
const selectedCategory = ref('Todos')
const categories = ['Todos','Cookies','Combos']
const products = [
 {name:'Cookie tradicional',category:'Cookies',image:cookieTradicional,alt:'Cookie tradicional com chocolate'},
 {name:'Cookie duplo chocolate',category:'Cookies',image:cookieDuplo,alt:'Cookie duplo com recheio de chocolate'},
 {name:'Combo com 4 cookies',category:'Combos',image:comboCookies,alt:'Seleção de quatro cookies'},
 {name:'Cookie de framboesa e limão',category:'Cookies',image:cookieFramboesa,alt:'Cookie com framboesa e limão'},
 {name:'Combo com 2 tortas no pote',category:'Combos',image:comboTortas,alt:'Tortas no pote'},
 {name:'Cookie Lotus',category:'Cookies',image:cookieLotus,alt:'Cookie com biscoito Lotus'},
 {name:'Combo com 5 bombons',category:'Combos',image:comboBombons,alt:'Seleção de bombons'},
 {name:'Cookie Nutella',category:'Cookies',image:cookieNutella,alt:'Cookie com chocolate e Nutella'},
]
const shownProducts = computed(() => selectedCategory.value === 'Todos' ? products : products.filter(p => p.category === selectedCategory.value))
</script>
