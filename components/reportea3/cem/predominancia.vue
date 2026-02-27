<template>
  <div class="predominancia">
    <div class="predominancia__title">Predomina Violencia</div>
    <NormalVerticalBarChartWLegend :series="series" :categories="categories"  class="predominancia__chart" />
  </div>
</template>

<script>
import NormalVerticalBarChartWLegend from "~/components/Dumb/NormalVerticalBarChartWLegend";

export default {
  data() {
    return {
      series: [
        {
          name: "Tentativa Feminicidio (SI)",
          data: [{ y: this.$store.getters['reportecem/results'].predominancia.caso_te_si, py: this.$store.getters['reportecem/results'].predominancia.p_caso_te_si }],
          color: "#db3537"
        },
        {
          name: "Tentativa Feminicidio (NO)",
          data: [{ y: this.$store.getters['reportecem/results'].predominancia.caso_te_no, py: this.$store.getters['reportecem/results'].predominancia.p_caso_te_no }],
          color: "#b5a5a5"
        }
      ],
      categories: ['']
    };
  },
  components: {
    NormalVerticalBarChartWLegend
  },
  created() {
  }
};
</script>

<style scoped>
.predominancia {
  width: 100%;
  height: 100%;
}

.predominancia__title {
  width: 100%;
  height: 20%;
  text-align: center;
    font-weight: 500;
    line-height: 1.1;
    color: inherit;
    font-size: 24px;
}

.predominancia__chart {
  margin: auto;
  width: 80%;
  height: 80%;
}
</style>