<script setup lang="ts" name="OTable">
import { ref, watch, computed, useAttrs, nextTick, toRaw, inject } from 'vue'
import RenderComp from './renderComp.vue'
import HeaderTooltip from './headerTooltip.vue'
import OPopconfirm from '@/components/popconfirm/src/index.vue'
import OIcon from '@/components/icon/src/index.vue'
import { getType } from '@oeos-components/utils'

const attrs = useAttrs()
const PAGE_WRAP_HEIGHT = 50
const HEADER_MIN_WIDTH_PADDING = 32
const HEADER_SORTABLE_RESERVE_WIDTH = 28
const hasOwn = (target, key) => Object.prototype.hasOwnProperty.call(target, key)

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
  loading: {
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
  modelValue: {
    type: [Array, Object, String, Number, Boolean],
    default: undefined,
  },
  selectionType: {
    type: String,
    default: '',
  },
  selectionAttrs: {
    type: Object,
    default: () => {},
  },
})
const globalConfig = inject('GLOBAL_COMPONENT_CONFIG', {})
const mergedProps = computed(() => {
  return {
    ...props,
    ...globalConfig?.oTable,
  }
})
const tableRef = ref(null)
const tableTotal = computed(() => {
  return mergedProps.value.total ?? mergedProps.value.data.length
})
const sPageSize = ref(mergedProps.value.pageSize)
const sPageNumber = ref(mergedProps.value.pageNumber)
const emits = defineEmits(['update', 'update:modelValue'])
const finalColumns = ref([])
const syncingMultipleSelection = ref(false)
const syncingSingleSelection = ref(false)

const isSingleSelection = computed(() => mergedProps.value.selectionType === 'single')
const isMultipleSelection = computed(() => mergedProps.value.selectionType === 'multiple')
const normalizedSelectionAttrs = computed<Record<string, any>>(() => {
  if (mergedProps.value.selectionAttrs && typeof mergedProps.value.selectionAttrs === 'object') {
    return mergedProps.value.selectionAttrs
  }

  return {}
})
const selectionHeaderLabel = computed(() => normalizedSelectionAttrs.value.label || '')

const invokeAttrsListener = (listenerName, ...args) => {
  const listener = attrs[listenerName]
  if (Array.isArray(listener)) {
    listener.forEach((item) => {
      if (typeof item === 'function') {
        item(...args)
      }
    })
    return
  }

  if (typeof listener === 'function') {
    listener(...args)
  }
}

const getRowKey = () => {
  return attrs['row-key'] ?? attrs.rowKey
}

const getRowIdentity = (row) => {
  if (!row) return row

  const rowKey = getRowKey()
  if (!rowKey) return row

  if (typeof rowKey === 'function') {
    return rowKey(row)
  }

  return row?.[rowKey]
}

const isSameRow = (sourceRow, targetRow) => {
  if (!sourceRow || !targetRow) {
    return sourceRow === targetRow
  }

  const rowKey = getRowKey()
  if (rowKey) {
    return getRowIdentity(sourceRow) === getRowIdentity(targetRow)
  }

  return toRaw(sourceRow) === toRaw(targetRow)
}

const singleSelectionColumnAttrs = computed(() => {
  return {
    width: 58,
    align: 'center',
    ...normalizedSelectionAttrs.value,
  }
})

const multipleSelectionColumnAttrs = computed(() => {
  return {
    type: 'selection',
    width: 58,
    align: 'center',
    reserveSelection: !!getRowKey(),
    ...normalizedSelectionAttrs.value,
  }
})

const normalizeSelectedRows = () => {
  return Array.isArray(mergedProps.value.modelValue) ? mergedProps.value.modelValue : []
}

