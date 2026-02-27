<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
import { formatTextToHtml, formatToFixed, $toast } from '@/utils/src/index'
let arr = [
  { label: 'formatToFixed(22)', value: formatToFixed(22) },
  { label: 'formatToFixed("22")', value: formatToFixed('22') },
  { label: 'formatToFixed(22, 0)', value: formatToFixed(22, 0) },
  { label: 'formatToFixed(22, 4)', value: formatToFixed(22, 4) },
  { label: 'formatToFixed(22.12345678, 4)', value: formatToFixed(22.12345678, 4) },
  { label: 'formatToFixed("1.0 TB")', value: formatToFixed('1.0 TB') },
  { label: 'formatToFixed("1.0tb")', value: formatToFixed('1.0tb') },
  { label: 'formatToFixed("0")', value: formatToFixed(0) },
]
$toast(
  formatTextToHtml(
    'Example file\n\t  File : 111.jpeg\n\t  CreateTime : 1721011155921 2024-07-15 10:39:15\n\t  LastUpdateTime : 1721011155921 2024-07-15 10:39:15\n------------------------------------------------------------------------\n\tExtract:\n\t  aa=231\n------------------------------------------------------------------------\n',
  ),
  {
    duration: 5000,
    dangerouslyUseHTMLString: true,
  },
)
const parse$toast = (str) => {
  $toast(formatTextToHtml(str), {
    duration: 5000,
    dangerouslyUseHTMLString: true,
  })
}
</script>

<template>
  <OFunctionSourceCode functionName="formatTextToHtml"></OFunctionSourceCode>
  <o-title title="1. 提示"></o-title>
  <o-button type="primary" @click="parse$toast('Hello\nWorld')">基础</o-button>
  <o-button type="primary" @click="parse$toast('Item1\tItem2')">包含制表符</o-button>
  <o-button type="primary" @click="parse$toast('Error log:\n  Time: 2024-01-01\n  Message: Something went wrong')">
    实际应用场景
  </o-button>
  <o-button
    type="primary"
    @click="
      parse$toast(
        'Example file\n\t  File : 111.jpeg\n\t  CreateTime : 1721011155921 2024-07-15 10:39:15\n\t  LastUpdateTime : 1721011155921 2024-07-15 10:39:15\n------------------------------------------------------------------------\n\tExtract:\n\t  aa=231\n------------------------------------------------------------------------\n',
      )
    "
  >
    实际应用场景2
  </o-button>

  <o-title title="2. 直接在html中使用"></o-title>
  <div v-html="formatTextToHtml('Error log:\n  Time: 2024-01-01\n  Message: Something went wrong')"></div>
</template>
