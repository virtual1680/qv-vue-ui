<template>
	<div :class="b({ card: !tableOption?.card })">
		<component :is="tableOption.titleSize || 'h2'" v-if="tableOption.title" :style="tableOption.titleStyle">{{ tableOption.title }}</component>
		<!-- 搜索组件 -->
		<header-search ref="headerSearchRef">
			<template #search="scope">
				<slot name="search" v-bind="scope" />
			</template>
			<template #search-menu="scope">
				<slot name="search-menu" v-bind="scope" />
			</template>
			<template v-for="item in searchSlot" #[item]="scope">
				<slot v-bind="scope" :name="item" />
			</template>
		</header-search>
		<el-card :shadow="isCard">
			<!-- 表格功能列 -->
			<header-menu v-if="validData(tableOption.header, true)" ref="headerMenu">
				<template #menu-left="scope">
					<slot name="menu-left" v-bind="scope" />
				</template>
				<template #menu-right="scope">
					<slot name="menu-right" v-bind="scope" />
				</template>
			</header-menu>
			<div v-if="validData(tableOption.tip, config.tip) && tableOption.selection" class="qv-crud__tip">
				<span class="qv-crud__tip-name">
					{{ t('crud.tipStartTitle') }}
					<span class="qv-crud__tip-count">{{ selectLen }}</span>
					{{ t('crud.tipEndTitle') }}
				</span>
				<span class="qv-crud__tip-button" @click="tableRef?.clearSelection()">{{ t('crud.emptyBtn') }}</span>
				<slot name="tip" />
			</div>
			<slot name="header" />
			<el-form ref="cellFormRef" :model="cellForm" :show-message="false" @validate="handleValidate">
				<!-- {{ option.showHeader + '-=-=-=-' }} -->
				<el-table
					ref="tableRef"
					:key="reload"
					v-loading="tableLoading"
					:data="cellForm.list"
					:row-key="handleGetRowKeys"
					:class="{
						'qv-crud--indeterminate': validData(tableOption.indeterminate, false)
					}"
					:size="controlSize"
					:lazy="validData(tableOption.lazy, false)"
					:load="treeLoad"
					:row-class-name="rowClassName"
					:cell-class-name="cellClassName"
					:header-cell-class-name="headerCellClassName"
					:tree-props="treeProps"
					:sort-method="sortMethod"
					:sort-orders="sortOrders"
					:sort-by="sortBy"
					:expand-row-keys="tableOption.expandRowKeys"
					:default-expand-all="tableOption.defaultExpandAll"
					:highlight-current-row="tableOption.highlightCurrentRow"
					:show-summary="tableOption.showSummary"
					:summary-method="tableSummaryMethod"
					:span-method="spanMethod"
					:stripe="tableOption.stripe"
					:show-header="option.showHeader"
					:default-sort="tableOption.defaultSort"
					:fit="tableOption.fit"
					:max-height="isAutoHeight ? tableHeight : tableOption.maxHeight"
					:height="tableHeight"
					:width="setPx(tableOption.width, config.width)"
					:border="tableOption.border"
					:row-style="rowStyle"
					:cell-style="cellStyle"
					@filter-change="filterChange"
					@selection-change="selectionChange"
					@select="select"
					@select-all="selectAll"
					@sort-change="sortChange"
					@row-click="rowClick"
					@row-dblclick="rowDblclick"
					@cell-mouse-enter="cellMouseEnter"
					@cell-mouse-leave="cellMouseLeave"
					@cell-click="cellClick"
					@header-click="headerClick"
					@row-contextmenu="rowContextmenu"
					@header-contextmenu="headerContextmenu"
					@cell-dblclick="cellDblclick"
					@current-change="currentRowChange"
					@expand-change="expandChange"
					@header-dragend="headerDragend">
					<template #empty>
						<div :class="b('empty')">
							<slot v-if="slots.empty" name="empty" />
							<el-empty v-else :image-size="100" :description="tableOption.emptyText || '暂无数据'" />
						</div>
					</template>
					<table-column :column-list="columnOption">
						<template #header>
							<column-default ref="columnDefaultRef">
								<template #expand="{ row, index }">
									<slot :row="row" :index="index" name="expand" />
								</template>
							</column-default>
						</template>
						<template v-for="(item, index) in mainSlot" #[item]="scope" :key="index">
							<slot v-bind="scope" :name="item" />
						</template>
						<template #footer>
							<column-menu>
								<template #menu="scope">
									<slot name="menu" v-bind="scope" />
								</template>
								<template #menu-btn="scope">
									<slot name="menu-btn" v-bind="scope" />
								</template>
							</column-menu>
						</template>
					</table-column>
				</el-table>
			</el-form>
			<slot name="footer" />
		</el-card>
		<!-- 分页 -->
		<table-page ref="tablePageRef" :page="page">
			<template #page>
				<slot name="page" />
			</template>
		</table-page>
		<!-- 表单 -->
		<dialog-form ref="dialogFormRef">
			<template v-for="item in formSlot" #[item]="scope">
				<slot v-bind="scope" :name="item" />
			</template>
			<template #menu-form="scope">
				<slot name="menu-form" v-bind="scope" />
			</template>
		</dialog-form>
		<!-- <dialog-excel ref="dialogExcel"></dialog-excel> -->
		<dialog-column ref="dialogColumnRef"></dialog-column>
		<!-- <dialog-filter ref="dialogFilter"></dialog-filter> -->
	</div>
