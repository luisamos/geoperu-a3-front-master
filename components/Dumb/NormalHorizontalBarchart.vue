<template>
  <div style="width:100%;height:100%;">
    <div style="width:100%;height:100%;" :id="id"></div>
  </div>
</template>

<script>
import Highcharts from "highcharts";
import numberFormat from "~/mixins/numberFormat.js";

export default {
  mixins: [numberFormat],
  props: {
    ctitle: {
      type: String,
      default: ""
    },
    series: {
      default: () => {
        return [
          {
            name: "Presupuesto",
            data: [
             123123123,123123123,123123123,123123123,123123123,123123123,123123123,123123123,123123123
            ],
            color: "#8CB3D1"
          }
        ];
      }
    },
    categories: {
      default: () => {
        return ["Planeamiento", "Sanemaiento","Ambiente","Salud","Agropecario", "Cultura y deporte","Educacion", "Transporte","Otros", "Turismo"];
      }
    }
  },
  data() {
    return {
      id: null,
      validation: null
    };
  },
   created() {
    this.id = "ele" + this._uid;
   },
  mounted() {
    var that = this;
    Highcharts.chart({
      chart: {
        renderTo: document.querySelector("#" + this.id),
        type: "bar",
        backgroundColor: null,
        marginTop: 0,
        marginBottom: 0
      },
      title: null,
      subtitle: null,
      xAxis: {
        categories: that.categories,
        title: {
          text: null
        },
        lineColor: "black",
        lineWidth: 7,
        labels: {
          style: {
            fontWeight: "500",
            color: "black"
          }
        }
      },
      yAxis: [
        {
          visible: false
        }
      ],
      tooltip: false,
      plotOptions: {
        bar: {
          dataLabels: {
            style: {
              fontSize: "14px"
            },
            enabled: true,
            align: "left",
            y: 0,
            color: "black",
            borderColor: "white",
            x: 0,
            inside: true,
            formatter: function() {
              return that.formatNumber(this.point.y, 2);
            }
          }
        },

        series: {
          pointPadding: 0,
          groupPadding: 0.08,
          borderWidth: 0,
          shadow: false
        }
      },
      /*legend: {
          overflow: true,
        layout: "vertical",
        align: "right",
        verticalAlign: "bottom",
        x: 10,
        y: 20,
        floating: true,
        //borderWidth: 1,
        backgroundColor:null,
        //shadow: true
      },*/
      legend: false,
      credits: {
        enabled: false
      },
      series: that.series
    });
  }
};
</script>

<style scoped>
.highcharts-data-label {
  transform: translate(0, 0) !important;
}

.legend-1 {
  color: #000 !important;
  background: #ff6666 !important;
}

.legend-2 {
  color: #000 !important;
  background: #f4e67a !important;
}

.legend-3 {
  color: #000 !important;
  background: #98bf61 !important;
}
</style>
