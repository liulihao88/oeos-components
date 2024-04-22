import { defineConfig } from 'vitepress'
import { mdPlugin } from './config/plugins.ts'
import { createAlgolia, GitLab } from './utils/settings.ts'

export default defineConfig({
  // 站点级选项
  base: '/',
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
  title: 'Oeos-v3-components',
  description: 'andy凌云出品必属精品',
  lang: 'zh-CN',
  themeConfig: {
    outline: 3,
    algolia: createAlgolia(),
    lastUpdatedText: '最近更新时间',
    docFooter: { prev: '上一篇', next: '下一篇' },
    editLink: {
      pattern: `${GitLab}/docs/:path`,
      text: '在 GitLab 上查看此页面',
    },
    footer: {
      message: `创云融达前端组件库, <a target="_blank" style="color: var(--vp-c-brand)" href="${GitLab}">⭐欢迎访问</a>`,
      copyright: ` 版权所有 © 2023-${new Date().getFullYear()}`,
    },
    nav: [
      {
        text: '安装指南',
        link: '/components/',
      },
      { text: '基础组件', link: '/components/dialog/base.md' },
      {
        text: 'GitLab项目地址',
        link: GitLab,
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
              text: 'dialog组件',
              link: '/components/dialog/base.md',
            },
            {
              text: 'dateRange组件',
              link: '/components/dateRange/base.md',
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
              text: 'popover组件',
              link: '/components/popover/base.md',
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
              text: 'tooltip组件',
              link: '/components/tooltip/base.md',
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
      ],
    },
  },
  markdown: {
    headers: {
      level: [0, 0],
    },
    lineNumbers: true,
    // light: #f9fafb, dark: --vp-code-block-bg
    theme: { light: 'github-light', dark: 'github-dark' },
    config: (md) => mdPlugin(md),
  },
})