</template>
<script setup lang="ts">
// 	dialogFilter, //过滤器
// dialogExcel; //导出
import { provide, onMounted, ref, nextTick, watch, computed, useSlots, getCurrentInstance } from 'vue'
import { useBem } from '@qv-vue/hooks/useBem'
import { t } from '@qv-vue/locale'
import { deepClone, setPx, validData, validatenull } from '@qv-vue/utils'
import { formInitVal, getSlotList, useInitCrud } from '@qv-vue/hooks'
// import packages from '@qv-vue/core/packages'
import { DIC_PROPS } from '@qv-vue/constants'
import { ElTable } from 'element-plus'
import configDe from './config'
// import packages from 'core/packages';
// import permission from 'common/directive/permission';
import TablePage from './menu/table-page.vue' //分页
import DialogForm from './dialog/dialog-form.vue' //表单
import HeaderSearch from './menu/header-search.vue' //搜索
import TableColumn from './column/column.vue'
import columnMenu from './column/column-menu.vue' //操作栏，
import ColumnDefault from './column/column-default.vue' //其它列,
import HeaderMenu from './menu/header-menu.vue' //菜单头部
import DialogColumn from './dialog/dialog-column.vue' //显隐列
// import dialogFilter from './dialog/dialog-filter';
// import dialogExcel from './dialog/dialog-excel';
import crudProps from './crud'

import type { FormInstance } from 'element-plus'
import type { TreeNode } from 'element-plus/lib/components/table/src/table/defaults'
import type { TableColumnCtx } from 'element-plus/lib/components/table/src/table-column/defaults'
import type { Ref } from 'vue'
import type { FindData } from './crud'
// import type { QvOption } from '@qv-vue/types/qvue-ui'

defineOptions({
	name: 'qv-crud'
})

const props = defineProps(crudProps)

const { tableOption, rowKey, cascaderDIC, controlSize, DIC, isMobile, propOption, objectOption, isMediumSize } = useInitCrud(props)
const { b } = useBem('qv-crud')
const slots = useSlots()

