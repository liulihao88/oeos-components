<template>
  <div class="po-f t-40 r-350">版本: ({{ pkgVersion }})</div>
  <el-button type="primary" size="small" @click.stop.prevent="toggleSourceVisible" class="prod-toogle" v-if="!isHome">
    <div class="visible-text">
      {{ sourceVisible === true ? '代码折叠' : '代码显示' }}
    </div>
  </el-button>

  <div class="code-toggle" ref="toggleRef" v-if="isDev">
    <el-button type="primary" size="small" @click.stop.prevent="jumpUrl('md')" class="dev-md-copy">
      <div class="visible-text">跳转base.md(仅本地)</div>
    </el-button>
    <el-button type="primary" size="small" @click.stop.prevent="jumpUrl('packages')" class="dev-package-copy">
      <div class="visible-text">跳转packages(仅本地)</div>
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

const jumpUrl = (type: string) => {
  let pathname = location.pathname
  console.log(`77 location`, location)
  if (!pathname || pathname === '/') {
    return
  }
  let baseUrl = '/Users/liulihao/cyrd/oeos-components'
  let vascodeUrl = ''
  let compStr = pathname.replace(/^\/oeos\-components\/components\//, '').replace(/\/base$/, '')
  console.log(`16 compStr`, compStr)
  if (type === 'md') {
    let middleStr = 'docs/components'
    vascodeUrl = `vscode://file${baseUrl}/${middleStr}/${compStr}/base.md`
  } else if (type === 'packages') {
    //  /Users/liulihao/cyrd/oeos-components/packages/components/button/src/index.vue
    // vscode://file/Users/liulihao/cyrd/oeos-componentspackages/oeos-components/components/button.vue
    // packages/oeos-components/components/button.vue
    const reg = /\/[^/]*$/
    let middleStr = 'packages/components'
    vascodeUrl = `vscode://file${baseUrl}/${middleStr}/${compStr}/src/index.vue`
    console.log(`83 vascodeUrl`, vascodeUrl)
  }
  window.open(vascodeUrl, '_blank')
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
