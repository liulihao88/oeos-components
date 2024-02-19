<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const dateValue = ref([])
</script>

<template>
  <div>
    <div>example/views/dateRange/DateRange.vue</div>
    <o-date-range
      v-model="dateValue"
      format="YYYY-MM-DD HH:mm:ss"
    ></o-date-range>
  </div>
</template>

<style scoped lang="scss"></style>
