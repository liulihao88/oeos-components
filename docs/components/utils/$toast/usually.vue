<script setup lang="ts">
import { ref, getCurrentInstance, h } from 'vue'
import * as utils from '@/utils/src/index'
import hot from '../../../.vitepress/theme/assets/svg/hot.svg?component'
import { ElMessage } from 'element-plus'
const { $toast, sleep } = utils
const { proxy } = getCurrentInstance()
const base = () => {
  $toast('基础成功')
  $toast('基础成功', 's')
  $toast('基础警告', 'w')
  $toast('基础信息', 'i')
  $toast('基础错误', 'e')
}
const elBase = () => {
  $toast('基础成功', { customClass: 'el' })
  $toast('基础成功', 's', { customClass: 'el' })
  $toast('基础警告', 'w', { customClass: 'el' })
  $toast('基础信息', 'i', { customClass: 'el' })
  $toast('基础错误', 'e', { customClass: 'el' })
}
const duration5000 = () => {
  utils.$toast('持续5秒', {
    duration: 5000,
  })
}
const noClose = () => {
  $toast('永不关闭', {
    duration: 0,
    showClose: true,
  })
}
const closeOther = async () => {
  for (let i = 0; i < 10; i++) {
    $toast(i, {
      duration: 5000,
    })
  }
  $toast('1秒后其他的都关闭')
  await sleep(1000)
  $toast('天下之大唯我独尊', { closeAll: true })
}

const showObject = () => {
  const obj = {
    name: 'andy',
    age: 18,
    hobbies: ['羽毛球', '乒乓球', '排球', '编码'],
  }
  $toast({
    dangerouslyUseHTMLString: true,
    message: `<pre style="max-height: 90vh; overflow-y: auto; overflow-x: hidden">${JSON.stringify(obj, null, 2)}</pre>`,
    type: 'success',
    duration: 0,
    showClose: true,
  })
}

const showBigObject = () => {
  const obj = [
    {
      label: '账号',
      prop: 'account',
      comp: 'el-input',
      event: 'account',
    },
    {
      label: '密码(单个禁用)',
      prop: 'password',
      comp: 'el-input',
      attrs: {
        type: 'password',
        disabled: true,
      },
    },
    {
      label: '昵称',
      prop: 'name',
      comp: 'el-input',
    },
    {
      label: '性别',
      prop: 'sex',
      comp: 'o-select',
      attrs: {
        options: [
          {
            label: '男人',
            value: 'man',
          },
          {
            label: '女人',
            value: 'woman',
          },
          {
            label: '中性人',
            value: 'middle',
          },
        ],
      },
    },
    {
      label: '性别',
      prop: 'sex',
      comp: 'o-select',
      attrs: {
        options: [
          {
            label: '男人',
            value: 'man',
          },
          {
            label: '女人',
            value: 'woman',
          },
          {
            label: '中性人',
            value: 'middle',
          },
        ],
      },
    },
    {
      label: '性别',
      prop: 'sex',
      comp: 'o-select',
      attrs: {
        options: [
          {
            label: '男人',
            value: 'man',
          },
          {
            label: '女人',
            value: 'woman',
          },
          {
            label: '中性人',
            value: 'middle',
          },
        ],
      },
    },
  ]
  $toast({
    dangerouslyUseHTMLString: true,
    message: `<div style="max-height: 90vh; overflow-y: auto; overflow-x: hidden"><pre >${JSON.stringify(obj, null, 2)}</pre> </div>`,
    type: 'success',
    duration: 0,
    showClose: true,
  })
}
</script>

<template>
  <OFunctionSourceCode functionName="$toast"></OFunctionSourceCode>
  <div>
    <o-flex wrap="wrap" gap="small">
      <el-button type="primary" @click="base">基础</el-button>
      <el-button type="primary" @click="elBase">element-plus风格</el-button>
      <el-button type="primary" @click="duration5000">持续5秒</el-button>
      <el-button type="primary" @click="noClose">永不关闭</el-button>
      <el-button type="primary" @click="$toast('可关闭', { showClose: true })">可关闭</el-button>
      <el-button type="primary" @click="$toast('分组消息合并', { grouping: true })">分组消息合并</el-button>
      <el-button
        @click="
          $toast('自定义消息图标', {
            icon: hot,
          })
        "
      >
        自定义图标
      </el-button>
      <!-- <el-button
        @click="
          ElMessage({
            message: '哈哈',
            icon: hot,
          })
        "
      >
        自定义图标
      </el-button> -->
      <el-button type="primary" @click="closeOther">关闭其他, 只保留一个</el-button>
      <el-button
        @click="
          $toast('3秒后关闭', {
            duration: 3000,
            onClose: () => $toast('消息已关闭', { type: 'success' }),
          })
        "
      >
        自定义延时关闭时间并设置关闭后其他操作
      </el-button>
      <el-button
        @click="
          $toast(h('p', null, [h('span', null, 'Message can be '), h('i', { style: 'color: teal' }, 'VNode')]), {
            customClass: 'el',
          })
        "
      >
        自定义内容, 使用h函数
      </el-button>
      <el-button type="primary" @click="showObject">HTML 片段作为正文内容</el-button>
      <el-button type="primary" @click="showBigObject">显示大对象</el-button>
    </o-flex>
  </div>
</template>
