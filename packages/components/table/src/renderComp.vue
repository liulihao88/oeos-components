<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'RenderComp',
  props: {
    render: Function,
    scope: Object,
    row: Object,
    value: [Object, String, Number],
    column: Object,
    action: Object,
    index: Number,
  },
  render(ctx) {
    return ctx.render?.({
      row: ctx?.row,
      scope: ctx?.scope,
      value: ctx?.value,
      column: ctx?.column,
      action: ctx?.action,
      index: ctx?.index,
    })
  },
})
</script>
