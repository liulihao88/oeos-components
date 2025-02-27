<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const cc = ref(123)
proxy.confirm('哈哈', { icon: 'el-icon-warning' })
</script>

<template>
  <div></div>
</template>

<style lang="scss" scoped>
.f-st-ct :deep(.el-input__wrapper) {
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
}
</style>
