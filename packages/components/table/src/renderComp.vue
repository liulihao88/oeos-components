<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'RenderComp',
  props: {
    render: Function,
    scope: Object,
    row: Object,
    value: [Object, String, Number],
  },
  render(ctx) {
    return ctx.render(ctx?.row, ctx?.scope, ctx?.value)
  },
})
</script>
