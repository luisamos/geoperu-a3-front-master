<template>
  <div>
    <div style="width:100%;height:100%;text-align:center;">
     
      <div
        style="margin-right: 14px;height:100%;float:left;display: flex;align-items: center;justify-content:center;"
      >
        <span style="font-size:14px;margin-right:10px;" v-text="rules[tipo].redmin + ' - ' + rules[tipo].redmax"></span>
        <div class="rectangle-legend-1" style="float:left;"></div>
      </div>
      <div
        style="margin-right: 14px;height:100%;float:left;display: flex;align-items: center;justify-content:center;"
      >
        <span style="font-size:14px;margin-right:10px;"  v-text="rules[tipo].yellowmin + ' - ' + rules[tipo].yellowmax"></span>
        <div class="rectangle-legend-2" style="float:left;"></div>
      </div>
      <div
        style="height:100%;float:left;display: flex;align-items: center;justify-content:center;"
      >
        <span style="font-size:14px;margin-right:10px;" v-text="rules[tipo].greenmin + ' - ' + rules[tipo].greenmax"></span>
        <div class="rectangle-legend-3" style="float:left;"></div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.rectangle-presupuesto {
  width: 16px;
  min-height: 16px;
  background: #6699cc !important;
}

.rectangle-presupuesto-total {
  width: 16px;
  min-height: 16px;
  background: #3dac96 !important;
}

.rectangle-legend-1 {
  width: 16px;
  min-height: 16px;
  background: #ff6666 !important;
}

.rectangle-legend-2 {
  width: 16px;
  min-height: 16px;
  background: #f4e67a !important;
}

.rectangle-legend-3 {
  width: 16px;
  min-height: 16px;
  background: #98bf61 !important;
}
</style>
<script>
export default {
  props: {
    tipo: {
      default: 2,
      type: Number
    }
  },
  data(){
    return {
      
    rules: [
      {
        redmin: 0,
        redmax: 9.99,
        yellowmin: 10,
        yellowmax: 19.99,
        greenmin: 20,
        greenmax: 100
      },
      {
        redmin: 0,
        redmax: 19.99,
        yellowmin: 20,
        yellowmax: 39.99,
        greenmin: 40,
        greenmax: 100
      },
      {
        redmin: 0,
        redmax: 29.99,
        yellowmin: 30,
        yellowmax: 59.99,
        greenmin: 60,
        greenmax: 100
      },
      {
        redmin: 0,
        redmax: 49.99,
        yellowmin: 50,
        yellowmax: 79.99,
        greenmin: 80,
        greenmax: 100
      }
    ]
    }
  }
};
</script>