<script setup lang="ts">
import { ref, getCurrentInstance, watch, computed } from 'vue'
const { proxy } = getCurrentInstance()
const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  columns: {
    type: Array,
    default: () => [],
  },
  showPage: {
    type: Boolean,
    default: true,
  },
  showIndex: {
    type: Boolean,
    default: true,
  },
  total: {
    type: Number,
  },
})
const tableTotal = computed(() => {
  return props.total || props.data.length
})
const emits = defineEmits(['update'])
const finalColumns = ref([])

const updateTable = () => {
  finalColumns.value = props.columns.map((item) => {
    let baseBtns = []
    let hideBtns = []
    if (item.btns) {
      item.maxBtns = item.maxBtns || 2
      item.btns = item.btns.map((v) => {
        if (v.isShow === undefined) {
          v.isShow = true
        }
        return v
      })
      if (item.btns.length > item.maxBtns) {
        baseBtns = item.btns.slice(0, item.maxBtns)
        hideBtns = item.btns.slice(item.maxBtns)
      } else {
        baseBtns = item.btns
      }
    }
    // 如果是空数组, 将item的filters设为null, 没有下拉框
    let defaultItems = {
      showOverflowTooltip: true,
      baseBtns: baseBtns, // 显示的按钮
      hideBtns: hideBtns, // 隐藏在...中的按钮
      maxBtns: item.maxBtns || 2, // 最大显示按钮个数，超出后显示...
    }
    console.log(`item`, item)
    let res = Object.assign({}, defaultItems, item)
    console.log(`res`, res)
    return res
  })
}
watch(
  () => props.columns,
  () => {
    updateTable()
  },
  {
    immediate: true,
    deep: true,
  },
)
// isShow 或者 content支持 函数或字符串两种写法。
const operatorBtnFn = (cont, row = '', scope = '') => {
  if (typeof cont === 'function') {
    if (!row) {
      return true
    }
    return cont(row, scope)
  } else {
    if (cont === undefined) {
      return true
    }
    return cont
  }
}
const parseDisabled = (disFn, row = '', scope = '') => {
  if (typeof disFn === 'function') {
    if (!row) {
      return false
    }
    return disFn(row, scope)
  } else {
    if (disFn === undefined) {
      return false
    }
    return disFn
  }
}
const currentPage = ref(1)
const pageSize = ref(10)
function handleSizeChange(val) {
  pageSize.value = val
  currentPage.value = 1
  update()
}
function handleCurrentChange(val) {
  currentPage.value = val
  update()
}
function update() {
  emits('update', { pageSize: pageSize.value, currentPage: currentPage.value })
}
defineExpose({})
</script>

<template>
  <div class="o-table">
    <el-table
      :data="props.data"
      v-bind="$attrs"
      border
      :header-cell-style="{
        background: '#f7f8fa',
        color: 'rgba(39,48,75,0.85)',
        height: '50px',
      }"
    >
      <slot />
      <el-table-column v-if="showIndex" type="index" width="50" />
      <template v-for="(v, i) in finalColumns" :key="i">
        <el-table-column v-if="v.type" :key="v.type" v-bind="{ ...v }" />
        <el-table-column
          v-else-if="v.baseBtns && v.baseBtns.length > 0"
          v-bind="{ ...{ fixed: 'right', width: 200 }, ...v }"
        >
          <template #default="scope">
            <template v-for="(val, idx) in v.baseBtns" :key="idx">
              <template v-if="val.reConfirm === true">
                <o-popconfirm trigger="click" @confirm="val.handler?.(scope.row, scope)">
                  <el-button
                    v-if="!val.confirmInfo"
                    v-bind="{ ...val }"
                    link
                    :disabled="parseDisabled(val.disabled, scope.row, scope)"
                  >
                    ??{{ operatorBtnFn(val.content, scope.row, scope) }}
                  </el-button>
                </o-popconfirm>
              </template>
              <template v-else>
                <el-button
                  v-if="!val.confirmInfo"
                  v-bind="{ ...val }"
                  link
                  :disabled="parseDisabled(val.disabled, scope.row, scope)"
                  class="linked"
                  @click.stop="val.handler?.(scope.row, scope)"
                >
                  {{ operatorBtnFn(val.content, scope.row, scope) }}
                </el-button>
              </template>
            </template>

            <template v-if="v.hideBtns.length > 0">
              <el-dropdown class="m-l-12 m-t-4" trigger="click">
                <o-icon name="more" />
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item v-for="(val, idx) in v.hideBtns" :key="idx" :hide-on-click="false">
                      <template v-if="val.reConfirm === true">
                        <o-popconfirm trigger="hover" @confirm="val.handler?.(scope.row, scope)">
                          <el-button
                            v-if="!val.confirmInfo"
                            v-bind="{ ...val }"
                            link
                            :disabled="parseDisabled(val.disabled, scope.row, scope)"
                          >
                            ??{{ operatorBtnFn(val.content, scope.row, scope) }}
                          </el-button>
                        </o-popconfirm>
                      </template>
                      <template v-else>
                        <el-button
                          v-if="!val.confirmInfo"
                          v-bind="{ ...val }"
                          link
                          class="linked"
                          :disabled="parseDisabled(val.disabled, scope.row, scope)"
                          @click.stop="val.handler?.(scope.row, scope)"
                        >
                          {{ operatorBtnFn(val.content, scope.row, scope) }}
                        </el-button>
                      </template>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </template>
          </template>
        </el-table-column>

        <el-table-column v-else v-bind="{ ...v }">
          <template #default="scope">
            <slot v-if="v.useSlot" :name="v.prop" :row="scope.row" :scope="scope" />
            <span v-else-if="v.handler" class="linked" @click.stop="v.handler(scope.row, scope)">
              <span>{{ v.filter ? v.filter(scope.row[v.prop], scope.row, scope) : scope.row[v.prop] || '-' }}??</span>
            </span>
            <span v-else-if="v.filter">
              {{ v.filter(scope.row[v.prop], scope.row, scope) }}
            </span>
            <span v-else>
              {{ scope.row[v.prop] || '-' }}
            </span>
          </template>
        </el-table-column>
      </template>
    </el-table>

    <div v-if="showPage" style="height: 64px">
      <div class="page-wrap">
        <div class="page-left">
          <span>共</span>
          <span class="m-lr-5">{{ tableTotal }}</span>
          <span>项数据</span>
        </div>
        <el-pagination
          class="tab_pagination"
          background
          :current-page="currentPage"
          :page-size="pageSize"
          :page-sizes="[10, 30, 50, 100]"
          layout="prev, pager, next, sizes, jumper"
          :total="tableTotal"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.linked {
  color: var(--blue);
  cursor: pointer;
}

.o-table {
  .page-wrap {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64px;
    padding: 0 24px;
    font-size: 12px;
    border: 1px solid #ebedf0;
    border-top-style: none;
  }

  .page-wrap .page-left {
    color: rgb(39 48 75 / 85%);
  }

  :deep(.el-table th) {
    box-sizing: border-box;
  }

  :deep(.el-table th .cell) {
    line-height: inherit;
    white-space: nowrap;
  }

  :deep(.el-table th .cell:hover) {
    white-space: normal;
  }
}
</style>
