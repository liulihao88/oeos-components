<template>
  <el-radio-group v-model="size">
    <el-radio value="large">Large</el-radio>
    <el-radio value="default">Default</el-radio>
    <el-radio value="small">Small</el-radio>
  </el-radio-group>

  <o-descriptions title="Vertical list with border" direction="vertical" :column="4" :size="size" border>
    <el-descriptions-item label="Username">kooriookami</el-descriptions-item>
    <el-descriptions-item label="Telephone">18100000000</el-descriptions-item>
    <el-descriptions-item label="Place" :span="2">Suzhou</el-descriptions-item>
    <el-descriptions-item label="Remarks">
      <el-tag size="small">School</el-tag>
    </el-descriptions-item>
    <el-descriptions-item label="Address">
      No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
    </el-descriptions-item>
  </o-descriptions>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import type { ComponentSize } from 'element-plus'

const size = ref<ComponentSize>('default')

const blockMargin = computed(() => {
  const marginMap = {
    large: '32px',
    default: '28px',
    small: '24px',
  }
  return {
    marginTop: marginMap[size.value] || marginMap.default,
  }
})
</script>

<style scoped>
.el-descriptions {
  margin-top: 20px;
}
</style>
