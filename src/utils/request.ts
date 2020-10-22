import axios from 'axios'

const request = axios.create({
  baseURL: 'https://api.exchangeratesapi.io'
})

request.interceptors.response.use(response => {
  return response.data
})

export default request
