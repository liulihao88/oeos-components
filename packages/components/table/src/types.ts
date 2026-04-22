import type { TableColumnCtx, TableInstance } from 'element-plus'
import type { Component, VNodeChild } from 'vue'

export type TableRow = Record<string, any>

export type TableSelectionType = '' | 'single' | 'multiple'

export interface TablePageChangePayload {
  /** 当前页码 */
  pageNumber: number
  /** 每页条数 */
  pageSize: number
}

export interface TableScope<Row extends TableRow = TableRow> {
  row: Row
  $index: number
  column?: TableColumnCtx<Row>
  [key: string]: any
}

export type TableCallbackContext<
  Row extends TableRow = TableRow,
  Column = OTableColumn<Row>,
  Action = OTableButton<Row>,
> = Partial<Row> & {
  row?: Row
  scope?: TableScope<Row>
  column?: Column | TableColumnCtx<Row>
  action?: Action
  value?: any
  index?: number
  event?: Event
}

export type TableContextHandler<TResult = any, Row extends TableRow = TableRow> = (
  context: TableCallbackContext<Row>,
) => TResult

export type TableLegacyHandler<TResult = any> = (...args: any[]) => TResult

export type TableMaybeFn<TResult = any, Row extends TableRow = TableRow> =
  | TResult
  | TableContextHandler<TResult, Row>
  | TableLegacyHandler<TResult>

export type TableRender<Row extends TableRow = TableRow> = (context: TableCallbackContext<Row>) => VNodeChild

export type TableFilter<Row extends TableRow = TableRow> = (value: any, row: Row, scope: TableScope<Row>) => any

export interface OTableButton<Row extends TableRow = TableRow> extends Record<string, any> {
  prop?: string
  content?: string | number | TableContextHandler<string | number, Row> | TableLegacyHandler<string | number>
  title?: string | number | TableContextHandler<string | number, Row> | TableLegacyHandler<string | number>
  handler?: TableContextHandler<any, Row> | TableLegacyHandler<any>
  isShow?: TableMaybeFn<boolean, Row>
  disabled?: TableMaybeFn<boolean, Row>
  reConfirm?: TableMaybeFn<boolean, Row>
  render?: TableRender<Row>
  useSlot?: boolean | string
  comp?: string | Component
  attrs?: Record<string, any>
  width?: number | string
}

export interface OTableColumn<Row extends TableRow = TableRow> extends Record<string, any> {
  label?: string | number
  prop?: string
  type?: string
  width?: number | string
  minWidth?: number | string
  fixed?: string | boolean
  align?: string
  sortable?: string | boolean
  useSlot?: boolean | string
  render?: TableRender<Row>
  filter?: TableFilter<Row>
  handler?: TableContextHandler<any, Row> | TableLegacyHandler<any>
  isShow?: TableMaybeFn<boolean, Row>
  columnEmptyText?: string
  btns?: OTableButton<Row>[]
  maxBtns?: number
}

export interface OTableResolvedColumn<Row extends TableRow = TableRow> extends OTableColumn<Row> {
  showOverflowTooltip?: boolean
  btns: OTableButton<Row>[]
  baseBtns: OTableButton<Row>[]
  hideBtns: OTableButton<Row>[]
  maxBtns: number
}

export type TableColumnList<Row extends TableRow = TableRow> = OTableColumn<Row>[]

export type TableModelValue<Row extends TableRow = TableRow> =
  | Row[]
  | Row
  | string
  | number
  | boolean
  | null
  | undefined

export interface OTableProps<Row extends TableRow = TableRow> {
  data?: Row[]
  columns?: TableColumnList<Row>
  showPage?: boolean
  showIndex?: boolean
  pageSize?: number
  pageNumber?: number
  pageSizes?: number[]
  total?: number
  columnEmptyText?: string
  loading?: boolean
  indexAttrs?: Record<string, any>
  asyncUpdate?: boolean
  pageAttrs?: Record<string, any>
  modelValue?: TableModelValue<Row>
  selectionType?: TableSelectionType
  selectionAttrs?: Record<string, any>
}

export type OTableEmits<Row extends TableRow = TableRow> = {
  'page-change': [payload: TablePageChangePayload]
  'update:modelValue': [value: TableModelValue<Row>]
}

export interface OTableExpose {
  getTableRef: () => TableInstance | null
}

export type { TableColumnCtx, TableInstance }
