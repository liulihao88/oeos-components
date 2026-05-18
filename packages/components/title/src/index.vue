<template>
  <div class="o-title" :style="{ ...margin, height: processWidth(height, true) }" v-bind="$attrs">
    <div class="o-title__top" :class="parseClass">
      <div class="f-st-ct" :style="{ marginLeft: props.inner ? '8px' : 0 }">
        <span :class="($slots.icon || props.type === 'icon') && 'o-title__slot-icon-wrapper'">
          <slot name="icon" class="icon_slot">
            <svg
              v-if="props.type === 'icon'"
              class="o-title__default-icon"
              viewBox="0 0 1024 1024"
              aria-hidden="true"
              focusable="false"
            >
              <path
                fill="currentColor"
                d="M800.512 474.944h-377.6a24.256 24.256 0 0 0-24.32 24.32c0 13.504 10.816 24.32 24.32 24.32h377.6c13.504 0 24.32-10.816 24.32-24.32a24.576 24.576 0 0 0-24.32-24.32z m-377.6 203.776a24.256 24.256 0 0 0-24.32 24.32c0 13.504 10.816 24.32 24.32 24.32h377.6c13.504 0 24.32-10.816 24.32-24.32a24.576 24.576 0 0 0-24.32-24.32h-377.6z"
              />
              <path
                fill="currentColor"
                d="M928.064 209.6h-252.736l-5.376-15.68c-37.824-104.832-110.272-129.728-164.288-132.416h-409.728a62.592 62.592 0 0 0-62.72 62.144v776.704c0 34.048 28.096 62.144 62.72 62.144h832.128a62.72 62.72 0 0 0 62.72-62.144v-628.608a62.272 62.272 0 0 0-62.72-62.144z m-848.384-56.256c0-48.128 17.856-41.6 90.816-41.6h261.056c110.784 0 139.456 23.808 160.512 61.056l15.68 36.736h-528.064v-56.192z m773.248 759.424H170.496c-74.56 0-86.464-5.952-86.464-85.952v-566.464h784.576c78.912 0 70.784 30.784 70.784 85.952v492.928c0.064 72.448-25.344 73.536-86.464 73.536z"
              />
              <path
                fill="currentColor"
                d="M196.992 536.576h78.912v-78.912h-78.912v78.912z m0 205.952h78.912v-78.912h-78.912v78.912z"
              />
            </svg>
          </slot>
        </span>
        <span class="title-text">
          <slot name="title">
            {{ title }}
          </slot>
        </span>
        <slot></slot>
      </div>
      <div :class="$slots.right && 'o-title__slot-right-wrapper'">
        <slot name="right"></slot>
      </div>
    </div>
    <div class="o-title__subTitle" v-if="subTitle" v-bind="subAttrs">
      {{ subTitle }}
    </div>
  </div>
</template>

<script setup lang="ts" name="OTitle">
/**
<o-title title="使用hooks1" t="100"></o-title>
<o-title title="我说呢" sub-title="test/t2.vue"></o-title>
*
*/
import { processWidth } from '@/utils/src/index.ts'
import { computed } from 'vue'
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  size: {
    type: String,
    default: '', // 默认margin 16px 0
  },
  // 本地开发. 用来对文件命名. 可以快速定位到文件的名字
  subTitle: {
    type: String,
    default: '',
  },
  subAttrs: {
    type: Object,
    default: () => ({}),
  },
  inner: {
    type: Boolean,
    default: false,
  },
  t: {
    type: [String, Number],
    default: '',
  },
  b: {
    type: [String, Number],
    default: '',
  },
  l: {
    type: [String, Number],
    default: '',
  },
  tb: {
    type: [String, Number],
  },
  height: {
    type: [String, Number],
    default: '',
  },
  type: {
    type: String, // simple, icon, form
    default: 'icon',
  },
})

const margin = computed(() => {
  const { t, b, l, tb } = props
  if (!t && !b && !l && !tb) {
    return {}
  } else {
    let obj: any = {}
    if (tb) {
      obj.marginTop = processWidth(tb, true)
      obj.marginBottom = processWidth(tb, true)
    }
    if (t) {
      obj.marginTop = processWidth(t, true)
    }
    if (b) {
      obj.marginBottom = processWidth(b, true)
    }
    if (l) {
      obj.marginLeft = processWidth(l, true)
    }
    return obj
  }
})

const parseClass = computed(() => {
  let type = props.type
  if (type === 'simple' || type === 'icon') {
    return 'o-title__top-simple-left'
  }
  if (type === 'form') {
    return 'o-title__form-left'
  }
  return 'o-title__top-left'
})

</script>

<style scoped lang="scss">
@import '@/styles/utilities.scss';

.o-title {
  position: relative;
  box-sizing: border-box;
  .o-title__top {
    display: flex;
    align-items: center;
    color: var(--el-text-color-primary);
    font-size: 16px;
    justify-content: space-between;
    .o-title__slot-icon-wrapper {
      margin-right: 8px;
      width: 14px;
      height: 14px;
      display: flex;
      align-items: center;
      color: currentColor;
    }
    .o-title__default-icon {
      width: 14px;
      height: 14px;
      display: block;
    }
    .o-title__slot-right-wrapper {
      text-align: right;
      display: flex;
    }
  }

  .o-title__form-left {
    padding: 0 0 8px;
    margin: 0 0 16px;
    font-weight: 800;
    width: 100%;
    border-bottom: 1px dashed var(--el-border-color-lighter);
  }

  .o-title__top-simple-left {
    width: 100%;
    align-items: center;
    position: relative;
    box-sizing: border-box;
    display: flex;
    .title-text {
      letter-spacing: 0;
      font-weight: 600;
      margin-right: 8px;
      white-space: nowrap;
    }
  }
  .o-title__top-left {
    width: 100%;
    align-items: center;
    position: relative;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    &::before {
      position: absolute;
      content: '';
      width: 3px;
      left: -8px;
      top: 5px;
      height: calc(100% - 8px);
      bottom: 0;
      letter-spacing: 0;
      background-color: var(--lc, var(--blue)); // 左侧的竖条颜色
    }
    .title-text {
      letter-spacing: 0;
      font-weight: 600;
      margin-right: 8px;
      white-space: nowrap;
    }
  }
  .o-title__subTitle {
    font-size: 14px;
    font-weight: 400;
    color: var(--el-text-color-secondary);
    letter-spacing: 0;
  }
}
</style>
