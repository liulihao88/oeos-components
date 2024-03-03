<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const dateValue = ref()
</script>

<template>
  <div>
    <o-date-range v-model="dateValue"></o-date-range>
  </div>
</template>

<style scoped lang="scss"></style>
