<template>
  <div class="vfisica">
      <div class="vfisica__title">
          Tipo de Violencia Psicológica Predominante
      </div>
      <CircularChart class="vfisica__chart" :series="series" />
  </div>
</template>
<script>
import CircularChart from "~/components/reportea3/cem/dumb/CircularChart";
export default {
  data() {
    return {
      series: [],
      titles: {
            "gritos_ins": 'Gritos e insultos',
            "violencia": 'Violencia racial o insulto étnico-racial',
            "indiferenc": 'Indiferencia',
            "discr_orie": 'Discriminación por orientación sexual',
            "discr_gene": 'Discriminación por género',
            "discr_iden": 'Discriminación por identidad de género',
            "rechazo": 'Rechazo',
            "desvaloriz": 'Desvalorización y humillación',
            "amenaza_qu": 'Amenaza de quitar a los hijos/as',
            "otras_amen": 'Otras amenazas diversas',
            "prohibe_re": 'Impide / prohíbe recibir visitas',
            "prohibe_es": 'Impide / prohíbe estudiar, trabajar o salir',
            "rompe_dest": 'Rompe o destruye cosas en la casa',
            "vigilancia": 'Vigilancia continua / persecución',
            "botar_casa": 'Botar de la casa',
            "amenaza_de": 'Amenazas de daño o muerte de la víctima',
            "abandono": 'Abandono',
            "otra_vpsi": 'Otro tipo de violencia psicológica'
      }
    };
  },
  created () {
    var sortable = [];
    for (let val in this.$store.getters['reportecem/results'].vpsicologica) {
        sortable.push([val, this.$store.getters['reportecem/results'].vpsicologica[val]]);
    }

    sortable.sort(function(a, b) {
        return a[1] - b[1];
    });
  
    let len = sortable.length
    let otros = 0
    let innerSize = 60
    let size = 12
    let opacity = 0.3
    for (let i=0;i<len;i++) {
    if(sortable[i][1]!==0) {
      if ( i>= len-4 ){
        innerSize=innerSize+9 - opacity * 3
        size=size+18
        opacity=opacity+0.2
        this.series.push({
          type: 'pie',
          name: "Casos",
          data: [{ name: this.titles[sortable[i][0]], y: sortable[i][1], color:`rgb(237,168,169,${opacity})`}],
          size: size+"%",
          innerSize: innerSize+"%",
          states: { hover: {
          brightness: 0,
          borderColor: 'black',
          halo: false,
        },},
          dataLabels: {
            formatter: function() {
              return this.y > 5 ? this.point.name : null;
            },
            color: "#ffffff",
            distance: -30
          }
        })
      } else {
           otros +=sortable[i][1]
      }
    }
    }

    /*this.series.push({
          name: "Casos",
         data: [{ name: 'Otros', y: otros, color:'#d4d4d4'}],
          size: "20%",
          innerSize: "70%",
           states: {
        hover: {
          brightness: 0,
          borderColor: 'black',
          halo: false,
        },},
          dataLabels: {
            formatter: function() {
              return this.y > 5 ? this.point.name : null;
            },
            color: "#ffffff",
            distance: -30
          }
        })*/

  },
  components: {
    CircularChart
  }
};
</script>

<style scoped>
.vfisica {
    width: 100%;
    height: 100%;
}

.vfisica__title {
    width: 100%;
    height: 10%;

     
     padding-top: 8px;
    text-align: center;
    font-weight: 500;
    line-height: 1.1;
    color: inherit;
    font-size: 16px;
}

.vfisica__chart {
    width: 100%;
    height: 90% !important;
}
</style>