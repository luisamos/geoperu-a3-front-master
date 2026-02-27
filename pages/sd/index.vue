<template>
  <client-only>
  <div class="page">
    <select 
      ref="searchbar"
      class="search-bar"
      v-show="searchBarVisible"
      v-model="selectedOption"
      @change="selected"
      
      >
      <option v-for="(dpto, idx) in departamentos" :key="idx" :value="dpto.value">{{ dpto.label }}</option>
    </select>

    <div class="search-section">
            <button
            @click="showSearchBar"
            data-html2canvas-ignore
            class="btn r-btn no-print"
            style="font-size:16px;background-color:transparent;color:#193D74;"
            :disabled="$store.getters['Loading/isLoading']"
          >
            Buscar departamento <i class="fa fa-search"></i>
          </button>
          <button
            @click="genPdf"
            data-html2canvas-ignore
            class="btn r-btn no-print"
            style="font-size:16px;background-color:transparent;color:#193D74;"
            :disabled="$store.getters['Loading/isLoading']"
          >
            Imprimir <i class="fa fa-print"></i>
          </button>  
    </div>

    <div
      :class="{blur: isBlur, 'always-middle-screen': true }"
      id="reporte"
    >
      <div class="report-body" v-for="reportData in splittedData">
        <section class="header">
          <LogoSD2 />  
          <span class="header__title">PROYECTOS EN EL DEPARTAMENTO DE {{label}} QUE GANARON <br/>EL FONDO DE INVERSIÓN DE DESARROLLO TERRITORIAL</span>
          <LogoSD class="logo_sd"/>
        </section>
        <section class="mapcontainer">
          <img style="max-height: 100%;" :src="mapfileURL" />
        </section>
        <section class="tables">
          <div style="padding: 0px 10px 0px 10px">
            <strong>Lista de proyectos</strong>
            <br/>
            <Table class="table-inversion" :color="'green'" :header="['N°', 'Monto Inversión (S/.)', 'Provincia', 'Con financiamiento']" v-if="reportData?.sin?.length>0" :lista="reportData?.sin" />
          </div>
          <div style="padding: 0px 10px 0px 10px">
            <Table class="table-inversion" :color="'red'" :header="['N°', 'Monto Inversión (S/.)', 'Provincia', 'Sin financiamiento']" v-if="reportData?.con?.length>0" :lista="reportData?.con" />
          </div>
        </section>
      </div>
    </div>
  </div>
</client-only>
</template>

<script>
import Table from "~/components/SD/Table";
import Map from "~/components/SD/Map";
import ListaDptos from "~/static/lista_departamentos.json";
import LogoSD from "~/components/LogoSD";
import LogoSD2 from "~/components/LogoSD2";
import formatSvgThenScreenShot from "~/mixins/ScreenShot";
import imageToPdf from "~/mixins/PDFPrint";
import html2canvas from "html2canvas";

