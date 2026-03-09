<template>
  <div>

    <div id="loading" v-if="!showReport">
      <ClientOnly>
        <LoadingGif />
      </ClientOnly>
    </div>
    <div id="page-a3" v-if="showReport">
      <ClientOnly>
        <!-- Section 1 -->
        <section-v :borderStyle="['none', 'dashed', 'none','none']">
          <section-h style="height:5.55%;padding-top:1%;">
            <LogoSegdi style="float:left;height:77px;width:590px;" />
            <LogoMapea type="red" style="float:right;height:70px;	width: 149px;" />
          </section-h>

          <section-h style="height: 28.57%;width:100%;">
            <div style="height:100%;width:59%;float:left;">
              <ReporteMap />
            </div>
            <div style="height:100%;width:41%;float:left;">
              <div style="height:45%;width:100%">
                <Zona />
              </div>
              <div style="height:55%;width:100%">
                <Poblacion />
              </div>
            </div>
          </section-h>

          <section-h style="height: 5.44%;width: 100%;">
            <div style="width:100%;height:100%">
              <ProyeccionPoblacion />
            </div>
          </section-h>

          <section-h style="height:15%;width:100%;">
            <div style="height:100%;width:33%;float:left">
              <PobrezaNoMonetaria />
            </div>
            <div style="height:100%;width:65.6%;float:left;margin-left:10px;">
              <AguaSaneamiento />
            </div>
          </section-h>

          <section-h style="height:27%;width:100%;">
            <div style="height:100%;width:100%;float:left">
              <Salud />
            </div>
          </section-h>

          <section-h style="height:15%;width:100%;">
            <BrechaDigital />
            <div
              style="vertical-align: middle;padding-top: 6px;padding-left:6px;color:rgb(147, 57, 27);"
            >
              <label>Elaborado por equipo técnico de GEO PERÚ</label>
            </div>
          </section-h>
        </section-v>
        <!-- #end Section 1 -->

        <!-- Section 2 -->
        <section-v :padding="[0, 0, 0, 4]">
          <section-h
            style="border-radius:5px 0px 0px 5px;background-color:rgb(246, 246, 246);height:45%;width:100%;padding:6px 0px 6px 6px;"
          >
            <div
              style="width:100%;height:48%;background-color:#ebf3ff;border-radius:5px 0 0 5px;margin-bottom:1%;"
            >
              <div style="width:100%;height:10%;text-align:right;">
                <label style="font-size: 20px;margin-right:2px;" v-if="reporteStore.tipo !== 'dpto'" >Presupuesto de la Municipalidad</label>
                <label style="font-size: 20px;margin-right:2px;" v-else-if="!reporteStore.isMancomunidad && reporteStore.tipo === 'dpto' && reporteStore.results.ejecutora[0].ubigeo === '26'" >Presupuesto de la MUNICIPALIDAD</label>
                <label style="font-size: 20px;margin-right:2px;" v-else-if="reporteStore.isMancomunidad" >Presupuesto de la MANCOMUNIDAD</label>
                <label style="font-size: 20px;margin-right:2px;" v-else>Presupuesto del GOBIERNO REGIONAL</label>
              </div>
              <div style="width:100%;height:5%;">
                <PresupuestoLegend :tipo="3" />
              </div>
              <div style="width:50%;height:85%;float:left;">
                <VerticalBarChart
                  :data="reporteStore.results.ejecucion.filter((obj)=>obj.ano_eje ==='2021')[0]"
                  :legendClass="3"
                  :legendColor="3"
                />
              </div>
              <div style="width:50%;height:85%;float:left;">
                <VerticalBarChart
                  :data="reporteStore.results.ejecucion.filter((obj)=>obj.ano_eje ==='2022')[0]"
                  :legendClass="3"
                  :legendColor="3"
                />
              </div>
            </div>
            <div style="width:100%;height:48%;background-color:#ebf3ff;border-radius:5px 0 0 5px">
              <div style="width:100%;height:10%;text-align:right;">
                <label
                  v-if="reporteStore.results.ejecutora[0].ubigeo.substring(4,6) === '01' && reporteStore.tipo != 'dpto'"
                  style="font-size: 20px;margin-right:2px;"
                >Presupuesto de las Municipalidades</label>
                <label
                  v-if="reporteStore.results.ejecutora[0].ubigeo.substring(4,6) !== '01' && reporteStore.tipo != 'dpto'"
                  style="font-size: 20px;margin-right:2px;"
                >Presupuesto de la Municipalidad</label>
                 <label
                  v-if="reporteStore.isMancomunidad"
                  style="font-size: 20px;margin-right:2px;"
                >Presupuesto de los Gobiernos Regionales</label>
                <label
                  v-if="reporteStore.tipo === 'dpto' && reporteStore.isMancomunidad === false"
                  style="font-size: 20px;margin-right:2px;"
                >Presupuesto de las Municipalidades Provinciales y Distritales</label>
              </div>
              <div style="width:100%;height:%5;">
                <PresupuestoLegend :tipo="3" />
              </div>
              <div style="width:50%;height:85%;float:left;">
                <VerticalBarChart
                  :data="reporteStore.results.ejecuciontotal.filter((obj)=>obj.ano_eje ==='2021')[0]"
                  :legendClass="3"
                  :legendColor="3"
                />
              </div>
              <div style="width:50%;height:85%;float:left;">
                <VerticalBarChart
                  :data="reporteStore.results.ejecuciontotal.filter((obj)=>obj.ano_eje ==='2022')[0]"
                  :legendClass="3"
                  :legendColor="3"
                />
              </div>
            </div>
            <Fuente
              style="height:3%;"
              :label="`Fuente: MEF - Consulta Amigable, actualización al <strong>${reporteStore.results.mef[0].fecha}</strong>`"
            />
          </section-h>
          <section-h style="height:53%;width:100%;">
            <PrincipalesIndicadores />
          </section-h>
        </section-v>

        <!-- #end Section 2 -->

        <!-- Section 3 -->
        <section-v :borderStyle="['none', 'none', 'none','dashed']" :padding="[0, 4, 0, 0]">
          <div
            style="float:right;text-align:center;position:absolute;right:42px;"
            data-html2canvas-ignore
            id="rpt-controls"
          >
            <div
              style="height:100%;line-height:18px;text-align:center;display:table;width:100%;font-size:18px;"
            >
              <div
                style="display:table-cell;vertical-align: middle;text-align:right;font-weight:600;"
              >
                <button
                  @click="showShare=!showShare"
                  class="btn r-btn no-print"
                  style="background-color:transparent;color:#009aff;"
                >
                  <img :src="STATIC_URL + 'fonts/icon-share.svg'" width="26px" />
                </button>
                <button
                  @click="showPdfModal=true"
                  class="btn r-btn no-print"
                  style="background-color:transparent;color:#db5e5e;"
                  :disabled="loadingStore.isLoading"
                >
                  <i class="far fa-file-pdf"></i>
                </button>
                <button
                  @click="printPage"
                  class="btn r-btn no-print"
                  data-toggle="tooltip"
                  data-placement="right"
                  style="background-color:transparent;color:gray;"
                >
                  <i class="fa fa-print"></i>
                </button>
              </div>
            </div>

            <SocialShare
              :url="currentUrl"
              :description="reporteStore.results ? reporteStore.description : ''"
              :visible="showShare"
            />

          </div>
          <section-h
            style="border-radius:0px 0px 5px 5px;background-color:rgb(246, 246, 246);height:45%;width:100%;padding:6px 6px 6px 0px;"
          >
            <div
              style="width:100%;height:48%;background-color:#ebf3ff;border-radius:0px 5px 5px 0px;margin-bottom:1%;"
            >
              <div style="width:100%;height:10%;text-align:left;">
                <label style="font-size: 20px;margin-left:2px;" v-if="reporteStore.tipo !== 'dpto'">
                  Provincial de
                  <span
                    v-text="reporteStore.results.ejecutora[0].nom_prov +', 2021-2023 (S/)'"
                  ></span>
                </label>
                <label style="font-size: 20px;margin-left:2px;" v-else-if="reporteStore.isMancomunidad">
                  REGIONAL DE LOS ANDES
                  <span
                    v-text="reporteStore.results.ejecutora[0].nom_prov +', 2021-2023 (S/)'"
                  ></span>
                </label>
                <label style="font-size: 20px;margin-left:2px;" v-else>
                  DE
                  <span
                    v-text="reporteStore.results.ejecutora[0].nom_dpto +', 2021-2023 (S/)'"
                  ></span>
                </label>
              </div>
              <div style="width:100%;height:5%;">
                <PresupuestoLegend :tipo="trimestre" />
              </div>
              <div style="width:80%;height:85%;margin:auto;">
                <VerticalBarChart
                  :data="reporteStore.results.ejecucion.filter((obj)=>obj.ano_eje ==='2023')[0]"
                  :legendClass="trimestre"
                  :legendColor="trimestre"
                />
              </div>
            </div>
            <div
              style="width:100%;height:48%;background-color:#ebf3ff;border-radius:0px 5px 5px 0px;"
            >
              <div style="width:100%;height:10%;text-align:left;">
                <label
                  v-if="reporteStore.results.ejecutora[0].ubigeo.substring(4,6) === '01' && reporteStore.tipo !== 'dpto'"
                  style="font-size: 20px;margin-left:2px;"
                >
                  Distritales de la provincia de
                  <span
                    v-text="reporteStore.results.ejecutora[0].nom_prov + ', 2021-2023 (S/)'"
                  ></span>
                </label>
                <label
                  v-if="reporteStore.results.ejecutora[0].ubigeo.substring(4,6) !== '01' && reporteStore.tipo !== 'dpto'"
                  style="font-size: 20px;margin-left:2px;"
                >
                  Distrital de
                  <span
                    v-text="reporteStore.results.ejecutora[0].nom_dist + ', 2021-2023 (S/)'"
                  ></span>
                </label>
                <label
                  v-if="reporteStore.isMancomunidad === false && reporteStore.tipo === 'dpto' && reporteStore.results.ejecutora[0].ubigeo !== '26'"
                  style="font-size: 20px;margin-left:2px;"
                >
                  del departamento de
                  <span
                    v-text="reporteStore.results.ejecutora[0].nom_dpto + ', 2021-2023 (S/)'"
                  ></span>
                </label>
                <label
                  v-if="reporteStore.isMancomunidad === false && reporteStore.tipo === 'dpto' && reporteStore.results.ejecutora[0].ubigeo == '26'"
                  style="font-size: 20px;margin-left:2px;"
                >
                  de la MUNICIPALIDAD DE
                  <span
                    v-text="'LIMA METROPOLITANA, 2021-2023 (S/)'"
                  ></span>
                </label>
                <label
                  v-else-if="reporteStore.isMancomunidad"
                  style="font-size: 20px;margin-left:2px;"
                >
                  de la MANCOMUNIDAD
                  <span
                    v-text="'REGIONAL DE LOS ANDES, 2021-2023 (S/)'"
                  ></span>
                </label>
              </div>
              <div style="width:100%;height:5%;">
                <PresupuestoLegend :tipo="trimestre" />
              </div>
              <div style="width:80%;height:85%;margin:auto;">
                <VerticalBarChart
                  :data="reporteStore.results.ejecuciontotal.filter((obj)=>obj.ano_eje ==='2023')[0]"
                  :legendClass="trimestre"
                  :legendColor="trimestre"
                />
              </div>
            </div>
            <Fuente
              style="height:4%;"
              :label="`<strong>Presupuesto:</strong> Presupuesto Institucional Modificado (PIM) <strong style='margin-left:40px;'>Ejecutado:</strong> Devengado`"
            />
          </section-h>
          <section-h style="height:47%;width:100%;padding:6px 6px 6px 2px;">
            <EjecucionPresupuestal />
          </section-h>
          <section-h style="height:5%;width:100%;padding:12px 6px 6px 2px;">
            <Adscrita />
            <br />
            <Enlace color="red" class="pull-right" />
          </section-h>
        </section-v>
        <!-- #end Section 3 -->

        <PdfOptionsModal
          :visible="showPdfModal"
          @close="showPdfModal=false"
          @generate="onGeneratePdf"
          data-html2canvas-ignore
        />
      </ClientOnly>
    </div>
  </div>
