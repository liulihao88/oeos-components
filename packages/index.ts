import './styles/index.scss'
import { toLine } from './utils'

// 全局注册vue-tippy
import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/light.css'
import VueTippy from 'vue-tippy'

import registerDirectives from './directives/gDirectives.js'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import * as utils from './utils'

import OSvg from './components/svg'
console.log(`45 import.meta`, import.meta);

console.log(`81 import.meta`, import.meta);
const componentsGlobal = import.meta.globEager('./components/*/index.ts') // 引入全局基础组件
console.log(`86 componentsGlobal`, componentsGlobal);
console.log(`85 componentsGlobal`, componentsGlobal);
const componentsCompany = import.meta.globEager('./components/company/*/index.ts') // 引入公司内部组件
console.log(`63 componentsCompany`, componentsCompany);

// const allComponents = {
//   ...componentsGlobal,
//   ...componentsCompany,
// }

// Create an object to export all components
const componentsExport = {}
Object.keys(componentsGlobal).forEach((key) => {
  const component = componentsGlobal[key].default
  const componentName = component.name || 'o' + component.__name
  componentsExport[componentName] = component
})
Object.keys(componentsCompany).forEach((key) => {
  const component = componentsCompany[key].default
  const componentName = component.name || 'o' + component.__name
  componentsExport[componentName] = component
})

// 按需导入
export { componentsExport, OSvg }
console.log(`64 componentsExport`, componentsExport)
const install = (app) => {
  registerDirectives(app)
  Object.keys(componentsGlobal).forEach((key) => {
    let component = componentsGlobal[key].default
    app.component(component.name || 'o' + component.__name, component)
  })
  Object.keys(componentsCompany).forEach((key) => {
    let component = componentsCompany[key].default
    app.component(component.name || 'o' + component.__name, component)
  })
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(`el-icon-${toLine(key)}`, component)
  }
  app.use(VueTippy)
}

// @ts-ignore
if (typeof window !== 'undefined' && window.Vue) {
  // @ts-ignore
  install(window.Vue)
}

export * from './utils'

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
  utils,
}
