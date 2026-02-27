<template>
  <div>
    <div style="font-size:10px;height:10%;text-align: center;display:table;width:100%;">
      <span style="display:table-cell;vertical-align: middle;text-align:center;">
        <b v-text="ctitle"></b>
      </span>
    </div>
    <div style="font-size:8px;height:90%;">
      <div style="width:100%;height:100%;">
        <div :id="this.id" style="width:80%;height:100%;float:left;"></div>
        <div
          style="width:20%;height:100%;float:left;padding-top:12px;font-size:18px;line-height:20px;text-align:left;"
        >
          <span class="label-value label-nacional" style="margin-left:-40px">
            <b v-text="nacional"></b>
            <b>%</b>
            <br />
          </span>
          <span class="label-value label-departamento" style="margin-left:-28px">
            <b v-text="departamento"></b>
            <b>%</b>
            <br />
          </span>
          <span 
             v-if="$store.getters['reporte/tipo'] === 'dist'||$store.getters['reporte/tipo'] === 'prov'"
            class="label-value label-provincia" style="margin-left:-20px">
            <b v-text="provincia"></b>
            <b>%</b>
            <br />
          </span>
          <span
            v-if="$store.getters['reporte/tipo'] === 'dist'"
            class="label-value label-distrito"
            style="margin-left:-16px"
          >
            <b v-text="distrito"></b>
            <b>%</b>
          </span>
        </div>
      </div>
    </div>
     <div
            v-if="this.universo.description !== ''"
            style="font-size:9px;line-height:9px;text-align:center;position:relative;width:80px;bottom:36px;left:65%;"
          >
            <div>
              <label style="margin:0px;font-size:11px;" v-text="this.valorUniverso"></label>
            </div>
            <div>
              <label style="margin:0px;" v-text="this.universo.description"></label>
            </div>
          </div> 
  </div>
</template>

<script>
import Highcharts from "highcharts";
import highchartsMore from "highcharts/highcharts-more";
import solidGauge from "highcharts/modules/solid-gauge";
import TextUniverso from "~/components/reportea3/TextUniverso";
import numberFormat from "~/mixins/numberFormat.js";
import Zoom from "~/mixins/zoom.js";
import Vue from "vue";

if (typeof Highcharts === "object") {
  highchartsMore(Highcharts);
  solidGauge(Highcharts);
}

