<template>
<div>
  <figure class="highcharts-figure">
    <div id="chart"></div>
  </figure> 
  </div> 
</template>

<style scoped>
.highcharts-figure {
    width: 100%;
    height: 100%;
}
#chart {
    width: 100%;
    height: 100%;
}
</style>

<script>
import Highcharts from "highcharts";
export default {
  props: {
    data: {
      type: Object,
      default: ()=> Object()
    },
    descripcion: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      id: null,
      chart: undefined
    };
  },
  created() {
    this.id = "ele" + this._uid;
  },
  methods: {
    refresh() {
        console.log('refresh')
      this.chart.destroy();
      this.createChart();
    },
    createChart() {
        console.log(this.id)
      this.chart = new Highcharts.chart('chart', {
          
          credits:false,
        chart: {
          type: "spline",
          style: {
                    fontFamily: 'Roboto',
                    fontSize: 12
                }
        },
        title: false,
        // subtitle: {
        //     text: 'Source: WorldClimate.com'
        // },
        xAxis: {
          categories: this.categories,
          labels: {
            style: {
              fontSize: '12px'
            }
          }
        },
        yAxis: {
          title: ""
        },
        legend: false,
        //  tooltip: {

        //         formatter: function() {

        //             let pim = des.detalle.series[0].data[this.point.index].toFixed(2);;
        //             let dev = des.detalle.series[1].data[this.point.index].toFixed(2);;
        //             let colorP = des.detalle.series[0].color;
        //             let colorD = des.detalle.series[1].color;
        //             return '<table cellpadding="0" cellspacing="0" style="text-align: left;"><tr><td style="color:' + colorP + '"><b>PIM:</b></td><td>' + numComas(pim) + '</td><tr><td style="color:' + colorD + '"><b>DEVENGADO:</b></td><td>' + numComas(dev) + '</td><tr><td><b>AVANCE:</b></td><td>' + avance(pim, dev) + '%'

        //         },
        //         useHTML: true

        //     },
        //     plotOptions: {
        //         series: {
        //             dataLabels: {
        //                 enabled: true,
        //                 inside: true
        //             }
        //         },
        //         column: {
        //             //pointPadding: 0.2,
        //             borderWidth: 0
        //         }
        //     },
        tooltip: {
          crosshairs: true,
          shared: true
        },
        plotOptions: {
          spline: {
            marker: {
              radius: 4,
              lineColor: "#666666",
              lineWidth: 1
            }
          }
        },
        series: this.series
      });
    }
  },
  mounted() {
    this.createChart();
  },
  computed: {
      categories() {
           return this.data.categories
      },
      series(){
        return this.data.series
      }
  }
};
</script>