<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const form = ref({
  quota: 12,
  unit: 'PB',
})
const rules = {}

const formRef = ref(null)
const submit = async () => {
  await proxy.validForm(formRef.value)
  console.log(`1128 10行 docs/examples/Company/OQuotaUnit/base.vue form.value `, form.value)

  proxy.$toast('哈哈')
}

const minQuota = ref('1.1GB')
const maxQuota = ref('2TB')

const validateQuota = (rule, value, callback) => {
  if (proxy.formatBytesConvert(1) == 0) {
    callback(new Error(`请先选择可用存储`))
  }
  let formQuota = form.value.quota + form.value.unit
  console.log(`74 form.value.unit`, form.value.unit)
  console.log(`13 form.value.quota`, form.value.quota)
  let quotaNum = proxy.formatBytesConvert(formQuota)
  console.log(`28 quotaNum`, quotaNum)
  console.log(`66 proxy.formatBytesConvert(minQuota.value)`, proxy.formatBytesConvert(minQuota.value))
  if (quotaNum < proxy.formatBytesConvert(minQuota.value)) {
    callback(new Error(`配额不应少于${minQuota.value}`))
  } else if (quotaNum > proxy.formatBytesConvert(maxQuota.value)) {
    callback(new Error(`配额最高可配${maxQuota.value}`))
  } else {
    callback()
  }
}
</script>

<template>
  <div>
    <el-form :model="form" :rules="rules" ref="formRef">
      <OQuotaUnit v-model="form.quota" v-model:unit="form.unit" :validator="validateQuota"></OQuotaUnit>
      <div>==quota: {{ form.quota }} ==</div>
      <div>??unit: {{ form.unit }}??</div>
    </el-form>
    <el-button type="primary" @click="submit">提交</el-button>
  </div>
</template>
