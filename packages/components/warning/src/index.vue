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
    default: 'warning', // info, simple
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
  left: {
    type: Boolean,
    default: false,
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
  if (props.left) {
    obj.marginLeft = '8px'
  }
  let res = { ...obj, ...props.customStyle }
  return res
})

function parseClass() {
  let type = props.type
  return `o-warning__${type}`
}
</script>

<template>
  <div
    :class="parseClass()"
    class="o-warning-box"
    :style="{ ...processWidth(props.width), ...mergedStyle }"
    v-bind="$attrs"
  >
    <img v-if="type === 'warning' && props.icon" src="../notic.png" class="o-warning-box__img" />
    <o-icon
      v-if="type !== 'warning' && props.icon"
      name="warning"
      :color="'var(--45)'"
      v-bind="iconAttrs"
      class="o-warning-box__icon"
      size="16"
    />

    <slot name="content">
      <span class="o-warning-box__content" :class="type === 'icon' && 'cl-45 fs-14'" v-bind="bindProps" />
    </slot>
  </div>
</template>

<style lang="scss" scoped>
.o-warning-box {
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
  .o-warning-box__icon {
    position: relative;
    top: 3px;
    width: 16px;
    height: 16px;
    margin-right: 4px;
  }
  .o-warning-box__img {
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
}

.o-warning__warning {
  background: #fffaf4;
  border: 1px solid #dfca9e;
}

.o-warning__info {
  background: #f5f6f7;
  border: 1px solid var(--line);
}
.o-warning__simple {
  // background: #f5f6f7;
  // border: 1px solid var(--line);
  border: unset;
  padding: 0;
}
</style>
