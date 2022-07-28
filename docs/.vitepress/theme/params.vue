<template>
	<div style="height: calc(100vh - 95px)">
		<el-row :gutter="20" style="height: 100%">
			<el-col :span="6" style="border-right: 1px solid #bbb; padding-top: 20px">
				<el-input v-model="query" placeholder="Please enter keyword" @input="onQueryChanged" />
				<el-tree-v2 ref="treeRef" :data="data" :props="props" :filter-method="filterMethod" :height="700" />
			</el-col>
			<el-col :span="18" style="padding-top: 20px">
				<div>我是内容</div>
			</el-col>
		</el-row>
	</div>
</template>
<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { ElTreeV2 } from 'element-plus'
import { paramsList, eventList, slotList, methodsList } from './attr'
import type { TreeNode } from 'element-plus/es/components/tree-v2/src/types'

interface Tree {
	id: string
	label: string
	children?: Tree[]
}

const query = ref('')
const treeRef = ref<InstanceType<typeof ElTreeV2>>()
const data = [
	{ label: 'params(变量)', children: paramsList },
	{ label: 'event(事件)', children: eventList },
	{ label: 'slot(卡槽)', children: slotList },
	{ label: 'methods(方法)', children: methodsList }
]
const props = {
	value: 'label',
	label: 'label',
	children: 'children'
}

const onQueryChanged = (query: string) => {
	// TODO: fix typing when refactor tree-v2
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-expect-error
	treeRef.value!.filter(query)
}
const filterMethod = (query: string, node: TreeNode) => {
	return node.label!.includes(query)
}
onMounted(() => {
	let cc = document.querySelector('.theme') as HTMLDivElement
	cc.setAttribute('class', 'theme no-sidebar')

	let container = document.querySelector('.container') as HTMLDivElement
	container.style.height = 'calc(100vh - 95px)'
	let content = document.querySelector('.content') as HTMLDivElement
	content.style.height = 'calc(100vh - 95px)'
})
onUnmounted(() => {
	let cc = document.querySelector('.theme') as HTMLDivElement
	cc.setAttribute('class', 'theme')

	let container = document.querySelector('.container') as HTMLDivElement
	container.style.height = 'auto'
	let content = document.querySelector('.content') as HTMLDivElement
	content.style.height = 'auto'
})
</script>
