<template>
  <div :id="this.id" :class="$options.cssName"></div>
  
</template>
<script>
import Highcharts from "highcharts";
import highchartsMore from "highcharts/highcharts-more";
import HighchartsFunnel from 'highcharts/modules/funnel';
if (typeof Highcharts === "object") {
  highchartsMore(Highcharts);
  HighchartsFunnel(Highcharts);
}
export default {
  name: "Pyramid",
  cssName: "pyramid",
  props: {
    series: {
        require: true,
        type: Array
    }
  },
  data() {
    return {
      id: ""
    };
  },
  created() {
    this.id = "ele" + this._uid;
  },
  mounted() {
    this.create();
  },
  methods: {
    create() {
      Highcharts.chart({
        credits: false,
        chart: {
            
          backgroundColor: false,
          padding: 0,
          margin: 0,
          renderTo: document.querySelector("#" + this.id),
           type: 'pyramid',
        },
        title: false,
        legend: false,
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b> ({point.y:,.0f})',
                    softConnector: true
                },
                center: ['40%', '50%'],
                width: '80%'
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
.pyramid {
  width: 100%;
  height: 100%;
}
</style>

