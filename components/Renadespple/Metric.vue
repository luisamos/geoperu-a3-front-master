<template>
<div class="metric">
  <span class="metric__name" v-text="data.title">
      
  </span>
  <span class="metric__data" v-text="data.serie">

  </span>
</div>
</template>
<style scoped>
.metric {
    display: flex;
    flex-direction: column;
}
.metric__name {
    font-family: Roboto;
    font-size: 16px;
    color: #8d8d8d;
}

.metric__data {
    font-family: Roboto;
    font-size: 32px;
    font-weight: 500;
}
</style>
<script>
export default {
  props: {
    data: {
      default: ""
    }
  },
  data() {
    return {
      
    };
  }
};
</script>