<template>
  <div>
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
        ];
      }
    },
    categories: {
      default: () => {
        return [];
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
        
        marginBottom: 60
      },
      title: null,
      subtitle: null,
      xAxis: {
        categories: that.categories,
        title: {
          text: null
        },
        lineColor: "black",
        lineWidth: 2,
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
      tooltip: true,
      plotOptions: {
        bar: {
          dataLabels: {
            style: {
              fontSize: "16px"
            },
            enabled: true,
            align: "center",
            y: 0,
            color: "black",
            borderColor: "white",
            x: 100,
            inside: true,
            formatter: function() {
              return that.formatNumber(this.point.y) + ' ( '+this.point.py+'% )';
            }
          }
        },

        series: {
          pointPadding: 0,
          groupPadding: 0.04,
          borderWidth: 0,
          shadow: false
        }
      },
      legend: {
        overflow: false,
        align: 'center',
        verticalAlign: 'bottom',
        x: 0,
        y: 0,
        itemStyle: {
            fontSize: '14px'
        },
        floating: false,
        //borderWidth: 1,
        backgroundColor:null,
        //shadow: true
      },
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
