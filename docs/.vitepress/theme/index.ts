import DefaultTheme from 'vitepress/theme'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import locale from 'element-plus/es/locale/lang/zh-cn'
import { h } from 'vue'

// 图标并进行全局注册
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import * as echarts from 'echarts' // 引入echarts

import { VPDemo } from '../vitepress'
// 基于element-plus二次封装基础组件
import '~dist/style.css'
import oeosV3Components, { utils, createSvg } from '@/index.ts' // 开发时使用的入口文件
// import oeosV3Components, { utils, createSvg } from '~dist/oeos-components-es.js' // 打包后的入口文件
console.log(`55 oeosV3Components`, oeosV3Components);
import '/public/css/index.css'
import Logo from './logo.vue'
import './assets/styles/index.css'
import VueTippy from 'vue-tippy'

// import 'virtual:svg-icons-register'
const svgIconConfig = createSvg(
  './assets/svg', // 指定本地 SVG 文件夹路径
)
import 'virtual:svg-icons-register'

export default {
  ...DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'nav-bar-title-before': () => h(Logo),
    })
  },
  enhanceApp(ctx) {
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
    // 注册ElementPlus
    ctx.app.use(ElementPlus, {
      locale, // 语言设置
    })
    // 全局注册基础组件
    ctx.app.use(oeosV3Components)
    ctx.app.use(VueTippy)


    ctx.app.component('Demo', VPDemo)
    DefaultTheme.enhanceApp(ctx)
  },
}
