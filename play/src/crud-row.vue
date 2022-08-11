<template>
	<div>
		<div class="wel__header">表行</div>
		<qv-crud
			ref="avueRef"
			:data="config.data"
			:option="option"
			@selection-change="selectionChange"
			:cell-style="cellStyle"
			:row-style="rowStyle"
			@on-load="onLoad"
			:span-method="spanMethod"
			@row-click="rowClick"
			:page="config.page"
			:row-class-name="tableRowClassName">
			<template #menu-left="{ size }">
				<el-button type="success" icon="el-icon-check" :size="size" @click="toggleSelection([config.data[1]])">选中第二行</el-button>
				<el-button type="danger" icon="el-icon-delete" :size="size" @click="toggleSelection()">取消选择</el-button>
			</template>
			<template #tip>
				<el-tag type="danger" size="mini">自定义内容</el-tag>
			</template>
			<template #radio="{ row }">
				<el-radio v-model="config.selectRow" :label="row.$index">-</el-radio>
			</template>
		</qv-crud>
	</div>
</template>

<script lang="ts" setup>
import { computed, reactive, Ref, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { CrudInstance } from '../../packages/qv-vue/index'

const avueRef: Ref<CrudInstance | undefined> = ref()
let config = reactive({
	selectRow: '',
	page: {
		total: 0,
		currentPage: 1,
		pageSize: 2
	},
	search: {
		name: 'small',
		sex: 1
	},
	data: [
		{
			name: '张三',
			sex: '男'
		},
		{
			name: '王五',
			sex: '女'
		}
	],
	menuType: 'text',
	showLoading: false,
	showCard: false,
	showBorder: true,
	showStripe: false,
	showHeader: true,
	showIndex: true,
	showCheckbox: false,
	showPage: true,
	sizeValue: 'small'
})
const option = computed(() => {
	return {
		tip: true, //是否显示多选提示信息
		border: true, //是否显示边框
		stripe: true, // 斑马线
		selection: false,
		// 禁止选择第一条
		selectable: (row: any, index: number) => {
			return index === 1
		},
		// 分页保留之前勾选的数据
		reserveSelection: false,
		// index: true,
		rowKey: 'name',
		searchLabelWidth: 160, // 可以全局设置
		column: [
			{
				label: '',
				prop: 'radio',
				width: 60,
				hide: false
			},
			{
				label: '我是超级长姓名',
				type: 'input',
				prop: 'name',
				search: true
			},
			{
				search: true,
				label: '性别',
				prop: 'sex',
				type: 'select',
				dicData: [
					{ label: '男', value: 1 },
					{ label: '女', value: 2 }
				]
			},
			{
				search: true,
				label: '性别1',
				prop: 'sex1',
				type: 'select',
				dicData: [
					{ label: '男', value: 1 },
					{ label: '女', value: 2 }
				]
			}
		]
	}
})
const onLoad = (page: any) => {
	console.log('-=-=-=onLoad-=-=-==--=-=', page)

	config.page.total = 4
	//模拟分页
	if (page.currentPage === 1) {
		config.data = [
			{
				name: '张三',
				sex: '男'
			},
			{
				name: '李四',
				sex: '女'
			}
		]
	} else if (page.currentPage == 2) {
		config.data = [
			{
				name: '王五',
				sex: '女'
			},
			{
				name: '赵六',
				sex: '女'
			}
		]
	}
}
const spanMethod = ({ row, column, rowIndex, columnIndex }) => {
	if (rowIndex % 2 === 0) {
		if (columnIndex === 0) {
			return [1, 2]
		} else if (columnIndex === 1) {
			return [0, 0]
		}
	}
}
const rowClick = row => {
	config.selectRow = row.$index
	ElMessage.success('选择序号' + row.$index)
}
const selectionChange = (list: any) => {
	ElMessage.success('选中的数据' + JSON.stringify(list))
}
const toggleSelection = (val?: any) => {
	avueRef.value?.toggleSelection(val)
}
const rowStyle = ({ rowIndex }: { row: any; rowIndex: number }) => {
	if (rowIndex % 2 === 0) {
		return {
			backgroundColor: '#eee',
			color: '#fff'
		}
	}
}
const cellStyle = ({ row, columnIndex }: { row: any; column: any; rowIndex: number; columnIndex: number }) => {
	if (columnIndex == 1) {
		if (row.money <= 3000) {
			return {
				color: 'green',
				fontWeight: 'bold',
				fontSize: '20'
			}
		} else {
			return {
				color: 'red',
				fontWeight: 'bold',
				fontSize: '20'
			}
		}
	}
}
const tableRowClassName = ({ row, rowIndex }) => {
	if (rowIndex === 0) {
		return 'warning-row'
	} else if (rowIndex === 1) {
		return 'success-row'
	}
	return ''
}
</script>

<style scoped="scoped" lang="scss">
.wel {
	&__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 25px 40px;
		background-color: #ffffff;
		border-bottom: 1px solid #e8e8e8;
	}
	&__info {
		display: flex;
		align-items: center;
		&-img {
			display: block;
			width: 72px;
			height: 72px;
			border-radius: 72px;
			img {
				display: block;
				width: 100%;
				height: 100%;
			}
		}
		&-content {
			position: relative;
			margin-left: 24px;
			line-height: 22px;
			color: rgb(0 0 0 / 45%);
		}
		&-title {
			margin-bottom: 12px;
			font-size: 20px;
			font-weight: 500;
			line-height: 28px;
			color: rgb(0 0 0 / 85%);
		}
		&-subtitle {
			position: relative;
			font-size: 14px;
			line-height: 22px;
			color: rgb(0 0 0 / 45%);
		}
	}
	&__extra {
		&-item {
			position: relative;
			display: inline-block;
			padding: 0 32px;
			&:last-child {
				&::after {
					display: none;
				}
			}
			&::after {
				position: absolute;
				top: 30px;
				right: 0;
				width: 1px;
				height: 40px;
				content: '';
				background-color: #e8e8e8;
			}
		}
		&-title {
			margin-bottom: 4px;
			font-size: 14px;
			line-height: 22px;
			color: rgb(0 0 0 / 45%);
		}
		&-subtitle {
			margin: 0;
			font-size: 30px;
			line-height: 38px;
			color: rgb(0 0 0 / 85%);
			span {
				font-size: 20px;
				color: rgb(0 0 0 / 45%);
			}
		}
	}
}
</style>
