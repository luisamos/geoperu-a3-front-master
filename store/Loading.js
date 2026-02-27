// initial state
export const state = () => ({
    loading: false,
    text: '',
    tipo: ''
})

// getters
export const getters = {
  isLoading(state) {
    return state.loading === true
  },
  text(state) {
    return state.text
  },
  isOverlay(state) {
    return state.tipo === 'Overlay'
  },
  isNotif(state) {
    return state.tipo === 'Notif'
  }
}

// actions
export const actions = {
    START({ commit, state }, {tipo,text} ) {
        commit('setTipo', tipo )
        commit('setLoading', { loading: true, text: text } )
    },
    STOP({ commit, state }) {
        commit('setLoading', { loading: false, text: '' } )
    }
}

// mutations
export const mutations = {
  setLoading(state, { loading, text }) {
    state.loading = loading
    state.text = text
  },
  setTipo(state, tipo) {
    state.tipo = tipo
  }
}
