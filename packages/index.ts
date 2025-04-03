import './styles/index.scss'
import { toLine } from './utils'

// 全局注册vue-tippy
import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/light.css'
import VueTippy from 'vue-tippy'

import registerDirectives from './directives/gDirectives.js'
import OCompTitle from './components/compTitle'
import OCheckbox from './components/checkbox'
import OChooseArea from './components/chooseArea'
import ODateRange from './components/dateRange'
import ODescription from './components/description'
import ODialog from './components/dialog'
import ODrawer from './components/drawer'
import OEmpty from './components/empty'
import OForm from './components/form'
import OIcon from './components/icon'
import OInput from './components/input'
import OInputLabel from './components/inputLabel'
import OPopconfirm from './components/popconfirm'
import OProgress from './components/progress'
import ORadio from './components/radio'
import OSelect from './components/select'
import OSwitch from './components/switch'
import OSvg from './components/svg'
import OTable from './components/table'
import OText from './components/text'
import OTabs from './components/tabs'
import OTitle from './components/title'
import OTooltip from './components/tooltip'
import OWarning from './components/warning'
import OBasicLayout from './components/company/basicLayout'
import OCapacityProgress from './components/company/capacityProgress'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import * as utils from './utils'

const components = [
  OCompTitle,
  OCheckbox,
  OChooseArea,
  ODescription,
  ODialog,
  ODrawer,
  ODateRange,
  OEmpty,
  OForm,
  OPopconfirm,
  OProgress,
  ORadio,
  OSelect,
  OSwitch,
  OSvg,
  OIcon,
  OInput,
  OInputLabel,
  OTable,
  OText,
  OTabs,
  OTooltip,
  OTitle,
  OWarning,
  OBasicLayout,
  OCapacityProgress,
]

// 按需导入
export {
  OCompTitle,
  OCheckbox,
  OChooseArea,
  ODescription,
  ODialog,
  ODrawer,
  ODateRange,
  OEmpty,
  OForm,
  OIcon,
  OInput,
  OInputLabel,
  OPopconfirm,
  OProgress,
  ORadio,
  OSelect,
  OSwitch,
  OSvg,
  OTable,
  OText,
  OTabs,
  OTooltip,
  OTitle,
  OWarning,
  OBasicLayout,
  OCapacityProgress,
}

const install = (app) => {
  registerDirectives(app)
  components.forEach((comp: any) => {
    let name = comp.name || 'o' + comp.__name
    app.component(name, comp)
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
