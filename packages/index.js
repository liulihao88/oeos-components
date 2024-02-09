import registerDirectives from './directives/gDirectives.js'
import Test from './components/Test.vue'
import Button from './components/button/Button.vue'
import Empty from './components/empty/Empty.vue'
import Title from './components/title/Title.vue'

const comps = [Test, Button, Empty, Title]
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

export default {
  finalComps,
  install,
}
