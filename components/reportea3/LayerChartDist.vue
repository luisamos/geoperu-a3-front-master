<template>
  <div style="height:100%;width:100%;">
    <div style="line-height:10px;height:12%;padding-left:15%;padding-right:15%;text-align:center;">
      <span class="chart-title" v-text="title"></span>
    </div>
    <div style="height:88%;width:100%;" v-if="reporteStore.tipo==='dist'">
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
        <polygon
          :id="id+'d'"
          class="lc-st0 layer layer-1"
          @mouseover="hover"
          @mouseleave="out"
          points="83.4,199.1 2,143.5 83.4,89.5 164.8,143.5 "
        />
        <text
          text-anchor="middle"
          :id="'text-abs-'+id+'d'"
          transform="matrix(1 0 0 1 81.2085 149.2199)"
          class="lc-st7 lc-st8"
          style="pointer-events:none;"
          v-text="data.ndistrito"
        />

        <polygon
          :id="id+'c'"
          class="lc-st1 layer layer-2"
          @mouseover="hover"
          @mouseleave="out"
          points="82,169.9 0.6,114.3 82,60.3 163.4,114.3 "
        />
        <text
          text-anchor="middle"
          :id="'text-abs-'+id+'c'"
          transform="matrix(1 0 0 1 81.2085 119.6472)"
          class="lc-st7 lc-st8"
          style="pointer-events:none;"
          v-text="data.nprovincia"
        />

        <polygon
          :id="id+'b'"
          class="lc-st2 layer layer-3"
          @mouseover="hover"
          @mouseleave="out"
          points="83.4,141.5 2,85.9 83.4,32 164.8,85.9 "
        />
        <text
          text-anchor="middle"
          :id="'text-abs-'+id+'b'"
          transform="matrix(1 0 0 1 81.2085 90.5996)"
          class="lc-st7 lc-st8"
          style="pointer-events:none;"
          v-text="data.ndepartamento"
        />

        <polygon
          :id="id+'a'"
          class="lc-st3 layer layer-4"
          @mouseover="hover"
          @mouseleave="out"
          points="83.4,112.7 2,57.1 83.4,3.2 164.8,57.1 "
        />
        <text
          text-anchor="middle"
          :id="'text-abs-'+id+'a'"
          transform="matrix(1 0 0 1 81.2085 62.2782)"
          class="lc-st7 lc-st8"
          style="pointer-events:none;"
          v-text="data.nnacional"
        />

        <polyline
          :id="id + 'line-d'"
          class="lc-st4 layer-line-1"
          points="184.3,134.1 169.2,134.1 169.2,133.1 184.5,133.1 "
        />
        <polyline
          :id="id + 'line-c'"
          class="lc-st4 layer-line-2"
          points="192.5,109.6 169.2,109.6 169.2,108.6 192.7,108.6 "
        />
        <polyline
          :id="id + 'line-b'"
          class="lc-st4 layer-line-3"
          points="199.3,83.8 169.2,83.8 169.2,82.8 199.5,82.8 "
        />
        <polyline
          :id="id + 'line-a'"
          class="lc-st4 layer-line-4"
          points="205.8,57.6 169.2,57.6 169.2,56.6 206,56.6 "
        />

        <text
          transform="matrix(1 0 0 1 270.4873 62.2872)"
          text-anchor="end"
          :id="'text-'+id+'a'"
          class="lc-st3 lc-st5 lc-st6 text"
          v-text="data.nacional"
        />

        <text
          transform="matrix(1 0 0 1 270.5355 89.5883)"
          text-anchor="end"
          :id="'text-'+id+'b'"
          class="lc-st2 lc-st5 lc-st6 text"
          v-text="data.departamento"
        />
        <text
          transform="matrix(1 0 0 1 270.9817 115.3554)"
          text-anchor="end"
          :id="'text-'+id+'c'"
          class="lc-st1 lc-st5 lc-st6 text"
          v-text="data.provincia"
        />
        <text
          transform="matrix(1 0 0 1 270.2827 140.1223)"
          text-anchor="end"
          :id="'text-'+id+'d'"
          class="lc-st0 lc-st5 lc-st6 text"
          v-text="data.distrito"
        />

        <use id="use" v-bind:xlink:href="'#'+ selectedPolygon" style="pointer-events:none;" />
        <use id="use" v-bind:xlink:href="'#'+ selectedPolygonText" />
      </svg>
    </div>
    <div style="height:84%;width:100%;" v-if="reporteStore.tipo==='prov'">
      <svg
        version="1.1"
        :id="id"
        style="height:138px;width:240px;"
        x="0px"
        y="0px"
        class="svg-icon"
        xml:space="preserve"
        viewBox="0 0 260.6 171.7"
      >
        <polygon
          :id="id+'c'"
          @mouseover="hover"
          @mouseleave="out"
          class="lc-st1-prov layer layer-2"
          points="82,169.9 0.6,114.3 82,60.3 163.4,114.3 "
        />
        <text
          text-anchor="middle"
          :id="'text-abs-'+id+'c'"
          transform="matrix(1 0 0 1 81.2085 120.2199)"
          class="lc-st7 lc-st8"
          style="pointer-events:none;"
          v-text="data.nprovincia"
        />
        <polygon
          :id="id+'b'"
          @mouseover="hover"
          @mouseleave="out"
          class="lc-st2-prov layer layer-3"
          points="83.4,141.5 2,85.9 83.4,32 164.8,85.9 "
        />
        <text
          text-anchor="middle"
          :id="'text-abs-'+id+'b'"
          transform="matrix(1 0 0 1 81.2085 90.5996)"
          class="lc-st7 lc-st8"
          style="pointer-events:none;"
          v-text="data.ndepartamento"
        />
        <polygon
          :id="id+'a'"
          @mouseover="hover"
          @mouseleave="out"
          class="lc-st3-prov layer layer-4"
          points="83.4,112.7 2,57.1 83.4,3.2 164.8,57.1 "
        />
        <text
          text-anchor="middle"
          :id="'text-abs-'+id+'a'"
          transform="matrix(1 0 0 1 81.2085 62.2782)"
          class="lc-st7 lc-st8"
          style="pointer-events:none;"
          v-text="data.nnacional"
        />

        <polyline
          :id="id + 'line-c'"
          class="lc-st4 layer-line-1"
          points="192.5,109.6 169.2,109.6 169.2,108.6 192.7,108.6 "
        />
        <polyline
          :id="id + 'line-b'"
          class="lc-st4 layer-line-2"
          points="199.3,83.8 169.2,83.8 169.2,82.8 199.5,82.8 "
        />
        <polyline
          :id="id + 'line-a'"
          class="lc-st4 layer-line-3"
          points="205.8,57.6 169.2,57.6 169.2,56.6 206,56.6 "
        />

        <text
          :id="'text-'+id+'a'"
          text-anchor="end"
          transform="matrix(1 0 0 1 270.4873 62.2872)"
          class="lc-st3-prov lc-st5-prov text"
          v-text="data.nacional"
        />
        <text
          text-anchor="end"
          :id="'text-'+id+'b'"
          transform="matrix(1 0 0 1 270.5355 89.5883)"
          class="lc-st2-prov lc-st5-prov text"
          v-text="data.departamento"
        />
        <text
          :id="'text-'+id+'c'"
          text-anchor="end"
          transform="matrix(1 0 0 1 270.9817 115.3554)"
          class="lc-st1-prov lc-st5-prov text"
          v-text="data.provincia"
        />

        <use id="use" v-bind:xlink:href="'#'+ selectedPolygon" style="pointer-events:none;" />
        <use id="use" v-bind:xlink:href="'#'+ selectedPolygonText" />
      </svg>
    </div>

     <div style="height:84%;width:100%;" v-if="reporteStore.tipo==='dpto'">
      <svg
        version="1.1"
        :id="id"
        style="height:138px;width:240px;"
        x="0px"
        y="0px"
        class="svg-icon"
        xml:space="preserve"
        viewBox="0 0 260.6 171.7"
      >
        <polygon
          :id="id+'b'"
          @mouseover="hover"
          @mouseleave="out"
          class="lc-st2-prov layer layer-3"
          points="83.2,156.3 1.8,100.7 83.2,46.8 164.6,100.7 "
        />
        <text
          text-anchor="middle"
          :id="'text-abs-'+id+'b'"
          transform="matrix(1 0 0 1 83.2085 104.5996)"
          class="lc-st7 lc-st8"
          style="pointer-events:none;"
          v-text="data.ndepartamento"
        />
        <polygon
          :id="id+'a'"
          @mouseover="hover"
          @mouseleave="out"
          class="lc-st3-prov layer layer-4"
          points="83.2,110.5 1.8,54.9 83.2,1 164.6,54.9  "
        />
        <text
          text-anchor="middle"
          :id="'text-abs-'+id+'a'"
          transform="matrix(1 0 0 1 81.2085 62.2782)"
          class="lc-st7 lc-st8"
          style="pointer-events:none;"
          v-text="data.nnacional"
        />

        <polyline
          :id="id + 'line-b'"
          class="lc-st4 layer-line-2"
          points="199.1,98.6 169,98.6 169,97.6 199.3,97.6"
        />
        <polyline
          :id="id + 'line-a'"
          class="lc-st4 layer-line-3"
          points="205.6,55.4 169,55.4 169,54.4 201.8,54.4"
        />

        <text
          :id="'text-'+id+'a'"
          text-anchor="end"
          transform="matrix(1 0 0 1 270.4873 62.2872)"
          class="lc-st3-prov lc-st5-prov text"
          v-text="data.nacional"
        />
        <text
          text-anchor="end"
          :id="'text-'+id+'b'"
          transform="matrix(1 0 0 1 270.5355 106.5883)"
          class="lc-st2-prov lc-st5-prov text"
          v-text="data.departamento"
        />

        <use id="use" v-bind:xlink:href="'#'+ selectedPolygon" style="pointer-events:none;" />
        <use id="use" v-bind:xlink:href="'#'+ selectedPolygonText" />
      </svg>
    </div>

  </div>
