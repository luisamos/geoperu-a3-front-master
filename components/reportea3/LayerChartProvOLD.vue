<template>
  <div style="height:100%;width:100%;">
    <div style="line-height:10px;height:16%;padding-left:15%;padding-right:15%;text-align:center;">
      <span class="chart-title" v-text="title"></span>
    </div>
    <div style="height:84%;width:100%;">
       <svg
      :id="id"
      style="height:138px;width:240px;"
      class="svg-icon"
      xmlns="http://www.w3.org/2000/svg"
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
        .st6 {
          font-size: 22px;
          text-align: right;
        }
        .layer {
          opacity:1
        }

        .layer-active {
          font-size: 28px;
        }

        
        
      </style>
      <polygon id="d" class="st0 layer layer-1" @mouseover="hover" @mouseleave="out" points="83.4,199.1 2,143.5 83.4,89.5 164.8,143.5 "></polygon>
      <polygon id="c" class="st1 layer layer-2" @mouseover="hover" @mouseleave="out" points="82,169.9 0.6,114.3 82,60.3 163.4,114.3 "></polygon>
      <polygon id="b" class="st2 layer layer-3" @mouseover="hover" @mouseleave="out" points="83.4,141.5 2,85.9 83.4,32 164.8,85.9 "></polygon>
      <polygon id="a" class="st3 layer layer-4" @mouseover="hover" @mouseleave="out" points="83.4,112.7 2,57.1 83.4,3.2 164.8,57.1 "></polygon>
      <polyline id="line-d" class="st4 layer-line-1" points="184.3,134.1 169.2,134.1 169.2,133.1 184.5,133.1 "></polyline>
      <polyline id="line-c" class="st4 layer-line-2" points="192.5,109.6 169.2,109.6 169.2,108.6 192.7,108.6 "></polyline>
      <polyline id="line-b" class="st4 layer-line-3" points="199.3,83.8 169.2,83.8 169.2,82.8 199.5,82.8 "></polyline>
      <polyline id="line-a" class="st4 layer-line-4" points="205.8,57.6 169.2,57.6 169.2,56.6 206,56.6 "></polyline>

      <text
        transform="matrix(1 0 0 1 270.4873 62.2872)"
        text-anchor="end"
        id="text-a"
        class="st3 st5 st6 text"
        v-text="data.nacional"
      ></text>

      <text
        transform="matrix(1 0 0 1 270.5355 89.5883)"
        text-anchor="end"
        id="text-b"
        class="st2 st5 st6 text"
        v-text="data.departamento"
      ></text>
      <text
        transform="matrix(1 0 0 1 270.9817 115.3554)"
        text-anchor="end"
        id="text-c"
        class="st1 st5 st6 text"
        v-text="data.provincia"
      ></text>
      <text
        transform="matrix(1 0 0 1 270.2827 140.1223)"
        text-anchor="end"
        id="text-d"
        class="st0 st5 st6 text"
        v-text="data.distrito"
      ></text>
    </svg>
    </div>   
  </div>
  
</template>

<script>
export default {
  props: ["title", "data"],
  data(){
    return {
      id: null
    }
  },
  mounted(){
    this.id = "layer-chart-"+this._uid;
  },
  methods: {
    hover(ele){
      let textId = "#"+this.id + " #text-" + ele.currentTarget.id
      let lineId = "#"+this.id + " #line-" + ele.currentTarget.id      

      document.querySelector(textId).classList.toggle('layer-active');
      
       $("#"+this.id+" .layer:not(#"+this.id+" #"+ele.currentTarget.id+")").css("opacity", "0.2");
       $("#"+this.id+" .text:not("+textId+")").css("opacity", "0.2");

    },
    out(ele){
      let textId = "#"+this.id + " #text-" + ele.currentTarget.id
      let lineId = "#"+this.id + " #line-" + ele.currentTarget.id

      document.querySelector(textId).classList.toggle('layer-active');

      $(".layer").css("opacity", "1");
      $("#"+this.id+" .text").css("opacity", "1");

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
