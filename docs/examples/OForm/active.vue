<script setup lang="ts">
import { ref, getCurrentInstance, computed } from 'vue'
import { validateTrigger, sleep } from '@oeos-components/utils'
const oFormRef = ref()
const form = ref({
  account: '',
  domains: [
    {
      key: 1,
      value: '',
    },
  ],
})
const fieldList = computed(() => {
  let constantItem = [
    {
      label: '账号',
      prop: 'account',
    },
  ]
  let dynamicItem: Array<{ label: string; prop: string; rules?: any; useSlot: any }> = []

  for (let i = 0; i < form.value.domains.length; i++) {
    let v = form.value.domains[i]
    dynamicItem.push({
      label: 'formDomains' + v.key,
      prop: 'domains.' + i + '.value',
      rules: [validateTrigger()],
      useSlot: true,
    })
  }
  return [...constantItem, ...dynamicItem]
})

const newAdd = () => {
  const last = form.value.domains.at(-1)
  const nextKey = last && typeof last.key !== 'undefined' ? last.key + 1 : 1
  form.value.domains.push({
    key: nextKey,
    value: '',
  })
}
const deleteItem = async (i) => {
  form.value.domains.splice(i, 1)
  await sleep(0)
  oFormRef.value.clearValidate()
}
</script>

<template>
  <div>
    <o-form :fieldList="fieldList" :model="form" ref="oFormRef">
      <template v-for="(v, i) in form.domains" :key="v.key" #[`domains.${i}.value`]>
        <o-flex align="center" gap="small">
          <o-input v-model="form.domains[i].value" />
          <o-icon name="delete" @click="deleteItem(i)"></o-icon>
        </o-flex>
      </template>
    </o-form>
    <el-button type="primary" @click="newAdd">新增 domain</el-button>
  </div>
</template>
