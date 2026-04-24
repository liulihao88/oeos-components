<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
</script>

<template>
  <div>
    <o-title title="基础用法">
      我很奇怪
      <template #right>
        <el-button type="primary" @click="isTest15">测试36</el-button>
      </template>
    </o-title>
    <oBasicLayout collapsible>
      <template #header>
        <o-title title="基础用法">
          我很奇怪
          <template #right>
            <el-button type="primary" @click="isTest15">测试36</el-button>
          </template>
        </o-title>
      </template>
      <template #footer>
        <el-button type="primary">测试07</el-button>
        <el-button type="primary">测试07</el-button>
      </template>
    </oBasicLayout>

  </div>
</template>
