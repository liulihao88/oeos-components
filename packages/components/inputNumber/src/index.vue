<template>
  <div class="o-input-number" v-bind="props.subAttrs" :style="[widthStyle, attrs.style]" :class="attrs.class">
    <o-comp-title v-if="props.title" :title="props.title" :size="attrs.size" :boxStyle="props.boxStyle" />
    <el-input-number class="o-input-number__inner" v-bind="mergedAttrs">
      <template v-for="(_, name) in $slots" #[name]="slotProps">
        <slot :name="name" v-bind="slotProps || {}" />
      </template>
    </el-input-number>
  </div>
</template>

<script setup lang="ts" name="OInputNumber">
import { computed, useAttrs } from 'vue'
import { processWidth } from '@oeos-components/utils'

defineOptions({
  inheritAttrs: false,
})

const attrs = useAttrs()

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  boxStyle: {
    type: Object,
    default: () => ({}),
  },
  width: {
    type: [String, Number],
    default: '',
  },
  subAttrs: {
    type: Object,
    default: () => {
      return {}
    },
  },
})

const mergedAttrs = computed(() => {
  const baseAttrs = {
    'controls-position': 'right',
  }

  return Object.entries(attrs).reduce((obj, [key, value]) => {
    if (key !== 'class' && key !== 'style') {
      obj[key] = value
    }
    return obj
  }, baseAttrs)
})

const widthStyle = computed(() => {
  if (!props.width) {
    return {}
  }

  return {
    width: processWidth(props.width, true),
  }
})
</script>

<style scoped lang="scss">
.o-input-number {
  display: inline-flex;
  align-items: stretch;
  vertical-align: middle;

  .o-input-number__inner {
    flex: 1 1 auto;
    min-width: 0;
  }

  .o-comp-title + :deep(.el-input-number .el-input__wrapper),
  .o-comp-title + :deep(.el-input-number .el-input-number__decrease) {
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
  }
}
</style>
