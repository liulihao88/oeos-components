import { defineConfig } from 'vitepress'
import { mdPlugin } from './config/plugins.ts'
import { createAlgolia, Github } from './utils/settings.ts'

export default defineConfig({
  // 站点级选项
  base: '/oeos-components/',
  head: [
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/img/logo.svg' }],
    ['meta', { name: 'mobile-web-app-capable', content: 'yes' }],
    [
      'meta',
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0',
      },
    ],
  ],
  lastUpdated: true,
  useWebFonts: false,
  cleanUrls: true,
  title: 'Oeos-Components',
  description: '创云融达',
  lang: 'zh-CN',
  themeConfig: {
    outline: 3,
    algolia: createAlgolia(),
    lastUpdatedText: '最近更新时间',
    docFooter: { prev: '上一篇', next: '下一篇' },
    editLink: {
      pattern: `${Github}/docs/:path`,
      text: '在 Github 上查看此页面',
    },
    footer: {
      message: `创云融达前端组件库, <a target="_blank" style="color: var(--vp-c-brand)" href="${Github}">⭐欢迎访问</a>`,
      copyright: ` 版权所有 © 2023-${new Date().getFullYear()}`,
    },
    nav: [
      {
        text: '安装指南',
        link: '/components/',
      },
      { text: '基础组件', link: '/components/dialog/base.md' },
      {
        text: 'Github项目地址',
        link: Github,
      },
    ],
    // 主题级选项
    sidebar: {
      '/components': [
        {
          text: '说明文档',
          collapsed: false,
          items: [
            {
              text: '安装指南',
              link: '/components/',
            },
            {
              text: '函数库文件',
              link: '/components/utils/base.md',
            },
            {
              text: '函数方法',
              collapsed: false,
              items: [
                {
                  text: '$toast提示',
                  link: '/components/utils/$toast/base.md',
                },
                {
                  text: 'confirm确认框',
                  link: '/components/utils/confirm/base.md',
                },
                {
                  text: 'clone深克隆',
                  link: '/components/utils/clone/base.md',
                },
                {
                  text: 'isEmpty判断是否空值',
                  link: '/components/utils/isEmpty/base.md',
                },
                {
                  text: 'toFixed给数字加小数点',
                  link: '/components/utils/toFixed/base.md',
                },
                {
                  text: 'tryCatch函数封装',
                  link: '/components/utils/tryCatch/base.md',
                },
                {
                  text: 'validate校验',
                  link: '/components/utils/validate/base.md',
                },
                {
                  text: 'validForm校验form函数封装',
                  link: '/components/utils/validForm/base.md',
                },
                {
                  text: 'formatBytes数字变为字节',
                  link: '/components/utils/formatBytes/base.md',
                },
                {
                  text: 'formatBytesConvert翻转字节为数字',
                  link: '/components/utils/formatBytesConvert/base.md',
                },
                {
                  text: 'formatTime转换日期',
                  link: '/components/utils/formatTime/base.md',
                },
                {
                  text: 'formatDutationTime持续时间',
                  link: '/components/utils/formatDurationTime/base.md',
                },
                {
                  text: 'uuid生成随机字符串',
                  link: '/components/utils/uuid/base.md',
                },
                {
                  text: 'getType获取类型',
                  link: '/components/utils/getType/base.md',
                },
                {
                  text: 'sleep延迟函数',
                  link: '/components/utils/sleep/base.md',
                },
              ],
            },
          ],
        },
        {
          text: 'Basic基础组件',
          collapsed: false,
          items: [
            {
              text: '测试组件',
              link: '/components/test/base.md',
            },
            {
              text: 'button组件',
              link: '/components/button/base.md',
            },
            {
              text: 'checkbox组件',
              link: '/components/checkbox/base.md',
            },
            {
              text: 'chooseArea组件',
              link: '/components/chooseArea/base.md',
            },
            {
              text: 'chart图表组件',
              link: '/components/chart/base.md',
            },
            {
              text: 'clickOutside外部点击组件',
              link: '/components/clickOutside/base.md',
            },
            {
              text: 'dateRange组件',
              link: '/components/dateRange/base.md',
            },
            {
              text: 'descriptions组件',
              link: '/components/descriptions/base.md',
            },
            {
              text: 'dialog组件',
              link: '/components/dialog/base.md',
            },
            {
              text: 'drawer组件',
              link: '/components/drawer/base.md',
            },
            {
              text: 'empty组件',
              link: '/components/empty/base.md',
            },
            {
              text: 'popconfirm组件',
              link: '/components/popconfirm/base.md',
            },
            {
              text: 'progress组件',
              link: '/components/progress/base.md',
            },
            {
              text: 'radio组件',
              link: '/components/radio/base.md',
            },
            {
              text: 'select组件',
              link: '/components/select/base.md',
            },
            {
              text: 'switch组件',
              link: '/components/switch/base.md',
            },
            {
              text: 'svg组件',
              link: '/components/svg/base.md',
            },
            {
              text: 'icon组件',
              link: '/components/icon/base.md',
            },
            {
              text: 'input组件',
              link: '/components/input/base.md',
            },
            {
              text: 'inputLabel组件',
              link: '/components/inputLabel/base.md',
            },
            {
              text: 'tabs组件',
              link: '/components/tabs/base.md',
            },
            {
              text: 'tag组件',
              link: '/components/tag/base.md',
            },
            {
              text: 'text组件',
              link: '/components/text/base.md',
            },
            {
              text: 'title组件',
              link: '/components/title/base.md',
            },
            {
              text: 'tooltip组件',
              link: '/components/tooltip/base.md',
            },
            {
              text: 'warning组件',
              link: '/components/warning/base.md',
            },
          ],
        },
        {
          text: '原生js组件',
          collapsed: false,
          items: [
            {
              text: 'flex布局组件',
              link: '/components/flex/base.md',
            },
          ],
        },
        {
          text: 'Complex复杂组件',
          collapsed: false,
          items: [
            {
              text: 'form组件',
              link: '/components/form/base.md',
            },
            {
              text: 'table组件',
              link: '/components/table/base.md',
            },
          ],
        },
        {
          text: '公司内部组件',
          collapsed: false,
          items: [
            {
              text: 'baseHeader基础头部',
              link: '/components/company/baseHeader/base.md',
            },
            {
              text: 'basicLayout基础布局组件',
              link: '/components/company/basicLayout/base.md',
            },
            {
              text: 'capacityProgress容量组件',
              link: '/components/company/capacityProgress/base.md',
            },
            {
              text: 'countBar数量统计柱状图组件',
              link: '/components/company/countBar/base.md',
            },
            {
              text: 'countBarOld数量统计柱状图组件',
              link: '/components/company/countBarOld/base.md',
            },
            {
              text: 'objectLine对象数量/大小历史',
              link: '/components/company/objectLine/base.md',
            },
            {
              text: 'outService对外服务信息',
              link: '/components/company/outService/base.md',
            },
            {
              text: 'overviewItem顶部列表',
              link: '/components/company/overviewItem/base.md',
            },
            {
              text: 'usedPie使用量圆环组件',
              link: '/components/company/usedPie/base.md',
            },
            {
              text: 'quotaPie容量圆环组件',
              link: '/components/company/quotaPie/base.md',
            },
            {
              text: 'quotaUnit容量单位组件',
              link: '/components/company/quotaUnit/base.md',
            },
            {
              text: 'item列表组件',
              link: '/components/company/item/base.md',
            },
            {
              text: 'itemWrapper包裹列表组件',
              link: '/components/company/itemWrapper/base.md',
            },
          ],
        },

        {
          text: '自定义指令',
          collapsed: false,
          items: [
            {
              text: 'throttle节流',
              link: '/components/directives/throttle.md',
            },
            {
              text: 'debounce防抖',
              link: '/components/directives/debounce.md',
            },
            {
              text: 'cus-loading和cus-empty',
              link: '/components/directives/cusLoadingEmpty.md',
            },
          ],
        },
      ],
    },
  },
  markdown: {
    headers: {
      level: [0, 0],
    },
    lineNumbers: true,
    theme: { light: 'github-light', dark: 'github-dark' },
    config: (md) => mdPlugin(md),
  },
})
