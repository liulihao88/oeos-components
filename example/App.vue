<script setup lang="ts">
import { ref, getCurrentInstance, computed, onMounted, shallowRef } from 'vue'
import _ from 'lodash-es'
const { proxy } = getCurrentInstance()
const modules = import.meta.glob('./views/**/*.vue')
console.log('modules', modules)
const componentList = shallowRef({})
const componentNameList = ref([])
async function importComps() {
  for (const path in modules) {
    const module = await modules[path]()
    let splitName = path.replace(/^\.\/views\/(.*)\/(.*)+$/, '$1')
    console.log('splitName', splitName)
    let finalName =
      'test' + (splitName.charAt(0).toUpperCase() + splitName.slice(1))
    componentNameList.value.push(finalName)
    componentList.value[finalName] = module.default || module
  }
}

onMounted(() => {
  importComps()
})
</script>

<template>
  <div class="box">
    <div class="l">
      <div v-for="(v, i) in componentNameList" :key="i">
        <div>{{ v }}</div>
      </div>
    </div>
    <div class="r">
      <div v-for="(v, i) in componentList" class="comp-box" :key="i">
        <component :is="v"></component>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.box {
  width: 100%;
  background-color: #fff;
  .l {
    flex: 1;
    // overflow-y: scroll;
    position: absolute;
    width: 200px;
  }
  .r {
    flex: 9;
    background-color: lightblue;
    position: relative;
    margin-left: 200px;
  }
  .comp-box {
    border: 1px solid #eee;
    margin: 40px 0;
    background-color: #aaa;
    padding: 40px;
    box-shadow: rgb(64 158 255 / 20%) 0 1px 10px;
  }
}
</style>
