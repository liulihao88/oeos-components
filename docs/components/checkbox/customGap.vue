<template>
  <div class="demo-box">
    <div>
      horizontal gap:
      <el-slider v-model="horizontalGap" />
    </div>
    <o-checkbox v-model="value" :options="options" :gap="horizontalGap"></o-checkbox>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const value = ref([])

const horizontalGap = ref(0)

const options: any = ref([])

for (let i = 0; i < 20; i++) {
  options.value.push({
    label: `男人${i + 1}`,
    value: i,
  })
}
</script>

<style scoped lang="scss">
.demo-box {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
