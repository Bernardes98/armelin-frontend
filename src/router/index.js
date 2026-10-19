import { createRouter, createWebHistory } from 'vue-router'
import { storefront } from '../config/storefront'
import { defineComponent, h } from 'vue'
import EssentialLandingView from '../views/EssentialLandingView.vue'
import PublicStoreView from '../views/PublicStoreView.vue'
import KasDemoView from '../views/KasDemoView.vue'

import AdminPanel from '../views/admin/AdminPanel.vue'
import PlatformPanel from '../views/platform/PlatformPanel.vue'
import HomeView from '../views/HomeView.vue'
import ProductsView from '../views/ProductsView.vue'
import ProductDetailsView from '../views/ProductDetailsView.vue'
import CheckoutView from '../views/CheckoutView.vue'
import OrderSuccessView from '../views/OrderSuccessView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import ResetPasswordView from '../views/ResetPasswordView.vue'
import AccountView from '../views/AccountView.vue'
import NotFoundView from '../views/NotFoundView.vue'

import PrivacyPolicyView from '../views/institutional/PrivacyPolicyView.vue'
import ExchangePolicyView from '../views/institutional/ExchangePolicyView.vue'
import FaqView from '../views/institutional/FaqView.vue'
import TermsOfUseView from '../views/institutional/TermsOfUseView.vue'

const StoreHome = defineComponent({
  name: 'StoreHome',
  setup() {
    return () => h(storefront.plan === 'ESSENTIAL' ? EssentialLandingView : HomeView)
  },
})

const routes = [
  { path: '/demo/kas', name: 'kas-demo', component: KasDemoView, meta: { title: 'Ka’s Perfumaria | Demonstração' } },
  { path: '/loja/:slug', name: 'public-store', component: PublicStoreView, meta: { title: 'Loja | Perfumes' } },
  { path: '/plataforma', name: 'platform', component: PlatformPanel, meta: { title: 'Plataforma | Perfumes' } },
  { path: '/redefinir-senha', component: ResetPasswordView, meta: { title: 'Redefinir senha | Perfumes' } },
  { path: '/admin', name: 'admin', component: AdminPanel, meta: { title: 'Administração | Perfumes' } },
  { path: '/', name: 'home', component: StoreHome, meta: { title: 'Perfumes' } },
  { path: '/produtos', name: 'products', component: ProductsView, meta: { title: 'Produtos | Perfumes' } },
  { path: '/produtos/:id', name: 'product-details', component: ProductDetailsView, meta: { title: 'Produto | Perfumes' } },
  { path: '/checkout', name: 'checkout', component: CheckoutView, meta: { title: 'Checkout | Perfumes' } },
  { path: '/pedido-finalizado/:orderNumber', name: 'order-success', component: OrderSuccessView, meta: { title: 'Pedido finalizado | Perfumes' } },
  { path: '/sobre', name: 'about', component: AboutView, meta: { title: 'Sobre | Perfumes' } },
  { path: '/login', name: 'login', component: LoginView, meta: { title: 'Login | Perfumes' } },
  { path: '/minha-conta', name: 'account', component: AccountView, meta: { title: 'Minha Conta | Perfumes' } },
  { path: '/politica-de-privacidade', name: 'privacy-policy', component: PrivacyPolicyView, meta: { title: 'Política de Privacidade | Perfumes' } },
  { path: '/termos-de-uso', name: 'terms-of-use', component: TermsOfUseView, meta: { title: 'Termos de Uso | Perfumes' } },
  { path: '/trocas-e-devolucoes', name: 'exchange-policy', component: ExchangePolicyView, meta: { title: 'Trocas e Devoluções | Perfumes' } },
  { path: '/perguntas-frequentes', name: 'faq', component: FaqView, meta: { title: 'Perguntas Frequentes | Perfumes' } },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView, meta: { title: 'Página não encontrada | Perfumes' } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

// O modo Essencial não oferece carrinho, cadastro ou checkout na interface.
// Esta regra não substitui autorização no backend.
router.beforeEach((to) => {
  const isEssential = storefront.plan === 'ESSENTIAL'
  const blockedRoutes = [
    '/produtos',
    '/checkout',
    '/login',
    '/redefinir-senha',
    '/minha-conta',
    '/pedido-finalizado',
  ]
  const blocked = blockedRoutes.some(
    (path) => to.path === path || to.path.startsWith(`${path}/`),
  )
  if (isEssential && blocked) return '/'
  return true
})

router.afterEach((to) => {
  document.title = String(to.meta.title || storefront.name).replace(/Perfumes/g, storefront.name)
})

export default router
