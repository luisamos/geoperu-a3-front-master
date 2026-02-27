<template>
  <div class="main-container" @dblclick="zoomo"
  >
   <div style="text-align:center;height:7%;">
      <div style="width:100%;height:40%;">
        <span class="title">Educación</span>
        <br>
      </div>
      <Leyenda class="leyenda" style="width:100%;height:60%;" order="desc" :region="true"/>
       
    </div>
    <div style="width:100%;height:89%">
      <EducacionPrimaria class="sub-container"/>
      <div style="width:1%;height:100%;float:left"></div>
      <EducacionSecundaria class="sub-container-2" />
    </div>

    <div style="width:100%;height:4%;padding-top:4px;">
      <Fuente label="MINEDU - Evaluación censal de estudiantes (ECE), 2018" />
    </div>    
    
  </div>
</template>

<script>
import EducacionPrimaria from "~/components/reportea3/EducacionPrimaria.vue";
import EducacionSecundaria from "~/components/reportea3/EducacionSecundaria.vue";
import Leyenda from "~/components/reportea3/Leyenda.vue";
import Fuente from "~/components/reportea3/Fuente.vue";

export default {
  data() {
    return {
      colors:{
        'nacional': '#ff6356',
        'departamento': '#300050',
        'provincia': '#5b018a',
        'distrito': '#8101b6'
      }
    }
  },
  mounted() {},
  components: {
    EducacionPrimaria,
    EducacionSecundaria,
    Leyenda,
    Fuente
  }
};
</script>

<style scoped>
.title {
  font-size: 1.2em;
  font-weight: 600;
  color: #8b1bbb !important;
}

.chart-title {
  font-weight: 600;
  font-size: 0.8em;
}

.main-container {
  height:100%;
  text-align:left;
  background-color: #f9f2fb !important;
  border-radius:10px 10px 10px 10px;
}

.sub-container {
 height:100%;
 width:33%;
 float:left;
 border-radius: 10px 10px 10px 10px;
}

.sub-container-2 {

  height:100%;
  width:66%;
  float:left;
  border-radius: 10px 10px 10px 10px;
 
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
  background-color: #4e0147 !important;
}

/deep/ .leyenda .item .legend-circle-provincia {
  background-color: #750280 !important;
}

/deep/ .leyenda .item .legend-circle-distrito {
  background-color: #a30bd2 !important;
}

</style>