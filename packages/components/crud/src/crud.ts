import type { TableColumnCtx } from 'element-plus/lib/components/table/src/table-column/defaults'
import type { ColumnCls, ColumnStyle, SummaryMethod } from 'element-plus/es/components/table/src/table/defaults'
import type { TablePage } from './menu/table-page'
import type Crud from './crud.vue'

import type { CSSProperties, PropType } from 'vue'
import type { QvOption } from '@qv-vue/types/qvue-ui'

export type DefaultRow = any

type CellCls<T> = string | ((data: { row: T; rowIndex: number; column: TableColumnCtx<T>; columnIndex: number }) => string)
type CellStyle<T> = CSSProperties | ((data: { row: T; rowIndex: number; column: TableColumnCtx<T>; columnIndex: number }) => CSSProperties)

type Permission<T> = Record<string, boolean> | ((key: string, row: T, index: number) => Record<string, boolean>)

interface CrudProps<T> {
	sortBy?: string | ((row: T, index: number) => string) | string[]
	sortOrders?: ('ascending' | 'descending' | null)[]
	sortMethod?: (a: T, b: T) => number
	spanMethod?: (data: { row: T; rowIndex: number; column: TableColumnCtx<T>; columnIndex: number }) =>
		| number[]
		| {
				rowspan: number
				colspan: number
		  }
	summaryMethod?: SummaryMethod<T>
	rowStyle?: ColumnStyle<T>
	cellStyle?: CellStyle<T>
	beforeClose?: (done: () => void, type?: string) => void
	beforeOpen?: (form: any, type: string) => void
	rowClassName?: ColumnCls<T>
	cellClassName?: CellCls<T>
	headerRowClassName?: ColumnCls<T>
	headerCellClassName?: CellCls<T>
	search?: Record<string, unknown>
	tableLoading?: boolean
	disabled?: boolean
	page: Partial<TablePage>
	permission?: Permission<T>
	option: Partial<QvOption>
	data: T[]
}
export type { CellCls, CellStyle, Permission, CrudProps }
export default {
	sortBy: [String, Function, Array] as PropType<CrudProps<DefaultRow>['sortBy']>,
	sortOrders: {
		type: Array as PropType<CrudProps<DefaultRow>['sortOrders']>,
		default: () => {
			return ['ascending', 'descending', null]
		},
		validator: (val: CrudProps<unknown>['sortOrders']) => {
			return val?.every((order: 'ascending' | 'descending' | null) => ['ascending', 'descending', null].includes(order))
		}
	},
	sortMethod: Function as PropType<CrudProps<DefaultRow>['sortMethod']>,
	spanMethod: Function as PropType<CrudProps<DefaultRow>['spanMethod']>,
	summaryMethod: Function as PropType<CrudProps<DefaultRow>['summaryMethod']>,
	rowStyle: [Object, Function] as PropType<CrudProps<DefaultRow>['rowStyle']>,
	cellStyle: [Object, Function] as PropType<CrudProps<DefaultRow>['cellStyle']>,
	beforeClose: Function as PropType<CrudProps<DefaultRow>['beforeClose']>,
	beforeOpen: Function as PropType<CrudProps<DefaultRow>['beforeOpen']>,
	rowClassName: [String, Function] as PropType<CrudProps<DefaultRow>['rowClassName']>,
	cellClassName: [String, Function] as PropType<CrudProps<DefaultRow>['cellClassName']>,
	headerRowClassName: [String, Function] as PropType<CrudProps<DefaultRow>['headerRowClassName']>,
	headerCellClassName: [String, Function] as PropType<CrudProps<DefaultRow>['headerCellClassName']>,
	uploadBefore: Function,
	uploadAfter: Function,
	uploadDelete: Function,
	uploadPreview: Function,
	uploadError: Function,
	uploadExceed: Function,
	permission: {
		type: [Function, Object] as PropType<CrudProps<DefaultRow>['permission']>,
		default: () => {
			return {}
		}
	},
	search: {
		type: Object as PropType<CrudProps<DefaultRow>['search']>,
		default() {
			return {}
		}
	},
	page: {
		type: Object as PropType<CrudProps<DefaultRow>['page']>,
		default() {
			return {}
		}
	},
	tableLoading: {
		type: Boolean,
		default: false
	},
	disabled: {
		type: Boolean,
		default: false
	},
	option: {
		type: Object as PropType<CrudProps<DefaultRow>['option']>,
		required: true,
		default() {
			return {}
		}
	},
	data: {
		type: Array as PropType<DefaultRow[]>,
		default: () => {
			return []
		}
	}
}

export const crudEmits = {
	close: (evt: MouseEvent) => evt instanceof MouseEvent,
	click: (evt: MouseEvent) => evt instanceof MouseEvent
}

export type CrudEmits = typeof crudEmits

export type CrudInstance = InstanceType<typeof Crud>

export interface FindData {
	item: any
	index: number
	parentList: any[]
	parent: any
}
