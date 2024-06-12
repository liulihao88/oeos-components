<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
</script>

<template>
  <div>
    <o-title title="左侧" t="30" b="30" l="30">
      <span class="ml2">左侧的slot</span>
      <template #right>
        <el-button type="primary">右侧的button</el-button>
        <el-button type="primary">右侧的button2</el-button>
        <el-button type="primary">右侧的button3</el-button>
        <el-button type="primary">右侧的button4</el-button>
      </template>
    </o-title>
  </div>
</template>
