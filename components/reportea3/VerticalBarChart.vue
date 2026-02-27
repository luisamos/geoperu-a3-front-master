<template>
  <div style="width:100%;height:100%;" @dblclick="zoomo">
    <div style="width:100%;height:100%;padding-left:32px;">
      <div style="display:table;width:100%;height:10%;text-align:center;">
        <span
          style="font-size:24px;font-weight:700;display:table-cell;vertical-align:bottom;line-height:1;"
          v-text="data.ano_eje"
        ></span>
      </div>
      <div style="width:100%;height:90%;text-align:center;">
        <div style="width:100%;height:25%;border-bottom: 1px dashed;">
          <div style="position:absolute;margin-top:16px;margin-left:-22px;font-size:10.5px;font-weight:700" ><span style="font-size:22px;">%</span><br>Ejecutado</div>
          <div
            style="display: flex;align-items: center;justify-content: center;float:left;width:33.3%;height:100%;"
          >
            <div style="display:table;vertical-align:bottom;">
              <span
                :class="['circle-text','circle-text-big', this.getColor(parseFloat(this.data.per_tot)).class ]"
                v-text="data.per_tot"
              ></span>
            </div>
          </div>
          <div
            style="display: flex;align-items: center;justify-content: center;float:left;width:33.3%;height:100%;"
          >
            <div style="display:table;vertical-align:bottom;">
              <span
                :class="['circle-text','circle-text-med', this.getColor(parseFloat(this.data.per_proy)).class ]"
                v-text="data.per_proy"
              ></span>
            </div>
          </div>
          <div
            style="display: flex;align-items: center;justify-content: center;float:left;width:33.3%;height:100%;"
          >
            <div style="display:table;vertical-align:middle;">
              <span
                :class="['circle-text','circle-text-small', this.getColor(parseFloat(this.data.per_act)).class ]"
                v-text="data.per_act"
              ></span>
            </div>
          </div>
        </div>
        <div style="width:100%;height:75%;" :id="this.id"></div>
      </div>
      
    </div>
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
          ano_eje: "0000",
          dev_act: 0.00,
          dev_proy: 0.00,
          per_act: 0.00,
          per_proy: 0.00,
          per_tot: 0.00,
          pim_act:  0.00,
          pim_proy:  0.00,
          total_dev:  0.00,
          total_pim: 0.00
        }
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

    if (this.legendClass === 0) {
      this.validation = { red: 9.99, yellow: 19.99, green: 100};
    }

    if (this.legendClass === 1) {
      this.validation = { red: 19.99, yellow: 39.99, green: 100 };
    }

    if (this.legendClass === 2) {
      this.validation = { red: 29.99, yellow: 59.99, green: 100 };
    }

    if (this.legendClass === 3) {
      this.validation = { red: 49.99, yellow: 79.99, green: 100 };
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
      return { color: "#FFF", class: "legend-null" };
    },
    highlight(className) {
      $(".circle-text:not(." + className + ")").css("opacity", "0.2");
    },
    downlight() {
      $(".circle-text").css("opacity", "1");
    }
  },
  mounted() {
    var that = this;

    let chart = Highcharts.chart({
      chart: {
        loading: {
            hideDuration: 1000,
            showDuration: 1000,
            label: 'adsdasdas'
        },
        renderTo: document.querySelector("#" + this.id),
        type: "column",
        backgroundColor: null,
        marginTop: 0,
        marginBottom: 32

        /*margin:0,
        padding:0,
        height:'100%'*/
      },
      title: null,
      subtitle: null,
      xAxis: {
        categories: ["Total", "Proyectos", "Actividades"],
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
      yAxis: {
        visible: false
      },
      tooltip: false,
      plotOptions: {
        column: {
          /*dataLabels: {
            //allowOverlap: true,
            style: {
              fontSize: "14px"
            },
            enabled: true,
            //align: null,
             //enabled: true,
              //crop: false,
              //overflow: 'none',
            color: "black",
            borderColor: "white",
            inside: true,
            verticalAlign: 'top',
            formatter: function() {
              return that.formatNumber(this.point.y, 2);
            }
          }*/
        },
        series: {
          pointPadding: 0.04,
          // groupPadding: 0.08,
          borderWidth: 0,
          shadow: false
        }
      },
      legend: false,
      credits: {
        enabled: false
      },
      series: [
        {
          name: "Presupuesto",
          dataLabels: {
                allowOverlap: true,
                style: {
                  fontSize: "13px"
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
                  return that.formatNumber(this.point.y);
                }
              },
          data: [
            
            {
              y: parseFloat(this.data.total_pim),
              color:'#3dac96',
              
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
           dataLabels: {
                allowOverlap: false,
                style: {
                  fontSize: "13px"
                },
                enabled: true,
                y:12,
                //align: null,
                //enabled: true,
                  //crop: false,
                  //overflow: 'none',
                color: "black",
                borderColor: "white",
                inside: false,
                verticalAlign: 'center',
                formatter: function() {
                  return that.formatNumber(this.point.y);
                }
              },
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
      ],
      events: {
        load: function(chart) {
          let point = chart.series[0],
            text = chart.renderer
              .text(
                "Max",
                point.plotX + chart.plotLeft + 10,
                point.plotY + chart.plotTop - 10
              )
              .attr({
                zIndex: 5
              })
              .add(),
            box = text.getBBox();

          chart.renderer
            .rect(box.x - 5, box.y - 5, box.width + 10, box.height + 10, 5)
            .attr({
              fill: "#FFFFEF",
              stroke: "gray",
              "stroke-width": 1,
              zIndex: 9999
            })
            .add();
        }
      }
    })

    //chart.showLoading()
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

.legend-null {
  color: #000 !important;
  background: transparent !important;
}
</style>

