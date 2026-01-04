<template>
  <o-tooltip v-if="content" :content="content" v-bind="tooltipAttrs">
    <el-button v-bind="{ loading: loading, ...$attrs }" class="t-button-tip" @click="handleClick" :loading="loading">
      <slot />
    </el-button>
  </o-tooltip>
  <el-button v-else v-bind="{ loading: loading, ...$attrs }" @click="handleClick">
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

const loading = ref(false)

const handleClick = () => {
  if (props.time === 0) {
    emits('click')
    return
  }

  const now = Date.now()
  if (lastClickTime.value === null || now - lastClickTime.value >= props.time) {
    loading.value = true
    emits('click')
    lastClickTime.value = now

    setTimeout(() => {
      loading.value = false
    }, props.time)
  }
}
</script>
