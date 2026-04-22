<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type { OTableButton, OTableColumn, TableRender, TableRow, TableScope } from './types'
export default defineComponent({
  name: 'RenderComp',
  props: {
    render: Function as PropType<TableRender>,
    scope: Object as PropType<TableScope>,
    row: Object as PropType<TableRow>,
    value: {
      type: [Object, String, Number, Boolean, Array] as PropType<any>,
      default: undefined,
    },
    column: Object as PropType<OTableColumn>,
    action: Object as PropType<OTableButton>,
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
