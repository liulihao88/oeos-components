import DefaultTheme from 'vitepress/theme'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import locale from 'element-plus/es/locale/lang/zh-cn'
import { h } from 'vue'
import '/public/css/index.css'
import './assets/styles/index.css'

// 图标并进行全局注册
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import * as echarts from 'echarts' // 引入echarts

import OTip from '../vitepress/components/oTip/index.vue'
import ChangelogContent from './components/ChangelogContent.vue'

import { VPDemo } from '../vitepress'
import * as utils from '@/utils/src/index.ts'
import Logo from './logo.vue'
import VueTippy from 'vue-tippy'

// 基于element-plus二次封装基础组件
import '../../../packages/styles/index.scss'
// import '../../../packages/styles/utilities.scss'

// import 'virtual:svg-icons-register'
import 'virtual:svg-icons-register'

export default {
  ...DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'nav-bar-title-before': () => h(Logo),
    })
  },
  async enhanceApp(ctx) {
    const { default: OeosComponents, createSvg } = import.meta.env.DEV
      ? await import('@/index.ts')
      : await import('~dist/oeos-components-es.js')
    const svgIconConfig = createSvg(
      './assets/svg', // 指定本地 SVG 文件夹路径
    )

    ctx.app.config.globalProperties.$echarts = echarts // 全局使用
    // 将oeos-v3-components下的公共函数赋值到全局
    Object.keys(utils).forEach((v) => {
      ctx.app.config.globalProperties[v] = utils[v]
    })
    // 注册所有图标
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      ctx.app.component(key, component)
    }
    ctx.app.component('OooSvg', svgIconConfig.Svg({}).component)
    ctx.app.component('OTip', OTip)
    ctx.app.component('ChangelogContent', ChangelogContent)
    // 注册ElementPlus
    ctx.app.use(ElementPlus, {
      locale, // 语言设置
    })
    // 全局注册基础组件
    ctx.app.use(OeosComponents)
    ctx.app.use(VueTippy)

    ctx.app.component('Demo', VPDemo)
    DefaultTheme.enhanceApp(ctx)
  },
}
