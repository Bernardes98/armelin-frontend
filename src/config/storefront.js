// Configuração por implantação. Nunca coloque segredos em variáveis VITE_*.
const env = import.meta.env
export const storeSlug = String(env.VITE_STORE_SLUG || 'default').trim().toLowerCase()
export const storefront = Object.freeze({
  plan: String(env.VITE_STORE_PLAN || 'COMMERCE').toUpperCase() === 'ESSENTIAL' ? 'ESSENTIAL' : 'COMMERCE',
  name: (env.VITE_STORE_NAME || 'Perfumes').trim(),
  tagline: (env.VITE_STORE_TAGLINE || 'Fragrâncias para todos os momentos.').trim(),
  description: (env.VITE_STORE_DESCRIPTION || 'Encontre fragrâncias especiais para cada ocasião.').trim(),
  whatsapp: (env.VITE_STORE_WHATSAPP || '').replace(/\D/g, ''),
  instagram: (env.VITE_STORE_INSTAGRAM || '').trim(),
  accent: /^#[0-9a-fA-F]{6}$/.test(env.VITE_STORE_ACCENT || '') ? env.VITE_STORE_ACCENT : '#a87c44',
})
export const isEssential = storefront.plan === 'ESSENTIAL'
export function whatsappLink(message = '') {
  if (!storefront.whatsapp) return ''
  return `https://wa.me/${storefront.whatsapp}?text=${encodeURIComponent(message || `Olá! Gostaria de conhecer os produtos da ${storefront.name}.`)}`
}
