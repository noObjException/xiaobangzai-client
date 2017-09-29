import axios from 'axios'

const fetch = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 5000,
  headers: {
    // 'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  mode: 'cors',
  cache: 'force-cache'
})

fetch.interceptors.request.use(request => {
//   if (store.getters.token) {
//     request.headers['Authorization'] = store.getters.token.value
//   }
  return request
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

fetch.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    // let data = error.response.data
    // let status = error.response.code
    console.log(error.response)
    Promise.reject(error)
  }
)

export default {
  install (Vue) {
    Vue.prototype.$http = fetch
    Vue.http = fetch
  },
  $http: fetch
}

export const $http = fetch
