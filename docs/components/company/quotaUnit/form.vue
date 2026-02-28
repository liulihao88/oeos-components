<script setup>
import { ref, getCurrentInstance } from 'vue'

import { $toast, formatBytesConvert } from '@oeos-components/utils'

const { proxy } = getCurrentInstance()
const form = ref({
  quota: '1.0',
  quotaType: 'hard',
})
const QUOTA_OPTIONS = [
  { label: '硬配额', value: 'hard' },
  { label: '软配额', value: 'soft' },
]
const totalQuota = ref(0)
const oFormRef = ref(null)
const fieldList = [
  {
    label: '默认配额大小',
    prop: 'quota',
    useSlot: true,
  },
  {
    label: '存储桶配额类型',
    prop: 'quotaType',
    comp: 'o-radio',
    useSlot: true,
    attrs: {
      width: 300,
      clearable: false,
      options: QUOTA_OPTIONS,
    },
  },
]

function quotaRules(rule, value, callback, unit, lower, upper) {
  if (formatBytesConvert(value + unit) < formatBytesConvert(lower)) {
    callback(new Error(`桶配额下限为 ${lower}`))
  } else if (formatBytesConvert(value + unit) > formatBytesConvert(upper)) {
    callback(new Error(`剩余可用容量为 ${upper}`))
  } else {
    callback()
  }
}
const validateQuota = (rule, value, callback) => {
  quotaRules(rule, value, callback, form.value.quotaUnit, '1GB', totalQuota.value)
}
const rules = {
  // quota: [proxy.validate()],
}
</script>

<template>
  <div class="">
    <o-basic-layout class="h-100%">
      <template #header>
        <o-title :title="metaTitle" />
      </template>
      <o-form ref="oFormRef" :fieldList="fieldList" :model="form" :rules="rules" class="custom-form-item" align="top">
        <template #quota>
          <OQuotaUnit v-model="form.quota" v-model:unit="form.quotaUnit" :validator="validateQuota" label="" />
          <o-warning :content="`最高可配 <code>${totalQuota}</code>`" class="mt2" type="warning" width="700" />
        </template>
        <!-- <el-form-item label="" prop="">
          <div class="mt2">
            <o-warning :content="`最高可配 <code>${totalQuota}</code>`" class="" type="warning" width="700" />
          </div>
        </el-form-item> -->
        <template #quotaType>
          <o-radio v-model="form.quotaType" :options="QUOTA_OPTIONS" :clearable="false" />
          <div class="mt2">
            <g-dif-warning type="quota" style="width: 700px" />
          </div>
        </template>
      </o-form>
      <template #footer></template>
    </o-basic-layout>
  </div>
</template>

<style lang="scss" scoped>
.custom-form-item :deep(.el-form-item__error) {
  position: absolute;
  top: 32px; /* 输入框高度 + 间距 */
  left: 0;
  width: 100%;
  margin: 4px 0 0;
}
</style>
