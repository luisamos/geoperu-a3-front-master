<template>
<div>
  <div :class="$options.name" v-if="order === 'asc'">
    <span class="item" v-if="$store.getters['reporte/tipo'] === 'dist' && this.nivel <= 1">
      <span :class="['legend-'+shape, 'legend-'+shape+'-distrito']"></span>
      Distrito
    </span>
    <span class="item">
      <span :class="['legend-'+shape, 'legend-'+shape+'-provincia']"></span>
      Provincia
    </span>
    <span class="item" v-if="region">
      <span :class="['legend-'+shape, 'legend-'+shape+'-departamento']"></span>
      Región
    </span>
    <span class="item" v-else-if="mancomunidad">
      <span :class="['legend-'+shape, 'legend-'+shape+'-departamento']"></span>
      Mancomunidad
    </span>
    <span class="item" v-else>
      <span :class="['legend-'+shape, 'legend-'+shape+'-departamento']"></span>
      Departamento
    </span>
    <span class="item">
      <span :class="['legend-'+shape, 'legend-'+shape+'-nacional']"></span>
      Nacional
    </span>
  </div>
  
  <div :class="$options.name" v-if="order === 'desc'">
    <span class="item" v-if="show('nacional')">
        <span :class="['legend-'+shape, 'legend-'+shape+'-nacional']"></span>
        Nacional
    </span>
    <span v-if="show('departamento')">
      <span class="item" v-if="region || isRegion">
        <span :class="['legend-'+shape, 'legend-'+shape+'-departamento']"></span>
        Región
      </span>
      <span class="item" v-else-if="isMancomunidad">
        <span :class="['legend-'+shape, 'legend-'+shape+'-departamento']"></span>
        Mancomunidad
      </span>
      <span class="item" v-else>
        <span :class="['legend-'+shape, 'legend-'+shape+'-departamento']"></span>
        Departamento
      </span>
    </span>
    <span class="item"  v-if="($store.getters['reporte/tipo'] === 'prov'||$store.getters['reporte/tipo'] === 'dist') && show('provincia') " >
      <span :class="['legend-'+shape, 'legend-'+shape+'-provincia']"></span>
      Provincia
    </span>
    <span class="item"  v-if="($store.getters['reporte/tipo'] === 'dist') && show('distrito')">
      <span :class="['legend-'+shape, 'legend-'+shape+'-distrito']"></span>
      Distrito
    </span>
  </div>
</div>
</template>

<script>
import { between } from '~/common/utils.js'

export default {
  name: 'leyenda',
  props:
    {
      shape: {
        default: 'circle',
        type: String
      },
      order: {
        type: String,
        default: 'asc'
      },
      region: {
        type: Boolean,
        default: false
      },
      rango: {
        type: Object,
        default: () => {
          return {
            min: 1,
            max: 4
          }
        }, // 1: Nacional, 2: Departamental / Regional, 3: Provincial, 4: Distrital
        required:false
      }
  },
  mounted(){
    this.isRegion = this.$store.getters['reporte/isRegion']
    this.isMancomunidad = this.$store.getters['reporte/isMancomunidad']
  },
  data: () => {
    return {
      isRegion: false,
      isMancomunidad: false,
      niveles: {
        distrito: 1,
        provincia: 2,
        departamento: 3,
        nacional: 4
      }
    }
  },
  methods: {  
    show(tipo) {
      let n = this.niveles[tipo]
      return between(n,this.rango.min,this.rango.max)
    }
  }
};
</script>

<style scoped>

.leyenda {
  width: 100%;
}

.leyenda .item {
  font-size: 9px;
  font-weight: 600;
  text-align: center;
  line-height: 20px;
}

.leyenda .item .legend-circle {
  width: 5px;
  height: 7px;
  border-radius: 50%;
  display: inline-block;
}

.leyenda .item .legend-circle-nacional {
  background-color: #000;
}

.leyenda .item .legend-circle-departamento {
  background-color: #000;
}

.leyenda .item .legend-circle-provincia {
  background-color: #000;
}

.leyenda .item .legend-circle-distrito {
  background-color: #000;
}

.leyenda .item .legend-diamond {
   width: 5px;
  height: 7px;
  
  display: inline-block;
  /* Rotate */
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    transform: rotate(-45deg);
/* Rotate Origin */
    -webkit-transform-origin: 0 100%;
    -moz-transform-origin: 0 100%;
    -ms-transform-origin: 0 100%;
    -o-transform-origin: 0 100%;
    transform-origin: 0 100%;
    /*margin: 60px 0 10px 310px;*/
}

.leyenda .item .legend-diamond-nacional {
  background-color: #000;
}

.leyenda .item .legend-diamond-departamento {
  background-color: #000;
}

.leyenda .item .legend-diamond-provincia {
  background-color: #000;
}

.leyenda .item .legend-diamond-distrito {
  background-color: #000;
}

</style>
