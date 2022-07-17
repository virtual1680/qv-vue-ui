<template>
	<div :class="b('menu')">
		<div :class="b('left')">
			<el-button
				type="primary"
				@click="crud.rowAdd"
				:icon="crud.getBtnIcon('addBtn')"
				:size="crud.isMediumSize"
				v-permission="crud.getPermission('addBtn')"
				v-if="validData(crud.tableOption.value.addBtn, config.addBtn)"
			>
				<template v-if="!crud.isIconMenu">
					{{ crud.menuIcon('addBtn') }}
				</template>
			</el-button>
			<el-button
				type="primary"
				@click="crud.rowCellAdd"
				:icon="crud.getBtnIcon('addBtn')"
				v-permission="crud.getPermission('addRowBtn')"
				:size="crud.isMediumSize"
				v-if="validData(crud.tableOption.value.addRowBtn, config.addRowBtn)"
			>
				<template v-if="!crud.isIconMenu">
					{{ crud.menuIcon('addBtn') }}
				</template>
			</el-button>
			<slot name="menu-left" :size="crud.isMediumSize"></slot>
		</div>
		<div :class="b('right')">
			<qvue-date
				type="datetimerange"
				@change="dateChange"
				value-format="YYYY-MM-DD HH:mm:ss"
				format="YYYY-MM-DD HH:mm:ss"
				:column="state.pickerOptions"
				style="display: inline-block; margin-right: 20px"
				v-if="validData(crud.tableOption.value.dateBtn, config.dateBtn)"
				:size="crud.isMediumSize"
			></qvue-date>
			<slot name="menu-right" :size="crud.isMediumSize"></slot>
			<el-button
				:icon="crud.getBtnIcon('excelBtn')"
				circle
				:size="crud.isMediumSize"
				@click="rowExcel"
				v-permission="crud.getPermission('excelBtn')"
				v-if="validData(crud.tableOption.value.excelBtn, config.excelBtn)"
			>
			</el-button>
			<el-button
				:icon="crud.getBtnIcon('refreshBtn')"
				circle
				:size="crud.isMediumSize"
				@click="crud.refreshChange"
				v-permission="crud.getPermission('refreshBtn')"
				v-if="validData(crud.tableOption.value.refreshBtn, config.refreshBtn)"
			></el-button>
			<el-button
				:icon="crud.getBtnIcon('columnBtn')"
				circle
				:size="crud.isMediumSize"
				@click="crud.dialogColumnRef.columnBox = true"
				v-permission="crud.getPermission('columnBtn')"
				v-if="validData(crud.tableOption.value.columnBtn, config.columnBtn)"
			></el-button>
			<el-button
				:icon="crud.getBtnIcon('searchBtn')"
				circle
				:size="crud.isMediumSize"
				@click="crud.headerSearchRef.value.handleSearchShow()"
				v-if="(crud.headerSearchRef.value || {}).searchFlag && validData(crud.tableOption.value.searchShowBtn, true)"
			></el-button>
			<el-button
				:icon="crud.getBtnIcon('filterBtn')"
				circle
				:size="crud.isMediumSize"
				@click="crud.dialogFilterRef.box = true"
				v-permission="crud.getPermission('filterBtn')"
				v-if="validData(crud.tableOption.value.filterBtn, config.filterBtn)"
			></el-button>
		</div>
	</div>
</template>

<script setup lang="ts" name="header-menu">
import { validData } from '@qvue/utils';
import config from '../config';
import { useBem } from '@qvue/hooks/useBem';
import { inject, reactive } from 'vue';
const { b } = useBem('qvue-crud');
const crud = inject<any>('crud');
let state = reactive({
	dateCreate: false,
	pickerOptions: {
		shortcuts: [
			{
				text: '今日',
				onClick(picker: any) {
					const end = new Date();
					const start = new Date();
					start.setTime(start.getTime());
					picker.emit('pick', [start, end]);
				},
			},
			{
				text: '昨日',
				onClick(picker: any) {
					const end = new Date();
					const start = new Date();
					start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
					picker.emit('pick', [start, end]);
				},
			},
			{
				text: '最近一周',
				onClick(picker: any) {
					const end = new Date();
					const start = new Date();
					start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
					picker.emit('pick', [start, end]);
				},
			},
			{
				text: '最近一个月',
				onClick(picker: any) {
					const end = new Date();
					const start = new Date();
					start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
					picker.emit('pick', [start, end]);
				},
			},
			{
				text: '最近三个月',
				onClick(picker: any) {
					const end = new Date();
					const start = new Date();
					start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
					picker.emit('pick', [start, end]);
				},
			},
		],
	},
	config: config,
});
// const data = computed(() => {
// 	if (crud.tableOption.value.selection) {
// 		return crud.tableSelect.value;
// 	} else {
// 		return crud.list.value;
// 	}
// });
//日期组件回调
const dateChange = (data: string | string[]) => {
	if (state.dateCreate) {
		crud.emit('date-change', data);
	} else {
		state.dateCreate = true;
	}
};
const initFun = () => {
	crud.rowExcel = rowExcel;
};
const rowExcel = () => {
	crud.dialogExcelRef.value.handleShow();
};

initFun();
</script>
