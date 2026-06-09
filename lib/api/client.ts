import axios from 'axios'

const clientApi = axios.create({
  baseURL: (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000').replace(/\/$/, ''),
  withCredentials: true,
})

clientApi.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message ?? error.message ?? 'Request failed'
    return Promise.reject(new Error(message))
  }
)

export default clientApi
