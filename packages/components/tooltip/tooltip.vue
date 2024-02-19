<template>
  <el-tooltip
    effect="dark"
    :disabled="isShowTooltip"
    :placement="placement"
    popper-class="cus-tooltip"
    v-bind="$attrs"
  >
    <span
      v-if="!slotShow"
      class="hide-text"
      :style="{ maxWidth: width }"
      @mouseover="onMouseOver('str')"
    >
      <span ref="str">{{ $attrs.content }}</span>
    </span>
    <slot></slot>
  </el-tooltip>
</template>

<script>
/**
* @使用方法
<o-tooltip :content="val.label" placement="top" width="60px"></o-tooltip>
<o-tooltip content="再来一次" width="60px" slotShow placement="left" >
  <div class="w-40 h-40 f-ar bg-white o-9 br-50%">
    <img src="@/assets/images/logo.png" class="w-16 h-16" />
  </div>
</o-tooltip>
*/
export default {
  name: 'KdTooltip',
  components: {},
  props: {
    width: {
      // 超过此宽度省略号显示
      type: String,
      default: () => {
        return '100%'
      },
    },
    slotShow: {
      // 是否显示插槽
      type: Boolean,
      default: () => {
        return false
      },
    },
    placement: {
      type: String,
      default: 'top',
    },
  },
  data() {
    return {
      isShowTooltip: false,
    }
  },
  methods: {
    onMouseOver(str) {
      if (this.slotShow) return
      // 内容超出，显示文字提示内容
      const tag = this.$refs[str]
      if (!tag) return
      const parentWidth = tag.parentNode.offsetWidth // 获取元素父级可视宽度
      const contentWidth = tag.offsetWidth // 获取元素可视宽度
      this.isShowTooltip = contentWidth <= parentWidth
    },
  },
}
</script>
<style lang="scss" scoped>
.hide-text {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
