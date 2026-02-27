<template>
  <div>
    <span :class="['circle', this.getColor(this.valor).class]" v-text="valor+'%'"></span>
  </div>
</template>
<script>
export default {
  props: {
    valor: {
      default: 0.0
    },
    legendClass: {
      default: 0
    },
  },
  data () {
    return {
      validation: '',
      legendClasses: [
        { red: 9.99, yellow: 19.99, green: 100 },// 0 by Index order
        { red: 19.99, yellow: 39.99, green: 100 }, // 1
        { red: 29.99, yellow: 59.99, green: 100 }, // 2
        { red: 49.99, yellow: 79.99, green: 100 } // 3
      ]
    }
  },
  methods: {
    getColor(val) {
      if (!this.legendClass){
        return { color: "#88e8ee", class: "legend-null" }; 
      }
      if (val <= this.legendClasses[this.legendClass].red) {
        return { color: "#FF6666", class: "legend-1" };
      } else if (val <=  this.legendClasses[this.legendClass].yellow) {
        return { color: "#F4E67A", class: "legend-2" };
      } else if (val <=  this.legendClasses[this.legendClass].green) {
        return { color: "#98BF61", class: "legend-3" };
      }
    }
  }
};
</script>
<style scoped>
.circle {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 74px; /*change this and the width
  for the size of your initial circle*/
  width: 74px;
  text-align: center;
  vertical-align: middle;
  border-radius: 50%;
  
  font-size: 18px;
  font-weight: 700;
}

.legend-1 {
  background: #FF6666 !important;
}
.legend-2 {
  background: #F4E67A !important;
}
.legend-3 {
  background: #98BF61 !important;
}
.legend-null {
  background: #88e8ee !important;
}

</style>