import './styles/index.scss'

// 全局注册vue-tippy
import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/light.css'
import VueTippy from 'vue-tippy'

import registerDirectives from './directives/gDirectives.js'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import * as utils from './utils/src/index.ts'
export * from './utils/src/index.ts'

import OSvg from './components/svg/index.ts'

const componentsGlobal = import.meta.glob('./components/*/index.ts', { eager: true, import: 'default' }) // 引入全局基础组件
const componentsCompany = import.meta.glob('./components/company/*/index.ts', { eager: true, import: 'default' }) // 引入公司内部组件

const allComponents = {
  ...componentsGlobal,
  ...componentsCompany,
}

// 1. 批量导出所有组件（作为命名导出）
export const components = Object.entries(allComponents).reduce((acc, [key, component]) => {
  const name = component.name || 'o' + component.__name
  acc[name] = component
  return acc
}, {})

// 按需导入
export { OSvg }
const install = (app) => {
  Object.keys(allComponents).forEach((key) => {
    let component = allComponents[key]
    app.component(component.name || 'o' + component.__name, component)
  })
  registerDirectives(app)

  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(`el-icon-${utils.toLine(key)}`, component)
  }
  app.use(VueTippy)
}

// @ts-ignore
if (typeof window !== 'undefined' && window.Vue) {
  // @ts-ignore
  install(window.Vue)
}


export function createSvg(iconDirs) {
  let res = {
    Svg: (props) => ({
      component: OSvg,
      props: { ...props, iconDirs }, // 将 iconDirs 传递给 SvgIcon 组件
    }),
  }
  return res
}

export { utils }

export default {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,
  ...components,
  utils,
}
