<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const isShow = ref()
const cc = ref()
</script>

<template>
  <div>
    <o-input v-model="cc" v-number placeholder="请输入yes3243" />
    <o-input v-model="cc" v-focus v-number placeholder="请输入yes3243" />
    <o-input v-model="cc" v-number placeholder="请输入yes3243" />
    <el-button type="primary" @click="isShow = true">测试25</el-button>
    <o-dialog ref="dialogRef" v-model="isShow">
      <el-input v-model="cc" v-focus v-number clearable placeholder="请输入yes3243" />
    </o-dialog>
  </div>
</template>
