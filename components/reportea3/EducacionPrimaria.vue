<template>
  <div>
    <div style="height:12%;line-height:12px;text-align:center;display:table;width:100%;">
      <span style="display:table-cell;vertical-align: middle;text-align:center;">
        <b class="title">Educación Primaria</b><br>
        <span style="font-size:10px;font-weight:bold;">
            Proporción de estudiantes del 4to grado,
            <br>con nivel satisfactorio
        </span>
      </span>
    </div>
    <div style="height:88%;width:100%;position:relative;">
      <CircularChart
       ctitle="Comprensión Lectora (%)"
       :colors = colors
       class="sub-container"
       :distrito="getData(this.$store.getters['reporte/results'].ece.filter((obj)=>obj.cat ==='Distrito' && obj.anno ==='2018'), 'cl_pest_sa')"
       :provincia="getData(this.$store.getters['reporte/results'].ece.filter((obj)=>obj.cat ==='Provincia' && obj.anno ==='2018'), 'cl_pest_sa')"
       :departamento="getData(this.$store.getters['reporte/results'].ece.filter((obj)=>obj.cat ==='Departamento' && obj.anno ==='2018'), 'cl_pest_sa')"
       :nacional="getData(this.$store.getters['reporte/results'].ece.filter((obj)=>obj.cat ==='Nacional' && obj.anno ==='2018'), 'cl_pest_sa')"

       :ndistrito="getDataInt(this.$store.getters['reporte/results'].ece.filter((obj)=>obj.cat ==='Distrito' && obj.anno ==='2018'), 'cl_nest_sa')"
       :nprovincia="getDataInt(this.$store.getters['reporte/results'].ece.filter((obj)=>obj.cat ==='Provincia' && obj.anno ==='2018'), 'cl_nest_sa')"
       :ndepartamento="getDataInt(this.$store.getters['reporte/results'].ece.filter((obj)=>obj.cat ==='Departamento' && obj.anno ==='2018'), 'cl_nest_sa')"
       :nnacional="getDataInt(this.$store.getters['reporte/results'].ece.filter((obj)=>obj.cat ==='Nacional' && obj.anno ==='2018'), 'cl_nest_sa')"

       :universo="{
          values: {
            nacional: getDataInt(this.$store.getters['reporte/results'].ece.filter((obj)=>obj.cat ==='Nacional' && obj.anno ==='2018'), 'evaluados'),
            departamento:getDataInt(this.$store.getters['reporte/results'].ece.filter((obj)=>obj.cat ==='Departamento' && obj.anno ==='2018'), 'evaluados'),
            provincia:getDataInt(this.$store.getters['reporte/results'].ece.filter((obj)=>obj.cat ==='Provincia' && obj.anno ==='2018'), 'evaluados'),
            distrito: getDataInt(this.$store.getters['reporte/results'].ece.filter((obj)=>obj.cat ==='Distrito' && obj.anno ==='2018'), 'evaluados'),
          },
          description: ''
        }"
        categorie = 'two'
       style="width:100%;height:50%;"
       @universoChange="universoChange"
      />
      <!--anno: "2018"
          cat: "Distrito"
          cl_pest_sa: "45.4"
          ds: "HUACHO"
          mt_pest_sa: "37.4"-->
      <CircularChart
       ctitle="Matemática (%)"
       :colors = colors
       class="sub-container"
       :distrito="getData(this.$store.getters['reporte/results'].ece.filter((obj)=>obj.cat ==='Distrito' && obj.anno ==='2018'), 'mt_pest_sa')"
       :provincia="getData(this.$store.getters['reporte/results'].ece.filter((obj)=>obj.cat ==='Provincia' && obj.anno ==='2018'), 'mt_pest_sa')"
       :departamento="getData(this.$store.getters['reporte/results'].ece.filter((obj)=>obj.cat ==='Departamento' && obj.anno ==='2018'), 'mt_pest_sa')"
       :nacional="getData(this.$store.getters['reporte/results'].ece.filter((obj)=>obj.cat ==='Nacional' && obj.anno ==='2018'), 'mt_pest_sa')"
       

       :ndistrito="getDataInt(this.$store.getters['reporte/results'].ece.filter((obj)=>obj.cat ==='Distrito' && obj.anno ==='2018'), 'mt_nest_sa')"
       :nprovincia="getDataInt(this.$store.getters['reporte/results'].ece.filter((obj)=>obj.cat ==='Provincia' && obj.anno ==='2018'), 'mt_nest_sa')"
       :ndepartamento="getDataInt(this.$store.getters['reporte/results'].ece.filter((obj)=>obj.cat ==='Departamento' && obj.anno ==='2018'), 'mt_nest_sa')"
       :nnacional="getDataInt(this.$store.getters['reporte/results'].ece.filter((obj)=>obj.cat ==='Nacional' && obj.anno ==='2018'), 'mt_nest_sa')"

       :universo="{
          values: {
            nacional: getDataInt(this.$store.getters['reporte/results'].ece.filter((obj)=>obj.cat ==='Nacional' && obj.anno ==='2018'), 'evaluados'),
            departamento:getDataInt(this.$store.getters['reporte/results'].ece.filter((obj)=>obj.cat ==='Departamento' && obj.anno ==='2018'), 'evaluados'),
            provincia:getDataInt(this.$store.getters['reporte/results'].ece.filter((obj)=>obj.cat ==='Provincia' && obj.anno ==='2018'), 'evaluados'),
            distrito: getDataInt(this.$store.getters['reporte/results'].ece.filter((obj)=>obj.cat ==='Distrito' && obj.anno ==='2018'), 'evaluados'),
         },
         description: ''
       }"
       categorie = 'two'
       style="width:100%;height:50%;"
       @universoChange="universoChange"
      />
       <div style="position:absolute;bottom:6px;right:4px;line-height:7px;width:80px;text-align:center;">
          <span style="font-size:8.5px;font-weight:700;">
            <strong style="font-size:12px;" v-text="up"></strong>
            <br />estudiantes del
            <br />cuarto grado de primaria
          </span>
        </div>
    </div>
  </div>
</template>

<script>
import CircularChart from "~/components/reportea3/CircularChart.vue";
import numberFormat from '~/mixins/numberFormat.js';
export default {
  mixins:[numberFormat],
  data() {
    return {
      up: '',
      colors:{
        'nacional': '#ff6356',
        'departamento': '#4e0147',
        'provincia': '#750280',
        'distrito': '#a30bd2'
      }
    }
  },
  methods: {
      universoChange(val){
        this.up = val
      },
      getData(array, iname) {
       if (array.length > 0) {
        if ( typeof array[0][iname] != 'undefined') {
          let r = this.formatNumber(array[0][iname],1)
          return r.toString();
        }
      }
      return "0.0";
    },
    getDataInt(array, iname) {
       if (array.length > 0) {
        if ( typeof array[0][iname] != 'undefined') {
          let r = this.formatNumberInt(array[0][iname]);
          return r.toString();
        }
      }
      return "0";
    }
  },
    components:{
        CircularChart
    }
};
</script>

<style scoped>
.title {
  color:#750280 !important;
}

/deep/ .sub-container .label-nacional b {  
  color: #ff6356 !important;
}

/deep/ .sub-container .label-departamento b {  
  color: #4e0147 !important;
}

/deep/ .sub-container .label-provincia b {  
  color: #750280 !important;
}

/deep/ .sub-container .label-distrito b {  
  color: #a30bd2 !important;
}


</style>
