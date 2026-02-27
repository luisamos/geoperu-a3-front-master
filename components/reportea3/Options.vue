<template>
  <div style="float:right;text-align:center;position:absolute;right:42px;">
    <div
      style="height:100%;line-height:18px;text-align:center;display:table;width:100%;font-size:18px;"
    >
      <div
        style="display:table-cell;vertical-align: middle;text-align:right;font-weight:600;"
        data-html2canvas-ignore
      >
        <button
          @click="showShare=!showShare"
          class="btn r-btn no-print"
          style="background-color:transparent;color:#009aff;"
          v-tooltip="'Comparte en redes sociales.'"
        >
          <img src="/fonts/icon-share.svg" width="26px" />
        </button>
        <button
          @click="show"
          class="btn r-btn no-print"
          style="background-color:transparent;color:#db5e5e;"
          v-tooltip="'Genera el reporte en formato PDF'"
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
</template>
<script>
export default {
    mounted(){
        
    },
  data() {
    return {
      showShare: false,
      show: false
    };
  },
  methods: {
    print() {
      /*$("#page-a3").printThis({
            importCSS: true, // import parent page css
            importStyle: true,
            printDelay: 300,
            copyTagClasses: true
        });*/

      window.print();

      //printJS({ printable: 'page-a3', type: 'html', header: 'PrintJS - Form Element Selection' })
    },
    genPdf() {
      var nodesToRecover = [];
      var nodesToRemove = [];

      var svgElem = $("#page-a3").find(".svg-icon");

      svgElem.each(function(index, node) {
        var parentNode = node.parentNode;
        var svg = parentNode.innerHTML;

        var canvas = document.createElement("canvas");

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

      this.generatingPdf = 1;
      let reportPDF = html2canvas(document.querySelector("#page-a3"), {
        scale: 2,
        //allowTaint: true,
        onclone: function(clonedDoc) {
          let ele = clonedDoc.getElementById("page-a3");
          //$(ele).css("transform", "scale(1)");
          //ele.style.transform = "scale(1)";
          console.log($(ele));
        }
      }).then(canvas => {
        var ctx = canvas.getContext("2d");

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
      //.then(canvas => canvas.toDataURL("image/png", 1));

      if (process.browser) {
        const jsPDF = require("jspdf");

        Promise.all([reportPDF])
          .then(values => {
            let pdf = new jsPDF("l", "cm", this.pdfOptions.page, true);

            pdf.addImage(
              values[0],
              "PNG",
              parseFloat(this.pdfOptions.margin),
              parseFloat(this.pdfOptions.margin),
              pdf.internal.pageSize.getWidth() -
                parseFloat(this.pdfOptions.margin * 2),
              pdf.internal.pageSize.getHeight() -
                parseFloat(this.pdfOptions.margin * 2),
              "",
              "FAST"
            );

            if (this.pdfOptions.includeMap) {
              this.pdfAddMap(pdf).then(pdf => {
                pdf.save(`${this.setDescription()}.pdf`);
              });
            } else {
              pdf.save(`${this.setDescription()}.pdf`);
            }
          })
          .then(() => {
            this.generatingPdf = 2;
          })
          .then(() => {
            this.generatingPdf = 0;
            /*$("#page-3")
              .find(".screenShotTempCanvas")
              .remove();
            $("#page-3")
              .find(".tempHide")
              .show()
              .removeClass("tempHide");*/
          });
      }
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
        url: this.$route.query.page,
        shareIn: "blank",
        showLabel: false,
        showCount: false,
        shares: [
          { share: "email", logo: "fas fa-at" },
          { share: "twitter", logo: "fab fa-twitter" },
          { share: "facebook", logo: "fab fa-facebook-f" },
          { share: "whatsapp", logo: "fab fa-whatsapp" }
        ],
        text: this.setDescription()
      });
    }
  }
};
</script>
<style scoped>
.r-btn {
  font-size: 28px;
  width: 50px;
  height: 35px;
  /*border-radius: 50%;*/
  opacity: 0.9;
  padding: 0px;
}

.r-btn:hover {
  opacity: 1;
}
</style>