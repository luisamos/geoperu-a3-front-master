<template>
  <div style="width:100%;height:100%;" >
    <div style="width:100%;height:100%">
      <div style="width:75%;height:100%;float:left;">
        <div style="display:table;width:100%;height:14%;">
          <span
            style="font-size:24px;font-weight:700;display:table-cell;vertical-align:bottom;line-height:1;padding-left:30%;"
            v-text="data.ano_eje"
          ></span>
        </div>
        <div style="width:100%;height:86%;">
          <div style="width:100%;height:100%;" :id="this.id"></div>
        </div>
      </div>
      <div style="width:25%;height:100%;float:left;padding-left:1%;padding-right:1%;display:table">
        <div
          style="height:14%;width:100%;font-size:12px;display:table;width:100%;height:14%;text-align:center;"
        >
          <span
            style="font-size:15px;font-weight:700;display:table-cell;vertical-align:bottom;line-height:1;"
          >
            %
            <br>Ejecución
          </span>
        </div>

        <div style="height:28%;width:100%;display:table;">
          <div style="display:table-cell;vertical-align:middle;padding-left:15%;">
            <span
              :class="['circle-text','circle-text-big', this.getColor(parseFloat(this.data.per_tot)).class ]"
              v-text="data.per_tot"
            ></span>
          </div>
        </div>
        <div style="height:28%;width:100%;display:table;">
          <div style="display:table-cell;vertical-align:middle;padding-left:20%;">
            <span
              :class="['circle-text','circle-text-med', this.getColor(parseFloat(this.data.per_proy)).class ]"
              v-text="data.per_proy"
            ></span>
          </div>
        </div>
        <div style="height:28%;width:100%;display:table;">
          <div style="display:table-cell;vertical-align:middle;padding-left:20%;">
            <span
              :class="['circle-text','circle-text-small', this.getColor(parseFloat(this.data.per_act)).class ]"
              v-text="data.per_act"
            ></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Highcharts from "highcharts";
import numberFormat from "~/mixins/numberFormat.js";

