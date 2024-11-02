
import './styles/index.scss'
import { toLine } from './utils/index.ts'

// 全局注册vue-tippy
import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/light.css'
import VueTippy from 'vue-tippy'


import registerDirectives from './directives/gDirectives.js'
import CompTitle from './components/compTitle/CompTitle.vue'
import Checkbox from './components/checkbox/Checkbox.vue'
import ChooseArea from './components/ChooseArea/chooseArea.vue'
import Description from './components/description/Description.vue'
import Dialog from './components/dialog/Dialog.vue'
import Drawer from './components/drawer/Drawer.vue'
import DateRange from './components/dateRange/DateRange.vue'
import Empty from './components/empty/Empty.vue'
import Form from './components/form/Form.vue'
import Icon from './components/icon/Icon.vue'
import Input from './components/input/Input.vue'
import InputLabel from './components/inputLabel/InputLabel.vue'
import Popconfirm from './components/popconfirm/Popconfirm.vue'
import Progress from './components/progress/Progress.vue'
import Radio from './components/radio/Radio.vue'
import Select from './components/select/Select.vue'
import Svg from './components/svg/Svg.vue'
import Table from './components/table/Table.vue'
import Text from './components/text/Text.vue'
import Tabs from './components/tabs/Tabs.vue'
import Title from './components/title/Title.vue'
import Tooltip from './components/tooltip/Tooltip.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import * as utils from './utils'


const comps = [
  CompTitle,
  Checkbox,
  ChooseArea,
  Description,
  Dialog,
  Drawer,
  DateRange,
  Empty,
  Form,
  Popconfirm,
  Progress,
  Radio,
  Select,
  Svg,
  Icon,
  Input,
  InputLabel,
  Table,
  Text,
  Tabs,
  Tooltip,
  Title,
]
const finalComps = comps.map((v) => {
  let baseName = v.__name ?? v.name
  let res = 'o' + baseName.charAt(0).toUpperCase() + baseName.slice(1)
  return res
})

const install = (app) => {
  registerDirectives(app)
  finalComps.forEach((v, i) => {
    app.component(v, comps[i])
  })
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(`el-icon-${toLine(key)}`, component)
  }
  app.use(VueTippy)
}

export { utils }
export * from './utils'

export function createSvg(iconDirs) {
  let res = {
    Svg: (props) => ({
      component: Svg,
      props: { ...props, iconDirs }, // 将 iconDirs 传递给 SvgIcon 组件
    }),
  }
  return res
}



export default {
  finalComps,
  install,
  utils,
}
