<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
import { $toast } from '@/utils'

const arr = ref([
  { label: '小月月', value: 'xyy' },
  { label: '小鑫鑫', value: 'xxx' },
])

const arr2 = proxy.clone(arr)
</script>

<template>
  <div>
    {{ arr }}
    <br />
    {{ arr2 }}
  </div>
</template>

<style scoped lang="scss"></style>
