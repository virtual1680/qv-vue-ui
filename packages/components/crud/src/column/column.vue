<template>
	<slot name="header" />
	<!-- 动态列 -->
	<template v-for="(column, index) in list">
		<column-dynamic v-if="column.children && column.children.length > 0" :key="column.prop" :column-option="column">
			<template v-for="item in crud.mainSlot" #[item]="scope">
				<slot v-bind="scope" :name="item" />
			</template>
		</column-dynamic>
		<column-slot v-else :key="column.prop + index" :column="column" :column-option="columnList">
			<template v-for="item in crud.mainSlot" #[item]="scope">
				<slot v-bind="scope" :name="item" />
			</template>
		</column-slot>
	</template>
	<slot name="footer" />
</template>

<script setup lang="ts">
import { computed, inject, provide } from 'vue'
import { arraySort, validatenull } from '@qv-vue/utils'
import { DIC_PROPS } from '@qv-vue/constants'
import columnDynamic from './column-dynamic.vue'
import columnSlot from './column-slot.vue'
import type { QvColumn } from '@qv-vue/types/qvue-ui'
defineOptions({ name: 'table-column' })
const crud = inject<any>('crud')
const props = defineProps<{ columnList: QvColumn[] }>()

const list = computed(() => {
	let result = [...props.columnList]
	result = arraySort(result, 'index', (a: any, b: any) => crud.objectOption.value[a.prop]?.index - crud.objectOption.value[b.prop]?.index)
	// console.log('table-column-result-', result)

	return result
})
//表格筛选逻辑
const handleFiltersMethod = (value: any, row: any, column: any) => {
	const columnNew: QvColumn | undefined = props.columnList.find(ele => ele.prop === column.property)
	if (columnNew) {
		if (typeof columnNew.filtersMethod === 'function') {
			return columnNew.filtersMethod(value, row, columnNew)
		} else {
			return row[columnNew.prop] === value
		}
	}
}
//表格筛选字典
const handleFilters = (column: any, flag: any) => {
	if (flag !== true) return undefined
	const DIC = crud.DIC[column.prop] || []
	const list: any[] = []
	if (!validatenull(DIC)) {
		DIC.forEach((ele: any) => {
			const props = column.props || crud.tableOption.props || {}
			list.push({
				text: ele[props.label || DIC_PROPS.label],
				value: ele[props.value || DIC_PROPS.value]
			})
		})
	} else {
		crud.cellForm.list.forEach((ele: any) => {
			if (!list.map(item => item.text).includes(ele[column.prop])) {
				list.push({
					text: ele[column.prop],
					value: ele[column.prop]
				})
			}
		})
	}
	return list
}
//根据 type 获取 翻译的 column prop 数据
const getColumnProp = (column: QvColumn, type: 'filterMethod' | 'fixed' | 'width' | 'filters' | 'hide') => {
	if (type === 'filterMethod') return column.filters
	if (crud.isMobile && ['fixed'].includes(type)) return false
	const result = column[type]
	if (type == 'width' && result == 0) {
		return undefined
	}
	if (type == 'filters') return handleFilters(column, result)
	if (type == 'hide') {
		return column.hide !== true
	} else {
		return result
	}
}
provide('column', {
	crud,
	dynamic: { getColumnProp, handleFiltersMethod, handleFilters }
})
</script>
