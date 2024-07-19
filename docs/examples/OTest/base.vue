<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const isShow = ref()
const cc = ref()
</script>

<template>
  <div>
    <o-input v-model="cc"  placeholder="请输入yes3243" />
    <br />
    <o-input v-model="cc" content="我不服" v-focus placeholder="请输入yes3243" />
    <br />
    <o-input v-model="cc" width="500px" placeholder="请输入yes3243" content="你瞅啥" type="textarea" />
  </div>
</template>
