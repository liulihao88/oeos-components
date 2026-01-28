<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const htmlContent = `
  <div>这是html</div> 
  <span class="cl-blue">这是蓝色</span>  <br />
  <span class="cl-yellow">这是黄色</span> 
`

const ulContent = `
  <ul>
    <li>1. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga a eveniet corporis, maiores ab laboriosam eligendi quia ex atque aspernatur odit sint numquam assumenda impedit voluptas reiciendis inventore eos veniam!</li>  
    <li>2. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga a eveniet corporis, maiores ab laboriosam eligendi quia ex atque aspernatur odit sint numquam assumenda impedit voluptas reiciendis inventore eos veniam!</li>  
    <li>3. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga a eveniet corporis, maiores ab laboriosam eligendi quia ex atque aspernatur odit sint numquam assumenda impedit voluptas reiciendis inventore eos veniam!</li>  
  </ul>
`
</script>

<template>
  <div>
    <o-warning content="这是基础用法" title="我是title"></o-warning>
    <br />
    <o-warning
      content="这是基础用法-size为small <code>这是code包裹内容</code> <blue>这是blue包裹内容</blue>, <strong>这是strong包裹的内容</strong> 并且设置了left <a href='http://www.baidu.com'>设置根路径</a>"
      size="small"
      left
    ></o-warning>
    <br />
    <o-warning :content="ulContent" :dangerouslyUseHTMLString="true" :icon="false" :style="{ paddingLeft: '20px' }" />
    <br />
    <o-flex>
      <o-warning title="我是title" content="默认类型, <code>这是code包裹内容</code>" class="mr" />
      <o-warning title="我是title" content="type=warning <code>这是code包裹内容</code>" type="warning" class="mr" />
      <o-warning title="我是title" content="type=simple <code>这是code包裹内容</code>" type="simple" class="mr" />
      <o-warning title="我是title" content="type=error <code>这是code包裹内容</code>" type="error" class="mr" />
    </o-flex>

    <br />
    <o-warning
      type="info"
      content="这是info的基础用法, 并更改图标"
      :iconAttrs="{
        name: 'delete',
      }"
    ></o-warning>
    <br />

    <o-warning content="这是更改样式" style="border-style: dotted; padding-left: 50px" left="10"></o-warning>

    <br />
    <o-warning :content="htmlContent"></o-warning>
    <br />
    <o-warning content="不要icon按钮" title="我是title" :dangerouslyUseHTMLString="true" :icon="false"></o-warning>
  </div>
</template>
