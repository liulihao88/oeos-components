<script lang="ts">
import { defineComponent, h } from 'vue'
export default defineComponent({
  name: 'RenderComp',
  props: {
    render: Function,
    item: Object,
  },
  render(ctx) {
    // 如果 render 函数存在，调用它并传递 item 参数
    if (ctx.render) {
      return ctx.render(ctx?.item)
    }
    // 返回空节点
    return h('div')
  },
})
</script>