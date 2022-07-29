> 表行设置

::: tip
表格勾选可配置单选
:::

:::demo

```vue
<template>
	<div>
		<!-- :cell-style="cellStyle"  修改列样式-->
		<!-- :row-style="rowStyle" 修改行样式-->
		<!-- :span-method="spanMethod" 列合并 -->
		<qv-crud
			ref="avueRef"
			:data="config.data"
			:option="option"
			@selection-change="selectionChange"
			@on-load="onLoad"
			@row-click="rowClick"
			:page="config.page"
			:row-class-name="tableRowClassName">
			<!-- 自定义左侧按钮 -->
			<template #menu-left="{ size }">
				<el-button type="success" icon="Check" :size="size" @click="toggleSelection([config.data[1]])">选中第二行</el-button>
				<el-button type="danger" icon="Delete" :size="size" @click="toggleSelection()">取消选择</el-button>
			</template>
			<template #tip>
				<el-tag type="danger" size="mini">自定义内容</el-tag>
			</template>
			<!-- 配置单选 第二步-->
			<!-- <template #radio="{ row }">
				<el-radio v-model="config.selectRow" :label="row.$index">-</el-radio>
			</template> -->
		</qv-crud>
	</div>
</template>

<script lang="ts" setup>
import { reactive, computed, ref, onMounted, nextTick } from 'vue'

const ElementPlus = ref()
onMounted(() => {
	import('element-plus').then(module => {
		ElementPlus.value = module
	})
})

const avueRef: Ref<CrudInstance | undefined> = ref()
let config = reactive({
	selectRow: '',
	page: {
		total: 0,
		currentPage: 1,
		pageSize: 2
	},
	search: { name: 'small', sex: 1 },
	data: [
		{ name: '张三', sex: '男' },
		{ name: '王五', sex: '女' }
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
		selection: true, //是否开启多选
		searchMenuSpan: 6,
		// 禁止选择第一条
		selectable: (row: any, index: number) => {
			return index === 1
		},
		reserveSelection: false, // 分页保留之前勾选的数据
		index: true,
		rowKey: 'name',
		column: [
			// { label: '', prop: 'radio', width: 60, hide: false }, //配置单选 第一步
			{
				label: '姓名',
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
// 列合并策略
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
	const { ElMessage } = ElementPlus.value
	ElMessage.success('选择序号' + row.$index)
}
const selectionChange = (list: any) => {
	const { ElMessage } = ElementPlus.value
	ElMessage.success('选中的数据' + JSON.stringify(list))
}
const toggleSelection = (val?: any) => {
	avueRef.value?.toggleSelection(val)
}
const rowStyle = ({ rowIndex }: { row: any; rowIndex: number }) => {
	if (rowIndex % 2 === 0) {
		return {
			backgroundColor: '#eee',
			color: 'red'
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
```

:::
