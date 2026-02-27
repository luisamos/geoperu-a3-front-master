<template>
    <div class="edad">
        <div class="edad__title">
            Edad de víctima
        </div>
        <HorizontalStackBar 
            class="edad__chart"
            :r1="this.$store.getters['reportecem/results'].edades[0].menor18"
            :r2="this.$store.getters['reportecem/results'].edades[0].menor36"
            :r3="this.$store.getters['reportecem/results'].edades[0].menor60"
            :r4="this.$store.getters['reportecem/results'].edades[0].mayor60"
        />
    </div>
</template>

<script>
import HorizontalStackBar from '~/components/Dumb/HorizontalStackBar'

export default {
    data(){
        return {
            htmlText: ''
        }
    },
    components: {
        HorizontalStackBar
    }
}
</script>

<style>
.edad {
    width:100%;
    height: 100%;
}

.edad__title {
    width:100%;
    height: 20%;
    text-align: center;
    font-weight: 500;
    line-height: 1.1;
    color: inherit;
    font-size: 24px;
}

.edad__chart {
    width:100%;
    height: 80%;
}
</style>