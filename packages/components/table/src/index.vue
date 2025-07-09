<script setup lang="ts" name="OTable">
import { ref, watch, computed, useAttrs } from 'vue'
import RenderComp from './renderComp.vue'
import OPopconfirm from '@/components/popconfirm'
import OIcon from '@/components/icon'
import { getType } from '@/utils'

const attrs = useAttrs()

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
    default: 30,
  },
  pageSizes: {
    type: Array,
    default: () => {
      return [10, 30, 50]
    },
  },
  total: {
    type: Number,
  },
  columnEmptyText: {
    type: String,
    default: '-',
  },
  isLoading: {
    type: Boolean,
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
  () => {
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

const handleCompClick = (handler, row, scope, event) => {
  if (handler) {
    event.stopPropagation()
    handler(row, scope, event)
  }
}

const indexMethod = (index) => {
  return index + 1 + (pageNumber.value - 1) * sPageSize.value
}

const handleEmptyText = (scope, v) => {
  // 判断'   '为空
  const trimIsEmpty = getType(scope.row[v.prop]) === 'string' && scope.row[v.prop].trim().length === 0
  if (scope.row[v.prop] === null || scope.row[v.prop] === undefined || scope.row[v.prop] === '' || trimIsEmpty) {
    return v.columnEmptyText || props.columnEmptyText
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

const parseTableWidth = (btns, hBtns) => {
  return 26 + (btns.length + (hBtns.length === 0 ? 0 : 1)) * 36 + 'px'
}
const parseEmptyText = computed(() => {
  if (props.isLoading === true) {
    return ''
  }
  return '暂无数据'
})
const compEmptyText = computed(() => {
  if (attrs.hasOwnProperty('empty-text')) {
    return attrs['empty-text']
  }
  if (attrs.hasOwnProperty('emptyText')) {
    return attrs['emptyText']
  }
  return parseEmptyText.value
})
</script>

<template>
  <div class="o-table">
    <el-table
      :data="props.data"
      ref="tableRef"
      :header-cell-style="{
        background: '#f7f8fa',
        color: 'rgba(39,48,75,0.85)',
        height: '50px',
        textAlign: 'center',
        ...($attrs['custom-header-cell-style'] || {}),
      }"
      :empty-text="compEmptyText"
      v-bind="{
        stripe: true,
        border: true,
        ...$attrs,
      }"
    >
      <slot />
      <el-table-column v-if="showIndex" type="index" width="60" align="center" :index="indexMethod">
        <!-- 使用 #header 插槽自定义表头 -->
        <template #header="{ column }">
          <span>序号</span>
        </template>
      </el-table-column>
      <template v-for="(v, i) in finalColumns" :key="i">
        <template v-if="parseIsShowColumn(v.isShowColumn, v, i)">
          <el-table-column v-if="v.type" :key="v.type" v-bind="{ align: 'center', ...v }" />
          <el-table-column
            v-else-if="v.baseBtns && v.baseBtns.length > 0"
            v-bind="{ ...{ fixed: 'right', width: parseTableWidth(v.baseBtns, v.hideBtns) }, ...v }"
          >
            <template #default="scope">
              <template v-if="parseIsShow(v.isShow, scope.row, scope)">
                <template v-for="(val, idx) in v.baseBtns" :key="idx">
                  <template v-if="parseIsShow(val.isShow, scope.row, scope)">
                    <slot
                      v-if="val.useSlot"
                      :name="val.prop"
                      :row="scope.row"
                      :scope="scope"
                      :value="scope.row[val.prop]"
                    />
                    <RenderComp
                      v-else-if="val.render"
                      :render="val.render"
                      :row="scope.row"
                      :scope="scope"
                      :value="scope.row[val.prop]"
                    />

                    <template v-else-if="parseReConfirm(val.reConfirm, scope.row, scope)">
                      <oPopconfirm
                        trigger="click"
                        :title="val.title ?? '确定删除吗?'"
                        @confirm="val.handler?.(scope.row, scope)"
                        class="f-st-ct"
                      >
                        <component
                          :is="val.comp"
                          v-if="val.comp"
                          class="mlr cp"
                          v-bind="val.attrs"
                          :disabled="parseDisabled(val.disabled, scope.row, scope)"
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
                      </oPopconfirm>
                    </template>
                    <component
                      :is="val.comp"
                      v-else-if="val.comp"
                      class="mlr cp"
                      v-bind="val.attrs"
                      :disabled="parseDisabled(val.disabled, scope.row, scope)"
                      @click="($event) => handleCompClick(val.handler, scope.row, scope, $event)"
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
                  <el-dropdown class="" trigger="click">
                    <o-icon name="more" @click.stop />
                    <template #dropdown>
                      <el-dropdown-menu :hide-on-click="false">
                        <template v-for="(val, idx) in v.hideBtns" :key="idx">
                          <el-dropdown-item
                            v-if="parseIsShow(val.isShow, scope.row, scope)"
                            :hide-on-click="false"
                            @click="val.handler?.(scope.row, scope)"
                          >
                            <slot
                              v-if="val.useSlot"
                              :name="val.prop"
                              :row="scope.row"
                              :scope="scope"
                              :value="scope.row[val.prop]"
                            />
                            <RenderComp
                              v-else-if="val.render"
                              :render="val.render"
                              :row="scope.row"
                              :scope="scope"
                              :value="scope.row[val.prop]"
                            />
                            <template v-else>
                              <component
                                :is="val.comp"
                                v-if="val.comp"
                                v-bind="val.attrs"
                                :disabled="parseDisabled(val.disabled, scope.row, scope)"
                              />
                              <el-button
                                v-else
                                v-bind="{ ...val }"
                                link
                                class="hide-btns-button"
                                :disabled="parseDisabled(val.disabled, scope.row, scope)"
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
              <slot v-if="v.useSlot" :name="v.prop" :row="scope.row" :scope="scope" :value="scope.row[v.prop]" />
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
  box-shadow: none !important;
  .page-wrap {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64px;
    padding: 0 24px;
    background: #fff;
    border: 1px solid #ebedf0;
    border-top-style: none;
  }

  .page-wrap .page-left {
    color: rgb(39 48 75 / 85%);
  }
  :deep(.el-table) {
    box-shadow: none !important;
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
    display: inline-flex;
    align-items: center;
    min-height: 23px;
    line-height: 23px;
  }

  :deep(
      .el-table__body-wrapper .el-table-column--selection > .cell,
      .el-table__header-wrapper .el-table-column--selection > .cell
    ) {
    justify-content: center;
    min-width: unset;
  }

  .hide-btns-button:not(.is-disabled) {
    color: var(--blue);
    cursor: pointer;
  }

  :deep(.el-dropdown-menu__item) {
    justify-content: center;
    min-width: 60px;
    height: 30px;
    line-height: 30px;
  }
  :deep(.el-table tr:not(:last-child) td.el-table__cell) {
    border-bottom: none !important;
  }
  :deep(.el-pagination .el-select) {
    width: 100px;
  }
}
</style>
