<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const selectVal = ref('xxx')
const options = ref([
  { name: '小瑞瑞', id: 'xrr' },
  { name: '小月月', id: 'xyy' },
  { name: '小鑫鑫', id: 'xxx' },
])
function optionDisabled(item) {
  if (item.id === 'xyy') {
    return true
  }
  return false
}
</script>

<template>
  <div>
    <o-select
      title="集大成者"
      v-model="selectVal"
      :options="options"
      label="name"
      value="id"
      :optionDisabled="optionDisabled"
      :customLabel="(item) => item.name + '(' + item.id + ')'"
    ></o-select>
  </div>
</template>

<style scoped lang="scss"></style>
