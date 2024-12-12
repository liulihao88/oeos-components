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
    <o-date-range v-model="dateValue"></o-date-range>
    <o-date-range
      v-model="dateValue"
      width="600"
      size="small"
      title="选择日期"
      class="m-t-8"
      :titleAttrs="{ width: 100 }"
    ></o-date-range>
  </div>
</template>

<style scoped lang="scss"></style>
