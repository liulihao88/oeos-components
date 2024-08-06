<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'RenderComp',
  props: {
    render: Function,
    item: Object,
  },
  render(ctx) {
    console.log(`47 ctx`, ctx);
    return ctx.render(ctx?.item)
  },
})
</script>
