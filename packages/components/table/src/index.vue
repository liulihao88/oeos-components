<script setup lang="ts" name="OTable">
import { ref, watch, computed, useAttrs } from 'vue'
import RenderComp from './renderComp.vue'
import OPopconfirm from '@/components/popconfirm/src/index.vue'
import OIcon from '@/components/icon/src/index.vue'
import { getType } from '@oeos-components/utils'

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
  pageNumber: {
    type: Number,
    default: 1,
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
  indexAttrs: {
    type: Object,
    default: () => {},
  },
  asyncUpdate: {
    type: Boolean,
    default: false,
  },
  pageAttrs: {
    type: Object,
    default: () => {},
  },
})
const tableRef = ref(null)
const tableTotal = computed(() => {
  return props.total || props.data.length
})
const sPageSize = ref(props.pageSize)
const sPageNumber = ref(props.pageNumber)
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
watch(
  () => props.pageNumber,
  (val) => {
    sPageNumber.value = val
  },
  {
    immediate: true,
  },
)
// isShow 或者 content支持 函数或字符串两种写法。
const operatorBtnFn = (cont, row = '', scope = '', btnItem = '') => {
  if (typeof cont === 'function') {
    if (!row) {
      return true
    }
    return cont(row, scope, btnItem)
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
const parseIsShow = (isFn, ...rest) => {
  if (typeof isFn === 'function') {
    return isFn(...rest)
  } else {
    if (isFn === undefined) {
      return true
    }
    return isFn
  }
}

const parseSlot = (val) => {
  if (val.useSlot === true) {
    return val.prop
  } else {
    return val.useSlot
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

const handleCompClick = (handlerMethod, row, scope, btnItem, event) => {
  if (handlerMethod) {
    event.stopPropagation()
    handlerMethod(row, scope, btnItem, event)
  }
}

const indexMethod = (index) => {
  // 如果当前页是最后一页（数据量不足 pageSize），则基于实际数据量计算
  return (sPageNumber.value - 1) * sPageSize.value + index + 1
}

const handleEmptyText = (scope, v) => {
  // 判断'   '为空
  const trimIsEmpty = getType(scope.row[v.prop]) === 'string' && scope.row[v.prop].trim().length === 0
  if (scope.row[v.prop] === null || scope.row[v.prop] === undefined || scope.row[v.prop] === '' || trimIsEmpty) {
    return v.columnEmptyText || props.columnEmptyText
  }
  return scope.row[v.prop]
}

function handleSizeChange(val) {
  if (props.asyncUpdate) {
    updatePage(1, val)
  } else {
    sPageSize.value = val
    sPageNumber.value = 1
    updatePage(1, val)
  }
}
function handleCurrentChange(val) {
  if (props.asyncUpdate) {
    updatePage(val, sPageSize.value)
  } else {
    sPageNumber.value = val
    updatePage(val, sPageSize.value)
  }
}
function updatePage(number, size) {
  emits('update', number, size)
}

let textMeasureEl: HTMLSpanElement | null = null

const getTextWidth = (text = '') => {
  const value = String(text).trim()
  if (!value) return 0

  if (typeof document === 'undefined') {
    return value.length * 14
  }

  if (!textMeasureEl) {
    textMeasureEl = document.createElement('span')
    textMeasureEl.style.position = 'fixed'
    textMeasureEl.style.left = '-9999px'
    textMeasureEl.style.top = '-9999px'
    textMeasureEl.style.visibility = 'hidden'
    textMeasureEl.style.pointerEvents = 'none'
    textMeasureEl.style.whiteSpace = 'nowrap'
    document.body.appendChild(textMeasureEl)
  }

  const buttonEl = document.querySelector('.o-table .hide-btns-button')
  if (buttonEl) {
    const style = window.getComputedStyle(buttonEl)
    textMeasureEl.style.font = style.font
    textMeasureEl.style.fontSize = style.fontSize
    textMeasureEl.style.fontWeight = style.fontWeight
    textMeasureEl.style.fontFamily = style.fontFamily
    textMeasureEl.style.letterSpacing = style.letterSpacing
  } else {
    textMeasureEl.style.font = '14px sans-serif'
  }

  textMeasureEl.textContent = value
  return Math.ceil(textMeasureEl.getBoundingClientRect().width)
}

const getBtnWidth = (btn) => {
  if (btn.width !== undefined) {
    return Number(btn.width)
  }

  if (typeof btn.content === 'function') {
    return getTextWidth('哈哈')
  }

  if (btn.render || btn.useSlot) {
    return getTextWidth('哈哈')
  }

  if (btn.comp) {
    return 16
  }

  return getTextWidth(btn.content || '')
}

const parseTableWidth = (btns, hBtns) => {
  const btnsWidth = btns.reduce((sum, btn) => sum + getBtnWidth(btn), 0)
  const gapWidth = Math.max(btns.length - 1, 0) * 8
  const moreWidth = hBtns.length > 0 ? 24 : 0
  const paddingWidth = 48
  const minWidth = 60

  return `${Math.max(btnsWidth + gapWidth + moreWidth + paddingWidth, minWidth)}px`
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
      ref="tableRef"
      :data="props.data"
      :header-cell-style="{
        background: '#f7f8fa',
        color: 'rgba(39,48,75,0.85)',
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
      <el-table-column
        v-if="showIndex"
        type="index"
        :width="props.total >= 10000 || $attrs.size === 'large' ? 70 : 60"
        align="center"
        :index="indexMethod"
        :fixed="true"
        v-bind="indexAttrs"
      >
        <!-- 使用 #header 插槽自定义表头 -->
        <template #header="{ column }">
          <span>序号</span>
        </template>
      </el-table-column>
      <template v-for="(v, i) in finalColumns" :key="i">
        <template v-if="parseIsShow(v.isShow, v, i)">
          <el-table-column v-if="v.type" :key="v.type" v-bind="{ align: 'center', ...v }" />
          <el-table-column
            v-else-if="v.baseBtns && v.baseBtns.length > 0"
            v-bind="{ ...{ fixed: 'right', width: parseTableWidth(v.baseBtns, v.hideBtns) }, ...v }"
          >
            <template #default="scope">
              <template v-if="scope.$index !== -1">
                <template v-if="parseIsShow(v.isShow, scope.row, scope, v, i)">
                  <template v-for="(val, idx) in v.baseBtns" :key="idx">
                    <template v-if="parseIsShow(val.isShow, scope.row, scope, v, i)">
                      <slot
                        v-if="val.useSlot"
                        :name="parseSlot(val)"
                        :row="scope.row"
                        :scope="scope"
                        :index="scope.$index"
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
                          :title="
                            getType(val.title) === 'function'
                              ? val.title(scope.row, scope, val)
                              : val.title ?? '确定删除吗?'
                          "
                          class="f-st-ct"
                          @confirm="val.handler?.(scope.row, scope, val)"
                        >
                          <component
                            :is="val.comp"
                            v-if="val.comp"
                            class="cp"
                            v-bind="val.attrs"
                            :disabled="parseDisabled(val.disabled, scope.row, scope, val)"
                          />
                          <el-button
                            v-else
                            v-bind="{ ...val }"
                            link
                            class="hide-btns-button"
                            :disabled="parseDisabled(val.disabled, scope.row, scope)"
                          >
                            {{ operatorBtnFn(val.content, scope.row, scope, val) }}
                          </el-button>
                        </oPopconfirm>
                      </template>
                      <component
                        :is="val.comp"
                        v-else-if="val.comp"
                        class="cp"
                        v-bind="val.attrs"
                        :disabled="parseDisabled(val.disabled, scope.row, scope, val)"
                        @click="($event) => handleCompClick(val.handler, scope.row, val, scope, $event)"
                      />
                      <template v-else>
                        <el-button
                          v-bind="{ ...val }"
                          link
                          :disabled="parseDisabled(val.disabled, scope.row, scope)"
                          class="hide-btns-button"
                          @click.stop="val.handler?.(scope.row, scope, val)"
                        >
                          {{ operatorBtnFn(val.content, scope.row, scope, val) }}
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
                              v-if="parseIsShow(val.isShow, scope.row, scope, v, i)"
                              :hide-on-click="false"
                              @click="val.handler?.(scope.row, scope, val)"
                            >
                              <slot
                                v-if="val.useSlot"
                                :name="parseSlot(val)"
                                :row="scope.row"
                                :scope="scope"
                                :index="scope.$index"
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
                                  {{ operatorBtnFn(val.content, scope.row, scope, val) }}
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
            </template>
          </el-table-column>

          <el-table-column v-else v-bind="{ ...v }">
            <template #default="scope">
              <template v-if="scope.$index !== -1">
                <template v-if="v.useSlot">
                  <slot
                    :name="parseSlot(v)"
                    :row="scope.row"
                    :scope="scope"
                    :value="scope.row[v.prop]"
                    :index="scope.$index"
                  />
                </template>
                <span v-else-if="v.handler" class="hide-btns-button" @click.stop="v.handler(scope.row, scope, v)">
                  <span>
                    {{ v.filter ? v.filter(scope.row[v.prop], scope.row, scope) : handleEmptyText(scope, v) }}
                  </span>
                </span>
                <span v-else-if="v.filter">
                  {{ v.filter(scope.row[v.prop], scope.row, scope) }}
                </span>
                <span v-else>
                  {{ handleEmptyText(scope, v) }}
                </span>
              </template>
            </template>
          </el-table-column>
        </template>
      </template>
    </el-table>

    <div class="page-wrap" v-if="showPage">
      <div class="page-left">
        <span>共</span>
        <span class="m-lr-2 bold">{{ tableTotal }}</span>
        <span>项数据</span>
      </div>
      <div class="page-right">
        <div class="page-scroll">
          <el-pagination
            class="tab_pagination"
            background
            :current-page="sPageNumber"
            :page-size="sPageSize"
            :page-sizes="pageSizes"
            layout="prev, pager, next, jumper, sizes"
            :total="tableTotal"
            :size="$attrs.size"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            v-bind="props.pageAttrs"
          />
        </div>
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
    gap: 12px;
    padding: 4px 24px;
    height: 50px;
    background: #fff;
    border: 1px solid #ebedf0;
    border-top-style: none;
  }

  .page-wrap .page-left {
    flex-shrink: 0;
    color: rgb(39 48 75 / 85%);
  }

  .page-wrap .page-right {
    flex: 1;
    min-width: 0;
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
  }

  .page-wrap .page-scroll {
    min-width: max-content;
    margin-left: auto;
  }

  .page-wrap .page-right :deep(.el-pagination) {
    display: inline-flex;
    flex: none;
    flex-wrap: nowrap;
    white-space: nowrap;
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
    justify-content: center;
    gap: 8px;
    min-height: 23px;
    line-height: 23px;
    .o-icon + .o-icon {
      margin-left: 0;
    }
  }
  :deep(.el-table-fixed-column--right .cell.el-tooltip:has(> :only-child)) {
    justify-content: center;
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

  // 解决屏幕宽度改变, 可能导致操作那一列的左侧线条不显示的问题
  :deep(.el-table-fixed-column--right.is-last-column:before),
  :deep(.el-table-fixed-column--right.is-first-column:before) {
    box-shadow: 1px 0 0 0 rgba(242, 243, 245, 1);
  }
  :deep(.el-button) {
    margin-left: 0 !important;
  }
}
</style>
