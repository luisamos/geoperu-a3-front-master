import axios from '~/plugins/axios'
import MapImage from "~/models/MapImage"

import { MAP_URL } from "~/endpoints"
import { REPORTE_CEM_URL } from "~/endpoints"

//import idb from "~/models/Idb.js"

// initial state
// shape: [{ id, quantity }]
export const state = () => ({
  tipo: 'dist',
  codigo: '',
  status: '',
  results: '',
  MapImage: '',
  isLimaProvincias: false,
  isRegion: false
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
  description: (state, getters, rootState) => {
    return 'CEM | MUJER'
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
        return 'r'
    }
  }
}

// actions
export const actions = {
  isRegion({ commit, state, getters }, isRegion) {
    commit('setRegion', isRegion)
  },
  fetchApi({ commit, state, getters }, codigo) {
    commit('setTipo', codigo)
    commit('setCodigo', codigo)
    commit('setStatus', 'pending')
    return new Promise((resolve, reject) => {
      axios
        .get(
          REPORTE_CEM_URL + "?ubigeo=" + getters.requestCode + "&t=" + getters.requestTipo,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
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
          MAP_URL +
          "?codigo=" + getters.requestCode +
          "&page=" + size +
          "&tipo=" + getters.requestTipo
        )
        .then(response => {
          let oMapImage = new MapImage(
            state.codigo,
            state.tipo,
            size,
            response.data.map_url,
            response.data.refmapurl,
            response.data.scaleburl,
            response.data.scale
          )
          commit('setMapImage', oMapImage)
          return resolve(state.MapImage)
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
    } else {
      state.codigo = codigo
    }
  },
  setRegion(state, isRegion) {
    state.isRegion = isRegion
  },
  setMapImage(state, oMapImage) {
    state.MapImage = oMapImage
  },
}
