<template>
  <div :class="componentName"
    @dblclick="zoomo"
  > 
      <div class="left-content">
        
        <Leyenda v-if="(reporteStore.tipo === 'dist')" order="desc" :rango="{ min:1, max: 2 }" />
        <Leyenda v-if="(reporteStore.tipo === 'prov')" order="desc" :rango="{ min:2, max: 3 }" />
        <Leyenda v-if="(reporteStore.tipo === 'dpto')" order="desc" :rango="{ min:3, max: 4 }" />
        
        <div class="chart" id="area"></div>
        <Fuente style="height:10%;" label="Fuente: INEI - Perú: Población total proyectada, según departamento, provincia y distrito, 2022" />
      </div>
      <div class="right-content">
        <div class="nota" style="display:none">
          <div class="descripcion">
            <span>
              <b>
                Nota:
                <br />Tasa de crecimiento promedio anual entre 2012 y 2020 es de:
              </b>
            </span>
          </div>
          <div style="text-align:center;">
            <span
              v-if="reporteStore.tipo==='dpto'"
              class="legend label-departamento"
              v-text="parseFloat(reporteStore.results.tasa.filter((obj)=>obj.cat ==='departamento')[0].tcpro10_18).toFixed(1)"
            ></span>
            <span
              v-if="reporteStore.tipo==='dist'"
              class="legend label-distrito"
              v-text="parseFloat(reporteStore.results.tasa.filter((obj)=>obj.cat ==='distrito')[0].tcpro10_18).toFixed(1)"
            ></span>
            <span
              v-if="reporteStore.tipo!=='dpto'"
              class="legend label-provincia"
              v-text="parseFloat(reporteStore.results.tasa.filter((obj)=>obj.cat ==='provincia')[0].tcpro10_18).toFixed(1)"
            ></span>
          </div>
        </div>
      </div>
    
  </div>
</template>

<script>
import Highcharts from "highcharts";
import numberFormat from "~/mixins/numberFormat.js";
import Fuente from "~/components/reportea3/Fuente";
import Leyenda from "~/components/reportea3/Leyenda";
import { useReporteStore } from '~/stores/reporte'

