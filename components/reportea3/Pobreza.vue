<template>
  <div class="main-container" @dblclick="zoomo"
  >
    <div style="text-align:center;height:14%;">
      <div style="width:100%;height:40%;">
        <span class="title">Pobreza</span>
        <br>
      </div>
      <Leyenda order="desc" style="width:100%;height:60%;" />
    </div>
    <CircularChartPorcent
      v-if="this.$store.getters['reporte/results'].pobreza.filter((obj)=>obj.cat ==='Distrito')[0] != undefined"
      ctitle="Incidencia (%)"
      class="sub-container"      
      :colors = colors
      :distrito="getData(this.$store.getters['reporte/results'].pobreza.filter((obj)=>obj.cat ==='Distrito'), 'prom_itv')"
      :provincia="getData(this.$store.getters['reporte/results'].pobreza.filter((obj)=>obj.cat ==='Provincia'), 'prom_itv')"
      :departamento="getData(this.$store.getters['reporte/results'].pobreza.filter((obj)=>obj.cat ==='Departamento'), 'prom_itv')"
      :nacional="'21.7'"

      :ndistrito="getData(this.$store.getters['reporte/results'].pobreza.filter((obj)=>obj.cat ==='Distrito'), 'prom_itv')"
      :nprovincia="getData(this.$store.getters['reporte/results'].pobreza.filter((obj)=>obj.cat ==='Provincia'), 'prom_itv')"
      :ndepartamento="getData(this.$store.getters['reporte/results'].pobreza.filter((obj)=>obj.cat ==='Departamento'), 'prom_itv')"
      :nnacional="'21.7'"
    />

    <div v-else class="sub-container" style="padding:5%;text-align:justify;font-size:15px;font-weight:500">
      Distrito que no presenta datos del <b>Mapa de Pobreza 2013</b>, debido a su creación posterior a la elaboración de dicho estudio. El distrito se creó mediante <b>LEY N° <span v-text="this.nDist.filter((obj)=>{ return this.$store.getters['reporte/codigo'] === obj.ubigeo})[0].ley"></span></b> de fecha <b v-text="this.nDist.filter((obj)=>{ return this.$store.getters['reporte/codigo'] === obj.ubigeo})[0].fecha">07/11/2015</b>
    </div>

    <div style="height:28%">
      <div
        class="fuente"
      >Fuente: INEI - Mapa de pobreza departamental 2009, provincial y distrital 2013, ENAHO 2017</div>
    </div>
  </div>
</template>

<script>
import CircularChartPorcent from "~/components/reportea3/CircularChartPorcent.vue";
import Leyenda from "~/components/reportea3/Leyenda.vue";
import numberFormat from '~/mixins/numberFormat.js'
import dist from "~/static/distritosNuevos.js"

export default {
  mixins: [numberFormat],
  data: () => {
    return {
      nDist: dist,
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
    CircularChartPorcent,
    Leyenda
  },
  methods: {
    getData(array, iname) {
        if (array.length > 0) {
            if ( typeof array[0][iname] != 'undefined') {
            return parseFloat(array[0][iname]).toFixed(1);
            }
        }

      return "0.0";

    }
  }
};
</script>

<style scoped>
.title {
  font-size: 1.2em;
  font-weight: 600;
  color: #834300 !important;
}


.main-container {
  height:100%;
  text-align:left;
  background-color: #fdfaf7 !important;
  border-radius:10px 10px 10px 10px
}

.sub-container {
  width:100%;
  border-radius: 10px 10px 10px 10px;
  height:78%;
  background-color:#f8f0e7 !important;
}



/deep/ .sub-container .label-nacional b {
  color: #ff6356 !important;
}

/deep/ .sub-container .label-departamento b {
  color: #421e00 !important;
}

/deep/ .sub-container .label-provincia b {
  color: #834300 !important;
}

/deep/ .sub-container .label-distrito b {
  color: #bc6600 !important;
}





/* Leyenda */
/deep/ .legend {
  font-size: 7px;
}
/deep/ .legend .legend-circle {
  width: 7px;
  height: 7px;
}

/deep/ .legend .legend-circle-nacional {
  background-color: #ff6356 !important;
}

/deep/ .legend .legend-circle-departamento {
  background-color: #421e00 !important;
}

/deep/ .legend .legend-circle-provincia {
  background-color: #834300 !important;
}

/deep/ .legend .legend-circle-distrito {
  background-color: #bc6600 !important;
}



</style>
