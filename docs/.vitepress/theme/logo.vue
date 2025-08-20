<template>
  <div class="po-f t-40 r-350">
    版本: ({{ pkgVersion }})
  </div>
  <el-button type="primary" size="small" @click.stop.prevent="toggleSourceVisible" class="prod-toogle" v-if="!isHome">
    <div class="visible-text">
      {{ sourceVisible === true ? '代码折叠' : '代码显示' }}
    </div>
  </el-button>

  <div class="code-toggle" ref="toggleRef" v-if="isDev">
    <el-button type="primary" size="small" @click.stop.prevent="copyUrl" class="dev-copy">
      <div class="visible-text">复制路径(仅本地)</div>
    </el-button>

    <el-button type="primary" size="small" @click.stop.prevent="copyMdUrl" class="dev-md-copy">
      <div class="visible-text">复制md路径(仅本地)</div>
    </el-button>
    <el-button type="primary" size="small" @click.stop.prevent="copyPackageUrl" class="dev-package-copy">
      <div class="visible-text">复制package路径(仅本地)</div>
    </el-button>
  </div>
</template>

<script lang="ts" setup>
import { getStorage, setStorage, copy } from '@oeos-components/utils'
import { ref, onUnmounted, onMounted } from 'vue'
const isDev = ref(import.meta.env.DEV)
import pkg from '../../../package.json'

const toggleRef = ref(null)

const pkgVersion = ref(pkg.version)

const sourceVisible = ref(false)
sourceVisible.value = getStorage('codeVisible') || false
const toggleSourceVisible = () => {
  setStorage('codeVisible', !sourceVisible.value)
  location.reload()
}
const copyUrl = () => {
  let pathname = location.pathname
  if (!pathname || pathname === '/') {
    return
  }
  let vueStr = pathname.replace('/oeos-components/components/', '') + '.vue'
  copy(vueStr, { duration: 500 })
}
const copyMdUrl = () => {
  let pathname = location.pathname
  if (!pathname || pathname === '/') {
    return
  }
  let mdStr = pathname.replace('/oeos-components/components/', '') + '.md'
  copy(mdStr, { duration: 500 })
}
const copyPackageUrl = () => {
  let pathname = location.pathname
  if (!pathname || pathname === '/') {
    return
  }
  const reg = /\/[^/]*$/
  let pkgStr = 'packages' + pathname.replace(reg, '') + '.vue'
  copy(pkgStr, { duration: 500 })
}

const isHome = ref(false)
const timer = ref()
timer.value = setInterval(() => {
  let pathname = window.location.pathname
  if (window.location.pathname === '/oeos-components/') {
    return (isHome.value = true)
  }
  isHome.value = false
}, 1000)
onUnmounted(() => {
  clearInterval(timer.value)
})
</script>

<style lang="scss">
.code-toggle {
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
</style>
