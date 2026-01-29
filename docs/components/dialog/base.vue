<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const isShow = ref(false)
const isShow2 = ref(false)
const confirm = () => {
  isShow2.value = true
}
</script>

<template>
  <div>
    <el-button type="primary" @click="isShow = true">显示dialog</el-button>
    <o-dialog title="基础dialog" v-model="isShow" @confirm="confirm">
      这是外部的dialog
      <o-dialog ref="dialogRef" title="内部的" v-model="isShow2">这是内部的dialog</o-dialog>
    </o-dialog>
  </div>
</template>

<style scoped lang="scss"></style>
