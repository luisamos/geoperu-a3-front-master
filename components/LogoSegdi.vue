<template>
    <div style="width:100%;height:100%;">
        <img class="img-responsive" style="float:left;height:85%" :src="STATIC_URL + 'PCM_LOGO.png'" alt="Segdi">
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
}
</script>

<style>

</style>
