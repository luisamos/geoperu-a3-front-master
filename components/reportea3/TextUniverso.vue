<template>
<div :class="$options.name">
    <div>
        <label
        style="margin:0px;font-size:11px;"
        v-text="this.universo.value"
        ></label>
    </div>
    <div>
        <label style="margin:0px;" v-text="this.universo.description"></label>
    </div>
</div>
</template>
<script>
export default {
    name: 'TextUniverso',
    props: ['universo','description']
}
</script>