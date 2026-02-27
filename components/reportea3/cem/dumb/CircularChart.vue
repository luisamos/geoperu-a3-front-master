<template>
  <div style="width:100%;height:100%;float:left;">
    <div style="width:100%;height:100%;float:left;" :id="this.id" v-show="this.series.length>0"></div>
    <div style="padding-top:50px;font-size:15px;text-align:center;color:gray;" v-if="this.series.length===0" >No se han registrado casos</div>
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
      var hcLabelRender = function () {
        var s = this.name;
        var r = "";
        var lastAppended = 0;
        var lastSpace = -1;
        for (var i = 0; i < s.length; i++) {
          if (s.charAt(i) == " ") lastSpace = i;
          if (i - lastAppended > 20) {
            if (lastSpace == -1) lastSpace = i;
            r += s.substring(lastAppended, lastSpace);
            lastAppended = lastSpace;
            lastSpace = -1;
            r += "<br>";
          }
        }
        r += s.substring(lastAppended, s.length);
        return r;
      }

      Highcharts.chart({
        credits: false,
        chart: {
          backgroundColor: null,
          padding: 0,
          marginTop: 0,
          marginBottom: 58,
          renderTo: document.querySelector("#" + this.id),
          type: "pie"
        },

        title: {
          verticalAlign: "middle",
          floating: true,
          text: this.title
        },

        legend: {
          reversed: true,
          itemStyle: {
            fontSize: '10px'
          },
          align: "center",
          verticalAlign: "bottom",
          
          x: 0,
          y: 0
        },

        plotOptions: {
          pie: {
            cursor: false,
            borderWidth: 0,
            shadow: false,
            stickyTracking: false,
            //center: ["50%", "50%"],
            dataLabels: {
              enabled: false
            },
            showInLegend: true
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