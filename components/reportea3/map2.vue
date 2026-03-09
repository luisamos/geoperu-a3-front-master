<template>
  <div
    class="map-container"
    @mouseover="downloadButtonActive=true"
    @mouseleave="downloadButtonActive=false"
  >
    <transition name="fade">
      <div class="download-button" v-show="downloadButtonActive">
        <button
          class="btn btn-danger"
          @click="getPdfMap()"
          :disabled="loadingStore.isLoading"
        >Descargar mapa</button>
      </div>
    </transition>
    <div class="map" id="map" @dblclick="zoomo"></div>
  </div>
</template>

<script>
import Highcharts from "~/lib/highmaps.js";
import pdfPage from "~/mixins/PDFPrint.js";
import * as topojson from "topojson";

export default {
  mixins: [pdfPage],
  data() {
    return {
      data: null,
      downloadButtonActive: false,
      superficie: null,
      selected: null,
      densidad: null,
      name: null
    };
  },
  created() {
    this.data = reporteStore.results.geojson[0];
    this.superficie = this.$store.getters[
      "reporte/results"
    ].ejecutora[0].superficie;

    this.selected =
      reporteStore.tipo === "prov"
        ? this.$store.getters[
            "reporte/results"
          ].ejecutoraProv[0].ubigeo.substring(0, 4)
        : reporteStore.tipo === "dpto"
        ? this.$store.getters[
            "reporte/results"
          ].ejecutoraProv[0].ubigeo.substring(0, 2)
        : reporteStore.results.ejecutora[0].ubigeo;

    if (reporteStore.tipo !== "dpto") {
      this.densidad =
        reporteStore.results.censo2017.filter(
          obj => obj.cat === "Distrito"
        )[0].pob_total / parseFloat(this.superficie);
    } else {
      this.densidad = this.$store.getters[
        "reporte/results"
      ].ejecutora[0].densidad;
    }
  },
  mounted() {
    var color;
    var name;
    var capitalColor;

    if (reporteStore.tipo === "prov") {
      color = "#617ab6";
      name = "Provincia";
      capitalColor = "#30cd58";
    } else {
      color = "#179aff";
      name = "Distrito";
      capitalColor = "#30cd58";
    }

    var densidad = this.densidad;
    // Instantiate the map
    var gson = this.data;

    var states = Highcharts.geojson(gson, "map");
    var cities = Highcharts.geojson(gson, "mappoint");

    let selected = [{ c: this.selected }];

    if (reporteStore.tipo === "dpto") {
      selected.push(
        { c: "1508" },
        { c: "1502" },
        { c: "1503" },
        { c: "1504" },
        { c: "1505" },
        { c: "1506" },
        { c: "1507" },
        { c: "1508" },
        { c: "1509" },
        { c: "1510" }
      );
    }

    var chart = Highcharts.mapChart({
      chart: {
        margin: 0,
        margin: 0,
        renderTo: document.querySelector("#map"),
        events: {
          load: function() {
            console.log(map);
            //this.mapZoom(0, 100, 100);
          }
        },
        map: states,
        selected: true
      },
      credits: {
        enabled: false
      },
      title: [{ text: "" }],
      series: [
        {
          name: `Superficie: ${
            this.superficie
          } km2 <br> Densidad poblacional: ${parseFloat(densidad).toFixed(
            0
          )} hab/km²`,
          data: selected,
          keys: ["c"],
          joinBy: "c",
          nullColor: "#afafaf",
          borderColor: "#ffffff",
          opacity: 0.8,
          borderWidth: 2,
          color: color,
          //enableMouseTracking: true,
          states: {
            hover: {
              color: Highcharts.getOptions().colors[4]
            },
            select: {
              color: "#EFFFEF",
              borderColor: "black",
              dashStyle: "dot"
            }
          },
          tooltip: false
        },
        {
          name: `Superficie: ${
            this.superficie
          } km2 <br> Densidad poblacional: ${parseFloat(densidad).toFixed(
            0
          )} hab/km²`,
          data: states,
          keys: ["c"],
          joinBy: "c",
          borderColor: "#ffffff",
          opacity: 0,
          borderWidth: 2,
          color: "#afafaf",
          showInLegend: false,
          states: {
            hover: {
              color: Highcharts.getOptions().colors[4],
              opacity: 1,
              dataLabels: {
                align: "center",
                verticalAlign: "middle",
                fontSize: "12px",
                pointFormat: "{point.properties.c}",
                //padding: "0.04"
                y: -14
                //formatter: function () { console.log(this) }
              }
            },
            select: {
              color: "#EFFFEF",
              borderColor: "black",
              dashStyle: "dot"
            }
          },
          
        },
        {
          name: "Capital",
          type: "mappoint",
          data: cities,
          color: capitalColor,
          marker: {
            radius: 3.5,
            lineColor: "black",
            lineWidth: 1
          },
          dataLabels: {
            align: "center",
            verticalAlign: "middle",
            fontSize: "12px",
            pointFormat: "{point.properties.c}",
            //padding: "0.04"
            y: -14
            //formatter: function () { console.log(this) }
          },
          //animation: true,
          tooltip: {
            pointFormat: "{point.c}"
          }
        }
      ],
      legend: {
        accessibility: { enabled: false },
        align: "center"
        /*labelFormat: `
          Superficie: ${this.superficie} km2 <br>
          Densidad poblacional: ${parseFloat(densidad).toFixed(0)} hab/km²`*/
      },
      plotOptions: {
        series: {
          events: {
            legendItemClick: function() {
              return false;
            }
          }
        }
      },
      tooltip: {
            hideDelay: 200,
            positioner: function(labelWidth, labelHeight, point) {
              // let tooltipX = point.plotX - 40;
              // let tooltipY = point.plotY - 30;
              let tooltipX = 160;
              let tooltipY = 160;
              return {
                x: tooltipX,
                y: tooltipY
              };
            },
            useHTML: true,
            style: {
              pointerEvents: "auto"
            },
            formatter: (el) => {
              console.log(el)
              return  this.key
            }
          }
    });

    //mapChart.mapZoom(1)
    /*var mapChart=$('#mapContainer').highcharts(); //get map chart object from DOM
    mapChart.get(this.selected).zoomTo(); //zoom to the country using "id" from data serie
    mapChart.mapZoom(5); //elevate viewpoint a little to see surrounding countries as well*/
  },
  methods: {
    getPdfMap() {
      this.$store.dispatch("Loading/START", {
        tipo: "Notif",
        text: "Obteniendo Mapa"
      });

      this.$store
        .dispatch("reporte/fetchMapImage", "a3")
        .then(oMapImage => {
          this.pdfPage(oMapImage).then(pdf => {
            pdf.save(`Mapa ${reporteStore.description}.pdf`);
            this.$store.dispatch("Loading/STOP");
          });
        })
        .catch(err => {
          this.$store.dispatch("Loading/STOP");
        });
    }
  }
};
</script>

<style>
.map-container {
  width: 100%;
  height: 100%;
  position: relative;
}
.map-container .download-button {
  z-index: 300;
  width: 100%;
  text-align: center;
  position: absolute;
}

.map-container .map {
  width: 100%;
  height: 100%;
  position: absolute;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
