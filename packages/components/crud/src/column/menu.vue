<!-- eslint-disable vue/no-v-html -->
<template>
	<span v-if="['img', 'upload'].includes(column.type)">
		<div class="qvue-crud__img">
			<img v-for="(item, index) in getImgList(row, column)" :src="item" :key="index" @click="openImg(getImgList(row, column), index)" />
		</div>
	</span>
	<span v-else-if="['url'].includes(column.type)">
		<el-link v-for="(item, index) in corArray(row[column.prop], column.separator)" type="primary" :key="index" :href="item" :target="column.target || '_blank'">
			{{ item }}
		</el-link>
	</span>
	<span v-else-if="['rate'].includes(column.type)">
		<qvue-rate disabled v-model="row[column.prop]" />
	</span>
	<span v-else v-html="handleDetail(row, column)"></span>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import { details } from '@qvue/core/detail';
import { DIC_PROPS, DIC_SPLIT } from '@qvue/constants/variable';
import { validatenull } from '@qvue/utils';
import { deepClone } from '@qvue/utils';
import { ElMessage } from 'element-plus';

export interface MenuProps {
	column: QvueColumn;
	row: Object;
}
const crud = inject<any>('crud');
defineProps<MenuProps>();

const openImg = (list: any[], index: number) => {
	list = list.map((ele: string) => {
		return { thumbUrl: ele, url: ele };
	});
	ElMessage.error('这个功能没完善');
	console.log(index);
	//TODO this.$ImagePreview(list, index);
};
const corArray = (list: any, separator = DIC_SPLIT) => {
	if (validatenull(list)) {
		return [];
	} else if (!Array.isArray(list)) {
		return list.split(separator);
	}
	return list;
};
const getImgList = (row: any, column: QvueColumn) => {
	let url = (column.propsHttp || {}).home || '';
	let value = (column.props || {}).value || DIC_PROPS.value;
	if (validatenull(row[column.prop])) return [];
	if (column.listType == 'picture-img') return [url + row[column.prop]];
	let list = corArray(deepClone(row[column.prop]), column.separator);
	list.forEach((ele: any, index: number) => {
		if (typeof ele === 'object') {
			list[index] = url + ele[value];
		} else {
			list[index] = url + ele;
		}
	});
	return list;
};
const handleDetail = (row: any, column: QvueColumn) => {
	let result = row[column.prop];
	let DIC = column.parentProp ? (crud.cascaderDIC[row.$index] || {})[column.prop] : crud.DIC[column.prop];
	result = details(row, column, crud.tableOption, DIC);
	if (!validatenull(DIC)) {
		row['$' + column.prop] = result;
	}
	return result;
};
</script>

<style></style>
