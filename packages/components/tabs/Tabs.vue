<template>
  <div class="t_tabs">
    <el-tabs v-bind="$attrs" v-model="tabsValue">
      <el-tab-pane
        v-for="tab in props.options"
        :key="tab[props.value]"
        :name="tab[props.value]"
        :label="tab[props.label]"
        v-bind="subAttrs"
      >
        <slot :name="tab[props.value]"></slot>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script setup lang="ts">
import { useAttrs, ref, computed } from 'vue'
const attrs = useAttrs()
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
.t_tabs {
  .tabs {
    padding: 0;
    margin: 0;
    .el-tabs {
      .el-tabs__header {
        margin: 0;
        padding: 0 10px;
        background-color: #fff;
      }
      .el-tabs__nav-wrap {
        &::after {
          height: 1px;
        }
      }
    }
  }
}
</style>
