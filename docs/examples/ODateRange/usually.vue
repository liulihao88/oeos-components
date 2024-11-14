<script setup lang="ts">
import { ref, getCurrentInstance, h } from 'vue'
const { proxy } = getCurrentInstance()
const dateValue = ref()

</script>

<template>
  <div>
    <o-title title="年月日 时分秒"></o-title>
    <o-date-range v-model="dateValue" width="600" format="YYYY-MM-DD HH:mm:ss" type="datetimerange"></o-date-range>
    <o-title title="多属性"></o-title>
    <o-date-range
      v-model="dateValue"
      title="选择日期"
      start-placeholder="开始"
      end-placeholder="结束"
      range-separator="///"
    ></o-date-range>
  </div>
</template>

<style scoped lang="scss"></style>
