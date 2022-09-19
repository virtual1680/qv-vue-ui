<template>
	<div class="play-container">
		<qv-crud :option="option" :data="data" @tree-load="treeLoad" @row-save="rowSave" @row-update="rowUpdate"></qv-crud>
	</div>
</template>

<script setup lang="ts">
// code here
import { ref } from 'vue'
const data = ref([
	{
		id: 1,
		date: '2016-05-02',
		name: '王小虎',
		address: '上海市普陀区金沙江路 1518 弄'
	},
	{
		id: 2,
		date: '2016-05-04',
		name: '王小虎',
		address: '上海市普陀区金沙江路 1517 弄'
	},
	{
		id: 3,
		date: '2016-05-01',
		name: '王小虎',
		address: '上海市普陀区金沙江路 1519 弄',
		hasChildren: true
	},
	{
		id: 4,
		date: '2016-05-03',
		name: '王小虎',
		address: '上海市普陀区金沙江路 1516 弄'
	}
])
let option = ref({})
setTimeout(() => {
	option.value = {
		lazy: true,
		selection: true,
		rowKey: 'id',
		size: 'small',
		column: [
			{
				label: 'ID',
				prop: 'id'
			},
			{
				label: '姓名',
				prop: 'name'
			},
			{
				label: '日期',
				prop: 'date'
			},
			{
				label: '地址',
				prop: 'address',
				overHidden: true
			}
		]
	}
}, 2000)

const rowSave = (row, done) => {
	row.id = new Date().getTime()
	done(row)
}
const rowUpdate = (row, index, done) => {
	done(row)
}
const treeLoad = (tree, treeNode, resolve) => {
	setTimeout(() => {
		resolve([
			{
				id: new Date().getTime(),
				date: '2016-05-01',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1519 弄',
				hasChildren: true
			}
		])
	}, 1000)
}
</script>

<style lang="scss">
html,
body {
	width: 100vw;
	height: 100vh;
	margin: 0;
	#play {
		height: 100%;
		width: 100%;
		.play-container {
			height: 100%;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
}
</style>
