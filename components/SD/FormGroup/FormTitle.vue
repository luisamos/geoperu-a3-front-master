<template>
    <span class="title" v-text="title"></span>
</template>
<script>
export default {
    props: {
        title: {
            default: ''
        }
    }
}
</script>
<style scoped>
 .title {
        font-family: "Roboto"; 
        font-weight: 700;
        font-style: normal;
        font-size: 16px;
        line-height: 20px;
        flex-basis: 40%;
        padding-top: 8px;
    }
</style>