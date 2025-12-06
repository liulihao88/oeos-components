<template>
  <o-tooltip v-if="content" :content="content" v-bind="tooltipAttrs">
    <el-button v-bind="$attrs" class="t-button-tip" @click="handleClick">
      <slot />
    </el-button>
  </o-tooltip>
  <el-button v-else v-bind="$attrs" @click="handleClick">
    <slot />
  </el-button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  name: 'OButton',
})

interface OButtonSelfProps {
  time?: number
  content?: string
  tooltipAttrs?: Record<string, any>
}

const props = withDefaults(defineProps<OButtonSelfProps>(), {
  time: 0,
  content: '',
  tooltipAttrs: () => ({}),
})

// 抛出事件
const emits = defineEmits(['click'])

const lastClickTime = ref<number | null>(null)

const handleClick = () => {
  if (props.time === 0) {
    emits('click')
    return
  }

  const now = Date.now()
  if (lastClickTime.value === null) {
    // 第一次点击
    emits('click')
    lastClickTime.value = now
  } else {
    if (now - lastClickTime.value >= props.time) {
      emits('click')
      lastClickTime.value = now
    }
  }
}
</script>
