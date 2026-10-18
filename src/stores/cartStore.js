import { storeSlug } from '../config/storefront'
import { defineStore } from 'pinia'
import { useNotificationStore } from './notificationStore'

const CART_STORAGE_KEY = `perfumes-${storeSlug}-cart`

function loadCartItems() {
  const storedItems = localStorage.getItem(CART_STORAGE_KEY)

  if (!storedItems) {
    return []
  }

  try {
    return JSON.parse(storedItems)
  } catch {
    localStorage.removeItem(CART_STORAGE_KEY)
    return []
  }
}

function saveCartItems(items) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: loadCartItems(),
    isOpen: false,
  }),

  getters: {
    totalItems: (state) => {
      return state.items.reduce((total, item) => total + item.quantity, 0)
    },

    totalPrice: (state) => {
      return state.items.reduce((total, item) => {
        return total + item.price * item.quantity
      }, 0)
    },
  },

  actions: {
    openCart() {
      this.isOpen = true
    },

    closeCart() {
      this.isOpen = false
    },

    addProduct(product) {
      const notificationStore = useNotificationStore()
      const existingItem = this.items.find((item) => item.id === product.id)

      if (existingItem) {
        existingItem.quantity += 1
        this.persistCart()
        this.openCart()

        notificationStore.success(
          'Carrinho atualizado',
          `${product.name} teve a quantidade atualizada.`,
        )

        return
      }

      this.items.push({
        id: product.id,
        name: product.name,
        volume: product.volume,
        subtitle: product.subtitle,
        price: product.price,
        image: product.image,
        quantity: 1,
      })

      this.persistCart()
      this.openCart()

      notificationStore.success(
        'Produto adicionado',
        `${product.name} foi adicionado ao carrinho.`,
      )
    },

    removeProduct(productId) {
      const notificationStore = useNotificationStore()
      const item = this.items.find((cartItem) => cartItem.id === productId)

      this.items = this.items.filter((cartItem) => cartItem.id !== productId)
      this.persistCart()

      if (item) {
        notificationStore.info(
          'Produto removido',
          `${item.name} foi removido do carrinho.`,
        )
      }
    },

    increaseQuantity(productId) {
      const item = this.items.find((cartItem) => cartItem.id === productId)

      if (!item) {
        return
      }

      item.quantity += 1
      this.persistCart()
    },

    decreaseQuantity(productId) {
      const item = this.items.find((cartItem) => cartItem.id === productId)

      if (!item) {
        return
      }

      if (item.quantity === 1) {
        this.removeProduct(productId)
        return
      }

      item.quantity -= 1
      this.persistCart()
    },

    clearCart() {
      this.items = []
      this.persistCart()
    },

    persistCart() {
      saveCartItems(this.items)
    },
  },
})