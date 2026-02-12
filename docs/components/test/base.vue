<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const list = [
  {
    key: 'base',

    title: '基础表格',
  },
  {
    key: 'stripe',

    title: '带斑马纹表格',
  },
  {
    key: 'border',

    title: '带边框表格',
  },
  {
    key: 'status',

    title: '带状态表格',
  },
  {
    key: 'fixHeader',

    title: '固定表头',
  },
  {
    key: 'fixColumn',

    title: '固定列',
  },
  {
    key: 'fixColumnHeader',

    title: '固定列和表头',
  },
  {
    key: 'groupHeader',

    title: '多级表头（表头分组）',
  },
  {
    key: 'fluidHeight',

    title: '流体高度',
  },
  {
    key: 'radio',

    title: '单选',
  },
  {
    key: 'multipleChoice',

    title: '多选',
  },
  {
    key: 'sortable',

    title: '排序和格式化',
  },
  {
    key: 'filters',

    title: '筛选',
  },
  {
    key: 'column-template',

    title: '自定义列模板',
  },
  {
    key: 'header-renderer',

    title: '自定义表头',
  },
  {
    key: 'expand',

    title: '展开行',
  },
  {
    key: 'tree',

    title: '树形数据与懒加载',
  },
  {
    key: 'totalRow',

    title: '表尾合计行',
  },
  {
    key: 'merge',

    title: '合并行或列',
  },
  {
    key: 'customIndex',

    title: '自定义索引',
  },
  {
    key: 'layout',

    title: '表格布局',
  },
  {
    key: 'nestProp',

    title: '多种数据格式（深层结构）',
  },
  {
    key: 'imgPreview',

    title: '图像预览',
  },
]
const tabs = ref('')
</script>

<template>
  <div>
    <o-tabs v-model="tabs"  label="key" value="title">
      <el-tab-pane v-for="(v, i) in list" :key="i" :name="v.key" :label="v.title">
        <div>{{ v.title }}</div>
      </el-tab-pane>
    </o-tabs>
  </div>
</template>
