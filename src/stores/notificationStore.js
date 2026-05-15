import { defineStore } from 'pinia'

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    notifications: [],
  }),

  actions: {
    show({ title, message, type = 'success', duration = 3500 }) {
      const id = Date.now() + Math.random()

      this.notifications.push({
        id,
        title,
        message,
        type,
      })

      window.setTimeout(() => {
        this.remove(id)
      }, duration)
    },

    success(title, message) {
      this.show({
        title,
        message,
        type: 'success',
      })
    },

    info(title, message) {
      this.show({
        title,
        message,
        type: 'info',
      })
    },

    warning(title, message) {
      this.show({
        title,
        message,
        type: 'warning',
      })
    },

    error(title, message) {
      this.show({
        title,
        message,
        type: 'error',
      })
    },

    remove(id) {
      this.notifications = this.notifications.filter((notification) => notification.id !== id)
    },
  },
})