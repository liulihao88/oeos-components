// import { defineConfig } from 'vitepress'
// import { mdPlugin } from './config/plugins.ts'
// export default defineConfig({
//   // 站点级选项
//   title: 'oeos-v3-components组件文档',
//   lang: 'cn-ZH',
//   description:
//     '前端组件库文档, 使用vue3+typescript+element-plus构建, 主要是对element-plus的二次封装',
//   lastUpdated: true,
//   themeConfig: {
//     nav: [
//       {
//         text: '安装指南',
//         link: '/components/',
//       },
//       { text: '基础组件', link: '/components/TSelect/base.md' },
//       {
//         text: 'GitHub地址',
//         link: 'https://github.com/wocwin/t-ui-plus',
//       },
//       {
//         text: 'Gitee码云地址',
//         link: 'https://gitee.com/wocwin/t-ui-plus',
//       },
//       {
//         text: '博客',
//         items: [
//           { text: 'CSDN', link: 'https://blog.csdn.net/cwin8951' },
//           {
//             text: '掘金',
//             link: 'https://juejin.cn/user/888061128344087/posts',
//           },
//         ],
//       },
//     ],
//     // 主题级选项
//     sidebar: [
//       {
//         text: 'Basic基础组件',
//         items: [
//           {
//             text: 'button组件',
//             link: '/components/button/index',
//           },
//           {
//             text: 'dialog组件',
//             link: '/components/dialog/index',
//           },
//           {
//             text: 'dateRange组件',
//             link: '/components/dateRange/index',
//           },
//           {
//             text: 'drawer组件',
//             link: '/components/drawer/index',
//           },
//         ],
//       },
//       {
//         text: 'Others',
//         items: [],
//       },
//     ],
//   },
//   markdown: {
//     // headers: {
//     //   level: [0, 0],
//     // },
//     // light: #f9fafb, dark: --vp-code-block-bg
//     // theme: { light: 'github-light', dark: 'github-dark' },
//     // config: (md) => mdPlugin(md),
//     config: (md) => md,
//   },
// })

export default {
  // 站点级选项
  title: 'oeos-v3-components组件文档1111111',
  lang: 'cn-ZH',
  description:
    '前端组件库文档, 使用vue3+typescript+element-plus构建, 主要是对element-plus的二次封装',
  themeConfig: {
    nav: [
      {
        text: '安装指南',
        link: '/components/dialog',
      },
      { text: '基础组件', link: '/components/TSelect/base.md' },
      {
        text: 'GitHub地址',
        link: 'https://github.com/wocwin/t-ui-plus',
      },
      {
        text: 'Gitee码云地址',
        link: 'https://gitee.com/wocwin/t-ui-plus',
      },
      {
        text: '博客',
        items: [
          { text: 'CSDN', link: 'https://blog.csdn.net/cwin8951' },
          {
            text: '掘金',
            link: 'https://juejin.cn/user/888061128344087/posts',
          },
        ],
      },
    ],
    // 主题级选项
    sidebar: [
      {
        text: 'Basic基础组件',
        items: [
          {
            text: 'button组件',
            link: '/components/button/index',
          },
          {
            text: 'dialog组件',
            link: '/components/dialog/index',
          },
          {
            text: 'dateRange组件',
            link: '/components/dateRange/index',
          },
          {
            text: 'drawer组件',
            link: '/components/drawer/index',
          },
        ],
      },
      {
        text: 'Others',
        items: [],
      },
    ],
  },
}
