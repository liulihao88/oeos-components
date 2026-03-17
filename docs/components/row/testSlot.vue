<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const disabled = ref(false)
</script>

<template>
  <div>
    <o-row>
      <o-button :disabled="disabled">{{ disabled }}</o-button>

      <el-button type="primary" @click="disabled = !disabled">测试18</el-button>
    </o-row>
  </div>
</template>
