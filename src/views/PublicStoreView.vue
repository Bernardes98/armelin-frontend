<template>
  <div class="essential" :style="{ '--store-accent': brand.accent || '#a87c44' }">
    <div v-if="loading" class="essential__section" role="status">Carregando perfumaria...</div>
    <div v-else-if="error" class="essential__section" role="alert">
      <h1>Não foi possível abrir esta loja</h1><p>{{ error }}</p>
      <button type="button" @click="load">Tentar novamente</button>
    </div>
    <template v-else>
      <header class="essential__header">
        <a :href="`/loja/${slug}`" class="essential__logo">
          <img v-if="brand.logoUrl" :src="brand.logoUrl" :alt="brand.name" style="max-height:52px;max-width:180px;object-fit:contain" />
          <span v-else>{{ brand.name }}</span>
        </a>
        <nav aria-label="Navegação da loja"><a href="#sobre">Sobre</a><a href="#destaques">Produtos</a><a href="#contato">Contato</a></nav>
      </header>
      <main>
        <section class="essential__hero" :style="brand.heroImageUrl ? { backgroundImage: `linear-gradient(#0008,#0008), url(${brand.heroImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}">
          <p class="essential__eyebrow">Bem-vindo à {{ brand.name }}</p>
          <h1>{{ brand.heroTitle || brand.name }}</h1>
          <p>{{ brand.heroDescription || 'Descubra fragrâncias escolhidas especialmente para você.' }}</p>
          <a v-if="brand.whatsapp" class="essential__button" :href="waLink()" target="_blank" rel="noopener noreferrer">Conversar no WhatsApp</a>
          <a v-else class="essential__button" href="#destaques">Conhecer produtos</a>
        </section>
        <section id="sobre" class="essential__section essential__about"><p class="essential__eyebrow">Nossa essência</p><h2>Fragrâncias para todos os momentos</h2><p>Conheça nossa seleção e consulte disponibilidade diretamente com a loja.</p></section>
        <section id="destaques" class="essential__section"><p class="essential__eyebrow">Seleção especial</p><h2>Produtos em destaque</h2>
          <p v-if="productError" role="alert">{{ productError }} <button @click="load">Tentar novamente</button></p>
          <p v-else-if="!products.length">Em breve, novidades por aqui.</p>
          <div v-else class="essential__grid">
            <article v-for="product in products.slice(0, 12)" :key="product.id" class="essential__card">
              <img v-if="product.image" :src="product.image" :alt="product.name" loading="lazy" /><div v-else class="essential__placeholder">{{ brand.name }}</div>
              <div class="essential__cardbody"><span>{{ product.category || 'Fragrância' }}</span><h3>{{ product.name }} <small v-if="product.volume">{{ product.volume }}</small></h3>
                <strong>{{ currency(product.price) }}</strong>
                <a v-if="brand.whatsapp" :href="waLink(`Olá! Gostaria de saber mais sobre ${product.name}${product.volume ? ' ' + product.volume : ''}.`)" target="_blank" rel="noopener noreferrer">Consultar no WhatsApp</a>
                <span v-else>Entre em contato para comprar</span>
              </div>
            </article>
          </div>
        </section>
        <section id="contato" class="essential__section essential__contact"><h2>Fale com a gente</h2><a v-if="brand.whatsapp" :href="waLink()" target="_blank" rel="noopener noreferrer" class="essential__button">Chamar no WhatsApp</a><a v-if="instagramUrl" :href="instagramUrl" target="_blank" rel="noopener noreferrer">Instagram</a></section>
      </main>
      <footer class="essential__footer">© {{ new Date().getFullYear() }} {{ brand.name }}</footer>
    </template>
  </div>
</template>
<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { apiFetch } from '../services/api'
const route = useRoute()
const slug = computed(() => String(route.params.slug || '').toLowerCase())
const loading = ref(true), error = ref(''), productError = ref(''), brand = ref({}), products = ref([])
const currency = value => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(value || 0))
const instagramUrl = computed(() => {
  const value = String(brand.value.instagram || '').trim()
  if (!value) return ''
  if (/^https:\/\/(www\.)?instagram\.com\//i.test(value)) return value
  const username = value.replace(/^@/, '').replace(/^instagram\.com\//i, '')
  return /^[a-zA-Z0-9._]{1,30}$/.test(username) ? `https://www.instagram.com/${username}/` : ''
})
function waLink(message = '') {
  const number = String(brand.value.whatsapp || '').replace(/\D/g, '')
  if (!number) return ''
  return `https://wa.me/${number}?text=${encodeURIComponent(message || `Olá! Gostaria de conhecer os produtos da ${brand.value.name}.`)}`
}
let requestVersion = 0
async function load() {
  const version = ++requestVersion
  loading.value = true; error.value = ''; productError.value = ''; products.value = []; brand.value = {}
  const current = slug.value
  if (!/^[a-z0-9][a-z0-9-]{0,62}$/.test(current)) { error.value = 'Endereço de loja inválido.'; loading.value = false; return }
  const headers = { 'X-Store-Slug': current }
  try {
    const config = await apiFetch('/storefront/config', { headers })
    if (version !== requestVersion) return
    // O Commerce multiempresa ainda depende de pagamento individual; não abrir um checkout compartilhado.
    if (config.plan !== 'ESSENTIAL') { error.value = 'Esta loja ainda não está disponível neste endereço.'; return }
    brand.value = config
    document.title = `${config.name} | Perfumes`
    try {
      const results = await apiFetch('/products', { headers })
      if (version !== requestVersion) return
      if (!Array.isArray(results)) throw new Error('Catálogo inválido')
      products.value = results.filter(p => p.active !== false)
    } catch { if (version === requestVersion) productError.value = 'Não foi possível carregar os produtos.' }
  } catch { if (version === requestVersion) error.value = 'Loja não encontrada, desativada ou indisponível.' }
  finally { if (version === requestVersion) loading.value = false }
}
watch(slug, load, { immediate: true })
</script>
<style scoped src="./EssentialLandingView.css"></style>
