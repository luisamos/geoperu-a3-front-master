<template>
  <div class="page">
    <SearchMap
      ref="searchbar"
      @keydown.native.esc="showSearchBar(false)"
      class="search-bar"
      v-show="searchBarVisible"
      searchurl="https://visor.geoperu.gob.pe/api/geoperu-proyectos/busquedaProyecto?texto="
      @close="showSearchBar(false)"
      @selected="selected"
      message=""
    />

    <div
      :class="{ ficha: true, blur: isBlur, 'always-middle-screen': true }"
      id="reporte"
    >
    <div v-show="isNotFound">
      <Section>
      <SectionTitle :text="msg" />
      <button
          @click="genPdf"
          data-html2canvas-ignore
          class="btn r-btn no-print pull-right"
          style="font-size:24px;background-color:transparent;color:#db5e5e;"
          :disabled="$store.getters['Loading/isLoading']"
        >
          <i class="far fa-file-pdf"></i>
        </button>
        <button
          @click="print"
          data-html2canvas-ignore
          class="btn r-btn no-print pull-right"
          data-toggle="tooltip"
          data-placement="right"
          style="font-size:24px;background-color:transparent;color:gray;"
        >
          <i class="fa fa-print"></i>
        </button>
        <button
          @click="showSearchBar"
          data-html2canvas-ignore
          class="btn r-btn no-print pull-right"
          style="font-size:24px;background-color:transparent;color:#193D74;"
          :disabled="$store.getters['Loading/isLoading']"
        >
          <i class="fa fa-search"></i>
        </button>
      </Section>
    </div>
    <div v-show="!isNotFound">
      <Section>
        <SectionTitle text="DATOS DEL PROYECTO" />
        <button
          @click="genPdf"
          data-html2canvas-ignore
          class="btn r-btn no-print pull-right"
          style="font-size:24px;background-color:transparent;color:#db5e5e;"
          :disabled="$store.getters['Loading/isLoading']"
        >
          <i class="far fa-file-pdf"></i>
        </button>
        <button
          @click="print"
          data-html2canvas-ignore
          class="btn r-btn no-print pull-right"
          data-toggle="tooltip"
          data-placement="right"
          style="font-size:24px;background-color:transparent;color:gray;"
        >
          <i class="fa fa-print"></i>
        </button>
        <button
          @click="showSearchBar"
          data-html2canvas-ignore
          class="btn r-btn no-print pull-right"
          style="font-size:24px;background-color:transparent;color:#193D74;"
          :disabled="$store.getters['Loading/isLoading']"
        >
          <i class="fa fa-search"></i>
        </button>
        <div class="form-group">
          <FormTitle title="Nombre:" />
          <FormText style="min-height: 100px;" :text="dataModel.nombre" />
        </div>
        <div style="display:flex; flex-direction: row">
          <div style="width:50%; padding-right:20px;">
            <div class="form-group" style="display: flex;">
              <FormTitle title="Código Único de Proyecto:" />
              <FormText :text="dataModel.codigounico" />
            </div>
            <div class="form-group" style="display: flex;">
              <FormTitle title="Código SNIP:" />
              <FormText :text="dataModel.snip" />
            </div>
            <div class="form-group" style="display: flex;">
              <FormTitle title="Tipo de inversión:" />
              <FormText :text="dataModel.destipoformato" />
            </div>
            <div class="form-group" style="display: flex;">
              <FormTitle title="Modalidad de ejecución:" />
              <FormText :text="dataModel.modalidadejecucion" />
            </div>
            <div class="form-group" style="display: flex;">
              <FormTitle title="Unidad ejecutora:" />
              <FormText :text="dataModel.ejecutora" />
            </div>
            <div class="form-group" style="display: flex;">
              <FormTitle title="Beneficiarios:" />
              <FormText :text="dataModel.beneficiario" />
            </div>
            <div class="form-group" style="display: flex;">
              <FormTitle title="Registro de cierre:" />
              <FormText :text="dataModel.coninformecierre" />
            </div>
          </div>
          <div style="width:50%">
            <FormTitle title="Localización geográfica del proyecto:" />
            <br /><br />
            <client-only>
              <Map ref="cmap" />
            </client-only>
          </div>
        </div>
      </Section>
      <br />
      <Section>
        <Table :header="['Departamento', 'Provincia', 'Distrito']" :lista="dataModel.localizacion" />
      </Section>

      <br>

      <Section>
        <SectionTitle text="EJECUCIÓN DE LA INVERSIÓN" />
          <div
            style="display: flex;flex-direction: row;align-content: space-between;align-items: center;"
          >
            <div style="display: flex;flex-basis: 30%;">
              <FormTitle title="Inicio:" />
              <FormText :text="dataModel.feciniejec" />
            </div>
            <div style="display: flex;flex-basis: 30%;margin-left: 20px;">
              <FormTitle title="Culminación: " />
              <FormText :text="dataModel.fecfinejec" />
            </div>
            </div>
        <br />
        <div class="form-group" style="display: flex;">
          <FormTitle title="Situación:" style="flex-basis: 12%;" />
          <FormText
            style="min-height: 80px;min-height: 80px;flex-basis: 88%;"
            :text="dataModel.ultestadosituacional"
          />
        </div>
      </Section>

      <br />

       <Section>
        <SectionTitle text="PROCEDIMIENTOS DE SELECCIÓN" />
            <Table 
              :header="[
                'Descripción del proceso',
                'Objeto Contractual',
                'Fecha de convocatoria',
                'Valor Referencial (S/.)',
                'Estado'
                ]" :lista="dataModel.seleccion" />
        
      </Section>
      
      <Section>
        <SectionTitle text="CONTRATACIONES" />

         <Table 
              :header="[
                'Descripción del proceso',
                'Contratista',
                'N° Contrato',
                'Fecha Suscripción',
                'Monto Contratado Total (S/.)'
                ]" :lista="dataModel.contratos" />
    
      </Section>

      <br />
      <Section>
        <SectionTitle text="EJECUCIÓN FINANCIERA" />
        <div style="display:flex;justify-content: space-between;">
          <div style="width: 50%; padding: 20px;">
            <div
              style="position:relative;min-height: 430px;padding: 40px;border: 1px solid #828282;box-sizing: border-box;border-radius: 4px;"
            >
              <div class="form-group" style="display: flex;">
                <FormTitle title="Costo actualizado: " />
                <FormText :text="dataModel.costoactualizado" />
              </div>
              <div class="form-group" style="display: flex;">
                <FormTitle title="Devengado acumulado: " />
                <FormText :text="dataModel.devacumulado" />
              </div>
              <div class="form-group" style="display: flex;">
                <FormTitle title="Primer devengado: " />
                <FormText :text="dataModel.mesanopridev" />
              </div>
              <div class="form-group" style="display: flex;">
                <FormTitle title="Último devengado: " />
                <FormText :text="dataModel.mesanoultdev" />
              </div>
              <div
                style="position: absolute; bottom: 40px;left:40px;right:40px;height: 128px;display:flex;padding: 10px;border: 1px solid #828282;box-sizing: border-box;border-radius: 4px;"
              >
                <div
                  style="display:flex;align-items:center;justify-content:center;padding: 2px;flex-basis: 30%;"
                >
                  <label class="text-center" style="font-size:22px;">
                    <strong>% de avance acumulado</strong>
                  </label>
                </div>
                <div
                  style="display:flex; flex-direction: column;align-items:center;justify-content:center;flex-basis: 70%;"
                >
                  <GCircle
                    :valor="dataModel.avaacumulado"
                    style="flex-basis: 80%;display: flex;align-items: center;"
                  />
                </div>
              </div>
            </div>
          </div>
          <div style="width: 50%; padding: 20px;">
            <div
              style="position:relative;min-height: 430px;padding: 40px;border: 1px solid #828282;box-sizing: border-box;border-radius: 4px;"
            >
              <div class="form-group" style="display: flex;">
                <FormTitle title="PIM 2023 (a): " />
                <FormText :text="dataModel.pimanovigente" />
              </div>
              <div class="form-group" style="display: flex;">
                <FormTitle title="Devengado 2023: " />
                <FormText :text="dataModel.devanovigente" />
              </div>
              <div class="form-group" style="display: flex;">
                <FormTitle title="Saldo actual: " />
                <FormText :text="dataModel.saldo" />
              </div>
              
              <div
                style="position: absolute; bottom: 40px;left:40px;right:40px;height: 128px;display:flex;padding: 10px;border: 1px solid #828282;box-sizing: border-box;border-radius: 4px;"
              >
                <div
                  style="display:flex;align-items:center;justify-content:center;padding: 2px;flex-basis: 30%;"
                >
                  <label class="text-center" style="font-size:22px;">
                    <strong>% de avance PIM 2023</strong>
                  </label>
                </div>
                <div
                  style="display:flex; flex-direction: column;align-items:center;justify-content:center;flex-basis: 70%;"
                >
                  <PresupuestoLegend
                    :tipo="trimestre"
                    style="flex-basis: 20%;"
                  />
                  <GCircle
                    :valor="dataModel.avavigente"
                    :legendClass="trimestre"
                    style="flex-basis: 80%;display: flex;align-items: center;"
                  />
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </Section>

      <br />
      <Section>
        <div style="display:flex;justify-content: space-between;">
          <div style="width: 50%; padding: 20px;">
            <AcumuladoFinanciero ref="chartAcuFinan" :data="dataModel.resumenacu" />
          </div>
          <div style="width: 50%; padding: 20px;">
            <HistoricoFinanciero ref="chartHistoFinan" :data="dataModel.histofinan"/>
          </div>
        </div>
      </Section>
    </div>
    </div>
  </div>
