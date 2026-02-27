<template>
  <div :class="'logo-'+type" style="float:left;height:100%;width:100%;max-width:110px;text-align:center">
    <img height="100%" :src="STATIC_URL + 'logo_mapea.png'"  alt="Geo Perú">
  </div>
</template>

<script>

import { STATIC_URL } from "~/const"

export default {
  data() {
    return {
      STATIC_URL: STATIC_URL
    }
  },
  props: {
    type: {
      type: String,
      required: true,
      default: 'red'
    }
  }
}
</script>

<style scoped>
.logo-red {
  background-color: #ff3232 !important;
  padding: 8px;
}
</style>
