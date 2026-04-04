<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
import { ElMessage, ElMessageBox, MessageOptions } from 'element-plus'
const isShow = ref(false)

const cc = () => {
  ElMessageBox.confirm('cccccc', {
    title: '提示',
    draggable: true,
    showCancelButton: false,
    confirmButtonText: '确定',
    dangerouslyUseHTMLString: true, // 允许 HTML
    // appContext: elContext, // 强制
  })
}
</script>

<template>
  <div>
    <o-dialog ref="dialogRef" title="t1" v-model="isShow">
      <el-button type="primary" @click="proxy.confirm('oeos-confirm', {})">oeos-confirm</el-button>
      <el-button type="primary" @click="cc">原生</el-button>
    </o-dialog>

    <el-button type="primary" @click="isShow = true">测试89</el-button>

    <!-- <el-dialog v-model="isShow"> -->
    <!-- <el-button type="primary" @click="cc">测试15</el-button> -->
    <!-- </el-dialog> -->
  </div>
</template>
