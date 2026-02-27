<template>
  <div>
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
      default: "",
      required: false
    },
    data: {
      required: false,
      default: () => {
        const chartData = Object();
        return chartData;
      }
    }
  },
    computed: {
      categories() {
           return this.data.categories
      },
      series(){
        return this.data.series
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
  mounted() {
      this.create()
  },
  methods: {
    refresh() {
      console.log("refresh");
      this.chart.destroy();
      this.create();
    },
    create() {
     this.chart = Highcharts.chart({
        credits: false,
        chart: {
          backgroundColor: null,
          padding: 0,
          margin: 0,
          marginTop: 0,
          marginRight: 100,
          renderTo: this.$el,
          type: "pie"
        },

        title: {
          verticalAlign: "top",
          align:"center",
          text: this.data.title,
          style: {
            fontFamily: "Roboto",
            fontSize: "16px",
            color: "#8d8d8d"
          }
        },
        legend: {
          itemStyle: {
            fontSize: "10px",
            fontFamily: "Roboto",
            textOverflow: true,
            width: 100
          },
          floating: false,
          align: 'right',
          layout: 'vertical',
          verticalAlign: 'center',
          padding: 0,
          marginRight: 0,
          x: 0,
          y: 60,
          width: 100
        },
        /*yAxis: {
                title: {
                    text: "Total percent market share"
                }
                },*/
        plotOptions: {
            series: {
                states: {
                    hover: {
                        halo: {
                            size: 3
                        }
                    }
                }
            },
          pie: {
            borderWidth: 0,
            shadow: false,
            center: ["50%", "50%"],
                        showInLegend: true,
            dataLabels: {
                style: {
                    fontSize: 8,
                    lineHeight: '8px',
                    
                },
                connectorPadding: 0,
                distance: 8,
                padding: 2,
                margin: 0,
                formatter: function() {
                    if(this.point.y > 0){
                        return `<span>${this.point.y}%</span>`;
                    } else {
                        return;
                    }
                
                }
            },
            size: "70%",
            innerSize: "40%",
          }
        },
        tooltip: false,
        series: [{
            data: this.series
        }]
      });
    }
  }
};
</script>
