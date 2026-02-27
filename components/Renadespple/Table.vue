<template>
<div >
  <span class="table__title" v-text="data.title">
      
  </span>
  <table :class='{"table__data": true, "table__data--block": block}'>
    <!-- <thead>
      <tr>
        <td v-for="head in header" :key="head.index" v-text="head"></td>
      </tr>
    </thead> -->
    <tbody>
      <tr v-if="data.length===0">
        <td :colspan="header.length">No hay información para mostrar</td>
      </tr>
      <tr v-for="row in data.series" :key="row.index">
        <td v-text="row.name" class="table__data-cell-name"></td>
        <td v-for="column in row.data" class="table__data-cell" :key="column.index" v-text="column.value" :style="{background:column.color}"></td>
      </tr>
    </tbody>
  </table>
  </div>
</template>
<style scoped>
.table__title {
    font-family: Roboto;
    font-size: 16px;
    color: #8d8d8d;
    margin-bottom: 10px;
    display: block;
}
.table__data {
    width: 100%;
}

.table__data--block{
    max-height: 300px;
    overflow: auto;
    display: block;
}

.table__data tr {
    border-bottom: 2px solid#c3c3c3;
}

.table__data tr td {
    padding: 4px;
}


.table__data-cell {
    text-align: center;
    min-width: 80px;
    width: 15%;
}

.table__data-cell-name {
    width: 70%;
}
</style>
<script>
export default {
  props: {
      block: {
          default: false,
          type: Boolean
      },
    data: {
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