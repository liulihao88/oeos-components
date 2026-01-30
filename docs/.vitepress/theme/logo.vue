<template>
  <div class="po-f t-40 r-350">版本: ({{ pkgVersion }})</div>
  <el-button type="primary" size="small" @click.stop.prevent="toggleSourceVisible" class="prod-toogle" v-if="!isHome">
    <div class="visible-text">
      {{ sourceVisible === true ? '代码折叠' : '代码显示' }}
    </div>
  </el-button>

  <div class="code-toggle" ref="toggleRef" v-if="isDev && !isHome">
    <el-button type="primary" size="small" @click.stop.prevent="jumpUrl('md')" class="dev-md-copy">
      <div class="visible-text">跳转home.md(仅本地)</div>
    </el-button>
    <el-button
      type="primary"
      size="small"
      @click.stop.prevent="jumpUrl('packages')"
      class="dev-package-copy"
      v-if="showPackagesButton"
    >
      <div class="visible-text">跳转packages(仅本地)</div>
    </el-button>
    <el-button
      type="primary"
      size="small"
      @click.stop.prevent="jumpUrl('test/base')"
      class="dev-package-copy"
      v-if="isDev"
    >
      <div class="visible-text">跳转测试页</div>
    </el-button>
  </div>
</template>

<script lang="ts" setup>
import { getStorage, setStorage, copy } from '@oeos-components/utils'
import { ref, onUnmounted, onMounted, computed, watch } from 'vue'
import { useData } from 'vitepress'
import pkg from '../../../package.json'

const { page } = useData()

const toggleRef = ref(null)
const isDev = ref(import.meta.env.DEV)

const pkgVersion = ref(pkg.version)

const sourceVisible = ref(false)
const showPackagesButton = ref(true) // 控制按钮显示/隐藏的状态

// 根据路由判断是否应该显示按钮
const shouldshowPackagesButton = (routePath: string) => {
  // 在这里添加您的路由判断逻辑
  // 示例：只在特定路径下显示按钮
  const hiddenRoutes = ['components/index.md']
  return !hiddenRoutes.includes(routePath)
}

sourceVisible.value = getStorage('codeVisible') || false

// 监听路由变化，更新按钮显示状态
watch(
  () => page.value.relativePath,
  (newPath) => {
    console.log(`22 newPath`, newPath)
    showPackagesButton.value = shouldshowPackagesButton(newPath)
  },
  {
    immediate: true,
  },
)

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
  let compStr = pathname.replace(/^\/oeos\-components\/components\//, '').replace(/\/home$/, '')
  console.log(`16 compStr`, compStr)
  if (type === 'md') {
    let middleStr = 'docs/components'
    vascodeUrl = `vscode://file${baseUrl}/${middleStr}/${compStr}/home.md`
    if (compStr === '') {
      vascodeUrl = `vscode://file${baseUrl}/${middleStr}/index.md`
    }
    if (compStr.startsWith('directives')) {
      vascodeUrl = `vscode://file${baseUrl}/${middleStr}/${compStr}.md`
    }
  } else if (type === 'packages') {
    let middleStr = 'packages/components'
    vascodeUrl = `vscode://file${baseUrl}/${middleStr}/${compStr}/src/index.vue`
    if (compStr.startsWith('utils')) {
      vascodeUrl = `vscode://file${baseUrl}/packages/utils/src/index.ts`
    }
    if (compStr.startsWith('directives')) {
      vascodeUrl = `vscode://file${baseUrl}/packages/directives/gDirectives.js`
    }
  } else if(type==='test/base'){
    vascodeUrl = `vscode://file${baseUrl}/docs/components/test/base.vue`
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
