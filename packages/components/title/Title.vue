<template>
  <div class="o-title" :style="{ ...margin }" v-bind="$attrs">
    <div ref="titleRef" class="o-left-title">
      <div>
        <span class="title-text">{{ title }}</span>
      </div>
      <slot></slot>
    </div>
    <slot name="right"></slot>
  </div>
</template>

<script setup lang="ts">
/**
<g-title title="使用hooks1" t="100"></g-title>
<g-title title="我说呢" sub-title="test/t2.vue"></g-title>
* 
*/
import { ref, computed, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
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
})

const margin = computed(() => {
  const { t, b, l } = props
  if (!t && !b && !l) {
    return {}
  } else {
    let obj = {}
    if (t) {
      obj.marginTop = mHandleUnit(t)
    }
    if (b) {
      obj.marginBottom = mHandleUnit(b)
    }
    if (l) {
      obj.marginLeft = mHandleUnit(l)
    }
    return obj
  }
})

function mHandleUnit(inner) {
  if (
    typeof inner === 'string' &&
    (inner.indexOf('px') !== -1 || inner.indexOf('%') !== -1)
  ) {
    return inner
  }
  return inner + 'px'
}

// copy成功的提示文案
function mClipboardSuccess(val) {}
</script>

<style scoped lang="scss">
.o-title {
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  height: 30px;
  justify-content: space-between;
  .o-left-title {
    width: 100%;
    padding-left: 8px;
    align-items: center;
    position: relative;
    font-weight: 500;
    box-sizing: border-box;
    display: flex;
    &::before {
      position: absolute;
      left: 0;
      content: '';
      width: 2px;
      height: 12px;
      background-color: blue;
      background-color: var(--lc, var(--blue)); // 左侧的竖条颜色
    }
    .title-text {
      letter-spacing: 0;
      font-weight: 500;
    }
  }
}
</style>
