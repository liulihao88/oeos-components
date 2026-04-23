<script setup lang="ts">
import { ref } from 'vue'

const count = ref(12)
const rightCount = ref(3)
const smallCount = ref(1)
</script>

<template>
  <div class="box">
    <div>
      1
      <o-input-number v-model="smallCount" title="小尺寸" size="small" :min="0" />
      2
      <o-input-number v-model="smallCount" title="小尺寸" :min="0" />
      3
      <o-input-number v-model="smallCount" title="大尺寸" size="large" :min="0" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.box {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
</style>
