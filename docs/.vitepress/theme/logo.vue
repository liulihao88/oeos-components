<template>
  <el-button
    type="primary"
    size="small"
    @click.stop.prevent="toggleSourceVisible"
    class="code-toogle"
  >
    <div class="visible-text">
      {{ sourceVisible === true ? '代码折叠' : '代码显示' }}
    </div>
  </el-button>
</template>

<script lang="ts" setup>
import { getStorage, setStorage } from '../../../packages/utils'
import { ref } from 'vue'

const sourceVisible = ref(false)
sourceVisible.value = getStorage('codeVisible') || false
const toggleSourceVisible = () => {
  setStorage('codeVisible', !sourceVisible.value)
  location.reload()
}
</script>

<style lang="scss">
.code-toogle {
  position: fixed;
  top: 20px;
  right: 50%;
  z-index: 200;
}
</style>
