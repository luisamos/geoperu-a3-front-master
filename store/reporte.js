import axios from '~/plugins/axios'
import MapImage from "~/models/MapImage"

import { MAP_URL } from "~/endpoints"
import { REPORTE_URL } from "~/endpoints"

//import idb from "~/models/Idb.js"

// initial state
// shape: [{ id, quantity }]
export const state = () => ({
  tipo: 'dist',
  codigo: '',
  status: '',
  results: '',
  mapLocation: {},
  isLimaProvincias: false,
  isRegion: false,
  isMancomunidad: false
})

// getters
export const getters = {
  /**
   * returns Object
   */
  results: (state, getters, rootState) => {
    return state.results
  },
  codigo: (state, getters, rootState) => {
    return state.codigo
  },
  /**
   * return boolean
   */
  capital: (state, getters, rootState) => {
    if (state.tipo === 'prov') {
      return state.codigo.substring(2, 4) === '01'
    } else if (state.tipo === 'dist') {
      return state.codigo.substring(4, 6) === '01'
    } else if (state.tipo === 'dpto') {
      return state.codigo.substring(0, 2) === '01'
    }

    return false
  },
  /**
   * return String
   * prov || dist
   */
  tipo: (state, getters, rootState) => {
    return state.tipo
  },
  /**
   *  return Integer
   */
  status: (state, getters, rootState) => {
    return state.status
  },
  isRegion: (state, getters, rootState) => {
    return state.isRegion
  },
  isMancomunidad: (state, getters, rootState) => {
    return state.isMancomunidad
  },
  description: (state, getters, rootState) => {

    switch (state.tipo) {
      case 'dist':
        return `DISTRITO *${state.results.ejecutora[0].nom_dist}*`
      case 'prov':
        return `PROVINCIA *${state.results.ejecutora[0].nom_prov}*`
      case 'dpto':
        return `DEPARTAMENTO *${state.results.ejecutora[0].nom_dpto}*`
    }
  },
  requestCode: (state, getters, rootState) => {
    switch (state.tipo) {
      case 'dist':
        return state.codigo
      case 'prov':
        return state.codigo + '01'
      case 'dpto':
        if (state.isLimaProvincias) {
          return state.codigo + '0801'
        } else if (state.isMancomunidad) {
            return state.codigo
        }
        return state.codigo + '0101'
    }
  },
  requestTipo: (state, getters ,rootState) => {
    switch (state.tipo) {
      case 'dist':
        return 'd'
      case 'prov':
        return 'p'
      case 'dpto':
          if(state.isMancomunidad) {
              return 'm'
          }
        return 'r'
    }
  }
}

// actions
export const actions = {
  isRegion({ commit, state, getters }, isRegion) {
    commit('setRegion', isRegion)
  },
  isMancomunidad({ commit, state, getters }, isMancomunidad) {
    commit('setMancomunidad', isMancomunidad)
  },
  fetchApi({ commit, state, getters }, codigo) {
    commit('setTipo', codigo)
    commit('setCodigo', codigo)
    commit('setStatus', 'pending')
    return new Promise((resolve, reject) => {
      axios
        .get(
          REPORTE_URL + "?ubigeo=" + getters.requestCode + "&t=" + getters.requestTipo,
          {
            headers: {
              // "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json; charset=UTF-8"
            }
          }
        )
        .then(response => {
          commit('setResults', response.data);

          
          //idb.saveRegs(JSON.stringify(response.data))
          

          commit('setStatus', 'updated');

          resolve()
        })
        .catch(error => {
          commit('setStatus', 'error');
          reject(error)
        })
    })
  },
  fetchMapImage({ commit, state, getters }, size) {
    return new Promise(async (resolve, reject) => {
      await axios
        .get(
          // Returns PDF
          MAP_URL +
          "?codigo=" + getters.requestCode +
          "&tipo=" + getters.requestTipo
        )
        .then(response => {
          commit('setMapLocation', response)
          return resolve(state.mapLocation)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  populate({ commit, state }, data) {
    commit('setResults', data)
  }
}

// mutations
export const mutations = {
  setResults(state, results) {
    state.results = results
  },
  setStatus(state, status) {
    state.status = status
  },
  setTipo(state, codigo) {
    let len = codigo.length;
    let tipo = null;

    switch( len ){
      case 6:
        tipo = 'dist'
        break;
      case 4:
        tipo = 'prov'
        break;
      case 2:
        tipo = 'dpto'
        break;
      case 3:
        tipo = 'dpto'
        break;
    }
    
    state.tipo = tipo
  },
  setCodigo(state, codigo ) {
    if( codigo.length === 3 && codigo === '151' ) {
      state.isLimaProvincias = true
      state.isRegion = true
      state.codigo = codigo.substring(0,2)
    } else if( codigo === 'M1' ) {
        state.isMancomunidad = true
        state.codigo = codigo
    } else {
      state.codigo = codigo
    }
  },
  setRegion(state, isRegion) {
    state.isRegion = isRegion
  },
  setMapLocation(state, mapLocation) {
    state.mapLocation = mapLocation
  },
}
