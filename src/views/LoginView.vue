<template><div class="login-view"><section class="login-card">
  <p>Perfumes</p><h1>{{mode==='login'?'Entrar':mode==='register'?'Criar conta':'Recuperar senha'}}</h1>
  <form class="login-form" @submit.prevent="submit">
   <label v-if="mode==='register'">Nome completo<input v-model.trim="name" autocomplete="name" required /></label>
   <label>E-mail<input v-model.trim="email" type="email" autocomplete="email" required /></label>
   <label v-if="mode!=='forgot'">Senha<input v-model="password" type="password" :autocomplete="mode==='login'?'current-password':'new-password'" required /></label>
   <button :disabled="busy" type="submit">{{busy?'Aguarde...':mode==='login'?'Entrar':mode==='register'?'Cadastrar':'Enviar link por e-mail'}}</button>
  </form><p v-if="message" role="status">{{message}}</p>
  <div class="login-extra"><a href="#" @click.prevent="change('login')">Entrar</a><span>•</span><a href="#" @click.prevent="change('register')">Criar conta</a><span>•</span><a href="#" @click.prevent="change('forgot')">Esqueci minha senha</a></div>
 </section></div></template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { apiFetch } from '../services/api'
import { signIn, register } from '../services/auth'
const router=useRouter(),mode=ref('login'),name=ref(''),email=ref(''),password=ref(''),busy=ref(false),message=ref('')
function change(value){mode.value=value;message.value='';password.value=''}
async function submit(){busy.value=true;message.value='';try{if(mode.value==='forgot'){const data=await apiFetch('/auth/forgot-password',{method:'POST',body:JSON.stringify({email:email.value})});message.value=data.message;return}if(mode.value==='register')await register(name.value,email.value,password.value);else await signIn(email.value,password.value);await router.push('/minha-conta')}catch(e){message.value=e.message}finally{busy.value=false}}
</script><style scoped src="./LoginView.css"></style>
