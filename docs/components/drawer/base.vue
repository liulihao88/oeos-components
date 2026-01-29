<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const isShowAbandon = ref(false)
const isShow = ref(false)
function btnClick() {
  isShowAbandon.value = true
}
function btnClick2() {
  isShow.value = true
}
</script>

<template>
  <div>
    <el-button @click="btnClick" type="primary">打开旧drawer(废弃)</el-button>
    <el-button @click="btnClick2" type="primary">打开新drawer(推荐使用)</el-button>
    <o-dialog ref="dialogRef" title="drawer抽屉" v-model="isShow" type="drawer">
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
      <div>以后请使用这种用法打开drawer</div>
    </o-dialog>
    <o-drawer title="baseDrawer" v-model="isShowAbandon">
      我是drawer的基础用法(废弃维护当前drawer组件, 改为统一在dialog组件中维护)
    </o-drawer>
  </div>
</template>

<style scoped lang="scss"></style>
