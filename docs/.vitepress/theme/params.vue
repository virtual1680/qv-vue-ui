<template>
	<div style="height: calc(100vh - 95px)">
		<el-row :gutter="20" style="height: 100%">
			<el-col :span="6" style="border-right: 1px solid #bbb; padding-top: 20px">
				<el-radio-group v-model="tag" style="margin-bottom: 30px" @change="onTagChanged">
					<el-radio-button :label="-1">全部</el-radio-button>
					<el-radio-button :label="1">表单</el-radio-button>
					<el-radio-button :label="2">表格</el-radio-button>
				</el-radio-group>
				<el-input v-model="query" placeholder="Please enter keyword" @input="onQueryChanged" />
				<el-tree-v2 ref="treeRef" :data="data" :props="props" @node-click="nodeClick" :filter-method="filterMethod" :height="700" />
			</el-col>
			<el-col class="content" :span="18" style="padding-top: 20px">
				<ul v-if="detail.label">
					<li>
						<h4>属性名称：{{ detail.label }}</h4>
					</li>
					<li>
						<h4>数据类型：{{ detail.type }}</h4>
					</li>
					<li>
						<h4>相关参数：{{ detail.params }}</h4>
					</li>
					<li>
						<h4>
							使用范围：<el-tag>{{ detail.tag === 1 ? '表单Form' : detail.tag === 2 ? '表格Crud' : '通用' }}</el-tag>
						</h4>
					</li>
					<li>
						<h4>详细说明：{{ detail.note }}</h4>
					</li>
				</ul>
			</el-col>
		</el-row>
	</div>
</template>
<script lang="ts" setup>
import { ref, onMounted, onUnmounted, Ref } from 'vue'
import { ElTreeV2 } from 'element-plus'
import { paramsList, eventList, slotList, methodsList } from './attr'
import type { TreeNode, TreeNodeData } from 'element-plus/es/components/tree-v2/src/types'

interface Tree {
	id: string
	label: string
	children?: Tree[]
}
const tag = ref(-1)
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
interface DetailNode {
	href?: string
	label: string
	note?: string
	params?: string
	tag?: number
	type?: string
}
const detail = ref({} as DetailNode)

const onTagChanged = (tab: number) => {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-expect-error
	treeRef.value!.filter(query)
}
const onQueryChanged = (query: string) => {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-expect-error
	treeRef.value!.filter(query)
}
const filterMethod = (query: Ref<string>, node: any) => {
	let tags = tag.value !== -1 ? node.tag === tag.value || node.tag === undefined : true
	let labels = query.value ? node.label!.includes(query.value) : true
	return labels && tags
}

const nodeClick = (data: TreeNodeData, node: TreeNode, e: MouseEvent) => {
	console.log(data)
	detail.value = data as DetailNode
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
<style>
.content ul li h4 {
	font-size: 1rem;
}
.content ul li {
	padding: 10px 0;
}
</style>
