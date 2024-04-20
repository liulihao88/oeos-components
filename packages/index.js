import { toLine } from '@/utils/index.js'

import registerDirectives from './directives/gDirectives.js'
import Checkbox from './components/checkbox/Checkbox.vue'
import ChooseArea from './components/ChooseArea/chooseArea.vue'
import Dialog from './components/dialog/Dialog.vue'
import Drawer from './components/drawer/Drawer.vue'
import DateRange from './components/dateRange/DateRange.vue'
import Empty from './components/empty/Empty.vue'
import Form from './components/form/Form.vue'
import Icon from './components/icon/Icon.vue'
import Input from './components/input/Input.vue'
import InputLabel from './components/inputLabel/InputLabel.vue'
import Popover from './components/popover/Popover.vue'
import Progress from './components/progress/Progress.vue'
import Radio from './components/radio/Radio.vue'
import Select from './components/select/Select.vue'
import Tabs from './components/tabs/Tabs.vue'
import Title from './components/title/Title.vue'
import Tooltip from './components/tooltip/Tooltip.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import * as utils from './utils'

const comps = [
  Checkbox,
  ChooseArea,
  Dialog,
  Drawer,
  DateRange,
  Empty,
  Form,
  Popover,
  Progress,
  Radio,
  Select,
  Icon,
  Input,
  InputLabel,
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
}

export { utils }
export * from './utils'
export default {
  finalComps,
  install,
  utils,
}
