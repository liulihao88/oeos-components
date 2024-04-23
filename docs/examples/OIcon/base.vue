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
    <o-icon name="delete" class="po-a l-200 m-l-200" cc="1" size="100" @click="tt" content="删除"></o-icon>
    <o-icon name="refresh" content="刷新" @click="tt" color="var(--blue)" size="50" placement="right"></o-icon>
    <o-icon name="refresh" content="刷新" @click="tt" class="cl-blue" size="50" placement="right"></o-icon>
    <o-icon name="edit" content="编辑" size="30"></o-icon>
    <o-icon name="check"></o-icon>
    <o-icon name="close" class="is-loading"></o-icon>
    <o-icon name="download"></o-icon>
    <o-icon name="arrow-right" color="blue"></o-icon>
    <o-icon name="plus" color="red" size="2em"></o-icon>
    <o-icon name="loading" class="is-loading"></o-icon>
    <o-icon name="AddLocation" class="is-loading"></o-icon>
    <o-icon name="addLocation" class="is-loading"></o-icon>
    <o-icon name="add-location" class="is-loading"></o-icon>
    <br />
    <el-button @click="isTest13" disabled type="danger">测试18</el-button>
    <el-button type="primary" @click="isTest13" disabled>测试18</el-button>
    <el-button type="primary" @click="isTest13">测试18</el-button>
    <el-button type="primary" @click="isTest13">测试18</el-button>
    <el-button type="primary" @click="isTest13">测试18</el-button>
    <el-button type="primary" @click="isTest13">测试18</el-button>
    <el-button type="primary" @click="isTest13">测试18</el-button>
    <el-button type="primary" @click="isTest13">测试18</el-button>
    <el-button type="primary" @click="isTest13">测试18</el-button>
    <el-button type="primary" @click="isTest13">测试18</el-button>
    <el-button type="primary" @click="isTest13">测试18</el-button>
    <el-button type="primary" @click="isTest13">测试18</el-button>
    <el-button type="primary" @click="isTest13">测试18</el-button>
    <el-button type="primary" @click="isTest13">测试18</el-button>
    <el-button type="primary" @click="isTest13">测试18</el-button>
  </div>
</template>

<style scoped lang="scss"></style>
