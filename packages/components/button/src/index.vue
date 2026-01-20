<template>
  <o-tooltip v-if="content" :content="content" v-bind="tooltipAttrs">
    <el-button v-bind="{ loading: loading, ...$attrs }" @click="handleClick" class="o-button-content">
      <template v-for="(arg, name, index) in $slots" v-slot:[name]>
        <slot :name="name" v-bind="arg" :index="index" />
      </template>
    </el-button>
  </o-tooltip>
  <el-button v-bind="{ loading: loading, ...$attrs }" @click="handleClick" v-else>
    <template v-for="(arg, name, index) in $slots" v-slot:[name]>
      <slot :name="name" v-bind="arg" :index="index" />
    </template>
  </el-button>
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

<style lang="scss" scoped>

</style>
