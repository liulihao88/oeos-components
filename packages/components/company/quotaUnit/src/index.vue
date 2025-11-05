<!-- src/components/QuotaFormItem.vue -->
<template>
  <el-form-item label="配额" prop="quota" :rules="rules" ref="formItemRef" required v-bind="$attrs">
    <div class="f-st-ct">
      <div class="f-st-ct w-100% mr2">
        <el-input-number v-model="internalValue" :min="1" style="min-width: 150px" class="mr" />
        <o-radio v-model="unitValue" :options="QUOTA_UNIT" showType="button" />
      </div>
    </div>
  </el-form-item>
</template>

<script lang="ts">
const QUOTA_UNIT = [
  { label: 'GB', value: 'GB' },
  { label: 'TB', value: 'TB' },
  { label: 'PB', value: 'PB' },
]
</script>
<script setup lang="ts">
import { ref, watch, computed } from 'vue'

defineOptions({
  name: 'OQuotaUnit',
})

// ================== 1. PROPS & EMITS ==================
const props = defineProps({
  // 接收父组件传递的 modelValue，实现 v-model
  modelValue: {
    type: [Number, null],
  },
  unit: {
    type: [Number, null],
  },
  validator: {
    type: [Function, null],
  },
})

const emit = defineEmits(['update:modelValue', 'update:unit'])

// ================== 2. REACTIVE STATE ==================
// 内部响应式值，用于 el-input-number
const internalValue = ref(props.modelValue ?? 1)
const unitValue = ref(props.unit ?? 'GB')

// 通过 `useTemplateRef` 获取 el-form-item 的 DOM 引用
const formItemRef = ref(null)

// ================== 3. RULES & VALIDATION LOGIC ==================
// 校验规则对象
// 使用 computed 可以确保规则是基于最新状态计算的
const rules = computed(() => {
  let base = {
    validator: (rule, value, callback) => {
      // value 是当前 el-form-item 绑定的值
      // 我们直接使用 internalValue 来进行校验
      if (!/^[1-9]+\d*$/.test(internalValue.value)) {
        callback(new Error('请输入正整数'))
      } else {
        callback()
      }
    },
    trigger: [], // 在 'blur' 或 'change' 时触发校验
  }
  if (props.validator) {
    return [
      base,
      {
        validator: props.validator,
        trigger: [],
      },
    ]
  } else {
    return [base]
  }
})

// ================== 4. WATCHERS & LIFECYCLE ==================
// 监听 modelValue 的变化，从父级同步到子组件内部
watch(
  () => props.modelValue,
  (newVal) => {
    internalValue.value = newVal
  },
)

// 监听内部值的变化，同步回父组件，实现 v-model
watch(
  () => internalValue.value,
  (newVal) => {
    emit('update:modelValue', newVal)
  },
  {
    immediate: true,
  },
)

watch(
  () => props.unit,
  (newVal) => {
    unitValue.value = newVal
  },
)

// 监听内部值的变化，同步回父组件，实现 v-model
watch(
  () => unitValue.value,
  (newVal) => {
    console.log(`86 newVal`, newVal)
    emit('update:unit', newVal)
  },
  {
    immediate: true,
  },
)

// ================== 5. EXPOSE METHODS TO PARENT ==================
// 使用 `defineExpose` 将组件内的属性和方法暴露给父组件
defineExpose({
  /**
   * 暴露一个方法，供父组件在需要时（如提交表单前）手动调用校验
   * @returns {Promise} 返回一个 Promise，校验通过 resolve，失败 reject
   */
  async validate() {
    // el-form-item 实例上有一个 validate 方法
    // 它接收一个回调函数，回调函数的第一个参数是校验是否通过
    if (!formItemRef.value) return Promise.reject('form item ref not found')

    return new Promise((resolve, reject) => {
      formItemRef.value.validate((valid) => {
        if (valid) {
          resolve(valid) // 校验通过
        } else {
          reject(new Error('配额校验失败'))
        }
      })
    })
  },
})
</script>

<!-- <style scoped> 样式保持不变 </style> -->
