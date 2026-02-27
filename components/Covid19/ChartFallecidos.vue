<template>
  <figure class="highcharts-figure">
    <div id="chart-fall"></div>
    <div v-if="data.fuente" class="highcharts-description">
      <strong>Fuente: </strong>
      <span v-text="data.fuente"></span>
    </div>
  </figure>  
</template>

<style scoped>

.highcharts-description {
  font-style: italic;
}


.highcharts-figure,
.highcharts-data-table table {
  min-width: 360px;
  max-width: 1200px;
  margin: 1em auto;
}

.highcharts-data-table table {
  font-family: Verdana, sans-serif;
  border-collapse: collapse;
  border: 1px solid #ebebeb;
  margin: 10px auto;
  text-align: center;
  width: 100%;
  max-width: 500px;
}
.highcharts-data-table caption {
  padding: 1em 0;
  font-size: 1.4em;
  color: #555;
}
.highcharts-data-table th {
  font-weight: 600;
  padding: 0.5em;
}
.highcharts-data-table td,
.highcharts-data-table th,
.highcharts-data-table caption {
  padding: 0.5em;
}
.highcharts-data-table thead tr,
.highcharts-data-table tr:nth-child(even) {
  background: #f8f8f8;
}
.highcharts-data-table tr:hover {
  background: #f1f7ff;
}
</style>

<script>
import Highcharts from "highcharts";
export default {
  props: {
    data: {
      type: Object
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
      this.chart = new Highcharts.chart('chart-fall', {
          
          credits:false,
        chart: {
          type: "spline",
          style: {
                    fontFamily: 'calibri'
                }
        },
        title: {
          text: this.data.title,
           style: {
                    fontSize: '24px',
                    fontWeight: 'bold'
                }
        },
        // subtitle: {
        //     text: 'Source: WorldClimate.com'
        // },
        xAxis: {
          categories: this.categories,
          labels: {
            style: {
              fontSize: '14px'
            }
          }
        },
        yAxis: {
          title: false,
          labels: false
        },
        legend: {
          symbolHeight: 11,
          symbolWidth: 11,
          verticalAlign: "top",
          itemStyle: {
                    fontSize: '18px'
                },
          symbolRadius: 0
        },
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