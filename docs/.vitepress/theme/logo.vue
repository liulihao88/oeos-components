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

  <el-button
    type="primary"
    size="small"
    @click.stop.prevent="copyUrl"
    class="code-toogle dev-copy"
  >
    <div class="visible-text">复制路径(仅本地)</div>
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
const copyUrl = () => {
  let pathname = location.pathname
  console.log(`pathname`, pathname)
  if (!pathname || pathname === '/') {
    return
  }
  let vueStr = pathname.replace('/components/', '') + '.vue'
  console.log(`vueStr`, vueStr)

  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(vueStr)
  } else {
    console.log('浏览器不支持')
  }
}
</script>

<style lang="scss">
.code-toogle {
  position: fixed;
  top: 20px;
  right: 50%;
  z-index: 200;
}
.dev-copy {
  right: calc(50% - 150px);
}
</style>
