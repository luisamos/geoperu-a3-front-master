<template>
    <div :class="$options.cssName">
        <h3 class="text-center">Gravedad de agresión</h3>
        <StackBar />
    </div>
</template>

<script>
import StackBar from '~/components/Dumb/StackBar'

export default {
    name: 'Gravedad',
    cssName: 'gravedad',
    data () {
        return {
            
        }
    },
    components: {
        StackBar
    }
}
</script>

<style scoped>
    .gravedad {
        
    }
</style>