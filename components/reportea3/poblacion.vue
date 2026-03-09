<template>
  <div class="poblacion" @dblclick="zoomo">
    <div class="cabecera">
      <div class="title">
        <span >Población</span>
      </div>
      <Leyenda order="desc"/>
    </div>

    <div class="contenido">
      <div class="item">
        <div class="title">
          <label>Población censada</label>
        </div>
        <div class="values">
          <div :style="{'width':this.labelWidth+'%','float':'left','text-align':'center'}">
            <span
              class="label-nacional"
              v-text="formatNumber( reporteStore.results.censo2017.filter((obj)=>obj.cat ==='Nacional')[0].pob_total, 0 )"
            ></span>
          </div>

          <div :style="{'width':this.labelWidth+'%','float':'left','text-align':'center'}">
            <span
              class="label-departamento"
              v-text="formatNumber( reporteStore.results.censo2017.filter((obj)=>obj.cat ==='Departamento')[0].pob_total, 0 )"
            ></span>
          </div>
           <div v-if="reporteStore.tipo === 'dist'||reporteStore.tipo === 'prov'" :style="{'width':this.labelWidth+'%','float':'left','text-align':'center'}">
            <span
              class="label-provincia"
              v-text="formatNumber( reporteStore.results.censo2017.filter((obj)=>obj.cat ==='Provincia')[0].pob_total, 0 )"
            ></span>
          </div>
            <div v-if="reporteStore.tipo === 'dist'" :style="{'width':this.labelWidth+'%','float':'left','text-align':'center'}">
            <span
              class="label-distrito"
              v-text="formatNumber( reporteStore.results.censo2017.filter((obj)=>obj.cat ==='Distrito')[0].pob_total, 0 )"
            ></span>
          </div>
        </div>
      </div>
      <div class="separator"></div>
      <div class="item">
        <div class="title">
          <label>Número de viviendas</label>
        </div>
        <div class="values">
          <div :style="{'width':this.labelWidth+'%','float':'left','text-align':'center'}">
            <span
              class="label-nacional"
              v-text="formatNumber( reporteStore.results.brecha.filter((obj)=>obj.cat ==='Nacional')[0].num_viv_op, 0 )"
            ></span>
          </div>
           <div :style="{'width':this.labelWidth+'%','float':'left','text-align':'center'}">
            <span
              class="label-departamento"
              v-text="formatNumber( reporteStore.results.brecha.filter((obj)=>obj.cat ==='Departamento')[0].num_viv_op, 0 )"
            ></span>
          </div>
           <div v-if="reporteStore.tipo === 'dist'||reporteStore.tipo === 'prov'" :style="{'width':this.labelWidth+'%','float':'left','text-align':'center'}">
            <span
              class="label-provincia"
              v-text="formatNumber( reporteStore.results.brecha.filter((obj)=>obj.cat ==='Provincia')[0].num_viv_op, 0 )"
            ></span>
          </div>
           <div v-if="reporteStore.tipo === 'dist'" :style="{'width':this.labelWidth+'%','float':'left','text-align':'center'}">
            <span
              class="label-distrito"
              v-text="formatNumber( reporteStore.results.brecha.filter((obj)=>obj.cat ==='Distrito')[0].num_viv_op, 0 )"
            ></span>
          </div>
        </div>
      </div>
      <div class="separator"></div>
      <div class="item">
        <div class="title">
          <label>Número de hogares</label>
        </div>
        <div class="values">
          <div :style="{'width':this.labelWidth+'%','float':'left','text-align':'center'}">
            <span
              class="label-nacional"
              v-text="formatNumber( reporteStore.results.brecha.filter((obj)=>obj.cat ==='Nacional')[0].num_hogare, 0 )"
            ></span>
          </div>
          <div :style="{'width':this.labelWidth+'%','float':'left','text-align':'center'}">
            <span
              class="label-departamento"
              v-text="formatNumber( reporteStore.results.brecha.filter((obj)=>obj.cat ==='Departamento')[0].num_hogare, 0 )"
            ></span>
          </div>
          <div v-if="reporteStore.tipo === 'dist'||reporteStore.tipo === 'prov'" :style="{'width':this.labelWidth+'%','float':'left','text-align':'center'}">
            <span
              class="label-provincia"
              v-text="formatNumber( reporteStore.results.brecha.filter((obj)=>obj.cat ==='Provincia')[0].num_hogare, 0 )"
            ></span>
          </div>

           <div v-if="reporteStore.tipo === 'dist'" :style="{'width':this.labelWidth+'%','float':'left','text-align':'center'}">
            <span
              class="label-distrito"
              v-text="formatNumber( reporteStore.results.brecha.filter((obj)=>obj.cat ==='Distrito')[0].num_hogare, 0 )"
            ></span>
          </div>
        </div>
      </div>
      <Fuente style="height:10%;" label="Fuente: INEI - Censos Nacionales, 2017" />
    </div>
  </div>
</template>

<script>
import { useReporteStore } from '~/stores/reporte'
import numberFormat from "~/mixins/numberFormat.js";
import Leyenda from "~/components/reportea3/Leyenda.vue";
import Fuente from "~/components/reportea3/Fuente.vue";

export default {
  name: 'poblacion',
  mixins: [numberFormat],
  components: {
    Leyenda,
    Fuente
  },
  setup() {
    const reporteStore = useReporteStore()
    return { reporteStore }
  },
  data: () => {
      return {
          labelWidth:25
      }
  },
  mounted() {
      if( this.reporteStore.tipo === 'prov' ) {
          this.labelWidth = 33.3
      }
      if( this.reporteStore.tipo === 'dpto' ) {
          this.labelWidth = 48.3
      }
  }
};
</script>

<style scoped>

.poblacion {
  height:100%;
  width:100%;
}

.poblacion .cabecera {
  width:100%;
  height:20%;
  text-align:center;
}

.poblacion .title {
  width: 100%;
}

.poblacion .title span{
  font-size: 20px;
  font-weight: 600;
}

.poblacion .contenido {
  height:80%;
  background-color: #e9f5ff !important;
  border-radius: 10px 10px 10px 10px;
  text-align: left;
}

.poblacion .contenido .item {
  background-color: #d4edff !important;
  border-radius: 10px 10px 10px 10px;
  height:23%;
}

.poblacion .contenido .item label {
  font-size: 14px;
  margin-left: 10px;
  line-height: 5px;
}

.poblacion .contenido .item .values {
  text-align: right;
  line-height: 13px;
}

.poblacion .contenido .item .values span {
  font-size: 14px;
  margin-left: 6px;
  margin-right: 6px;
  text-align: right;
  font-weight: 600;
}

.poblacion .label-nacional {
  color: #ff6356 !important;
}
.poblacion .label-departamento {
  color: #18226d !important;
}
.poblacion .label-provincia {
  color: #5c74ae !important;
}
.poblacion .label-distrito {
  color: #179aff !important;
}

.contenido .separator {
  min-height: 20px;
  width: 100%;
}

:deep(.leyenda .item) {
  font-size: 10px;
}
:deep(.leyenda .item .legend-circle) {
  width: 9px;
  height: 9px;
}

:deep(.leyenda .item .legend-circle-nacional) {
  background-color: #ff6356 !important;
}

:deep(.leyenda .item .legend-circle-departamento) {
  background-color: #18226d !important;
}

:deep(.leyenda .item .legend-circle-provincia) {
  background-color: #617ab6 !important;
}

:deep(.leyenda .item .legend-circle-distrito) {
  background-color: #179aff !important;
}


.values * {
  font-size: 13px !important;
}
</style>
