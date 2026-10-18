import { storeSlug } from '../config/storefront'
import { defineStore } from 'pinia'
import { useNotificationStore } from './notificationStore'

const FAVORITES_STORAGE_KEY = `perfumes-${storeSlug}-favorites`

function loadFavoriteIds() {
  const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY)

  if (!storedFavorites) {
    return []
  }

  try {
    return JSON.parse(storedFavorites)
  } catch {
    localStorage.removeItem(FAVORITES_STORAGE_KEY)
    return []
  }
}

function saveFavoriteIds(favoriteIds) {
  localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteIds))
}

export const useFavoriteStore = defineStore('favorite', {
  state: () => ({
    favoriteIds: loadFavoriteIds(),
  }),

  getters: {
    totalFavorites: (state) => {
      return state.favoriteIds.length
    },

    isFavorite: (state) => {
      return (productId) => state.favoriteIds.includes(productId)
    },
  },

  actions: {
    toggleFavorite(product) {
      const notificationStore = useNotificationStore()
      const alreadyFavorite = this.favoriteIds.includes(product.id)

      if (alreadyFavorite) {
        this.favoriteIds = this.favoriteIds.filter((id) => id !== product.id)
        this.persistFavorites()

        notificationStore.info(
          'Favorito removido',
          `${product.name} foi removido da sua lista de favoritos.`,
        )

        return
      }

      this.favoriteIds.push(product.id)
      this.persistFavorites()

      notificationStore.success(
        'Favorito adicionado',
        `${product.name} foi adicionado à sua lista de favoritos.`,
      )
    },

    clearFavorites() {
      this.favoriteIds = []
      this.persistFavorites()
    },

    persistFavorites() {
      saveFavoriteIds(this.favoriteIds)
    },
  },
})