<template>
    <div>
       <div style="height:12%;line-height:12px;text-align:center;display:table;width:100%;">
        <span style="display:table-cell;vertical-align: middle;text-align:center;">
            <b class="title">Educación Secundaria</b><br>
            <span style="font-size:10px;font-weight:bold;">
                Proporción de estudiantes del 4to grado,
                <br>con nivel satisfactorio
            </span>
        </span>
      </div>
      <div style="height:88%;position:relative;">
        <CircularChart
            class="sub-container"
            :colors = colors
            ctitle="Comprensión Lectora (%)"
            style="width:50%;height:50%;float:left;"
            :distrito="getData(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Distrito' && obj.anno ==='2018'), 'lt_pest_sa')"
            :provincia="getData(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Provincia' && obj.anno ==='2018'), 'lt_pest_sa')"
            :departamento="getData(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Departamento' && obj.anno ==='2018'), 'lt_pest_sa')"
            :nacional="getData(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Nacional' && obj.anno ==='2018'), 'lt_pest_sa')"
            

            :ndistrito="getDataInt(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Distrito' && obj.anno ==='2018'), 'lt_nest_sa')"
            :nprovincia="getDataInt(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Provincia' && obj.anno ==='2018'), 'lt_nest_sa')"
            :ndepartamento="getDataInt(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Departamento' && obj.anno ==='2018'), 'lt_nest_sa')"
            :nnacional="getDataInt(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Nacional' && obj.anno ==='2018'), 'lt_nest_sa')"
            categorie = 'two'

            :universo="{
          values: {
            nacional: getDataInt(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Nacional' && obj.anno ==='2018'), 'evaluados'),
            departamento:getDataInt(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Departamento' && obj.anno ==='2018'), 'evaluados'),
            provincia:getDataInt(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Provincia' && obj.anno ==='2018'), 'evaluados'),
            distrito: getDataInt(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Distrito' && obj.anno ==='2018'), 'evaluados'),
          },
          description: ''
        }"
         @universoChange="universoChange"
        
        />
        <CircularChart
            class="sub-container"
            :colors = colors
            ctitle="Ciencias Sociales (%)"
            style="width:50%;height:50%;float:left;"
            :distrito="getData(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Distrito' && obj.anno ==='2018'), 'hg_pest_sa')"
            :provincia="getData(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Provincia' && obj.anno ==='2018'), 'hg_pest_sa')"
            :departamento="getData(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Departamento' && obj.anno ==='2018'), 'hg_pest_sa')"
            :nacional="getData(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Nacional' && obj.anno ==='2018'), 'hg_pest_sa')"
            

           :ndistrito="getDataInt(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Distrito' && obj.anno ==='2018'), 'hg_nest_sa')"
          :nprovincia="getDataInt(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Provincia' && obj.anno ==='2018'), 'hg_nest_sa')"
          :ndepartamento="getDataInt(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Departamento' && obj.anno ==='2018'), 'hg_nest_sa')"
          :nnacional="getDataInt(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Nacional' && obj.anno ==='2018'), 'hg_nest_sa')"

          :universo="{
          values: {
            nacional: getDataInt(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Nacional' && obj.anno ==='2018'), 'evaluados'),
            departamento:getDataInt(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Departamento' && obj.anno ==='2018'), 'evaluados'),
            provincia:getDataInt(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Provincia' && obj.anno ==='2018'), 'evaluados'),
            distrito: getDataInt(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Distrito' && obj.anno ==='2018'), 'evaluados'),
          },
          description: ''
        }"
            categorie = 'two'
             @universoChange="universoChange"
        
        />
        <CircularChart
        class="sub-container"
        ctitle="Matemática (%)"
        style="width:50%;height:50%;float:left;"
        :colors = colors
        :distrito="getData(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Distrito' && obj.anno ==='2018'), 'mt_pest_sa')"
        :provincia="getData(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Provincia' && obj.anno ==='2018'), 'mt_pest_sa')"
        :departamento="getData(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Departamento' && obj.anno ==='2018'), 'mt_pest_sa')"
        :nacional="getData(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Nacional' && obj.anno ==='2018'), 'mt_pest_sa')"
        

        :ndistrito="getDataInt(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Distrito' && obj.anno ==='2018'), 'mt_nest_sa')"
        :nprovincia="getDataInt(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Provincia' && obj.anno ==='2018'), 'mt_nest_sa')"
        :ndepartamento="getDataInt(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Departamento' && obj.anno ==='2018'), 'mt_nest_sa')"
        :nnacional="getDataInt(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Nacional' && obj.anno ==='2018'), 'mt_nest_sa')"
        :universo="{
          values: {
            nacional: getDataInt(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Nacional' && obj.anno ==='2018'), 'evaluados'),
            departamento:getDataInt(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Departamento' && obj.anno ==='2018'), 'evaluados'),
            provincia:getDataInt(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Provincia' && obj.anno ==='2018'), 'evaluados'),
            distrito: getDataInt(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Distrito' && obj.anno ==='2018'), 'evaluados'),
          },
          description: ''
        }"

        categorie = 'two'
         @universoChange="universoChange"
        
        />
        <CircularChart
        class="sub-container"
        :colors = colors
        ctitle="Innovación y tecnología (%)"
        style="width:50%;height:50%;float:left;"
        categorie = 'two'
        :distrito="getData(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Distrito' && obj.anno ==='2018'), 'ct_pest_sa')"
        :provincia="getData(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Provincia' && obj.anno ==='2018'), 'ct_pest_sa')"
        :departamento="getData(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Departamento' && obj.anno ==='2018'), 'ct_pest_sa')"
        :nacional="getData(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Nacional' && obj.anno ==='2018'), 'ct_pest_sa')"

        :ndistrito="getDataInt(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Distrito' && obj.anno ==='2018'), 'ct_nest_sa')"
        :nprovincia="getDataInt(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Provincia' && obj.anno ==='2018'), 'ct_nest_sa')"
        :ndepartamento="getDataInt(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Departamento' && obj.anno ==='2018'), 'ct_nest_sa')"
        :nnacional="getDataInt(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Nacional' && obj.anno ==='2018'), 'ct_nest_sa')"

        :universo="{
          values: {
            nacional: getDataInt(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Nacional' && obj.anno ==='2018'), 'evaluados'),
            departamento:getDataInt(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Departamento' && obj.anno ==='2018'), 'evaluados'),
            provincia:getDataInt(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Provincia' && obj.anno ==='2018'), 'evaluados'),
            distrito: getDataInt(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Distrito' && obj.anno ==='2018'), 'evaluados'),
          },
          description: ''
        }"
         @universoChange="universoChange"
        />
        <div style="position:absolute;bottom:6px;right:4px;line-height:7px;width:80px;text-align:center;">
          <span style="font-size:8.5px;font-weight:700;">
            <strong style="font-size:12px;" v-text="us"></strong>
            <br />estudiantes del
            <br />segundo grado de secundaria
          </span>
        </div>
      </div>
    </div>
</template>

<script>
import CircularChart from '~/components/reportea3/CircularChart.vue'
import numberFormat from '~/mixins/numberFormat.js';
export default {
   mixins:[numberFormat],
    data:() => {
        return {
            us: '',
            colors:{
                'nacional': '#ff6356',
                'departamento': '#4e0147',
                'provincia': '#750280',
                'distrito': '#a30bd2'
            },
        }
    },     
    components: {
        CircularChart
    },
     methods: {
       universoChange(val){
         
        this.us = val
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

}
</script>

<style scoped>
.title {
  color:#8f29bd !important;
}


/deep/ .sub-container .label-nacional b {  
  color: #ff6356 !important;
}

/deep/ .sub-container .label-departamento b {  
  color: #300050 !important;
}

/deep/ .sub-container .label-provincia b {  
  color: #4e0147 !important;
}

/deep/ .sub-container .label-distrito b {  
  color: #a30bd2 !important;
}


</style>