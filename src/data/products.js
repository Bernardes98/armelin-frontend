import { reactive } from 'vue'
import { apiFetch } from '../services/api'
export const products = reactive([])
export const catalogStatus = reactive({ loading: false, loaded: false, error: '' })
let pending = null
export async function refreshProducts(force = false) {
  if (pending) return pending
  if (catalogStatus.loaded && !force) return products
  catalogStatus.loading = true
  catalogStatus.error = ''
  pending = (async () => {
    try {
      const remote = await apiFetch('/products')
      if (!Array.isArray(remote)) throw new Error('Resposta inválida do catálogo')
      products.splice(0, products.length, ...remote.filter(product => product.active !== false))
      catalogStatus.loaded = true
      return products
    } catch (error) {
      catalogStatus.error = error.message || 'Erro ao consultar catálogo'
      throw error
    } finally { catalogStatus.loading = false; pending = null }
  })()
  return pending
}
