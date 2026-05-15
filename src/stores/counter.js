import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
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
      const existingItem = this.items.find((item) => item.id === product.id)

      if (existingItem) {
        existingItem.quantity += 1
        this.openCart()
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

      this.openCart()
    },

    removeProduct(productId) {
      this.items = this.items.filter((item) => item.id !== productId)
    },

    increaseQuantity(productId) {
      const item = this.items.find((item) => item.id === productId)

      if (item) {
        item.quantity += 1
      }
    },

    decreaseQuantity(productId) {
      const item = this.items.find((item) => item.id === productId)

      if (!item) {
        return
      }

      if (item.quantity === 1) {
        this.removeProduct(productId)
        return
      }

      item.quantity -= 1
    },

    clearCart() {
      this.items = []
    },
  },
})