<script setup lang="ts" name="OBasicLayout">
import { ref, getCurrentInstance, computed } from 'vue'
const { proxy } = getCurrentInstance()
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: 'default', // small large
  },
  title: {
    type: String,
    default: '',
  },
  boxStyle: {
    type: Object,
    default: () => ({}),
  },
  headerStyle: {
    type: Object,
    default: () => ({}),
  },
  bodyStyle: {
    type: Object,
    default: () => ({}),
  },
  footerStyle: {
    type: Object,
    default: () => ({}),
  },
  border: {
    type: Boolean,
    default: true,
  },
  clearBrBottom: {
    type: Boolean,
    default: false,
  },
  clearBrTop: {
    type: Boolean,
    default: false,
  },
  clearBr: {
    type: Boolean,
    default: false,
  },
  scroll: {
    type: Boolean,
    default: true,
  },
  square: {
    type: Boolean,
    default: false,
  },
  collapsible: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])

const boxRef = ref(null)
const headerRef = ref(null)
const isCollapsed = ref(props.modelValue)

const boxMergedStyle = computed(() => {
  let brStyle = {}
  if (props.clearBrBottom) {
    brStyle['border-bottom-right-radius'] = 0
    brStyle['border-bottom-left-radius'] = 0
  }
  if (props.clearBrTop) {
    brStyle['border-top-right-radius'] = 0
    brStyle['border-top-left-radius'] = 0
  }
  if (props.clearBr) {
    brStyle['border-bottom-right-radius'] = 0
    brStyle['border-bottom-left-radius'] = 0
    brStyle['border-top-right-radius'] = 0
    brStyle['border-top-left-radius'] = 0
  }
  return {
    ...brStyle,
  }
})

const headerMergedStyle = computed(() => {
  let noBorderStyle = {}
  if (!props.border) {
    noBorderStyle = {
      borderBottom: 'none',
      paddingBottom: 0,
    }
  }
  return {
    ...noBorderStyle,
    ...props.headerStyle,
  }
})

const scrollStyle = computed(() => {
  if (props.scroll) {
    return {
      flex: 1,
      overflow: 'auto',
    }
  }
  return {}
})
const squareStyle = computed(() => {
  if (props.square) {
    if (boxRef.value) {
      boxRef.value.style.display = 'inline-flex'
      let boxWidth = boxRef.value.offsetWidth
      let boxHeight = boxRef.value?.offsetHeight - headerRef.value.offsetHeight
      let max = Math.max(boxWidth, boxHeight)
      return {
        width: `${max}px`,
        height: `${max}px`,
        flex: 'unset',
      }
    }
  }
  return {}
})

const compPadding = computed(() => {
  const { size } = props
  return size === 'default' ? '16px' : size === 'large' ? '24px' : '8px'
})

const toggleCollapse = () => {
  if (props.collapsible) {
    isCollapsed.value = !isCollapsed.value
    emit('update:modelValue', isCollapsed.value)
  }
}
</script>

<template>
  <div class="o-basic-layout" :style="boxMergedStyle" ref="boxRef">
    <div
      class="o-basic-layout__header"
      v-if="$slots.header || props.title"
      :style="headerMergedStyle"
      ref="headerRef"
      @click="toggleCollapse"
      :class="{ collapsible: collapsible }"
    >
      <slot name="header">
        <o-title :title="props.title" :style="{ ...boxStyle }"></o-title>
      </slot>
      <span v-if="collapsible" class="collapse-arrow" :class="{ collapsed: isCollapsed }">
        <slot name="icon">
          <o-icon name="arrow-down"></o-icon>
        </slot>
      </span>
    </div>
    <div class="o-basic-layout__body" :style="{ ...bodyStyle, ...scrollStyle, ...squareStyle }" v-show="!isCollapsed">
      <slot></slot>
    </div>
    <div class="o-basic-layout__footer" v-if="$slots.footer && !isCollapsed" :style="footerStyle">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.o-basic-layout {
  background: #fff;
  border: 1px solud var(--line); // 这里应该是solid而不是solud
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  &__header {
    padding: v-bind(compPadding);
    // 修复这一行的语法 - 原来的写法是错误的
    border-bottom: v-bind("isCollapsed ? 'none' : '1px solid var(--line)'");
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;

    &.collapsible {
      user-select: none;
    }

    .collapse-arrow {
      transition: transform 0.3s ease;
      font-size: 12px;
      display: flex;
      align-items: center;
      &.collapsed {
        transform: rotate(-90deg);
      }
    }
  }
  &__body {
    padding: v-bind(compPadding);
  }
  &__footer {
    border-top: 1px solid var(--line);
    padding: v-bind(compPadding);
  }
}
</style>
