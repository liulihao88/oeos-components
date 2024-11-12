<script setup lang="ts">
import { ref, getCurrentInstance, h } from 'vue'
const { proxy } = getCurrentInstance()
const dateValue = ref()

const customPrefix = {
  render() {
    return h('p')
  },
}
</script>

<template>
  <div>
    <o-date-range v-model="dateValue" width="600"></o-date-range>
    <o-date-range v-model="dateValue" title="选择日期" start-placeholder="开始" end-placeholder="结束" range-separator="///"></o-date-range>
  </div>
</template>

<style scoped lang="scss"></style>
