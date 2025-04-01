<template>
  <div class="tabs-box">
    <el-tabs v-bind="$attrs" v-model="tabsValue">
      <template v-for="tab in props.options" :key="tab[props.value]">
        <el-tab-pane :name="tab[props.value]" :label="tab[props.label]" v-bind="subAttrs">
          <template #label>
            <slot :name="tab[props.value] + '-label'">
              {{ tab[props.label] }}
            </slot>
          </template>
          <slot :name="tab[props.value]"></slot>
        </el-tab-pane>
      </template>
    </el-tabs>
  </div>
</template>
<script setup lang="ts" name="OTabs">
import { computed } from 'vue'
const props: any = defineProps({
  modelValue: {
    type: String,
  },
  options: {
    type: Array,
    default: () => {
      return []
    },
  },
  label: {
    type: String,
    default: 'label',
  },
  value: {
    type: String,
    default: 'value',
  },
  subAttrs: {
    type: Object,
    default: () => {},
  },
})
const emits = defineEmits(['update:modelValue'])

const tabsValue = computed({
  get() {
    return props.modelValue || props.options[0]?.[props.value]
  },
  set(val) {
    emits('update:modelValue', val)
  },
})
</script>
<style lang="scss" scoped>
.tabs-box {
  :deep(.el-tabs__item) {
    font-size: 16px;
  }
}
</style>
