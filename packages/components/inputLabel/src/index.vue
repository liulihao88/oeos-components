<script setup lang="ts" name="OInputLabel">
import { ref, watch } from 'vue'
import OInput from '@/components/input'
import OIcon from '@/components/icon'
import { notEmpty, $toast } from '@/utils/src'

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
  regexp: {
    tupe: RegExp,
    default: '',
  },
  message: {
    tupe: String,
    default: '输入有误',
  },
  inputAttrs: {
    type: Object,
    default: () => {
      return {}
    },
  },
})

const emit = defineEmits(['update:modelValue'])

watch(
  () => props.modelValue,
  (mVal) => {
    if (mVal && mVal.length > 0) {
      labelarr.value = []
      for (let i = 0; i < mVal.length; i++) {
        if (!props.isComplex && notEmpty(mVal[i])) {
          labelarr.value.push(mVal[i])
        } else {
          if (notEmpty(mVal[i]) && notEmpty(mVal[i]?.name)) {
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
  console.log(`props.regexp`, props.regexp)
  console.log(`currentval.value`, currentval.value)
  if (props.regexp) {
    if (!props.regexp.test(currentval.value)) {
      return $toast(props.message, 'e')
    }
  }

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

const blurInput = ()=>{
  if(currentval.value){
    addlabel()
  }
}

defineExpose({
  $getValue,
})
</script>

<template>
  <div class="o-input-box cl-blue">
    <div class="o-input-box__content">
      <div v-for="(item, index) in labelarr" :key="index" :class="item.isDelete === 0 ? 'disbox' : 'spanbox'">
        <span>{{ item.name || item }}</span>
        <i class="spanclose" style="cursor: not-allowed" v-if="item.isDelete === 0"></i>
        <i v-else class="spanclose" @click="removeitem(index, item)"></i>
      </div>
      <o-input
        :placeholder="props.inputAttrs.placeholder || '输入后回车'"
        :width="props.inputAttrs.width || 120"
        v-model.trim="currentval"
        @keyup.enter.stop="addlabel"
        @blur="blurInput"
        clearable
        type="text"
        v-bind="props.inputAttrs"
      />
    </div>
    <o-icon name="circle-close" class="o-input-label__clear" v-if="labelarr.length > 0" @click="clearAll"></o-icon>
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
  &:hover {
    .o-input-label__clear {
      display: block;
    }
  }
}

.o-input-box__content {
  border-radius: 6px;
  text-align: left;
  font-size: 0;
  .o-input {
    width: unset;
    margin: 2px;
  }
}
.spanbox {
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
}

:deep(.el-form-item__content .o-input-box) {
  width: 100% !important;
  max-width: 100% !important;
}
.o-input-label__clear {
  position: absolute;
  right: 4px;
  display: none;
  width: 16px;
  height: 16px;
  bottom: calc(50% - 8px);
  cursor: pointer;
  &:hover {
    color: red;
  }
}
</style>
