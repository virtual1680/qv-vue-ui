<template>
	<el-card :shadow="crud.isCard" :class="b('pagination')" v-if="pageFlag && validData(crud.tableOption.page, true)">
		<slot name="page"></slot>
		<!-- :disabled="defaultPage.disabled" -->
		<el-pagination
			:small="crud.isMobile"
			:hide-on-single-page="validData(crud.tableOption.simplePage, config.simplePage)"
			:pager-count="defaultPage.pagerCount"
			:background="validData(defaultPage.background, config.pageBackground)"
			v-model:page-size="defaultPage.pageSize"
			:page-sizes="defaultPage.pageSizes"
			v-model:current-page="defaultPage.currentPage"
			@prev-click="prevClick"
			@next-click="nextClick"
			:layout="defaultPage.layout"
			:total="defaultPage.total"
		></el-pagination>
	</el-card>
</template>

<script setup lang="ts" name="table-page">
import { onMounted, reactive, watch, computed, inject } from 'vue';
import { useBem } from '@qvue/hooks/useBem';
import configDe from '../config';
import { validData } from '@qvue/utils';
import pageProps, { TablePage } from './table-page';

const crud = inject<any>('crud');
const config = configDe;
const { b } = useBem('qvue-crud');

const props = defineProps(pageProps);
let defaultPage: TablePage = reactive({
	total: 0, // 总页数
	pagerCount: 7, //超过多少条隐藏
	currentPage: 1, // 当前页数
	pageSize: 10, // 每页显示多少条
	pageSizes: [10, 20, 30, 40, 50, 100],
	layout: 'total, sizes, prev, pager, next, jumper',
	background: true, // 背景颜色
});
const pageFlag = computed(() => {
	return defaultPage.total != 0;
});
watch(
	() => props.page,
	() => {
		pageInit();
	},
	{
		deep: true,
	}
);
watch(
	() => defaultPage.pageSize,
	(val) => {
		sizeChange(val);
	}
);
watch(
	() => defaultPage.currentPage,
	(val) => {
		currentChange(val);
	}
);
watch(
	() => pageFlag.value,
	() => {
		crud.getTableHeight();
	}
);
watch(
	() => defaultPage.total,
	() => {
		if (defaultPage.total === (defaultPage.currentPage - 1) * defaultPage.pageSize && defaultPage.total != 0) {
			defaultPage.currentPage = defaultPage.currentPage - 1;
			crud.emit('on-load', defaultPage);
			crud.emit('current-change', defaultPage.currentPage);
			updateValue();
		}
	}
);

const pageInit = () => {
	defaultPage = Object.assign(defaultPage, props.page);
	updateValue();
};
const updateValue = () => {
	crud.emit('update:page', defaultPage);
};
//下一页事件
const nextClick = (val: number) => {
	crud.emit('next-click', val);
};
//上一页事件
const prevClick = (val: number) => {
	crud.emit('prev-click', val);
};
// 页大小回调
const sizeChange = (val: number) => {
	defaultPage.currentPage = 1;
	defaultPage.pageSize = val;
	updateValue();
	crud.emit('on-load', defaultPage);
	crud.emit('size-change', val);
};
const currentChange = (val: number) => {
	defaultPage.currentPage = val;
	updateValue();
	crud.emit('on-load', defaultPage);
	crud.emit('current-change', val);
};
onMounted(() => {
	pageInit();
	crud.emit('on-load', props.page);
});
</script>
