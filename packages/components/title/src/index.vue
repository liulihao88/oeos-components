<template>
  <div class="o-title" :style="{ ...margin }" v-bind="$attrs">
    <div class="o-title__top" :class="parseClass">
      <div class="f-st-ct" :style="{ marginLeft: props.inner ? '8px' : 0 }">
        <span :class="($slots.icon || props.type === 'icon') && 'o-title__slot-icon-wrapper'">
          <slot name="icon" class="icon_slot">
            <img src="./title.svg" v-if="props.type === 'icon'" width="14" class="d-ib" />
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
import { processWidth } from '@/utils'
import { ref, computed } from 'vue'
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
    defalut: false,
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
// copy成功的提示文案
</script>

<style scoped lang="scss">
.o-title {
  position: relative;
  box-sizing: border-box;
  .o-title__top {
    display: flex;
    align-items: center;
    color: #323233;
    font-size: 16px;
    justify-content: space-between;
    .o-title__slot-icon-wrapper {
      margin-right: 4px;
      width: 14px;
      height: 14px;
      display: flex;
      align-items: center;
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
    border-bottom: 1px dashed #eaeaea;
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
      margin-right: 4px;
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
      background-color: #5d7af7;
      background-color: var(--lc, var(--blue)); // 左侧的竖条颜色
    }
    .title-text {
      letter-spacing: 0;
      font-weight: 600;
      margin-right: 4px;
      white-space: nowrap;
    }
  }
  .o-title__subTitle {
    font-size: 14px;
    font-weight: 400;
    color: #646566;
    letter-spacing: 0;
  }
}
</style>
