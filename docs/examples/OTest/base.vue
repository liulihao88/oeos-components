<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const cc = ref(123)
</script>

<template>
  <div>
   <div class="f-st-ct">
     <o-comp-title title="你好" ></o-comp-title>
     <el-input-number v-model="cc" />
   </div>

    <div>
      <o-comp-title title="你好"></o-comp-title>
      <el-input v-model="cc" style="width: 100px" />
    </div>
    <o-empty></o-empty>
  </div>
</template>

<style lang="scss" scoped>
.f-st-ct :deep(.el-input__wrapper) {
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
}
</style>
