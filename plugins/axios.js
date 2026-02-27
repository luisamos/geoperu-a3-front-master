import axios from 'axios'

axios.interceptors.request.use(request => {
    // request.baseURL = 'http://localhost:8000'

    // request.baseURL = 'https://secret-cove-11738.herokuapp.com'
    request.headers['Access-Control-Allow-Origin'] = '*'
    request.headers['Access-Control-Expose-Headers'] = 'Access-Control-Allow-Origin'
    // "Content-Type": "application/x-www-form-urlencoded",
    // "Cache-Control": "no-cache",
    // Console.log(axios.interceptors)
    /*if (store.getters.authToken) {
      request.headers.common['Authorization'] = `Bearer ${store.getters.authToken}`
    }*/
    // request.headers['X-Socket-Id'] = Echo.socketId()
    // Loading State
    // store.dispatch('is_loading', true)

    return request
  })

  axios.interceptors.response.use(
    response => {
      // store.dispatch('is_loading', false)
      return response
    },
    error => {
      // store.dispatch('is_loading', false)

      if (!error.response) {
        Notify.create({
          color: 'negative',
          textColor: 'white',
          icon: 'error',
          message: 'Error de conexión',
          position: 'top-right',
          avatar: '',
          timeout: 3000
        })
      }
      const { status } = error.response

      if (status === 403) {
        Notify.create({
          color: 'negative',
          textColor: 'white',
          icon: 'error',
          message: 'No posee permisos para realizar esta acción',
          position: 'top-right',
          avatar: '',
          timeout: 3000
        })
      }

      if (status >= 500) {
        Notify.create({
          color: 'negative',
          textColor: 'white',
          icon: 'error',
          message: 'Error del servidor, contactese con el adminsitrador del sistema',
          position: 'top-right',
          avatar: '',
          timeout: 3000
        })
      }

      // if (status === 401 && store.getters.authCheck === false) { POR REVISAR
      if (status === 401) {
        // store.dispatch('logout')
        // const r = new Router()
        router.push('login')

        console.log('expiro sesion')

        // or with a config object:
        Notify.create({
          color: 'negative',
          textColor: 'white',
          icon: 'error',
          message: 'La sesión ha caducado',
          position: 'top-right',
          avatar: '',
          timeout: 3000
        })
      }

      // Console.log('Estado: ' + status)
      // Console.log('Sesión Activa?: ' + store.getters.authCheck)

      return Promise.reject(error)
    }
  )


const http = axios.create({
  baseURL: '/',
  headers: { 'Cache-Control': 'no-cache'}
});

export default http