export default {
  setup() {
    const reporteStore = useReporteStore()
    return { reporteStore }
  },
  name: 'proyeccion',
  mixins: [numberFormat],
  components: {
    Fuente,
    Leyenda
  },
  data: () => {
    return {
      componentName: 'proyeccion',
      data: null
    };
  },
  mounted() {
    let nac = reporteStore.results.poblacion.filter(obj => {
      return obj.nombre === "Nacional";
    })[0];
    let dep = reporteStore.results.poblacion.filter(obj => {
      return obj.nombre === "Departamento";
    })[0];
    let pro = reporteStore.results.poblacion.filter(obj => {
      return obj.nombre === "Provincia";
    })[0];
    let dis = reporteStore.results.poblacion.filter(obj => {
      return obj.nombre === "Distrito";
    })[0];

    var that = this;
    if (reporteStore.tipo === "dist") {
      this.data = [
        {
          name: "Provincia",
          data: [
            {
              d: parseFloat(pro.pob_py_12),
              y: parseFloat(pro.pob_py_12)
            },
            {
              d: parseFloat(pro.pob_py_13),
              y: parseFloat(pro.pob_py_13)
            },
            {
              d: parseFloat(pro.pob_py_14),
              y: parseFloat(pro.pob_py_14)
            },
            {
              d: parseFloat(pro.pob_py_15),
              y: parseFloat(pro.pob_py_15)
            },
            {
              d: parseFloat(pro.pob_py_16),
              y: parseFloat(pro.pob_py_16)
            },
            {
              d: parseFloat(pro.pob_py_17),
              y: parseFloat(pro.pob_py_17)
            },
            {
              d: parseFloat(pro.pob_py_18),
              y: parseFloat(pro.pob_py_18)
            },
            {
              d: parseFloat(pro.pob_py_19),
              y: parseFloat(pro.pob_py_19)
            },
            {
              d: parseFloat(pro.pob_py_20),
              y: parseFloat(pro.pob_py_20)
            },
            {
              d: parseFloat(pro.pob_py_22),
              y: parseFloat(pro.pob_py_22)
            }
          ],
          color: "#5c74ae"
        },
        {
          name: "Distrito",
          data: [
            {
              d: parseFloat(dis.pob_py_12),
              y: parseFloat(pro.pob_py_12) - parseFloat(dis.pob_py_12)
            },
            {
              d: parseFloat(dis.pob_py_13),
              y: parseFloat(pro.pob_py_13) - parseFloat(dis.pob_py_13)
            },
            {
              d: parseFloat(dis.pob_py_14),
              y: parseFloat(pro.pob_py_14) - parseFloat(dis.pob_py_14)
            },
            {
              d: parseFloat(dis.pob_py_15),
              y: parseFloat(pro.pob_py_15) - parseFloat(dis.pob_py_15)
            },
            {
              d: parseFloat(dis.pob_py_16),
              y: parseFloat(pro.pob_py_16) - parseFloat(dis.pob_py_16)
            },
            {
              d: parseFloat(dis.pob_py_17),
              y: parseFloat(pro.pob_py_17) - parseFloat(dis.pob_py_17)
            },
            {
              d: parseFloat(dis.pob_py_18),
              y: parseFloat(pro.pob_py_18) - parseFloat(dis.pob_py_18)
            },
            {
              d: parseFloat(dis.pob_py_19),
              y: parseFloat(pro.pob_py_19) - parseFloat(dis.pob_py_19)
            },
            {
              d: parseFloat(dis.pob_py_20),
              y: parseFloat(pro.pob_py_20) - parseFloat(dis.pob_py_20)
            },
            {
              d: parseFloat(dis.pob_py_22),
              y: parseFloat(pro.pob_py_22) - parseFloat(dis.pob_py_22)
            }
          ],
          color: "#1592f2"
        }
      ];
    }

    if (reporteStore.tipo === "prov") {
      this.data = [
        {
          name: "Departamento",
          data: [
           
            {
              d: parseFloat(dep.pob_py_12),
              y: parseFloat(dep.pob_py_12)
            },
            {
              d: parseFloat(dep.pob_py_13),
              y: parseFloat(dep.pob_py_13)
            },
            {
              d: parseFloat(dep.pob_py_14),
              y: parseFloat(dep.pob_py_14)
            },
            {
              d: parseFloat(dep.pob_py_15),
              y: parseFloat(dep.pob_py_15)
            },
            {
              d: parseFloat(dep.pob_py_16),
              y: parseFloat(dep.pob_py_16)
            },
            {
              d: parseFloat(dep.pob_py_17),
              y: parseFloat(dep.pob_py_17)
            },
            {
              d: parseFloat(dep.pob_py_18),
              y: parseFloat(dep.pob_py_18)
            },
            {
              d: parseFloat(dep.pob_py_19),
              y: parseFloat(dep.pob_py_19)
            },
            {
              d: parseFloat(dep.pob_py_20),
              y: parseFloat(dep.pob_py_20)
            },
            {
              d: parseFloat(dep.pob_py_22),
              y: parseFloat(dep.pob_py_22)
            }
          ],
          color: "#18226d"
        },
        {
          name: "Provincia",
          data: [
           
            {
              d: parseFloat(pro.pob_py_12),
              y: parseFloat(pro.pob_py_12)
            },
            {
              d: parseFloat(pro.pob_py_13),
              y: parseFloat(pro.pob_py_13)
            },
            {
              d: parseFloat(pro.pob_py_14),
              y: parseFloat(pro.pob_py_14)
            },
            {
              d: parseFloat(pro.pob_py_15),
              y: parseFloat(pro.pob_py_15)
            },
            {
              d: parseFloat(pro.pob_py_16),
              y: parseFloat(pro.pob_py_16)
            },
            {
              d: parseFloat(pro.pob_py_17),
              y: parseFloat(pro.pob_py_17)
            },
            {
              d: parseFloat(pro.pob_py_18),
              y: parseFloat(pro.pob_py_18)
            },
             {
              d: parseFloat(pro.pob_py_19),
              y: parseFloat(pro.pob_py_19)
            },
            {
              d: parseFloat(pro.pob_py_20),
              y: parseFloat(pro.pob_py_20)
            },
            {
              d: parseFloat(pro.pob_py_22),
              y: parseFloat(pro.pob_py_22)
            }
          ],
          color: "#5c74ae"
        }
      ];
    }

    if (reporteStore.tipo === "dpto") {
      this.data = [
        {
          name: "Nacional",
          data: [
           
            {
              d: parseFloat(nac.pob_py_12),
              y: parseFloat(nac.pob_py_12)
            },
            {
              d: parseFloat(nac.pob_py_13),
              y: parseFloat(nac.pob_py_13)
            },
            {
              d: parseFloat(nac.pob_py_14),
              y: parseFloat(nac.pob_py_14)
            },
            {
              d: parseFloat(nac.pob_py_15),
              y: parseFloat(nac.pob_py_15)
            },
            {
              d: parseFloat(nac.pob_py_16),
              y: parseFloat(nac.pob_py_16)
            },
            {
              d: parseFloat(nac.pob_py_17),
              y: parseFloat(nac.pob_py_17)
            },
            {
              d: parseFloat(nac.pob_py_18),
              y: parseFloat(nac.pob_py_18)
            },
             {
              d: parseFloat(nac.pob_py_19),
              y: parseFloat(nac.pob_py_19)
            },
            {
              d: parseFloat(nac.pob_py_20),
              y: parseFloat(nac.pob_py_20)
            },
            {
              d: parseFloat(nac.pob_py_22),
              y: parseFloat(nac.pob_py_22)
            }
          ],
          color: "#ff6356"
        },
        {
          name: "Departamento",
          data: [
           
            {
              d: parseFloat(dep.pob_py_12),
              y: parseFloat(dep.pob_py_12)
            },
            {
              d: parseFloat(dep.pob_py_13),
              y: parseFloat(dep.pob_py_13)
            },
            {
              d: parseFloat(dep.pob_py_14),
              y: parseFloat(dep.pob_py_14)
            },
            {
              d: parseFloat(dep.pob_py_15),
              y: parseFloat(dep.pob_py_15)
            },
            {
              d: parseFloat(dep.pob_py_16),
              y: parseFloat(dep.pob_py_16)
            },
            {
              d: parseFloat(dep.pob_py_17),
              y: parseFloat(dep.pob_py_17)
            },
            {
              d: parseFloat(dep.pob_py_18),
              y: parseFloat(dep.pob_py_18)
            },
             {
              d: parseFloat(dep.pob_py_19),
              y: parseFloat(dep.pob_py_19)
            },
            {
              d: parseFloat(dep.pob_py_20),
              y: parseFloat(dep.pob_py_20)
            },
            {
              d: parseFloat(dep.pob_py_22),
              y: parseFloat(dep.pob_py_22)
            }
          ],
          color: "#18226d"
        },
        
      ];
    }

    Highcharts.chart({
      credits: false,
      chart: {
        renderTo: document.querySelector("#area"),
        type: "area",
        backgroundColor: null,
        borderWidth: 0,
        spacingTop: 2,
        margin: [27, 0, 12, 0],
        height: 70
      },
      legend: false,
      /*legend: {
        //layout: 'vertical',
        itemStyle: {
          fontSize: "10px"
        },

        align: "right",
        verticalAlign: "top",
        //floating: true,
        backgroundColor: null,
        x: 10,
        y: -36
      },*/
      title: {
        text:
          '<span style="font-size:0.7em;font-weight:600">Proyección gráfica de la Población</span>'
      },
      subtitle: {
        //text: "Source: Wikipedia.org"
      },
      xAxis: {
        categories: [
          "2012",
          "2013",
          "2014",
          "2015",
          "2016",
          "2017",
          "2018",
          "2019",
          "2020",
          "2022"
        ],
        tickmarkPlacement: "on",
        title: {
          enabled: false
        },
        labels: {
          style: {
            fontSize: "8px",
            fontWeight: "700",
            color: "black",
          },
          y: 8
        }
      },
      yAxis: {
        title: false,
        labels: false
      },
      tooltip: {
        //split: true,
        //valueSuffix: " millions",
        formatter: function() {
          console.log(this);
          return (
            "<b>Población " +
            this.point.category +
            "</b>: <br>" +
            that.formatNumber(this.point.d)
          );
        }
      },
      plotOptions: {
        area: {
          stacking: "normal",
          lineColor: "#666666",
          lineWidth: 1.5,
          marker: {
            lineWidth: 1,
            lineColor: "#666666",
            radius: 5
          }
        }
      },
      series: this.data
    });
  }
};
</script>

