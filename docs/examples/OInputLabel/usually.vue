<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const port = ref()
</script>

<template>
  <div >
    <el-form-item label="" prop="" >
      <o-input-label
        v-model="port"
        :inputAttrs="{ placeholder: '请输入数字后回车', width: 300 }"
        :regexp="
          /^([1-9]|[1-9][0-9]{1,3}|[1-5][0-9]{4}|6[0-5][0-5][0-3][0-5])$/
        "
        message="请输入1-65535之间的端口号"
      ></o-input-label>
    </el-form-item>
  </div>
</template>

<style scoped lang="scss"></style>
