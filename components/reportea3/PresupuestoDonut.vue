<template>
  <div style="width:100%;height:100%;">
    <div style="height:6%">
      <div
        style="text-align:center;width:100%;padding-top:10%;line-height:20px;padding-top:12px;font-size:18px;font-weight:800;color:#4CAF54;"
      >¿CUÁNTO PRESUPUESTO LE CORRESPONDE?</div>
    </div>

    <SlicedCircularDonutChart
      @dblclick.native="zoomo"
      style="width:100%;height:65%;"
      :title="this.chart.title"
      :series="this.chart.series"
    />

    <div style="width:100%;height:6%; text-align:center;">
      <div class="leyenda">
        <span class="item">
          <span :class="['legend-circle', 'legend-circle-1']"></span>
          Gastos de Capital
        </span>
        <span class="item">
          <span :class="['legend-circle', 'legend-circle-2']"></span>
          Gastos Corrientes
        </span>
      </div>
    </div>
    <div
      style="float:left;width:100%;font-size:10px;text-align:justify;padding:12px 16px 0 16px;height:16%"
    >
    <Fuente
              style="height:3%;margin-top:12px;margin-bottom:8px;"
              :label="`Fuente: MEF - Consulta Amigable, actualización al <strong>${reporteStore.results.mef[0].fecha}</strong>`"
            />
      <strong>NOTA</strong>:
      <br />- No se consideran reservas, pensiones, adquisición de activos financieros ni
      servicio de la deuda.
      <br />-
      <strong>Gastos de Capital:</strong> Gastos destinados a la adquisición o producción de
      activos tangibles, que incrementan el activo del sector público y sirven como
      instrumentos para la producción de bienes y servicios.
      <br />-
      <strong>Gastos Corrientes:</strong> Gastos destinados a la producción de bienes y prestación
      de servicios, tales como gastos de consumo, gestión operativa, servicios
      básicos, prestaciones de la seguridad social y otros.
    </div>
  </div>
</template>
<script>
import SlicedCircularDonutChart from "~/components/Dumb/SlicedCircularDonutChart";
import numberFormat from "~/mixins/numberFormat";
import Fuente from '~/components/reportea3/Fuente';
import { useReporteStore } from '~/stores/reporte'
export default {
  setup() {
    const reporteStore = useReporteStore()
    return { reporteStore }
  },
  mixins: [numberFormat],
  data() {
    return {
      chart: {
        series: [
          {
            name: "Presupuesto",
            data: [],
            size: "70%",
            innerSize: "60%",
            dataLabels: {
              formatter: function() {
                // display only if larger than 1
                return this.y > 1
                  ? "<b>" +
                      this.point.name +
                      ":</b><br> S/ " +
                      parseInt(this.y)
                        .toString()
                        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
                  : null;
              }
            }
          }
        ],
        title: ""
      }
    };
  },
  components: {
    SlicedCircularDonutChart,
    Fuente
  },
  created() {
    let gcap = reporteStore.results.presupuesto2020.filter(
      obj => {
        return (
          obj.cat === "Departamento" && obj.tipo === "1" && obj.monto !== "0"
        );
      }
    );
    let gord = reporteStore.results.presupuesto2020.filter(
      obj => {
        return (
          obj.cat === "Departamento" && obj.tipo === "2" && obj.monto !== "0"
        );
      }
    );

    let categories = ["Gastos de Capital", "Gastos Corrientes"];
    this.chart.title =
      '<div style="font-size:25px;font-weight:800">' +
      this.cutNumberToText(
        reporteStore.results.presupuesto2020.reduce(function(
              prev,
              cur
            ) {
              return prev + parseInt(cur.monto);
            },
            0)
      ).split(' ').join('<br>')
      ' </div>';
    let data = [
        {
          y: 55.11,
          color: "#2479A7",
          drilldown: {
            name: "Gastos de Capital",
            categories: gcap.map(obj => obj.funcion),
            data: gcap.map(obj => parseInt(obj.monto))
          }
        },
        {
          y: 21.63,
          color: "#4CAF54",
          drilldown: {
            name: "Gastos Corrientes",
            categories: gord.map(obj => obj.funcion),
            data: gord.map(obj => parseInt(obj.monto))
          }
        }
      ],
      browserData = [],
      versionsData = [],
      i,
      j,
      dataLen = data.length,
      drillDataLen,
      brightness;

    // Build the data arrays
    for (i = 0; i < dataLen; i += 1) {
      // add version data
      drillDataLen = data[i].drilldown.data.length;
      for (j = 0; j < drillDataLen; j += 1) {
        brightness = 0.2 - j / drillDataLen / 5;
        this.chart.series[0].data.push({
          name: data[i].drilldown.categories[j],
          y: data[i].drilldown.data[j],
          color: data[i].color
        });
      }
    }
  }
};
</script>
<style scoped>
.leyenda .item {
  font-size: 11px;
  font-weight: 600;
  text-align: center;
  line-height: 20px;
}

.leyenda .item .legend-circle {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
}
.leyenda .item .legend-circle-1 {
  background-color: #2479A7;
}

.leyenda .item .legend-circle-2 {
  background-color: #4CAF54;
}
</style>