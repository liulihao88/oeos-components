<template>
  <el-button
    type="primary"
    size="small"
    @click.stop.prevent="toggleSourceVisible"
    class="prod-toogle"
  >
    <div class="visible-text">
      {{ sourceVisible === true ? '代码折叠' : '代码显示' }}
    </div>
  </el-button>

  <div class="code-toogle" v-if="isDev">
    <el-button
      type="primary"
      size="small"
      @click.stop.prevent="copyUrl"
      class="dev-copy"
    >
      <div class="visible-text">复制路径(仅本地)</div>
    </el-button>

    <el-button
      type="primary"
      size="small"
      @click.stop.prevent="copyMdUrl"
      class="dev-md-copy"
    >
      <div class="visible-text">复制md路径(仅本地)</div>
    </el-button>
    <el-button
      type="primary"
      size="small"
      @click.stop.prevent="copyPackageUrl"
      class="dev-package-copy"
    >
      <div class="visible-text">复制package路径(仅本地)</div>
    </el-button>
  </div>
</template>

<script lang="ts" setup>
import { getStorage, setStorage, copy } from '@/utils'
import { ref } from 'vue'
const isDev = ref(import.meta.env.DEV)

const sourceVisible = ref(false)
sourceVisible.value = getStorage('codeVisible') || false
const toggleSourceVisible = () => {
  setStorage('codeVisible', !sourceVisible.value)
  location.reload()
}
const copyUrl = () => {
  console.log(`import.meta.env.DEV`, import.meta.env.DEV)
  let pathname = location.pathname
  console.log(`pathname`, pathname)
  if (!pathname || pathname === '/') {
    return
  }
  let vueStr = pathname.replace('/components/', '') + '.vue'
  console.log(`vueStr`, vueStr)
  copy(vueStr, { duration: 500 })
}
const copyMdUrl = () => {
  console.log(`import.meta.env.DEV`, import.meta.env.DEV)
  let pathname = location.pathname
  console.log(`pathname`, pathname)
  if (!pathname || pathname === '/') {
    return
  }
  let mdStr = pathname.replace('/components/', '') + '.md'
  console.log(`mdStr`, mdStr)
  copy(mdStr, { duration: 500 })
}
const copyPackageUrl = () => {
  console.log(`import.meta.env.DEV`, import.meta.env.DEV)
  let pathname = location.pathname
  console.log(`pathname`, pathname)
  if (!pathname || pathname === '/') {
    return
  }
  const reg = /\/[^/]*$/
  let pkgStr = 'packages' + pathname.replace(reg, '') + '.vue'
  console.log(`pkgStr`, pkgStr)
  copy(pkgStr, { duration: 500 })
}
</script>

<style lang="scss">
.code-toogle {
  position: fixed;
  top: 20px;
  right: 40%;
  z-index: 200;
}
.prod-toogle {
  position: fixed;
  top: 50px;
  right: 50%;
  z-index: 200;
}
// .dev-copy {
//   right: calc(58% - 120px);
// }
// .dev-md-copy {
//   right: calc(58% - 256px);
// }
// .dev-package-copy {
//   right: calc(58% - 420px);
// }
</style>
