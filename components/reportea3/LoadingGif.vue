<template>
     <div class="page-loading">
        <img
            :src="this.STATIC_URL + 'full-page-loading.gif'"
        />
    </div>
</template>

<style>
    .page-loading {
        width: 100%;
        height: 100vh;
        background-color: #163974;
    }

    .page-loading img {
        background-color: #163974;
        position:absolute;
        top:0;
        width: 20rem;
        height: auto;
        left:0;
        right:0;
        bottom:0;
        margin:auto;
    }

    

    /*'width': '100vw',height: '100vh','position': 'relative','top': 0,'left': 0}*/
</style>

<script>
import { STATIC_URL } from "~/const.js"
export default {
    data () {
        return {
            STATIC_URL: STATIC_URL
        }
    }
}
</script>
