<template>
  <div :class="$options.name" @dblclick="zoomo"
  >
    <div class="cabecera">
      <div class="title">
        <span>Pobreza no monetaria</span>
        <br>
      </div>
      <Leyenda order="desc" class="leyenda" />
    </div>
    <CircularChart
      ctitle="Población con al menos una NBI (%)"
      class="chart"
      :colors = colors
      :distrito="getData(this.$store.getters['reporte/results'].nbi.filter((obj)=>obj.cat ==='Distrito'), 'almenosu_1')"
      :provincia="getData(this.$store.getters['reporte/results'].nbi.filter((obj)=>obj.cat ==='Provincia'), 'almenosu_1')"
      :departamento="getData(this.$store.getters['reporte/results'].nbi.filter((obj)=>obj.cat ==='Departamento'), 'almenosu_1')"
      :nacional="getData(this.$store.getters['reporte/results'].nbi.filter((obj)=>obj.cat ==='Nacional'), 'almenosu_1')"

      :ndistrito="getDataInt(this.$store.getters['reporte/results'].nbi.filter((obj)=>obj.cat ==='Distrito'), 'almenosuna')"
      :nprovincia="getDataInt(this.$store.getters['reporte/results'].nbi.filter((obj)=>obj.cat ==='Provincia'), 'almenosuna')"
      :ndepartamento="getDataInt(this.$store.getters['reporte/results'].nbi.filter((obj)=>obj.cat ==='Departamento'), 'almenosuna')"
      :nnacional="getDataInt(this.$store.getters['reporte/results'].nbi.filter((obj)=>obj.cat ==='Nacional'), 'almenosuna')"
    />

    <Fuente class="fuente" label="Fuente: INEI - Censos Nacionales 2017: XII de Población y VII de Vivienda" />
  </div>
</template>

<script>
import CircularChart from "~/components/reportea3/CircularChart.vue";
import Leyenda from "~/components/reportea3/Leyenda.vue";
import Fuente from "~/components/reportea3/Fuente.vue";

import numberFormat from '~/mixins/numberFormat.js'

export default {
  name: 'pobreza-nomon',
  mixins: [numberFormat],
  data: () => {
    return {
      colors: {
          distrito: '#bc6600',
          provincia: '#834300',
          departamento: '#421e00',
          nacional: '#ff6356'
      }
    }
  },
  mounted() {
  },
  components: {
    CircularChart,
    Leyenda,
    Fuente
  },
  methods: {
    getData(array, iname) {
       if (array.length > 0) {
        if ( typeof array[0][iname] != 'undefined') {
          let r = this.formatNumber(array[0][iname],1)
          return r.toString();
        }
      }
      return "0.0";
    },
    getDataInt(array, iname) {
       if (array.length > 0) {
        if ( typeof array[0][iname] != 'undefined') {
          let r = this.formatNumberInt(array[0][iname]);
          return r.toString();
        }
      }
      return "0";
    }
  }
};
</script>

<style scoped>
.pobreza-nomon {
  height:100%;
  text-align:left;
  background-color: #fdfaf7 !important;
  border-radius:10px 10px 10px 10px
}

.pobreza-nomon .cabecera {
  text-align:center;
  height:14%;
}

.pobreza-nomon .cabecera .title {
  width:100%;
  height:40%;
}

.pobreza-nomon .cabecera .title span {
  font-size: 18px;
  font-weight: 600;
  color: #834300 !important;
}

.pobreza-nomon .leyenda {
  width:100%;
  height:60%;
}


.pobreza-nomon .chart {
  width:100%;
  border-radius: 10px 10px 10px 10px;
  height:78%;
  /*background-color:#f8f0e7 !important;*/
}

.pobreza-nomon .fuente {
  height:8%;
}

/deep/ .chart .label-nacional b {
  color: #ff6356 !important;
}

/deep/ .chart .label-departamento b {
  color: #421e00 !important;
}

/deep/ .chart .label-provincia b {
  color: #834300 !important;
}

/deep/ .chart .label-distrito b {
  color: #bc6600 !important;
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
  background-color: #421e00 !important;
}

/deep/ .leyenda .item .legend-circle-provincia {
  background-color: #834300 !important;
}

/deep/ .leyenda .item .legend-circle-distrito {
  background-color: #bc6600 !important;
}



</style>
