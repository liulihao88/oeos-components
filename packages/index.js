import Test from './components/Test.vue'
import Button from './components/button/Button.vue'
import Empty from './components/empty/Empty.vue'
import Title from './components/title/Title.vue'

import './styles/gStyle.scss'

export const comps = [Test, Button, Empty, Title]

const install = (app) => {
  comps.map((v) => {
    let baseName = v.__name ?? v.name
    let compName = 'o' + baseName.charAt(0).toUpperCase() + baseName.slice(1)
    app.component(compName, v)
  })
}

export default install
