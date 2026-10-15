const API = import.meta.env.VITE_API_URL || 'http://localhost:8082'
export async function apiFetch(path, options = {}) {
  const response = await fetch(`${API}/api${path}`, { ...options, headers: { 'Content-Type': 'application/json', ...options.headers } })
  let data = null
  try { data = await response.json() } catch { /* resposta sem JSON */ }
  if (!response.ok) throw new Error(data?.message || `Erro HTTP ${response.status}`)
  return data
}
