<template>
    <div :class="$options.name" @dblclick="zoomo">        
        <div class="cele zona-title" v-if="$store.getters['reporte/tipo'] === 'dist'">            
            <span class="boldidi" v-text="$store.getters['reporte/results'].ejecutora[0].nom_dist"></span><br>
            <span>ES UN DISTRITO DE LA PROVINCIA DE 
                <span class="boldi" v-text="$store.getters['reporte/results'].ejecutora[0].nom_prov"></span> EN EL DEPARTAMENTO DE 
                <span class="boldi" v-text="$store.getters['reporte/results'].ejecutora[0].nom_dpto"></span>
            </span>
        </div>

        <div class="cele zona-title" style="padding-top:10%;bottom:0px;" v-if="$store.getters['reporte/tipo'] === 'prov'">
            <span class="boldidi" v-text="$store.getters['reporte/results'].ejecutora[0].nom_prov"></span><br>
            <span>ES UNA PROVINCIA DEL DEPARTAMENTO DE 
                <span class="boldi" v-text="$store.getters['reporte/results'].ejecutora[0].nom_dpto"></span>
            </span>
        </div>

         <div class="cele zona-title" style="padding-top:10%;bottom:0px;" v-if="$store.getters['reporte/tipo'] === 'dpto'">
            <span class="boldidi" v-if="$store.getters['reporte/requestCode'].substring(0,4) == '1508'" v-text="'GOBIERNO REGIONAL DE LIMA PROVINCIAS'"></span>
            <span class="boldidi" v-else-if="$store.getters['reporte/requestCode'].substring(0,4) == '1501'" v-text="'LIMA METROPOLITANA'"></span>
            <span class="boldidi" v-else-if="$store.getters['reporte/requestCode'] == 'M1'" v-text="'MANCOMUNIDAD REGIONAL DE LOS ANDES'"></span>
            <span class="boldidi" v-else v-text="$store.getters['reporte/results'].ejecutora[0].nom_dpto"></span>
            <br>
            <br>
                
                <span v-if="$store.getters['reporte/requestCode'].substring(0,4) === '0701'">ES UNA PROVINCIA CONSTITUCIONAL DEL PERÚ</span>
                <span v-else-if="$store.getters['reporte/requestCode'].substring(0,4) === '1501'">ES UNA PROVINCIA DEL PERÚ</span>
                <span v-else-if="$store.getters['reporte/requestCode'].substring(0,4) === '1508'">COMPRENDE 9 PROVINCIAS DEL DEPARTAMENTO DE LIMA</span>
                <span v-else-if="$store.getters['reporte/isRegion']">ES UN GOBIERNO REGIONAL DEL PERÚ</span>
                <span v-else-if="$store.getters['reporte/isMancomunidad']">ES UNA MANCOMUNIDAD</span>
                <span v-else>ES UN DEPARTAMENTO DEL PERÚ</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'zona'
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
