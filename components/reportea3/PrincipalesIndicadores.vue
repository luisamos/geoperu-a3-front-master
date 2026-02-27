<template>
  <div style="width:100%;height:100%;text-align:left;">
    <div style="text-align:center;height:8%;margin-top:10px;width:100%;">
      <span class="main-title">Indicadores Sociales</span>
      <Leyenda class="leyenda" order="desc" shape="diamond" />
    </div>

    <div class="c-container">
      <div class="chart-box" style="width:99.8%;height:24%;" @dblclick="zoomo">
        <div style="height: 11%;width:100%;line-height:12px;">
          <span class="title">Educación Secundaria</span>
          <br />
          <span
            style="font-size:10px;font-weight:600;"
          >Proporción de estudiantes del 2do grado, con nivel satisfactorio</span>
        </div>
        <div style="width:100%;height:89%;padding-top:10px;margin-left:1%;">
          <LayerChartDist
            style="width:33%;float:left;"
            :title="'Comprensión Lectora (%)'"
            :data="{
                      nacional: getData(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Nacional' && obj.anno ==='2018'), 'lt_pest_sa'),
                      departamento: getData(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Departamento' && obj.anno ==='2018'), 'lt_pest_sa'),
                      provincia:getData(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Provincia' && obj.anno ==='2018'), 'lt_pest_sa'),
                      distrito: getData(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Distrito' && obj.anno ==='2018'), 'lt_pest_sa'),

                      nnacional: getDataInt(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Nacional' && obj.anno ==='2018'), 'lt_nest_sa'),
                      ndepartamento:getDataInt(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Departamento' && obj.anno ==='2018'), 'lt_nest_sa'),
                      nprovincia:getDataInt(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Provincia' && obj.anno ==='2018'), 'lt_nest_sa'),
                      ndistrito: getDataInt(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Distrito' && obj.anno ==='2018'), 'lt_nest_sa'),
              
                    }"
             :universo="{
                      nacional: getDataInt(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Nacional' && obj.anno ==='2018'), 'evaluados'),
                      departamento:getDataInt(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Departamento' && obj.anno ==='2018'), 'evaluados'),
                      provincia:getDataInt(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Provincia' && obj.anno ==='2018'), 'evaluados'),
                      distrito: getDataInt(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Distrito' && obj.anno ==='2018'), 'evaluados'),
              }"

            @selected="universoSecundaria"
          />
          <LayerChartDist
            style="width:33%;float:left;"
            :title="'Matemática (%)'"
            :data="{
                    distrito: getData(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Distrito' && obj.anno ==='2018'), 'mt_pest_sa'),
                    provincia: getData(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Provincia' && obj.anno ==='2018'), 'mt_pest_sa'),
                    departamento: getData(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Departamento' && obj.anno ==='2018'), 'mt_pest_sa'),
                    nacional: getData(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Nacional' && obj.anno ==='2018'), 'mt_pest_sa'),

                    ndistrito: getDataInt(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Distrito' && obj.anno ==='2018'), 'mt_nest_sa'),
                    nprovincia: getDataInt(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Provincia' && obj.anno ==='2018'), 'mt_nest_sa'),
                    ndepartamento: getDataInt(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Departamento' && obj.anno ==='2018'), 'mt_nest_sa'),
                    nnacional: getDataInt(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Nacional' && obj.anno ==='2018'), 'mt_nest_sa')
                    }"
              :universo="{
                      nacional: getDataInt(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Nacional' && obj.anno ==='2018'), 'evaluados'),
                      departamento:getDataInt(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Departamento' && obj.anno ==='2018'), 'evaluados'),
                      provincia:getDataInt(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Provincia' && obj.anno ==='2018'), 'evaluados'),
                      distrito: getDataInt(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Distrito' && obj.anno ==='2018'), 'evaluados'),
              }"

            @selected="universoSecundaria"
          />
          <LayerChartDist
            style="width:33%;float:left;"
            :title="'Innovación y Tecnología (%)'"
            :data="{
                    distrito: getData(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Distrito' && obj.anno ==='2018'), 'ct_pest_sa'),
                    provincia: getData(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Provincia' && obj.anno ==='2018'), 'ct_pest_sa'),
                    departamento: getData(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Departamento' && obj.anno ==='2018'), 'ct_pest_sa'),
                    nacional: getData(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Nacional' && obj.anno ==='2018'), 'ct_pest_sa'),

                    ndistrito: getDataInt(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Distrito' && obj.anno ==='2018'), 'ct_nest_sa'),
                    nprovincia: getDataInt(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Provincia' && obj.anno ==='2018'), 'ct_nest_sa'),
                    ndepartamento: getDataInt(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Departamento' && obj.anno ==='2018'), 'ct_nest_sa'),
                    nnacional: getDataInt(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Nacional' && obj.anno ==='2018'), 'ct_nest_sa'),
                  }"
             :universo="{
                nacional: getDataInt(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Nacional' && obj.anno ==='2018'), 'evaluados'),
                departamento:getDataInt(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Departamento' && obj.anno ==='2018'), 'evaluados'),
                provincia:getDataInt(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Provincia' && obj.anno ==='2018'), 'evaluados'),
                distrito: getDataInt(this.$store.getters['reporte/results'].ece_sec.filter((obj)=>obj.cat ==='Distrito' && obj.anno ==='2018'), 'evaluados'),
              }"

            @selected="universoSecundaria"
          />
          <div style="position:absolute;margin-top: 128px;margin-left:626px;line-height:7px;">
            <span style="font-size:8.5px;font-weight:700;">
              <strong style="font-size:12px;" v-text="us"></strong>
              <br />estudiantes del
              <br />segundo grado de secundaria
            </span>
          </div>
        </div>
      </div>

      <div class="chart-box" style="width:67%;height:24%;margin-top:0.5%;" @dblclick="zoomo">
        <div style="height:8%;width:100%;line-height:12px;">
          <span class="title">Educación Primaria</span>
          <br />
          <span
            style="font-size:10px;font-weight:600;"
          >Proporción de estudiantes del 4to grado, con nivel satisfactorio</span>
        </div>

        <div style="width:100%;height:92%;padding-top:10px;">
          <LayerChartDist
            :title="'Comprensión Lectora (%)'"
            style="width:50%;height:100%;float:left;"
            :data="{
                     distrito:getData(this.$store.getters['reporte/results'].ece.filter((obj)=>obj.cat ==='Distrito' && obj.anno ==='2018'), 'lt_pest_sa'),
                      provincia:getData(this.$store.getters['reporte/results'].ece.filter((obj)=>obj.cat ==='Provincia' && obj.anno ==='2018'), 'lt_pest_sa'),
                      departamento:getData(this.$store.getters['reporte/results'].ece.filter((obj)=>obj.cat ==='Departamento' && obj.anno ==='2018'), 'lt_pest_sa'),
                      nacional:getData(this.$store.getters['reporte/results'].ece.filter((obj)=>obj.cat ==='Nacional' && obj.anno ==='2018'), 'lt_pest_sa'),

                      ndistrito:getDataInt(this.$store.getters['reporte/results'].ece.filter((obj)=>obj.cat ==='Distrito' && obj.anno ==='2018'), 'lt_nest_sa'),
                      nprovincia: getDataInt(this.$store.getters['reporte/results'].ece.filter((obj)=>obj.cat ==='Provincia' && obj.anno ==='2018'), 'lt_nest_sa'),
                      ndepartamento: getDataInt(this.$store.getters['reporte/results'].ece.filter((obj)=>obj.cat ==='Departamento' && obj.anno ==='2018'), 'lt_nest_sa'),
                      nnacional: getDataInt(this.$store.getters['reporte/results'].ece.filter((obj)=>obj.cat ==='Nacional' && obj.anno ==='2018'), 'lt_nest_sa')
                    }"
             :universo="{
                nacional: getDataInt(this.$store.getters['reporte/results'].ece.filter((obj)=>obj.cat ==='Nacional' && obj.anno ==='2018'), 'evaluados'),
                departamento: getDataInt(this.$store.getters['reporte/results'].ece.filter((obj)=>obj.cat ==='Departamento' && obj.anno ==='2018'), 'evaluados'),
                provincia: getDataInt(this.$store.getters['reporte/results'].ece.filter((obj)=>obj.cat ==='Provincia' && obj.anno ==='2018'), 'evaluados'),
                distrito: getDataInt(this.$store.getters['reporte/results'].ece.filter((obj)=>obj.cat ==='Distrito' && obj.anno ==='2018'), 'evaluados')
              }"

            @selected="universoPrimaria"
          />

          <LayerChartDist
            style="width:50%;float:left;"
            :title="'Matemática (%)'"
            :data="{
                      distrito: getData(this.$store.getters['reporte/results'].ece.filter((obj)=>obj.cat ==='Distrito' && obj.anno ==='2018'), 'mt_pest_sa'),
                      provincia: getData(this.$store.getters['reporte/results'].ece.filter((obj)=>obj.cat ==='Provincia' && obj.anno ==='2018'), 'mt_pest_sa'),
                      departamento: getData(this.$store.getters['reporte/results'].ece.filter((obj)=>obj.cat ==='Departamento' && obj.anno ==='2018'), 'mt_pest_sa'),
                      nacional:getData(this.$store.getters['reporte/results'].ece.filter((obj)=>obj.cat ==='Nacional' && obj.anno ==='2018'), 'mt_pest_sa'),

                      ndistrito: getDataInt(this.$store.getters['reporte/results'].ece.filter((obj)=>obj.cat ==='Distrito' && obj.anno ==='2018'), 'mt_nest_sa'),
                      nprovincia: getDataInt(this.$store.getters['reporte/results'].ece.filter((obj)=>obj.cat ==='Provincia' && obj.anno ==='2018'), 'mt_nest_sa'),
                      ndepartamento: getDataInt(this.$store.getters['reporte/results'].ece.filter((obj)=>obj.cat ==='Departamento' && obj.anno ==='2018'), 'mt_nest_sa'),
                      nnacional: getDataInt(this.$store.getters['reporte/results'].ece.filter((obj)=>obj.cat ==='Nacional' && obj.anno ==='2018'), 'mt_nest_sa')
                    }"
            :universo="{
                nacional: getDataInt(this.$store.getters['reporte/results'].ece.filter((obj)=>obj.cat ==='Nacional' && obj.anno ==='2018'), 'evaluados'),
                departamento: getDataInt(this.$store.getters['reporte/results'].ece.filter((obj)=>obj.cat ==='Departamento' && obj.anno ==='2018'), 'evaluados'),
                provincia: getDataInt(this.$store.getters['reporte/results'].ece.filter((obj)=>obj.cat ==='Provincia' && obj.anno ==='2018'), 'evaluados'),
                distrito: getDataInt(this.$store.getters['reporte/results'].ece.filter((obj)=>obj.cat ==='Distrito' && obj.anno ==='2018'), 'evaluados')
              }"

            @selected="universoPrimaria"

          />
          <div style="position:absolute;margin-top: 128px;margin-left:380px;line-height:7px;">
            <span style="font-size:8.5px;font-weight:700;">
              <strong style="font-size:12px;" v-text="up"></strong>
              <br />estudiantes del
              <br />cuarto grado de primaria
            </span>
          </div>
        </div>
      </div>

      <div
        class="chart-box"
        style="width:32.5%;height:24%;margin-top:0.5%;margin-left:0.5%;"
        @dblclick="zoomo"
      >
        <div style="height:6%;width:100%">
          <span class="title">Analfabetismo (%)</span>
        </div>
        <div style="width:100%;height:94%;padding-top:10px;">
          <LayerChartDist
            :title="' Población que no sabe leer ni escribir (%)'"
            style="width:100%;float:left;"
            :data="{
                      nacional: formatNumber($store.getters['reporte/results'].censo2017.filter((obj)=>{ return obj.cat === 'Nacional'})[0].p_lees_no,1),
                      departamento: formatNumber($store.getters['reporte/results'].censo2017.filter((obj)=>{return obj.cat === 'Departamento'})[0].p_lees_no,1),
                      provincia:formatNumber($store.getters['reporte/results'].censo2017.filter((obj)=>{return obj.cat === 'Provincia'})[0].p_lees_no,1),
                      distrito: formatNumber($store.getters['reporte/results'].censo2017.filter((obj)=>{return obj.cat === 'Distrito'})[0].p_lees_no,1),

                      nnacional: formatNumberInt($store.getters['reporte/results'].censo2017.filter((obj)=>{return obj.cat === 'Nacional'})[0].lees_no),
                      ndepartamento: formatNumberInt($store.getters['reporte/results'].censo2017.filter((obj)=>{return obj.cat === 'Departamento'})[0].lees_no),
                      nprovincia:formatNumberInt($store.getters['reporte/results'].censo2017.filter((obj)=>{return obj.cat === 'Provincia'})[0].lees_no),
                      ndistrito: formatNumberInt($store.getters['reporte/results'].censo2017.filter((obj)=>{return obj.cat === 'Distrito'})[0].lees_no),
                    }"
          />
        </div>
      </div>

      <div
        class="chart-box"
        style="width:33.2%;height:48%;float:left;margin-top:0.5%;"
        @dblclick="zoomo"
      >
        <div style="height:10%;width:100%">
          <span class="title">Vivienda</span>
        </div>
        <div style="width:100%;height:90%;">
          <LayerChartDist
            :title="'Material predominante de la vivienda con piso de tierra (%)'"
            style="width:100%;height:49.25%;"
            :data="{
                      nacional: formatNumber($store.getters['reporte/results'].brecha.filter((obj)=>{ return obj.cat === 'Nacional'})[0].pv_ptierra,1),
                      departamento: formatNumber($store.getters['reporte/results'].brecha.filter((obj)=>{return obj.cat === 'Departamento'})[0].pv_ptierra,1),
                      provincia:formatNumber($store.getters['reporte/results'].brecha.filter((obj)=>{return obj.cat === 'Provincia'})[0].pv_ptierra,1),
                      distrito: formatNumber($store.getters['reporte/results'].brecha.filter((obj)=>{return obj.cat === 'Distrito'})[0].pv_ptierra,1),

                      nnacional: formatNumberInt($store.getters['reporte/results'].brecha.filter((obj)=>{ return obj.cat === 'Nacional'})[0].v_ptierra),
                      ndepartamento: formatNumberInt($store.getters['reporte/results'].brecha.filter((obj)=>{return obj.cat === 'Departamento'})[0].v_ptierra),
                      nprovincia:formatNumberInt($store.getters['reporte/results'].brecha.filter((obj)=>{return obj.cat === 'Provincia'})[0].v_ptierra),
                      ndistrito: formatNumberInt($store.getters['reporte/results'].brecha.filter((obj)=>{return obj.cat === 'Distrito'})[0].v_ptierra),
                    }"
          />

          <LayerChartDist
            :title="'Hogares que cocinan con leña (%)'"
            style="width:100%;height:49.25%;margin-top:0.5%;"
            :data="{
                      nacional: formatNumber($store.getters['reporte/results'].brecha.filter((obj)=>{ return obj.cat === 'Nacional'})[0].ph_lenna,1),
                      departamento: formatNumber($store.getters['reporte/results'].brecha.filter((obj)=>{return obj.cat === 'Departamento'})[0].ph_lenna,1),
                      provincia:formatNumber($store.getters['reporte/results'].brecha.filter((obj)=>{return obj.cat === 'Provincia'})[0].ph_lenna,1),
                      distrito: formatNumber($store.getters['reporte/results'].brecha.filter((obj)=>{return obj.cat === 'Distrito'})[0].ph_lenna,1),

                      nnacional: formatNumberInt($store.getters['reporte/results'].brecha.filter((obj)=>{ return obj.cat === 'Nacional'})[0].h_lenna),
                      ndepartamento: formatNumberInt($store.getters['reporte/results'].brecha.filter((obj)=>{return obj.cat === 'Departamento'})[0].h_lenna),
                      nprovincia:formatNumberInt($store.getters['reporte/results'].brecha.filter((obj)=>{return obj.cat === 'Provincia'})[0].h_lenna),
                      ndistrito: formatNumberInt($store.getters['reporte/results'].brecha.filter((obj)=>{return obj.cat === 'Distrito'})[0].h_lenna),
                    }"
          />
        </div>
      </div>

      <div
        class="chart-box"
        style="width:33.2%;height:48%;float:left;margin-top:0.5%;margin-left:0.5%;"
        @dblclick="zoomo"
      >
        <div style="height:10%;width:100%">
          <span class="title">Trabajo</span>
        </div>

        <div style="width:100%;height:90%;">
          <div style="width:100%;height:49.5%;">
            <LayerChartDist
              :title="'Población económicamente activa (%)'"
              :data="{
                      nacional: formatNumber($store.getters['reporte/results'].censo2017.filter((obj)=>{ return obj.cat === 'Nacional'})[0].p_pea,1),
                      departamento: formatNumber($store.getters['reporte/results'].censo2017.filter((obj)=>{return obj.cat === 'Departamento'})[0].p_pea,1),
                      provincia:formatNumber($store.getters['reporte/results'].censo2017.filter((obj)=>{return obj.cat === 'Provincia'})[0].p_pea,1),
                      distrito: formatNumber($store.getters['reporte/results'].censo2017.filter((obj)=>{return obj.cat === 'Distrito'})[0].p_pea,1),

                      nnacional: formatNumberInt($store.getters['reporte/results'].censo2017.filter((obj)=>{return obj.cat === 'Nacional'})[0].pea),
                      ndepartamento: formatNumberInt($store.getters['reporte/results'].censo2017.filter((obj)=>{return obj.cat === 'Departamento'})[0].pea),
                      nprovincia:formatNumberInt($store.getters['reporte/results'].censo2017.filter((obj)=>{return obj.cat === 'Provincia'})[0].pea),
                      ndistrito: formatNumberInt($store.getters['reporte/results'].censo2017.filter((obj)=>{return obj.cat === 'Distrito'})[0].pea),
                    }"
            />
          </div>
          <div style="width:100%;height:49.5%;margin-top:1%;">
            <LayerChartDist
              :title="'Población económicamente activa - desocupada (%)'"
              :data="{
                      nacional: formatNumber($store.getters['reporte/results'].censo2017.filter((obj)=>{ return obj.cat === 'Nacional'})[0].p_pea_d,1),
                      departamento: formatNumber($store.getters['reporte/results'].censo2017.filter((obj)=>{return obj.cat === 'Departamento'})[0].p_pea_d,1),
                      provincia:formatNumber($store.getters['reporte/results'].censo2017.filter((obj)=>{return obj.cat === 'Provincia'})[0].p_pea_d,1),
                      distrito: formatNumber($store.getters['reporte/results'].censo2017.filter((obj)=>{return obj.cat === 'Distrito'})[0].p_pea_d,1),

                      nnacional: formatNumberInt($store.getters['reporte/results'].censo2017.filter((obj)=>{return obj.cat === 'Nacional'})[0].pead),
                      ndepartamento: formatNumberInt($store.getters['reporte/results'].censo2017.filter((obj)=>{return obj.cat === 'Departamento'})[0].pead),
                      nprovincia:formatNumberInt($store.getters['reporte/results'].censo2017.filter((obj)=>{return obj.cat === 'Provincia'})[0].pead),
                      ndistrito: formatNumberInt($store.getters['reporte/results'].censo2017.filter((obj)=>{return obj.cat === 'Distrito'})[0].pead),
                    }"
            />
          </div>
        </div>
      </div>

      <div
        class="chart-box"
        style="width:32.5%;height:48%;float:left;margin-top:0.5%;margin-left:0.5%;"
        @dblclick="zoomo"
      >
        <div style="height:10%;width:100%">
          <span class="title">Identidad</span>
        </div>

        <div style="width:100%;height:90%;">
          <div style="width:100%;height:49.5%;">
            <LayerChartDist
              :title="'Población que tiene DNI (%)'"
              :data="{
                      nacional: formatNumber($store.getters['reporte/results'].censo2017.filter((obj)=>{ return obj.cat === 'Nacional'})[0].p_dni,1),
                      departamento: formatNumber($store.getters['reporte/results'].censo2017.filter((obj)=>{return obj.cat === 'Departamento'})[0].p_dni,1),
                      provincia:formatNumber($store.getters['reporte/results'].censo2017.filter((obj)=>{return obj.cat === 'Provincia'})[0].p_dni,1),
                      distrito: formatNumber($store.getters['reporte/results'].censo2017.filter((obj)=>{return obj.cat === 'Distrito'})[0].p_dni,1),

                      nnacional: formatNumberInt($store.getters['reporte/results'].censo2017.filter((obj)=>{return obj.cat === 'Nacional'})[0].dni),
                      ndepartamento: formatNumberInt($store.getters['reporte/results'].censo2017.filter((obj)=>{return obj.cat === 'Departamento'})[0].dni),
                      nprovincia:formatNumberInt($store.getters['reporte/results'].censo2017.filter((obj)=>{return obj.cat === 'Provincia'})[0].dni),
                      ndistrito: formatNumberInt($store.getters['reporte/results'].censo2017.filter((obj)=>{return obj.cat === 'Distrito'})[0].dni),
                    }"
            />
          </div>

          <div style="width:100%;height:49.5%;margin-top:1%;">
            <LayerChartDist
              :title="'Población indocumentada (%)'"
              :data="{
                      nacional: formatNumber($store.getters['reporte/results'].censo2017.filter((obj)=>{ return obj.cat === 'Nacional'})[0].p_no_docum,1),
                      departamento: formatNumber($store.getters['reporte/results'].censo2017.filter((obj)=>{return obj.cat === 'Departamento'})[0].p_no_docum,1),
                      provincia:formatNumber($store.getters['reporte/results'].censo2017.filter((obj)=>{return obj.cat === 'Provincia'})[0].p_no_docum,1),
                      distrito: formatNumber($store.getters['reporte/results'].censo2017.filter((obj)=>{return obj.cat === 'Distrito'})[0].p_no_docum,1),

                      nnacional: formatNumberInt($store.getters['reporte/results'].censo2017.filter((obj)=>{return obj.cat === 'Nacional'})[0].no_docum),
                      ndepartamento: formatNumberInt($store.getters['reporte/results'].censo2017.filter((obj)=>{return obj.cat === 'Departamento'})[0].no_docum),
                      nprovincia:formatNumberInt($store.getters['reporte/results'].censo2017.filter((obj)=>{return obj.cat === 'Provincia'})[0].no_docum),
                      ndistrito: formatNumberInt($store.getters['reporte/results'].censo2017.filter((obj)=>{return obj.cat === 'Distrito'})[0].no_docum),
                    }"
            />
          </div>
        </div>
      </div>
      
      <Fuente style="height:3%;" label="Fuente: INEI - Censos Nacionales 2017: XII de Población y VII de Vivienda / MINEDU - Evaluación Censal de Estudiantes (ECE), 2018 -2019" />
      <!--div style="height:2%;width:100%">
        <span
          class="fuente"
        ></span>
      </div-->
    </div>
  </div>
</template>

<script>
import LayerChart from "~/components/reportea3/LayerChart.vue";

import LayerChartDist from "~/components/reportea3/LayerChartDist.vue";

import Leyenda from "~/components/reportea3/Leyenda.vue";
import numberFormat from "~/mixins/numberFormat.js";
import Fuente from '~/components/reportea3/Fuente';

export default {
  name: 'principales-indicadores',
  mixins: [numberFormat],
  data: () => {
    return {
      up: 0,
      us: 0,
      nacional: [],
      departamento: [],
      provincia: [],
      distrito: []
    };
  },
  methods: {
    getData(array, iname) {
      if (array.length > 0) {
        if (typeof array[0][iname] != "undefined") {
          let r = array[0][iname];
          return r.toString();
        }
      }

      return "0.00";
    },
    getDataInt(array, iname) {
      if (array.length > 0) {
        if (typeof array[0][iname] != "undefined") {
          let r = this.formatNumberInt(array[0][iname]);
          return r.toString();
        }
      }

      return "0";
    },
    universoPrimaria(data) {
      this.up = data
    },
    universoSecundaria(data) {
      this.us = data
    },
   
  },
  components: {
    LayerChart,
    Leyenda,
    LayerChartDist,
    Fuente
  }
};
</script>

<style scoped>
.c-container {
  border-radius: 10px 10px 10px 10px;
  background-color: #f5f5f5 !important;
  width: 100%;
  height: 92%;
}
.title {
  font-size: 26px;
  font-weight: 600;
}
.box-container {
  background-color: #d4edff !important;
  border-radius: 10px 10px 10px 10px;
}

.chart-box {
  background-color: #dadada !important;
  border-radius: 10px 10px 10px 10px;
  float: left;
  /*margin: 5px 2px 0px 1.5px;*/
  text-align: center;
}

.title {
  font-weight: 700;
  font-size: 15px;
}

.main-title {
  font-weight: 600;
  font-size: 26px;
}

/* Leyenda */
/deep/ .leyenda .item {
  font-size: 16px;
  padding-right: 18px;
}
/deep/ .leyenda .item .legend-diamond {
  width: 12px;
  height: 12px;
}

/deep/ .leyenda .item .legend-diamond-nacional {
  background-color: #ff6356 !important  ;
}

/deep/ .leyenda .item .legend-diamond-departamento {
  background-color: #18226d !important  ;
}

/deep/ .leyenda .item .legend-diamond-provincia {
  background-color: #617ab6 !important  ;
}

/deep/ .leyenda .item .legend-diamond-distrito {
  background-color: #179aff !important  ;
}
</style>