<style scoped>

.proyeccion {
  height:100%;
  width:100%;
  background-color:#f2f3f3;
  border-radius:10px 10px 10px 10px;
  background-color: #f2f2f2 !important;
}

.proyeccion .left-content {
   width:84%;
   float:left;
}

.proyeccion .left-content .chart {
  width:100%;
}

.proyeccion .right-content {
  width:16%;
  height:100%;
  float:left;
}

.proyeccion .right-content .nota {
  border-radius: 10px 10px 10px 10px;
  background-color: #e7e7e7 !important;
  margin: 16px 6px 4px 2px;
  padding: 2px;
  font-size: 8px;
}

.proyeccion .right-content .nota .descripcion {
  text-align:left;
  padding-left:4%;
  padding-right:2%;
}


.proyeccion .label-departamento {
  color: #18226d  !important;
}

.proyeccion .label-provincia {
  color: #5c74ae !important;
}
.proyeccion .label-distrito {
  color: #179aff !important;
}

.proyeccion .legend {
  font-size: 14px;
  margin: 6px;
  font-weight: 700;
  text-align: center;
}

:deep(.leyenda) {
  position:absolute;
  width:auto;
  left: 20%;
}

:deep(.leyenda .item) {
  font-size: 10px;
}
:deep(.leyenda .item .legend-circle) {
  width: 9px;
  height: 9px;
}

:deep(.leyenda .item .legend-circle-nacional) {
  background-color: #ff6356 !important;
}

:deep(.leyenda .item .legend-circle-departamento) {
  background-color: #18226d !important;
}

:deep(.leyenda .item .legend-circle-provincia) {
  background-color: #617ab6 !important;
}

:deep(.leyenda .item .legend-circle-distrito) {
  background-color: #179aff !important;
}

</style>
