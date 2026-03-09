<template>
  
    <div style="height:100%;width:100%;text-align:left;">
      <div style="text-align:center;min-height:8%;line-height:17px;display:table;" v-if="reporteStore.results.ejecutora[0].nombre.length >= 80">
        <div style="display:table-cell;vertical-align: bottom;text-align:center;">
            <div style="text-align:center;width:100%;height:100%">
                
                <span class="title" style="line-heigth:5px;" v-text="this.ucwords(reporteStore.results.ejecutora[0].nombre,true).replace(/De/g,'de')"></span>
                <br>
                <span class="subtitle">Ejecución presupuestal por fuente de financiamiento (S/)</span>
            </div>
        </div>
        
      </div>

      <div style="text-align:center;min-height:8%;line-height:17px;padding-top:2%;" v-else>
        <div style="vertical-align: bottom;text-align:center;">
            
                
                <span class="title"  v-text="this.ucwords(reporteStore.results.ejecutora[0].nombre,true).replace(/De/g,'de')"></span>
                <br>
                <span class="subtitle">Ejecución presupuestal por fuentes de financiamiento (S/)</span>
            
        </div>
        
      </div>

      <div class="c-container" style="height:92%;padding-top:0.5%;">

        <table style="width:100%;" class="table-container">
            <thead style="height:4%;">
                <tr>
                    <th></th>
                    <th colspan="2"><span class="text-box strong-box" style="font-size:25px;">2021</span></th>
                    <th colspan="2"><span class="text-box light-box" style="font-size:25px;">2022</span></th>
                    <th colspan="2"><span class="text-box strong-box" style="font-size:25px;">2023</span></th>
                </tr>
                <div class="in-table-row-separator"></div>
                <tr>
                    <th></th>
                    <th><span class="text-box strong-box pull-right" style="font-size:12px;">Presupuesto</span></th>
                    <th><span class="text-box strong-box pull-left" style="font-size:12px;">Ejecutado</span></th>
                    <th><span class="text-box light-box pull-right" style="font-size:12px;">Presupuesto</span></th>
                    <th><span class="text-box light-box pull-left" style="font-size:12px;">Ejecutado</span></th>
                    <th><span class="text-box strong-box pull-right" style="font-size:12px;">Presupuesto</span></th>
                    <th><span class="text-box strong-box pull-left" style="font-size:12px;">Ejecutado</span></th>
                </tr>
            </thead>
            <br>
             <tbody @dblclick="zoomo">
                <!-- FIRST PATTERN -->
                
                <tr class="table-row">
                    <td class="table-subtitle" style="font-weight:700;font-size:18px;">TOTAL</td>
                    <td>
                        <div class="strong-box pad text-center pull-right" style="font-weight:600;font-size:13px;" v-text="formatNumber( reporteStore.results.fuente_financiamiento.filter((obj)=>(obj.anioeje==='2021')).reduce(function(prevVal, elem) {  return prevVal + (!isNaN(parseFloat(elem.pim))&&elem.pim!==null ? parseFloat(elem.pim) : 0) }, 0) , 0)"></div>
                    </td>
                    <td>
                        <div class="strong-box pad text-center pull-left" style="font-weight:600;font-size:13px;" v-text="formatNumber( reporteStore.results.fuente_financiamiento.filter((obj)=>(obj.anioeje==='2021')).reduce(function(prevVal, elem) {  return prevVal + (!isNaN(parseFloat(elem.dev))&&elem.pim!==null ? parseFloat(elem.dev) : 0) }, 0) , 0)"></div>
                    </td>
                    <td>
                        <div class="light-box pad text-center pull-right" style="font-weight:600;font-size:13px;" v-text="formatNumber( reporteStore.results.fuente_financiamiento.filter((obj)=>(obj.anioeje==='2022')).reduce(function(prevVal, elem) {  return prevVal + (!isNaN(parseFloat(elem.pim))&&elem.pim!==null ? parseFloat(elem.pim) : 0) }, 0) , 0)"></div>
                    </td>
                    <td>
                        <div class="light-box pad text-center pull-left" style="font-weight:600;font-size:13px;" v-text="formatNumber( reporteStore.results.fuente_financiamiento.filter((obj)=>(obj.anioeje==='2022')).reduce(function(prevVal, elem) {  return prevVal + (!isNaN(parseFloat(elem.dev))&&elem.pim!==null ? parseFloat(elem.dev) : 0) }, 0) , 0)"></div>
                    </td>
                    <td>
                        <div class="strong-box pad text-center pull-right" style="font-weight:600;font-size:13px;" v-text="formatNumber( reporteStore.results.fuente_financiamiento.filter((obj)=>(obj.anioeje==='2023')).reduce(function(prevVal, elem) {  return prevVal + (!isNaN(parseFloat(elem.pim))&&elem.pim!==null ? parseFloat(elem.pim) : 0) }, 0) , 0)"></div>
                    </td>
                    <td>
                        <div class="strong-box pad text-center pull-left" style="font-weight:600;font-size:13px;" v-text="formatNumber( reporteStore.results.fuente_financiamiento.filter((obj)=>(obj.anioeje==='2023')).reduce(function(prevVal, elem) {  return prevVal + (!isNaN(parseFloat(elem.dev))&&elem.pim!==null ? parseFloat(elem.dev) : 0) }, 0) , 0)"></div>
                    </td>
                </tr>
                
                <!-- FIRST PATTERN #end -->        
            </tbody>
            <div class="in-table-row-separator"></div>
            <tbody @dblclick="zoomo">
                
                
                <tr class="table-row">
                    <td class="table-subtitle">Recursos <br>Ordinarios</td>
                    <td>
                        <div class="strong-box pad text-center pull-right" v-text="getVal('RECURSOS ORDINARIOS', '2021', 'pim')"></div>
                    </td>
                    <td>
                        <div class="strong-box pad text-center pull-left" v-text="getVal('RECURSOS ORDINARIOS', '2021', 'dev')"></div>
                    </td>
                    <td>
                        <div class="light-box pad text-center pull-right" v-text="getVal('RECURSOS ORDINARIOS', '2022', 'pim')"></div>
                    </td>
                    <td>
                        <div class="light-box pad text-center pull-left" v-text="getVal('RECURSOS ORDINARIOS', '2022', 'dev')"></div>
                    </td>
                    <td>
                        <div class="strong-box pad text-center pull-right" v-text="getVal('RECURSOS ORDINARIOS', '2023', 'pim')"></div>
                    </td>
                    <td>
                        <div class="strong-box pad text-center pull-left" v-text="getVal('RECURSOS ORDINARIOS', '2023', 'dev')"></div>
                    </td>
                </tr>
                 
            </tbody>
            <div class="in-table-row-separator"></div>
            <tbody @dblclick="zoomo">                
                 <tr class="table-row">
                    <td class="table-subtitle">Fondo de <br> Compensación<br> Municipal</td>
                    <td>
                        <div class="strong-box pad text-center pull-right" v-text="getVal('FONDO DE COMPENSACION MUNICIPAL', '2021', 'pim')"></div>
                    </td>
                    <td>
                        <div class="strong-box pad text-center pull-left" v-text="getVal('FONDO DE COMPENSACION MUNICIPAL', '2021', 'dev')"></div>
                    </td>
                    <td>
                        <div class="light-box pad text-center pull-right" v-text="getVal('FONDO DE COMPENSACION MUNICIPAL', '2022', 'pim')"></div>
                    </td>
                    <td>
                        <div class="light-box pad text-center pull-left" v-text="getVal('FONDO DE COMPENSACION MUNICIPAL', '2022', 'dev')"></div>
                    </td>
                    <td>
                        <div class="strong-box pad text-center pull-right" v-text="getVal('FONDO DE COMPENSACION MUNICIPAL', '2023', 'pim')"></div>
                    </td>
                    <td>
                        <div class="strong-box pad text-center pull-left" v-text="getVal('FONDO DE COMPENSACION MUNICIPAL', '2023', 'dev')"></div>
                    </td>
                </tr>
            </tbody>
            <div class="in-table-row-separator"></div>
            <tbody @dblclick="zoomo">                
                  <tr class="table-row">
                    <td class="table-subtitle">Impuestos <br> Municipales</td>
                     <td>
                        <div class="strong-box pad text-center pull-right" v-text="getVal('IMPUESTOS MUNICIPALES', '2021', 'pim')"></div>
                    </td>
                    <td>
                        <div class="strong-box pad text-center pull-left" v-text="getVal('IMPUESTOS MUNICIPALES', '2021', 'dev')"></div>
                    </td>
                    <td>
                        <div class="light-box pad text-center pull-right" v-text="getVal('IMPUESTOS MUNICIPALES', '2022', 'pim')"></div>
                    </td>
                    <td>
                        <div class="light-box pad text-center pull-left" v-text="getVal('IMPUESTOS MUNICIPALES', '2022', 'dev')"></div>
                    </td>
                    <td>
                        <div class="strong-box pad text-center pull-right" v-text="getVal('IMPUESTOS MUNICIPALES', '2023', 'pim')"></div>
                    </td>
                    <td>
                        <div class="strong-box pad text-center pull-left" v-text="getVal('IMPUESTOS MUNICIPALES', '2023', 'dev')"></div>
                    </td>
                </tr>
            </tbody>
            <div class="in-table-row-separator"></div>
            <tbody @dblclick="zoomo">                
                 <tr class="table-row">
                    <td class="table-subtitle">Recursos<br> Directamente<br> Recaudados</td>
                   <td>
                        <div class="strong-box pad text-center pull-right" v-text="getVal('RECURSOS DIRECTAMENTE RECAUDADOS', '2021', 'pim')"></div>
                    </td>
                    <td>
                        <div class="strong-box pad text-center pull-left" v-text="getVal('RECURSOS DIRECTAMENTE RECAUDADOS', '2021', 'dev')"></div>
                    </td>
                    <td>
                        <div class="light-box pad text-center pull-right" v-text="getVal('RECURSOS DIRECTAMENTE RECAUDADOS', '2022', 'pim')"></div>
                    </td>
                    <td>
                        <div class="light-box pad text-center pull-left" v-text="getVal('RECURSOS DIRECTAMENTE RECAUDADOS', '2022', 'dev')"></div>
                    </td>
                    <td>
                        <div class="strong-box pad text-center pull-right" v-text="getVal('RECURSOS DIRECTAMENTE RECAUDADOS', '2023', 'pim')"></div>
                    </td>
                    <td>
                        <div class="strong-box pad text-center pull-left" v-text="getVal('RECURSOS DIRECTAMENTE RECAUDADOS', '2023', 'dev')"></div>
                    </td>
                </tr>
            </tbody>
            <div class="in-table-row-separator"></div>
            <tbody @dblclick="zoomo">                
                 <tr class="table-row">
                    <td class="table-subtitle">Donaciones y<br>Transferencias</td>
                     <td>
                        <div class="strong-box pad text-center pull-right" v-text="getVal('DONACIONES Y TRANSFERENCIAS', '2021', 'pim')"></div>
                    </td>
                    <td>
                        <div class="strong-box pad text-center  pull-left" v-text="getVal('DONACIONES Y TRANSFERENCIAS', '2021', 'dev')"></div>
                    </td>
                    <td>
                        <div class="light-box pad text-center pull-right" v-text="getVal('DONACIONES Y TRANSFERENCIAS', '2022', 'pim')"></div>
                    </td>
                    <td>
                        <div class="light-box pad text-center  pull-left" v-text="getVal('DONACIONES Y TRANSFERENCIAS', '2022', 'dev')"></div>
                    </td>
                    <td>
                        <div class="strong-box pad text-center pull-right" v-text="getVal('DONACIONES Y TRANSFERENCIAS', '2023', 'pim')"></div>
                    </td>
                    <td>
                        <div class="strong-box pad text-center  pull-left" v-text="getVal('DONACIONES Y TRANSFERENCIAS', '2023', 'dev')"></div>
                    </td>
                </tr>
            </tbody>
            <div class="in-table-row-separator"></div>
            <tbody @dblclick="zoomo">                
                  <tr class="table-row">
                    <td class="table-subtitle">Canon y Sobrecanon, <br>Regalias, Renta de <br>Aduanas y Particiones</td>
                   <td>
                        <div class="strong-box pad text-center pull-right" v-text="getVal('CANON Y SOBRECANON, REGALIAS, RENTA DE ADUANAS Y PARTICIPACIONES', '2021', 'pim')"></div>
                    </td>
                    <td>
                        <div class="strong-box pad text-center pull-left" v-text="getVal('CANON Y SOBRECANON, REGALIAS, RENTA DE ADUANAS Y PARTICIPACIONES', '2021', 'dev')"></div>
                    </td>
                    <td>
                        <div class="light-box pad text-center pull-right" v-text="getVal('CANON Y SOBRECANON, REGALIAS, RENTA DE ADUANAS Y PARTICIPACIONES', '2022', 'pim')"></div>
                    </td>
                    <td>
                        <div class="light-box pad text-center pull-left" v-text="getVal('CANON Y SOBRECANON, REGALIAS, RENTA DE ADUANAS Y PARTICIPACIONES', '2022', 'dev')"></div>
                    </td>
                    <td>
                        <div class="strong-box pad text-center pull-right" v-text="getVal('CANON Y SOBRECANON, REGALIAS, RENTA DE ADUANAS Y PARTICIPACIONES', '2023', 'pim')"></div>
                    </td>
                    <td>
                        <div class="strong-box pad text-center pull-left" v-text="getVal('CANON Y SOBRECANON, REGALIAS, RENTA DE ADUANAS Y PARTICIPACIONES', '2023', 'dev')"></div>
                    </td>
                </tr>
            </tbody>
            <div class="in-table-row-separator"></div>
            <tbody @dblclick="zoomo">                
                 <tr class="table-row">
                    <td class="table-subtitle">Recursos por <br>Operaciones<br> Oficiales de Crédito</td>
                     <td>
                        <div class="strong-box pad text-center pull-right" v-text="getVal('RECURSOS POR OPERACIONES OFICIALES DE CREDITO', '2021', 'pim')"></div>
                    </td>
                    <td>
                        <div class="strong-box pad text-center pull-left" v-text="getVal('RECURSOS POR OPERACIONES OFICIALES DE CREDITO', '2021', 'dev')"></div>
                    </td>
                    <td>
                        <div class="light-box pad text-center pull-right" v-text="getVal('RECURSOS POR OPERACIONES OFICIALES DE CREDITO', '2022', 'pim')"></div>
                    </td>
                    <td>
                        <div class="light-box pad text-center pull-left" v-text="getVal('RECURSOS POR OPERACIONES OFICIALES DE CREDITO', '2022', 'dev')"></div>
                    </td>
                    <td>
                        <div class="strong-box pad text-center pull-right" v-text="getVal('RECURSOS POR OPERACIONES OFICIALES DE CREDITO', '2023', 'pim')"></div>
                    </td>
                    <td>
                        <div class="strong-box pad text-center pull-left" v-text="getVal('RECURSOS POR OPERACIONES OFICIALES DE CREDITO', '2023', 'dev')"></div>
                    </td>
                </tr>
            </tbody>
        </table>
        
        <Fuente style="height:3%;" :label="`Fuente: MEF - Consulta Amigable, actualización al <strong> ${reporteStore.results.mef[0].fecha} </strong>`" />
        <!--span class="fuente">Fuente: MEF - Consulta Amigable, actualización al <span v-text="reporteStore.results.mef[0].fecha"></span></span-->     
      </div>
      
    </div>
