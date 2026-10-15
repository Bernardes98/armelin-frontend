import { reactive } from 'vue'
import { apiFetch } from './api'
export const authState = reactive({token: sessionStorage.getItem('armelin_customer_token') || '', user: null})
export async function signIn(email,password){const result=await apiFetch('/auth/login',{method:'POST',body:JSON.stringify({email,password})});authState.token=result.token;authState.user=result.user;sessionStorage.setItem('armelin_customer_token',result.token);return result.user}
export async function register(name,email,password){const result=await apiFetch('/auth/register',{method:'POST',body:JSON.stringify({name,email,password})});authState.token=result.token;authState.user=result.user;sessionStorage.setItem('armelin_customer_token',result.token);return result.user}
export async function loadMe(){if(!authState.token)return null;try{authState.user=await apiFetch('/auth/me',{headers:{Authorization:'Bearer '+authState.token}});return authState.user}catch{logout();return null}}
export async function signOut(){const token=authState.token;logout();if(token)try{await apiFetch('/auth/logout',{method:'POST',headers:{Authorization:'Bearer '+token}})}catch{}}
export function logout(){authState.token='';authState.user=null;sessionStorage.removeItem('armelin_customer_token')}
