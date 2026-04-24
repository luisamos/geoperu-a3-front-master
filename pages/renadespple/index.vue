<template>
  <div class="page">
    
    <div
      :class="{ blur: isBlur, 'always-middle-screen': true }"
      id="reporte"
    >
        <div class="header">
            <LogoSegdi class="header__logo" style="width: auto;"/>
            <div class="header__title">
                RENADESPPLE - {{anio}}
                
            </div>
            <div class="header__options no-print" data-html2canvas-ignore>
                 <div class="no-print">
                    <label for="sAnio">Periodo: </label>
                    <select name="sAnio" v-model="anio" @change="getInfo()">
                        <option v-for="(ani,index) in ddlAnios" :key="index" :value="ani.value" :selected="ani.selected">{{ani.label}}</option>
                    </select>
                </div>
              
                 <button
                @click="genPdf"
                data-html2canvas-ignore
                class="btn r-btn no-print"
                style="font-size:24px;background-color:transparent;color:#db5e5e;"
                :disabled="$store.getters['Loading/isLoading']"
                >
                <i class="far fa-file-pdf"></i>
                </button>
            </div>
        </div>
        <Metric ref="chartDetenciones" :data="dataModel.nro_detenciones" class="detenciones"/>
        <HistoryChart ref="chartHistorico" :data="dataModel.historico" class="historico"/>
        <Metric ref="chartEdad" :data="dataModel.edad_promedio" class="edad-promedio"/>
        <SlicedChart ref="chartGenero" :data="dataModel.genero" class="genero"/>
        <SlicedChart ref="chartPais" :data="dataModel.pais_nacimiento" class="pais-nacimiento"/>
        <SlicedChart ref="chartMotivo" :data="dataModel.motivo_detencion" class="motivo-detencion"/>
        <SlicedChart ref="chartSituacion" :data="dataModel.situacion_procesal" class="situacion-procesal"/>
        <Table block ref="chartDistribucionDetenciones" :data="dataModel.distribucion_detenciones" class="distribucion-detenciones"/>
        <Table ref="chartDistribucionDelitos" :data="dataModel.distribucion_delitos" class="distribucion-delitos"/>
    </div>
  </div>
</template>

<script>
import html2canvas from "html2canvas";
import Header from "~/components/Renadespple/Header";
import Metric from "~/components/Renadespple/Metric";
import SearchMap from "~/components/Renadespple/SearchMap";
import Table from "~/components/Renadespple/Table";
import HistoryChart from "~/components/Renadespple/HistoryChart";
import SlicedChart from "~/components/Renadespple/SlicedChart";
import LogoMapea from "~/components/LogoMapea";
import LogoSegdi from "~/components/LogoSegdi";
import formatSvgThenScreenShot from "~/mixins/ScreenShot";
import { RENADESPPLE_URL } from "~/endpoints";

