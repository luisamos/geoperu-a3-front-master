<template>
  <div v-if="visible" class="pdf-modal-overlay" @click.self="$emit('close')">
    <div class="pdf-modal">
      <button @click="$emit('close')" style="float:right;background:transparent;border:none;">X</button>
      <div style="width:100%;text-align:center;">
        <h3></h3>
      </div>
      <div style="width:100%;text-align:center;" class="container-fluid">
        <div class="form-group">
          <label>Seleccione tamaño de hoja</label>
          <div class="form-group">
            <label class="radio-inline">
              <input type="radio" value="a4" v-model="page" style="right:auto" />
              A4
            </label>
            <label class="radio-inline">
              <input type="radio" value="a3" v-model="page" style="right:auto" />
              A3
            </label>
          </div>
          <button
            type="button"
            class="btn btn-primary"
            style="background-color:#337ab7;border-color:#337ab7"
            @click="$emit('generate', page)"
          >Generar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close', 'generate'],
  data() {
    return {
      page: 'a3'
    }
  }
}
</script>

<style scoped>
.pdf-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
.pdf-modal {
  background: white;
  width: 250px;
  height: 180px;
  padding: 10px;
  border-radius: 4px;
}
</style>
