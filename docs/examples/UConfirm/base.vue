<script setup lang="ts">
import { ref, getCurrentInstance, h } from 'vue'
import OWarning from '@/components/warning/src/index.vue'
const { proxy } = getCurrentInstance()
const base = () => {
  proxy.confirm('确定删除吗?')
}

const useHtml = () => {
  proxy.confirm('', {
    dangerouslyUseHTMLString: true,
    showCancelButton: true,
    message:
      '对于光存储开启保持原始对象名称后，对象将作为独立文件在光存储介质直接存储。<br>注意：当桶内文件大小普遍较小 <span class="cl-blue">（<100MB）</span> 或过大（>5GB）时不推荐打开此功能！您确定开启此功能吗?',
  })
}
const useComponent = () => {
  proxy.confirm('', {
    customStyle: {
      maxWidth: '600px',
    },
    message: h(OWarning, {
      dangerouslyUseHTMLString: true,
      content:
        '对于光存储开启保持原始对象名称后，对象将作为独立文件在光存储介质直接存储。<br>注意：当桶内文件大小普遍较小 <span class="cl-blue">（<100MB）</span> 或过大（>5GB）时不推荐打开此功能！您确定开启此功能吗?',
    }),
    showCancelButton: true,
    cancelButtonText: '取消',
    appendTo: '#highSettingsForm',
  })
}
</script>

<template>
  <div>
    <el-button type="primary" @click="base">基础用法</el-button>
    <el-button type="primary" @click="useHtml">使用html</el-button>
    <el-button type="primary" @click="useComponent">使用组件</el-button>
  </div>
</template>
