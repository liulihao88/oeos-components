<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const isShow = ref(false)
</script>

<template>
  <div>
    <el-button type="primary" @click="isShow = true">显示dialog</el-button>
    <o-dialog title="基础dialog" v-model="isShow">
      <template #header>这是header插槽</template>
      我是内容
    </o-dialog>
  </div>
</template>
