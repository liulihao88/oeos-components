<script setup lang="ts">
/** @使用方式
<o-check-all
  v-model="formData.categoryIds"
  :options="tableData.data"
  value="id"
  :showAll="false"
  label="name"
  :checkboxDisabled="judgeDisabled"
></o-check-all>
*/
import { ref, getCurrentInstance, watch } from 'vue'
import { isEmpty } from '../../utils'

const props = defineProps({
  options: {
    type: Object,
    default: () => {},
  },
  modelValue: {
    type: Array,
    defalut: () => [],
  },
  label: {
    type: String,
    default: 'label',
  },
  value: {
    type: String,
    default: 'value',
  },
  showAll: {
    type: Boolean,
    default: true,
  },
  select: {
    type: Array,
    default: () => [],
  },
  checkboxAttrs: {
    type: Object,
    default: () => {},
  },
  checkboxDisabled: {
    type: Function,
    default: () => {},
  },
})
const checkAll = ref(false)
const isIndeterminate = ref(false)
const allCheckList = ref([])

watch(
  () => props.modelValue,
  (newValue) => {
    if (isEmpty(newValue)) {
      isIndeterminate.value = false
      checkAll.value = false
    } else if (newValue.length === props.options.length) {
      isIndeterminate.value = false
      checkAll.value = true
    } else {
      isIndeterminate.value = true
      checkAll.value = false
    }
  },
  { deep: true, immediate: true },
)

const emits = defineEmits(['update:modelValue'])
function checkAllChange() {
  const optionAll = props.options.map((v) => v[props.value])
  if (
    isIndeterminate.value ||
    (checkAll.value === false && isIndeterminate.value === true)
  ) {
    emitValue(optionAll)
  } else if (checkAll.value === true && isIndeterminate.value === false) {
    emitValue(optionAll)
  } else if (checkAll.value === false && isIndeterminate.value === false) {
    emitValue([])
  }
}
function groupChange(item, idx) {
  emitValue(item)
}

function emitValue(item) {
  allCheckList.value = item
  emits('update:modelValue', allCheckList.value)
}
</script>

<template>
  <div class="check-all">
    <el-checkbox
      v-model="checkAll"
      class="check-all__all"
      :indeterminate="isIndeterminate"
      @change="checkAllChange"
      v-if="showAll"
    >
      全选
    </el-checkbox>
    <el-checkbox-group v-model="props.modelValue" @change="groupChange">
      <el-checkbox
        v-bind="props.checkboxAttrs"
        v-for="(item, index) in props.options"
        :key="index"
        :label="item[props.value]"
        :disabled="props.checkboxDisabled(item)"
      >
        {{ item[props.label] }}
      </el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<style scoped lang="scss">
.check-all {
  display: flex;
  .check-all__all {
    padding-right: 24px;
  }
}
</style>
