<script setup lang="ts" name="OBasicLayout">
import { ref, getCurrentInstance, computed } from 'vue'
const { proxy } = getCurrentInstance()
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  titleAttrs: {
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
</script>

<template>
  <div class="basic-layout-box">
    <div class="basic-layout-box__header" v-if="$slots.header || props.title" :style="headerMergedStyle">
      <slot name="header">
        <o-title :title="props.title" :style="{ ...titleAttrs }"></o-title>
      </slot>
    </div>
    <div class="basic-layout-box__body" :style="bodyStyle">
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
  border: 1px solud var(--line);
  border-radius: 4px;
  &__header {
    padding: 16px;
    border-bottom: 1px solid var(--line);
  }
  &__body {
    padding: 16px;
  }
  &__footer {
    border-top: 1px solid var(--line);
    padding: 16px;
  }
}
</style>
