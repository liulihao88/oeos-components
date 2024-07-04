<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const isShow = ref(false)
proxy.log(`isShow`, isShow, '__INJECT_FILE_PATH__')
</script>

<template>
  <div>
    <el-button type="primary" @click="isShow = true">显示dialog</el-button>
    <o-dialog title="基础dialog" v-model="isShow">
      <div>这是要显示的内容</div>
    </o-dialog>
  </div>
</template>

<style scoped lang="scss"></style>
