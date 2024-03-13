<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const arr = ref([33, 55])
</script>

<template>
  <div>
    <o-input-label v-model="arr"></o-input-label>
  </div>
</template>

<style scoped lang="scss"></style>
