<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const selectVal = ref()
const options = ref([
  { label: '小月月', value: 'xyy' },
  { label: '小鑫鑫', value: 'xxx' },
])
const changeOptions = ref([])
const simpleOptions = ref([1, 3, 5, 7, 9])

setInterval(async () => {
  if (changeOptions.value.length === 0) {
    await proxy.sleep(100)
    changeOptions.value = [1, 3, 5]
  } else {
    await proxy.sleep(100)
    changeOptions.value = []
  }
}, 1000)
</script>

<template>
  <div>
    <o-select v-model="selectVal" :options="options"></o-select>
    <o-select v-model="selectVal" disabled :options="options"></o-select>
    <o-select v-model="selectVal" :options="changeOptions" type="simple"></o-select>
    <o-select v-model="selectVal" :options="[]" :emptyColor="false"></o-select>
  </div>
</template>

<style scoped lang="scss"></style>
