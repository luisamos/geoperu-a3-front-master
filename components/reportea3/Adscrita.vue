<template>
  <div class="adscrita">
        <label
          v-if="reporteStore.results.ejecutora[0].adscrito===1 && reporteStore.tipo !== 'dpto'"
        >MUNICIPALIDAD ESTÁ ADSCRITA A INVIERTE.PE</label>

        <label
          v-if="reporteStore.results.ejecutora[0].adscrito===0 && reporteStore.tipo !== 'dpto'"
        >MUNICIPALIDAD NO ESTÁ ADSCRITA A INVIERTE.PE</label>

        <label
          v-if="reporteStore.isMancomunidad === false && reporteStore.tipo === 'dpto' && reporteStore.results.ejecutora[0].subsistema>0"
        >GOBIERNO REGIONAL CUENTA CON SUBSISTEMA GEO PERÚ</label>

        <label
          v-if="reporteStore.isMancomunidad === false && reporteStore.tipo === 'dpto' && reporteStore.results.ejecutora[0].subsistema==0"
        >GOBIERNO REGIONAL NO CUENTA CON SUBSISTEMA GEO PERÚ</label>

        <label
          v-if="reporteStore.isMancomunidad === true && reporteStore.results.ejecutora[0].subsistema>0"
        >MANCOMUNIDAD CUENTA CON SUBSISTEMA GEO PERÚ</label>

        <label
          v-if="reporteStore.isMancomunidad === true && reporteStore.results.ejecutora[0].subsistema==0"
        >MANCOMUNIDAD NO CUENTA CON SUBSISTEMA GEO PERÚ</label>

    </div>
</template>
<style>
.adscrita {
  width:100%;
  height:55px;
  background-color:#f5f5f5;
  border-radius:10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.adscrita label {
  color: black !important;
  border:none;
  padding-right: 12%;
  padding-left: 12%;
  padding-top: 3px;
  padding-bottom: 3px;
  background-color: #dadada;
 }
</style>
<script>
import { useReporteStore } from '~/stores/reporte'

export default {
  name: 'adscrita',
  setup() {
    const reporteStore = useReporteStore()
    return { reporteStore }
  }
}
</script>
