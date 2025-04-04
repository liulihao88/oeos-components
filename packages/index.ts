import './styles/index.scss'
import { toLine } from './utils/index.ts'

// 全局注册vue-tippy
import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/light.css'
import VueTippy from 'vue-tippy'

import registerDirectives from './directives/gDirectives.js'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import * as utils from './utils/index.ts'

import OSvg from './components/svg/index.ts'
const componentsGlobal = {}
const globalModules = import.meta.glob('./components/*/index.ts') // 引入全局基础组件
const companyModules = import.meta.glob('./components/company/*/index.ts') // 引入公司内部组件
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

// 按需导入
export { OSvg }
const install = async (app) => {
  registerDirectives(app)

  // Load global components
  const globalComponents = await loadComponents(globalModules)
  // Load company components
  const companyComponents = await loadComponents(companyModules)

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

export * from './utils/index.ts'

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
