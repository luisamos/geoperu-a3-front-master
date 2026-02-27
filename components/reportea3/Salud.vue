<template>
  <div :class="$options.name" @dblclick="zoomo">
    <div class="cabecera">
      <div class="title">
        <span>Salud</span>
      </div>
      <Leyenda class="leyenda" order="desc" />
    </div>
    <div class="contenido">
      <CircularChart
        ctitle=" Desnutrición crónica en niños <5 años (%)"
        :colors="colors"
        :distrito="this.findinFilter(this.$store.getters['reporte/results'].anemia.filter((obj)=>obj.cat ==='Distrito' && obj.ds === 'anemia_men_5_cron'),'ane_p', 'p')"
        :provincia="this.findinFilter(this.$store.getters['reporte/results'].anemia.filter((obj)=>obj.cat ==='Provincia' && obj.ds === 'anemia_men_5_cron'),'ane_p', 'p')"
        :departamento="this.findinFilter(this.$store.getters['reporte/results'].anemia.filter((obj)=>obj.cat ==='Departamento' && obj.ds === 'anemia_men_5_cron'),'ane_p','p')"
        :nacional="this.findinFilter(this.$store.getters['reporte/results'].anemia.filter((obj)=>obj.cat ==='Nacional' && obj.ds === 'anemia_men_5_cron'),'ane_p', 'p')"
        :ndistrito="this.findinFilter(this.$store.getters['reporte/results'].anemia.filter((obj)=>obj.cat ==='Distrito' && obj.ds === 'anemia_men_5_cron' ), 'n_cas', 'n')"
        :nprovincia="this.findinFilter(this.$store.getters['reporte/results'].anemia.filter((obj)=>obj.cat ==='Provincia' && obj.ds === 'anemia_men_5_cron'), 'n_cas', 'n')"
        :ndepartamento="this.findinFilter(this.$store.getters['reporte/results'].anemia.filter((obj)=>obj.cat ==='Departamento' && obj.ds === 'anemia_men_5_cron'), 'n_cas', 'n')"
        :nnacional="this.findinFilter(this.$store.getters['reporte/results'].anemia.filter((obj)=>obj.cat ==='Nacional' && obj.ds === 'anemia_men_5_cron'), 'n_cas', 'n')"
        class="chart"
        :universo="{
          values: {
            nacional: this.findinFilter(this.$store.getters['reporte/results'].anemia.filter((obj)=>obj.cat ==='Nacional' && obj.ds === 'anemia_men_5_cron'), 'evaluados', 'n'),
            departamento:this.findinFilter(this.$store.getters['reporte/results'].anemia.filter((obj)=>obj.cat ==='Departamento' && obj.ds === 'anemia_men_5_cron'), 'evaluados', 'n'),
            provincia: this.findinFilter(this.$store.getters['reporte/results'].anemia.filter((obj)=>obj.cat ==='Provincia' && obj.ds === 'anemia_men_5_cron'), 'evaluados', 'n'),
            distrito: this.findinFilter(this.$store.getters['reporte/results'].anemia.filter((obj)=>obj.cat ==='Distrito' && obj.ds === 'anemia_men_5_cron'), 'evaluados', 'n')
          },
          description: 'niños menores a 5 años'
        }"
      />
      <div class="separator"></div>
      <CircularChart
        ctitle="Anemia en niños de 6-36 meses (%)"
        :colors="colors"
        :distrito="this.findinFilter(this.$store.getters['reporte/results'].anemia.filter((obj)=>obj.cat ==='Distrito' && obj.ds === 'anemia_men_3' ), 'ane_p', 'p')"
        :provincia="this.findinFilter(this.$store.getters['reporte/results'].anemia.filter((obj)=>obj.cat ==='Provincia' && obj.ds === 'anemia_men_3'), 'ane_p', 'p')"
        :departamento="this.findinFilter(this.$store.getters['reporte/results'].anemia.filter((obj)=>obj.cat ==='Departamento' && obj.ds === 'anemia_men_3'), 'ane_p', 'p')"
        :nacional="this.findinFilter(this.$store.getters['reporte/results'].anemia.filter((obj)=>obj.cat ==='Nacional' && obj.ds === 'anemia_men_3'), 'ane_p', 'p')"
        :ndistrito="this.findinFilter(this.$store.getters['reporte/results'].anemia.filter((obj)=>obj.cat ==='Distrito' && obj.ds === 'anemia_men_3' ), 'n_cas','n')"
        :nprovincia="this.findinFilter(this.$store.getters['reporte/results'].anemia.filter((obj)=>obj.cat ==='Provincia' && obj.ds === 'anemia_men_3'), 'n_cas','n')"
        :ndepartamento="this.findinFilter(this.$store.getters['reporte/results'].anemia.filter((obj)=>obj.cat ==='Departamento' && obj.ds === 'anemia_men_3'), 'n_cas','n')"
        :nnacional="this.findinFilter(this.$store.getters['reporte/results'].anemia.filter((obj)=>obj.cat ==='Nacional' && obj.ds === 'anemia_men_3'), 'n_cas','n')"
        class="chart"
        :universo="{ 
          values: { 
            nacional: this.findinFilter(this.$store.getters['reporte/results'].anemia.filter((obj)=>obj.cat ==='Nacional' && obj.ds === 'anemia_men_3'), 'evaluados','n'), 
            departamento:this.findinFilter(this.$store.getters['reporte/results'].anemia.filter((obj)=>obj.cat ==='Departamento' && obj.ds === 'anemia_men_3'), 'evaluados','n'),
            provincia: this.findinFilter(this.$store.getters['reporte/results'].anemia.filter((obj)=>obj.cat ==='Provincia' && obj.ds === 'anemia_men_3'), 'evaluados','n'),
            distrito: this.findinFilter(this.$store.getters['reporte/results'].anemia.filter((obj)=>obj.cat ==='Distrito' && obj.ds === 'anemia_men_3'), 'evaluados','n')
          },
          description: 'niños de 6 a 36 meses'}"
      />
      <div class="separator"></div>
      <CircularChart
        ctitle="Anemia en gestantes (%)"
        class="chart"
        :colors="colors"
        :distrito="this.findinFilter(this.$store.getters['reporte/results'].anemia.filter((obj)=>obj.cat ==='Distrito' && obj.ds === 'anemia_gestante' ), 'ane_p','p')"
        :provincia="this.findinFilter(this.$store.getters['reporte/results'].anemia.filter((obj)=>obj.cat ==='Provincia' && obj.ds === 'anemia_gestante'), 'ane_p','p')"
        :departamento="this.findinFilter(this.$store.getters['reporte/results'].anemia.filter((obj)=>obj.cat ==='Departamento' && obj.ds === 'anemia_gestante'), 'ane_p','p')"
        :nacional="this.findinFilter(this.$store.getters['reporte/results'].anemia.filter((obj)=>obj.cat ==='Nacional' && obj.ds === 'anemia_gestante'), 'ane_p','p')"
        :ndistrito="this.findinFilter(this.$store.getters['reporte/results'].anemia.filter((obj)=>obj.cat ==='Distrito' && obj.ds === 'anemia_gestante' ), 'n_cas', 'n')"
        :nprovincia="this.findinFilter(this.$store.getters['reporte/results'].anemia.filter((obj)=>obj.cat ==='Provincia' && obj.ds === 'anemia_gestante'), 'n_cas', 'n')"
        :ndepartamento="this.findinFilter(this.$store.getters['reporte/results'].anemia.filter((obj)=>obj.cat ==='Departamento' && obj.ds === 'anemia_gestante'), 'n_cas', 'n')"
        :nnacional="this.findinFilter(this.$store.getters['reporte/results'].anemia.filter((obj)=>obj.cat ==='Nacional' && obj.ds === 'anemia_gestante'), 'n_cas', 'n')"
        :universo="{ 
          values: { 
            nacional: this.findinFilter(this.$store.getters['reporte/results'].anemia.filter((obj)=>obj.cat ==='Nacional' && obj.ds === 'anemia_gestante'), 'evaluados', 'n'),
            departamento:this.findinFilter(this.$store.getters['reporte/results'].anemia.filter((obj)=>obj.cat ==='Departamento' && obj.ds === 'anemia_gestante'), 'evaluados', 'n'),
            provincia: this.findinFilter(this.$store.getters['reporte/results'].anemia.filter((obj)=>obj.cat ==='Provincia' && obj.ds === 'anemia_gestante'), 'evaluados', 'n'),
            distrito: this.findinFilter(this.$store.getters['reporte/results'].anemia.filter((obj)=>obj.cat ==='Distrito' && obj.ds === 'anemia_gestante'), 'evaluados', 'n')
          },
          description: 'gestantes'
        }"
      />
    </div>
    <div class="contenido">
      <CircularChart
        ctitle="Personal de Salud - Médicos (%)"
        class="chart"
        :colors="colors"
        :distrito="this.findinFilter(this.$store.getters['reporte/results'].medicos.filter((obj)=>obj.cat ==='Distrito'), 'p_medicos', 'p')"
        :provincia="this.findinFilter(this.$store.getters['reporte/results'].medicos.filter((obj)=>obj.cat ==='Provincia'), 'p_medicos', 'p')"
        :departamento="this.findinFilter(this.$store.getters['reporte/results'].medicos.filter((obj)=>obj.cat ==='Departamento'), 'p_medicos', 'p')"
        :nacional="this.findinFilter(this.$store.getters['reporte/results'].medicos.filter((obj)=>obj.cat ==='Nacional'), 'p_medicos', 'p')"
        :ndistrito="this.findinFilter(this.$store.getters['reporte/results'].medicos.filter((obj)=>obj.cat ==='Distrito' ), 'medicos','n')"
        :nprovincia="this.findinFilter(this.$store.getters['reporte/results'].medicos.filter((obj)=>obj.cat ==='Provincia'), 'medicos','n')"
        :ndepartamento="this.findinFilter(this.$store.getters['reporte/results'].medicos.filter((obj)=>obj.cat ==='Departamento'), 'medicos','n')"
        :nnacional="this.findinFilter(this.$store.getters['reporte/results'].medicos.filter((obj)=>obj.cat ==='Nacional'), 'medicos','n')"
      />
      <div class="separator"></div>
      <CircularChart
        ctitle=" Población Afiliada al SIS (%)"
        :colors="colors"
        :distrito="this.findinFilter(this.$store.getters['reporte/results'].censo2017.filter((obj)=>obj.cat ==='Distrito'), 'p_af_sis','p')"
        :provincia="this.findinFilter(this.$store.getters['reporte/results'].censo2017.filter((obj)=>obj.cat ==='Provincia'), 'p_af_sis','p')"
        :departamento="this.findinFilter(this.$store.getters['reporte/results'].censo2017.filter((obj)=>obj.cat ==='Departamento'), 'p_af_sis','p')"
        :nacional="this.findinFilter(this.$store.getters['reporte/results'].censo2017.filter((obj)=>obj.cat ==='Nacional'), 'p_af_sis','p')"
        :ndistrito="this.findinFilter(this.$store.getters['reporte/results'].censo2017.filter((obj)=>obj.cat ==='Distrito' ), 'af_sis', 'n')"
        :nprovincia="this.findinFilter(this.$store.getters['reporte/results'].censo2017.filter((obj)=>obj.cat ==='Provincia'), 'af_sis', 'n')"
        :ndepartamento="this.findinFilter(this.$store.getters['reporte/results'].censo2017.filter((obj)=>obj.cat ==='Departamento'), 'af_sis', 'n')"
        :nnacional="this.findinFilter(this.$store.getters['reporte/results'].censo2017.filter((obj)=>obj.cat ==='Nacional'), 'af_sis', 'n')"
        class="chart"
      />
      <div class="separator"></div>
      <CircularChart
        ctitle="Población no cuenta con un seguro de salud (%)"
        :colors="colors"
        :distrito="this.findinFilter(this.$store.getters['reporte/results'].censo2017.filter((obj)=>obj.cat ==='Distrito'), 'p_af_ning', 'p')"
        :provincia="this.findinFilter(this.$store.getters['reporte/results'].censo2017.filter((obj)=>obj.cat ==='Provincia'), 'p_af_ning', 'p')"
        :departamento="this.findinFilter(this.$store.getters['reporte/results'].censo2017.filter((obj)=>obj.cat ==='Departamento'), 'p_af_ning', 'p')"
        :nacional="this.findinFilter(this.$store.getters['reporte/results'].censo2017.filter((obj)=>obj.cat ==='Nacional'), 'p_af_ning', 'p')"
        :ndistrito="this.findinFilter(this.$store.getters['reporte/results'].censo2017.filter((obj)=>obj.cat ==='Distrito' ), 'af_ning','n')"
        :nprovincia="this.findinFilter(this.$store.getters['reporte/results'].censo2017.filter((obj)=>obj.cat ==='Provincia' ), 'af_ning','n')"
        :ndepartamento="this.findinFilter(this.$store.getters['reporte/results'].censo2017.filter((obj)=>obj.cat ==='Departamento' ), 'af_ning','n')"
        :nnacional="this.findinFilter(this.$store.getters['reporte/results'].censo2017.filter((obj)=>obj.cat ==='Nacional' ), 'af_ning','n')"
        class="chart"
      />
    </div>
    <Fuente label="Fuente: MINSA - Instituto Nacional de Salud (INS), Diciembre 2022 / Marzo 2023" />
  </div>
