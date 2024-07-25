<template>
  <div class="o-title" :style="{ ...margin }" v-bind="$attrs">
    <div class="o-title__top">
      <div class="o-title__top-left">
        <span class="title-text">{{ title }}</span>
        <slot></slot>
      </div>
      <slot name="right"></slot>
    </div>
    <div class="o-title__subTitle" v-if="subTitle" v-bind="subAttrs">
      {{ subTitle }}
    </div>
  </div>
</template>

<script setup lang="ts">
/**
<o-title title="使用hooks1" t="100"></o-title>
<o-title title="我说呢" sub-title="test/t2.vue"></o-title>
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
  subAttrs: {
    type: Object,
    default: () => ({}),
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
      obj.marginTop = proxy.processWidth(t, true)
    }
    if (b) {
      obj.marginBottom = proxy.processWidth(b, true)
    }
    if (l) {
      obj.marginLeft = proxy.processWidth(l, true)
    }
    return obj
  }
})
// copy成功的提示文案
</script>

<style scoped lang="scss">
.o-title {
  position: relative;
  box-sizing: border-box;
  .o-title__top {
    height: 30px;
    display: flex;
    align-items: center;
    color: #323233;
    font-size: 16px;
    justify-content: space-between;
    .o-title__top-left {
      width: 100%;
      align-items: center;
      position: relative;
      font-weight: 600;
      box-sizing: border-box;
      display: flex;
      &::before {
        position: absolute;
        left: -8px;
        content: '';
        width: 3px;
        height: 12px;
        letter-spacing: 0;
        top: 7px;
        background-color: #5d7af7;
        background-color: var(--lc, var(--blue)); // 左侧的竖条颜色
      }
      .title-text {
        letter-spacing: 0;
        font-weight: 500;
      }
    }
  }
  .o-title__subTitle {
    font-size: 14px;
    font-weight: 400;
    font-size: 14px;
    color: #646566;
    letter-spacing: 0;
  }
}
</style>
