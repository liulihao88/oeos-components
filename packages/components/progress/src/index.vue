<template>
  <div class="o-progress">
    <el-progress
      :percentage="percentageVal"
      v-bind="{ ...originAttrs, ...$attrs }"
      :color="$attrs.color || customColorMethod(percentageVal)"
    >
      <slot :percentage="percentageVal"></slot>
    </el-progress>
  </div>
</template>

<script lang="ts" setup name="OProgress">
import { ref, watch } from 'vue'

const props = defineProps({
  // 进度条百分比
  percentage: {
    type: Number,
    required: true,
  },
  // 动画时间
  animationTime: {
    type: Number,
    default: 500,
  },
  // 是否开启动画
  isAnimation: {
    type: Boolean,
    default: true,
  },
  customColor: {
    type: Boolean,
    default: true, // 是否开启自定义颜色, 不开启则使用el-progress默认颜色
  },
})

const originAttrs = {
  'stroke-width': 16,
}

const percentageVal = ref<number>(0)
const animation = () => {
  let t = Math.ceil(props.animationTime / props.percentage)
  let timer = setInterval(() => {
    percentageVal.value = Number(percentageVal.value) + 1
    if (percentageVal.value >= props.percentage || percentageVal.value >= 100) {
      percentageVal.value = props.percentage >= 100 ? 100 : props.percentage
      clearInterval(timer)
    }
  }, t)
}

const customColorMethod = (percentage: number) => {
  if (props.customColor) {
    if (percentage < 30) {
      return '#909399'
    }
    if (percentage < 70) {
      return '#e6a23c'
    }
    return '#67c23a'
  } else {
    return ''
  }
}
watch(
  () => props.percentage,
  (val) => {
    if (props.isAnimation) {
      animation()
    }
  },
  {
    immediate: true,
  },
)
</script>

<style lang="scss" scoped>
.o-progress {
  width: 100%;
}
</style>