</template>

<script>
import CircularChart from "~/components/reportea3/CircularChart.vue";
import Leyenda from "~/components/reportea3/Leyenda.vue";
import Fuente from "~/components/reportea3/Fuente.vue";
import numberFormat from "~/mixins/numberFormat.js";

export default {
  name: 'salud',
  mixins: [numberFormat],
  data() {
    return {
      colors: {
        nacional: "#ff6356",
        departamento: "#313b00",
        provincia: "#5a7000",
        distrito: "#84a900"
      }
    };
  },
  methods: {
    findinFilter(object, field, format) {
      let value = object.length > 0 ? object[0][field] : 0;

      if(format  === 'p') {
        return parseFloat(value).toFixed(1);
      } else if( format === 'n') {
        return this.formatNumber(value, 0);
      }
    }
  },
  mounted() {},
  components: {
    CircularChart,
    Leyenda,
    Fuente
  }
};
</script>

<style>

.salud {
  height: 100%;
  text-align: left;
  background-color: #fafcf5 !important;
  border-radius: 10px 10px 10px 10px;
}

.salud .cabecera {
  text-align:center;
  height:8%;
}

.salud .cabecera .title 
{
  width:100%;height:50%;
}

.salud .cabecera .title span {
  font-size: 18px;
  font-weight: 600;
  color: #5a7000 !important;
}

