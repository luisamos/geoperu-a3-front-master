import { defineStore } from 'pinia'

export const useLoadingStore = defineStore('loading', {
  state: () => ({
    loading: false,
    text: '',
    tipo: ''
  }),

  getters: {
    isLoading: (state) => state.loading === true,
    isOverlay: (state) => state.tipo === 'Overlay',
    isNotif: (state) => state.tipo === 'Notif'
  },

  actions: {
    start({ tipo, text }: { tipo: string; text: string }) {
      this.tipo = tipo
      this.loading = true
      this.text = text
    },

    stop() {
      this.loading = false
      this.text = ''
    }
  }
})
