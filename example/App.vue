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
      'o' + (splitName.charAt(0).toUpperCase() + splitName.slice(1))
    componentNameList.value.push(finalName)
    componentList.value[finalName] = module.default || module
  }
}

const nowName = ref()
function navChange(name) {
  console.log('name', name)
  console.log(`%c 1102 24行 example/App.vue location `, location)
  console.log(`%c 2233 25行 example/App.vue location.href `, location.href)
  console.log(`%c 3318 26行 example/App.vue document `, document)

  console.log(`%c 5532 28行 example/App.vue window `, window)
  console.log(`%c 6662 29行 example/App.vue this `, this)

  nowName.value = name
}
onMounted(() => {
  console.log(`%c 3383 34行 example/App.vue 333 `, 333)

  importComps()
})
</script>

<template>
  <div class="box">
    <div class="l">
      <div v-for="(v, i) in componentNameList" :key="i">
        <a
          :href="`#${v}`"
          class="l-item"
          :class="{ active: v === nowName }"
          @click="navChange(v)"
          v-text="v"
        ></a>
      </div>
    </div>
    <div class="r">
      <div
        v-for="(v, i, idx) in componentList"
        :id="componentNameList[idx]"
        class="comp-box"
        :key="i"
      >
        <div class="fs-30 fw-800">
          {{ componentNameList[idx] }}
        </div>
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
    position: absolute;
    width: 200px;
    position: fixed;
    .l-item {
      margin: 20px 0;
      cursor: pointer;
      padding: 10px;
      display: block;
      &:hover {
        background-color: yellow;
      }
    }
    .active {
      color: red;
    }
  }
  .r {
    flex: 9;
    overflow: scroll;
    background-color: lightblue;
    position: relative;
    margin-left: 200px;
    .comp-box {
      border: 1px solid #eee;
      margin: 40px 0;
      background-color: #aaa;
      padding: 40px;
      height: 80vh;
      box-shadow: rgb(64 158 255 / 20%) 0 1px 10px;
    }
  }
}
</style>
