<script setup lang="ts" name="OItem">
import { ref, getCurrentInstance, useSlots, computed } from 'vue'
import { processWidth, formatThousands, formatToFixed, formatBytes } from '@/utils/src/index.ts'
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
  height: {
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
  imgStyle: {
    type: Object,
    default: () => ({}),
  },
  boxStyle: {
    type: Object,
    default: () => ({}),
  },
  type: {
    type: String, // 'value',
    default: '', // 不传时为 ''
    validator: (value) => ['', 'value'].includes(value),
  },
  attrs: {
    type: Object,
    default: () => {},
  },
})
const slots = useSlots()
const hasImgSlot = !!slots.img // 判断是否使用了 img 插槽

const parseValue = computed(() => {
  let { value, attrs } = props
  let finalValue = value
  if (attrs?.formatBytes) {
    finalValue = formatBytes(finalValue)
  }
  if (attrs?.toFixed) {
    finalValue = formatToFixed(finalValue, attrs.toFixed === true ? 2 : attrs.toFixed)
  }
  if (attrs?.formatThousands) {
    finalValue = formatThousands(finalValue)
  }

  return finalValue
})
</script>

<template>
  <div
    class="o-item-box"
    :style="{ ...{ height: processWidth(props.height, true) }, ...processWidth(props.width), ...boxStyle }"
    v-if="props.type === ''"
  >
    <div class="o-item-box__img" :style="props.imgStyle">
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
          {{ parseValue }}
        </slot>
      </div>
    </div>
  </div>
  <div
    class="o-item-box__value"
    :style="{ ...{ height: processWidth(props.height, true) }, ...processWidth(props.width), ...boxStyle }"
    v-else-if="props.type === 'value'"
  >
    <div class="o_item_box_value_item" :class="{ o_item_box_value_item_center: props.attrs?.center === true }">
      <div class="o-item_box__value__value" :style="props.valueStyle">
        <slot name="value">
          {{ parseValue }}
        </slot>
      </div>
      <div class="o-item_box__label__value" :style="props.labelStyle">
        <slot name="label">
          {{ props.label }}
        </slot>
      </div>
    </div>
    <div class="o-item-box__img__value" :style="props.imgStyle">
      <slot name="img">
        <img :src="props.src" alt="" />
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
  justify-content: v-bind('props.src || hasImgSlot ? "space-between" : "center"');
  // justify-content: center;
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

.o-item-box__value {
  background-color: #fff;
  padding: 16px;
  border-radius: 4px;
  color: var(--85);
  display: flex;
  flex-direction: column;
  height: 100px;
  font-size: 18px;
  justify-content: v-bind('props.src || hasImgSlot ? "space-between" : "center"');
  // justify-content: center;
  .o-item-box__img__value {
    height: 100%;
    margin-right: 8px;
    :deep(img) {
      height: 100%;
    }
  }
  .o_item_box_value_item {
    .o-item_box__label__value {
      color: var(--45);
      font-size: 14px;
      font-weight: 500;
    }
    .o-item_box__value__value {
      font-weight: 700;
      font-size: 24px;
      margin-bottom: 8px;
    }
  }
  .o_item_box_value_item_center {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
