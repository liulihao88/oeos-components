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
      @click.stop.prevent="jumpUrl('test/home')"
      class="dev-package-copy"
      v-if="isDev"
    >
      <div class="visible-text">跳转测试页</div>
    </el-button>
  </div>
</template>

<script lang="ts" setup>
import { getStorage, setStorage, copy } from '@oeos-components/utils'
import { ElMessage } from 'element-plus'
import { ref, onUnmounted, watch } from 'vue'
import { useData, useRouter } from 'vitepress' // 添加 useRouter 导入
import pkg from '../../../package.json'
import { buildVscodeFileUrl, getComponentDocPath, getDocsBasePath, getSourceDir, joinLocalPath } from './utils/localFile'

const { page } = useData()
const router = useRouter() // 获取路由器实例

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
  const docsBasePath = `${getDocsBasePath()}/components/`
  let mdStr = pathname.replace(docsBasePath, '') + '.md'
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

const openLocalSourceFile = (targetPath: string) => {
  window.open(buildVscodeFileUrl(targetPath), '_blank')
}

const jumpUrl = (type: string) => {
  let pathname = location.pathname
  if (!pathname || pathname === '/') {
    return
  }
  const sourceDir = getSourceDir()

  if (!sourceDir) {
    ElMessage.warning('请先配置 VITE_SOURCE_DIR 环境变量，例如 VITE_SOURCE_DIR=/path/to/oeos-components')
    return
  }

  let compStr = getComponentDocPath(pathname)
  let targetPath = ''
  if (type === 'md') {
    targetPath = joinLocalPath(sourceDir, 'docs/components', compStr, 'home.md')
    if (compStr === '') {
      targetPath = joinLocalPath(sourceDir, 'docs/components/index.md')
    }
  } else if (type === 'packages') {
    targetPath = joinLocalPath(sourceDir, 'packages/components', compStr, 'src/index.vue')
    if (compStr.startsWith('utils')) {
      targetPath = joinLocalPath(sourceDir, 'packages/utils/src/index.ts')
    }
    if (compStr.startsWith('directives')) {
      targetPath = joinLocalPath(sourceDir, 'packages/directives/gDirectives.js')
    }
  } else if (type === 'test/home') {
    router.go(`${getDocsBasePath()}/components/test/home`) // 使用 VitePress 路由进行跳转
    targetPath = joinLocalPath(sourceDir, 'docs/components/test/base.vue')
  }

  if (!targetPath) {
    return
  }

  openLocalSourceFile(targetPath)
}

const isHome = ref(false)
const timer = ref()
timer.value = setInterval(() => {
  if (window.location.pathname === `${getDocsBasePath()}/`) {
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
