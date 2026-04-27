<script setup lang="ts">
import { ref } from 'vue'
const isCollapsed = ref(true)
</script>

<template>
  <div>
    <OBasicLayout :collapsible="true">
      我是内部的文件
      <template #header>
        <o-title title="默认点击右侧图标收起">
          <el-button type="primary" @click.stop="console.log(1234)">测试96</el-button>
          <template #right>
            <el-button type="primary" @click.stop="console.log(123)">右侧按钮不再需要手动 stop</el-button>
          </template>
        </o-title>
      </template>
      <template #footer>
        <el-button type="primary">测试07</el-button>
        <el-button type="primary">测试07</el-button>
      </template>
    </OBasicLayout>

    <hr />

    <OBasicLayout v-model="isCollapsed" collapsible collapse-trigger="header">
      我是内部的文件
      <template #header>
        <o-title title="整块头部可点击收起"></o-title>
      </template>
      <template #footer>
        <el-button type="primary">测试07</el-button>
        <el-button type="primary">测试07</el-button>
      </template>
    </OBasicLayout>
  </div>
</template>
