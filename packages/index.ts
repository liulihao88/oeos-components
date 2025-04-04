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
console.log(`45 import.meta`, import.meta)

console.log(`81 import.meta`, import.meta)
const componentsGlobal = {}
const globalModules = import.meta.glob('./components/*/index.ts') // 引入全局基础组件
console.log(`85 globalModules`, globalModules)

// for (const path in globalModules) {
const componentsCompany = {}
console.log(`93 import.meta`, import.meta);
const companyModules = import.meta.glob('./components/company/*/index.ts') // 引入公司内部组件
console.log(`61 companyModules`, companyModules)
// for (const path in companyModules) {
//   console.log(`58 path`, path)
//   companyModules[path]().then((module) => {
//     componentsCompany[path] = module
//   })
// }
for (const path in globalModules) {
  globalModules[path]().then((module) => {
    componentsGlobal[path] = module
  })
}
async function loadComponents(modules: Record<string, () => Promise<any>>) {
  const components = {}
  for (const path in modules) {
    const module = await modules[path]()
    components[path] = module
  }
  return components
}

// // Create an object to export all components
// const componentsExport = {}
// console.log(`83 componentsGlobal`, componentsGlobal);
// console.log(`83 Object.keys(componentsGlobal)`, Object.keys(componentsGlobal));

// Object.keys(componentsGlobal).forEach((key) => {
//   console.log(`16 key`, key)
//   const component = componentsGlobal[key].default
//   console.log(`85 component`, component)
//   const componentName = component.name || 'o' + component.__name
//   componentsExport[componentName] = component
// })
// Object.keys(componentsCompany).forEach((key) => {
//   const component = componentsCompany[key].default
//   const componentName = component.name || 'o' + component.__name
//   componentsExport[componentName] = component
// })

// 按需导入
export { OSvg }
const install = async (app) => {
  registerDirectives(app)

  // Load global components
  const globalComponents = await loadComponents(globalModules)
  console.log(`83 globalComponents`, globalComponents)
  console.log(`83 Object.keys(globalComponents)`, Object.keys(globalComponents))

  // Load company components
  const companyComponents = await loadComponents(companyModules)
  console.log(`63 companyComponents`, companyComponents)

  // Combine all components
  const allComponents = {
    ...globalComponents,
    ...companyComponents,
  }

  // Register components
  for (const key in allComponents) {
    const component = allComponents[key].default
    const componentName = component.name || 'o' + component.__name
    app.component(componentName, component)
  }

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
