<template>
  <o-flex gap="small" direction="column">
    <o-input
      title="密码框"
      v-model="input"
      style="width: 240px"
      type="password"
      placeholder="Please input password"
      show-password
    />

    <o-flex gap="small">
      <o-input v-model="input" size="large" title="size:large" />
      <o-input v-model="input" size="default" title="size:default" />
      <o-input v-model="input" size="small" title="size: small" />
    </o-flex>

    <o-title title="文本域">
      <o-input
        title="文本域"
        v-model="textarea"
        style="width: 240px"
        :rows="2"
        type="textarea"
        placeholder="Please input"
      />
    </o-title>

    <o-input v-model="textarea1" style="width: 240px" autosize type="textarea" placeholder="Please input" />
    <div style="margin: 20px 0" />
    <o-input
      v-model="textarea2"
      style="width: 240px"
      :autosize="{ minRows: 2, maxRows: 4 }"
      type="textarea"
      placeholder="Please input"
    />

    <o-title title="输入长度限制" :sub-title='subTitle'></o-title>

    <el-input
      v-model="text"
      style="width: 240px"
      maxlength="10"
      placeholder="Please input"
      show-word-limit
      type="text"
    />
    <el-input
      v-model="text"
      class="ml-4"
      style="width: 240px"
      maxlength="10"
      placeholder="Please input"
      show-word-limit
      word-limit-position="outside"
      type="text"
    />
    <div style="margin: 20px 0" />
    <el-input
      v-model="textarea"
      maxlength="30"
      style="width: 240px"
      placeholder="Please input"
      show-word-limit
      type="textarea"
    />
    <el-input
      v-model="textarea"
      class="ml-4"
      maxlength="30"
      style="width: 240px"
      placeholder="Please input"
      show-word-limit
      word-limit-position="outside"
      type="textarea"
    />
  </o-flex>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const textarea1 = ref('')
const textarea2 = ref('')

const input = ref('')

const text = ref('')
const textarea = ref('')
const subTitle='使用 maxlength 和 minlength 属性, 来控制输入内容的最大字数和最小字数。 "字符数"使用JavaScript字符串长度来衡量。 为文本或文本输入类型设置 maxlength prop可以限制输入值的长度。 允许你通过设置 show-word-limit 到 true 来显示剩余字数。 从 2.11.5 版本开始，你可以将 word-limit-position 设置为 outside，以在输入框外显示字数统计。'
</script>
