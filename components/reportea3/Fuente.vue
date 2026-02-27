<template>
  <div :class="$options.name">
    <span v-html="label"></span>
  </div>
</template>
<script>
export default {
  name: "fuente",
  props: {
    label: {
      required: true,
      default: "Especifique Fuente",
      type: String
    }
  }
};
</script>
<style scoped>
.fuente {
  display: table;
  width: 100%;
  font-size: 9px !important;
  padding-left: 10px;
  font-weight: 600;
  padding-top: 2px;
  line-height: 8px !important;
  /*vertical-align: middle;*/
}

.fuente span {
  display: table-cell;
  vertical-align: middle;
  /*padding-left: 20px;*/
}
</style>