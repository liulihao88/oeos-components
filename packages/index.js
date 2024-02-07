import Test from './components/Test.vue'

export const comps = [Test]

const install = (app) => {
  comps.map((v) => {
    let compName = 'o' + (v.__name ?? v.name)
    app.component(compName, v)
  })
}

export default install
