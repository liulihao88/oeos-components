<template>
  <ClientOnly>
    <!-- danger here DO NOT USE INLINE SCRIPT TAG -->
    <p text="sm" v-html="decodedDescription" />
    <div class="example">
      <Example :path="path" />
      <ElDivider class="m-0" />
      <div class="op-btns">
        <ElTooltip content="跳转页面" :show-arrow="false" v-if="isDev">
          <ElIcon :size="16" class="op-btn" @click="jumpPath">
            <promotion />
            <!-- <o-icon name="promotion"></o-icon> -->
          </ElIcon>
        </ElTooltip>
        <ElTooltip content="复制代码" :show-arrow="false">
          <ElIcon :size="16" class="op-btn" @click="copyCode">
            <CopyDocument />
          </ElIcon>
        </ElTooltip>
        <ElTooltip content="查看源代码" :show-arrow="false">
          <ElIcon :size="16" class="op-btn" @click="toggleSourceVisible()">
            <View />
          </ElIcon>
        </ElTooltip>
      </div>
      <ElCollapseTransition>
        <SourceCode v-show="sourceVisible" :source="source" />
      </ElCollapseTransition>
      <Transition name="el-fade-in-linear">
        <div v-show="sourceVisible" class="example-float-control" @click="toggleSourceVisible(false)">
          <ElIcon :size="16">
            <CaretTop />
          </ElIcon>
          <span>隐藏源代码</span>
        </div>
      </Transition>
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useClipboard } from '@vueuse/core'
import { getStorage, setStorage } from '@oeos-components/utils'

import Example from './vp-example.vue'
import SourceCode from './vp-source-code.vue'
const isDev = ref(import.meta.env.DEV)

const props = defineProps<{
  rawSource: string // 源码
  source: string
  path: string
  description?: string
}>()

const { copy, isSupported } = useClipboard({
  source: decodeURIComponent(props.rawSource),
  read: false,
})

const { copy: copy2 } = useClipboard({
  source: props.path,
  read: false,
})
const sourceVisible = ref(true)
sourceVisible.value = getStorage('codeVisible') || false
const toggleSourceVisible = (isOpen) => {
  if (isOpen === false) {
    sourceVisible.value = isOpen
  } else {
    sourceVisible.value = !sourceVisible.value
  }
}

const decodedDescription = computed(() => decodeURIComponent(props.description!))

const copyCode = async () => {
  if (!isSupported) {
    ElMessage.error('复制失败')
  }
  try {
    await copy()
    ElMessage.success('已复制')
  } catch (e: any) {
    ElMessage.error(e.message)
  }
}

// 处理绝对路径（简化版，实际项目中可能需要更复杂的逻辑）
const processAbsolutePath = (path: string): string => {
  // 确保路径是绝对路径
  if (!path.startsWith('/')) {
    // 如果是相对路径，这里可以根据项目结构处理
    // 这里简单处理为从项目根目录开始
    return `/${path}`
  }
  return path
}
const jumpPath = async () => {
  // 处理路径 - 转换为绝对路径并编码
  let fullPath = '/Users/liulihao/cyrd/oeos-components/docs/examples/' + props.path + '.vue'
  const vscodeUri = `vscode://file/${fullPath}`
  // 尝试跳转
  window.open(vscodeUri, '_blank')
}
</script>
<style lang="scss" scoped>
.example {
  border: 1px solid var(--border-color);
  border-radius: var(--el-border-radius-base);
  .m-0 {
    margin: 0;
  }
  .op-btns {
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 2.5rem;

    .el-icon {
      &:hover {
        color: var(--text-color);
      }
    }

    .op-btn {
      margin: 0 0.5rem;
      cursor: pointer;
      color: var(--text-color-lighter);
      transition: 0.2s;

      &.github a {
        transition: 0.2s;
        color: var(--text-color-lighter);

        &:hover {
          color: var(--text-color);
        }
      }
    }
  }

  &-float-control {
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid var(--border-color);
    height: 44px;
    box-sizing: border-box;
    background-color: var(--bg-color, #fff);
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    margin-top: -1px;
    color: var(--el-text-color-secondary);
    cursor: pointer;
    position: sticky;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    span {
      font-size: 14px;
      margin-left: 10px;
    }

    &:hover {
      color: var(--el-color-primary);
    }
  }
}
</style>
