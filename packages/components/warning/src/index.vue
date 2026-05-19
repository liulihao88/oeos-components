<script setup lang="ts" name="OWarning">
import { getCurrentInstance, computed, useAttrs } from 'vue'
import OIcon from '@/components/icon/src/index.vue'
import { processWidth } from '@oeos-components/utils'

interface Props {
  content: string
  title?: string
  type?: 'info' | 'simple' | 'warning' | 'error'
  width?: string | number
  dangerouslyUseHTMLString?: boolean
  icon?: boolean
  size?: 'small' | 'default'
  dotted?: boolean
  customStyle?: Record<string, any>
  iconAttrs?: Record<string, any>
  left?: boolean | number | string
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  type: 'info',
  width: '100%',
  dangerouslyUseHTMLString: true,
  icon: true,
  size: 'default',
  dotted: false,
  customStyle: () => ({}),
  iconAttrs: () => ({}),
  left: false,
})

const attrs = useAttrs()

const bindProps = computed(() => {
  return props.dangerouslyUseHTMLString ? { innerHTML: props.content } : { textContent: props.content }
})

const mergedStyle = computed(() => {
  let obj: Record<string, any> = {}
  if (props.size === 'small') {
    obj.paddingTop = 0
    obj.paddingBottom = 0
  }
  if (props.dotted) {
    obj['border-style'] = 'dotted'
  }
  if (props.left) {
    if (typeof props.left === 'boolean') {
      obj.marginLeft = '8px'
    } else {
      obj.marginLeft = processWidth(props.left, true)
    }
  }
  let res = { ...obj, ...props.customStyle }
  return res
})

function parseClass(): string {
  let type = props.type
  return `o-warning__${type}`
}
</script>

<template>
  <div
    :class="parseClass()"
    class="o-warning-box"
    :style="{ ...processWidth(props.width), ...mergedStyle }"
    v-bind="attrs"
  >
    <img v-if="type === 'warning' && props.icon" src="../notic.png" class="o-warning-box__img" />
    <o-icon
      v-else-if="type === 'error' && props.icon"
      name="circle-close"
      :color="'var(--el-color-danger)'"
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
    <div class="o-warning-box__container">
      <div v-if="$slots.title || title" class="o-warning-box__title" :class="`o-warning-box__title--${type}`">
        <slot name="title">
          {{ title }}
        </slot>
      </div>
      <slot name="content">
        <span
          class="o-warning-box__content"
          :class="{ 'o-warning-box__content--muted': type === 'icon' }"
          v-bind="bindProps"
        />
      </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.o-warning-box {
  display: flex;
  align-items: baseline;
  padding: 8px 8px;
  border: 1px solid var(--el-color-warning-light-5);
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
    color: var(--el-text-color-primary);
    overflow: auto;
  }
  .o-warning-box__content--muted {
    color: var(--45);
    font-size: 14px;
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
    background-color: var(--el-fill-color-light);
    transition:
      color 0.25s,
      background-color 0.25s;
  }
  :deep(blue) {
    margin: 0;
    padding: 3px 6px;
    border-radius: 4px;
    background-color: var(--el-fill-color-light);
    color: var(--el-color-primary);
    border-radius: 4px;
    padding: 0.15rem 0.5rem;
    font-family: var(--code-font-family);
    font-size: var(--vp-code-font-size);
    line-height: var(--code-line-height);
    transition:
      color 0.25s,
      background-color 0.25s;
  }
}

.o-warning__info {
  border: 1px solid var(--line);
  background: var(--el-color-primary-light-9);
  border-left: 5px solid var(--el-color-primary);
  :deep(code) {
    background-color: var(--el-color-primary-light-8);
    color: var(--el-color-primary-dark-2);
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
  background: var(--el-color-warning-light-9);
  border: 1px solid var(--el-color-warning-light-5);
  border-left: 5px solid var(--el-color-warning);
  :deep(code) {
    background-color: var(--el-color-warning-light-8);
    color: var(--el-color-warning-dark-2);
  }
}
.o-warning__error {
  background: var(--el-color-danger-light-9);
  border: 1px solid var(--el-color-danger-light-5);
  border-left: 5px solid var(--el-color-danger);
  :deep(code) {
    background-color: var(--el-color-danger-light-8);
    color: var(--el-color-danger-dark-2);
  }
}
</style>
