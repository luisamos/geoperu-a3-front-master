<template>
  <div id="container">
    <div id="mapContainer"></div>
  </div>
</template>

<script>
import Highcharts from "~/lib/highmaps.js";

export default {
  name: "Map",
  data() {
    return {
      map: undefined,
      categories: [],
      series: [],
      chart: undefined
    };
  },
  methods: {
    refresh() {
      // this.chart.destroy();
      this.createChart();
    },
    createChart(json){
      if(this.chart){
        this.chart.destroy();
      }
      var color = "#617ab6";
      const topology = Highcharts.geojson(json, "map");

      this.chart = Highcharts.mapChart({
      chart: {
        renderTo: document.querySelector("#mapContainer"),
        events: {
          load: function() {
            // console.log(map);
            //this.mapZoom(0, 100, 100);
          }
        },
        map: topology,
        selected: true,
      },
      credits: {
        enabled: false
      },
      title: [{ text: "" }],
      series: [
      {
            allAreas: true,
            dataLabels: {
              enabled: true,
              style: {
                  fontSize: '6px',
                  color: 'gray',
                  textOutline: '0.2px white',
                  // fontWeight: 'bold'
              },
                  format: '{point.properties.nom_prov}'
            }
        }
      ],
      legend: false,
      plotOptions: {
        area: {
          color: '#46b146',
        },
        series: {
          color: '#46b146 ',
          events: {
            legendItemClick: function() {
              return false;
            }
          }
        }
      },
      tooltip: false
    });

      
    }
  },
  mounted() {
    // this.createChart();
  }
};
</script>

<style scoped>
#mapContainer {
  width: 100%;
  min-height: 330px;
}
</style>