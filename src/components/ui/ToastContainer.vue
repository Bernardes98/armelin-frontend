<template>
  <Teleport to="body">
    <div class="toast-container">
      <article
        v-for="notification in notificationStore.notifications"
        :key="notification.id"
        :class="['toast-card', notification.type]"
      >
        <div class="toast-icon">
          {{ getIcon(notification.type) }}
        </div>

        <div class="toast-content">
          <strong>{{ notification.title }}</strong>
          <span>{{ notification.message }}</span>
        </div>

        <button
          type="button"
          class="toast-close"
          aria-label="Fechar notificação"
          @click="notificationStore.remove(notification.id)"
        >
          ×
        </button>
      </article>
    </div>
  </Teleport>
</template>

<script setup>
import { useNotificationStore } from '../../stores/notificationStore'

const notificationStore = useNotificationStore()

function getIcon(type) {
  const icons = {
    success: '✓',
    info: 'i',
    warning: '!',
    error: '×',
  }

  return icons[type] || icons.info
}
</script>

<style scoped src="./ToastContainer.css"></style>