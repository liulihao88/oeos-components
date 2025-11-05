<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
import { $toast } from '@oeos-components/utils'
const inner1 = () => {
  $toast('inner1')
}
const inner2 = () => {
  $toast('inner2')
}
const outer1 = () => {
  $toast('outer1')
}
const outer2 = () => {
  $toast('outer2')
}
const mounted = (e) => {
  console.log('mounted', e)
}
</script>

<template>
  <div>
    <o-title title="简单用法"></o-title>
    <OClickOutside @clickOutside="outer1" @mounted="mounted">
      <el-button @click="inner1" class="w-200 h-200 bg-blue">你好啊</el-button>
    </OClickOutside>

    <o-title title="传参用法"></o-title>
    <OClickOutside @clickOutside="outer2" @mounted="mounted" :options="{ ignore: ['#not-emit'] }">
      <el-button @click="inner2" class="w-200 h-200 bg-blue">你好啊</el-button>
    </OClickOutside>
    <el-button id="not-emit" class="ml2">点击我不触发outer2</el-button>
  </div>
</template>
