<template>
  <div>
    <LoadingOverlay v-if="loadingStore.isOverlay" v-show="loadingStore.isLoading" :label="loadingStore.text" />
    <LoadingNotif v-if="loadingStore.isNotif" v-show="loadingStore.isLoading" :label="loadingStore.text" />
    <ClientOnly>
      <AppState />
    </ClientOnly>
    <slot />
  </div>
</template>

<script>
import { useLoadingStore } from '~/stores/loading'
import AppState from '~/components/AppState.vue'
import LoadingOverlay from '~/components/LoadingOverlay.vue'
import LoadingNotif from '~/components/LoadingNotif.vue'

export default {
  components: {
    AppState,
    LoadingOverlay,
    LoadingNotif
  },
  setup() {
    const loadingStore = useLoadingStore()
    return { loadingStore }
  }
}
</script>

<style>
@media print {
  .no-print {
    visibility: hidden !important;
  }

  .no-print * {
    visibility: hidden !important;
  }

  img {
    -webkit-print-color-adjust: exact;
  }
}
</style>
