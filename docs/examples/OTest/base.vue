<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
function f1() {
  console.log('f1')
}
</script>

<template>
  <div class="m-100" style="margin-left: 20px"></div>
  <div class="A">
    <div class="aa" @click="f1"></div>
  </div>
</template>

<style scoped lang="scss">
.A {
  cursor: not-allowed;
}
.aa {
  width: 100px;
  height: 100px;
  border: 2px dashed orange;
  pointer-events: none;
}
</style>
