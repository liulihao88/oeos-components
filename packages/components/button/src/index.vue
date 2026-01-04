<template>
  <o-tooltip v-if="content" :content="content" v-bind="tooltipAttrs">
    <button-content v-bind="$attrs">
      <slot></slot>
    </button-content>
  </o-tooltip>
  <button-content v-else v-bind="$attrs">
    <slot></slot>
  </button-content>
</template>

<script setup lang="tsx">
import { ref, defineComponent } from 'vue'

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

// 创建按钮内容组件
// const buttonContent = defineComponent({
//   name: 'ButtonContent',
//   setup(props) {
//     const slots = useSlots()
//     const attrs = useAttrs()
//     // 从props中获取loading属性
//     const { loading, ...otherProps } = props as { loading: boolean } & Record<string, any>
//     console.log(`54 loading`, loading)
//     console.log(`54 loading.value`, loading)
//     console.log(`26 attrs`, attrs)
//     return () => (
//       <el-button v-bind={{ ...attrs, loading: loading }} onClick={handleClick}>
//         {slots.default?.()}
//       </el-button>
//     )
//   },
// })

// ButtonContent 作为子组件，直接共享外层的 loading 与 handleClick（通过闭包）
// 它会把父组件传来的所有 attrs（type/class/style/原生事件等）和 slot 透传给 el-button
const ButtonContent = defineComponent({
  name: 'ButtonContent',
  setup(_, { attrs, slots }) {
    console.log(`18 attrs`, attrs)
    return () => (
      <el-button loading={loading.value} {...attrs} onClick={handleClick}>
        {slots.default?.()}
      </el-button>
    )
  },
})
</script>
