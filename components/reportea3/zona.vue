<template>
    <div class="zona" @dblclick="zoomo">
        <div class="cele zona-title" v-if="reporteStore.tipo === 'dist'">
            <span class="boldidi" v-text="reporteStore.results.ejecutora[0].nom_dist"></span><br>
            <span>ES UN DISTRITO DE LA PROVINCIA DE
                <span class="boldi" v-text="reporteStore.results.ejecutora[0].nom_prov"></span> EN EL DEPARTAMENTO DE
                <span class="boldi" v-text="reporteStore.results.ejecutora[0].nom_dpto"></span>
            </span>
        </div>

        <div class="cele zona-title" style="padding-top:10%;bottom:0px;" v-if="reporteStore.tipo === 'prov'">
            <span class="boldidi" v-text="reporteStore.results.ejecutora[0].nom_prov"></span><br>
            <span>ES UNA PROVINCIA DEL DEPARTAMENTO DE
                <span class="boldi" v-text="reporteStore.results.ejecutora[0].nom_dpto"></span>
            </span>
        </div>

         <div class="cele zona-title" style="padding-top:10%;bottom:0px;" v-if="reporteStore.tipo === 'dpto'">
            <span class="boldidi" v-if="reporteStore.requestCode.substring(0,4) == '1508'" v-text="'GOBIERNO REGIONAL DE LIMA PROVINCIAS'"></span>
            <span class="boldidi" v-else-if="reporteStore.requestCode.substring(0,4) == '1501'" v-text="'LIMA METROPOLITANA'"></span>
            <span class="boldidi" v-else-if="reporteStore.requestCode == 'M1'" v-text="'MANCOMUNIDAD REGIONAL DE LOS ANDES'"></span>
            <span class="boldidi" v-else v-text="reporteStore.results.ejecutora[0].nom_dpto"></span>
            <br>
            <br>

                <span v-if="reporteStore.requestCode.substring(0,4) === '0701'">ES UNA PROVINCIA CONSTITUCIONAL DEL PERÚ</span>
                <span v-else-if="reporteStore.requestCode.substring(0,4) === '1501'">ES UNA PROVINCIA DEL PERÚ</span>
                <span v-else-if="reporteStore.requestCode.substring(0,4) === '1508'">COMPRENDE 9 PROVINCIAS DEL DEPARTAMENTO DE LIMA</span>
                <span v-else-if="reporteStore.isRegion">ES UN GOBIERNO REGIONAL DEL PERÚ</span>
                <span v-else-if="reporteStore.isMancomunidad">ES UNA MANCOMUNIDAD</span>
                <span v-else>ES UN DEPARTAMENTO DEL PERÚ</span>
        </div>
    </div>
</template>

<script>
import { useReporteStore } from '~/stores/reporte'

export default {
    name: 'zona',
    setup() {
        const reporteStore = useReporteStore()
        return { reporteStore }
    }
}
</script>

<style>
    .zona {
        width:100%;
        height:100%;
        position: relative;
    }
    .zona .zona-title {
        font-size: 26px;
        line-height: 24px;
        text-align:center;
        padding-bottom:6%;
    }

    .zona .zona-title .boldidi {
        font-weight: 700;
        font-size: 27px;
    }

    .zona .zona-title .boldi {
        font-weight: 600;
    }

</style>
