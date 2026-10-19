import { refreshProducts } from './data/products'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './styles/App.css'
import { apiFetch } from './services/api'
import { storefront } from './config/storefront'

const app = createApp(App)
app.use(createPinia())
app.use(router)

// A inicializacao visual nunca deve aguardar uma requisicao de rede.
// Isso evita tela branca quando a API esta iniciando (por exemplo, no Render).
app.mount('#app')

// A demonstracao da Ka's usa dados ilustrativos locais e nao depende da API.
const isKasDemo = window.location.pathname.replace(/\/$/, '') === '/demo/kas'

if (!isKasDemo) {
  // A configuracao publica da loja e carregada sem bloquear a renderizacao.
  apiFetch('/storefront/config')
    .then((config) => {
      Object.assign(storefront, {
        name: config.name || storefront.name,
        plan: config.plan || storefront.plan,
        accent: config.accent || storefront.accent,
        whatsapp: String(config.whatsapp || '').replace(/\D/g, ''),
        instagram: config.instagram || '',
        logoUrl: config.logoUrl || '',
        heroImageUrl: config.heroImageUrl || '',
        tagline: config.heroTitle || storefront.tagline,
        description: config.heroDescription || storefront.description,
      })
      document.documentElement.style.setProperty('--store-accent', storefront.accent)
    })
    .catch((error) => console.warn('Configuracao publica indisponivel:', error.message))

  refreshProducts().catch((error) => console.warn('Catalogo remoto indisponivel:', error.message))
}
