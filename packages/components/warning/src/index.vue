<script setup lang="ts" name="OWarning">
import { getCurrentInstance, computed, useAttrs } from 'vue'
import OIcon from '@/components/icon'
import { processWidth } from '@/utils/src'
const props = defineProps({
  content: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'info', // info, simple, warning, error
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
      v-else-if="type === 'error' && props.icon"
      name="circle-close"
      :color="'#f56c6c'"
      v-bind="iconAttrs"
      class="o-warning-box__icon"
      size="16"
    />
    <o-icon
      v-else-if="type !== 'warning' && props.icon"
      name="warning"
      :color="'var(--45)'"
      v-bind="iconAttrs"
      class="o-warning-box__icon"
      size="16"
    />
    <!-- <o-icon
      v-if="type !== 'warning' && props.icon"
      name="warning"
      :color="'var(--45)'"
      v-bind="iconAttrs"
      class="o-warning-box__icon"
      size="16"
    /> -->

    <div class="o-warning-box__container">
      <div v-if="title" class="o-warning-box__title" :class="`o-warning-box__title--${type}`">
        {{ title }}
      </div>
      <slot name="content">
        <span class="o-warning-box__content" :class="type === 'icon' && 'cl-45 fs-14'" v-bind="bindProps" />
      </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.o-warning-box {
  display: flex;
  align-items: baseline;
  padding: 8px 8px;
  border: 1px solid #dfca9e;
  border-radius: 4px;

  .o-warning-box__title {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 4px;

    &.o-warning-box__title--info {
      color: var(--el-color-primary);
    }

    &.o-warning-box__title--warning {
      color: var(--el-color-warning);
    }

    &.o-warning-box__title--error {
      color: var(--el-color-danger);
    }

    &.o-warning-box__title--simple {
      color: var(--45);
    }
  }

  .o-warning-box__content {
    font-size: 14px;
    font-weight: 400;
    color: var(--85);
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
    padding: 3px 6px;
    border-radius: 4px;
    background-color: rgba(142, 150, 170, 0.14);
    transition:
      color 0.25s,
      background-color 0.25s;
  }
  :deep(blue) {
    color: var(--blue);
  }
}

.o-warning__info {
  border: 1px solid var(--line);
  background: rgba(64, 158, 255, 0.1);
  border-left: 5px solid var(--el-color-primary);
  :deep(code) {
    background-color: rgba(100, 108, 255, 0.14);
    color: #3451b2;
  }
}
.o-warning__simple {
  .o-warning-box__content {
    color: var(--45);
  }
  border: unset;
  padding: 0;
}
.o-warning__warning {
  background: #fffaf4;
  border: 1px solid #dfca9e;
  border-left: 5px solid var(--el-color-warning);
  :deep(code) {
    background-color: rgba(234, 179, 8, 0.14);
    color: #915930;
  }
}
.o-warning__error {
  background: #fef0f0; // 柔和的红色背景
  border: 1px solid #fbc4c4; // 浅红色边框
  border-left: 5px solid #f56c6c; // 左侧强调色使用 Element UI 的错误色
  :deep(code) {
    background-color: rgba(245, 108, 108, 0.1); // 错误色的淡色背景
    color: #c45656; // 深一些的错误色文本
  }
}
</style>
