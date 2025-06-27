<script setup lang="ts" name="OItem">
import { ref, getCurrentInstance, useSlots } from 'vue'
import { processWidth } from '@/utils'
const { proxy } = getCurrentInstance()
const props = defineProps({
  src: {
    type: String,
    default: '',
    // default: 'https://img.yzcdn.cn/vant/logo.png',
  },
  label: {
    type: [String, Number],
    required: true,
  },
  value: {
    type: [String, Number],
    required: true,
  },
  width: {
    type: [String, Number],
    default: '',
  },
  labelStyle: {
    type: Object,
    default: () => ({}),
  },
  valueStyle: {
    type: Object,
    default: () => ({}),
  },
  itemStyle: {
    type: Object,
    default: () => ({}),
  },
})
const slots = useSlots()
const hasImgSlot = !!slots.img // 判断是否使用了 img 插槽
</script>

<template>
  <div class="o-item-box" :style="{ ...processWidth(props.width) }">
    <div class="o-item-box__img">
      <slot name="img">
        <img :src="props.src" alt="" />
      </slot>
    </div>
    <div class="o-item-box__right" :style="props.itemStyle">
      <div class="o-item_box__label" :style="props.labelStyle">
        <slot name="label">
          {{ props.label }}
        </slot>
      </div>
      <div class="o-item_box__value" :style="props.valueStyle">
        <slot name="value">
          {{ props.value }}
        </slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.o-item-box {
  background-color: #fff;
  padding: 16px;
  border-radius: 4px;
  color: var(--85);
  display: flex;
  height: 100px;
  align-items: center;
  font-size: 18px;
  justify-content: v-bind('props.src || hasImgSlot ? "space-between" : "center"');
  .o-item-box__img {
    height: 100%;
    margin-right: 8px;
    :deep(img) {
      height: 100%;
    }
  }
  .o-item-box__right {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    justify-content: space-between;
    .o-item_box__label {
      color: var(--45);
      font-size: 17px;
      font-weight: 600;
    }
    .o-item_box__value {
      font-weight: 700;
    }
  }
}
</style>