const emit = defineEmits<{
	(e: 'update:modelValue', form: any): void
	(e: 'update:page'): void
	(e: 'update:search'): void
	(e: 'on-load'): void
	(e: 'cell-mouse-enter'): void
	(e: 'cell-mouse-leave'): void
	(e: 'search-change', form: Record<string, unknown>, done: () => void): void
	(e: 'search-reset', form: any): void
	(e: 'change', value: any): void
	// header-menu 刷新
	(e: 'refresh-change'): void

	(e: 'tree-load', row: any, treeNode: TreeNode, resolve: (data: any[]) => void): void
	(e: 'selection-clear', value: never[]): void
	(e: 'row-update', row: any, index: number, done: () => void, loading: () => void): void
	(e: 'row-save', row: any, done: () => void, loading: () => void): void
	(e: 'row-del', row: any, index: number, done: () => void): void
	(e: 'expand-change', row: any, expand: any): void
	(e: 'current-row-change', row: any): void
	(e: 'selection-change', value: any): void
	(e: 'select', selection: any, row: any): void
	(e: 'select-all', selection: any): void
	(e: 'header-dragend', newWidth: number, oldWidth: number, column: any, event: Event): void
	(e: 'filter-change', filters: any): void
	(e: 'sort-change', val: any): void
	(e: 'row-dblclick', row: any, event: Event): void
	(e: 'row-click', row: any, event: Event, column: any): void
	(e: 'cell-mouse-enter', row: any, column: any, cell: any, event: Event): void
	(e: 'cell-mouse-leave', row: any, column: any, cell: any, event: Event): void
	(e: 'cell-click', row: any, column: any, cell: any, event: Event): void
	(e: 'header-click', column: any, event: Event): void
	//header-menu 选择时间
	(e: 'date-change', date: string | string[]): void
	(e: 'row-contextmenu', row: any, column: any, event: Event): void
	(e: 'header-contextmenu', column: any, event: Event): void
	(e: 'cell-dblclick', row: any, column: any, cell: any, event: Event): void
	// 分页 start
	(e: 'size-change', value: number): void
	(e: 'current-change', value: number): void
	(e: 'prev-click', value: number): void
	(e: 'next-click', value: number): void
	// 分页 end
}>()

const cellForm = ref({
	list: [] as any[]
})
const config = ref(configDe) //
const listError: Ref<Record<string, any>> = ref({})
const tableForm: Ref<Record<string, any>> = ref({})
const tableHeight: Ref<string | number> = ref(0)
const tableIndex = ref(-1)
const tableSelect = ref([])
const formIndexList: Ref<number[]> = ref([])
// const sumsList = ref({});
const cascaderDicList: Ref<Record<string, any>> = ref({})
const btnDisabledList: Ref<Record<string, boolean>> = ref({})
const btnDisabled = ref(false)

// const	default = ref({});

const reload = ref(Math.random())
const list: Ref<any[]> = ref([])
const formCascaderList: Ref<any[]> = ref([])
const tableRef: Ref<InstanceType<typeof ElTable> | undefined> = ref()
const tablePageRef: Ref<InstanceType<typeof TablePage> | undefined> = ref()
const cellFormRef: Ref<FormInstance | undefined> = ref()
const dialogFormRef: Ref<InstanceType<typeof DialogForm> | undefined> = ref()
const headerSearchRef: Ref<InstanceType<typeof HeaderSearch> | undefined> = ref()
const columnDefaultRef: Ref<InstanceType<typeof ColumnDefault> | undefined> = ref()
const dialogColumnRef: Ref<InstanceType<typeof DialogColumn> | undefined> = ref()
const $qv = getCurrentInstance()?.proxy?.['$qv']
const dataInit = () => {
	list.value = props.data
	//初始化序列的参数
	list.value.forEach((ele: any, index: number) => {
		if (ele.$cellEdit && !formCascaderList.value[index]) {
			formCascaderList.value[index] = deepClone(ele)
		}
		ele.$cellEdit = ele.$cellEdit || false
		ele.$index = index
	})
}
// 单个选择回调
const select = (selection: any, row: any) => {
	emit('select', selection, row)
}
// 点击勾选全选 Checkbox
const selectAll = (selection: any) => {
	emit('select-all', selection)
}
//筛选回调用
const filterChange = (filters: any) => {
	emit('filter-change', filters)
}
// 排序回调
const sortChange = (val: any) => {
	emit('sort-change', val)
}
// 行双击
const rowDblclick = (row: any, event: Event) => {
	emit('row-dblclick', row, event)
}
// 行单机
const rowClick = (row: any, event: Event, column: any) => {
	emit('row-click', row, event, column)
}
//展开或则关闭
const expandChange = (row: any, expand: any) => {
	emit('expand-change', row, expand)
}
//设置单选
const currentRowChange = (row: any) => {
	emit('current-row-change', row)
}
//刷新事件
const refreshChange = () => {
	emit('refresh-change')
}
// 选择回调
const selectionChange = (val: any) => {
	tableSelect.value = val
	emit('selection-change', tableSelect.value)
}
//当单元格 hover 进入时会触发该事件
const cellMouseEnter = (row: any, column: any, cell: any, event: Event) => {
	emit('cell-mouse-enter', row, column, cell, event)
}
//当单元格 hover 退出时会触发该事件
const cellMouseLeave = (row: any, column: any, cell: any, event: Event) => {
	emit('cell-mouse-leave', row, column, cell, event)
}
//当某个单元格被点击时会触发该事件
const cellClick = (row: any, column: any, cell: any, event: Event) => {
	emit('cell-click', row, column, cell, event)
}
//	当某一列的表头被点击时会触发该事件
const headerClick = (column: any, event: Event) => {
	emit('header-click', column, event)
}
//当某一行被鼠标右键点击时会触发该事件
const rowContextmenu = (row: any, column: any, event: Event) => {
	emit('row-contextmenu', row, column, event)
}
//当某一列的表头被鼠标右键点击时触发该事件
const headerContextmenu = (column: any, event: Event) => {
	emit('header-contextmenu', column, event)
}
//当某个单元格被双击击时会触发该事件
const cellDblclick = (row: any, column: any, cell: any, event: Event) => {
	emit('cell-dblclick', row, column, cell, event)
}
//拖动表头事件
const headerDragend = (newWidth: number, oldWidth: number, column: any, event: Event) => {
	objectOption.value[column.property].width = newWidth
	emit('header-dragend', newWidth, oldWidth, column, event)
}

