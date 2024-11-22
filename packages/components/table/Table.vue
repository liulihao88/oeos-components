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
  pageSize: {
    type: Number,
    default: 10,
  },
  pageSizes: {
    type: Array,
    default: () => {
      return [10, 30, 50, 100]
    },
  },
  total: {
    type: Number,
  },
  emptyText: {
    type: String,
    default: '-',
  },
})
const tableRef = ref(null)
const tableTotal = computed(() => {
  return props.total || props.data.length
})
const sPageSize = ref(props.pageSize)
const emits = defineEmits(['update'])
const finalColumns = ref([])

const updateTable = () => {
  finalColumns.value = props.columns.map((item) => {
    let baseBtns = []
    let hideBtns = []
    if (item.btns) {
      item.maxBtns = item.maxBtns || 3
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
      maxBtns: item.maxBtns || 3, // 最大显示按钮个数，超出后显示...
    }
    let res = Object.assign({}, defaultItems, item)
    return res
  })
}
watch(
  () => props.columns,
  (columns) => {
    updateTable()
  },
  {
    immediate: true,
    deep: true,
  },
)
watch(
  () => props.pageSize,
  (val) => {
    sPageSize.value = val
  },
  {
    immediate: true,
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
const parseIsShow = (isFn, row = '', scope = '') => {
  if (typeof isFn === 'function') {
    return isFn(row, scope)
  } else {
    if (isFn === undefined) {
      return true
    }
    return isFn
  }
}
const parseReConfirm = (isFn, row = '', scope = '') => {
  if (typeof isFn === 'function') {
    return isFn(row, scope)
  } else {
    if (isFn === undefined) {
      return false
    }
    return isFn
  }
}
const parseIsShowColumn = (isFn, item, index) => {
  if (typeof isFn === 'function') {
    return isFn(item, index)
  } else {
    if (isFn === undefined) {
      return true
    }
    return isFn
  }
}
const handleEmptyText = (scope, v) => {
  // 判断'   '为空
  const trimIsEmpty = proxy.getType(scope.row[v.prop]) === 'string' && scope.row[v.prop].trim().length === 0
  if (scope.row[v.prop] === null || scope.row[v.prop] === undefined || scope.row[v.prop] === '' || trimIsEmpty) {
    return v.emptyText || props.emptyText
  }
  return scope.row[v.prop]
}
const pageNumber = ref(1)

function handleSizeChange(val) {
  sPageSize.value = val
  pageNumber.value = 1
  updatePage()
}
function handleCurrentChange(val) {
  pageNumber.value = val
  updatePage()
}
function updatePage() {
  emits('update', pageNumber.value, sPageSize.value)
}
</script>

<template>
  <div class="o-table">
    <el-table
      :data="props.data"
      v-bind="$attrs"
      ref="tableRef"
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
        <template v-if="parseIsShowColumn(v.isShowColumn, v, i)">
          <el-table-column v-if="v.type" :key="v.type" v-bind="{ ...v }" />
          <el-table-column
            v-else-if="v.baseBtns && v.baseBtns.length > 0"
            v-bind="{ ...{ fixed: 'right', width: 200 }, ...v }"
          >
            <template #default="scope">
              <template v-if="parseIsShow(v.isShow, scope.row, scope)">
                <template v-for="(val, idx) in v.baseBtns" :key="idx">
                  <template v-if="parseIsShow(val.isShow, scope.row, scope)">
                    <slot v-if="val.useSlot" :name="val.prop" :row="scope.row" :scope="scope" />
                    <template v-else-if="parseReConfirm(val.reConfirm, scope.row, scope)">
                      <o-popconfirm
                        trigger="click"
                        :title="val.title ?? '确定删除吗?'"
                        @confirm="val.handler?.(scope.row, scope)"
                        style="display: inline"
                        class="mr2"
                      >
                        <component
                          :is="val.comp"
                          class="mr2"
                          v-if="val.comp"
                          v-bind="val.attrs"
                          :disabled="parseDisabled(val.disabled, scope.row, scope)"
                          @click.stop.prevent="val.handler?.(scope.row, scope)"
                        ></component>
                        <el-button
                          v-else
                          v-bind="{ ...val }"
                          link
                          class="hide-btns-button"
                          :disabled="parseDisabled(val.disabled, scope.row, scope)"
                        >
                          {{ operatorBtnFn(val.content, scope.row, scope) }}
                        </el-button>
                      </o-popconfirm>
                    </template>
                    <component
                      :is="val.comp"
                      class="mr2"
                      v-else-if="val.comp"
                      v-bind="val.attrs"
                      :disabled="parseDisabled(val.disabled, scope.row, scope)"
                      @click="val.handler?.(scope.row, scope)"
                    ></component>
                    <template v-else>
                      <el-button
                        v-bind="{ ...val }"
                        link
                        :disabled="parseDisabled(val.disabled, scope.row, scope)"
                        class="hide-btns-button"
                        @click.stop="val.handler?.(scope.row, scope)"
                      >
                        {{ operatorBtnFn(val.content, scope.row, scope) }}
                      </el-button>
                    </template>
                  </template>
                </template>

                <template v-if="v.hideBtns.length > 0">
                  <el-dropdown class="m-l-12 m-t-4" trigger="click">
                    <o-icon name="more" />
                    <template #dropdown>
                      <el-dropdown-menu>
                        <template v-for="(val, idx) in v.hideBtns" :key="idx">
                          <el-dropdown-item :hide-on-click="false" v-if="parseIsShow(val.isShow, scope.row, scope)">
                            <slot v-if="val.useSlot" :name="val.prop" :row="scope.row" :scope="scope" />

                            <template v-else-if="parseReConfirm(val.reConfirm, scope.row, scope)">
                              <o-popconfirm
                                trigger="hover"
                                :title="val.title ?? '确定删除吗?'"
                                @confirm="val.handler?.(scope.row, scope)"
                                style="display: inline"
                              >
                                <component
                                  :is="val.comp"
                                  class="mr2 w-100%"
                                  v-if="val.comp"
                                  v-bind="val.attrs"
                                  :disabled="parseDisabled(val.disabled, scope.row, scope)"
                                  @click.stop="val.handler?.(scope.row, scope)"
                                ></component>
                                <el-button
                                  v-else
                                  v-bind="{ ...val }"
                                  link
                                  class="hide-btns-button"
                                  :disabled="parseDisabled(val.disabled, scope.row, scope)"
                                >
                                  {{ operatorBtnFn(val.content, scope.row, scope) }}
                                </el-button>
                              </o-popconfirm>
                            </template>
                            <template v-else>
                              <component
                                :is="val.comp"
                                class="mr2"
                                v-if="val.comp"
                                v-bind="val.attrs"
                                :disabled="parseDisabled(val.disabled, scope.row, scope)"
                                @click="val.handler?.(scope.row, scope)"
                              ></component>
                              <el-button
                                v-else
                                v-bind="{ ...val }"
                                link
                                class="hide-btns-button"
                                :disabled="parseDisabled(val.disabled, scope.row, scope)"
                                @click.stop="val.handler?.(scope.row, scope)"
                              >
                                {{ operatorBtnFn(val.content, scope.row, scope) }}
                              </el-button>
                            </template>
                          </el-dropdown-item>
                        </template>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </template>
              </template>
            </template>
          </el-table-column>

          <el-table-column v-else v-bind="{ ...v }">
            <template #default="scope">
              <slot v-if="v.useSlot" :name="v.prop" :row="scope.row" :scope="scope" />
              <span v-else-if="v.handler" class="hide-btns-button" @click.stop="v.handler(scope.row, scope)">
                <span>{{ v.filter ? v.filter(scope.row[v.prop], scope.row, scope) : handleEmptyText(scope, v) }}</span>
              </span>
              <span v-else-if="v.filter">
                {{ v.filter(scope.row[v.prop], scope.row, scope) }}
              </span>
              <span v-else>
                {{ handleEmptyText(scope, v) }}
              </span>
            </template>
          </el-table-column>
        </template>
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
          :current-page="pageNumber"
          :page-size="sPageSize"
          :page-sizes="pageSizes"
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
  :deep(.el-table-fixed-column--right .cell.el-tooltip) {
    display: flex;
    align-items: center;
    line-height: 16px;
  }
}
.hide-btns-button {
  color: var(--blue);
  cursor: pointer;
  // padding: 5px 16px ;
}
:deep(.el-dropdown-menu__item) {
  // padding: 0;
  justify-content: center;
}
</style>
