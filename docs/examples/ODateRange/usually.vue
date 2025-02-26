<script setup lang="ts">
import { ref, getCurrentInstance, h } from 'vue'
const { proxy } = getCurrentInstance()
const dateValue = ref([])
const dateSimple = ref('')
const beforeDateValue = ref('')

const disabledDate = (time) => {
  return time.getTime() > new Date().getTime()
}
</script>

<template>
  <div>
    <o-title title="年月日 时分秒"></o-title>
    <o-date-range v-model="dateValue" width="600" format="YYYY-MM-DD HH:mm:ss" type="datetimerange"></o-date-range>
    <o-title title="多属性"></o-title>
    <o-date-range
      v-model="dateValue"
      title="选择日期"
      start-placeholder="开始"
      end-placeholder="结束"
      range-separator="///"
    ></o-date-range>
    <o-title title="支持到可以选择时间"></o-title>
    <o-date-range
      v-model="dateValue"
      title="写入时间"
      class="mb2"
      format="YYYY-MM-DD HH:mm:ss"
      width="500"
      :titleAttrs="{ width: 80 }"
      type="datetimerange"
    />
    <o-title title="选择单个日期, 并且是时间戳"></o-title>
    <o-date-range
      v-model="dateSimple"
      title="完犊子"
      type="datetime"
      value-format="x"
      placeholder="选择日期哦"
    ></o-date-range>
    {{ dateSimple }}

    <br />
    <o-title title="日期仅可以选择当前日期之前的"></o-title>
    <o-date-range
      v-model="beforeDateValue"
      type="datetime"
      value-format="x"
      placeholder="日期仅可以选择当前日期之前的"
      :disabled-date="disabledDate"
    ></o-date-range>
  </div>
</template>

<style scoped lang="scss"></style>
