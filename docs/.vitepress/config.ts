import { defineConfig } from 'vitepress'
import { mdPlugin } from './config/plugins.ts'
import { createAlgolia, Github } from './utils/settings.ts'

export default defineConfig({
  // 站点级选项
  base: '/oeos-components/',
  head: [
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/img/logo.svg' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
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
          items: [
            {
              text: '安装指南',
              link: '/components/',
            },
            {
              text: '新开发计划',
              link: '/components/plan/base.md',
            },
            {
              text: '函数库文件',
              link: '/components/utils/base.md',
            },
            {
              text: '函数方法',
              items: [
                {
                  text: 'validate校验',
                  link: '/components/utils/validate/base.md',
                },
                {
                  text: 'confirm确认框',
                  link: '/components/utils/confirm/base.md',
                },
                {
                  text: 'toFixed给数字加小数点',
                  link: '/components/utils/toFixed/base.md',
                },
                {
                  text: 'formatBytesConvert翻转字节为数字',
                  link: '/components/utils/formatBytesConvert/base.md',
                },
              ],
            },
          ],
        },
        {
          text: 'Basic基础组件',
          items: [
            {
              text: 'checkbox组件',
              link: '/components/checkbox/base.md',
            },
            {
              text: 'chooseArea组件',
              link: '/components/chooseArea/base.md',
            },
            {
              text: '测试组件',
              link: '/components/test/base.md',
            },
            {
              text: 'dateRange组件',
              link: '/components/dateRange/base.md',
            },
            {
              text: 'description组件',
              link: '/components/description/base.md',
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
          text: 'Complex复杂组件',
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
          items: [
            {
              text: '基础布局组件',
              link: '/components/company/basicLayout/base.md',
            },
            {
              text: '容量组件',
              link: '/components/company/capacityProgress/base.md',
            },
            {
              text: '使用量圆环组件',
              link: '/components/company/usedPie/base.md',
            },
          ],
        },

        {
          text: '自定义指令',
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
