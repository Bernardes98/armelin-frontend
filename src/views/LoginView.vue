<template>
  <div class="login-view">
    <section class="login-card">
      <p>Acesse sua conta</p>
      <h1>Entrar</h1>

      <form class="login-form" @submit.prevent="handleSubmit">
        <label>
          E-mail
          <input v-model="form.email" type="email" placeholder="seuemail@exemplo.com" required />
        </label>

        <label>
          Senha
          <input v-model="form.password" type="password" placeholder="Digite sua senha" required />
        </label>

        <button type="submit">
          Entrar
        </button>
      </form>

      <div class="login-extra">
        <a href="#" @click.prevent="showMockMessage">Esqueci minha senha</a>
        <span>•</span>
        <a href="#" @click.prevent="showMockMessage">Criar conta</a>
      </div>

      <div class="demo-box">
        <strong>Conta demonstrativa</strong>
        <span>Use qualquer e-mail e senha para acessar a página mockada.</span>
      </div>
    </section>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useNotificationStore } from '../stores/notificationStore'

const router = useRouter()
const notificationStore = useNotificationStore()

const form = reactive({
  email: '',
  password: '',
})

function handleSubmit() {
  notificationStore.success(
    'Login realizado',
    'Você entrou na conta demonstrativa.',
  )

  router.push('/minha-conta')
}

function showMockMessage() {
  notificationStore.info(
    'Funcionalidade demonstrativa',
    'Essa ação será integrada ao backend em uma próxima etapa.',
  )
}
</script>

<style scoped src="./LoginView.css"></style>