</template>

<script>
import { useReporteStore } from '~/stores/reporte'
import { useLoadingStore } from '~/stores/loading'
import SectionV from '~/components/reportea3/SectionV.vue'
import SectionH from '~/components/reportea3/SectionH.vue'
import LogoSegdi from '~/components/LogoSegdi.vue'
import LogoMapea from '~/components/LogoMapea.vue'
import ReporteMap from '~/components/reportea3/map.vue'
import Zona from '~/components/reportea3/zona.vue'
import Poblacion from '~/components/reportea3/poblacion.vue'
import ProyeccionPoblacion from '~/components/reportea3/proyeccionPoblacion.vue'
import PrincipalesIndicadores from '~/components/reportea3/PrincipalesIndicadores.vue'
import PresupuestoLegend from '~/components/reportea3/PresupuestoLegend.vue'
import EjecucionPresupuestal from '~/components/reportea3/EjecucionPresupuestal.vue'
import PobrezaNoMonetaria from '~/components/reportea3/PobrezaNoMonetaria.vue'
import AguaSaneamiento from '~/components/reportea3/AguaSaneamiento.vue'
import Salud from '~/components/reportea3/Salud.vue'
import BrechaDigital from '~/components/reportea3/BrechaDigital.vue'
import VerticalBarChart from '~/components/reportea3/VerticalBarChart.vue'
import Adscrita from '~/components/reportea3/Adscrita.vue'
import Enlace from '~/components/Enlace.vue'
import Fuente from '~/components/reportea3/Fuente.vue'
import LoadingGif from '~/components/reportea3/LoadingGif.vue'
import PdfOptionsModal from '~/components/PdfOptionsModal.vue'
import SocialShare from '~/components/SocialShare.vue'

