<template>
  <div :class="$options.cssName">
      <div class="proteccion__title">
            Situación del Agresor      
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
        name: "Situación del agresor",
        data:[]
      }],
      categories: []
    };
  },
  created() {

    let data = []

    this.$store.getters["reportecem/results"].agr_sit.map(obj => {
        this.categories.push(obj.agr_sit_nombre)
        this.series[0].data.push( { y: parseInt(obj.agr_sit_cant), color: "rgb(127,127,127)" } )
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
    height: 90%;

}
</style>