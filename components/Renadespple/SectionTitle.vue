<template>
    <label class="section-title" v-text="text"></label>
</template>
<script>
export default {
    props: {
        text: {
            required: true,
            default: '',
            type: String
        }
    }
}
</script>
<style scoped>
    .section-title {
        font-family: "Roboto"; 
        font-weight: 700;
        font-style: normal;
        font-size: 24px;
        line-height: 20px;
        padding-bottom: 20px;
    }
</style>