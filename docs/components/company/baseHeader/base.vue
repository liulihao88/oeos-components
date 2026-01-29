<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const value = ref()
</script>

<template>
  <div>
    <oBaseHeader>
      <div>
        <o-input v-model="value" title="我是左侧的input"></o-input>
      </div>
      <template #right>
        <el-button>我是右侧的slot</el-button>
        <el-button>这是右侧button</el-button>
      </template>
    </oBaseHeader>
  </div>
</template>