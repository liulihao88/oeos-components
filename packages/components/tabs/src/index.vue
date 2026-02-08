<template>
  <div class="o-tabs-box">
    <el-tabs v-bind="$attrs" v-model="tabsValue">
      <slot>
        <template v-for="tab in props.options" :key="tab[props.value]">
          <el-tab-pane :name="tab[props.value]" :label="tab[props.label]" v-bind="subAttrs">
            <template #label>
              <slot :name="tab[props.value] + '-label'">
                <span @mouseenter="handleMouseEnter(tab[props.value])">{{ tab[props.label] }}</span>
              </slot>
            </template>
            <slot :name="tab[props.value]"></slot>
          </el-tab-pane>
        </template>
      </slot>
    </el-tabs>
  </div>
</template>
<script setup lang="ts" name="OTabs">
import { computed } from 'vue'
const props: any = defineProps({
  modelValue: {
    type: [String, Number, Boolean],
    required: true,
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
  trigger: {
    type: String,
    default: 'click', // 默认为点击触发，可选值为 'click' 或 'hover'
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

// 鼠标悬停时切换标签页
const handleMouseEnter = (tabVal: string) => {
  if (props.trigger === 'hover') {
    emits('update:modelValue', tabVal)
  }
}
</script>
<style lang="scss" scoped>
.o-tabs-box {
  :deep(.el-tabs__item) {
    font-size: 16px;
  }
  :deep(.el-tabs__nav-wrap:after) {
    height: 1px;
  }
}
</style>
