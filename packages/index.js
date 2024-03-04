import registerDirectives from './directives/gDirectives.js'
import Empty from './components/empty/Empty.vue'
import Title from './components/title/Title.vue'
import Dialog from './components/dialog/Dialog.vue'
import Drawer from './components/drawer/Drawer.vue'
import Select from './components/select/Select.vue'
import DateRange from './components/dateRange/DateRange.vue'
import Input from './components/input/Input.vue'
import * as utils from './utils/gFunc.js'

const comps = [Empty, Title, Dialog, Drawer, Select, DateRange, Input]
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
}

export { utils }
export * from './utils/gFunc.js'
export default {
  finalComps,
  install,
  utils,
}
