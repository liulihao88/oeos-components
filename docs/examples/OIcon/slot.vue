<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import { Plus } from '@element-plus/icons-vue'
const { proxy } = getCurrentInstance()
function tt() {
  console.log('  </o-tooltip>')
}
function isTest13() {
  console.log('isTest13')
}
const plus = () => {
  console.log('plus')
}
</script>

<template>
  <div>
    <o-icon>
      <Plus></Plus>
    </o-icon>

    <o-icon content="添加" @click="plus" class="cp">
      <Plus></Plus>
    </o-icon>
  </div>
</template>

<style scoped lang="scss"></style>
