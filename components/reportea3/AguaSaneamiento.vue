<template>
  <div :class="$options.name" @dblclick="zoomo"
  >
    <div class="cabecera">
      <div class="title">
        <span>Agua y Saneamiento</span>
      </div>
      <Leyenda class="leyenda" order="desc" />        
    </div>
    <CircularChart
      ctitle="Viviendas sin acceso a agua (%)"
      class="chart"
      :colors = colors
      :distrito="parseFloat(this.$store.getters['reporte/results'].vivienda.filter((obj)=>obj.cat ==='Distrito')[0].pvs_agua_r).toFixed(1)"
      :provincia="parseFloat(this.$store.getters['reporte/results'].vivienda.filter((obj)=>obj.cat ==='Provincia')[0].pvs_agua_r).toFixed(1)"
      :departamento="parseFloat(this.$store.getters['reporte/results'].vivienda.filter((obj)=>obj.cat ==='Departamento')[0].pvs_agua_r).toFixed(1)"
      :nacional="parseFloat(this.$store.getters['reporte/results'].vivienda.filter((obj)=>obj.cat ==='Nacional')[0].pvs_agua_r).toFixed(1)"

      :ndistrito="this.formatNumber(parseFloat(this.$store.getters['reporte/results'].vivienda.filter((obj)=>obj.cat ==='Distrito')[0].n_va),0)"
      :nprovincia="this.formatNumber(parseFloat(this.$store.getters['reporte/results'].vivienda.filter((obj)=>obj.cat ==='Provincia')[0].n_va),0)"
      :ndepartamento="this.formatNumber(parseFloat(this.$store.getters['reporte/results'].vivienda.filter((obj)=>obj.cat ==='Departamento')[0].n_va),0)"
      :nnacional="this.formatNumber(parseFloat(this.$store.getters['reporte/results'].vivienda.filter((obj)=>obj.cat ==='Nacional')[0].n_va),0)"
      
    />
    <!--div style="float:left;width:0.5%;height:78%;"></div-->
    <CircularChart
      ctitle="Viviendas sin acceso a saneamiento (%)"
      class="chart"
      :colors = colors
      :distrito="parseFloat(this.$store.getters['reporte/results'].vivienda.filter((obj)=>obj.cat ==='Distrito')[0].pvs_sh).toFixed(1)"
      :provincia="parseFloat(this.$store.getters['reporte/results'].vivienda.filter((obj)=>obj.cat ==='Provincia')[0].pvs_sh).toFixed(1)"
      :departamento="parseFloat(this.$store.getters['reporte/results'].vivienda.filter((obj)=>obj.cat ==='Departamento')[0].pvs_sh).toFixed(1)"
      :nacional="parseFloat(this.$store.getters['reporte/results'].vivienda.filter((obj)=>obj.cat ==='Nacional')[0].pvs_sh).toFixed(1)"

      :ndistrito="this.formatNumber(parseFloat(this.$store.getters['reporte/results'].vivienda.filter((obj)=>obj.cat ==='Distrito')[0].n_vs),0)"
      :nprovincia="this.formatNumber(parseFloat(this.$store.getters['reporte/results'].vivienda.filter((obj)=>obj.cat ==='Provincia')[0].n_vs),0)"
      :ndepartamento="this.formatNumber(parseFloat(this.$store.getters['reporte/results'].vivienda.filter((obj)=>obj.cat ==='Departamento')[0].n_vs),0)"
      :nnacional="this.formatNumber(parseFloat(this.$store.getters['reporte/results'].vivienda.filter((obj)=>obj.cat ==='Nacional')[0].n_vs),0)"
    />

    <Fuente 
      label="Fuente: INEI - Censos Nacionales 2017: XII de Población y VII de Vivienda"
    />
      
  </div>
</template>

<script>
import CircularChart from "~/components/reportea3/CircularChart.vue";
import Leyenda from "~/components/reportea3/Leyenda.vue";
import Fuente from '~/components/reportea3/Fuente.vue';

import numberFormat from '~/mixins/numberFormat.js';

export default {
  name: 'agua-saneamiento',
  mixins:[numberFormat],
  data () {
    return {
      colors: {
        'nacional': '#ff6356',
        'departamento': '#247666',
        'provincia': '#3dac96',
        'distrito': '#52dcc2'
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

<style>
.agua-saneamiento {
  height:100%;
  text-align:left;
  background-color:#edf8fc !important;
  border-radius:10px 10px 10px 10px
}

.agua-saneamiento .cabecera {
  text-align:center;
  height:14%;
}

.agua-saneamiento .cabecera .title {
  width:100%;
  height:40%;
}

.agua-saneamiento .cabecera .title span {
  font-size: 18px;
  font-weight: 600;
  color:#247666 !important;
}


.agua-saneamiento .cabecera .leyenda {
   width:100%;
   height:60%;
}

.agua-saneamiento .chart {
  width: 49.7%;
  border-radius: 10px 10px 10px 10px;
  height:78%;
  float:left;
}

.agua-saneamiento .fuente {
  height: 8%;
}
</style>

<style scoped>

/deep/ .chart .label-nacional b {  
  color: #ff6356 !important;
}

/deep/ .chart .label-departamento b {  
  color: #247666 !important;
}

/deep/ .chart .label-provincia b {  
  color: #3dac96 !important;
}

/deep/ .chart .label-distrito b {  
  color: #52dcc2 !important;
}


/* Leyenda */
/deep/ .leyenda .item {
  font-size: 7px;
}
/deep/ .leyenda .item .legend-circle {
  width: 7px;
  height: 7px;
}

/deep/ .leyenda .item .legend-circle-nacional {
  background-color: #ff6356 !important;
}

/deep/ .leyenda .item .legend-circle-departamento {
  background-color: #247666 !important;
}

/deep/ .leyenda .item .legend-circle-provincia {
  background-color: #3dac96 !important;
}

/deep/ .leyenda .item .legend-circle-distrito {
  background-color: #52dcc2 !important;
}
</style>