</template>

<script>
import { useReporteStore } from '~/stores/reporte'
export default {
  setup() {
    const reporteStore = useReporteStore()
    return { reporteStore }
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    data: {
      type: Object
    },
    universo: {
      type: Object,
      default: () => {
        return {
          nacional: 0,
          departamento: 0,
          provincia: 0,
          distrito: 0
        };
      }
    }
  },
  data() {
    return {
      id: null,
      selectedPolygon: null,
      selectedPolygonText: null
    };
  },
  mounted() {
    const uid = Math.random().toString(36).substr(2, 9)
    if (this.reporteStore.tipo === "dist") {
      this.id = "dist-layer-chart-" + uid;
    } else {
      this.id = "prov-layer-chart-" + uid;
    }

    this.$emit("selected", this.universo.nacional);
  },
  methods: {
    hover(ele) {
      let absTextId = `text-abs-${ele.currentTarget.id}`;
      let textId = `text-${ele.currentTarget.id}`;

      this.selectedPolygon = ele.currentTarget.id;
      this.selectedPolygonText = absTextId;

      const textEl = document.getElementById(textId);
      if (textEl) textEl.classList.add("layer-active");

      const absTextEl = document.getElementById(absTextId);
      if (absTextEl) absTextEl.style.display = 'block';

      const svgEl = document.getElementById(this.id);
      if (svgEl) {
        svgEl.querySelectorAll('.layer:not(#' + ele.currentTarget.id + ')').forEach(el => {
          el.style.opacity = '0.2';
        });
      }

      if (this.universo.nacional != 0) {
        if (ele.currentTarget.classList.contains("layer-1")) {
          this.$emit("selected", this.universo.distrito);
        }
        if (ele.currentTarget.classList.contains("layer-2")) {
          this.$emit("selected", this.universo.provincia);
        }
        if (ele.currentTarget.classList.contains("layer-3")) {
          this.$emit("selected", this.universo.departamento);
        }
        if (ele.currentTarget.classList.contains("layer-4")) {
          this.$emit("selected", this.universo.nacional);
        }
      }
    },
    out(ele) {
      let absTextId = `text-abs-${ele.currentTarget.id}`;
      let textId = `text-${ele.currentTarget.id}`;

      this.selectedPolygon = null;
      this.selectedPolygonText = null;

      const textEl = document.getElementById(textId);
      if (textEl) textEl.classList.remove("layer-active");

      const absTextEl = document.getElementById(absTextId);
      if (absTextEl) absTextEl.style.display = 'none';

      document.querySelectorAll('.layer').forEach(el => {
        el.style.opacity = '1';
      });

      if (this.universo.nacional != 0) {
        this.$emit("selected", this.universo.nacional);
      }
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

/* SVG layer chart styles - dist view */
.lc-st0 { fill: #1d99ff; }
.lc-st1 { fill: #6179b5; }
.lc-st2 { fill: #1e276d; }
.lc-st3 { fill: #ff6357; }
.lc-st4 { fill: #adadad; }
.lc-st5 { font-family: "Montserrat"; font-weight: 600; }
.lc-st6 { font-size: 22px; }
.lc-st7 { font-family: "Montserrat"; font-weight: 600; fill: #fff; }
.lc-st8 { font-size: 22px; display: none; pointer-events: none; }

/* SVG layer chart styles - prov/dpto view */
.lc-st1-prov { fill: #6179b5; }
.lc-st2-prov { fill: #1e276d; }
.lc-st3-prov { fill: #ff6357; }
.lc-st5-prov { font-family: "Montserrat"; font-weight: 600; font-size: 23px; }

.layer { opacity: 1; }
.layer-active { font-size: 28px; }
</style>
