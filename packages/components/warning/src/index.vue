<script setup lang="ts" name="OWarning">
import { getCurrentInstance, computed, useAttrs } from 'vue'
import OIcon from '@/components/icon'
import { processWidth } from '@/utils'
const props = defineProps({
  content: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: '', // icon, info
  },
  width: {
    type: [String, Number],
    default: '100%',
  },
  dangerouslyUseHTMLString: {
    type: Boolean,
    default: true,
  },
})

const bindProps = computed(() => {
  return props.dangerouslyUseHTMLString ? { innerHTML: props.content } : { textContent: props.content }
})
</script>

<template>
  <div
    :class="type === 'icon' ? 'o-warning__icon' : type === 'info' ? 'o-warning__info' : 'o-warning__box'"
    class="o-warning"
    :style="{ ...processWidth(props.width) }"
    v-bind="$attrs"
  >
    <img v-if="type === ''" src="../notic.png" class="o-warning__img" />
    <o-icon v-else name="warning" :color="'var(--45)'" v-bind="$attrs" class="icon" size="16" />
    <slot name="content">
      <span class="o-warning-box__content" :class="type === 'icon' && 'cl-45 fs-14'" v-bind="bindProps" />
    </slot>
  </div>
</template>

<style lang="scss" scoped>
.o-warning {
  display: flex;
  align-items: baseline;
  padding: 8px 8px;
  border: 1px solid #dfca9e;
  border-radius: 12px;

  .o-warning-box__content {
    margin-left: 4px;
    font-size: 14px;
    font-weight: 400;
    color: #796551;
  }
}

.o-warning__box {
  background: #fffaf4;
  border: 1px solid #dfca9e;
}

.o-warning__info {
  background: #f5f6f7;
  border: 1px solid var(--line);
}

.o-warning__icon {
  border: none;
}

:deep(code) {
  padding: 2px;
  background-color: #e4e7eb;
  border-color: #c3cad2;
  border-radius: 4px;
}

.o-warning__img {
  position: relative;
  top: 2px;
  width: 16px;
  height: 16px;
  margin-right: 4px;
}
</style>
