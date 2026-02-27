<template>
  <div class="button-wrapp">
    <nuxt-link class="btn btn-red btn-more" :target="target" :to="url" v-text="text"></nuxt-link>
  </div>
</template>

<script>
export default {
  data: () => {
    return {};
  },
  props: {
    url: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    target: {
      type: String,
      default: "_self"
    }
  }
};
</script>


<style>
</style>

