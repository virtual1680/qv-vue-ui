<template>
	<div :class="b('menu')">
		<div :class="b('left')">
			<el-button
				v-if="validData(crud.tableOption.value.addBtn, config.addBtn)"
				v-permission="crud.getPermission('addBtn')"
				type="primary"
				:icon="crud.getBtnIcon('addBtn')"
				:size="crud.isMediumSize"
				@click="crud.rowAdd">
				<template v-if="!crud.isIconMenu">
					{{ crud.menuIcon('addBtn') }}
				</template>
			</el-button>
			<el-button
				v-if="validData(crud.tableOption.value.addRowBtn, config.addRowBtn)"
				v-permission="crud.getPermission('addRowBtn')"
				type="primary"
				:icon="crud.getBtnIcon('addBtn')"
				:size="crud.isMediumSize"
				@click="crud.rowCellAdd">
				<template v-if="!crud.isIconMenu">
					{{ crud.menuIcon('addBtn') }}
				</template>
			</el-button>
			<slot name="menu-left" :size="crud.isMediumSize" />
		</div>
		<div :class="b('right')">
			<qv-date
				v-if="validData(crud.tableOption.value.dateBtn, config.dateBtn)"
				type="datetimerange"
				style="display: inline-block; margin-right: 20px"
				:column="state.pickerOptions"
				:size="crud.isMediumSize"
				@change="dateChange" />
			<slot name="menu-right" :size="crud.isMediumSize" />
			<el-button
				v-if="validData(crud.tableOption.value.excelBtn, config.excelBtn)"
				v-permission="crud.getPermission('excelBtn')"
				:icon="crud.getBtnIcon('excelBtn')"
				circle
				:size="crud.isMediumSize"
				@click="rowExcel" />
			<el-button
				v-if="validData(crud.tableOption.value.refreshBtn, config.refreshBtn)"
				v-permission="crud.getPermission('refreshBtn')"
				:icon="crud.getBtnIcon('refreshBtn')"
				circle
				:size="crud.isMediumSize"
				@click="crud.refreshChange" />
			<el-button
				v-if="validData(crud.tableOption.value.columnBtn, config.columnBtn)"
				v-permission="crud.getPermission('columnBtn')"
				:icon="crud.getBtnIcon('columnBtn')"
				circle
				:size="crud.isMediumSize"
				@click="crud.dialogColumnRef.value.columnBox = true" />
			<el-button
				v-if="(crud.headerSearchRef.value || {}).searchFlag && validData(crud.tableOption.value.searchShowBtn, true)"
				:icon="crud.getBtnIcon('searchBtn')"
				circle
				:size="crud.isMediumSize"
				@click="crud.headerSearchRef.value.handleSearchShow()" />
			<el-button
				v-if="validData(crud.tableOption.value.filterBtn, config.filterBtn)"
				v-permission="crud.getPermission('filterBtn')"
				:icon="crud.getBtnIcon('filterBtn')"
				circle
				:size="crud.isMediumSize"
				@click="crud.dialogFilterRef.box = true" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { inject, reactive } from 'vue'
import { useBem } from '@qv-vue/hooks'
import { validData } from '@qv-vue/utils'
import config from '../config'

const { b } = useBem('qv-crud')
const crud = inject<any>('crud')
defineOptions({
	name: 'header-menu'
})
const state = reactive({
	dateCreate: false,
	pickerOptions: {
		valueFormat: 'YYYY-MM-DD HH:mm:ss',
		format: 'YYYY-MM-DD HH:mm:ss',
		shortcuts: [
			{
				text: '昨日',
				value: () => {
					const end = new Date()
					const start = new Date()
					start.setTime(start.getTime() - 3600 * 1000 * 24 * 1)
					return [start, end]
				}
			},
			{
				text: '最近一周',
				value: () => {
					const end = new Date()
					const start = new Date()
					start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
					return [start, end]
				}
			},
			{
				text: '最近一个月',
				value: () => {
					const end = new Date()
					const start = new Date()
					start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
					return [start, end]
				}
			},
			{
				text: '最近三个月',
				value: () => {
					const end = new Date()
					const start = new Date()
					start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
					return [start, end]
				}
			}
		]
	},
	config
})
// const data = computed(() => {
// 	if (crud.tableOption.value.selection) {
// 		return crud.tableSelect.value;
// 	} else {
// 		return crud.list.value;
// 	}
// });
//日期组件回调
const dateChange = (data: any) => {
	crud.emit('date-change', data.value)
	// if (state.dateCreate) {
	// 	crud.emit('date-change', data)
	// } else {
	// 	state.dateCreate = true
	// }
}
const initFun = () => {
	crud.rowExcel = rowExcel
}
const rowExcel = () => {
	crud.dialogExcelRef.value.handleShow()
}

initFun()
</script>
