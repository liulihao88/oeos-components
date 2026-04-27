<script setup lang="ts" name="OBasicLayout">
import { ref, computed, watch } from 'vue'
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
  collapseTrigger: {
    type: String,
    default: 'header',
    validator: (value) => ['icon', 'header'].includes(value),
  },
})

const emit = defineEmits(['update:modelValue'])

const boxRef = ref<HTMLDivElement | null>(null)
const headerRef = ref<HTMLDivElement | null>(null)
const isCollapsed = ref(false)

const boxMergedStyle = computed(() => {
  if (!props.square) {
    return {}
  }

  return {
    display: 'inline-flex',
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

const isHeaderTrigger = computed(() => {
  return props.collapsible && props.collapseTrigger === 'header'
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
  if (props.square && boxRef.value) {
    const boxWidth = boxRef.value.offsetWidth
    const boxHeight = (boxRef.value.offsetHeight ?? 0) - (headerRef.value?.offsetHeight ?? 0)
    const max = Math.max(boxWidth, boxHeight)

    return {
      width: `${max}px`,
      height: `${max}px`,
      flex: 'unset',
    }
  }

  return {}
})

const compPadding = computed(() => {
  const { size } = props
  return size === 'default' ? '16px' : size === 'large' ? '24px' : '8px'
})

watch(
  () => props.modelValue,
  (value) => {
    isCollapsed.value = value
  },
  {
    immediate: true,
  },
)

const toggleCollapse = () => {
  if (!props.collapsible) {
    return
  }

  const nextValue = !isCollapsed.value
  isCollapsed.value = nextValue
  emit('update:modelValue', nextValue)
}

const handleHeaderClick = () => {
  if (isHeaderTrigger.value) {
    toggleCollapse()
  }
}

const handleIconClick = (event) => {
  event.stopPropagation()
  toggleCollapse()
}
</script>

<template>
  <div class="o-basic-layout" :style="boxMergedStyle" ref="boxRef">
    <div
      class="o-basic-layout__header"
      v-if="$slots.header || props.title"
      :style="headerMergedStyle"
      ref="headerRef"
      @click="handleHeaderClick"
      :class="{ collapsible: isHeaderTrigger }"
    >
      <div class="o-basic-layout__header-main">
        <slot name="header">
          <o-title :title="props.title" :style="{ ...headerStyle }"></o-title>
        </slot>
      </div>
      <span v-if="collapsible" class="collapse-arrow" :class="{ collapsed: isCollapsed }" @click="handleIconClick">
        <slot name="icon">
          <o-icon name="arrow-down" ></o-icon>
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
  border: 1px solid var(--line);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  &__header {
    padding: v-bind(compPadding);
    border-bottom: v-bind("isCollapsed ? 'none' : '1px solid var(--line)'");
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    cursor: default;

    &.collapsible {
      cursor: pointer;
      user-select: none;
    }

    .o-basic-layout__header-main {
      width: 100%;
      min-width: 0;
      flex: 1 1 auto;
    }

    .collapse-arrow {
      transition: transform 0.3s ease;
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 0 0 auto;
      cursor: pointer;
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
