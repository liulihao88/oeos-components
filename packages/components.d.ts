import type {
  OTableButton as OTableButtonType,
  OTableColumn as OTableColumnType,
  OTableProps as OTablePropsType,
  TableCallbackContext as TableCallbackContextType,
  TableColumnList as TableColumnListType,
  TableModelValue as TableModelValueType,
  TablePageChangePayload as TablePageChangePayloadType,
  TableSelectionType as TableSelectionTypeType,
} from './types/index.ts'

declare global {
  type TableBtnItem = OTableButtonType
  type TableColumnItem = OTableColumnType
  type TableColumnList = TableColumnListType
  type TableCallbackContext = TableCallbackContextType
  type TableModelValue = TableModelValueType
  type TablePageChangePayload = TablePageChangePayloadType
  type TableSelectionType = TableSelectionTypeType
  type OTableProps = OTablePropsType
}

declare module 'vue' {
  export interface GlobalComponents {
    OInputNumber: typeof import('./components/inputNumber/index.ts')['default']
    OTable: typeof import('./components/table/index.ts')['default']
  }
}

export {}
