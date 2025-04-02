<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const isShow = ref(false)
</script>

<template>
  <div>
    <o-dialog ref="dialogRef" title="我是dialog组件生成的drawer" type="drawer" v-model="isShow"></o-dialog>

    <el-button type="primary" @click="isShow = true">打开dialog组件生成的drawer</el-button>
  </div>
</template>
