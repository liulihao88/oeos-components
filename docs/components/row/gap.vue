<script setup lang="ts">
import { computed, ref } from 'vue'

const gapNumber = ref(24)
const gap = computed(() => String(gapNumber.value))
</script>

<template>
  <div class="demo-box">
    <div class="demo-title">当前 `gap`: "{{ gap }}"</div>
    <el-slider v-model="gapNumber" :min="0" :max="48" show-input />

    <o-row :col="8" :gap="gap">
      <div class="box">gap=&quot;{{ gap }}&quot;</div>
      <div class="box">数字字符串</div>
      <div class="box">自动按 px</div>
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
