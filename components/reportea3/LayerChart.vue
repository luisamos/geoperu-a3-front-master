<template>
  <div style="height:100%;width:100%;">
    <div style="line-height:10px;height:16%;padding-left:15%;padding-right:15%;text-align:center;">
      <span class="chart-title" v-text="title"></span>
    </div>
    <div style="height:84%;width:100%;" v-if="reporteStore.tipo==='dist'">
    
      <svg
        version="1.1"
        :id="id"
        style="height:138px;width:240px;"
        x="0px"
        y="0px"
        class="svg-icon"
        xml:space="preserve"
        viewBox="0 0 276.35 200.89"
      >
        <style type="text/css">
        .st0 {
          fill: #1d99ff;
        }
        .st1 {
          fill: #6179b5;
        }
        .st2 {
          fill: #1e276d;
        }
        .st3 {
          fill: #ff6357;
        }
        .st4 {
          fill: #adadad;
        }
        .st5 {
          font-family: "Montserrat";
          font-weight: 600;
        }
      .st6{font-size:22px;}
        .st7 {
          font-family: "Montserrat";
          font-weight: 600;
          fill:#fff;
        }
        .st8{font-size:22px;display:none;pointer-events:none}

        .layer {
          opacity: 1;
        }

        .layer-active {
          font-size: 28px;
        }
        </style>
        <polygon
          :id="id+'d'"
          class="st0 layer layer-1"
          @mouseover="hover"
          @mouseleave="out"
          points="83.4,199.1 2,143.5 83.4,89.5 164.8,143.5 "
        ></polygon>
        <text
          text-anchor="middle"
          :id="'text-abs-'+id+'d'"
          transform="matrix(1 0 0 1 81.2085 149.2199)"
          class="st7 st8"
        >9,000</text>

        <polygon
          :id="id+'c'"
          class="st1 layer layer-2"
          @mouseover="hover"
          @mouseleave="out"
          points="82,169.9 0.6,114.3 82,60.3 163.4,114.3 "
        ></polygon>
        <text
          text-anchor="middle"
          :id="'text-abs-'+id+'c'"
          transform="matrix(1 0 0 1 81.2085 119.6472)"
           class="st7 st8"
        >29,999,000</text>

        <polygon
          :id="id+'b'"
          class="st2 layer layer-3"
          @mouseover="hover"
          @mouseleave="out"
          points="83.4,141.5 2,85.9 83.4,32 164.8,85.9 "
        ></polygon>
        <text
          text-anchor="middle"
          :id="'text-abs-'+id+'b'"
          transform="matrix(1 0 0 1 81.2085 90.5996)"
           class="st7 st8"
        >29,999,000</text>

        <polygon
          :id="id+'a'"
          class="st3 layer layer-4"
          @mouseover="hover"
          @mouseleave="out"
          points="83.4,112.7 2,57.1 83.4,3.2 164.8,57.1 "
        ></polygon>
        <text
          text-anchor="middle"
          :id="'text-abs-'+id+'a'"
          transform="matrix(1 0 0 1 81.2085 62.2782)"
           class="st7 st8"
        >400</text>

        <polyline
          :id="id + 'line-d'"
          class="st4 layer-line-1"
          points="184.3,134.1 169.2,134.1 169.2,133.1 184.5,133.1 "
        ></polyline>
        <polyline
          :id="id + 'line-c'"
          class="st4 layer-line-2"
          points="192.5,109.6 169.2,109.6 169.2,108.6 192.7,108.6 "
        ></polyline>
        <polyline
          :id="id + 'line-b'"
          class="st4 layer-line-3"
          points="199.3,83.8 169.2,83.8 169.2,82.8 199.5,82.8 "
        ></polyline>
        <polyline
          :id="id + 'line-a'"
          class="st4 layer-line-4"
          points="205.8,57.6 169.2,57.6 169.2,56.6 206,56.6 "
        ></polyline>

        <text
          transform="matrix(1 0 0 1 270.4873 62.2872)"
          text-anchor="end"
          :id="'text-'+id+'a'"
          class="st3 st5 st6 text"
          v-text="data.nacional"
        ></text>

        <text
          transform="matrix(1 0 0 1 270.5355 89.5883)"
          text-anchor="end"
          :id="'text-'+id+'b'"
          class="st2 st5 st6 text"
          v-text="data.departamento"
        ></text>
        <text
          transform="matrix(1 0 0 1 270.9817 115.3554)"
          text-anchor="end"
          :id="'text-'+id+'c'"
          class="st1 st5 st6 text"
          v-text="data.provincia"
        ></text>
        <text
          transform="matrix(1 0 0 1 270.2827 140.1223)"
          text-anchor="end"
          :id="'text-'+id+'d'"
          class="st0 st5 st6 text"
          v-text="data.distrito"
        ></text>
      </svg>
    </div>
  </div>
</template>

<script>
import * as SVG from 'svg.js'
import { useReporteStore } from '~/stores/reporte'

export default {
  setup() {
    const reporteStore = useReporteStore()
    return { reporteStore }
  },
  props: ["title", "data"],
  data() {
    return {
      id: null,
      mainSVGElement: null,
      clone: null
    };
  },
  mounted() {
    if (reporteStore.tipo === "dist") {
      this.id = "dist-layer-chart-" + this._uid;
    } else {
      this.id = "prov-layer-chart-" + this._uid;
    }
    setTimeout(()=>{
      this.clone = SVG.select("#"+this.id).clone()
    },1000)
    
  },
  methods: {
    hover(ele) {
      let absTextId = `text-abs-${ele.currentTarget.id}`;
      let textId = `text-${ele.currentTarget.id}`;
      let lineId = `line-${ele.currentTarget.id}`;

      SVG.select('#'+ele.currentTarget.id).front();
      

      /*this.selectedPolygon = ele.currentTarget.id;
      this.selectedPolygonText = absTextId;
    
      //clearTimeout(this.reactionTime)
      document.querySelector('#'+textId).classList.add("layer-active");
      $('#'+absTextId).css('display', 'block');
      $("#"+this.id+" .layer:not(#" +ele.currentTarget.id+")").css("opacity", "0.2");*/
    
      
    },
    out(ele) {
      let absTextId = `text-abs-${ele.currentTarget.id}`;
      let textId = `text-${ele.currentTarget.id}`;
      let lineId = `line-${ele.currentTarget.id}`;

      SVG.select('#'+ele.currentTarget.id).backward();
     /*this.reactionTime = setTimeout(()=>{
      this.selectedPolygon = null;
      this.selectedPolygonText = null;

      document.querySelector('#'+textId).classList.remove("layer-active");
      $('#'+absTextId).css('display', 'none');
      $('.layer').css("opacity", "1");
     },500)*/
    }
  }
};
</script>

<style>
.title {
  font-weight: 600;
  font-size: 16px;
}

.chart-title {
  text-align: center;
  font-weight: 600;
  font-size: 11px;
}
</style>
