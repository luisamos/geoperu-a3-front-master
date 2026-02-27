<template>
  <div style="width:100%;height:100%">
    <div style="line-height:10px;height:16%;padding-left:15%;padding-right:15%;text-align:center;">
      <span class="chart-title" v-text="title"></span>
    </div>
    <div style="width:100%;height:84%;">
      <div style="width:58%;float:left;height:100%">
        <div class="layer-container">
          <div id="diamond-1"></div>
          <div id="diamond-2"></div>
          <div id="diamond-3"></div>
          <div id="diamond-4"></div>
        </div>
      </div>
      <div
        :style="{'width':'42%','float':'left','height':'100%','padding-top':$store.getters['reporte/tipo']==='dist' ? '7.5%' : '10%' }"
      >
        <div style="width:40%;height:100%;float:left;text-align:left;">
          <div style="margin-top:0px;"> <span>_____</span> </div>
          
          <div style="margin-top:-1px;"> <span>____</span> </div>
          
          <div style="margin-top:-2px;"> <span>___</span> </div>
          
          <div style="margin-top:-1px;"> <span>__</span> </div>
        </div>
        <div style="width:60%;height:100%;float:left;">
          <div
            :style="{'text-align':'right','font-size': $store.getters['reporte/tipo']==='dist' ? '15px' : '16.5px' ,'font-weight':'600','padding-right':'40%'}"
          >
            <span class="label-nacional" v-text="data.nacional"></span>
            <br>
            <span class="label-departamento" v-text="data.departamento"></span>
            <br>
            <span class="label-provincia" v-text="data.provincia"></span>
            <br>
            <span
              v-if="$store.getters['reporte/tipo']==='dist'"
              class="label-distrito"
              v-text="data.distrito"
            ></span>
            <br>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "data"]
};
</script>

<style scoped>
.layer-chart {
  margin: 20px;
  width: 100%;
  height: 100%;
  background-color: red;
}

.layer-container {
  float: left;
  height: 100%;
  width: 100%;
}
#diamond-1 {
  width: 0;
  height: 0;
  border: 60px solid transparent;
  border-bottom: 35px solid #ff6356;
  position: relative;
  top: -60px;
  right: -30px;
  z-index: 4;
}
#diamond-1:after {
  right: 0px;
  content: "";
  position: absolute;
  left: -60px;
  top: 34.4px;
  width: 0;
  height: 0;
  border: 60px solid transparent;
  border-top: 35px solid #ff6356;
}

#diamond-2 {
  width: 0;
  height: 0;
  border: 60px solid transparent;
  border-bottom: 35px solid #12226f;
  position: relative;
  top: -135px;
  right: -30px;
  z-index: 3;
}
#diamond-2:after {
  content: "";
  position: absolute;
  left: -60px;
  top: 34.4px;
  width: 0;
  height: 0;
  border: 60px solid transparent;
  border-top: 40px solid #12226f;
}

#diamond-3 {
  width: 0;
  height: 0;
  right: -30px;
  border: 60px solid transparent;
  border-bottom: 35px solid #179aff;
  position: relative;
  top: -210px;
  z-index: 2;
}
#diamond-3:after {
  content: "";
  position: absolute;
  left: -60px;
  top: 34.4px;
  width: 0;
  height: 0;
  border: 60px solid transparent;
  border-top: 40px solid #179aff;
}

#diamond-4 {
  width: 0;
  height: 0;
  right: -30px;
  border: 60px solid transparent;
  border-bottom: 35px solid #547ab9;
  position: relative;
  top: -285px;
  z-index: 1;
}
#diamond-4:after {
  content: "";
  position: absolute;
  left: -60px;
  top: 34.4px;
  width: 0;
  height: 0;
  border: 60px solid transparent;
  border-top: 40px solid #547ab9;
}

#diamond-1:hover {
  border-bottom: 35px solid #547ab9;
}

</style>
