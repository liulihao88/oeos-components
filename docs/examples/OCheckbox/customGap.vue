<template>
  <div>
    <div>
      horizontal gap:
      <el-slider v-model="horizontalGap" />
    </div>
    <o-checkbox v-model="value" :options="options" :gap="horizontalGap"></o-checkbox>

    <o-checkbox v-model="value" :options="options"></o-checkbox>
  </div>
</template>
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const value = ref([])

const horizontalGap = ref(0)

const options: any = ref([])

for (let i = 0; i < 20; i++) {
  options.value.push({
    label: `男人${i + 1}`,
    value: i,
  })
}

watchEffect(() => {
  console.log('value', value.value)
})
</script>
