<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const handleClick = () => {
  console.log('handleClick')
}
</script>

<template>
  <div>
    <o-title title="这里主要是测试button之间有margin-left: 12px"></o-title>
    <o-button content="我是提示文字" icon="plus" @click="handleClick">有提示</o-button>
    <el-button type="primary" @click="isTest39" size="small">测试33</el-button>
    <el-button type="primary" @click="isTest39" size="small">测试33</el-button>
    <o-button content="我是提示文字" icon="plus" @click="handleClick">有提示</o-button>
    <el-button type="primary" @click="isTest39">测试33</el-button>
    <o-button content="我是提示文字" icon="plus" @click="handleClick">有提示</o-button>
    <o-button content="我是提示文字" icon="plus" @click="handleClick">有提示</o-button>
  </div>
</template>
