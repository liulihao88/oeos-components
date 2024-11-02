<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="o-comp-title" v-bind="$attrs">{{ props.title }}</div>
</template>

<style lang="scss" scoped>
.o-comp-title {
  background: #f5f7fa;
  vertical-align: middle;
  position: relative;
  border: 1px solid #dcdfe6;
  border-right: 0 none;
  padding: 0 8px;
  white-space: nowrap;
  border-radius: 2px 0 0 2px;
  align-items: center;
  display: inline-block;
  color: rgba(39, 48, 75, 0.85);
  font-size: 12px;
}
</style>