const syncMultipleSelection = async () => {
  if (!isMultipleSelection.value) return

  await nextTick()
  if (!tableRef.value?.clearSelection) return

  const selectedRows = normalizeSelectedRows()
  const currentRows = Array.isArray(mergedProps.value.data) ? mergedProps.value.data : []
  const rowKey = getRowKey()

  syncingMultipleSelection.value = true
  try {
    tableRef.value.clearSelection()

    if (!selectedRows.length || !currentRows.length) return

    if (rowKey) {
      const selectedKeySet = new Set(selectedRows.map((row) => getRowIdentity(row)))
      currentRows.forEach((row) => {
        if (selectedKeySet.has(getRowIdentity(row))) {
          tableRef.value.toggleRowSelection(row, true)
        }
      })
      return
    }

    currentRows.forEach((row) => {
      if (selectedRows.some((selectedRow) => isSameRow(row, selectedRow))) {
        tableRef.value.toggleRowSelection(row, true)
      }
    })
  } finally {
    await nextTick()
    syncingMultipleSelection.value = false
  }
}

const syncSingleSelection = async () => {
  if (!isSingleSelection.value) return

  await nextTick()
  if (!tableRef.value?.setCurrentRow) return

  const currentRows = Array.isArray(mergedProps.value.data) ? mergedProps.value.data : []
  const targetRow =
    mergedProps.value.modelValue && !Array.isArray(mergedProps.value.modelValue) ? mergedProps.value.modelValue : null
  const matchedRow = currentRows.find((row) => isSameRow(row, targetRow)) ?? null

  syncingSingleSelection.value = true
  try {
    tableRef.value.setCurrentRow(matchedRow)
  } finally {
    await nextTick()
    syncingSingleSelection.value = false
  }
}

const handleTableSelectionChange = (rows) => {
  if (isMultipleSelection.value && !syncingMultipleSelection.value) {
    const rowKey = getRowKey()

    if (!rowKey) {
      emits('update:modelValue', rows)
    } else {
      const selectedMap = new Map(normalizeSelectedRows().map((row) => [getRowIdentity(row), row]))
      const currentPageKeys = new Set((mergedProps.value.data ?? []).map((row) => getRowIdentity(row)))

      currentPageKeys.forEach((key) => {
        selectedMap.delete(key)
      })
      rows.forEach((row) => {
        selectedMap.set(getRowIdentity(row), row)
      })

      emits('update:modelValue', Array.from(selectedMap.values()))
    }
  }

  invokeAttrsListener('onSelectionChange', rows)
}

const handleTableCurrentChange = (currentRow, oldCurrentRow) => {
  if (isSingleSelection.value && !syncingSingleSelection.value) {
    emits('update:modelValue', currentRow ?? null)
  }

  invokeAttrsListener('onCurrentChange', currentRow, oldCurrentRow)
}

const handleTableRowClick = (row, column, event) => {
  if (isSingleSelection.value) {
    tableRef.value?.setCurrentRow?.(row)
  }

  invokeAttrsListener('onRowClick', row, column, event)
}

const handleSingleSelectionChange = (row) => {
  tableRef.value?.setCurrentRow?.(row)
}

const isSingleRowSelected = (row) => {
  if (!mergedProps.value.modelValue || Array.isArray(mergedProps.value.modelValue)) return false
  return isSameRow(row, mergedProps.value.modelValue)
}

const createCallbackContext = ({
  row,
  scope,
  column,
  action,
  index,
  event,
  value,
}: {
  row?: any
  scope?: any
  column?: any
  action?: any
  index?: number
  event?: Event
  value?: any
} = {}) => {
  const rowData = row && typeof row === 'object' && !Array.isArray(row) ? row : {}
  const targetProp = action?.prop ?? column?.prop
  const finalValue = value !== undefined ? value : targetProp !== undefined ? rowData?.[targetProp] : undefined

  return {
    ...rowData,
    row,
    scope,
    column,
    action,
    value: finalValue,
    index: index ?? scope?.$index,
    event,
  }
}

const invokeWithContext = (fn, context, legacyArgs = []) => {
  if (typeof fn !== 'function') {
    return fn
  }

  if (fn.length > 1) {
    return fn(...legacyArgs)
  }

  return fn(context)
}

const normalizeMaxBtns = (value) => {
  const parsedValue = Number(value)

  if (!Number.isFinite(parsedValue)) {
    return 4
  }

  return Math.max(Math.floor(parsedValue), 1)
}

