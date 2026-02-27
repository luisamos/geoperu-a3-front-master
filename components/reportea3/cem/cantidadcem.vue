<template>
  <div :class="$options.cssName">
    <div class="cantidad-cem__title">
        Casos CEM
    </div>
    <SlicedCircularDonutChart class="cantidad-cem__chart" :title="title" :series="series" valuePrefix="" />
  </div>
</template>

<script>
import SlicedCircularDonutChart from "~/components/reportea3/cem/dumb/SlicedCircularDonutChart";
export default {
    name: 'CantidadCem',
    cssName: 'cantidad-cem',
  components: {
    SlicedCircularDonutChart
  },
  data() {
    return {
        series: '',
        title: `<div style="color:rgb(90,90,90);font-size:60px;font-weight:800;height:100%;">${this.$store.getters['reportecem/results'].casos_cem[0].total}</div><br>`
    }
  },
  created() {
     
    this.series = [
          {
            name: "Casos",
            data: [
              {
                y: parseInt(this.$store.getters['reportecem/results'].casos_cem[0].v_fisica),
                py: parseFloat(this.$store.getters['reportecem/results'].casos_cem[0].p_v_fisica),
                name: "Violencia Física",
                color: "rgb(193,53,82)"
              },
              {
                y: parseInt(this.$store.getters['reportecem/results'].casos_cem[0].v_psicologica),
                py: parseFloat(this.$store.getters['reportecem/results'].casos_cem[0].p_v_psicologica),
                name: "Violencia Psicológica",
                color: "rgb(237,168,169)"
              },
              
                {
                y: parseInt(this.$store.getters['reportecem/results'].casos_cem[0].v_sexual),
                py: parseFloat(this.$store.getters['reportecem/results'].casos_cem[0].p_v_sexual),
                name: "Violencia Sexual",
                color: "rgb(127,127,127)"
              },
             
               {
                y: parseInt(this.$store.getters['reportecem/results'].casos_cem[0].v_economica),
                py: parseFloat(this.$store.getters['reportecem/results'].casos_cem[0].p_v_economica),
                name: "Violencia Económica",
                color: "rgb(169,209,142)"
              },
            ],
            
          }
        ]
  }
};
</script>

<style scoped>
    .cantidad-cem {
        width: 100%;
        height: 100%;
    }

    .cantidad-cem__title{
        width: 100%;
        height: 10%;
         padding-top: 24px;
    text-align: center;
    font-weight: 500;
    line-height: 1.1;
    color: inherit;
    font-size: 24px;

    }

    .cantidad-cem__chart{
        width: 100%;
        height: 90% !important;
    }
</style>