.salud .cabecera .title .leyenda {
  width:100%;
  height:50%;
}

.salud .contenido {
  width:100%;
  height:44%;
}

.salud .contenido .separator {
  float:left;
  width:0.5%;
  height:82%;
}

.salud .contenido .chart {
  width: 33%;
  border-radius: 10px 10px 10px 10px;
  height: 100%;
  /*background-color:#f2f5e3 !important;*/
  float: left;
}

.salud .fuente {
  height:4%
}
</style>
<style scoped>
/deep/ .chart .label-nacional b {
  color: #ff6356 !important;
}

/deep/ .chart .label-departamento b {
  color: #313b00 !important;
}

/deep/ .chart .label-provincia b {
  color: #5a7000 !important;
}

/deep/ .chart .label-distrito b {
  color: #84a900 !important;
}

/* Leyenda */
/deep/ .leyenda .item {
  font-size: 7px;
}
/deep/ .leyenda .item .legend-circle {
  width: 7px;
  height: 7px;
}

/deep/ .leyenda .item .legend-circle-nacional {
  background-color: #ff6356 !important;
}

/deep/ .leyenda .item .legend-circle-departamento {
  background-color: #313b00 !important;
}

/deep/ .leyenda .item .legend-circle-provincia {
  background-color: #5a7000 !important;
}

/deep/ .leyenda .item .legend-circle-distrito {
  background-color: #84a900 !important;
}
</style>