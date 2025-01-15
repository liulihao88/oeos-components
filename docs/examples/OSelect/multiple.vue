<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const stepList = [
  { id: '1', name: '开始11' },
  { id: '2', name: 'POSUI2' },
  { id: '3', name: '113333' },
  { id: '4', name: 'GX1234444' },
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
      label="name"
      value="id"
      @changeSelect="changeSelect"
      @change="change"
      :options="stepList"
    ></o-select>

    <o-title title="use collapse-tags"></o-title>
    <o-select
      v-model="optionsId"
      multiple
      label="name"
      value="id"
      @changeSelect="changeSelect"
      @change="change"
      collapse-tags
      :options="stepList"
    ></o-select>
    <o-title title="use collapse-tags-tooltip"></o-title>
    <o-select
      v-model="optionsId"
      multiple
      label="name"
      value="id"
      @changeSelect="changeSelect"
      @change="change"
      collapse-tags
      collapse-tags-tooltip
      :options="stepList"
    ></o-select>

    <o-title title="use max-collapse-tags"></o-title>
    <o-select
      v-model="optionsId"
      multiple
      label="name"
      value="id"
      @changeSelect="changeSelect"
      @change="change"
      collapse-tags
      collapse-tags-tooltip
      :max-collapse-tags="3"
      :options="stepList"
    ></o-select>
  </div>
</template>

<style scoped lang="scss"></style>
