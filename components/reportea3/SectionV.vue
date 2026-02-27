<template>
  <div
    class="v-section"
    :style="{'height':'100%',
        'float':'left',
        'border-color':'#cecece',
        'border-style': borderStl,
        'border-width':'1.2px',
        'padding': paddingPx}"
  >
    <slot/>
  </div>
</template>

<script>
export default {
  mounted () {
    
  },
  props: {
    borderStyle: {
      default: () => {
        return ['none','none','none','none']
      },
      type: Array
    },
    padding: {
      default: ()=> {
        return [0, 4, 0, 4]
      },
      type: Array
    }
  },
  computed: {
    paddingPx() {
      let p = new Array()
      
      for( let x in this.padding ) {
        p.push(this.padding[x]+'px')
      }

      return p.join(' ')

    },
    borderStl() {
      let p = new Array()
      
      for( let x in this.borderStyle ) {
        p.push(this.borderStyle[x])
      }

      return p.join(' ')

    }
  }
}
</script>

<style scoped>
.v-section {
  width: 33.3%;
  /*padding: 0px 4px 0px 4px;*/
}

</style>
