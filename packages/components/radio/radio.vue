<template>
  <el-radio-group v-bind="$attrs">
    <slot>
      <component
        v-for="(item, index) in options"
        v-bind="item"
        :is="radioType"
        :key="index"
        :label="item[props.label]"
        :value="item[props.value]"
        :border="border"
        :disabled="item[subAttrs.disabled]"
      >
        <slot :name="item.slot" v-bind="item">
          {{ item[props.label] }}
        </slot>
      </component>
    </slot>
  </el-radio-group>
</template>

<script setup lang="ts">
import { computed, ref, getCurrentInstance } from 'vue'
import type { PropType } from 'vue'
const { proxy } = getCurrentInstance()
import type { RadioItem } from './radio'
const props = defineProps({
  type: {
    type: String as PropType<'radio' | 'button'>,
    validator: (value: string) => ['radio', 'button'].includes(value),
    default: 'radio',
  },
  options: {
    type: Array as PropType<RadioItem[]>,
    default: () => [],
  },
  border: {
    type: Boolean,
    default: false,
  },
  value: {
    type: [String, Number, Boolean],
    default: 'value',
  },
  label: {
    type: [String, Number],
    default: 'label',
  },
  subAttrs: {
    type: Object,
    default: () => {
      return {}
    },
  },
})
const radioType = computed(() => {
  const obj = {
    radio: 'el-radio',
    button: 'el-radio-button',
  }
  return obj[props.type] ?? 'el-radio'
})
</script>
