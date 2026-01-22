<template>
  <o-form ref="TFormDemo" :model="formData" :fieldList="fieldList" :column="1" />
  <o-input v-model="cc" @input="(v) => console.log(v)" title="1233" class="m-l-100" />
  <el-input v-model="cc" @input="(v) => console.log(v)" />
</template>

<script setup lang="tsx">
import { ref, reactive } from 'vue'
const cc = ref()

const formData = ref({
  account: 'wocwin', // *用户账号
  password: null, // *用户密码
})

const fieldList = [
  {
    label: '账号',
    prop: 'account',
    comp: 'o-input',
    attrs: {
      width: '200',
      onBlur: () => {
        console.log(`***** onBlur 25行 docs/examples/OForm/event.vue`)
      },
      onInput: (val) => {
        console.log(`49 val`, val)
      },
      onFocus: () => {
        console.log(`***** onFocus 28行 docs/examples/OForm/event.vue`)
      },
      onClear: () => {
        console.log(`***** clear 35行 docs/examples/OForm/event.vue`)
      },
    },
  },
  {
    label: '性别',
    prop: 'sex',
    comp: 'o-select',
    attrs: {
      options: [
        { label: '男人', value: 'man' },
        { label: '女人', value: 'woman' },
        { label: '中性人', value: 'middle' },
      ],
      width: '200',
      onChange: (...arr) => {
        console.log(`1131 46行 docs/examples/OForm/event.vue arr `, arr)
      },
      onChangeSelect: (...arr) => {
        console.log(`1131 46行 docs/examples/OForm/event.vue arr `, arr)
      },
    },
  },
]
</script>
