<template>
  <div
    class="map-container"
    @mouseover="downloadButtonActive=true"
    @mouseleave="downloadButtonActive=false"
  >
    <transition name="fade" v-if="!reporteStore.isMancomunidad">
      <div class="download-button" v-show="downloadButtonActive">
        <button class="btn btn-danger" @click="getPdfMap()" :disabled="loadingStore.isLoading">Descargar mapa</button>
      </div>
    </transition>
    <div class="map" id="map" @dblclick="zoomo"></div>
  </div>
</template>

<script>
import Highcharts from "~/lib/highmaps.js";
import pdfPage from "~/mixins/PDFPrint.js";
import { useReporteStore } from '~/stores/reporte'
import { useLoadingStore } from '~/stores/loading'


export default {
  mixins: [pdfPage],
  setup() {
    const reporteStore = useReporteStore()
    const loadingStore = useLoadingStore()
    return { reporteStore, loadingStore }
  },
  data() {
    return {
      data: null,
      downloadButtonActive: false,
      superficie: null,
      selected: null,
      densidad: null,
      name: null,
      tituloCapital: 'Capital'
    };
  },
  created() {
    this.data = this.reporteStore.results.geojson[0];
    this.superficie = this.reporteStore.results.ejecutora[0].superficie;

    this.selected =
        this.reporteStore.tipo === "prov"
        ? this.reporteStore.results.ejecutoraProv[0].ubigeo.substring(0, 4)
        : this.reporteStore.tipo === "dpto"
        ? this.reporteStore.results.ejecutoraProv[0].ubigeo.substring(0, 2)
        : this.reporteStore.results.ejecutora[0].ubigeo;

    if(this.reporteStore.tipo === "dist"){
      this.densidad = this.reporteStore.results.censo2017.filter(
        obj => obj.cat === "Distrito"
      )[0].pob_total / parseFloat(this.superficie);
    } else if (this.reporteStore.tipo === "prov") {
      this.densidad = this.reporteStore.results.censo2017.filter(
        obj => obj.cat === "Provincia"
      )[0].pob_total / parseFloat(this.superficie);
    } else {
      this.densidad = this.reporteStore.results.ejecutora[0].densidad
    }


  },
  mounted() {
    var color;
    var name;
    var capitalColor;
    var capitalBorder = 0.5;

    if (this.reporteStore.tipo === "prov") {
      color = "#617ab6";
      name = "Provincia";
      capitalColor = "#30cd58";
    } else if (this.reporteStore.isMancomunidad) {
      capitalColor = "#ffffff";
      capitalBorder=0;
    } else {
      color = "#179aff";
      name = "Distrito";
      capitalColor = "#30cd58";
    }

    var densidad = this.densidad;
    // Instantiate the map
    var gson = this.data


    /*var topodata =

    // Convert the topoJSON feature into geoJSON
    var geojson = topojson.feature(
      topodata,
      // For this demo, get the first of the named objects
      topodata.objects[Object.keys(topodata.objects)]
    );

    geojson['crs'] = { "type": "name", "properties": { "name": "EPSG:4326" } }
    console.log(geojson)
    const data = geojson;*/

    var states = Highcharts.geojson(gson, "map");
    var cities = Highcharts.geojson(gson, "mappoint");

    let selected = [{c:this.selected}]

    if (this.reporteStore.tipo === "dpto"){
      selected.push({ c: '1508' },{ c: '1502' },{ c: '1503' },{ c: '1504' },{ c: '1505' },{ c: '1506' },{ c: '1507' },{ c: '1508' },{ c: '1509' },{ c: '1510' })
    }

    if (this.reporteStore.tipo === "dpto" && this.reporteStore.isMancomunidad){
      selected = [{ c: '03' },{ c: '05' },{ c: '09' },{ c: '11' },{ c: '12' }]
      this.tituloCapital = ""
    }

    if (this.reporteStore.isRegion && this.reporteStore.requestCode==='150801'){
      this.tituloCapital = "Sede Administrativa"
    }




    var chart = Highcharts.mapChart({
      chart: {
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
          enableMouseTracking: false,
          states: {
            /*hover: {
                    color: Highcharts.getOptions().colors[4]
                },*/
            /*select: {
              color: '#EFFFEF',
                    borderColor: 'black',
                    dashStyle: 'dot'
            }*/
          },
          /*dataLabels: {
                enabled: true,
                format: '{point.c}',
                style: {
                    width: '80px' // force line-wrap
                }
            },*/
          tooltip: {
            pointFormat: "{point.c}"
          }
        },
        {
          name: this.tituloCapital,
          type: "mappoint",
          data: cities,
          color: capitalColor,
          marker: {
            radius: 3.5,
            lineColor: 'black',
            lineWidth: capitalBorder
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

      tooltip: false
      /*tooltip: {
        hideDelay: 600,
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
        formatter: () => {
          return `<strong><button class="btn btn-danger" id="downloadMap" onclick="console.log($nuxt)"> Descarga el Mapa </button></strong>`;
        }
      }*/
    });

    //mapChart.mapZoom(1)
    /*var mapChart=$('#mapContainer').highcharts(); //get map chart object from DOM
    mapChart.get(this.selected).zoomTo(); //zoom to the country using "id" from data serie
    mapChart.mapZoom(5); //elevate viewpoint a little to see surrounding countries as well*/
  },
  methods: {
    getPdfMap() {
      this.loadingStore.start({ tipo:'Notif', text: "Obteniendo Mapa"} );

      this.reporteStore
        .fetchMapImage("a3")
        .then(MapLocation => {
          let docName = `Mapa ${this.reporteStore.description}.pdf`
          this.pdfMapDownload(MapLocation.data, docName).then(pdf => {
            this.loadingStore.stop();
          });
          this.gaEvent(
            "send",
            "event",
            "Reporte",
            "imprimirmapa",
            this.$route.params.id
          );
        })
        .catch(err => {
          this.loadingStore.stop();
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
.fade-enter-from, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
