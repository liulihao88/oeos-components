<script setup lang="ts">
import { ref, getCurrentInstance, h } from 'vue'
import { components } from '@/index.ts'
const { OWarning } = components
const { proxy, appContext } = getCurrentInstance()
const isShow = ref(false)
const isShow2 = ref(false)
const useComponent = () => {
  proxy.confirm('', {
    customStyle: {
      maxWidth: '600px',
    },
    message: h(OWarning, {
      dangerouslyUseHTMLString: true,
      content:
        '对于光存储开启保持原始对象名称后，对象将作为独立文件在光存储介质直接存储。<br>注意：当桶内文件大小普遍较小 <span class="cl-blue">（<100MB）</span> 或过大（>51GB）时不推荐打开此功能！您确定开启此功能吗?',
    }),
    cancelButtonText: '取消',
  })
}
</script>

<template>
   注意: `confirm` 现在默认会显示取消/确认按钮并带默认 icon。这里的提示仍然是组件内容本身的 icon 渲染问题，如果需要将 `OWarning` 作为参数传入，建议使用原生的 `ElMessageBox.confirm`
  <el-button type="primary" @click="isShow = true">使用组件</el-button>
  <o-dialog ref="dialogRef" title="base" v-model="isShow">
    <div class="h-500">
      我是顶层dialog
      <el-button type="primary" @click="isShow2 = true">打开二层的dialog, 并且有confirm确认框</el-button>
    </div>
    <o-dialog ref="dialogRef" title="dialog" v-model="isShow2">
      <div class="h-400">
        <el-button type="primary" @click="useComponent">打开确认框</el-button>
      </div>
      <div id="highSettingsForm" class="h-100">在这个div下</div>
    </o-dialog>
  </o-dialog>
</template>
