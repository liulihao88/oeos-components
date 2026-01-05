<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
</script>

<template>
  <o-warning>
    <template #title>我是插槽的title</template>
    <template #content>
      我是插槽的content
      <code>哈哈哈</code>
      <blue>哈哈哈</blue>
      <el-button type="primary" icon="el-icon-plus" size="small">
        添加: (注意: dangerouslyUseHTMLString 方式渲染 HTML 内容，这种方式只能渲染原生 HTML 标签，无法渲染 Vue 组件;
        所以只能使用插槽)
      </el-button>
    </template>
  </o-warning>
</template>
