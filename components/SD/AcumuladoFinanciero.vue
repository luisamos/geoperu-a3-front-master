<template>
  <div style="width:100%;height:100%;">
    <div id="chart"></div>
  </div>
</template>

<script>
import Highcharts from "highcharts";

export default {
  props: {
    data: {
      type: Array
    }
  },
  data() {
    return {
      id: null,
      validation: null,
      chart: undefined
    };
  },
  computed: {
    series(){ 
      return [{
              data: [{ x: 0, y: this.data[0].mto_via }],
              name: "Costo viable",
              color: "#305893"
            },
            {
              name: "Costo total",
              data: [{ x: 1, y: this.data[0].cos_act }],
              color: "#3dac96"
            },
            {
              name: "Devengado acumulado",
              data: [{ x: 2, y: this.data[0].dev_acu }],
              color: "#6699cc"
            }];
    }
  },
  methods: {
    refresh() {
      this.chart.destroy();
      this.createChart();
    },
    createChart() {
      this.chart = new Highcharts.chart("chart", {
        credits: false,
        chart: {
          type: "bar"
        },
        title: {
          text: "Resumen Acumulado Financiero"
        },
        yAxis: {
          title: ''
        },
        xAxis: {
          categories: ["", "", ""],
          show: false
        },
        plotOptions: {
          column: {
            stacking: "normal",
            dataLabels: {
                allowOverlap: true,
                style: {
                  fontSize: "10px"
                },
                enabled: true,
                //align: null,
                //enabled: true,
                  //crop: false,
                  //overflow: 'none',
                color: "black",
                borderColor: "white",
                //inside: false,
                y: -5,
                //verticalAlign: 'top',
                formatter: function() {
                  if (this.point.y !== null){   
                    return parseFloat(this.point.y).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
                  } else {
                    return 0
                  }
                  
                }
              }  
          },
          series: {
              pointPadding: 0,
              groupPadding: 0,
              borderWidth: 0,
              shadow: false,
              dataLabels: {
                allowOverlap: true,
                style: {
                  fontSize: "12px"
                },
                enabled: true,
                //align: null,
                //enabled: true,
                  //crop: false,
                  //overflow: 'none',
                color: "black",
                borderColor: "white",
                //inside: false,
                y: 0,
                //verticalAlign: 'top',
                formatter: function() {
                  if (this.point.y !== null){   
                    return parseFloat(this.point.y).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
                  } else {
                    return 0
                  }
                  
                }
              }  
          },
          
        },
        legend: {
          symbolHeight: 11,
          symbolWidth: 11,
          symbolRadius: 0,
          verticalAlign: 'top'
        },
        series: this.series
      });
    }
  },
  mounted() {
    this.createChart();
  },
  
};
</script>

<style scoped>
</style>

