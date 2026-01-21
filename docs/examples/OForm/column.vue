<template>
  <el-radio-group v-model="widthSize" size="small" style="margin-bottom: 15px">
    <el-radio-button :value="1">一行展示</el-radio-button>
    <el-radio-button :value="2">一行展示2项</el-radio-button>
    <el-radio-button :value="3">一行展示3项</el-radio-button>
    <el-radio-button :value="4">一行展示4项</el-radio-button>
    <el-radio-button :value="5">一行展示5项</el-radio-button>
  </el-radio-group>
  <o-form ref="TFormDemo" :model="formData" :fieldList="fieldList" :column="widthSize" />

  {{ formData }}

  o-switch
</template>

<script setup lang="tsx">
import { ref, reactive } from 'vue'
import type { Ref } from 'vue'

interface WidthSizeType {
  widthSize?: 1 | 2 | 3 | 4 | 5 | 6 | undefined
}
const widthSize = ref(4) as Ref<WidthSizeType['widthSize']>

const formData = ref({
  account: 'wocwin', // *用户账号
  password: null, // *用户密码
  name: null, // *用户昵称
  sex: null, // *性别: 0:男 1:女
  hobby: [], // *爱好: 0:男 1:女
  phone: null, // 手机号码
  createDate: null, // 创建时间
  valDate: null, // el日期选择范围
  wechat: null, // 微信
  qq: null, // qq
  accountType: null, // *用户类型: 0: 手机注册 1: 论坛注册 2: 管理平台添加
  email: null, // 邮箱
  desc: null, // 描述
  number: 3, // 计算器
  status: 1, // *状态: 0：停用，1：启用(默认为1)',
})

const fieldList = [
  {
    label: '账号',
    prop: 'account',
    comp: 'el-input',
    event: 'account',
  },
  {
    label: '密码',
    prop: 'password',
    comp: 'el-input',
    attrs: {
      type: 'password',
    },
  },
  { label: '昵称', prop: 'name', comp: 'el-input' },
  {
    label: '性别',
    prop: 'sex',
    comp: 'o-select',
    attrs: {
      options: [
        { label: '男人', value: 'man' },
        { label: '女人', value: 'woman' },
      ],
    },
  },
  {
    label: '爱好',
    prop: 'hobby',
    comp: 'o-checkbox',
    attrs: {
      showAll: false,
      options: [
        { label: '吉他', value: '0' },
        { label: '看书', value: '1' },
        { label: '美剧', value: '2' },
        { label: '旅游', value: '3' },
        { label: '音乐', value: '4' },
      ],
    },
  },
  {
    label: '手机号码',
    prop: 'phone',

    comp: 'el-input',
    bind: { maxlength: 11 },
  },
  {
    label: '日期',
    prop: 'valDate',
    comp: 'el-date-picker',
    bind: {
      rangeSeparator: '-',
      startPlaceholder: '开始日期',
      endPlaceholder: '结束日期',
      valueFormat: 'YYYY-MM-DD',
    },
  },
  { label: 'QQ', prop: 'qq', comp: 'el-input' },
  { label: '邮箱', prop: 'email', comp: 'el-input' },
  {
    label: '状态',
    prop: 'status',
    comp: 'o-switch',
    attrs: {
      'active-text': '启用',
      'inactive-text': '禁用',
      'active-value': 1,
      'inactive-value': 0,
    },
  },
  {
    label: '计数器',
    prop: 'number',
    comp: 'el-input-number',
    attrs: {
      min: 2,
      max: 99,
      precision: 1,
      step: 0.1,
    },
  },
  {
    label: '描述',
    prop: 'desc',
    attrs: {
      type: 'textarea',
    },
    column: 1,
  },
]
</script>