import Ubigeo from '~/public/ubigeo.js'
import gaEvent from '~/mixins/GoogleAnalytics'
import formatSvgThenScreenShot from '~/mixins/ScreenShot'
import imageToPdf from '~/mixins/PDFPrint'

const STATIC_URL = '/'

export default {
  mixins: [gaEvent, formatSvgThenScreenShot, imageToPdf],
  components: {
    SectionV,
    SectionH,
    LogoSegdi,
    ReporteMap,
    Zona,
    Poblacion,
    ProyeccionPoblacion,
    PrincipalesIndicadores,
    PobrezaNoMonetaria,
    AguaSaneamiento,
    Salud,
    LoadingGif,
    PresupuestoLegend,
    EjecucionPresupuestal,
    LogoMapea,
    BrechaDigital,
    VerticalBarChart,
    Adscrita,
    Enlace,
    Fuente,
    PdfOptionsModal,
    SocialShare
  },
  setup() {
    definePageMeta({
      layout: 'reporte',
      validate: async (route) => {
        const id = route.params.id
        return Ubigeo.Ubigeo.some(obj => {
          if (
            id.indexOf(obj.cod_dist) !== -1 ||
            id.indexOf(obj.cod_prov) !== -1 ||
            id.indexOf(obj.cod_dpto) !== -1
          ) {
            return true
          }
        })
      }
    })

    useHead({
      title: 'Reporte',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Reporte | Brechas | Geo Perú'
        }
      ]
    })

    const reporteStore = useReporteStore()
    const loadingStore = useLoadingStore()
    const route = useRoute()

    return { reporteStore, loadingStore, route }
  },
  data() {
    return {
      STATIC_URL: STATIC_URL,
      showReport: false,
      showShare: false,
      showPdfModal: false,
      title: 'Reporte',
      description: 'Description',
      generatingPdf: 0,
      codigo: ''
    }
  },
  computed: {
    trimestre() {
      var d = new Date()
      var q = [1, 2, 3, 4]
      return q[Math.floor(d.getMonth() / 3)] - 1
    },
    currentUrl() {
      if (typeof window !== 'undefined') {
        return window.location.href
      }
      return ''
    }
  },
  mounted() {
    this.codigo = this.route.params.id
    this.getResults()
  },
  methods: {
    onGeneratePdf(page) {
      this.showPdfModal = false
      this.loadingStore.start({ tipo: 'Overlay', text: `Generando Reporte: ${this.reporteStore.description}` })
      this.gaEvent('send', 'event', 'Reporte', 'pdf', this.route.params.id)

      const svgElements = document.querySelectorAll('#page-a3 .svg-icon')
      const mainElement = document.querySelector('#page-a3')

      this.formatSvgThenScreenShot(svgElements, mainElement).then(screenshot => {
        this.imageToPdf(screenshot, page).save(`Reporte ${this.reporteStore.description}.pdf`)
        this.loadingStore.stop()
      })
    },
    back() {
      this.$router.go(-1)
    },
    printPage() {
      this.gaEvent(
        'send',
        'event',
        'Reporte',
        'imprimir',
        this.route.params.id
      )
      window.print()
    },
    getResults() {
      this.reporteStore
        .fetchApi(this.codigo)
        .then(() => {
          if (this.codigo == '151') {
            this.reporteStore.setIsRegion(true)
          } else if (this.codigo == 'M1') {
            this.reporteStore.setIsMancomunidad(true)
          }
          this.showReport = true
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style>
body {
  overflow-x: scroll;
}

#page-a3 {
  font-family: "Montserrat" !important;
  position: relative;
  top: 50%;
  margin: 0px auto;
  height: 1620px !important;
  width: 2340px !important;
}

@media print {
  #page-a3 {
    height: 1620px;
    width: 2330px;
  }
}

#page-a3 *:not(i) {
  font-family: "Montserrat" !important;
}

.cele * {
  color: #148cf9 !important;
}

.feedback {
  background-color: #31b0d5;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  border-color: #46b8da;
}

.fixed {
  position: fixed;
  font-size: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  opacity: 0.8;
}

.fixed:hover {
  opacity: 1;
}

.r-btn {
  font-size: 28px;
  width: 50px;
  height: 35px;
  opacity: 0.9;
  padding: 0px;
}

.r-btn:hover {
  opacity: 1;
}

#page-a3 {
  -webkit-print-color-adjust: exact !important;
  color-adjust: exact !important;
}
</style>
