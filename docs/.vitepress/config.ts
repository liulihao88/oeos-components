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
      { text: '基础组件', link: '/components/dialog/home.md' },
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
              text: '函数库文件代码',
              link: '/components/utils/home.md',
            },
            {
              text: 'vitepress常用语法',
              link: '/components/utils/grammar/home.md',
            },
            {
              text: '国际化',
              link: '/components/utils/i18n/home.md',
            },
            {
              text: '函数方法',
              collapsed: false,
              items: [
                {
                  text: '$toast提示',
                  link: '/components/utils/$toast/home.md',
                },
                {
                  text: 'confirm确认框',
                  link: '/components/utils/confirm/home.md',
                },
                {
                  text: 'clone深克隆',
                  link: '/components/utils/clone/home.md',
                },
                {
                  text: 'isEmpty判断是否空值',
                  link: '/components/utils/isEmpty/home.md',
                },
                {
                  text: 'formatToFixed给数字加小数点',
                  link: '/components/utils/formatToFixed/home.md',
                },
                {
                  text: 'tryCatch函数封装',
                  link: '/components/utils/tryCatch/home.md',
                },
                {
                  text: 'validate校验',
                  link: '/components/utils/validate/home.md',
                },
                {
                  text: 'validForm校验form函数封装',
                  link: '/components/utils/validForm/home.md',
                },
                {
                  text: 'formatBytes数字变为字节',
                  link: '/components/utils/formatBytes/home.md',
                },
                {
                  text: 'formatBytesConvert翻转字节为数字',
                  link: '/components/utils/formatBytesConvert/home.md',
                },
                {
                  text: 'formatTime转换日期',
                  link: '/components/utils/formatTime/home.md',
                },
                {
                  text: 'formatDutationTime持续时间',
                  link: '/components/utils/formatDurationTime/home.md',
                },
                {
                  text: 'uuid生成随机字符串',
                  link: '/components/utils/uuid/home.md',
                },
                {
                  text: 'getType获取类型',
                  link: '/components/utils/getType/home.md',
                },
                {
                  text: 'sleep延迟函数',
                  link: '/components/utils/sleep/home.md',
                },
                {
                  text: 'dayjs函数方法',
                  link: '/components/utils/dayjs/home.md',
                }
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
              link: '/components/test/home.md',
            },
            {
              text: 'button组件',
              link: '/components/button/home.md',
            },
            {
              text: 'checkbox组件',
              link: '/components/checkbox/home.md',
            },
            {
              text: 'chooseArea组件',
              link: '/components/chooseArea/home.md',
            },
            {
              text: 'chart图表组件',
              link: '/components/chart/home.md',
            },
            {
              text: 'clickOutside外部点击组件',
              link: '/components/clickOutside/home.md',
            },
            {
              text: 'dateRange组件',
              link: '/components/dateRange/home.md',
            },
            {
              text: 'descriptions组件',
              link: '/components/descriptions/home.md',
            },
            {
              text: 'dialog组件',
              link: '/components/dialog/home.md',
            },
            {
              text: 'drawer组件',
              link: '/components/drawer/home.md',
            },
            {
              text: 'empty组件',
              link: '/components/empty/home.md',
            },
            {
              text: 'popconfirm组件',
              link: '/components/popconfirm/home.md',
            },
            {
              text: 'progress组件',
              link: '/components/progress/home.md',
            },
            {
              text: 'radio组件',
              link: '/components/radio/home.md',
            },
            {
              text: 'row布局组件',
              link: '/components/row/home.md',
            },
            {
              text: 'select组件',
              link: '/components/select/home.md',
            },
            {
              text: 'switch组件',
              link: '/components/switch/home.md',
            },
            {
              text: 'svg组件',
              link: '/components/svg/home.md',
            },
            {
              text: 'icon组件',
              link: '/components/icon/home.md',
            },
            {
              text: 'input组件',
              link: '/components/input/home.md',
            },
            {
              text: 'inputLabel组件',
              link: '/components/inputLabel/home.md',
            },
            {
              text: 'tabs组件',
              link: '/components/tabs/home.md',
            },
            {
              text: 'tag组件',
              link: '/components/tag/home.md',
            },
            {
              text: 'text组件',
              link: '/components/text/home.md',
            },
            {
              text: 'title组件',
              link: '/components/title/home.md',
            },
            {
              text: 'tooltip组件',
              link: '/components/tooltip/home.md',
            },
            {
              text: 'warning组件',
              link: '/components/warning/home.md',
            },
          ],
        },
        {
          text: '原生js组件',
          collapsed: false,
          items: [
            {
              text: 'flex布局组件',
              link: '/components/flex/home.md',
            },
          ],
        },
        {
          text: 'Complex复杂组件',
          collapsed: false,
          items: [
            {
              text: 'form组件',
              link: '/components/form/home.md',
            },
            {
              text: 'table组件',
              link: '/components/table/home.md',
            },
          ],
        },
        {
          text: '公司内部组件',
          collapsed: false,
          items: [
            {
              text: 'baseHeader基础头部',
              link: '/components/company/baseHeader/home.md',
            },
            {
              text: 'basicLayout基础布局组件',
              link: '/components/company/basicLayout/home.md',
            },
            {
              text: 'capacityProgress容量组件',
              link: '/components/company/capacityProgress/home.md',
            },
            {
              text: 'countBar数量统计柱状图组件',
              link: '/components/company/countBar/home.md',
            },
            {
              text: 'countBarOld数量统计柱状图组件',
              link: '/components/company/countBarOld/home.md',
            },
            {
              text: 'objectLine对象数量/大小历史',
              link: '/components/company/objectLine/home.md',
            },
            {
              text: 'outService对外服务信息',
              link: '/components/company/outService/home.md',
            },
            {
              text: 'overviewItem顶部列表',
              link: '/components/company/overviewItem/home.md',
            },
            {
              text: 'usedPie使用量圆环组件',
              link: '/components/company/usedPie/home.md',
            },
            {
              text: 'quotaPie容量圆环组件',
              link: '/components/company/quotaPie/home.md',
            },
            {
              text: 'quotaUnit容量单位组件',
              link: '/components/company/quotaUnit/home.md',
            },
            {
              text: 'item列表组件',
              link: '/components/company/item/home.md',
            },
            {
              text: 'itemWrapper包裹列表组件',
              link: '/components/company/itemWrapper/home.md',
            },
          ],
        },

        {
          text: '自定义指令',
          collapsed: false,
          items: [
            {
              text: 'copy复制',
              link: '/components/directives/copy/home.md',
            },
            {
              text: 'throttle节流',
              link: '/components/directives/throttle/home.md',
            },
            {
              text: 'debounce防抖',
              link: '/components/directives/debounce/home.md',
            },
            {
              text: 'cus-loading和cus-empty',
              link: '/components/directives/cusLoadingEmpty/home.md',
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