export default {
  mixins: [formatSvgThenScreenShot, imageToPdf],
  layout: "sd",
  data() {
    return {
      SEARCH_ENDPOINT:
        "https://visor.geoperu.gob.pe/inversion/descentralizacion/api/filtro/fidt/mapa?ubigeo=",
      isNotFound: false,
      searchBarVisible: false,
      selectedOption: '',
      isBlur: false,
      departamentos: ListaDptos,
      data: {},
      splittedData: [],
      codigo: '',
      label: '',
      pdfOptions: {
        page: "a3",
        margin: "0.5", //cm
      },
    };
  },
  computed: {
    
  },
  mounted() {
    this.codigo = this.$route.query.ubigeo;
    this.selectedOption = this.codigo
    const foundObject = this.departamentos.find(obj => obj['value'] === this.codigo);
    this.label = foundObject ? foundObject['label'] : null;

    this.getInfo();
  },
  methods: {
    selected: function(evt) {

      const selectedValue = evt.target.value;
      const selectedLabel = evt.target.options[evt.target.selectedIndex].text;

      const path = `${this.$route.path}?ubigeo=` + selectedValue;
      this.codigo = selectedValue;
      this.label = selectedLabel;
      this.$router.push(path);
      this.showSearchBar(false);
      this.getInfo();
    },
    async getInfo(){
      this.$store.dispatch("Loading/START", {
        tipo: "Overlay",
        text: `Cargando...`
      });
      this.isBlur = true;
      this.isNotFound = false;
      await fetch(this.SEARCH_ENDPOINT + this.codigo, {
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
        .then(async data => {
          this.topology = await fetch(
          `https://espacialg.geoperu.gob.pe/geoserver/geoperu/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=geoperu%3Aperu_provincias_light&maxFeatures=50&outputFormat=application%2Fjson&CQL_FILTER=cod_dpto%20LIKE%20'${this.codigo}'`
          ).then(response => response.json());

          if (data.data.total.length > 0) {
            this.data = data.data
            this.splittedData = this.splitProjects()
            console.log(this.splittedData)
            this.isBlur = false;

          } else if (data.succes === false && data.error_code === '404'){
            this.isNotFound = true;
            this.isBlur = false;
          } else {
            this.showSearchBar();
          }
        })
        .catch(error => {
          this.showSearchBar();
        });

        this.$store.dispatch("Loading/STOP");
    },
    showSearchBar: function(show = true) {
      if (!show && this.codigo === undefined) {
        this.isBlur = true;
        this.searchBarVisible = true;
        // this.$refs.searchbar.$refs.input.focus();
        // console.log(this.$refs.searchbar.$refs.input.focus());
      } else {
        this.isBlur = show;
        this.searchBarVisible = show;
        // this.$refs.searchbar.$refs.input.focus();
        // console.log(this.$refs.searchbar.$refs.input.focus());
      }
    },
    genPdf() {
      // this.$store.dispatch("Loading/START", {
      //   tipo: "Overlay",
      //   text: `Cargando`
      // });

      var elementsToCapture = document.querySelectorAll('#reporte > .report-body');

      // Create an empty array to store the captured images
      var capturedImages = [];

      // Loop through each element and capture its screenshot using html2canvas
      elementsToCapture.forEach(function(element) {
        html2canvas(element).then(function(canvas) {
          // Convert the canvas to an image data URL
          var imageDataURL = canvas.toDataURL('image/png');
          const jsPDF = require("jspdf")
          // Push the captured image data URL to the array
          capturedImages.push(imageDataURL);

          // Check if all elements have been captured
          if (capturedImages.length === elementsToCapture.length) {
            // Create a new jsPDF instance
            var pdf = new jsPDF('l', 'cm', 'a3');

            // Loop through the captured images and add each image to a new page in the PDF
            capturedImages.forEach(function(image, index) {
              // Add a new page to the PDF
              if (index > 0) {
                pdf.addPage();
              }

              // Add the image to the page
              pdf.addImage(image, 'PNG', 0.5, 0.5, 41, 0);

              // Add page number
              // pdf.setTextColor(250, 250, 250);
              // pdf.setFontSize(12);
              // pdf.text(180, 10, 'Page ' + (index + 1));
            });

            // Save the PDF
            pdf.save('Impresión.pdf');
          }
        });
      });
      
    },
    splitProjects() {
      const proyectos = [...this.formattedS_finan, ...this.formattedC_finan]

      // let rowH = 70,
      //     headerH = 36.2 + 36.2;
       
      const maxPartSize = 11; // Maximum number of elements per part
      const numParts = Math.ceil(proyectos.length / maxPartSize); // Calculate the number of parts
      const result = [];

      for (let i = 0; i < numParts; i++) {
        const start = i * maxPartSize; // Calculate the start index of the current part
        const end = start + maxPartSize; // Calculate the end index of the current part
        const part = proyectos.slice(start, end); // Extract a part of the array

        // Dividimos por tipo
        const dividedPart = part.reduce((res, item) => {
          const attributeValue = item['tipo']; // Get the value of the specified attribute

          if (attributeValue) {
            const { ['tipo']: removedAttribute, ...itemWithoutAttribute } = item; // Remove the attribute from the object

            if (!res.hasOwnProperty(attributeValue)) {
              // If the attribute value is not a key in the res object, create a new array for it
              res[attributeValue] = [];
            }

            res[attributeValue].push(itemWithoutAttribute); // Push the modified item into the corresponding array based on the attribute value
          }

          return res;
        }, {});

        result.push(dividedPart);
      }

      return result
    }
  },
  computed: {
    formattedC_finan(){
      let c=0
      const n = this.data?.c_finan?.map(t => {
        return {
          i: c+=1,
          a: t['MONTO INVERSIÓN'],
          c: t['PROVINCIA'],
          b: t['NOMBRE DE LA PROPUESTA'],
          tipo: 'con'
        }
      })

      return n
    },
    formattedS_finan(){
      let c=0
      const n = this.data?.s_finan?.map(t => {
        return {
          i: c+=1,
          a: t['MONTO INVERSIÓN'],
          c: t['PROVINCIA'],
          b: t['NOMBRE DE LA PROPUESTA'],
          tipo: 'sin'
        }
      })

      return n
    },
    mapfileURL(){
      return `custom-maps/${this.codigo}.png`
    }
  },
  components: {
    Table,
    Map,
    LogoSD,
    LogoSD2
  }
};
</script>



<style scoped>

.header__title {
  font-size: 18px;
  font-weight: bold;
  line-height: 18px !important;
}

.search-section {
  display: flex;
  justify-content: center;
}

.report-body {
  border: 1px dashed black;
  height: 992px; 
  width: 1404px;
  display: grid;
  grid-template-columns: 40% 60%; /* Two equal-width columns */
  grid-template-rows: 6% 94%; /* Auto-sized rows */
}

.header {
  display: grid;
  grid-column: 1 / span 2; /* Span across both columns */
  grid-template-columns: 360px 3fr 1fr;
  text-align: center;
  align-items: center;
}
.mapcontainer {
  display: flex;
  align-items: center;
  justify-content: center;
}

.blur {
  -webkit-filter: blur(3px);
  -moz-filter: blur(3px);
  -o-filter: blur(3px);
  -ms-filter: blur(3px);
  filter: blur(3px);
  
  transition: all 1s ease;
  background-color: transparent;
  pointer-events: none;
  user-select: none;
}

.page {
  -webkit-print-color-adjust: exact !important;
  width: 100%;
  min-width: 1200px;
  transition: all 1s ease;
  font-family: "Roboto" !important;
}

@media print {
  .search-section {
    display: none;
  }

  table {
  border-collapse: collapse !important;
  border: 1px solid black !important;
  /* Include any other necessary table styles */
}
}

#reporte {
  display: flex;
  flex-direction: column; /* Arrange items vertically */
  align-items: center; /* Center items horizontally */
  justify-content: center;
  row-gap: 10px;
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

.logo_sd {
  width: 200px;
}

</style>
