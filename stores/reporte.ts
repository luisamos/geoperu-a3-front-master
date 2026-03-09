import { defineStore } from 'pinia'

export const useReporteStore = defineStore('reporte', {
  state: () => ({
    tipo: 'dist' as string,
    codigo: '' as string,
    status: '' as string,
    results: '' as any,
    mapLocation: {} as any,
    isLimaProvincias: false,
    isRegion: false,
    isMancomunidad: false
  }),

  getters: {
    capital(): boolean {
      if (this.tipo === 'prov') {
        return this.codigo.substring(2, 4) === '01'
      } else if (this.tipo === 'dist') {
        return this.codigo.substring(4, 6) === '01'
      } else if (this.tipo === 'dpto') {
        return this.codigo.substring(0, 2) === '01'
      }
      return false
    },

    description(): string {
      switch (this.tipo) {
        case 'dist':
          return `DISTRITO *${this.results.ejecutora[0].nom_dist}*`
        case 'prov':
          return `PROVINCIA *${this.results.ejecutora[0].nom_prov}*`
        case 'dpto':
          return `DEPARTAMENTO *${this.results.ejecutora[0].nom_dpto}*`
        default:
          return ''
      }
    },

    requestCode(): string {
      switch (this.tipo) {
        case 'dist':
          return this.codigo
        case 'prov':
          return this.codigo + '01'
        case 'dpto':
          if (this.isLimaProvincias) {
            return this.codigo + '0801'
          } else if (this.isMancomunidad) {
            return this.codigo
          }
          return this.codigo + '0101'
        default:
          return this.codigo
      }
    },

    requestTipo(): string {
      switch (this.tipo) {
        case 'dist':
          return 'd'
        case 'prov':
          return 'p'
        case 'dpto':
          if (this.isMancomunidad) {
            return 'm'
          }
          return 'r'
        default:
          return 'd'
      }
    }
  },

  actions: {
    setTipoFromCodigo(codigo: string) {
      const len = codigo.length
      switch (len) {
        case 6:
          this.tipo = 'dist'
          break
        case 4:
          this.tipo = 'prov'
          break
        case 2:
        case 3:
          this.tipo = 'dpto'
          break
      }
    },

    setCodigo(codigo: string) {
      if (codigo.length === 3 && codigo === '151') {
        this.isLimaProvincias = true
        this.isRegion = true
        this.codigo = codigo.substring(0, 2)
      } else if (codigo === 'M1') {
        this.isMancomunidad = true
        this.codigo = codigo
      } else {
        this.codigo = codigo
      }
    },

    setIsRegion(value: boolean) {
      this.isRegion = value
    },

    setIsMancomunidad(value: boolean) {
      this.isMancomunidad = value
    },

    async fetchApi(codigo: string) {
      this.setTipoFromCodigo(codigo)
      this.setCodigo(codigo)
      this.status = 'pending'

      const config = useRuntimeConfig()
      const url = `${config.public.reporteUrl}?ubigeo=${this.requestCode}&t=${this.requestTipo}`

      try {
        const data = await $fetch(url, {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8'
          }
        })
        this.results = data
        this.status = 'updated'
      } catch (error) {
        this.status = 'error'
        throw error
      }
    },

    async fetchMapImage() {
      const config = useRuntimeConfig()
      const url = `${config.public.mapUrl}?codigo=${this.requestCode}&tipo=${this.requestTipo}`

      try {
        const data = await $fetch(url)
        this.mapLocation = data
        return this.mapLocation
      } catch (error) {
        throw error
      }
    },

    populate(data: any) {
      this.results = data
    }
  }
})
