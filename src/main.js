import { refreshProducts } from './data/products'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './styles/App.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
refreshProducts().catch((error) => console.warn('Catálogo remoto indisponível:', error.message))
