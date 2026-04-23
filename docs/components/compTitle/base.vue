<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const count = ref(1)
</script>

<template>
  <div class="demo-list">
    <div class="demo-row">
      <o-comp-title title="默认" />
      <el-input v-model="value" placeholder="默认高度" />
    </div>

    <div class="demo-row">
      <o-comp-title title="大尺寸" size="large" :box-style="{ width: 88 }" />
      <el-input v-model="value" size="large" placeholder="large" />
    </div>

    <div class="demo-row">
      <o-comp-title title="小尺寸" size="small" :box-style="{ width: 88, color: 'var(--el-color-primary)' }" />
      <el-input v-model="value" size="small" placeholder="small" />
    </div>

    <div class="demo-row">
      <o-comp-title title="数量" :box-style="{ width: 72 }" />
      <el-input-number v-model="count" controls-position="right" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.demo-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.demo-row {
  display: inline-flex;
  align-items: center;
  width: 320px;

  :deep(.el-input__wrapper),
  :deep(.el-input-number .el-input__wrapper) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  :deep(.el-input-number) {
    flex: 1;
  }
}
</style>
