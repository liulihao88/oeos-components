<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
</script>

<template>
  <div>
    <o-title title="左侧" tb="10" l="10">
      <span class="ml2">左侧的slot</span>
      <template #right>
        <el-button type="primary">右侧的button</el-button>
        <el-button type="primary">右侧的button2</el-button>
        <el-button type="primary">右侧的button3</el-button>
        <el-button type="primary">右侧的button4</el-button>
      </template>
    </o-title>

    <o-title title="icon" type="simple">
      <template #icon>
        <o-icon name="plus"></o-icon>
      </template>
    </o-title>
  </div>
</template>
