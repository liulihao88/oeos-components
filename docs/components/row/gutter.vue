<script setup lang="ts">
import { ref } from 'vue'

const gutter = ref(16)
</script>

<template>
  <div class="demo-box">
    <div class="demo-title">当前 `gutter`: {{ gutter }}</div>
    <el-slider v-model="gutter" :min="0" :max="48" show-input />

    <o-row :col="8" :gutter="gutter">
      <div class="box">1</div>
      <div class="box">2</div>
      <div class="box">3</div>
    </o-row>
  </div>
</template>

<style scoped lang="scss">
.demo-box {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.demo-title {
  color: var(--45);
}

.box {
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  background: #eee;
  color: #666;
}
</style>
