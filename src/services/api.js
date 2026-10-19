import { storeSlug } from '../config/storefront'

const API = (import.meta.env.VITE_API_URL || 'http://localhost:8080').replace(/\/$/, '')

export async function apiFetch(path, options = {}) {
  let response
  try {
    response = await fetch(`${API}/api${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'X-Store-Slug': storeSlug,
        ...options.headers,
      },
    })
  } catch {
    throw new Error(`Não foi possível conectar à API (${API}). Verifique se o backend está iniciado.`)
  }

  const data = await response.json().catch(() => null)
  if (!response.ok) {
    throw new Error(data?.message || data?.detail || data?.error || `Erro HTTP ${response.status}`)
  }
  return data
}
