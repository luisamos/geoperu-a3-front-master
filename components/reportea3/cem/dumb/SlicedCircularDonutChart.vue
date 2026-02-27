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
      default: "",
      required: false
    },
    series: {
      required: false,
      default: () => {
        const chartData = [];
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
    this.create();
  },
  methods: {
    create() {
      Highcharts.chart({
        credits: false,
        chart: {
          backgroundColor: null,
          padding: 0,
          marginTop: 0,
          marginBottom: 20,
          renderTo: document.querySelector("#" + this.id),
          type: "pie"
        },

        title: {
          verticalAlign: "middle",
          floating: true,
          text: this.title,
          y: 60
        },

        legend: {
          itemStyle: {
            fontSize: "14px"
          },
          padding: 0,
          margin: 0,
          align: "center",
          verticalAlign: "bottom",
          x: 0,
          y: 0
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
            showInLegend: true,
            dataLabels: {
              connectorColor: "grey",
              color: "black",
              borderColor: "black",
              connectorWidth: 1,
              zIndex: 12,
              style: {
                fontSize: "14px",
                fontWeigth: "700"
              },
              distance: 5,
              formatter: function() {
                return `<span style="">${this.point.y} ( ${this.point.py} % )</span>`;
              }
            }
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
