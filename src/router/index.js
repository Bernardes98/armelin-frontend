import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import ProductsView from '../views/ProductsView.vue'
import ProductDetailsView from '../views/ProductDetailsView.vue'
import CheckoutView from '../views/CheckoutView.vue'
import OrderSuccessView from '../views/OrderSuccessView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import AccountView from '../views/AccountView.vue'
import NotFoundView from '../views/NotFoundView.vue'

import PrivacyPolicyView from '../views/institutional/PrivacyPolicyView.vue'
import ExchangePolicyView from '../views/institutional/ExchangePolicyView.vue'
import FaqView from '../views/institutional/FaqView.vue'
import TermsOfUseView from '../views/institutional/TermsOfUseView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'Armelin Perfumes',
    },
  },
  {
    path: '/produtos',
    name: 'products',
    component: ProductsView,
    meta: {
      title: 'Produtos | Armelin Perfumes',
    },
  },
  {
    path: '/produtos/:id',
    name: 'product-details',
    component: ProductDetailsView,
    meta: {
      title: 'Produto | Armelin Perfumes',
    },
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: CheckoutView,
    meta: {
      title: 'Checkout | Armelin Perfumes',
    },
  },
  {
    path: '/pedido-finalizado/:orderNumber',
    name: 'order-success',
    component: OrderSuccessView,
    meta: {
      title: 'Pedido finalizado | Armelin Perfumes',
    },
  },
  {
    path: '/sobre',
    name: 'about',
    component: AboutView,
    meta: {
      title: 'Sobre | Armelin Perfumes',
    },
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {
      title: 'Login | Armelin Perfumes',
    },
  },
  {
    path: '/minha-conta',
    name: 'account',
    component: AccountView,
    meta: {
      title: 'Minha Conta | Armelin Perfumes',
    },
  },
  {
    path: '/politica-de-privacidade',
    name: 'privacy-policy',
    component: PrivacyPolicyView,
    meta: {
      title: 'Política de Privacidade | Armelin Perfumes',
    },
  },
  {
    path: '/termos-de-uso',
    name: 'terms-of-use',
    component: TermsOfUseView,
    meta: {
      title: 'Termos de Uso | Armelin Perfumes',
    },
  },
  {
    path: '/trocas-e-devolucoes',
    name: 'exchange-policy',
    component: ExchangePolicyView,
    meta: {
      title: 'Trocas e Devoluções | Armelin Perfumes',
    },
  },
  {
    path: '/perguntas-frequentes',
    name: 'faq',
    component: FaqView,
    meta: {
      title: 'Perguntas Frequentes | Armelin Perfumes',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView,
    meta: {
      title: 'Página não encontrada | Armelin Perfumes',
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.afterEach((to) => {
  document.title = to.meta.title || 'Armelin Perfumes'
})

export default router