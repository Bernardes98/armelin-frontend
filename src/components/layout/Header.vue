<template>
  <header class="site-header">
    <div class="top-bar">
      <p>Frete grátis acima de R$ 299,00 • Parcele em até 6x sem juros</p>
    </div>

    <div class="header-main">
      <button
        class="mobile-menu-button"
        type="button"
        aria-label="Abrir menu"
        @click="toggleMobileMenu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <RouterLink to="/" class="brand" @click="closeAllMenus">
        <span class="brand-main">{{ storefront.name }}</span>
        
      </RouterLink>

      <nav class="desktop-nav">
        <div class="nav-item has-dropdown">
          <RouterLink to="/produtos">Perfumes</RouterLink>

          <div class="mega-menu">
            <div class="mega-menu-column">
              <h3>Por gênero</h3>
              <RouterLink to="/produtos?categoria=Feminino">Perfumes Femininos</RouterLink>
              <RouterLink to="/produtos?categoria=Masculino">Perfumes Masculinos</RouterLink>
              <RouterLink to="/produtos?categoria=Unissex">Perfumes Unissex</RouterLink>
            </div>

            <div class="mega-menu-column">
              <h3>Por família olfativa</h3>
              <RouterLink to="/produtos?familia=Ambarado">Ambarados</RouterLink>
              <RouterLink to="/produtos?familia=Frutado Floral">Florais</RouterLink>
              <RouterLink to="/produtos?familia=Cítrico">Cítricos</RouterLink>
              <RouterLink to="/produtos?familia=Oriental Floral">Orientais</RouterLink>
            </div>

            <div class="mega-menu-column highlight-column">
              <h3>Destaques</h3>
              <p>Conheça fragrâncias marcantes para todos os momentos.</p>
              <RouterLink to="/produtos" class="mega-menu-button">Ver perfumes</RouterLink>
            </div>
          </div>
        </div>

        <div class="nav-item has-dropdown">
          <RouterLink to="/produtos">Coleções</RouterLink>

          <div class="mega-menu small-menu">
            <div class="mega-menu-column">
              <h3>Coleções</h3>
              <RouterLink to="/produtos?ordenacao=menor-preco">Menor preço</RouterLink>
              <RouterLink to="/produtos?ordenacao=maior-preco">Maior preço</RouterLink>
              <RouterLink to="/produtos">Lançamentos</RouterLink>
              <RouterLink to="/produtos">Promoções</RouterLink>
            </div>
          </div>
        </div>

        <RouterLink to="/produtos">Kits</RouterLink>
        <RouterLink to="/produtos?ordenacao=menor-preco">Promoções</RouterLink>
        <RouterLink to="/sobre">Sobre</RouterLink>
      </nav>

      <div class="header-actions">
        <button
          class="icon-button search-button"
          type="button"
          aria-label="Buscar"
          @click="toggleSearch"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M10.8 18.1a7.3 7.3 0 1 1 0-14.6 7.3 7.3 0 0 1 0 14.6Zm0-2a5.3 5.3 0 1 0 0-10.6 5.3 5.3 0 0 0 0 10.6Zm6.4.1 3.3 3.3-1.4 1.4-3.3-3.3 1.4-1.4Z"
            />
          </svg>
        </button>

        <RouterLink :to="authState.token ? '/minha-conta' : '/login'" class="icon-button desktop-only" aria-label="Minha conta">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M12 12a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9Zm0-2a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm-8 11a8 8 0 1 1 16 0h-2a6 6 0 1 0-12 0H4Z"
            />
          </svg>
        </RouterLink>

        <button
          class="icon-button cart-button"
          type="button"
          aria-label="Abrir carrinho"
          @click="openCart"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M7 18a2 2 0 1 1-.1 4A2 2 0 0 1 7 18Zm10 0a2 2 0 1 1-.1 4 2 2 0 0 1 .1-4ZM6.2 6l1.1 7.2a1 1 0 0 0 1 .8h8.8a1 1 0 0 0 1-.7L20 8H8.1l-.3-2H4V4h5.5l.3 2H21a1 1 0 0 1 .9 1.3l-2 7a3 3 0 0 1-2.9 2.2H8.3a3 3 0 0 1-3-2.5L4.2 6h2Z"
            />
          </svg>

          <span v-if="cartCount > 0" class="cart-count">
            {{ cartCount }}
          </span>
        </button>
      </div>
    </div>

    <div v-if="isSearchOpen" class="search-area">
      <form class="search-container" @submit.prevent="submitSearch">
        <input
          v-model="searchTerm"
          type="text"
          placeholder="Buscar perfume, coleção ou fragrância..."
          autofocus
        />

        <button type="submit">Buscar</button>
        <button type="button" class="search-close-button" @click="toggleSearch">Fechar</button>
      </form>
    </div>

    <Teleport to="body">
      <div v-if="isMobileMenuOpen" class="mobile-menu-overlay">
        <button
          class="mobile-menu-backdrop"
          type="button"
          aria-label="Fechar menu"
          @click="closeMobileMenu"
        ></button>

        <aside class="mobile-menu-panel">
          <div class="mobile-menu-header">
            <RouterLink to="/" class="mobile-menu-logo" @click="closeMobileMenu">
              <span>{{ storefront.name }}</span>
              <small>Perfumes</small>
            </RouterLink>

            <button type="button" class="mobile-close-button" @click="closeMobileMenu">
              ×
            </button>
          </div>

          <form class="mobile-search-form" @submit.prevent="submitSearch">
            <input
              v-model="searchTerm"
              type="text"
              placeholder="Buscar produto..."
            />
            <button type="submit">Buscar</button>
          </form>

          <nav class="mobile-navigation">
            <RouterLink to="/" @click="closeMobileMenu">Início</RouterLink>
            <RouterLink to="/produtos" @click="closeMobileMenu">Todos os produtos</RouterLink>

            <div class="mobile-group">
              <button type="button" @click="toggleMobileGroup('gender')">
                <span>Perfumes por gênero</span>
                <strong>{{ openedMobileGroup === 'gender' ? '−' : '+' }}</strong>
              </button>

              <div v-if="openedMobileGroup === 'gender'" class="mobile-submenu">
                <RouterLink to="/produtos?categoria=Feminino" @click="closeMobileMenu">
                  Femininos
                </RouterLink>
                <RouterLink to="/produtos?categoria=Masculino" @click="closeMobileMenu">
                  Masculinos
                </RouterLink>
                <RouterLink to="/produtos?categoria=Unissex" @click="closeMobileMenu">
                  Unissex
                </RouterLink>
              </div>
            </div>

            <div class="mobile-group">
              <button type="button" @click="toggleMobileGroup('family')">
                <span>Família olfativa</span>
                <strong>{{ openedMobileGroup === 'family' ? '−' : '+' }}</strong>
              </button>

              <div v-if="openedMobileGroup === 'family'" class="mobile-submenu">
                <RouterLink to="/produtos?familia=Ambarado" @click="closeMobileMenu">
                  Ambarados
                </RouterLink>
                <RouterLink to="/produtos?familia=Frutado Floral" @click="closeMobileMenu">
                  Florais
                </RouterLink>
                <RouterLink to="/produtos?familia=Cítrico" @click="closeMobileMenu">
                  Cítricos
                </RouterLink>
                <RouterLink to="/produtos?familia=Oriental Floral" @click="closeMobileMenu">
                  Orientais
                </RouterLink>
              </div>
            </div>

            <div class="mobile-group">
              <button type="button" @click="toggleMobileGroup('collections')">
                <span>Coleções</span>
                <strong>{{ openedMobileGroup === 'collections' ? '−' : '+' }}</strong>
              </button>

              <div v-if="openedMobileGroup === 'collections'" class="mobile-submenu">
                <RouterLink to="/produtos?ordenacao=menor-preco" @click="closeMobileMenu">
                  Promoções
                </RouterLink>
                <RouterLink to="/produtos?ordenacao=maior-preco" @click="closeMobileMenu">
                  Destaques
                </RouterLink>
                <RouterLink to="/produtos" @click="closeMobileMenu">
                  Lançamentos
                </RouterLink>
              </div>
            </div>

            <RouterLink to="/sobre" @click="closeMobileMenu">Sobre a marca</RouterLink>
            <RouterLink to="/perguntas-frequentes" @click="closeMobileMenu">Ajuda</RouterLink>
            <RouterLink to="/login" @click="closeMobileMenu">Minha conta</RouterLink>
          </nav>

          <div class="mobile-menu-footer">
            <strong>Atendimento</strong>
            <span>Segunda a sexta, das 09h às 18h</span>
            <span>WhatsApp: (00) 00000-0000</span>
          </div>
        </aside>
      </div>
    </Teleport>
  </header>
