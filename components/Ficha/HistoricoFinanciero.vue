<template>
  <div style="width:100%;height:100%;">
    <div id="chart2"></div>
  </div>
</template>

<script>
import Highcharts from "highcharts";

export default {
  props: {
    data: {
      type: Array
    }
    
  },
  data() {
    return {
      id: null,
      validation: null,
      chart: undefined,
      //categories:  ['2018', '2019']
    };
  },
  computed: {
    categories (){

      return this.data.map(arr=> arr.anio)
    },
    series (){
        let PIM = this.data.map(arr=> arr.mto_pim)
        let DEV = this.data.map(arr=> arr.mto_dev)
        let series = [{
            data: PIM,
            color:"#305893",
            name: 'PIM',
            dataLabels: {
                allowOverlap: true,
                style: {
                  fontSize: "10px"
                },
                enabled: true,
                //align: null,
                //enabled: true,
                  //crop: false,
                  //overflow: 'none',
                  y: -10,
                color: "black",
                borderColor: "white",
                //inside: false,
                //verticalAlign: 'top',
                formatter: function() {
                  if (this.point.y !== null){   
                    return parseFloat(this.point.y).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
                  } else {
                    return 0
                  }
                  
                }
              },
        },
        {
            data: DEV,
            color:"#3dac96",
            name: 'Devengado',
            dataLabels: {
                allowOverlap: true,
                style: {
                  fontSize: "10px"
                },
                enabled: true,
                //align: null,
                //enabled: true,
                  //crop: false,
                  //overflow: 'none',
                color: "black",
                borderColor: "white",
                //inside: false,
                //verticalAlign: 'top',
                formatter: function() {
                  if (this.point.y !== null){   
                    return parseFloat(this.point.y).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
                  } else {
                    return 0
                  }
                  
                }
              },
        }]
        return series
    }
  },
  methods: {
     refresh() {
      this.chart.destroy();
      this.createChart();
      //this.chart.series[0].setData(this.series,true);
    },
    createChart() {
      this.chart = new Highcharts.chart("chart2", {
        credits: false,
        chart: {
          type: "column",
          backgroundColor: null
        },
        
        title: {
          text: "Histórico Financiero"
        },
        xAxis: {
          categories: this.categories
        },
        yAxis: {
          title: ''
        },
        plotOptions: {
          column: {
            stacking: false,
            
          },
        },   
        legend: {
          symbolHeight: 11,
          symbolWidth: 11,
              verticalAlign: 'top',

          symbolRadius: 0
        },    
        series: this.series
      });
    }
  },
  mounted() {
    this.createChart();
  }
};
</script>

<style scoped>
</style>

