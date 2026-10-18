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

async function start(){
 try {
  const c=await apiFetch('/storefront/config');
  Object.assign(storefront,{
   name:c.name||storefront.name,plan:c.plan||storefront.plan,accent:c.accent||storefront.accent,
   whatsapp:(c.whatsapp||'').replace(/\D/g,''),instagram:c.instagram||'',
   logoUrl:c.logoUrl||'',heroImageUrl:c.heroImageUrl||'',
   tagline:c.heroTitle||storefront.tagline,description:c.heroDescription||storefront.description
  });
  document.documentElement.style.setProperty('--store-accent',storefront.accent);
 }catch(e){console.warn('Configuração pública indisponível:',e.message)}
 app.mount('#app');
 refreshProducts().catch((error)=>console.warn('Catálogo remoto indisponível:',error.message));
}
start();
