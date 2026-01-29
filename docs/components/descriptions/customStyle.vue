<template>
  <el-descriptions title="Customized style list" :column="3" border>
    <el-descriptions-item
      label="Username"
      label-align="left"
      align="center"
      label-class-name="my-label"
      class-name="my-content"
      width="150px"
    >
      kooriookami
    </el-descriptions-item>
    <el-descriptions-item label="Telephone" label-align="right" align="center">18100000000</el-descriptions-item>
    <el-descriptions-item label="Place" label-align="right" align="center">Suzhou</el-descriptions-item>
    <el-descriptions-item label="Remarks" label-align="right" align="center">
      <el-tag size="small">School</el-tag>
    </el-descriptions-item>
    <el-descriptions-item label="Address" label-align="right" align="center">
      No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
    </el-descriptions-item>
  </el-descriptions>

  <hr />
  <o-descriptions :options="options" :column="1" label-width="300"></o-descriptions>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const options = ref([
  {
    label: '自定义label样式',
    value: '自定义value样式',
    attrs: {
      'label-class-name': 'my-label',
      'class-name': 'my-content',
      'label-align': 'left',
      align: 'center',
    },
  },
  {
    label: '自定义label样式2',
    value: '自定义value样式2',
  },
])
</script>

<style scoped>
:deep(.my-label) {
  background: var(--el-color-success-light-9) !important;
}
:deep(.my-content) {
  background: var(--el-color-danger-light-9);
}
</style>
