<template>
  <div>
    <o-select
      :options="address"
      v-model="province"
      placeholder="请选择省份"
      label="name"
      v-bind="$attrs"
      value="code"
    ></o-select>

    <o-select
      :options="cityList"
      :disabled="!province"
      v-model="city"
      placeholder="请选择城市"
      label="name"
      v-bind="$attrs"
      value="code"
    ></o-select>

    <o-select
      v-model="area"
      :options="areaList"
      v-bind="$attrs"
      :disabled="!province || !city"
      placeholder="请选择地区"
      label="name"
      value="code"
    ></o-select>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import address from './pca-code.json'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
})

// 省市区里面的对象
export interface AreaItem {
  name: string
  code: string
  children?: AreaItem[]
}

// 返回的数据
export interface Data {
  name: string
  code: string
}

// change函数
const emits = defineEmits(['change', 'update:modelValue'])

// 初始化数据
const province = ref<string>('')
const city = ref<string>('')
const area = ref<string>('')

// 地区展示的数据
const areaList = ref<AreaItem[]>([])

// 城市展示的数据
const cityList = ref<AreaItem[]>([])
// 回显
watch(
  () => props.modelValue,
  (newVal) => {
    province.value = newVal[0] ?? ''
    city.value = newVal[1] ?? ''
    area.value = newVal[2] ?? ''
    if (province.value) {
      cityList.value = address.find((item) => province.value === item.code)!.children
    }
    if (city.value) {
      areaList.value = cityList.value.find((item) => city.value === item.code)!.children!
    }
  },
  {
    immediate: true,
  },
)
// 监听选择省份
watch(
  () => province.value,
  (newVal) => {
    // 防止空数据
    if (newVal) {
      // 获取子级数据
      cityList.value = address.find((item) => province.value === item.code)!.children
    }
    // 重置前面的数据
    city.value = ''
    area.value = ''
    emits('update:modelValue', [province.value, city.value, area.value])
  },
  {
    // immediate: true
  },
)

// 监听选择城市
watch(
  () => city.value,
  (newVal) => {
    // 防止空数据
    if (newVal) {
      // 获取子级数据
      areaList.value = cityList.value.find((item) => city.value === item.code)!.children!
    }
    // 重置前面的数据
    area.value = ''
    emits('update:modelValue', [province.value, city.value, area.value])
  },
)

// 监听选择区域
watch(
  () => area.value,
  (newVal) => {
    if (newVal) {
      const provinceData: Data = {
        name: address.find((item) => item.code === province.value)!.name,
        code: province.value,
      }
      const cityData: Data = {
        name: cityList.value.find((item) => item.code === city.value)!.name,
        code: city.value,
      }
      const areaData: Data = {
        name: areaList.value.find((item) => item.code === newVal)!.name,
        code: newVal,
      }
      emits('change', {
        province: provinceData,
        city: cityData,
        area: areaData,
      })
      emits('update:modelValue', [province.value, city.value, area.value])
    }
  },
)
</script>

<style lang="scss" scoped></style>
