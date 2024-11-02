<template>
  <div class="o-input" v-bind="subAttrs" :style="{ ...handleWidth() }">
    <el-tooltip :content="'' + data" :disabled="inWidth || hideTooltip" v-bind="tooltipAttrs">
      <div>
        <el-autocomplete
          v-if="props.options"
          :fetch-suggestions="querySearch"
          :placeholder="handlePlaceholder()"
          :clearable="$attrs.clearable !== false"
          v-bind="$attrs"
          v-model="data"
          @mouseover.native="inputOnMouseOver($event)"
        >
          <template v-if="$attrs.title" #prepend>
            <div v-bind="titleAttrs">
              {{ $attrs.title }}
            </div>
          </template>
        </el-autocomplete>

        <el-input
          v-bind="$attrs"
          v-else
          :placeholder="handlePlaceholder()"
          class="kd-ipt"
          v-model="data"
          :showPassword="showPassword"
          :clearable="$attrs.clearable !== false"
          :class="{ 'kd-textarea': $attrs.type === 'textarea' }"
          :maxlength="handleMaxLength"
          :rows="$attrs.rows || 2"
          resize="none"
          height="100px"
          :show-word-limit="handleShowWordLimit()"
          @focus="focusHandler($event)"
          @mouseover.native="inputOnMouseOver($event)"
        >
          <template v-if="$attrs.title" #prepend>
            <div v-bind="titleAttrs">
              {{ $attrs.title }}
            </div>
          </template>
          <!-- 插槽默认内容 -->
          <slot></slot>

          <!-- 前缀插槽 -->
          <template v-if="$slots.prefix" v-slot:prefix>
            <slot name="prefix"></slot>
          </template>

          <!-- 后缀插槽 -->
          <template v-if="$slots.suffix" v-slot:suffix>
            <slot name="suffix"></slot>
          </template>

          <!-- 后置插槽 -->
          <template v-if="$slots.append" v-slot:append>
            <slot name="append"></slot>
          </template>

          <!-- 前置插槽 -->
          <template v-if="$slots.prepend" v-slot:prepend>
            <slot name="prepend"></slot>
          </template>
        </el-input>
      </div>
    </el-tooltip>
    <o-icon
      v-if="content"
      class="o-input__icon"
      v-bind="{ name: 'warning', color: '#DCDEE0', size: '16px', ...props.iconAttrs }"
      :content="content"
    ></o-icon>

    <o-icon
      name="circle-close"
      class="o-input__clear"
      @click="clearTextareaValue"
      v-if="$attrs.type === 'textarea' && data && !($attrs.disabled === true || $attrs.disabled === '')"
    ></o-icon>
  </div>
</template>

<script setup lang="ts">
/**
* @使用方法
<o-input
  title="名字"
  @keyup.enter="close"
  v-model="aaa"
  width="200"
  size="default"
  :titleAttrs = "{
    onClick: close,
    style: {color: 'blue'}
  }"
  class="m-l-100"
></o-input>
*/
import { ref, getCurrentInstance, computed, useAttrs, watch } from 'vue'
import { useVModel } from '@vueuse/core'
const { proxy } = getCurrentInstance()
const attrs = useAttrs()

const props = defineProps({
  modelValue: {
    required: true,
  },
  titleAttrs: {
    type: Object,
    default: () => {},
  },
  width: {
    type: [String, Number],
    default: '100%',
  },
  showWordLimit: {
    type: [Boolean, String],
    default: '',
  },
  block: {
    type: Boolean,
    default: false,
  },
  // placeholder在disabled的情况下是不显示的. 如果想要在这种情况下显示placeholder, 那么就用这个属性
  disPlaceholder: {
    type: String,
    default: '',
  },
  subAttrs: {
    type: Object,
    default: () => {
      return {}
    },
  },
  tooltipAttrs: {
    type: Object,
    default: () => {
      return {}
    },
  },
  iconAttrs: {
    type: Object,
    default: () => {
      return {}
    },
  },
  hideTooltip: {
    type: Boolean,
    default: false,
  },
  // 适用于el-autocomplete
  options: {
    type: Array,
  },
  content: {
    type: String,
    default: '',
  },
})
const restaurants = ref([])
const inWidth = ref(true)
const data = useVModel(props)

const handleMaxLength = computed(() => {
  if (attrs.type === 'textarea') {
    return attrs.maxlength || 1000
  } else {
    return attrs.maxlength || ''
  }
})

watch(
  () => props.options,
  (val) => {
    if (!val) {
      return
    }
    restaurants.value = val.map((v) => {
      if (proxy.getType(v) === 'object') {
        return v
      } else {
        return {
          value: v,
        }
      }
    })
  },
  {
    deep: true,
    immediate: true,
  },
)

function handlePlaceholder() {
  let res = attrs.disabled === undefined ? attrs.placeholder || '请输入' : props.disPlaceholder
  return res
}
// 是否显示showWordLimit属性
function handleShowWordLimit() {
  if (typeof props.showWordLimit === 'boolean') {
    return props.showWordLimit
  }
  if (attrs.type === 'textarea') {
    return true
  }
  return false
}
// 如果是密码输入框, focus直接选中文本
function focusHandler(evt) {
  if (attrs.type === 'password') {
    // evt.currentTarget.select()
    evt.target.select()
  }
}
function inputOnMouseOver(event) {
  const target = event.target
  if (target.offsetWidth + 4 < target.scrollWidth) {
    inWidth.value = false
  } else {
    inWidth.value = true
  }
}

const handleWidth = () => {
  if (!props.width) {
    return {}
  }
  let inputWidth = proxy.processWidth(props.width, true)
  if (props.content) {
    if (inputWidth) {
      inputWidth = `calc(${inputWidth} - 32px)`
    }
  }
  return {
    width: inputWidth,
  }
}
const clearTextareaValue = () => {
  data.value = ''
}

const showPassword = computed(() => {
  if (attrs.type === 'password' && attrs.showPassword !== false) {
    return true
  }
  return false
})

// 新增对el-auto-complete的支持
const querySearch = (queryString, cb) => {
  const results = queryString ? restaurants.value.filter(createFilter(queryString)) : restaurants.value
  cb(results)
}

const createFilter = (queryString: string) => {
  return (v) => {
    return v.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
  }
}
</script>

<style lang="scss" scoped>
.o-input {
  width: 100%;
  display: inline-block;
  position: relative;
  .o-input__icon {
    position: absolute;
    right: -24px;
    top: 8px;
  }
  &:hover {
    .o-input__clear {
      display: block;
    }
  }
}
.o-input__clear {
  position: absolute;
  right: 8px;
  display: none;
  width: 14px;
  height: 14px;
  color: var(--45);
  bottom: calc(50% - 6px);
  cursor: pointer;
  &:hover {
    color: var(--blue);
  }
}

// el-input的宽度会随着鼠标移入显示clearable而改变, 所以加下面这两行代码
:deep(.o-input .el-input__suffix:not(.el-sele.o-input ct .el-input__suffix)) {
  margin-left: -22px;
}
:deep(.o-input .el-input__inner:not(.el-select .el-input__inner)) {
  padding-right: 22px;
}
:deep(.o-input .el-textarea__inner) {
  padding-bottom: 20px;
}
</style>
