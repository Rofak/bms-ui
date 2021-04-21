export default {
  proxy: process.env.PROXY,
  baseURL: process.env.PROXY === 'true' ? '/api' : process.env.API_URL,
  debug: process.env.NODE_ENV !== 'production',
}
