<template>
    <div :class="['form-group', direction]">
        <label class="title" v-text="title"></label>
        <p class="text" v-text="text"></p>
    </div>
</template>
<script>
export default {
    props: {
        title: {
            default: 'asd'
        },
        text: {
            default: 'asd'
        },
        direction: {
            default: 'asd'
        },
    }
}
</script>
<style scoped>
    .f-column {
        flex-direction: column;
    }
    .f-row {
        flex-direction: row;
    }
    .form-group {
        display: flex;
        justify-content: space-between;
        
    }

    .form-group .title {
        font-family: Roboto; 
        font-weight: 700;
        font-style: normal;
        font-size: 16px;
        line-height: 20px;
        flex-basis: 40%;
    }

    .form-group .text {
        background-color: #D5E0EB ;
        
        min-height: 40px;
        padding: 3px;
        border: 1px solid #8198AF;
        box-sizing: border-box;
        flex-basis: 60%;
    }
</style>