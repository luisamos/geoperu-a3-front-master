<template>
    <div class="text" v-text="text"></div>
</template>
<script>
export default {
    props: {
        text: {
            default: ''
        }
    }
}
</script>
<style scoped>
.text {
        background-color: #D5E0EB !important;
        min-height: 40px;
        padding: 8px;
        border: 1px solid #8198AF !important;
        box-sizing: border-box;
        flex-basis: 60%;
    }
</style>