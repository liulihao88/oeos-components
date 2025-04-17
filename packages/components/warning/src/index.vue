<script setup lang="ts" name="OWarning">
import { getCurrentInstance, computed, useAttrs } from 'vue'
import OIcon from '@/components/icon'
import { processWidth } from '@/utils'
const props = defineProps({
  content: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'warning', // info
  },
  width: {
    type: [String, Number],
    default: '100%',
  },
  dangerouslyUseHTMLString: {
    type: Boolean,
    default: true,
  },
  icon: {
    type: Boolean,
    default: true,
  },
  size: {
    type: String, // small, default
    default: 'default',
  },
  dotted: {
    type: Boolean,
    default: false,
  },
  customStyle: {
    type: Object,
    default: () => ({}),
  },
  iconAttrs: {
    type: Object,
    default: () => ({}),
  },
})

const bindProps = computed(() => {
  return props.dangerouslyUseHTMLString ? { innerHTML: props.content } : { textContent: props.content }
})

const mergedStyle = computed(() => {
  let obj = {}
  if (props.size === 'small') {
    obj.paddingTop = 0
    obj.paddingBottom = 0
  }
  if (props.dotted) {
    obj['border-style'] = 'dotted'
  }
  let res = { ...obj, ...props.customStyle }
  console.log(`82 res`, res)
  return res
})
</script>

<template>
  <div
    :class="type === 'warning' ? 'o-warning__box' : 'o-warning__info'"
    class="o-warning"
    :style="{ ...processWidth(props.width), ...mergedStyle }"
    v-bind="$attrs"
  >
    <img v-if="type === 'warning' && props.icon" src="../notic.png" class="o-warning__img" />
    <o-icon
      v-if="type !== 'warning' && props.icon"
      name="warning"
      :color="'var(--45)'"
      v-bind="iconAttrs"
      class="o-warning__icon"
      size="16"
    />

    <slot name="content">
      <span class="o-warning-box__content" :class="type === 'icon' && 'cl-45 fs-14'" v-bind="bindProps" />
    </slot>
  </div>
</template>

<style lang="scss" scoped>
.o-warning {
  display: flex;
  align-items: baseline;
  padding: 8px 8px;
  border: 1px solid #dfca9e;
  border-radius: 12px;

  .o-warning-box__content {
    font-size: 14px;
    font-weight: 400;
    color: #796551;
    overflow: auto;
  }
}

.o-warning__box {
  background: #fffaf4;
  border: 1px solid #dfca9e;
}

.o-warning__info {
  background: #f5f6f7;
  border: 1px solid var(--line);
}

.o-warning__icon {
  position: relative;
  top: 2px;
  width: 16px;
  height: 16px;
  margin-right: 4px;
}

:deep(code) {
  padding: 2px;
  background-color: #e4e7eb;
  border-color: #c3cad2;
  border-radius: 4px;
}

.o-warning__img {
  position: relative;
  top: 2px;
  width: 16px;
  height: 16px;
  margin-right: 4px;
}
</style>
