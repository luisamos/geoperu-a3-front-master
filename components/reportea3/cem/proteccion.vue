<template>
  <div :class="$options.cssName">
      <div class="proteccion__title">
         Medida de Protección
      </div>
    
        <NormalVerticalBarchart class="proteccion__chart" :series="this.series" :categories="this.categories" />
  </div>
</template>

<script>
import NormalVerticalBarchart from "~/components/Dumb/NormalVerticalBarchart";

export default {
  name: "Proteccion",
  cssName: "proteccion",
  data() {
    return {
      series: [
      {
        name: "Medidas de Protección",
        data:[]
      }],
      categories: []
    };
  },
  created() {

    let data = []

    this.$store.getters["reportecem/results"].med_prot.map(obj => {
        this.categories.push(obj.med_prot_nombre)
        this.series[0].data.push( { y: parseInt(obj.med_prot_cant), color: 'rgb(237,168,169)' } )
    });
    
  },
  components: {
    NormalVerticalBarchart
  }
};
</script>

<style scoped>
.proteccion {
    width: 100%;
    height: 100%;
}

.proteccion__title {
    width: 100%;
    height: 10%;
    text-align: center;
    font-weight: 500;
    line-height: 1.1;
    color: inherit;
    font-size: 24px;
}

.proteccion__chart {
    width: 100%;
    height: 90% !important;
}
</style>