const refreshTable = (callback?: () => void) => {
	reload.value = Math.random()
	tableSelect.value = []
	nextTick(() => {
		callback?.()
	})
}
const getTableHeight = () => {
	if (isAutoHeight.value) {
		nextTick(() => {
			if (!tableRef.value) return
			const tableStyle = tableRef.value.$el
			const pageStyle = tablePageRef.value?.$el.offsetHeight || 20
			tableHeight.value = document.documentElement.clientHeight - tableStyle.offsetTop - pageStyle - calcHeight.value
		})
	} else {
		tableHeight.value = tableOption.value.height
	}
	refreshTable()
}
const handleValidate = (prop: string, valid: boolean, msg: string) => {
	if (!listError.value[prop]) listError.value[prop] = { valid: false, msg: '' }
	listError.value[prop].valid = !valid
	listError.value[prop].msg = msg
}
const getPermission = (key: string, row: unknown, index: number) => {
	if (typeof props.permission === 'function') {
		return props.permission(key, row, index)
	} else if (!validatenull(props.permission?.[key])) {
		return props.permission?.[key]
	} else {
		return true
	}
}

const doLayout = () => {
	tableRef.value?.doLayout()
}

//树懒加载
const treeLoad = (row: any, treeNode: TreeNode, resolve: (data: any[]) => void) => {
	emit('tree-load', row, treeNode, (data: any[]) => {
		row.children = data
		resolve(data)
	})
}
const menuIcon = (value: string) => {
	return validData(tableOption.value[`${value}Text`], t(`crud.${value}`))
}
// * 获取按钮图标
const getBtnIcon = (value: string) => {
	const name = `${value}Icon`
	//如果没有自定义 则取默认图标
	return tableOption.value[name] || config.value[name]
}
//对部分表单字段进行校验的方法
const validateField = (val: any) => {
	return dialogFormRef.value?.tableFormRef?.validateField(val)
}
const handleGetRowKeys = (row: any) => {
	return row[rowKey.value]
}
const selectClear = () => {
	emit('selection-clear', deepClone(tableSelect.value))
	tableRef.value?.clearSelection()
}

const headerSort = (oldIndex: number, newIndex: number) => {
	const column = columnOption.value
	const targetRow = column.splice(oldIndex, 1)[0]
	column.splice(newIndex, 0, targetRow)
	refreshTable()
}
const clearFilter = (name: any) => {
	tableRef.value?.clearFilter(name)
}

