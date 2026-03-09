<template>
<div :class="componentName">
    <div class="trabaja__title">
        Agresor - ¿Trabaja?
    </div>
    <div class="trabaja__chart">
        <table class="horizontal-stack-bar">
            <tr class="stack_bar__block">
            <td class="horizontal-stack-bar__square horizontal-stack-bar__square--red">NO</td>
            <td class="horizontal-stack-bar__square horizontal-stack-bar__square--green">SI</td>
            </tr>
            <tr>
            <td class="horizontal-stack-bar__text" v-text="this.$store.getters['reportecem/results'].agr_trab[0].no"></td>
            <td class="horizontal-stack-bar__text" v-text="this.$store.getters['reportecem/results'].agr_trab[0].si"></td>
            </tr>
        </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Trabaja",
  cssName: "trabaja",
};
</script>

<style scoped>

.trabaja  {
    width: 100%;
    height: 100%;
}

.trabaja__title  {
    width: 100%;
    height: 25%;
    
    text-align: center;
    font-weight: 500;
    line-height: 1.1;
    color: inherit;
    font-size: 24px;
}

.trabaja__chart  {
    width: 100%;
    height: 75%;
}

.horizontal-stack-bar {
  margin: auto;
}

.stack_bar__block {
  width: 80%;
  
  text-align: center;
}

.horizontal-stack-bar__square {
  text-align: center;
  width: calc(100% / 2);
  color: white;
  padding: 18px;
  font-weight: 700;
  min-width: 100px;
  border: 1px solid white;
}

.horizontal-stack-bar__text {
  text-align: center;
  font-weight: 700;
  font-size: 22px;
  min-height: 100%;
}

.stack_bar__block:hover {
  background-color: rgb(160, 46, 46);
}

.horizontal-stack-bar__square--red {
  background-color: rgb(221, 43, 43);
}

.horizontal-stack-bar__square--green {
  background-color: rgb(23, 90, 27);
}
</style>