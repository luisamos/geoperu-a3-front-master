<template>
    <div class="cantidad">
        <div class="cantidad__title">
            <h3 class="text-center"> Cantidad de Feminicidios </h3>
        </div>
        <QuantityCircle class="cantidad__chart" :circleText="htmlText" :circleColor="this.circleColor" circleWidth="70%"/>
    </div>
</template>

<script>
import QuantityCircle from '~/components/Dumb/QuantityCircle'

export default {
    data(){
        return {
            htmlText: ''
        }
    },
    created(){
        this.htmlText = `<div style="color:rgb(90,90,90);font-size:65px;font-weight:800;height:100%;">${this.$store.getters['reportecem/results'].casos.fem_casos}</div><br>`
    },
    computed: {
        circleColor(){
            return this.$store.getters['reportecem/results'].casos.fem_casos === '0' ? '#b7b7b7' : '#d297ce'
        }
    },
    components: {
        QuantityCircle
    }
}
</script>

<style scoped>
.cantidad {
    width:100%;
    height: 100%;
}

.cantidad__title {
    width:100%;
    height: 10%;
}

.cantidad__chart {
    width:100%;
    height: 80% !important;
}
</style>