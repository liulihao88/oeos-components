<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
function tt() {
  console.log('  </o-tooltip>')
}
function isTest13() {
  console.log('isTest13')
}
</script>

<template>
  <div>
    <o-icon name="delete" class="po-a l-200 m-r-20" cc="1" size="20" @click="tt" content="删除"></o-icon>
    <o-icon name="warning" content="警告"></o-icon>
    <o-icon name="refresh" content="刷新" @click="tt" color="var(--blue)" size="50" placement="right"></o-icon>
    <o-icon name="refresh" content="刷新" class="cl-blue"></o-icon>
    <o-icon name="edit" content="编辑" size="30"></o-icon>
    <o-icon name="check"></o-icon>
    <o-icon name="close" class="is-loading"></o-icon>
    <o-icon name="download"></o-icon>
    <o-icon name="arrow-up"></o-icon>
    <o-icon name="arrow-right"></o-icon>
    <o-icon name="arrow-down"></o-icon>
    <o-icon name="arrow-left"></o-icon>
    <o-icon name="plus"></o-icon>
    <o-icon name="circle-close"></o-icon>
    <o-icon name="close"></o-icon>
    <o-icon name="more"></o-icon>
    <o-icon name="zoom-in"></o-icon>
    <o-icon name="zoom-out"></o-icon>

    <div>支持首字母大写, 驼峰, 中划线命名</div>
    <o-icon name="AddLocation"></o-icon>
    <o-icon name="addLocation"></o-icon>
    <o-icon name="add-location"></o-icon>
    <br />
  </div>
</template>

<style scoped lang="scss"></style>
