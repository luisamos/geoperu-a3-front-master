<template>
  <div class="vfisica">
    <div class="vfisica__title">Tipo de Violencia Física Predominante</div>
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
        puntapies: "Puntapiés o patadas",
        v100: "Puñetazos",
        bofetadas: "Bofetadas",
        jalones_ca: "Jalones de cabello",
        otras_agre: "Otras agresiones",
        empujones: "Empujones, tirar al suelo",
        golpes_con: "Golpes con palos",
        latigazo: "Latigazo, correazo, pegar con sogas",
        ahorcamien: "Ahorcamiento o intento de asfixia",
        heridas_co: "Heridas con arma punzo cortante o arma de fuego",
        golpes_c_a: "Golpes con otros objetos contundentes",
        negligenci: "Negligencia",
        otra_vfis: "Otro tipo de violencia física"
      }
    };
  },
  created() {
    var sortable = [];
    for (let val in this.$store.getters["reportecem/results"].vfisica) {
      sortable.push([
        val,
        this.$store.getters["reportecem/results"].vfisica[val]
      ]);
    }

    sortable.sort(function(a, b) {
      return a[1] - b[1];
    });
    let len = sortable.length;
    let otros = 0;
    let innerSize = 60;
    let size = 12;
    let opacity = 0.3;
    for (let i = 0; i < len; i++) {
      if(sortable[i][1]!==0) {
        if (i >= len - 4) {
          innerSize = innerSize + 9 - opacity * 3;
          size = size + 18;
          opacity = opacity + 0.2;
          this.series.push({
            type: "pie",
            name: "Casos",
            data: [
              {
                name: this.titles[sortable[i][0]],
                y: sortable[i][1],
                color: `rgb(193, 53, 82,${opacity})`
              }
            ],
            size: size + "%",
            innerSize: innerSize + "%",
            states: {
              hover: {
                brightness: 0,
                borderColor: "black",
                halo: false
              }
            }
          });
        } else {
          otros += sortable[i][1];
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