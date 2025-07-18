<script setup lang="ts" name="OBasicLayout">
import { ref, getCurrentInstance, computed } from 'vue'
const { proxy } = getCurrentInstance()
const props = defineProps({
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
})

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
      overflow: 'auto',
    }
  }
  return {}
})
</script>

<template>
  <div class="basic-layout-box" :style="boxMergedStyle">
    <div class="basic-layout-box__header" v-if="$slots.header || props.title" :style="headerMergedStyle">
      <slot name="header">
        <o-title :title="props.title" :style="{ ...boxStyle }"></o-title>
      </slot>
    </div>
    <div class="basic-layout-box__body" :style="{ ...bodyStyle, ...scrollStyle }">
      <slot></slot>
    </div>
    <div class="basic-layout-box__footer" v-if="$slots.footer" :style="footerStyle">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.basic-layout-box {
  background: #fff;
  overflow: auto;
  border: 1px solud var(--line);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  &__header {
    padding: 16px;
    border-bottom: 1px solid var(--line);
  }
  &__body {
    padding: 16px;
    flex: 1;
  }
  &__footer {
    border-top: 1px solid var(--line);
    padding: 16px;
  }
}
</style>
