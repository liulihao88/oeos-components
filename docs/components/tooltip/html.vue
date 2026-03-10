<script setup lang="ts">
import { ref, getCurrentInstance, h } from 'vue'
const { proxy } = getCurrentInstance()
const useMapTextTitle = h('div', {}, [
  h('div', '1、首先需要确定银行/支付公司， 如果系统没有自动识别，则必须手工选择正确的机构'),
  h('div', '2、交易方向（借贷方向）和交易金额都有时，以交易方向确定交易金额的方向'),
  h('div', '3、当没有交易方向时， 交易金额和借方金额一样，以正表示借方。'),
  h('div', '4、贷方金额，为正时表示贷方'),
  h('div', '5、结算金额，为正时表示贷方'),
  h(
    'div',
    '6、当对应的调整项为【是】时， 以上三个字段均以反方向表示借贷， 比如： 交易金额为负表示借方，贷方金额为负表示贷方，结算金额为负表示贷方。以文件的数据具体情况进行灵活配置。',
  ),
  h('div', '7、当未映射的字段不重要时，可以不做映射'),
])
</script>

<template>
  <div class="w-300">
    <o-tooltip
      width="200px"
      raw-content
      content=" <span class='cl-blue m-100'>我是啊</span>
        我爱你啊1111 <br>这里使用 &lt; br &gt;进行换行 <div>或者直接使用块级元素进行换行</div>"
    >
      这里显示内容
    </o-tooltip>

    <o-tooltip :content="useMapTextTitle" trigger="click">
      <el-button type="primary">字段说明</el-button>
    </o-tooltip>
  </div>
</template>
