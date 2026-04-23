<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
</script>

<template>
  <div>
    1
    <el-input-number v-model="smallCount" title="小尺寸" size="small" :min="0" />
    2
    <el-input-number v-model="smallCount" title="小尺寸" :min="0" />
    3
    <el-input-number v-model="smallCount" title="大尺寸" size="large" :min="0" />
  </div>
</template>
