<template><div class="login-view"><section class="login-card"><h1>Redefinir senha</h1><form class="login-form" @submit.prevent="submit"><label>Nova senha<input v-model="password" type="password" autocomplete="new-password" required /></label><button :disabled="busy">{{busy?'Aguarde...':'Salvar nova senha'}}</button></form><p role="status">{{message}}</p><RouterLink to="/login">Voltar ao login</RouterLink></section></div></template>
<script setup>
import {ref} from 'vue';import {useRoute} from 'vue-router';import {apiFetch} from '../services/api';const route=useRoute(),password=ref(''),message=ref(''),busy=ref(false)
async function submit(){busy.value=true;try{const r=await apiFetch('/auth/reset-password',{method:'POST',body:JSON.stringify({token:route.query.token,password:password.value})});message.value=r.message;password.value=''}catch(e){message.value=e.message}finally{busy.value=false}}
</script><style scoped src="./LoginView.css"></style>
