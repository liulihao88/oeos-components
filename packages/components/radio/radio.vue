<template>
  <el-radio-group v-bind="$attrs">
    <slot>
      <component
        v-for="(item, index) in options"
        v-bind="item"
        :is="radioType"
        :key="index"
        :label="item[optionsProps.value]"
        :border="border"
        :disabled="item[optionsProps.disabled]"
      >
        <slot :name="item.slot" v-bind="item">
          {{ item[optionsProps.label] }}
        </slot>
      </component>
    </slot>
  </el-radio-group>
</template>

<script setup lang="ts" name="ORadio">
import { computed, ref, getCurrentInstance } from 'vue'
import type { PropType } from 'vue'
const { proxy } = getCurrentInstance()
import type { RadioItem } from './radio'
const radioProps = defineProps({
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
  props: {
    type: Object,
    default: () => ({}),
  },
})
const radioType = computed(() => {
  const obj = {
    radio: 'el-radio',
    button: 'el-radio-button',
  }
  return obj[radioProps.type] ?? 'el-radio'
})
const optionsProps = ref({
  ...{
    value: radioProps.value,
    label: radioProps.label,
    disabled: 'disabled',
  },
  ...radioProps.props,
})
</script>
