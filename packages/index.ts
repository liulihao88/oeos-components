import './styles/index.scss'
import { toLine } from './utils'

// 全局注册vue-tippy
import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/light.css'
import VueTippy from 'vue-tippy'

import registerDirectives from './directives/gDirectives.js'
import OCompTitle from './components/compTitle'
import OCheckbox from './components/checkbox/Checkbox.vue'
import OChooseArea from './components/ChooseArea/chooseArea.vue'
import ODescription from './components/description/Description.vue'
import ODialog from './components/dialog/Dialog.vue'
import ODrawer from './components/drawer/Drawer.vue'
import ODateRange from './components/dateRange/DateRange.vue'
import OEmpty from './components/empty/Empty.vue'
import OForm from './components/form/Form.vue'
import OIcon from './components/icon'
import OInput from './components/input/Input.vue'
import OInputLabel from './components/inputLabel/InputLabel.vue'
import OPopconfirm from './components/popconfirm/Popconfirm.vue'
import OProgress from './components/progress/Progress.vue'
import ORadio from './components/radio/Radio.vue'
import OSelect from './components/select/Select.vue'
import OSvg from './components/svg/Svg.vue'
import OTable from './components/table/Table.vue'
import OText from './components/text/Text.vue'
import OTabs from './components/tabs/Tabs.vue'
import OTitle from './components/title'
import OTooltip from './components/tooltip/Tooltip.vue'
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
  OSvg,
  OIcon,
  OInput,
  OInputLabel,
  OTable,
  OText,
  OTabs,
  OTooltip,
  OTitle,
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
  OSvg,
  OTable,
  OText,
  OTabs,
  OTooltip,
  OTitle,
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
