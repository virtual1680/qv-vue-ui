<template>
	<el-card :shadow="crud.isCard" :class="b()" v-show="searchShow && searchFlag">
		<slot name="search" :row="searchForm" :search="searchForm" :size="crud.controlSize"></slot>
		<qvue-form :option="option" ref="qvueFormRef" @submit="searchChange" @reset-change="resetChange" formBtn="search" v-model="searchForm">
			<template #menu-form="scope">
				<slot
					name="search-menu"
					v-bind="
						Object.assign(scope, {
							search: searchForm,
							row: searchForm,
						})
					"
				></slot>
				<template v-if="isSearchIcon">
					<el-button text v-if="show === false" @click="show = true" icon="ArrowDown">{{ t('crud.open') }}</el-button>
					<el-button text v-if="show === true" @click="show = false" icon="ArrowUp">{{ t('crud.shrink') }}</el-button>
				</template>
			</template>
			<template v-for="item in crud.searchSlot.value" #[getSlotName(item)]="scope">
				<slot v-bind="scope" :name="item"></slot>
			</template>
		</qvue-form>
	</el-card>
</template>

<script setup lang="ts">
import { watch, inject, onMounted, computed, ref, Ref, reactive } from 'vue';
import { deepClone, validData, filterParams } from '@qvue/utils';
import { getSearchType } from '@qvue/hooks/useDataformat';
import config from '../config';
import { useBem } from '@qvue/hooks/useBem';
import { t } from '@qvue/locale';
import { FormInstance } from '@qvue/components/form/index';

const crud = inject<any>('crud');
const { b } = useBem('qvue-crud__search');
const show = ref(false);
const searchShow = ref(true);
let searchForm = reactive({});

const qvueFormRef: Ref<FormInstance | undefined> = ref();
watch(
	() => crud.propOption.value,
	() => {
		searchShow.value = validData(crud.tableOption.searchShow, config.searchShow);
	},
	{
		immediate: true,
	}
);
watch(
	() => crud.search,
	() => {
		searchForm = Object.assign(searchForm, crud.search);
	},
	{
		immediate: true,
		deep: true,
	}
);
watch(
	() => searchForm,
	() => {
		crud.emit('update:search', searchForm);
	},
	{
		immediate: true,
		deep: true,
	}
);
watch(
	() => searchShow.value,
	() => {
		crud.getTableHeight();
	}
);
// const isGroup = computed(() => {
// 	return !validatenull(crud.tableOption.group);
// });
const isSearchIcon = computed(() => {
	return validData(crud.option.searchIcon, true) === true && columnLen.value > searchIndex.value;
});
const searchIndex = computed(() => {
	return crud.option.searchIndex || 10; // 默认只显示10搜索表单item
});
const columnLen = computed(() => {
	let count = 0;

	crud.propOption.value.forEach((ele: any) => {
		if (ele.search) count++;
	});
	console.log('-=-crud.propOption=-=-=-', count, crud.propOption.value);
	return count;
});
const option = computed<QvueOption>(() => {
	const cOption = crud.option;
	const detailColumn = (list: QvueColumn[] = []) => {
		let column: QvueColumn[] = [];
		let count = 0;
		list = list.sort((a, b) => (b.searchOrder || 0) - (a.searchOrder || 0));
		list.forEach((ele: QvueColumn) => {
			if (ele.search) {
				let isCount = count < searchIndex.value;
				let obj = {};
				Object.keys(ele).forEach((item) => {
					let key = 'search';
					if (item.includes(key)) {
						let result = item.replace(key, '');
						if (result.length == 0) return;
						result = result.replace(result[0], result[0].toLowerCase());
						obj[result] = ele[item];
					}
				});
				console.log(isSearchIcon.value, show.value, isCount);

				ele = Object.assign(ele, obj, {
					type: getSearchType(ele),
					detail: false,
					dicFlag: ele.cascader ? true : validData(ele.dicFlag, false),
					span: ele.searchSpan || cOption.searchSpan || config.searchSpan,
					// control: ele.searchControl,
					gutter: ele.searchGutter || cOption.searchGutter || config.searchGutter,
					labelWidth: ele.searchLabelWidth || cOption.searchLabelWidth || config.searchLabelWidth,
					labelPosition: ele.searchLabelPosition || cOption.searchLabelPosition,
					size: ele.searchSize || cOption.searchSize,
					value: ele.searchValue,
					rules: ele.searchRules,
					// row: ele.searchRow,
					display: isSearchIcon.value ? (show.value ? true : isCount) : true,
				});
				let whiteList = ['bind', 'disabled', 'readonly'];
				whiteList.forEach((key) => delete ele[key]);
				column.push(ele);
				count = count + 1;
			}
		});
		return column;
	};
	const dataDetail = (option: QvueOption) => {
		let result = deepClone(option);
		result.column = crud.propOption.value.length > 0 ? detailColumn(deepClone(crud.propOption.value)) : [];
		console.log('crud.propOption.value', result.column);
		// result.column = detailColumn(result.column);
		result = Object.assign(result, {
			rowKey: option.searchRowKey || 'null', //option.searchRowKey ||
			tabs: false,
			group: false,
			printBtn: false,
			mockBtn: false,
			filterDic: option.searchFilterDic,
			filterNull: option.searchFilterNull,
			// filterParam: option.searchFilterParam,
			enter: option.searchEnter,
			size: option.searchSize,
			submitText: option.searchBtnText || t('crud.searchBtn'),
			submitBtn: validData(option.searchBtn, config.searchBtn),
			submitIcon: crud.getBtnIcon('searchBtn'),
			emptyText: option.emptyBtnText || t('crud.emptyBtn'),
			emptyBtn: validData(option.emptyBtn, true),
			emptyIcon: crud.getBtnIcon('emptyBtn'),
			menuSpan: (() => {
				if (show.value || !isSearchIcon.value) {
					return option.searchMenuSpan;
				} else {
					return option.searchMenuSpan < 6 ? option.searchMenuSpan : 6;
				}
			})(),
			menuPosition: option.searchMenuPosition || 'center',
			dicFlag: false,
			dicData: crud.DIC,
		});
		return result;
	};
	let result = dataDetail(cOption);
	console.log('dataDetail---end-', result);
	return result;
});
const searchFlag = computed(() => {
	return !!crud.slots.search || columnLen.value !== 0;
});

const initFun = () => {
	console.log('0-0-0-0-');
	// ['searchReset', 'searchChange'].forEach(ele => (crud[ele] = this[ele]));
};
const getSlotName = (item: string) => {
	return item.replace('-search', '');
};
// 搜索回调
const searchChange = (form: Record<string, unknown>, done: () => void) => {
	crud.emit('search-change', filterParams(form), done);
};
// 搜索清空
const resetChange = () => {
	crud.emit('search-reset', searchForm);
};
// 搜索清空
const searchReset = () => {
	qvueFormRef.value?.resetForm();
};
const handleSearchShow = () => {
	searchShow.value = !searchShow.value;
};
onMounted(() => {
	initFun();
});
defineExpose({ handleSearchShow, searchReset, searchFlag });
</script>
