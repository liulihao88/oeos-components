import { defineConfig } from 'vitepress'
import { mdPlugin } from './config/plugins.ts'
export default defineConfig({
  // 站点级选项
  title: 'oeos-v3-components组件文档',
  lang: 'cn-ZH',
  description:
    '前端组件库文档, 使用vue3+typescript+element-plus构建, 主要是对element-plus的二次封装',
  lastUpdated: true,
  themeConfig: {
    siteTitle: 'oeos-v3-components组件文档',
    outline: 3,
    nav: [
      {
        text: '安装指南',
        link: '/components/',
      },
      { text: '基础组件', link: '/components/dialog/base.md' },
      {
        text: 'Gitee码云地址',
        link: 'https://gitee.com/lihaoliu/oeos-v3-components',
      },
    ],
    // 主题级选项
    sidebar: {
      '/components': [
        {
          text: 'Basic基础组件',
          items: [
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
              text: 'select组件',
              link: '/components/select/base.md',
            },
            {
              text: 'input组件',
              link: '/components/input/base.md',
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
    // light: #f9fafb, dark: --vp-code-block-bg
    theme: { light: 'github-light', dark: 'github-dark' },
    config: (md) => mdPlugin(md),
  },
})
