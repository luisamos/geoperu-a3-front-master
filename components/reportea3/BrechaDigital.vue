<template>
  <div :class="componentName" @dblclick="zoomo"
  >
    <div class="cabecera">
      <div class="title">
        <span>Brecha Digital</span>
      </div>
      <Leyenda class="leyenda" order="desc"/>
    </div>
    <div class="contenido">
    <CircularChart
      ctitle="Hogares sin internet (%)"
      :colors = colors
      :distrito="parseFloat(reporteStore.results.brecha.filter((obj)=>obj.cat ==='Distrito')[0].phs_inter).toFixed(1)"
      :provincia="parseFloat(reporteStore.results.brecha.filter((obj)=>obj.cat ==='Provincia')[0].phs_inter).toFixed(1)"
      :departamento="parseFloat(reporteStore.results.brecha.filter((obj)=>obj.cat ==='Departamento')[0].phs_inter).toFixed(1)"
      :nacional="parseFloat(reporteStore.results.brecha.filter((obj)=>obj.cat ==='Nacional')[0].phs_inter).toFixed(1)"

      :ndistrito="formatNumber(reporteStore.results.brecha.filter((obj)=>obj.cat ==='Distrito')[0].hs_inter,0)"
      :nprovincia="formatNumber(reporteStore.results.brecha.filter((obj)=>obj.cat ==='Provincia')[0].hs_inter,0)"
      :ndepartamento="formatNumber(reporteStore.results.brecha.filter((obj)=>obj.cat ==='Departamento')[0].hs_inter,0)"
      :nnacional="formatNumber(reporteStore.results.brecha.filter((obj)=>obj.cat ==='Nacional')[0].hs_inter,0)"
      class="chart"
    />
    <div style="float:left;width:0.5%;height:82%;"></div>
    <CircularChart
      ctitle="Hogares sin teléfono celular (%)"
      :colors = colors
      :distrito="parseFloat(reporteStore.results.brecha.filter((obj)=>obj.cat ==='Distrito')[0].phs_tcelu).toFixed(1)"
      :provincia="parseFloat(reporteStore.results.brecha.filter((obj)=>obj.cat ==='Provincia')[0].phs_tcelu).toFixed(1)"
      :departamento="parseFloat(reporteStore.results.brecha.filter((obj)=>obj.cat ==='Departamento')[0].phs_tcelu).toFixed(1)"
      :nacional="parseFloat(reporteStore.results.brecha.filter((obj)=>obj.cat ==='Nacional')[0].phs_tcelu).toFixed(1)"

      :ndistrito="formatNumber(reporteStore.results.brecha.filter((obj)=>obj.cat ==='Distrito')[0].hs_tcelu,0)"
      :nprovincia="formatNumber(reporteStore.results.brecha.filter((obj)=>obj.cat ==='Provincia')[0].hs_tcelu,0)"
      :ndepartamento="formatNumber(reporteStore.results.brecha.filter((obj)=>obj.cat ==='Departamento')[0].hs_tcelu,0)"
      :nnacional="formatNumber(reporteStore.results.brecha.filter((obj)=>obj.cat ==='Nacional')[0].hs_tcelu,0)"
      class="chart"
    />
    <div style="float:left;width:0.5%;height:82%;"></div>
    <CircularChart
      ctitle="Hogares sin pc/laptop/tablet (%)"
      class="chart"
      :colors = colors
      :distrito="parseFloat(reporteStore.results.brecha.filter((obj)=>obj.cat ==='Distrito')[0].phs_pclptb).toFixed(1)"
      :provincia="parseFloat(reporteStore.results.brecha.filter((obj)=>obj.cat ==='Provincia')[0].phs_pclptb).toFixed(1)"
      :departamento="parseFloat(reporteStore.results.brecha.filter((obj)=>obj.cat ==='Departamento')[0].phs_pclptb).toFixed(1)"
      :nacional="parseFloat(reporteStore.results.brecha.filter((obj)=>obj.cat ==='Nacional')[0].phs_pclptb).toFixed(1)"

      :ndistrito="formatNumber(reporteStore.results.brecha.filter((obj)=>obj.cat ==='Distrito')[0].hs_pclptb,0)"
      :nprovincia="formatNumber(reporteStore.results.brecha.filter((obj)=>obj.cat ==='Provincia')[0].hs_pclptb,0)"
      :ndepartamento="formatNumber(reporteStore.results.brecha.filter((obj)=>obj.cat ==='Departamento')[0].hs_pclptb,0)"
      :nnacional="formatNumber(reporteStore.results.brecha.filter((obj)=>obj.cat ==='Nacional')[0].hs_pclptb,0)"
    />
    </div>
    
    <Fuente 
      class="fuente" 
      label="Fuente: INEI - Censos Nacionales 2017: XII de Población y VII de Vivienda"
    />
      
  </div>
</template>

<script>
import CircularChart from "~/components/reportea3/CircularChart.vue";
import Leyenda from "~/components/reportea3/Leyenda.vue";
import Fuente from "~/components/reportea3/Fuente.vue";

import numberFormat from '~/mixins/numberFormat.js';
import { useReporteStore } from '~/stores/reporte'

export default {
  setup() {
    const reporteStore = useReporteStore()
    return { reporteStore }
  },
  name: 'brecha-digital',
  mixins:[numberFormat],
  data() {
    return {
      componentName: 'brecha-digital',
      colors: {
        'nacional':'#ff6356',
        'departamento':'#4e0146',
        'provincia':'#750280',
        'distrito':'#a40fd3',
      }
    }
  },
  mounted() {},
  components: {
    CircularChart,
    Leyenda,
    Fuente
  }
};
</script>

<style scoped>
  
.brecha-digital {
   height:100%;
   text-align:left;
   background-color:#f9f2fb !important;
   border-radius:10px 10px 10px 10px;
}
.brecha-digital .cabecera {
  text-align:center;
  height:14%;
}
.brecha-digital .cabecera .title
{
  width:100%;
  height:50%;
}

.brecha-digital .cabecera .title span {
  font-size: 1.2em;
  font-weight: 600;
  color: #621f5b !important;
}

.brecha-digital .cabecera .title .leyenda {
  width:100%;
  height:50%;
}

.brecha-digital .contenido {
  width:100%;
  height:80%;
}

.brecha-digital .contenido .chart {
 width:33%;
 border-radius: 10px 10px 10px 10px;
 height:100%;
 float:left;
}

.fuente {
  height:4%;
}


:deep(.chart .label-nacional b) {  
  color: #ff6356 !important;
}

:deep(.chart .label-departamento b) {  
  color: #4e0146 !important;
}

:deep(.chart .label-provincia b) {  
  color: #750280 !important;
}

:deep(.chart .label-distrito b) {  
  color: #a40fd3 !important;
}

/* Leyenda */
:deep(.leyenda .item) {
  font-size: 7px;
}
:deep(.leyenda .item .legend-circle) {
  width: 7px;
  height: 7px;
}

:deep(.leyenda .item .legend-circle-nacional) {
  background-color: #ff6356 !important;
}

:deep(.leyenda .item .legend-circle-departamento) {
  background-color: #4e0146 !important;
}

:deep(.leyenda .item .legend-circle-provincia) {
  background-color: #750280 !important;
}

/deep/.leyenda .item .legend-circle-distrito {
  background-color: #a40fd3 !important;
}


</style>