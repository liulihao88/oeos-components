<script setup lang="ts" name="OBasicLayout">
import { ref, getCurrentInstance } from 'vue'
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
})
</script>

<template>
  <div class="basic-layout-box">
    <div class="header" v-if="$slots.header || props.title" :style="headerStyle">
      <slot name="header">
        <o-title :title="props.title" :style="{ ...titleAttrs }"></o-title>
      </slot>
    </div>
    <div class="body" :style="bodyStyle">
      <slot></slot>
    </div>
    <div class="footer" v-if="$slots.footer" :style="footerStyle">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.basic-layout-box {
  background: #fff;
  border: 1px solud var(--line);
  border-radius: 4px;
  .header {
    padding: 16px;
    border-bottom: 1px solid var(--line);
  }
  .body {
    padding: 16px;
  }
  .footer {
    border-top: 1px solid var(--line);
    padding: 16px;
  }
}
</style>
