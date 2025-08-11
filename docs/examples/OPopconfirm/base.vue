<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const confirm2 = ref('andy凌云志')
confirm2.value = [
  { label: '张三', value: 'z3' },
  { label: '李四', value: 'l4' },
  { label: '王五', value: 'w5' },
]
function confirm() {
  console.log('confirm')
}

function isTest65() {
  proxy.$toast("保存成功");
}
</script>

<template>
  <div>
    <o-popconfirm @confirm="confirm">
      <el-button type="primary" @click="isTest65">最基础用法</el-button>
    </o-popconfirm>
    <br />

    <br />
    <o-popconfirm @confirm="confirm" content="我是删除content">
      <el-button type="primary" @click="isTest65">测试66</el-button>
    </o-popconfirm>

    <br />
    <br />

    <o-popconfirm @confirm="confirm" :reConfirm="false">
      <el-button type="primary" @click="isTest65">
        有些情况(比如本地开发), 不希望弹出弹框浪费时间, 可以设置:reConfirm="false"
      </el-button>
    </o-popconfirm>
  </div>
</template>

<style scoped lang="scss"></style>