// 选中实例
const toggleSelection = (rows: any[]) => {
	if (rows) {
		rows.forEach((row: any) => {
			tableRef.value?.toggleRowSelection(row, true)
		})
	} else {
		tableRef.value?.clearSelection()
	}
}

// * 行编辑点击
const rowCell = (row: any, index: number) => {
	if (row.$cellEdit) {
		rowCellUpdate(row, index)
	} else {
		rowCellEdit(row, index)
	}
}
// * 单元格新增
const rowCellAdd = (row = {}) => {
	const len = list.value.length
	const formDefault = formInitVal(propOption.value)
	row = deepClone(
		Object.assign(
			{
				$cellEdit: true,
				$index: len
			},
			formDefault,
			row
		)
	)
	list.value.push(row)
	formIndexList.value.push(len)
	setTimeout(() => columnDefaultRef.value?.setSort())
}
// * 行取消
const rowCancel = (row: any, index: number) => {
	if (validatenull(row[rowKey.value])) {
		list.value.splice(index, 1)
		return
	}
	formCascaderList.value[index].$cellEdit = false
	//设置行数据
	list.value[index] = formCascaderList.value[index]
	delete formCascaderList.value[index]
	//设置级联字典
	cascaderDIC.value[index] = cascaderDicList.value[index]
	formIndexList.value.splice(formIndexList.value.indexOf(index), 1)
}
// * 单元格编辑
const rowCellEdit = (row: any, index: number) => {
	row.$cellEdit = true
	list.value[index] = row
	//缓冲行数据
	formCascaderList.value[index] = deepClone(row)
	//缓冲级联字典
	cascaderDicList.value[index] = deepClone(cascaderDIC.value[index])
	setTimeout(() => {
		formIndexList.value.push(index)
	}, 1000)
}
// * 对部分表单字段进行校验 //cb
const validateCellForm = () => {
	return new Promise(resolve => {
		cellFormRef.value?.validate((valid, fields) => {
			resolve(fields)
		})
	})
}
const validateCellField = (index: any) => {
	let result = true
	for (const item of cellFormRef.value?.fields || []) {
		// .split('.')
		if (item.prop?.[1] == index) {
			cellFormRef.value?.validateField(item.prop, (error: any) => {
				if (error) {
					result = false
				}
			})
		}
		if (!result) break
	}
	return result
}
const rowCellUpdate = (row: any, index: number) => {
	row = deepClone(row)
	const done = () => {
		btnDisabledList.value[index] = false
		btnDisabled.value = false
		row.$cellEdit = false
		list.value[index] = row
		delete formCascaderList.value[index]
	}
	const loading = () => {
		btnDisabledList.value[index] = false
		btnDisabled.value = false
	}
	cellFormRef.value?.validate(valid => {
		if (valid) {
			btnDisabledList.value[index] = true
			btnDisabled.value = true
			if (validatenull(row[rowKey.value])) {
				emit('row-save', row, done, loading)
			} else {
				emit('row-update', row, index, done, loading)
			}
		}
	})
}