</template>

<script>
import Highcharts from "highcharts";
import numberFormat from "~/mixins/numberFormat.js"; 
import Fuente from '~/components/reportea3/Fuente';
import { useReporteStore } from '~/stores/reporte'
export default {
  setup() {
    const reporteStore = useReporteStore()
    return { reporteStore }
  },
mixins:[numberFormat],
  mounted() {

      //console.log( reporteStore.results.fuente_financiamiento.filter((obj)=>(obj.anioeje==='2016')).reduce(function(prevVal, elem) {  return prevVal + (!isNaN(parseFloat(elem.pim))&&elem.pim!==null ? parseFloat(elem.pim) : 0) }, 0) );

  },
  methods: {
    /*ucwords (str,force) {
    str=force ? str.toLowerCase() : str;  
    return str.replace(/(\b)([a-zA-Z])/g,
            function(firstLetter){
                console.log(firstLetter)
                return   firstLetter.toUpperCase();
            });
    },*/
    ucwords (str) {
        let lowered = str.toLowerCase()
        if (lowered.length === 0) {
            return str
        }
        str = lowered.split(" ");
        
        for (var i = 0, x = str.length; i < x; i++) {
            str[i] = str[i][0].toUpperCase() + str[i].substring(1)
        }

        return str.join(" ")
    },
    getVal (fuente, anio, valor) {
        
        let rs = reporteStore.results.fuente_financiamiento.filter((obj) => {
                    return obj.nombre === fuente && obj.anioeje === anio
                })
        if( rs.length > 0 ) {
            return this.formatNumber(rs[0][valor],0)
        }
        return '-'
        
    }
  },
  components: {
      Fuente
  }
};
</script>

