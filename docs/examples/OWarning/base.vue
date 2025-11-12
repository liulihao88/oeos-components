<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const htmlContent = `
  <div>这是html</div> 
  <span class="cl-blue">这是蓝色</span>  <br />
  <span class="cl-yellow">这是黄色</span> 
`
</script>

<template>
  <div>
    <o-warning content="这是基础用法" title="我是title"></o-warning>
    <br />
    <o-warning content="这是基础用法-size为small <code>你好啊</code>" size="small" left></o-warning>
    <br />
    <div class="f-st-ct">
      <o-warning title="我是title" content="默认类型, <code>这是code包裹内容</code>" class="mr" />
      <o-warning title="我是title" content="type=warning <code>这是code包裹内容</code>" type="warning" class="mr" />
      <o-warning title="我是title" content="type=simple <code>这是code包裹内容</code>" type="simple" class="mr" />
      <o-warning title="我是title" content="type=error <code>这是code包裹内容</code>" type="error" class="mr" />
    </div>
    <br />
    <o-warning
      content="这是基础用法这是基础用法这是基础用法这是基础用法这是基础用法这是基础用法这是基础用法这是基础用法这是基础用法这是基础用法这是基础用法这是基础用法这是基础用法这是基础用法这是基础用法这是基础用法这是基础用法"
    ></o-warning>
    <br />
    <o-warning>
      <template #content>
        <o-text :lineClamp="1">
          使用content插槽,
          处理content内容基础用法这是基础用法这是基础用法这是基础用法这是基础用法这是基础用法这是基础用法这是基础用法这是基础用法这是基础用法这是基础用法这是基础用法这是基础用法这是基础用法这是基础用法这是基础用法
        </o-text>
      </template>
    </o-warning>
    <br />
    <o-warning
      content="这是simple的基础用法这是simple的基础用法这是simple的基础用法这是simple的基础用法这是simple的基础用法这是simple的基础用法这是simple的基础用法这是simple的基础用法这是simple的基础用法这是simple的基础用法这是simple的基础用法这是simple的基础用法这是simple的基础用法这是simple的基础用法这是simple的基础用法这是simple的基础用法这是simple的基础用法这是simple的基础用法这是simple的基础用法这是simple的基础用法"
      type="simple"
    ></o-warning>
    <br />
    <o-warning
      type="info"
      content="这是info的基础用法, 更改图标"
      :iconAttrs="{
        name: 'delete',
      }"
    ></o-warning>
    <br />

    <o-warning content="这是更改样式" style="border-style: dotted"></o-warning>
    <br />
    <o-warning>
      <template #content>
        这是自定义content
        <code>哈哈哈</code>
        <blue>哈哈哈</blue>
      </template>
    </o-warning>

    <br />
    <o-warning :content="htmlContent"></o-warning>
    <br />
    <o-warning content="不要icon按钮" title="我是title" :dangerouslyUseHTMLString="true" :icon="false"></o-warning>
  </div>
</template>