// const getPropRef = (prop: any) => {
// 	return dialogFormRef.value?.tableFormRef?.getPropRef(prop);
// };
// * 对象克隆
const rowClone = (row: Record<string, any>) => {
	const rowData: Record<string, unknown> = {}
	Object.keys(row).forEach(ele => {
		if (!['_parent', 'children'].includes(ele)) {
			rowData[ele] = row[ele]
		}
	})
	return rowData
}
// * 编辑
const rowEdit = (row: any, index: number) => {
	tableForm.value = rowClone(row)
	tableIndex.value = index
	emit('update:modelValue', tableForm.value)
	dialogFormRef.value?.show('edit')
}
// * 复制
const rowCopy = (row: any) => {
	tableForm.value = rowClone(row)
	delete tableForm.value[rowKey.value]
	tableIndex.value = -1
	emit('update:modelValue', tableForm.value)
	dialogFormRef.value?.show('add')
}
// * 查看
const rowView = (row: any, index: number) => {
	tableForm.value = rowClone(row)
	tableIndex.value = index
	emit('update:modelValue', tableForm.value)
	dialogFormRef.value?.show('view')
}
// * 删除
const rowDel = (row: any, index: number) => {
	emit('row-del', row, index, () => {
		const { parentList, index } = findData(row[rowKey.value])
		if (parentList) parentList.splice(index, 1)
	})
}
// * 合集统计逻辑
const tableSummaryMethod = <T = any>(param: { columns: TableColumnCtx<T>[]; data: T[] }) => {
	// let sumsList = {};
	if (typeof props.summaryMethod === 'function') return props.summaryMethod(param)
	const { columns, data } = param
	const sums: string[] = []
	if (columns.length > 0) {
		columns.forEach((column: TableColumnCtx<T>, index: number) => {
			const currItem = sumColumnList.value.find((item: any) => item.name === column.property)
			if (currItem) {
				const decimals = currItem.decimals || 2
				const label = currItem.label || ''
				let sumsIndex = 0

				if (currItem.type === 'avg') {
					sums[index] = label + data.length
				} else if (currItem.type === 'count') {
					const avgValues = data.map((item: Record<string, any>) => {
						return item[column.property]
					})
					let nowindex = 1
					sumsIndex = avgValues.reduce((perv: number, curr: number) => {
						const value = Number(curr)
						if (!Number.isNaN(value)) {
							return (perv * (nowindex - 1) + curr) / nowindex++
						} else {
							return perv
						}
					}, 0)
					sums[index] = label + sumsIndex.toFixed(decimals)
				} else if (currItem.type === 'sum') {
					const values = data.map((item: any) => Number(item[column.property] as number))
					sumsIndex = values.reduce((perv: number, curr: number) => {
						const value = Number(curr)
						if (!Number.isNaN(value)) {
							return perv + curr
						} else {
							return perv
						}
					}, 0)
					sums[index] = label + sumsIndex.toFixed(decimals)
				}
			} else {
				sums[index] = ''
			}
		})
	}
	// sumsList.value = sumsList;
	return sums
}
const tableDrop = (type: string, el: any, callback: (e: Event) => void) => {
	if (isSortable.value !== true) {
		if (type == 'row' && !isRowSort.value) {
			return
		} else if (type == 'column' && !isColumnSort.value) {
			return
		}
	}
	// if (!window['Sortable']) {
	//   packages.logs('Sortable')
	//   return
	// }
	// window['Sortable'].create(el, {
	//   ghostClass: config.value.ghostClass, //config.ghostClass
	//   chosenClass: config.value.ghostClass, //config.ghostClass
	//   animation: 500,
	//   delay: 0,
	//   onEnd: (evt: any) => callback(evt),
	// })
}

const findData = (id: string) => {
	let result: FindData = {} as FindData
	const callback = (parentList: any[], parent?: any) => {
		parentList.forEach((ele, index) => {
			if (ele[rowKey.value] == id) {
				result = {
					item: ele,
					index,
					parentList,
					parent
				}
			}
			if (ele[childrenKey.value]) {
				callback(ele[childrenKey.value], ele)
			}
		})
	}
	callback(list.value)
	return result
}

const isSortable = computed(() => {
	return tableOption.value.sortable
})
const isRowSort = computed(() => {
	return tableOption.value.rowSort
})
const isColumnSort = computed(() => {
	return tableOption.value.columnSort
})
// const rowParentKey = computed(() => {
// 	return tableOption.value.rowParentKey || DIC_PROPS.rowParentKey
// })
const childrenKey = computed(() => {
	return treeProps.value.children || DIC_PROPS.children //
})
const hasChildrenKey = computed(() => {
	return treeProps.value.hasChildren || DIC_PROPS.hasChildren
})
const treeProps = computed(() => {
	return tableOption.value.treeProps || {}
})
const isAutoHeight = computed(() => {
	return tableOption.value.height === 'auto'
})
const formSlot = computed(() => {
	return getSlotList(['-error', '-label', '-type', '-form'], slots, propOption.value)
})
const searchSlot = computed(() => {
	return getSlotList(['-search'], slots, propOption.value)
})
const mainSlot = computed(() => {
	const result: any[] = []
	// console.log('propOption-=-=-=', propOption.value)
	propOption.value.forEach((item: any) => {
		if (slots[item.prop]) result.push(item.prop)
	})
	return getSlotList(['-header', '-form'], slots, propOption.value).concat(result)
})
const calcHeight = computed(() => {
	return tableOption.value.calcHeight || $qv.calcHeight
})

