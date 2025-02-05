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
    <o-warning content="这是基础用法"></o-warning>
    <br />
    <o-warning
      width="400"
      content="这是基础用法这是基础用法这是基础用法这是基础用法这是基础用法这是基础用法这是基础用法这是基础用法这是基础用法这是基础用法这是基础用法这是基础用法这是基础用法这是基础用法这是基础用法这是基础用法这是基础用法"
    ></o-warning>
    <br />
    <o-warning content="这是基础用法" type="info"></o-warning>
    <br />
    <o-warning content="这是基础用法" type="icon"></o-warning>
    <br />
    <o-warning>
      <template #content>
        这是自定义content
        <code>哈哈哈</code>
      </template>
    </o-warning>

    <br />
    <o-warning :content="htmlContent"></o-warning>
    <br />
    <o-warning :content="htmlContent" :dangerouslyUseHTMLString="true"></o-warning>
    <br />
  </div>
</template>
