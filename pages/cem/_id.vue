<template>
  <div>
    <div id="loading" v-if="!showReport">
      <no-ssr>
        <LoadingGif />
      </no-ssr>
    </div>
    <div id="reporte" class="pres-container" v-if="showReport">
      
      <div style="width:100%;height:6%;">
        
        <LogoSegdi style="float:left;width:30%;" />
        <Zona style="float:left;width:40%;height:100%;" />
        <LogoMapea type="red" style="float:right;width:20%" />
      </div>

      <!-- SECTION 1 -->
      <div style="width:100%;height:47%;border-style: dashed dashed dashed dashed;border-width:1.5px">
        <div style="width:35%;height:100%;float:left;">
          <Cantidad  style="width: 100%;height:90%" />
          <Fuente :label="`Fuente: ${$store.getters['reportecem/results'].fuentes[0].fuente_cem}`" />
        </div>
        
        <div style="float:left;height:100%;width:65%">
          <div style="width: 50%;height:100%;float:left;">
            <Edad style="width:100%;height:25%;" />
            <Proteccion style="width:100%;height:70%;" />
          </div>
          <div style="width: 50%;height:100%;float:left;">
            <Trabaja style="width:100%;height:25%;" />
            <Situacion style="width:100%;height:70%;" />
          </div>
        </div>
        
      </div>
      <!-- SECTION 2 -->
      <div style="width:100%;height:47%;border-style: dashed dashed dashed dashed;border-width:1.5px">
         
        <div style="width:35%;height:100%;float:left">
          <CantidadCem  style="width: 100%;height:96%" />
          <Fuente :label="`Fuente: ${$store.getters['reportecem/results'].fuentes[0].fuente_casos_cem}`" />
        </div>
        <div style="float:left;height:100%;width:65%">
          <div style="width: 100%;height:60%;">
            <VFisica style="float:left;width:25%;height:100%;"/>
            <VPsicologica style="float:left;width:25%;height:100%;"/>
            <VSexual style="float:left;width:25%;height:100%;"/>
            <VEconomica style="float:left;width:25%;height:100%;"/>
          </div>
          <div style="width: 100%;height:40%;">
            <Predominancia style="width:80%;height:100%;margin:auto" />
          </div>
        </div>
      </div>
      <!--Enlace /-->
    </div>
  </div>
</template>
<script>
import LogoMapea from "~/components/LogoMapea";
import LogoSegdi from "~/components/LogoSegdi";
import Zona from "~/components/reportea3/cem/zona";
import LoadingGif from "~/components/reportea3/LoadingGif";
import gaEvent from "~/mixins/GoogleAnalytics";
import formatSvgThenScreenShot from "~/mixins/ScreenShot";
import imageToPdf from "~/mixins/PDFPrint";
import Ubigeo from "~/static/ubigeo.js";
import Enlace from "~/components/Enlace";
import Fuente from "~/components/reportea3/Fuente";

/** Functional Components */
import Cantidad from "~/components/reportea3/cem/cantidad";
import Edad from "~/components/reportea3/cem/edad";
import Proteccion from "~/components/reportea3/cem/proteccion";
import Trabaja from "~/components/reportea3/cem/trabaja";
import Situacion from "~/components/reportea3/cem/situacion";
import CantidadCem from "~/components/reportea3/cem/cantidadcem";
import Predominancia from "~/components/reportea3/cem/predominancia";
import VFisica from "~/components/reportea3/cem/vfisica";
import VPsicologica from "~/components/reportea3/cem/vpsicologica";
import VEconomica from "~/components/reportea3/cem/veconomica";
import VSexual from "~/components/reportea3/cem/vsexual";

import { STATIC_URL } from "~/const.js";

export default {
  layout: "reporte",
  mixins: [gaEvent, formatSvgThenScreenShot, imageToPdf],
  validate({ params }) {
    if(params.id) {
      return Ubigeo.Ubigeo.some(obj => {
        if (
          params.id.indexOf(obj.cod_dist) !== -1 
        ) {
          return true;
        }
      })
    } else {
      return false
    }
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
    };
  },
  data() {
    return {
      tendomiestado:'adasd',
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
      .dispatch("reportecem/fetchApi", this.$route.params.id)
      .then(data => {
        if (this.$route.params.id == "151") {
          this.$store.dispatch("reportecem/isRegion", true);
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
    LoadingGif,
    LogoMapea,
    LogoSegdi,
    Enlace,
    Zona,
    Cantidad,
    Edad,
    Proteccion,
    Trabaja,
    Situacion,
    CantidadCem,
    Predominancia,
    VFisica,
    VPsicologica,
    VEconomica,
    VSexual,
    Fuente
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
      this.$store.dispatch("Loading/START", {
        tipo: "Overlay",
        text: `Generando Reporte: ${this.$store.getters["reportecem/description"]}`
      });
      this.gaEvent("send", "event", "Reporte", "pdf", this.$route.params.id);

      const svgElements = $("#reporte").find(".svg-icon");
      const mainElement = document.querySelector("#reporte");

      this.formatSvgThenScreenShot(svgElements, mainElement).then(
        screenshot => {
          this.imageToPdf(screenshot).save(
            `Reporte ${this.$store.getters["reportecem/description"]}.pdf`
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
        text: this.$store.getters["reportecem/description"]
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