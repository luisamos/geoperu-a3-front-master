<template>
  <table class="table">
    <thead>
      <tr>
        <td v-for="head in header" :key="head.index" v-text="head"></td>
      </tr>
    </thead>
    <tbody>
      <tr v-if="lista.length===0">
        <td :colspan="header.length">No hay información para mostrar</td>
      </tr>
      <tr v-for="row in lista" :key="row.index">
        <td v-for="column in row" :key="column.index" v-text="column"></td>
      </tr>
    </tbody>
  </table>
</template>
<style scoped>
.table {
    width: 100%;
}

.table thead td {
    text-align: center;
    background-color: #193d74 !important;
    color: #ffffff !important;
    height: 40px;
    font-weight: bold;
    width: calc(100% /3);
}

.table td {
    border: 1px solid #828282 !important;
    box-sizing: border-box;
      text-align: center;
}
</style>
<script>
export default {
  props: {
    lista: {
      default: () => {
        return [
        ];
      }
    },
    header: {
      default: () => {
        return [
        ];
      }
    }
  },
  data() {
    return {
      
    };
  }
};
</script>