<style scoped>
.c-container {
  width: 100%;
  /*background-color: #f3f4f8 !important;*/
  border-radius: 10px 10px 10px 10px;
}
.title {
  font-size: 22px;
  font-weight: 700;
}
.subtitle {
  font-size: 16px;
  font-weight: 500;
}

.table-subtitle {
  padding-left: 1%;
  font-size: 15px;
  line-height: 15px;
  font-weight: 500;
}


/*.table-container tbody {
    min-height: 180px;
}*/

.table-container thead tr th {
    text-align: center;
}

.text-box {
    letter-spacing:0px;
    color:black;
    border-radius: 8px 8px 8px 8px;
    height: 100%;
    padding: 1px 5px 1px 5px;
    font-size: 16px;
}

/*.table-row {
    background-color: #e9eaf1;
    margin-top: 16px;
}*/

.table-row {
    height: 65px;
}

.table-row td {
    background-color: #e9eaf1;
    /*padding-left:12px;
    padding-right:12px;*/
}

.table-row td:first-child {
    border-radius: 10px 0 0 10px;
}

.table-row td:last-child {
    border-radius: 0px 10px 10px 0px;
}

.light-box {
    background-color: #d4e2f2 !important;    
    width: 92px;
    margin:1px;
    /*margin-left: 10%;
    margin-right: 10%;*/
}

.pad {
    border-radius: 8px;
    padding-top: 14px;
    padding-bottom: 14px;
}

.strong-box {
    background-color: #9ad2ff !important;
    width: 92px;
    margin:1px;
    /*margin-left: 10%;
    margin-right: 10%;*/
}

.table-container tbody {
    margin-top: 10px;
}

.table-container tbody tr:hover td {
    background-color: #b7c0c9  !important;
}

.in-table-row-separator {
    width: 100%;
    height: 10px;
}

</style>