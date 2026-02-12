<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const searchSix = ref('copy')
const text = ref('可复制的文本')
</script>

<template>
  <div>
    <div class="mb-2">
      文本复制指令（双击输入框内容即可复制）
      <el-input v-model="searchSix" v-copy="searchSix" class="w-200" />
      <!-- <el-input v-model="searchSix" /> -->
    </div>
    <div>
      文本复制指令（自定义触发事件，单击复制）
      <span v-copy:click="text" class="link">{{ text }}</span>
    </div>
  </div>
</template>
