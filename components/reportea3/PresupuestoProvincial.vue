<template>
  <div style="width:100%;height:100%;background-color:#edf2f9;border-radius:10px 10px 10px 10px">
    <div
      style="height:8%;line-height:18px;text-align:center;display:table;width:100%;font-size:16px;padding-left:8px;padding-right:8px;"
    >
      <span style="display:table-cell;vertical-align: middle;text-align:center;font-weight:600;">
        Presupuesto de la Municipalidad (S/)
        <br>Provincial de 
        <span
          v-text="reporteStore.results.ejecutora[0].nom_prov"
        ></span>,
        <br>2016 - 2019 <br>
      </span>
    </div>

    <div class="box-container" style="height:24%;" @dblclick="zoomo">
      <div style="width:100%;height:80%">
        <!-- 2019 -->
        <HorizontalBarchart  
          style="width:100%;height:100%;"
          :data="reporteStore.results.ejecucion.filter((obj)=>obj.ano_eje ==='2019')[0]"
          :legendClass="1"
          :legendColor="1"
        />
      </div>
      <div style="width:100%;height:20%">
        <div style="width:100%;height:100%">
          <div style="width:60%;float:left;height:100%;display:table;text-align:center;">
            <span style="display:table-cell;vertical-align: middle;">
              <div>
                <div class="rectangle-provincial" style="display:inline-block;"></div>
                <span style="font-size:12px;font-weight:600;">Presupuesto</span>
                <br>
              </div>
            </span>
          </div>
          <div style="width:40%;float:left;height:100%;display:table;text-align:left;">
            <div style="display:table-cell;vertical-align: middle;line-height:15px;">
              <span style="font-size:12px;font-weight:600;">Ejecución</span>
              <br>
              <div class="rectangle-legend-1" style="display:inline-block;"></div>
              <span style="font-size:12px">0 - 24.99%</span>
              <br>
              <div class="rectangle-legend-2" style="display:inline-block;"></div>
              <span style="font-size:12px">25 - 49.99%</span>
              <br>
              <div class="rectangle-legend-3" style="display:inline-block;"></div>
              <span style="font-size:12px">50% - 100%</span>
              <br>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="height:1.5%;">&nbsp;</div>
    <div class="box-container" style="height:66.5%;">
      <!-- 2018 -->
      <div style="width:100%;height:28.6%;" @dblclick="zoomo">
        <HorizontalBarchart  
          style="width:100%;height:100%;"
          :data="reporteStore.results.ejecucion.filter((obj)=>obj.ano_eje ==='2018')[0]"
          :legendClass="2"
          :legendColor="1"
        />
      </div>
      <div style="min-height:2%;width:100%">&nbsp;</div>
      <!-- 2017 -->
      <div style="width:100%;height:28.6%;" @dblclick="zoomo">
        <HorizontalBarchart
          style="width:100%;height:100%;"
          :data="reporteStore.results.ejecucion.filter((obj)=>obj.ano_eje ==='2017')[0]"
          :legendClass="2"
          :legendColor="1"
        />
      </div>
      <div style="min-height:2%;width:100%">&nbsp;</div>
      <!-- 2016 -->
      <div style="width:100%;height:28.6%;" @dblclick="zoomo">
      <HorizontalBarchart
        style="width:100%;height:100%;"
        :data="reporteStore.results.ejecucion.filter((obj)=>obj.ano_eje ==='2016')[0]"
        :legendClass="2"
        :legendColor="1"
      />
      </div>
      <div style="width:100%;height:10%">
        <div style="width:100%;height:100%">
          <div style="width:60%;float:left;height:100%;display:table;text-align:center;">
            <span style="display:table-cell;vertical-align: middle;">
              <div>
                <div class="rectangle-provincial" style="display:inline-block;"></div>
                <span style="font-size:12px;font-weight:600;">Presupuesto</span>
                <br>
              </div>
            </span>
          </div>
          <div style="width:40%;float:left;height:100%;display:table;text-align:left;">
            <div style="display:table-cell;vertical-align: middle;line-height:15px;">
              <span style="font-size:12px;font-weight:600;">Ejecución</span>
              <br>
              <div class="rectangle-legend-1" style="display:inline-block;"></div>
              <span style="font-size:12px">0 - 49.99%</span>
              <br>
              <div class="rectangle-legend-2" style="display:inline-block;"></div>
              <span style="font-size:12px">50 - 74.99%</span>
              <br>
              <div class="rectangle-legend-3" style="display:inline-block;"></div>
              <span style="font-size:12px">75% - 100%</span>
              <br>
            </div>
          </div>
        </div>
      </div>
    </div>
     
  </div>
</template>

<script>
import HorizontalBarchart from "~/components/reportea3/HorizontalBarchart.vue";
import { useReporteStore } from '~/stores/reporte'
export default {
  setup() {
    const reporteStore = useReporteStore()
    return { reporteStore }
  },
  components: {
    HorizontalBarchart
  }
};
</script>

<style scoped>
.p-container {
  text-align: center;
}

.box-container {
  background-color: #e2eef8 !important;
  border-radius: 10px 10px 10px 10px;
}

.box-container label {
  font-size: 0.8em;
  margin-left: 10px;
  line-height: 5px;
}

.box-container .values {
  text-align: right;
  line-height: 13px;
}

.box-container .values span {
  font-size: 0.8em;
  margin-left: 6px;
  margin-right: 6px;
  text-align: right;
}

.info-container .separator {
  min-height: 20px;
  width: 100%;
}

.legend {
  font-size: 0.6em;
}
.legend .legend-circle {
  width: 6px;
  height: 6px;
}

  .rectangle-provincial {
       width: 38px;
      min-height: 10px;
      background: #8CB3D1 !important;
  }

   .rectangle-legend-1 {
      width: 38px;
      min-height: 10px;
      background:#FF6666 !important;
    }

     .rectangle-legend-2 {
      width: 38px;
      min-height: 10px;
      background: #F4E67A !important;
    }

     .rectangle-legend-3 {
      width: 38px;
      min-height: 10px;
      background:#98BF61 !important;
    }
</style>
