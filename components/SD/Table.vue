<template>
  <table class="table">
    <thead>
      <tr>
        <td :class="[color]" v-for="head in header" :key="head.index" v-text="head"></td>
      </tr>
    </thead>
    <tbody>
      <tr v-if="lista.length===0">
        <td :colspan="header.length">No hay información para mostrar</td>
      </tr>
      <tr v-for="row in lista" :key="row.index">
        <td v-for="column,idx in row" :key="idx" v-text="column?column:'-'"></td>
      </tr>
    </tbody>
  </table>
</template>
<style scoped>
.table {
    width: 100%;
}

.blue {
  background-color: #193d74 !important;
}

.red {
  background-color: #db3838 !important;
}

.green {
  background-color: #46b146  !important;
}
.table thead td {
    text-align: center;
    color: #ffffff !important;
    /* height: 40px; */
    font-weight: bold;
}

.table tbody td {
  height: 70px;
}

.table tbody td:nth-child(2) {
  min-width: 100px !important;
}
.table td {
    border: 1px solid #828282 !important;
    box-sizing: border-box;
    text-align: center;
    font-size: 11px;
    padding: 2px;
    vertical-align: middle;
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
    color: {
      default: 'blue'
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