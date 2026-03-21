const DEFAULT_API_BASE_URL = 'http://localhost:4000/api'

function normalizeBaseUrl(value: string) {
  return value.replace(/\/+$/, '')
}

export const env = {
  apiBaseUrl: normalizeBaseUrl(
    import.meta.env.VITE_API_BASE_URL?.trim() || DEFAULT_API_BASE_URL,
  ),
}
