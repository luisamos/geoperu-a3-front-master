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
              <b v-text="nacional"></b><b>%</b>
              <br>
            </span>
            <span class="label-value label-departamento" style="margin-left:-30px">
              <b v-text="departamento"></b><b>%</b>
              <br>
            </span>
            <span class="label-value label-provincia" style="margin-left:-20px">
              <b v-text="provincia"></b><b>%</b>
              <br>
            </span>
            <span v-if="$store.getters['reporte/tipo'] === 'dist'" class="label-value label-distrito" style="margin-left:-10px">
              <b v-text="distrito"></b><b>%</b>
            </span>
            
          </div>
        </div>
      
    </div>
  </div>
</template>

<script>
import Highcharts from "highcharts";
import highchartsMore from "highcharts/highcharts-more";
import solidGauge from "highcharts/modules/solid-gauge";

import numberFormat from "~/mixins/numberFormat.js";

if (typeof Highcharts === "object") {
  highchartsMore(Highcharts);
  solidGauge(Highcharts);
}

export default {
  mixins: [numberFormat],
  props:{
    ctitle: {
      type: String,
      default: ''
    },
    categorie: {
      type: String,
      default: 'one'
    },
    colors: {
      type: Object,
      default: ()=> { 
        return {
          'nacional': '',
          'departamento': '',
          'provincia': '',
          'distrito': ''
        }
      }
    },
    nacional: {
      type: String,
      default: "0"
    },
    departamento: {
      type: String,
      default: "0"
    },
    provincia: {
      type: String,
      default: "0"
    },
    distrito: {
      type: String,
      default: "0"
    },
    nnacional: {
      type: String,
      default: "0"
    },
    ndepartamento: {
      type: String,
      default: "0"
    },
    nprovincia: {
      type: String,
      default: "0"
    },
    ndistrito: {
      type: String,
      default: "0"
    }
  },
  methods: {
   highlight(className) {
      $(".label-value:not(."+className+")").css("opacity", "0.2");
      
      //.animate({ opacity: 0.2 }, 200);
    },
    downlight() {
      $(".label-value").css("opacity", "1");
    }
  },
  data() {
    return {
      id: null,
      series: null,
      seriesBackground: null,
      valores: this.values,
      categories: {
        'one': { a:'Distrito', b:'Provincia',c:'Departamento',d:'Nacional'},
        'two': { a:'Distrito', b:'Provincia',c:'Región',d:'Nacional'}
      }
    };
  },
  created() {
    this.id = "ele" + this._uid;
  },
  mounted() {

    this.seriesBackground = [
          {
            // Track for Move
            outerRadius: "110%",
            innerRadius: "90%",
            backgroundColor: '#d1c8bd',
            borderColor: null,
            borderWidth: 0
          },
          {
            // Track for Move
            outerRadius: "80%",
            innerRadius: "70%",
            backgroundColor: '#d1c8bd',
            borderColor: null,
            borderWidth: 8
          },
          {
            // Track for Exercise
            outerRadius: "60%",
            innerRadius: "50%",
            backgroundColor: "#d1c8bd",
            borderColor: null,
            borderWidth: 8
          },
         
        ];

    this.series = [
        {
          name: this.categories[this.categorie].d,
          data: [
            {
              color: this.colors.nacional,
              radius: "110%",
              innerRadius: "90%",
              y: parseFloat(this.nacional),
              x: this.formatNumber(this.nnacional,1),
              tooltip:false,
             events: {
                mouseOver: () => {
                  this.highlight("label-nacional");
                },
                mouseOut: () => {
                  this.downlight();
                }
              }
            }
          ]
        },
        {
          name: this.categories[this.categorie].c,
          data: [
            {
              color: this.colors.departamento,
              radius: "80%",
              innerRadius: "70%",
              y: parseFloat(this.departamento),
              x: this.formatNumber(this.ndepartamento,1),
              events: {
                mouseOver: () => {
                  this.highlight("label-departamento");
                },
                mouseOut: () => {
                  this.downlight();
                }
              }
            }
          ]
        },
        {
          name: this.categories[this.categorie].b,
          data: [
            {
              color: this.colors.provincia,
              radius: "60%",
              innerRadius: "50%",
              y: parseFloat(this.provincia),
              x: this.formatNumber(this.nprovincia,1),
              events: {
                mouseOver: () => {
                  this.highlight("label-provincia");
                },
                mouseOut: () => {
                  this.downlight();
                }
              }
            }
          ]
        }
      ];

    if ( this.$store.getters['reporte/tipo'] === "dist" ) {

      
      this.seriesBackground.push({
            // Track for Stand
            outerRadius: "40%",
            innerRadius: "30%",
            backgroundColor: "#d1c8bd",
            borderColor: null,
            borderWidth: 8
          });

      this.series.push({
          name: this.categories[this.categorie].a,
          data: [
            {
              color: this.colors.distrito,
              radius: "40%",
              innerRadius: "30%",
              y: parseFloat(this.distrito),
              x: this.formatNumber(this.ndistrito,1),
              borderWidth: 5,
              events: {
                mouseOver: () => {
                  this.highlight("label-distrito");
                },
                mouseOut: () => {
                  this.downlight();
                }
              }
            }
          ]
        });
    }

    Highcharts.chart({
      credits: false,
      chart: {
        renderTo: document.querySelector("#" + this.id),
        type: "solidgauge",
        margin:0,
        padding:0,
        backgroundColor: false,
        events: {
          //
          //render: renderIcons
        }
      },

      title: false,
      
      tooltip: {
        borderWidth: 0,
        backgroundColor: "none",
        shadow: false,
        style: {
          fontSize: "10px",
          fontWeight: "bold",
          textAlign:'center'
        },
       /* pointFormat:
          `<div style="text-align:center;">
            {series.name}<br>
            <div style="text-align:center; color: {point.color}; font-weight: bold">
              {point.x}
            </div>
           </div>`,*/
        useHTML: true,

        pointFormat:  `<div style="text-align:center;width:100%;height:100%;">
            {series.name}<br>
            <div style="text-align:center; color: {point.color}; font-weight: bold">
              <span>{point.x}%</span>
            </div>
           </div>`,
        positioner: function(labelWidth) {
          return {
            x: (this.chart.chartWidth - labelWidth) / 2,
            y: this.chart.plotHeight / 2.5
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
        lineWidth: 2,
        tickPositions: []
      },

      plotOptions: {
        solidgauge: {
          dataLabels: {
            enabled: false
          },
          linecap: "round",
          stickyTracking: true,
          rounded: false
        }
      },

      series: this.series
    });
  }
};
</script>

<style>


</style>
