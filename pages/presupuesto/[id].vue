<template>
  <div>
    <div id="loading" v-if="!showReport">
      <no-ssr>
        <LoadingGif />
      </no-ssr>
    </div>
    <div id="reporte" class="pres-container" v-if="showReport">
      <div
        style="width:50%;height:100%;float:left;border-style: none dashed none none;border-width:1.5px"
      >
        <div style="width:100%;height:6%">
          <LogoSegdi style="float:left;width:auto" />
          <LogoMapea type="red" style="float:right;width:12%" />
        </div>
        <div style="width:100%;height:42%;">
          <Map style="width:56%;height:100%;float:left;" />
          
          <div style="width:44%;height:100%;float:left;">
            <!--div style="width:100%;height:30%;">
              <div v-if="$store.getters['reporte/requestCode'].substring(0,4)==='1508'" style="text-align:center;width:100%;height:100%;padding-top:2%;line-height:32px;font-size:28px;color:#148cf9"
            v-html="'GOBIERNO REGIONAL DE <br> <strong> LIMA PROVINCIAS</strong>'">
              </div>  
              <div v-else-if="$store.getters['reporte/requestCode'].substring(0,4)==='1501'" style="text-align:center;width:100%;height:100%;padding-top:2%;line-height:32px;font-size:28px;color:#148cf9"
            v-html="'<strong>LIMA METROPOLITANA</strong>'">
              </div>  
            <div v-else style="text-align:center;width:100%;height:100%;padding-top:2%;line-height:32px;font-size:28px;color:#148cf9"
            v-html="'GOBIERNO REGIONAL DE <br> <strong>' + $store.getters['reporte/results'].ejecutora[0].nom_dpto +'</strong>'">
              </div>
            </div-->
            <Zona style="width:100%;height:38%;"/>
            <div style="width:100%;height:62%;">
              <Poblacion />
            </div>
          </div>
        </div>
        <PresupuestoDonut style="width:100%;height:56%;" />
        
      </div>
      <!-- SECTION 2 -->
      <div style="width:50%;height:100%;float:left;">
        <div style="height:21%;margin:1.5px;">
          <PobrezaNoMonetaria style="width:33.4%;float:left;height:100%;" />
          <AguaSaneamiento style="width:66.6%;float:left;height:100%;" />
        </div>
        <Salud style="height:36%;" />
        <Educacion style="height:41%;"/>
        <div style="height:2%;text-align:right;padding-right:8px;">
          <Enlace />
        </div>
        
        <div
            style="float:right;text-align:center;position:relative;right:20px;top:-1092px"
            data-html2canvas-ignore
            id="rpt-controls"
          >
        <div
              style="height:100%;line-height:18px;text-align:center;display:table;width:100%;"
            >
              <div
                style="display:table-cell;vertical-align: middle;text-align:right;font-weight:600;"
              >
                <button
                  @click="showShare=!showShare"
                  class="btn r-btn no-print"
                  style="background-color:transparent;color:#009aff;"
                  v-tooltip="'Comparte en redes sociales.'"
                >
                  <img :src="STATIC_URL + 'fonts/icon-share.svg'" width="20px" />
                </button>
                <button
                  @click="show"
                  class="btn r-btn no-print"
                  style="background-color:transparent;color:#db5e5e;"
                  v-tooltip="'Genera el reporte en formato PDF'"
                  :disabled="$store.getters['Loading/isLoading']"
                >
                  <i class="far fa-file-pdf"></i>
                </button>
                <button
                  @click="print"
                  class="btn r-btn no-print"
                  data-toggle="tooltip"
                  data-placement="right"
                  style="background-color:transparent;color:gray;"
                  v-tooltip="'Margen recomendado para impresión 5mm.'"
                >
                  <i class="fa fa-print"></i>
                </button>
              </div>
            </div>

            <div v-show="showShare" class="no-print">
              <div id="share"></div>
            </div>
         </div>
      </div>

      <modal height="180" width="250" name="pdf-options" data-html2canvas-ignore>
        <div style="width:100%;height:100%;padding:10px;">
          <button @click="hide" style="float:right;background:transparent;border:none;">X</button>
          <div style="width:100%;text-align:center;">
            <h3></h3>
          </div>
          <div style="width:100%;text-align:center;" class="container-fluid">
            <div class="form-group">
              <label>Seleccione tamaño de hoja</label>
              <div class="form-group">
                <label class="radio-inline">
                  <input type="radio" value="a4" v-model="pdfOptions.page" style="right:auto" />
                  A4
                </label>
                <label class="radio-inline">
                  <input type="radio" value="a3" v-model="pdfOptions.page" style="right:auto" />
                  A3
                </label>
              </div>

              <!--label>
                  <input type="checkbox" v-model="pdfOptions.includeMap" /> Incluir Mapa
              </label-->
            </div>
            <button
              type="button"
              class="btn btn-primary"
              style="background-color:#337ab7;border-color:#337ab7"
              @click="genPdf"
            >Generar</button>
          </div>
        </div>
      </modal>
    </div>
  </div>
