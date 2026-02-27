<template>
    <div :class="$options.name" @dblclick="zoomo">
        <div class="zona-title">
            VIOLENCIA DE GÉNERO<br>
            DISTRITO DE  <span class="boldi" v-text="this.$store.getters['reportecem/results'].ubigeo.nom_dist"></span>
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
        padding:10px;    
    }

    .zona .zona-title .boldidi {
        font-weight: 700;
        font-size: 27px;  
    }

    .zona .zona-title .boldi {
        font-weight: 600;
    }
    
</style>
