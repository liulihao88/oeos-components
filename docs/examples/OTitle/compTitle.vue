<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const cc = ref(123)
</script>

<template>
  <div>
    <div class="box">
      <o-comp-title title="你好"></o-comp-title>
      <el-input-number v-model="cc" />
    </div>

    <div class="mt">
      <o-comp-title
        title="你好"
        :titleAttrs="{ width: '160px', fontSize: '20px', color: 'var(--blue)' }"
      ></o-comp-title>
      <el-input v-model="cc" style="width: 100px" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.box {
  display: flex;
  align-items: center;
  :deep(.el-input__wrapper) {
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
  }
}
</style>