export default {
  layout: "ficha",
  data() {
    return {
      SEARCH_ENDPOINT:
        "https://visor.geoperu.gob.pe/api/geoperu-proyectos/busquedaProyecto?texto=",
      searchBarVisible: false,
      isBlur: true,
      dataModel: {
          nro_detenciones: {
              title: "N° Detenciones:",
              serie: 0
          },
          edad_promedio: {
              title: "Edad promedio:",
              serie: 0
          },
          historico: {
            title: "",
              series: [
                  
                ],
              categories: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
          },
          genero: {
              title: "Género",
              series: [
                
              ]
              
          },
          pais_nacimiento: {
              title: "País de Nacimiento:",
              series: [
                
              ]
          },
          motivo_detencion: {
              title: "Motivo Detención (PNP):",
              series: [
                
              ]
          },
          situacion_procesal: {
              title: "Situación Procesal (MP):",
              series: [
                
              ]
          },
          distribucion_detenciones: {
              title: "Distribución de detenciones según departamento",
              series: [
                  
                ],
          },
          distribucion_delitos: {
              title: "Distribución de delitos, tipificados por el Ministerio Público:",
              series: [
                ],
          }
      },
      ubigeo: "",
      anio: "",
      ddlAnios: [],
      generatingPdf: 0,
      pdfOptions: {
        page: "a4",
        margin: "0.5",
        orientation: "l"
      }
    };
  },
  computed: {
  },
  mounted() {
    this.ubigeo = this.$route.query.ubigeo;
    this.anio = this.$route.query.anio;
    this.getInfo();
  },
  methods: {
    getInfo: function() {
      if (this.ubigeo) {
        const path = `${this.$route.path}?ubigeo=${this.ubigeo}&anio=${this.anio}`;
        this.$router.push(path);
        this.getData(this.ubigeo, this.anio);
      }
    },
    formatSvgThenScreenShot: function(SVG_ELEM, SCREENSHOT_ELEMENT) {
      if (process.browser) {
        var canvg = require("canvg");
      }
      return new Promise((resolve, reject) => {
        let nodesToRecover = [];
        let nodesToRemove = [];

        let svgElem = SVG_ELEM;

        svgElem.each(function(index, node) {
          let parentNode = node.parentNode;
          let svg = parentNode.innerHTML;

          let canvas = document.createElement("canvas");

          let xml = new XMLSerializer().serializeToString(this);

          xml = xml.replace(/xmlns="http:\/\/www\.w3\.org\/2000\/svg"/, "");

          canvg(canvas, xml, { ignoreMouse: true, ignoreAnimation: true });

          nodesToRecover.push({
            parent: parentNode,
            child: node
          });
          parentNode.removeChild(node);

          nodesToRemove.push({
            parent: parentNode,
            child: canvas
          });

          parentNode.appendChild(canvas);
        });

        let reportPDF = html2canvas(SCREENSHOT_ELEMENT, {
          scale: 1.5,
          x: 0,
          y: 0,
          allowTaint: false,
          backgroundColor: null,
          useCORS: true,
          onclone: function(clonedDoc) {
            let ele = clonedDoc.getElementById("reporte");
            $(ele).css("padding", "0px");
            $(ele).css("border", "none");
            $(ele).removeClass("always-middle-screen");
          }
        }).then(canvas => {
          let ctx = canvas.getContext("2d");

          canvas.toBlob(function(blob) {
            nodesToRemove.forEach(function(pair) {
              pair.parent.removeChild(pair.child);
            });

            nodesToRecover.forEach(function(pair) {
              pair.parent.appendChild(pair.child);
            });
          });
          return canvas.toDataURL("image/png", 1.0);
        });

        resolve(reportPDF);
      });
    },
    getData: async function(ubigeo, anio) {
      this.$store.dispatch("Loading/START", {
        tipo: "Overlay",
        text: `Cargando...`
      });
      this.isBlur = true;
      const url = `${RENADESPPLE_URL}/datos/${ubigeo}?anio=${anio}`;
      await fetch(url, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json"
        },
        redirect: "follow",
        referrerPolicy: "no-referrer"
      })
        .then(response => response.json())
        .then(data => {
            this.dataModel = data;
            this.ddlAnios = data.anios;
            this.isBlur = false;
          
        })
        .catch(error => {
          
        });

        this.$refs["chartHistorico"].refresh();
        this.$refs["chartGenero"].refresh();
        this.$refs["chartPais"].refresh();
        this.$refs["chartMotivo"].refresh();
        this.$refs["chartSituacion"].refresh();
      
      this.$store.dispatch("Loading/STOP");
    },
    imageToPdf: function(
      imgDataUri,
      page = "a4",
      margin = "0.5",
      orientation = "l"
    ) {
      if (process.browser) {
        const jsPDF = require("jspdf");

        let options = {
          page: page,
          margin: margin,
          orientation: orientation
        };
        let pdf = new jsPDF(options.orientation, "cm", options.page, true);

        pdf.addImage(
          imgDataUri,
          "PNG",
          parseFloat(options.margin),
          parseFloat(options.margin),
          pdf.internal.pageSize.getWidth() - parseFloat(options.margin * 2),
          pdf.internal.pageSize.getHeight() - parseFloat(options.margin * 2),
          "",
          "FAST"
        );

        return pdf;
      }
    },
    print() {
      window.print();
    },
    genPdf() {
      this.$store.dispatch("Loading/START", {
        tipo: "Overlay",
        text: `Generando Reporte`
      });

      const svgElements = $("#reporte").find(".svg-icon");
      const mainElement = document.querySelector("#reporte");

      this.formatSvgThenScreenShot(svgElements, mainElement).then(
        screenshot => {
          this.imageToPdf(
            screenshot,
            this.pdfOptions.page,
            this.pdfOptions.margin,
            this.pdfOptions.orientation
          ).save(`Seguridad Ciudadana.pdf`);
          this.$store.dispatch("Loading/STOP");
        }
      );
    }
  },
  components: {
    Table,
    SearchMap,
    Map: () => (process.client ? import("~/components/Ficha/Map") : undefined),
    Metric,
    HistoryChart,
    LogoMapea,
    LogoSegdi,
    SlicedChart
  }
};
</script>


<style scoped>
#reporte {
    display: grid;
    grid-template-rows: 60px 100px 100px 220px auto;  
    grid-template-columns: 1fr 1fr 1fr 1fr; 
    row-gap: 10px;
    column-gap: 8px;
    grid-template-areas:
        "header header header header"
        "detenciones historico historico historico"
        "edad-promedio historico historico historico"
        "genero pais-nacimiento motivo-detencion situacion-procesal"
        "distribucion-detenciones distribucion-delitos"
}

.header {
    display: grid;
    align-items: center;
    grid-column: span 4;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas:
        "header__logo header__title header__options"
}

.header__title {
    font-size: 24px;
    font-weight: 700;
    text-align: center;
}
.header__options {
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
.historico {
    grid-column: span 3;
    grid-row: span 2;
}

.distribucion-delitos {
  grid-column: span 3;
}

.blur {
  -webkit-filter: blur(6px);
  -moz-filter: blur(6px);
  -o-filter: blur(6px);
  -ms-filter: blur(6px);
  filter: blur(6px);
  width: 100px;
  height: 0.2px;
  transition: all 1s ease;
  background-color: transparent;
  pointer-events: none;
  user-select: none;
}

.page {
  -webkit-print-color-adjust: exact !important;
  justify-content: center;
  width: 100%;
  min-width: 1200px;
  transition: all 1s ease;
  font-family: "Roboto" !important;
}

#reporte {
  border: 1px dashed black;
  width: 100%;
  max-width: 1200px;
  padding: 5mm;
}

.search-bar {
  position: absolute;
  z-index: 9999;
  top: 5%;
  left: 50%;
  width: 60vw;
  max-width: 800px;
  transform: translate(-50%, -50%);
}

.always-middle-screen {
  margin: auto;
}

@media print {
  #reporte {
    border: none;
    padding: 0;
    max-width: 1065px;
    margin: 0px !important;
  }
}
</style>