</template>
<script>
import AguaSaneamiento from "~/components/reportea3/AguaSaneamiento";
import Salud from "~/components/reportea3/Salud";
import Educacion from "~/components/reportea3/Educacion";
import PobrezaNoMonetaria from "~/components/reportea3/PobrezaNoMonetaria";
import Map from "~/components/reportea3/map";
import LogoMapea from "~/components/LogoMapea";
import LogoSegdi from "~/components/LogoSegdi";
import PresupuestoDonut from "~/components/reportea3/PresupuestoDonut";
import Poblacion from "~/components/reportea3/poblacion";
import Zona from "~/components/reportea3/zona";
import Ubigeo from "~/public/ubigeo.js";
import LoadingGif from "~/components/reportea3/LoadingGif";
import gaEvent from "~/mixins/GoogleAnalytics";
import formatSvgThenScreenShot from "~/mixins/ScreenShot";
import imageToPdf from "~/mixins/PDFPrint";
import Enlace from "~/components/Enlace";
import { STATIC_URL } from "~/const.js"

export default {
  layout: "reporte",
  mixins: [gaEvent, formatSvgThenScreenShot, imageToPdf],
  validate({ params }) {
    return Ubigeo.Ubigeo.some(obj => {
      if (
        params.id.indexOf(obj.cod_dist) !== -1 ||
        params.id.indexOf(obj.cod_prov) !== -1 ||
        params.id.indexOf(obj.cod_dpto) !== -1
      ) {
        return true;
      }
    });
  },
  head() {
    return {
      title: "Reporte",
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content: "Reporte | Gastos | Geo Perú"
        },
        { name: "viewport", content: "width=device-width, initial-scale=1" }
      ]
    }
  },
  data() {
    return {
      STATIC_URL: STATIC_URL,
      showReport: false,
      showShare: false,
      pdfOptions: {
        page: "a3",
        margin: "0.5" //cm
      }
    };
  },
  mounted() {
    
    this.$store
      .dispatch("reporte/fetchApi", this.$route.params.id)
      .then(data => {        
        if( this.$route.params.id == '151' ) {
            this.$store.dispatch('reporte/isRegion', true)
          }
          this.showReport = true;
        /*this.$store.dispatch('reporte/isRegion', true)
        this.showReport = true;*/
      })
      .then(response => {
        this.setSocials();
      })
      .catch(error => {
        console.log(error);
        if (error) {
          this.$router.push("/");
        }
      });
  },
  components: {
    Salud,
    LoadingGif,
    Educacion,
    AguaSaneamiento,
    PobrezaNoMonetaria,
    PresupuestoDonut,
    Map,
    LogoMapea,
    LogoSegdi,
    Enlace,
    Poblacion,
    Zona
  },
  methods: {
    show() {
      this.$modal.show("pdf-options");
    },
    hide() {
      this.$modal.hide("pdf-options");
    },
    genPdf() {
      this.hide();
      this.$store.dispatch("Loading/START", { tipo:'Overlay', text: `Generando Reporte: ${this.$store.getters["reporte/description"]}`});
      this.gaEvent("send", "event", "Reporte", "pdf", this.$route.params.id);

      const svgElements = $("#reporte").find(".svg-icon");
      const mainElement = document.querySelector("#reporte");

      this.formatSvgThenScreenShot(svgElements, mainElement).then(
        screenshot => {
          this.imageToPdf(screenshot).save(
            `Reporte ${this.$store.getters["reporte/description"]}.pdf`
          );
          this.$store.dispatch("Loading/STOP");
        }
      );
    },
    setSocials() {
      var isMobile = false; //initiate as false
      // device detection
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
          navigator.userAgent
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          navigator.userAgent.substr(0, 4)
        )
      ) {
        isMobile = true;
      }

      jsSocials.shares.whatsapp = {
        label: "WhatsApp",
        logo: "fab fa-whatsapp",
        shareUrl: isMobile
          ? "whatsapp://send?text={url} {text}"
          : "https://web.whatsapp.com/send?text={url} {text}",
        countUrl: ""
      };

      $("#share").jsSocials({
        url: this.url,
        shareIn: "blank",
        showLabel: false,
        showCount: false,
        shares: [
          { share: "email", logo: "fas fa-at" },
          { share: "twitter", logo: "fab fa-twitter" },
          { share: "facebook", logo: "fab fa-facebook-f" },
          { share: "whatsapp", logo: "fab fa-whatsapp" },
          { share: "linkedin", logo: "fab fa-linkedin" }
        ],
        text: this.$store.getters["reporte/description"]
      });
    },
    back() {
      this.$router.go(-1);
    },
    print() {
      this.gaEvent(
        "send",
        "event",
        "Reporte",
        "imprimir",
        this.$route.params.id
      );
      window.print();
    }
  }
};
</script>

<style>

@media print {
  .pres-container {
    
  }
  .tooltip {
    display: none !important;
  }
}

.pres-container {
  font-family: "Montserrat" !important;
  
  margin: 0px auto; /* -height/2 */
  width: 42cm;
  height: 28.8cm;
}


.cele * {
  color: #148cf9 !important;
}


/* JS SOCIALS */

.jssocials-share-whatsapp .jssocials-share-link,
.jssocials-share-linkedin .jssocials-share-link,
.jssocials-share-facebook .jssocials-share-link,
.jssocials-share-twitter .jssocials-share-link,
.jssocials-share-email .jssocials-share-link {
  color: white !important;
  font-size: 15px;
}

.r-btn {
  font-size: 20px;
  width: 38px;
  height: 35px;
  /*border-radius: 50%;*/
  opacity: 0.9;
  padding: 0px;
}

.r-btn:hover {
  opacity: 1;
}

body {
   -webkit-print-color-adjust: exact !important;
  color-adjust: exact !important;
}
</style>