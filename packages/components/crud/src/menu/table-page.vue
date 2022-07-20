<template>
	<el-card v-if="pageFlag && validData(crud.tableOption.page, true)" :shadow="crud.isCard" :class="b('pagination')">
		<slot name="page" />
		<!-- :disabled="defaultPage.disabled" -->
		<el-pagination
			v-model:current-page="defaultPage.currentPage"
			v-model:page-size="defaultPage.pageSize"
			:small="crud.isMobile"
			:hide-on-single-page="validData(crud.tableOption.simplePage, config.simplePage)"
			:pager-count="defaultPage.pagerCount"
			:background="validData(defaultPage.background, config.pageBackground)"
			:page-sizes="defaultPage.pageSizes"
			:layout="defaultPage.layout"
			:total="defaultPage.total"
			@prev-click="prevClick"
			@next-click="nextClick" />
	</el-card>
</template>

<script setup lang="ts" name="table-page">
import { computed, inject, onMounted, reactive, watch } from 'vue'
import { useBem } from '@qv-vue/hooks'
import { validData } from '@qv-vue/utils'
import configDe from '../config'
import pageProps from './table-page'
import type { TablePage } from './table-page'

const crud = inject<any>('crud')
const config = configDe
const { b } = useBem('qv-crud')

const props = defineProps(pageProps)
let defaultPage: TablePage = reactive({
	total: 0, // 总页数
	pagerCount: 7, //超过多少条隐藏
	currentPage: 1, // 当前页数
	pageSize: 10, // 每页显示多少条
	pageSizes: [10, 20, 30, 40, 50, 100],
	layout: 'total, sizes, prev, pager, next, jumper',
	background: true // 背景颜色
})
const pageFlag = computed(() => {
	return defaultPage.total != 0
})
watch(
	() => props.page,
	() => {
		pageInit()
	},
	{
		deep: true
	}
)
watch(
	() => defaultPage.pageSize,
	val => {
		sizeChange(val)
	}
)
watch(
	() => defaultPage.currentPage,
	val => {
		currentChange(val)
	}
)
watch(
	() => pageFlag.value,
	() => {
		crud.getTableHeight()
	}
)
watch(
	() => defaultPage.total,
	() => {
		if (defaultPage.total === (defaultPage.currentPage - 1) * defaultPage.pageSize && defaultPage.total != 0) {
			defaultPage.currentPage = defaultPage.currentPage - 1
			crud.emit('on-load', defaultPage)
			crud.emit('current-change', defaultPage.currentPage)
			updateValue()
		}
	}
)

const pageInit = () => {
	defaultPage = Object.assign(defaultPage, props.page)
	updateValue()
}
const updateValue = () => {
	crud.emit('update:page', defaultPage)
}
//下一页事件
const nextClick = (val: number) => {
	crud.emit('next-click', val)
}
//上一页事件
const prevClick = (val: number) => {
	crud.emit('prev-click', val)
}
// 页大小回调
const sizeChange = (val: number) => {
	defaultPage.currentPage = 1
	defaultPage.pageSize = val
	updateValue()
	crud.emit('on-load', defaultPage)
	crud.emit('size-change', val)
}
const currentChange = (val: number) => {
	defaultPage.currentPage = val
	updateValue()
	crud.emit('on-load', defaultPage)
	crud.emit('current-change', val)
}
onMounted(() => {
	pageInit()
	crud.emit('on-load', props.page)
})
</script>
