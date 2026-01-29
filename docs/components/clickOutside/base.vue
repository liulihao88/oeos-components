<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
import { $toast } from '@oeos-components/utils'
const inner = () => {
  console.log(`1192 6行 docs/examples/OClickOutside/base.vue 111 `, 111)
  $toast('inner11')
}
const outer = (event) => {
  console.log(`03 event`, event)
  $toast(`95 event`, event)
  $toast('outer')
}
const mounted = (e) => {
  console.log('mounted', e)
}
</script>

<template>
  <div>
    <oClickOutside @clickOutside="outer" @mounted="mounted">
      <el-button @click="inner" class="w-200 h-200 bg-blue">你好啊</el-button>
    </oClickOutside>
  </div>
</template>