const isShowSummary = computed(() => {
	return tableOption.value.showSummary
})
const isHeader = computed(() => {
	let flag = false
	columnOption.value.forEach((ele: any) => {
		if (ele.children) {
			flag = true
		}
	})
	return flag
})
const isTree = computed(() => {
	let flag = false
	props.data.forEach((ele: any) => {
		if (ele.children) {
			flag = true
		}
	})
	return validData(tableOption.value.tree, flag)
})
const isCard = computed(() => {
	return tableOption.value.card ? 'always' : 'never'
})
// const expandLevel = computed(() => {
// 	return parentOption.value.expandLevel || 0
// })
// const expandAll = computed(() => {
// 	return parentOption.value.expandAll || false
// })
const parentOption = computed(() => {
	return tableOption.value || {}
})
const columnOption = computed(() => {
	return props.option.column || []
})
const sumColumnList = computed(() => {
	return tableOption.value.sumColumnList || []
})
const selectLen = computed(() => {
	return tableSelect.value ? tableSelect.value.length : 0
})

const rowAdd = () => {
	dialogFormRef.value?.show('add')
}

watch(
	() => list.value,
	() => {
		cellForm.value.list = list.value
		// console.log('-=-=-=-=-=-=', cellForm.value.list, list.value)
	},
	{
		deep: true
	}
)

watch(
	() => props.data,
	() => {
		dataInit()
	},
	{
		deep: true
	}
)
onMounted(() => {
	dataInit()
	getTableHeight()
})
provide('crud', {
	page: props.page,
	option: props.option,
	parentOption,
	tableOption,
	formSlot: formSlot.value,
	mainSlot,
	controlSize,
	isMobile: isMobile.value,
	DIC,
	tableForm: tableForm.value,
	childrenKey: childrenKey.value,
	hasChildrenKey,
	tableIndex,
	beforeClose: props.beforeClose,
	beforeOpen: props.beforeOpen,
	getTableHeight,
	isCard: isCard.value,
	emit,
	search: props.search,
	searchSlot,
	getBtnIcon,
	propOption, //有点问题
	slots,
	getPermission,
	objectOption,
	formIndexList,
	btnDisabled: btnDisabled.value,
	isMediumSize: isMediumSize.value,
	rowCopy,
	rowEdit,
	rowView,
	rowDel,
	rowCellAdd,
	rowCell,
	rowCancel,
	menuIcon,
	btnDisabledList: btnDisabledList.value,
	headerSearchRef,
	refreshChange,
	rowAdd,
	dialogColumnRef,
	isHeader,
	isTree,
	isShowSummary,
	headerSort
})

const rowSave = () => {
	return dialogFormRef.value?.tableFormRef?.submit()
}
const rowUpdate = () => {
	return dialogFormRef.value?.tableFormRef?.submit()
}
const closeDialog = () => {
	return dialogFormRef.value?.closeDialog()
}
const toggleRowSelection = (row: any, selected: any) => {
	tableRef.value?.toggleRowSelection(row, selected)
}
const toggleRowExpansion = (row: any, expanded: any) => {
	tableRef.value?.toggleRowExpansion(row, expanded)
}
const setCurrentRow = (row: any) => {
	tableRef.value?.setCurrentRow(row)
}
//清空排序
const clearSort = () => {
	tableRef.value?.clearSort()
}

defineExpose({
	rowDel,
	clearSort,
	rowView,
	rowCopy,
	rowEdit,
	rowAdd,
	rowSave,
	rowUpdate,
	closeDialog,
	validateCellForm,
	validateCellField,
	toggleRowSelection,
	toggleRowExpansion,
	setCurrentRow,
	toggleSelection,
	doLayout,
	refreshTable,
	tableDrop,
	validateField,
	clearFilter,
	selectClear
})
</script>
