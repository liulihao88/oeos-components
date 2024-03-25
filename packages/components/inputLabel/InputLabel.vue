<script setup lang="ts">
import { ref, watch, getCurrentInstance } from 'vue'
import { $toast, isEmpty } from '../../utils'
import { CircleClose } from '@element-plus/icons-vue'
const currentval = ref('')
const labelarr = ref([])

const props = defineProps({
  modelValue: {
    type: Array,
    default() {
      return []
    },
  },
  // 简单的就直接传基本数据类型, 复杂的需要传引用数据类型, 默认是简单数据
  isComplex: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])

watch(
  () => props.modelValue,
  (mVal) => {
    if (mVal && mVal.length > 0) {
      labelarr.value = []
      for (let i = 0; i < mVal.length; i++) {
        if (!props.isComplex && !isEmpty(mVal[i])) {
          labelarr.value.push(mVal[i])
        } else {
          if (!isEmpty(mVal[i]) && !isEmpty(mVal[i]?.name)) {
            labelarr.value.push(mVal[i])
          }
        }
      }
    } else {
      labelarr.value = []
    }
  },
  {
    immediate: true,
  },
)

function removeitem(index, item) {
  labelarr.value.splice(index, 1)
  emit('update:modelValue', labelarr.value)
}
// input回车加入labelarr中
function addlabel() {
  if (!currentval.value) {
    return false
  }
  let hasValue = false
  for (let i = 0; i < labelarr.value.length; i++) {
    if (props.isComplex) {
      if (labelarr.value[i]?.name == currentval.value) {
        hasValue = true
        break
      }
    } else {
      if (labelarr.value[i] == currentval.value) {
        hasValue = true
        break
      }
    }
  }

  if (!hasValue) {
    if (typeof currentval.value === 'string' && props.isComplex) {
      labelarr.value.push({ name: currentval.value })
    } else {
      labelarr.value.push(currentval.value)
    }
    currentval.value = ''
    emit('update:modelValue', labelarr.value)
  } else {
    $toast('重复项不允许添加', 'e')
  }
}

function $getValue() {
  return labelarr.value
}
function clearAll() {
  emit('update:modelValue', [])
}

defineExpose({
  $getValue,
})
</script>

<template>
  <div class="o-input-box">
    <div class="o-input-box__content">
      <div
        v-for="(item, index) in labelarr"
        :key="index"
        :class="item.isDelete === 0 ? 'disbox' : 'spanbox'"
      >
        <span>{{ item.name || item }}</span>
        <i
          class="spanclose"
          style="cursor: not-allowed"
          v-if="item.isDelete === 0"
        ></i>
        <i v-else class="spanclose" @click="removeitem(index, item)"></i>
      </div>
      <o-input
        placeholder="输入后回车"
        width="100"
        v-model="currentval"
        @keyup.enter="addlabel"
        clearable
        class="input"
        type="text"
      />
    </div>
    <CircleClose
      class="o-input-label__clear"
      v-if="labelarr.length > 0"
      @click="clearAll"
    ></CircleClose>
  </div>
</template>

<style scoped lang="scss">
.o-input-box {
  background-color: white;
  font-size: 12px;
  position: relative;
  border: 1px solid #dcdee2;
  border-radius: 6px;
  margin-bottom: 18px;
  padding: 6px 20px 6px 6px;
  text-align: left;
  font-size: 0;
  width: 100% !important;
  margin-bottom: 0;
  .input {
    font-size: 14px;
    border: none !important;
    box-shadow: none;
    outline: none;
    background-color: transparent;
    padding: 0;
    margin: 0;
    width: auto !important;
    max-width: inherit;
    vertical-align: top;
    height: 30px;
    color: #34495e;
    margin: 2px;
    line-height: 30px;
  }
}

.o-input-box__content {
  border-radius: 6px;
  text-align: left;
  font-size: 0;
}
.spanbox {
  line-height: 30px;
  margin: 2px;
  padding: 0 10px;
  background-color: #1abc9c;
  color: white;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
  display: inline-block;
  position: relative;
  vertical-align: middle;
  overflow: hidden;
  transition: 0.25s linear;
}
.spanbox:hover {
  padding: 0px 17px 0 3px;
}
.spanclose {
  color: white;
  padding: 0 10px 0 0;
  cursor: pointer;
  font-size: 12px;
  position: absolute;
  right: -3px;
  text-align: right;
  text-decoration: none;
  top: 0;
  width: 100%;
  bottom: 0;
  z-index: 2;
  opacity: 0;
  filter: 'alpha(opacity=0)';
  transition: opacity 0.25s linear;
  font-style: normal;
}
.disbox {
  line-height: 30px;
  margin: 2px;
  padding: 0 10px;
  background-color: var(--gray);
  color: white;
  border-radius: 4px;
  font-size: 13px;
  cursor: not-allowed;
  display: inline-block;
  position: relative;
  vertical-align: middle;
  overflow: hidden;
  transition: 0.25s linear;
}
.spanbox:hover .spanclose {
  padding: 0 10px 5px 0;
  opacity: 1;
  -webkit-filter: none;
  filter: none;
}
.spanclose:after {
  content: 'x';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 27px;
}

:deep(.el-form-item__content .o-input-box) {
  width: 100% !important;
  max-width: 100% !important;
}
.o-input-label__clear {
  position: absolute;
  right: 4px;
  width: 16px;
  height: 16px;
  bottom: calc(50% - 8px);
  cursor: pointer;
  &:hover {
    color: red;
  }
}
</style>
