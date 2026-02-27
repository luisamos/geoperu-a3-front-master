<template>
  <div :class="$options.name">
        <label
          v-if="$store.getters['reporte/results'].ejecutora[0].adscrito===1 && $store.getters['reporte/tipo'] !== 'dpto'"
          
        >MUNICIPALIDAD ESTÁ ADSCRITA A INVIERTE.PE</label>

        <label
          v-if="$store.getters['reporte/results'].ejecutora[0].adscrito===0 && $store.getters['reporte/tipo'] !== 'dpto'"
          
        >MUNICIPALIDAD NO ESTÁ ADSCRITA A INVIERTE.PE</label>

        <label
          v-if="$store.getters['reporte/isMancomunidad'] === false && $store.getters['reporte/tipo'] === 'dpto' && $store.getters['reporte/results'].ejecutora[0].subsistema>0"
          
        >GOBIERNO REGIONAL CUENTA CON SUBSISTEMA GEO PERÚ</label>

     

          <label
          v-if="$store.getters['reporte/isMancomunidad'] === false && $store.getters['reporte/tipo'] === 'dpto' && $store.getters['reporte/results'].ejecutora[0].subsistema==0"
          
        >GOBIERNO REGIONAL NO CUENTA CON SUBSISTEMA GEO PERÚ</label>

            <label
          v-if="$store.getters['reporte/isMancomunidad'] === true && $store.getters['reporte/results'].ejecutora[0].subsistema>0"
          
        >MANCOMUNIDAD CUENTA CON SUBSISTEMA GEO PERÚ</label>

         <label
          v-if="$store.getters['reporte/isMancomunidad'] === true && $store.getters['reporte/results'].ejecutora[0].subsistema==0"
          
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
  /*color:#5cb85c !important;*/
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
export default {
  name: 'adscrita'
}
</script>