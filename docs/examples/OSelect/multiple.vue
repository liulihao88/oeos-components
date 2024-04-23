<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const stepList = [
  { id: '1', label: '开始11' },
  { id: '2', label: 'POSUI2' },
  { id: '3', label: '113333' },
  { id: '4', label: 'GX1234444' },
]
const optionsId = ref(['1', '3'])
function changeSelect(value, label, itemObj) {
  console.log('changeSelect==')
  console.log(`value, label, itemObj`, value, label, itemObj)
}
function change(...rest) {
  console.log('change??')
  console.log(`rest`, rest)
}
</script>

<template>
  <div>
    <o-select
      v-model="optionsId"
      multiple
      value="id"
      @changeSelect="changeSelect"
      @change="change"
      :options="stepList"
    ></o-select>
  </div>
</template>

<style scoped lang="scss"></style>