const normalizeColumnBtns = (btns = [], maxBtns = 4) => {
  const normalizedMaxBtns = normalizeMaxBtns(maxBtns)
  const normalizedBtns = btns.map((btn) => {
    return {
      ...btn,
      isShow: btn.isShow ?? true,
    }
  })

  // maxBtns 表示操作栏最多显示的总数量，包含“更多”入口。
  // 例如 maxBtns = 4:
  // 1. 按钮数 <= 4 时全部展示
  // 2. 按钮数 > 4 时展示 3 个按钮 + 1 个“更多”
  if (normalizedBtns.length > normalizedMaxBtns) {
    const visibleBtnCount = Math.max(normalizedMaxBtns - 1, 0)
    return {
      btns: normalizedBtns,
      baseBtns: normalizedBtns.slice(0, visibleBtnCount),
      hideBtns: normalizedBtns.slice(visibleBtnCount),
      maxBtns: normalizedMaxBtns,
    }
  }

  return {
    btns: normalizedBtns,
    baseBtns: normalizedBtns,
    hideBtns: [],
    maxBtns: normalizedMaxBtns,
  }
}

const updateTable = () => {
  finalColumns.value = mergedProps.value.columns.map((item) => {
    const maxBtns = normalizeMaxBtns(item.maxBtns ?? 4)
    const { btns, baseBtns, hideBtns } = normalizeColumnBtns(item.btns ?? [], maxBtns)

    const defaultItems = {
      showOverflowTooltip: true,
      btns,
      baseBtns, // 显示的按钮
      hideBtns, // 隐藏在...中的按钮
      maxBtns, // 操作栏最多显示的总数量，包含“更多”入口
    }
    let res = Object.assign({}, defaultItems, item, {
      btns,
      baseBtns,
      hideBtns,
      maxBtns,
    })

    const labelMinWidth = getLabelMinWidth(res)
    if (res.width === undefined && labelMinWidth !== undefined) {
      if (res.minWidth === undefined) {
        res.minWidth = labelMinWidth
      } else {
        res.minWidth = Math.max(Number(res.minWidth) || 0, labelMinWidth)
      }
    }

    return res
  })
}
// isShow 或者 content支持 函数或字符串两种写法。
const operatorBtnFn = (cont, context = {}) => {
  if (typeof cont === 'function') {
    if (!context?.row) {
      return true
    }
    return invokeWithContext(cont, context, [context.row, context.scope, context.action])
  } else {
    if (cont === undefined) {
      return true
    }
    return cont
  }
}
const parseDisabled = (disFn, context = {}) => {
  if (typeof disFn === 'function') {
    if (!context?.row) {
      return false
    }
    return invokeWithContext(disFn, context, [context.row, context.scope, context.action])
  } else {
    if (disFn === undefined) {
      return false
    }
    return disFn
  }
}
const parseIsShow = (isFn, context = {}, legacyArgs = []) => {
  if (typeof isFn === 'function') {
    return invokeWithContext(isFn, context, legacyArgs)
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
    const context = createCallbackContext({ row, scope })
    return invokeWithContext(isFn, context, [row, scope])
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
    const context = createCallbackContext({
      row,
      scope,
      column: scope?.column,
      action: btnItem,
      event,
    })
    invokeWithContext(handlerMethod, context, [row, scope, btnItem, event])
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
    return v.columnEmptyText || mergedProps.value.columnEmptyText
  }
  return scope.row[v.prop]
}