</template>

<style scoped>
.blur {
  -webkit-filter: blur(3px);
  -moz-filter: blur(3px);
  -o-filter: blur(3px);
  -ms-filter: blur(3px);
  filter: blur(3px);
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
.form-label {
  font-family: "Roboto";
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  /* or 125% */

  display: flex;
  align-items: center;

  /* Gray 1 */

  color: #333333;
}

.form-value {
  background-color: #d5e0eb;
  width: 100%;
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
  top: 5%; /* position the top  edge of the element at the middle of the parent */
  left: 50%; /* position the left edge of the element at the middle of the parent */
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

<script>
import html2canvas from "html2canvas";
import Section from "~/components/Ficha/Section";
import GCircle from "~/components/Ficha/Circle";
import SectionTitle from "~/components/Ficha/SectionTitle";
//import FormGroup from "~/components/Ficha/FormGroup";

import FormTitle from "~/components/Ficha/FormGroup/FormTitle";
import FormText from "~/components/Ficha/FormGroup/FormText";
import SearchMap from "~/components/Ficha/SearchMap";
import PresupuestoLegend from "~/components/Ficha/PresupuestoLegend";
import AcumuladoFinanciero from "~/components/Ficha/AcumuladoFinanciero";
import HistoricoFinanciero from "~/components/Ficha/HistoricoFinanciero";
import Table from "~/components/Ficha/Table";
import formatSvgThenScreenShot from "~/mixins/ScreenShot";

export default {
  layout: "ficha",
  data() {
    return {
      SEARCH_ENDPOINT:
        "https://visor.geoperu.gob.pe/api/geoperu-proyectos/busquedaProyecto?texto=",

      searchBarVisible: false,
      isBlur: true,
      dataModel: {
        fecfinejec: "-",
        avavigente: 0.0,
        ejecutora: "-",
        snip: "-",
        costoactualizado: "-",
        ultestadosituacional: "",
        feciniejec: "-",
        modalidadejecucion: "-",
        geojson: {},
        coninformecierre: "-",
        codigounico: "-",
        mesanopridev: "-",
        localizacion: [],
        beneficiario: "-",
        devanovigente: "-",
        devacumulado: "-",
        mesanoultdev: "-",
        destipoformato: "-",
        seleccion: [],
        contratos: [],
        histofinan: [],
        resumenacu: [
          {
            mto_via: 0.0,
            cos_act: 0.0,
            dev_acu: 0.0
          }
        ],
        nombre: "-",
        avaacumulado: 0.0,
        saldo: "-",
        pimanovigente: "-"
      },
      codigo: "",
      generatingPdf: 0,
      pdfOptions: {
        page: "a4",
        margin: "0.5", //cm
        orientation: "p"
      },
      isNotFound: false, //s
      msg: ''
    };
  },
  computed: {
    /**
     * returns Integer
     */
    trimestre() {
      var d = new Date(); // If no date supplied, use today
      var q = [1, 2, 3, 4];
      return q[Math.floor(d.getMonth() / 3)] - 1;
    }
  },
  mounted() {
    this.codigo = this.$route.query.proyecto;
    this.getInfo();
  },
  methods: {
    selected: function(data) {
      const path = `${this.$route.path}?proyecto=` + data.codigounico;
      this.codigo = data.codigounico;
      this.$router.push(path);
      this.showSearchBar(false);
      this.getInfo();
    },
    getInfo: function() {
      if (this.codigo) {
        this.getData(
          "https://visor.geoperu.gob.pe/api/geoperu-proyectos/dataProyecto",
          { codigo: this.codigo }
        );
      } else {
        this.showSearchBar();
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

          //convert SVG into a XML string
          let xml = new XMLSerializer().serializeToString(this);

          // Removing the name space as IE throws an error
          xml = xml.replace(/xmlns=\"http:\/\/www\.w3\.org\/2000\/svg\"/, "");

          //draw the SVG onto a canvas
          //canvg(canvas, xml);

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

        // onclone: function(document) {
        //     $(document).find(elementsToIgnore).remove(); //works
        //     $('<p>TEST</p>').insertAfter($(document)); //doesn't work!
        // }

        let reportPDF = html2canvas(SCREENSHOT_ELEMENT, {
          scale: 1.5,
          x: 0, // this are our custom x y properties
          y: 0,
          allowTaint: false,
          backgroundColor: null,
          useCORS: true,
          onclone: function(clonedDoc) {
            let ele = clonedDoc.getElementById("reporte");
            $(ele).css("padding", "0px");
            $(ele).css("border", "none");
            $(ele).removeClass("always-middle-screen");
            //$(ele).css("transform", "scale(1)");
            //ele.style.transform = "scale(1)";
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
            //saveAs(blob, 'screenshot_'+ moment().format('YYYYMMDD_HHmmss')+'.png');
          });
          return canvas.toDataURL("image/png", 1.0);
        });

        resolve(reportPDF);
      });
    },
    getData: async function(url, data) {
      this.$store.dispatch("Loading/START", {
        tipo: "Overlay",
        text: `Cargando...`
      });
      this.isBlur = true;
      this.isNotFound = false;
      await fetch(url + "?codigo=" + data.codigo, {
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
          if (data.succes) {
            this.dataModel = data.data;
            this.isBlur = false;
            this.dataModel.localizacion = this.dataModel.localizacion.map(row =>
              Object.values(row)
            );

            this.dataModel.contratos = this.dataModel.contratos.map(row => [
              row.descripcionproceso,
              row.ganador,
              row.numcontrato,
              row.fechasuscripcioncontrato,
              row.montocontratadototal
            ]);
            this.dataModel.seleccion = this.dataModel.seleccion.map(row => [
              row.descripcion_proceso,
              row.objetocontractual,
              row.fecha_convocatoria,
              row.monto_ref_total,
              row.estadoitem
            ]);
            //this.dataModel. = this.dataModel.localizacion.map(row => Object.values(row))

            this.$refs.cmap.setGeojson(
              {
                radius: 8,
                fillColor: "#ff7800",
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
              },
              data.data.geojson
            );
          } else if (data.succes === false && data.error_code === '404'){
            this.isNotFound = true;
            this.isBlur = false;
            this.msg=data.msg
          } else {
            this.showSearchBar();
          }
        })
        .catch(error => {
          this.showSearchBar();
        });

      this.$refs["chartAcuFinan"].refresh();
      this.$refs["chartHistoFinan"].refresh();
      this.$store.dispatch("Loading/STOP");
    },
    isLoading: function() {},
    imageToPdf: function(
      imgDataUri,
      page = "a3",
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

        return pdf; //.save(`${outputName}.pdf`)
      }
    },
    print() {
      window.print();
    },
    genPdf() {
      this.$store.dispatch("Loading/START", {
        tipo: "Overlay",
        text: `Cargando`
      });
      //this.gaEvent("send", "event", "Reporte", "pdf", this.$route.params.id);

      const svgElements = $("#reporte").find(".svg-icon");
      const mainElement = document.querySelector("#reporte");

      this.formatSvgThenScreenShot(svgElements, mainElement).then(
        screenshot => {
          this.imageToPdf(
            screenshot,
            this.pdfOptions.page,
            this.pdfOptions.margin,
            this.pdfOptions.orientation
          ).save(`Ficha Proyecto.pdf`);
          this.$store.dispatch("Loading/STOP");
        }
      );
    },
    showSearchBar: function(show = true) {
      if (!show && this.codigo === undefined) {
        this.isBlur = true;
        this.searchBarVisible = true;
        this.$refs.searchbar.$refs.input.focus();
        console.log(this.$refs.searchbar.$refs.input.focus());
      } else {
        this.isBlur = show;
        this.searchBarVisible = show;
        this.$refs.searchbar.$refs.input.focus();
        console.log(this.$refs.searchbar.$refs.input.focus());
      }
    }
  },
  components: {
    Table,
    Section,
    PresupuestoLegend,
    SectionTitle,
    FormTitle,
    SearchMap,
    FormText,
    GCircle,
    AcumuladoFinanciero,
    HistoricoFinanciero,
    Map: () => (process.client ? import("~/components/Ficha/Map") : undefined)
  }
};
</script>