export default {
  mixins:[numberFormat],
  props: {
    ctitle: {
      type: String,
      default: ""
    },
    legendClass: {
      type: Number,
      default: 1
    },
    legendColor: {
      type: Number,
      default: 1
    },
    data: {
      type: Object,
      default: () => {
        return {
          ano_eje: "",
          dev_act: 0,
          dev_proy: 0,
          per_act: 0,
          per_proy: 0,
          per_tot: 0,
          pim_act: 0,
          pim_proy: 0,
          total_dev: 0,
          total_pim: 0
        };
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

    if (this.legendClass === 1) {
      this.validation = { red: 24.99, yellow: 49.99, green: 100 };
    }

    if (this.legendClass === 2) {
      this.validation = { red: 49.99, yellow: 74.99, green: 100 };
    }
  },
  methods: {
    getColor(val) {
      //console.log(val);
      if (val <= this.validation.red) {
        return { color: "#FF6666", class: "legend-1" };
      } else if (val <= this.validation.yellow) {
        return { color: "#F4E67A", class: "legend-2" };
      } else if (val <= this.validation.green) {
        return { color: "#98BF61", class: "legend-3" };
      }

      // `this` points to the vm instance
      //console.log(this.validation);
      return "#fff";
    },
    highlight(className) {
      //$(".circle-text:not(."+className+")").animate({ opacity: 0.2 }, 200);
     $(".circle-text:not(."+className+")").css("opacity", "0.2");
    },
    downlight() {
      $(".circle-text").css("opacity", "1");
    }
  },
  mounted() {
    var that = this;

    Highcharts.chart({
      
      chart: {
        renderTo: document.querySelector("#" + this.id),
        type: "bar",
        backgroundColor: null,
        marginTop: 0,
        marginBottom: 0,
       
        /*margin:0,
        padding:0,
        height:'100%'*/
      },
      /*title: {
        text: "Historic World Population by Region"
      },*/
      title: null,
      /*subtitle: {
        text:
          'Source: <a href="https://en.wikipedia.org/wiki/World_population">Wikipedia.org</a>'
      },*/
      subtitle: null,
      xAxis: {
        categories: ["Total", "Proyectos", "Actividades"],
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
      /*yAxis: {
        min: 0,
        title: {
          text: "Population (millions)",
          align: "high"
        },
        labels: {
          overflow: "justify"
        }
      },*/
      yAxis: [
        {
          visible: false
        }
      ],
      tooltip: false,/*{
        //valueSuffix: " millions"
        formatter: function() {
              // If you want to see what is available in the formatter, you can
              // examine the `this` variable.
              //     console.log(this);
            return '<b>'+ this.key +'</b><br/>'+
                  that.formatNumber(this.point.y,2);
        }
      },*/
      plotOptions: {
        bar: {          
          dataLabels: {
            style: {
              fontSize: '14px'
            },
            enabled: true,
            align: "left",
            y: 0,
            color: "black",
            borderColor: "white",
            x: 0,
            inside: true,
            formatter: function () {              
              return that.formatNumber(this.point.y,2)
            }
          },
          
        },
        
        series: {
          pointPadding: 0,
          groupPadding: 0.08,
          borderWidth: 0,
          shadow: false
        },
       
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
      series: [
        {
          name: "Presupuesto",
          data: [
            {
              y: parseFloat(this.data.total_pim),
              events: {
                mouseOver: () => {
                  this.highlight("circle-text-big");
                },
                mouseOut: () => {
                  this.downlight();
                }
              }
            },
            {
              y: parseFloat(this.data.pim_proy),
              events: {
                mouseOver: () => {
                  this.highlight("circle-text-med");
                },
                mouseOut: () => {
                  this.downlight();
                }
              }
            },
            {
              y: parseFloat(this.data.pim_act),
              events: {
                mouseOver: () => {
                  this.highlight("circle-text-small");
                },
                mouseOut: () => {
                  this.downlight();
                }
              }
            }
          ],
          color: this.legendColor === 1 ? "#8CB3D1" : "#6699CC"
        },
        {
          name: "Ejecución",
          data: [
            {
              y: parseFloat(this.data.total_dev),
              color: this.getColor(parseFloat(this.data.per_tot)).color,
              events: {
                mouseOver: () => {
                  this.highlight("circle-text-big");
                },
                mouseOut: () => {
                  this.downlight();
                }
              }
            },
            {
              y: parseFloat(this.data.dev_proy),
              color: this.getColor(parseFloat(this.data.per_proy)).color,
              events: {
                mouseOver: () => {
                  this.highlight("circle-text-med");
                },
                mouseOut: () => {
                  this.downlight();
                }
              }
            },
            {
              y: parseFloat(this.data.dev_act),
              color: this.getColor(parseFloat(this.data.per_act)).color,
              events: {
                mouseOver: () => {
                  this.highlight("circle-text-small");
                },
                mouseOut: () => {
                  this.downlight();
                }
              }
            }
          ]
          //color: this.rangeColor()
          //parseFloat(this.data.total_dev),parseFloat(this.data.dev_proy),parseFloat(this.data.dev_act)
        }
      ]
    });
  }
};
</script>

<style scoped>
.circle-text-big {
  display: table-cell;
  height: 60px; /*change this and the width
  for the size of your initial circle*/
  width: 60px;
  text-align: center;
  vertical-align: middle;
  border-radius: 50%;
  /*make it pretty*/
  background: #000;
  color: #000;
  font-size: 18px;
  font-weight: 600;
}

.circle-text-med {
  display: table-cell;
  height: 50px; /*change this and the width
  for the size of your initial circle*/
  width: 50px;
  text-align: center;
  vertical-align: middle;
  border-radius: 50%;
  /*make it pretty*/
  background: #000;
  color: #000;
  font-size: 16px;
  font-weight: 600;
}

.highcharts-data-label {
  transform: translate(0, 0) !important;
}

.circle-text-small {
  display: table-cell;
  height: 50px; /*change this and the width
  for the size of your initial circle*/
  width: 50px;
  text-align: center;
  vertical-align: middle;
  border-radius: 50%;
  /*make it pretty*/
  background: #000;
  color: #000;
  font-size: 16px;
  font-weight: 600;
}

.legend-1 {
  color: #000 !important;
  background: #FF6666 !important;
}

.legend-2 {
  color: #000 !important;
  background: #F4E67A !important;
}

.legend-3 {
  color: #000 !important;
  background: #98BF61 !important;
}
</style>
