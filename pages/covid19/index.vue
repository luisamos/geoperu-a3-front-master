<template>
  <div class="page">
    <div class="header">
        <img src="https://www.geoperu.gob.pe/_nuxt/img/gob.pe-lg.e75946e.svg" alt="brand-logo" class="logo-gobpe" data-v-01289720="">
    </div>
    <ChartFallecidos ref="chartFall" :data="dataModel" :descripcion="descripcion" />	
		
						  
  </div>
</template>

<style scoped>

.header {
    background-color: #bf0909;
    height: 68px;
    display: flex;
}
.logo-gobpe {
    
    height: 43px;
    margin-top: auto;
    margin-left: 40px;
    margin-bottom: auto;
}

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
  transition: all 1s ease;
  font-family: "Roboto" !important;
}
.form-label {
  font-family: "Roboto";
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
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
import ChartFallecidos from "~/components/Covid19/ChartFallecidos";

export default {
  layout: "ficha",
  data() {
    return {
      SEARCH_ENDPOINT:
        "https://visor.geoperu.gob.pe/api/geoperu-proyectos/busquedaProyecto?texto=",
      searchBarVisible: false,
      isBlur: true,
      dataModel: {
        title: "",
        categories: [],
        series: [],
        fuente: ""
      },
      descripcion: "Fuente: []",
      codigo: ""
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
    this.codigo = this.$route.query.ubigeo;
    this.tipo = this.$route.query.tipo;
    this.getInfo();
  },
  methods: {
    getInfo: function() {
      if (this.codigo && this.tipo) {
        this.getData(
          "https://visor.geoperu.gob.pe/api/geoperu-proyectos/busquedaUbigeo",
          { codigo: this.codigo, tipo: this.tipo }
        );
      }
    },
    getData: async function(url, {codigo, tipo}) {
      this.$store.dispatch("Loading/START", {
        tipo: "Overlay",
        text: `Cargando...`
      });
      
      await fetch(url + "?texto=" + codigo + "&tipo=" + tipo, {
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
            console.log(dataModel)
          }
        })
        .catch(error => {
          //this.showSearchBar();
        });
      this.$store.dispatch("Loading/STOP");
      this.$refs["chartFall"].refresh();
    },
    isLoading: function() {}
  },
  components: {
    ChartFallecidos
  }
};
</script>