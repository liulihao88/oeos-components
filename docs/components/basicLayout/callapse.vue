<script setup lang="ts">
import { ref } from 'vue'
const isCollapsed = ref(true)
</script>

<template>
  <div>
    <OBasicLayout :collapsible="true">
      我是内部的文件
      <template #header>
        <o-title title="基础用法">
          <template #right>
            <el-button type="primary">右侧</el-button>
          </template>
        </o-title>
      </template>
      <template #footer>
        <el-button type="primary">测试07</el-button>
        <el-button type="primary">测试07</el-button>
      </template>
    </OBasicLayout>

    <hr />

    <OBasicLayout v-model="isCollapsed" collapsible>
      我是内部的文件
      <template #header>
        <o-title title="默认收缩"></o-title>
      </template>
      <template #footer>
        <el-button type="primary">测试07</el-button>
        <el-button type="primary">测试07</el-button>
      </template>
    </OBasicLayout>
  </div>
</template>