function handleSizeChange(val) {
  if (mergedProps.value.asyncUpdate) {
    updatePage(1, val)
  } else {
    sPageSize.value = val
    sPageNumber.value = 1
    updatePage(1, val)
  }
}
function handleCurrentChange(val) {
  if (mergedProps.value.asyncUpdate) {
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

const getLabelMinWidth = (column) => {
  if (!column?.label) return undefined
  const sortableReserve = column.sortable ? HEADER_SORTABLE_RESERVE_WIDTH : 0
  return getTextWidth(column.label) + HEADER_MIN_WIDTH_PADDING + sortableReserve
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
  const gapWidth = Math.max(btns.length - 1, 0) * 12
  const moreWidth = hBtns.length > 0 ? 24 : 0
  const paddingWidth = 40
  const minWidth = 60

  return `${Math.max(btnsWidth + gapWidth + moreWidth + paddingWidth, minWidth)}px`
}
watch(
  () => mergedProps.value.columns,
  () => {
    updateTable()
  },
  {
    immediate: true,
    deep: true,
  },
)
watch(
  () => mergedProps.value.pageSize,
  (val) => {
    sPageSize.value = val
  },
  {
    immediate: true,
  },
)
watch(
  () => mergedProps.value.pageNumber,
  (val) => {
    sPageNumber.value = val
  },
  {
    immediate: true,
  },
)
watch(
  [
    () => mergedProps.value.data,
    () => mergedProps.value.modelValue,
    () => mergedProps.value.selectionType,
    () => attrs['row-key'],
    () => attrs.rowKey,
  ],
  () => {
    if (isMultipleSelection.value) {
      syncMultipleSelection()
    } else if (isSingleSelection.value) {
      syncSingleSelection()
    }
  },
  {
    immediate: true,
    deep: true,
  },
)
const tableLoading = computed(() => {
  return mergedProps.value.loading ?? false
})
const parseEmptyText = computed(() => {
  if (tableLoading.value === true) {
    return ''
  }
  return '暂无数据'
})
const compEmptyText = computed(() => {
  if (hasOwn(attrs, 'empty-text')) {
    return attrs['empty-text']
  }
  if (hasOwn(attrs, 'emptyText')) {
    return attrs['emptyText']
  }
  return parseEmptyText.value
})

const fluidHeight = computed(() => {
  const height = attrs.height
  if (typeof height !== 'string') {
    return ''
  }

  if (height.includes('%') || height.includes('calc(') || height.includes('vh')) {
    return height
  }

  return ''
})

const wrapperStyle = computed(() => {
  if (!fluidHeight.value) {
    return {}
  }

  return {
    height: fluidHeight.value,
  }
})

const tableAttrs = computed(() => {
  const nextAttrs = {
    ...attrs,
  } as Record<string, any>

  delete nextAttrs.onSelectionChange
  delete nextAttrs.onCurrentChange
  delete nextAttrs.onRowClick

  if (
    isSingleSelection.value &&
    !hasOwn(nextAttrs, 'highlight-current-row') &&
    !hasOwn(nextAttrs, 'highlightCurrentRow')
  ) {
    nextAttrs.highlightCurrentRow = true
  }

  if (!fluidHeight.value) {
    return nextAttrs
  }

  delete nextAttrs.height

  return {
    ...nextAttrs,
    height: mergedProps.value.showPage ? `calc(100% - ${PAGE_WRAP_HEIGHT}px)` : '100%',
  }
})

const getTableRef = () => {
  return tableRef.value
}

defineExpose({
  getTableRef,
})
</script>

<template>
  <div
    class="o-table"
    :class="{ 'o-table--fluid-height': !!fluidHeight }"
    :style="wrapperStyle"
    v-loading="tableLoading"
  >
    <el-table
      ref="tableRef"
      :data="mergedProps.data"
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
        ...tableAttrs,
      }"
      @selection-change="handleTableSelectionChange"
      @current-change="handleTableCurrentChange"
      @row-click="handleTableRowClick"
    >
      <el-table-column v-if="isMultipleSelection" v-bind="multipleSelectionColumnAttrs" />
      <el-table-column v-else-if="isSingleSelection" v-bind="singleSelectionColumnAttrs">
        <template v-if="selectionHeaderLabel" #header>
          <HeaderTooltip :label="selectionHeaderLabel" />
        </template>
        <template #default="scope">
          <div class="f-ct-ct w-100%">
            <el-radio
              :model-value="isSingleRowSelected(scope.row)"
              :value="true"
              @click.stop
              @change="handleSingleSelectionChange(scope.row)"
            />
          </div>
        </template>
      </el-table-column>
      <slot />
      <el-table-column
        v-if="mergedProps.showIndex"
        type="index"
        :width="tableTotal >= 10000 || $attrs.size === 'large' ? 70 : 60"
        align="center"
        :index="indexMethod"
        :fixed="true"
        v-bind="mergedProps.indexAttrs"
      >
        <!-- 使用 #header 插槽自定义表头 -->
        <template #header="{ column }">
          <HeaderTooltip :label="column.label || '序号'" />
        </template>
      </el-table-column>
      <template v-for="(v, i) in finalColumns" :key="i">
        <template v-if="parseIsShow(v.isShow, createCallbackContext({ column: v, index: i }), [v, i])">
          <el-table-column v-if="v.type" :key="v.type" v-bind="{ align: 'center', ...v }">
            <template #header>
              <HeaderTooltip :label="v.label" />
            </template>
          </el-table-column>
          <el-table-column
            v-else-if="v.btns && v.btns.length > 0"
            v-bind="{ ...{ fixed: 'right', width: parseTableWidth(v.baseBtns, v.hideBtns) }, ...v }"
          >
            <template #header>
              <HeaderTooltip :label="v.label" />
            </template>
            <template #default="scope">
              <template v-if="scope.$index !== -1">
                <template
                  v-if="
                    parseIsShow(
                      v.isShow,
                      createCallbackContext({ row: scope.row, scope, column: v, index: scope.$index }),
                      [scope.row, scope, v, i],
                    )
                  "
                >
                  <template v-for="(val, idx) in v.baseBtns" :key="idx">
                    <template
                      v-if="
                        parseIsShow(
                          val.isShow,
                          createCallbackContext({
                            row: scope.row,
                            scope,
                            column: v,
                            action: val,
                            index: scope.$index,
                          }),
                          [scope.row, scope, v, i],
                        )
                      "
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
                        :column="v"
                        :action="val"
                        :index="scope.$index"
                      />

                      <template v-else-if="parseReConfirm(val.reConfirm, scope.row, scope)">
                        <oPopconfirm
                          trigger="click"
                          :title="
                            getType(val.title) === 'function'
                              ? invokeWithContext(
                                  val.title,
                                  createCallbackContext({
                                    row: scope.row,
                                    scope,
                                    column: v,
                                    action: val,
                                    index: scope.$index,
                                  }),
                                  [scope.row, scope, val],
                                )
                              : val.title ?? '确定删除吗?'
                          "
                          class="f-st-ct"
                          @confirm="
                            invokeWithContext(
                              val.handler,
                              createCallbackContext({
                                row: scope.row,
                                scope,
                                column: v,
                                action: val,
                                index: scope.$index,
                              }),
                              [scope.row, scope, val],
                            )
                          "
                        >
                          <component
                            :is="val.comp"
                            v-if="val.comp"
                            class="cp"
                            v-bind="val.attrs"
                            :disabled="
                              parseDisabled(
                                val.disabled,
                                createCallbackContext({
                                  row: scope.row,
                                  scope,
                                  column: v,
                                  action: val,
                                  index: scope.$index,
                                }),
                              )
                            "
                          />
                          <el-button
                            v-else
                            v-bind="{ ...val }"
                            link
                            class="hide-btns-button"
                            :disabled="
                              parseDisabled(
                                val.disabled,
                                createCallbackContext({
                                  row: scope.row,
                                  scope,
                                  column: v,
                                  action: val,
                                  index: scope.$index,
                                }),
                              )
                            "
                          >
                            {{
                              operatorBtnFn(
                                val.content,
                                createCallbackContext({
                                  row: scope.row,
                                  scope,
                                  column: v,
                                  action: val,
                                  index: scope.$index,
                                }),
                              )
                            }}
                          </el-button>
                        </oPopconfirm>
                      </template>
                      <component
                        :is="val.comp"
                        v-else-if="val.comp"
                        class="cp"
                        v-bind="val.attrs"
                        :disabled="
                          parseDisabled(
                            val.disabled,
                            createCallbackContext({
                              row: scope.row,
                              scope,
                              column: v,
                              action: val,
                              index: scope.$index,
                            }),
                          )
                        "
                        @click="($event) => handleCompClick(val.handler, scope.row, scope, val, $event)"
                      />
                      <template v-else>
                        <el-button
                          v-bind="{ ...val }"
                          link
                          :disabled="
                            parseDisabled(
                              val.disabled,
                              createCallbackContext({
                                row: scope.row,
                                scope,
                                column: v,
                                action: val,
                                index: scope.$index,
                              }),
                            )
                          "
                          class="hide-btns-button"
                          @click.stop="
                            invokeWithContext(
                              val.handler,
                              createCallbackContext({
                                row: scope.row,
                                scope,
                                column: v,
                                action: val,
                                index: scope.$index,
                              }),
                              [scope.row, scope, val],
                            )
                          "
                        >
                          {{
                            operatorBtnFn(
                              val.content,
                              createCallbackContext({
                                row: scope.row,
                                scope,
                                column: v,
                                action: val,
                                index: scope.$index,
                              }),
                            )
                          }}
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
                              v-if="
                                parseIsShow(
                                  val.isShow,
                                  createCallbackContext({
                                    row: scope.row,
                                    scope,
                                    column: v,
                                    action: val,
                                    index: scope.$index,
                                  }),
                                  [scope.row, scope, v, i],
                                )
                              "
                              :hide-on-click="false"
                              @click="
                                invokeWithContext(
                                  val.handler,
                                  createCallbackContext({
                                    row: scope.row,
                                    scope,
                                    column: v,
                                    action: val,
                                    index: scope.$index,
                                  }),
                                  [scope.row, scope, val],
                                )
                              "
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
                                :column="v"
                                :action="val"
                                :index="scope.$index"
                              />
                              <template v-else>
                                <component
                                  :is="val.comp"
                                  v-if="val.comp"
                                  v-bind="val.attrs"
                                  :disabled="
                                    parseDisabled(
                                      val.disabled,
                                      createCallbackContext({
                                        row: scope.row,
                                        scope,
                                        column: v,
                                        action: val,
                                        index: scope.$index,
                                      }),
                                    )
                                  "
                                />
                                <el-button
                                  v-else
                                  v-bind="{ ...val }"
                                  link
                                  class="hide-btns-button"
                                  :disabled="
                                    parseDisabled(
                                      val.disabled,
                                      createCallbackContext({
                                        row: scope.row,
                                        scope,
                                        column: v,
                                        action: val,
                                        index: scope.$index,
                                      }),
                                    )
                                  "
                                >
                                  {{
                                    operatorBtnFn(
                                      val.content,
                                      createCallbackContext({
                                        row: scope.row,
                                        scope,
                                        column: v,
                                        action: val,
                                        index: scope.$index,
                                      }),
                                    )
                                  }}
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
            <template #header>
              <HeaderTooltip :label="v.label" />
            </template>
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
                <RenderComp
                  v-else-if="v.render"
                  :render="v.render"
                  :row="scope.row"
                  :scope="scope"
                  :value="scope.row[v.prop]"
                  :column="v"
                  :index="scope.$index"
                />
                <span
                  v-else-if="v.handler"
                  class="hide-btns-button"
                  @click.stop="
                    invokeWithContext(
                      v.handler,
                      createCallbackContext({ row: scope.row, scope, column: v, index: scope.$index }),
                      [scope.row, scope, v],
                    )
                  "
                >
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

    <div class="page-wrap" v-if="mergedProps.showPage">
      <div class="page-left">
        <span>共</span>
        <span class="m-lr-2 bold">{{ tableTotal }}</span>
        <span>项</span>
      </div>
      <div class="page-right">
        <div class="page-scroll">
          <el-pagination
            class="tab_pagination"
            background
            :current-page="sPageNumber"
            :page-size="sPageSize"
            :page-sizes="mergedProps.pageSizes"
            layout="prev, pager, next, jumper, sizes"
            :total="tableTotal"
            :size="$attrs.size"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            v-bind="mergedProps.pageAttrs"
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

  &.o-table--fluid-height {
    display: flex;
    flex-direction: column;
    min-height: 0;
  }

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

  &.o-table--fluid-height :deep(.el-table) {
    flex: 1;
    min-height: 0;
  }

  :deep(.el-table th) {
    box-sizing: border-box;
  }

  :deep(.el-table th .cell) {
    line-height: inherit;
    white-space: nowrap;
    overflow: hidden;
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