</template>

<script setup>
import { authState } from '../../services/auth'
import { storefront } from '../../config/storefront'

import { onBeforeUnmount, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

defineProps({
  cartCount: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits(['open-cart'])
const router = useRouter()

const searchTerm = ref('')
const isSearchOpen = ref(false)
const isMobileMenuOpen = ref(false)
const openedMobileGroup = ref('gender')

watch(isMobileMenuOpen, (isOpen) => {
  document.body.style.overflow = isOpen ? 'hidden' : ''
})

onBeforeUnmount(() => {
  document.body.style.overflow = ''
})

function toggleSearch() {
  isSearchOpen.value = !isSearchOpen.value

  if (isSearchOpen.value) {
    isMobileMenuOpen.value = false
  }
}

function submitSearch() {
  const term = searchTerm.value.trim()

  if (!term) {
    router.push('/produtos')
  } else {
    router.push({
      path: '/produtos',
      query: {
        busca: term,
      },
    })
  }

  closeAllMenus()
}

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value

  if (isMobileMenuOpen.value) {
    isSearchOpen.value = false
  }
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false
}

function closeAllMenus() {
  isSearchOpen.value = false
  isMobileMenuOpen.value = false
}

function toggleMobileGroup(groupName) {
  openedMobileGroup.value = openedMobileGroup.value === groupName ? '' : groupName
}

function openCart() {
  closeAllMenus()
  emit('open-cart')
}
</script>

<style scoped src="./Header.css"></style>