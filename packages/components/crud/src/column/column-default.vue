<!-- eslint-disable vue/no-lone-template -->
<!-- eslint-disable vue/valid-attribute-name -->
<template>
	<!-- 折叠面板  -->
	<el-table-column
		v-if="crud.tableOption.value.expand"
		type="expand"
		:width="crud.tableOption.value.expandWidth || config.expandWidth"
		:fixed="validData(crud.tableOption.value.expandFixed, config.expandFixed)"
		align="center">
		<template #="{ row }">
			<slot :row="row" :index="row.$index" name="expand" />
		</template>
	</el-table-column>
	<!-- 选择框 -->
	<el-table-column
		v-if="crud.tableOption.value.selection"
		:fixed="validData(crud.tableOption.value.selectionFixed, config.selectionFixed)"
		type="selection"
		:selectable="crud.tableOption.value.selectable"
		:reserve-selection="validData(crud.tableOption.value.reserveSelection)"
		:width="crud.tableOption.value.selectionWidth || config.selectionWidth"
		align="center" />
	<!-- 序号 -->
	<el-table-column
		v-if="validData(crud.tableOption.value.index)"
		:fixed="validData(crud.tableOption.value.indexFixed, config.indexFixed)"
		:label="crud.tableOption.value.indexLabel || config.indexLabel"
		type="index"
		:width="crud.tableOption.value.indexWidth || config.indexWidth"
		:index="indexMethod"
		align="center" />
</template>

<script setup lang="ts" name="column-default">
import { inject } from 'vue'
import { validData } from '@qv-vue/utils'
import config from '../config'
defineOptions({
	name: 'column-default'
})
const crud = inject<any>('crud')

const indexMethod = (index: number) => {
	return index + 1 + ((crud.page.currentPage || 1) - 1) * (crud.page.pageSize || 10)
}
const setSort = () => {
	rowDrop()
	columnDrop()
}
const rowDrop = () => {
	const el = crud.tableRef.$el.querySelectorAll(config.dropRowClass)[0]
	crud.tableDrop('row', el, (evt: any) => {
		const oldIndex = evt.oldIndex
		const newIndex = evt.newIndex
		const targetRow = crud.list.splice(oldIndex, 1)[0]
		crud.list.splice(newIndex, 0, targetRow)
		crud.emit('sortable-change', oldIndex, newIndex)
		crud.refreshTable(() => rowDrop())
	})
}
const columnDrop = () => {
	let el = crud.tableRef.value.$el.querySelector(config.dropColClass)
	crud.tableDrop('column', el, (evt: any) => {
		crud.headerSort(evt.oldIndex, evt.newIndex)
		columnDrop()
	})
}
defineExpose({ setSort })
</script>
