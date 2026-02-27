<template>
  <div :id="this.id" :class="$options.cssName"></div>
</template>
<script>
import Highcharts from "highcharts";

export default {
  name: "QuatityCircle",
  cssName: "quantity-circle",
  props: {
    circleText: {
      required: true,
      type: String
    },
    circleColor: {
      required: true,
      type: String
    },
    circleWidth: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      id: "",
      series: []
    };
  },
  created() {
    this.id = "ele" + this._uid;

    this.series = [
        {
          data: [
            {
              y: 100,
              name: false,
              color: this.circleColor,
            }
          ],
          size: "100%",
          innerSize: this.circleWidth
        }
      ]
  },
  mounted() {
    this.create();
  },
  methods: {
    create() {
      Highcharts.chart({
        credits: false,
        chart: {
            
          
          padding: 0,
          margin: 0,
          renderTo: document.querySelector("#" + this.id),
          type: "pie"
        },

        title: {
                  verticalAlign: 'middle',
                  floating: true,
                  y: 60,
                  text: this.circleText
                },
        legend: false,
        plotOptions: {
          pie: {
            borderWidth: 5,
            borderColor: this.circleColor,
            shadow: false,
            center: ["50%", "50%"],
            dataLabels: {
              enabled: false
            }
          }
        },
        tooltip: false,
        series: this.series
      });
    }
  }
};
</script>
<style>
.quantity-circle {
  width: 100%;
  height: 100%;
}
</style>

