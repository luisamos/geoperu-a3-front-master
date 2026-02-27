<template>
    <div style="width:100%;height:100%;float:left;">
      <div style="width:100%;height:100%;" :id="this.id"></div>
    </div>
</template>
<script>
import Highcharts from "highcharts";

export default {
  props: {
    title: {
      type: String,
      default: null,
      required: false
    },
    valuePrefix: {
        type: String,
        default: 'S/ ',
        required: false
    },
    series: {
      required: false,
      default: () => {
        const chartData = [
          {
            name: "Presupuesto",
            data: [
              {
                y: 55.11,
                name: "Datos de Muestra",
                color: "red"
              },
              {
                y: 25.11,
                name: "Datos de Muestra2",
                color: "green"
              }
            ],
            size: "70%",
            innerSize: "60%",
            dataLabels: {
              /*formatter: function() {
                // display only if larger than 1
                return this.y > 1
                  ? "<b>" + this.point.name + ":</b><br> S/ " + this.y
                  : null;
              },*/
            
            }
          }
        ]

        return chartData;
      }
    }
  },
  data() {
    return {
      id: null
    };
  },
  created() {
    this.id = "ele" + this._uid;
  },
  mounted() {
    this.create()
  },
  methods: {
      create () {
          Highcharts.chart({
  
            credits: false,
            chart: {
                backgroundColor: null,
                padding:0,
                margin:0,
                renderTo: document.querySelector("#" + this.id),
                type: "pie"
            },
            
                title: {
                  verticalAlign: 'middle',
                  floating: true,
                  text: this.title
                },
            
            legend: {
                align: 'right',
                verticalAlign: 'top',
                layout: 'vertical'
            },
            /*yAxis: {
                title: {
                    text: "Total percent market share"
                }
                },*/
            plotOptions: {
                pie: {
                    borderWidth: 5,
                    shadow: false,
                    center: ["50%", "50%"],
                }
            },
            tooltip: {
                valuePrefix: this.valuePrefix
            },
            series: this.series
            });
      }
  }
};
</script>