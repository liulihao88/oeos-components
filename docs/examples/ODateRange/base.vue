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
    <o-date-range v-model="dateValue" title="选择日期"></o-date-range>
    <o-input v-model="dateValue" title="哈哈" />
    <o-date-range v-model="dateValue" :prefix-icon="customPrefix" title="选择日期" size="small"></o-date-range>
    <o-date-range v-model="dateValue" :prefix-icon="customPrefix" title="选择日期" size="large" :titleAttrs="{width: 100}"></o-date-range>
  </div>
</template>

<style scoped lang="scss"></style>
