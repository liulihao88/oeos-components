<script setup lang="ts">
import { ref, getCurrentInstance, computed, onMounted, shallowRef, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
console.log(`%c 12行 example/App.vue router`, 'color:blue', router)
const route = useRoute()
console.log('route', route)
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
    let finalName = 'o' + (splitName.charAt(0).toUpperCase() + splitName.slice(1))
    componentNameList.value.push(finalName)
    componentList.value[finalName] = module.default || module
  }
}

const hash = ref()
function navChange(name) {
  console.log('name', name)
  hash.value = name
}
watch(
  () => window.location.hash,
  (val) => {
    console.log('val', val)
  },
  {
    deep: true,
    immediate: true,
  },
)
onMounted(() => {
  const url = window.location.href
  console.log('url', url)
  hash.value = window.location.hash
  console.log('hash', hash)
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
          :class="{ active: v === hash.replace('#', '') }"
          @click="navChange(v)"
          v-text="v"
        ></a>
      </div>
    </div>
    <div class="r">
      <div v-for="(v, i, idx) in componentList" :id="componentNameList[idx]" class="comp-box" :key="i">
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
      margin-bottom: 40px;
      background-color: #aaa;
      padding: 40px;
      height: calc(100vh - 40px);
      box-shadow: rgb(64 158 255 / 20%) 0 1px 10px;
    }
  }
}
</style>
