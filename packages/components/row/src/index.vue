<template>
  <el-row
    v-bind="$attrs"
    class="o-row"
    :class="{ 'o-row--custom-gutter': useCustomGutter }"
    :style="rowStyle"
    :gutter="nativeGutter"
    :justify="justify"
    :align="align"
  >
    <template v-for="(vnode, i) in getDefaultSlot()" :key="vnode.key ?? i">
      <!-- 如果是 el-col 直接渲染 -->
      <component v-if="isElCol(vnode)" :is="vnode" />
      <!-- 否则包裹一层 el-col -->
      <el-col v-else :span="getSpan(i)" v-bind="colAttrs" class="h-100%">
        <component :is="vnode" />
      </el-col>
    </template>
  </el-row>
</template>

<script setup lang="ts">
defineOptions({
  name: 'ORow',
})
import { computed, PropType, useSlots } from 'vue'
import { processWidth } from '@oeos-components/utils'

const props = defineProps({
  col: {
    type: [Number, Array] as PropType<number | number[]>,
    default: 24,
  },
  gap: {
    type: [Number, String],
    default: '',
  },
  gutter: {
    type: [Number, String],
    default: 0,
  },
  justify: {
    type: String as PropType<'start' | 'end' | 'center' | 'space-around' | 'space-between'>,
    default: 'start',
  },
  align: {
    type: String as PropType<'top' | 'middle' | 'bottom'>,
    default: 'top',
  },
  colAttrs: {
    type: Object,
    default: () => ({}),
  },
})

const slots = useSlots()

const mergedGap = computed(() => {
  if (props.gap !== '' && props.gap !== null && props.gap !== undefined) {
    return props.gap
  }
  return props.gutter
})

const gutterValue = computed(() => processWidth(mergedGap.value, true))

const nativeGutter = computed(() => {
  if (typeof mergedGap.value === 'number') {
    return mergedGap.value
  }

  const gutter = String(mergedGap.value ?? '').trim()
  if (!gutter) {
    return 0
  }

  if (!Number.isNaN(Number(gutter))) {
    return Number(gutter)
  }

  const pxMatch = gutter.match(/^(-?\d+(?:\.\d+)?)px$/)
  if (pxMatch) {
    return Number(pxMatch[1])
  }

  return 0
})

const useCustomGutter = computed(() => {
  const gutter = String(mergedGap.value ?? '').trim()
  if (!gutterValue.value || !gutter) {
    return false
  }

  if (typeof mergedGap.value === 'number') {
    return false
  }

  return Number.isNaN(Number(gutter)) && !/^(-?\d+(?:\.\d+)?)px$/.test(gutter)
})

const rowStyle = computed(() => {
  if (!useCustomGutter.value) {
    return {}
  }

  return {
    '--o-row-gutter': gutterValue.value,
  }
})

function getDefaultSlot() {
  return slots.default ? slots.default() : []
}

// 是否是 el-col 组件（注意：应同时支持SFC和按需注册场景，或直接判断tag名）
function isElCol(vnode: any) {
  // 兼容方式1：tag=== 'el-col'
  // 兼容方式2：type.name === 'ElCol'（取决于注册方式，略有差异）
  // 推荐用tag判断
  return vnode && (vnode.type === 'el-col' || (typeof vnode.type === 'object' && vnode.type.name === 'ElCol'))
}

function getSpan(index: number) {
  // 如果 props.col 是 number，均分 N 份
  if (typeof props.col === 'number') {
    return props.col
  } else if (Array.isArray(props.col)) {
    return props.col[index] ?? 24
  } else {
    return 24
  }
}
</script>

<style scoped lang="scss">
.o-row--custom-gutter {
  margin-right: calc(var(--o-row-gutter) / -2);
  margin-left: calc(var(--o-row-gutter) / -2);
}

.o-row--custom-gutter > :deep(.el-col) {
  box-sizing: border-box;
  padding-right: calc(var(--o-row-gutter) / 2);
  padding-left: calc(var(--o-row-gutter) / 2);
}
</style>
