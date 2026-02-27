<template>
    <label :class="'link-'+color">
        https://www.geoperu.gob.pe/
    </label>
</template>

<style scoped>
    .link-red {
        color: rgb(147, 57, 27) !important
    }
</style>

<script>
export default {
    props: {
        color: {
            default: 'red',
            type: String
        }
    }
}
</script>