export default {
  mixins: [numberFormat, Zoom],
  props: {
    ctitle: {
      type: String,
      default: ""
    },
    categorie: {
      type: String,
      default: "one"
    },
    colors: {
      type: Object,
      default: () => {
        return {
          nacional: "",
          departamento: "",
          provincia: "",
          distrito: ""
        };
      }
    },
    nacional: {
      type: String,
      default: "0.0"
    },
    departamento: {
      type: String,
      default: "0.0"
    },
    provincia: {
      type: String,
      default: "0.0"
    },
    distrito: {
      type: String,
      default: "0.0"
    },
    nnacional: {
      type: String,
      default: "0.0"
    },
    ndepartamento: {
      type: String,
      default: "0.0"
    },
    nprovincia: {
      type: String,
      default: "0.0"
    },
    ndistrito: {
      type: String,
      default: "0.0"
    },
    universo: {
      type: Object,
      default: function() {
        return {
          values: {
            nacional: "",
            departamento: "",
            provincia: "",
            distrito: ""
          },
          description: ""
        };
      }
    }
  },
  methods: {
    highlight(className) {
      $(".label-value:not(." + className + ")").css("opacity", "0.2");

      //.animate({ opacity: 0.2 }, 200);
    },
    downlight() {
      $(".label-value").css("opacity", "1");
    }
  },
  data() {
    return {
      id: null,
      valorUniverso: 0,
      categories: {
        one: {
          a: "Distrito",
          b: "Provincia",
          c: "Departamento",
          d: "Nacional"
        },
        two: { a: "Distrito", b: "Provincia", c: "Región", d: "Nacional" },
        three: { a: "Distrito", b: "Provincia", c: "Mancomunidad", d: "Nacional" }
      },
      chart: null,
      selectedCategorie: ''
    };
  },
  created() {
    this.id = "ele" + this._uid;
  },
  mounted() {
    console.log(this.$store.getters['reporte/isRegion'])
    if( this.$store.getters['reporte/isRegion'] ){
      this.selectedCategorie = 'two'
    } else if( this.$store.getters['reporte/isMancomunidad'] ){
      this.selectedCategorie = 'three'
    } else {
      this.selectedCategorie = this.categorie
    }

    this.valorUniverso = this.universo.values.nacional;
    this.createChart();
  },
  computed: {
    seriesBackground() {
      let x = [
        {
          // Track for Move
          outerRadius: "110%",
          innerRadius: "90%",
          backgroundColor: "#d1c8bd",
          borderColor: null,
          borderWidth: 0
        }
      ];

      if ( this.$store.getters["reporte/tipo"] === "dpto" ){
        x.push({
          // Track for Move
          outerRadius: "70%",
          innerRadius: "50%",
          backgroundColor: "#d1c8bd",
          borderColor: null,
          borderWidth: 8
        })
      } else {
        x.push({
          // Track for Move
          outerRadius: "80%",
          innerRadius: "70%",
          backgroundColor: "#d1c8bd",
          borderColor: null,
          borderWidth: 8
        })
      }

      if (this.$store.getters["reporte/tipo"] === "prov" || this.$store.getters["reporte/tipo"] === "dist" ){
        x.push({
          // Track for Exercise
          outerRadius: "60%",
          innerRadius: "50%",
          backgroundColor: "#d1c8bd",
          borderColor: null,
          borderWidth: 8
        })
      }
      
      if (this.$store.getters["reporte/tipo"] === "dist") {
        x.push({
          // Track for Stand
          outerRadius: "40%",
          innerRadius: "30%",
          backgroundColor: "#d1c8bd",
          borderColor: null,
          borderWidth: 8
        });
      }
      return x;
    },
    series() {
      let y = [
        {
          name: this.categories[this.selectedCategorie].d,
          data: [
            {
              color: this.colors.nacional,
              radius: "110%",
              innerRadius: "90%",
              y: parseFloat(this.nacional),
              x: this.nnacional,
              events: {
                mouseOver: () => {
                  this.highlight("label-nacional");
                  // console.log(this.universo);
                },
                mouseOut: () => {
                  this.downlight();
                }
              }
            }
          ]
        }
      ];


       if ( this.$store.getters["reporte/tipo"] === "dpto" ){
         y.push( {
          name: this.categories[this.selectedCategorie].c,
          data: [
            {
              color: this.colors.departamento,
              radius: "70%",
              innerRadius: "50%",
              y: parseFloat(this.departamento),
              x: this.ndepartamento,
              events: {
                mouseOver: () => {
                  this.highlight("label-departamento");
                  this.valorUniverso = this.universo.values.departamento;
                },
                mouseOut: () => {
                  this.downlight();
                  this.valorUniverso = this.universo.values.nacional;
                }
              }
            }
          ]
        })
       } else {
          y.push({
          name: this.categories[this.selectedCategorie].c,
          data: [
            {
              color: this.colors.departamento,
              radius: "80%",
              innerRadius: "70%",
              y: parseFloat(this.departamento),
              x: this.ndepartamento,
              events: {
                mouseOver: () => {
                  this.highlight("label-departamento");
                  this.valorUniverso = this.universo.values.departamento;
                },
                mouseOut: () => {
                  this.downlight();
                  this.valorUniverso = this.universo.values.nacional;
                }
              }
            }
          ]
        })
       }

      if (this.$store.getters["reporte/tipo"] === "prov" || this.$store.getters["reporte/tipo"] === "dist" ){
        y.push(  {
          name: this.categories[this.selectedCategorie].b,
          data: [
            {
              color: this.colors.provincia,
              radius: "60%",
              innerRadius: "50%",
              y: parseFloat(this.provincia),
              x: this.nprovincia,
              events: {
                mouseOver: () => {
                  this.highlight("label-provincia");
                  this.valorUniverso = this.universo.values.provincia;
                },
                mouseOut: () => {
                  this.downlight();
                  this.valorUniverso = this.universo.values.nacional;
                }
              }
            }
          ]
        });
      }


      if (this.$store.getters["reporte/tipo"] === "dist") {
        y.push({
          name: this.categories[this.selectedCategorie].a,
          data: [
            {
              color: this.colors.distrito,
              radius: "40%",
              innerRadius: "30%",
              y: parseFloat(this.distrito),
              x: this.ndistrito,
              borderWidth: 5,
              events: {
                mouseOver: () => {
                  this.highlight("label-distrito");
                  this.valorUniverso = this.universo.values.distrito;
                },
                mouseOut: () => {
                  this.downlight();
                  this.valorUniverso = this.universo.values.nacional;
                }
              }
            }
          ]
        });
      }
      return y;
    }
    //...mapState("reporte", ["status"])
  },
  watch: {
    status(newValue, oldValue) {
      console.log(`Updating from ${oldValue} to ${newValue}`);
      if (newValue === "updated") {
        this.createChart();
      }
    },
    valorUniverso(newValue, oldValue) {
      this.$emit('universoChange', newValue)
    }
  },
  components: {
    TextUniverso
  },
  methods: {
    highlight(className) {
      $(".label-value:not(." + className + ")").css("opacity", "0.2");

      //.animate({ opacity: 0.2 }, 200);
    },
    downlight() {
      $(".label-value").css("opacity", "1");
    },
    createChart() {
      this.chart = Highcharts.chart({
        credits: false,
        chart: {
          renderTo: document.querySelector("#" + this.id),
          type: "solidgauge",
          margin: 0,
          padding: 0,
          backgroundColor: false
        },
        data: {
          dataRefreshRate: 1
        },
        title: false,

        tooltip: {
          borderWidth: 0,
          backgroundColor: "none",
          shadow: false,
          style: {
            fontSize: "10px",
            fontWeight: "bold",
            textAlign: "center"
          },
          useHTML: true,
          pointFormat: `<div style="text-align:center;width:100%;height:100%;text-shadow:-1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;">
            {series.name}<br>
            <div style="text-align:center; color: {point.color}; font-weight: bold;">
              <span>{point.x}</span>
            </div>
           </div>`,
          positioner: function(labelWidth) {
            return {
              x: (this.chart.chartWidth - labelWidth) / 2,
              y: this.chart.plotHeight / 2.6
            };
          }
        },

        pane: {
          startAngle: 360,
          endAngle: 0,
          background: this.seriesBackground
        },

        yAxis: {
          min: 0,
          max: 100,
          lineWidth: 0,
          tickPositions: []
        },
        plotOptions: {
          solidgauge: {
            dataLabels: {
              enabled: false
            },
            linecap: "round",
            stickyTracking: false,
            rounded: false
          }
        },
        series: this.series
      });
    }
  }
};
</script>

<style>
</style>
