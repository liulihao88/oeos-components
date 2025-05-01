<script setup lang="ts" name="OItem">
import { ref, getCurrentInstance } from 'vue'
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
})
</script>

<template>
  <div class="o-item-box" :style="{ ...processWidth(props.width) }">
    <div class="o-item-box__img">
      <slot name="img">
        <img :src="props.src" alt="" />
      </slot>
    </div>
    <div class="o-item-box__right">
      <slot name="label">
        <div class="o-item_box__label">{{ props.label }}</div>
      </slot>
      <slot name="value">
        <div class="o-item_box__value">{{ props.value }}</div>
      </slot>
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
  justify-content: v-bind('props.src ? "space-between" : "center"');
  .o-item-box__img {
    height: 100%;
    margin-right: 8px;
    img {
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
    }
    .o-item_box__value {
      font-weight: 700;
    }
  }
}
</style>
