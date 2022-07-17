<template>
	<component
		:is="dialogType"
		:destroy-on-close="validData(crud.tableOption.dialogDestroy, true)"
		:draggable="validData(crud.tableOption.dialogDrag, config.dialogDrag)"
		:custom-class="['qvue-dialog', ...b('dialog', { fullscreen: fullscreen, dialog: !isDrawer }), crud.tableOption.dialogCustomClass].join(' ')"
		:append-to-body="validData(crud.tableOption.dialogAppendToBody, true)"
		:top="dialogTop"
		:title="dialogTitle"
		:close-on-press-escape="crud.tableOption.dialogEscape"
		:close-on-click-modal="validData(crud.tableOption.dialogClickModal, false)"
		:modal="crud.tableOption.dialogModal"
		:show-close="crud.tableOption.dialogCloseBtn"
		v-model="boxVisible"
		v-bind="params"
		:before-close="hide"
		@opened="handleOpened"
	>
		<template #header>
			<div :class="b('dialog__header')">
				<span class="el-dialog__title">{{ dialogTitle }}</span>
				<div :class="b('dialog__menu')">
					<el-icon class="el-dialog__close" @click="handleFullScreen">
						<component :is="fullscreen ? 'CopyDocument' : 'FullScreen'" />
					</el-icon>
				</div>
			</div>
		</template>
		<qvue-form
			v-model="crud.tableForm"
			v-model:status="disabled"
			ref="tableFormRef"
			@change="handleChange"
			@submit="handleSubmit"
			@reset-change="hide"
			@tab-click="handleTabClick"
			@error="handleError"
			formBtn="dialog"
			:option="option"
		>
			<!-- 循环form表单卡槽 -->
			<template v-for="item in crud.formSlot" #[getSlotName(item)]="scope">
				<slot v-bind="scope" :name="item"></slot>
			</template>
		</qvue-form>
		<span class="qvue-dialog__footer" :class="'qvue-dialog__footer--' + dialogMenuPosition">
			<el-button v-if="validData(option.submitBtn, true) && !isView" @click="submit" :disabled="disabled" :size="crud.controlSize.value" :icon="option.submitIcon" type="primary">
				{{ option.submitText }}
			</el-button>
			<el-button v-if="validData(option.emptyBtn, true) && !isView" @click="reset" :disabled="disabled" :size="crud.controlSize.value" :icon="option.emptyIcon">
				{{ option.emptyText }}
			</el-button>
			<slot name="menu-form" :disabled="disabled" :size="crud.controlSize" :type="boxType"></slot>
		</span>
	</component>
</template>

<script setup lang="ts">
import { ref, inject, computed, nextTick, Ref } from 'vue';
import { useBem } from '@qvue/hooks/useBem';
import configDe from '../config';
import { filterParams, setPx, deepClone, validData } from '@qvue/utils';
import { validatenull } from '@qvue/utils';
import { t } from '@qvue/locale';
import { FormInstance } from '@qvue/components/form';
const crud = inject<any>('crud');

const { b } = useBem('qvue-crud');

const tableFormRef: Ref<FormInstance | undefined> = ref();
const disabled = ref(false);
const config = ref(configDe);
const boxType = ref('');
const fullscreen = ref(false);
const boxVisible = ref(false);
// watch(
// 	() => boxVisible.value,
// 	() => {
// 		console.log('crud.tableIndex---', crud.tableIndex);
// 	}
// );
const isView = computed(() => {
	return boxType.value === 'view';
});
const isAdd = computed(() => {
	return boxType.value === 'add';
});
const isEdit = computed(() => {
	return boxType.value === 'edit';
});
const width = computed(() => {
	let dialogWidth = crud.tableOption.value.dialogWidth + '';
	let defaultWidth = crud.isMobile ? '100%' : config.value.dialogWidth;
	let result = validData(dialogWidth, defaultWidth);
	return setPx(result);
});
const dialogType = computed(() => {
	return isDrawer.value ? 'elDrawer' : 'elDialog';
});
const dialogTop = computed(() => {
	return !isDrawer.value && !fullscreen.value ? crud.tableOption.value.dialogTop : '0';
});
const isDrawer = computed(() => {
	return crud.tableOption.value.dialogType === 'drawer';
});
const params = computed(() => {
	return isDrawer.value
		? {
				size: fullscreen.value ? '100%' : width.value,
				direction: crud.tableOption.value.dialogDirection,
		  }
		: {
				width: width.value,
				fullscreen: fullscreen.value,
		  };
});
const option = computed(() => {
	let tOption = deepClone(crud.tableOption.value);
	tOption.boxType = boxType.value;
	tOption.column = deepClone(crud.propOption.value);
	console.log('-=-=-=-=-tOption.column', tOption.column);

	tOption.menuBtn = false;
	if (isAdd.value) {
		tOption.submitBtn = tOption.saveBtn;
		tOption.submitText = crud.menuIcon('saveBtn');
		tOption.submitIcon = crud.getBtnIcon('saveBtn');
	} else if (isEdit.value) {
		tOption.submitBtn = tOption.updateBtn;
		tOption.submitText = crud.menuIcon('updateBtn');
		tOption.submitIcon = crud.getBtnIcon('updateBtn');
	} else if (isView.value) {
		tOption.detail = true;
	}
	tOption.emptyBtn = tOption.cancelBtn;
	tOption.emptyIcon = crud.getBtnIcon('cancelBtn');
	tOption.emptyText = crud.menuIcon('cancelBtn');
	//不分组的表单不加载字典
	if (!crud.isGroup) {
		tOption.dicFlag = false;
		tOption.dicData = crud.DIC;
	}
	if (!validatenull(tOption.dicFlag)) {
		tOption.column.forEach((ele: any) => {
			ele.boxType = boxType.value;
			ele.dicFlag = ele.dicFlag || tOption.dicFlag;
		});
	}
	return tOption;
});
const dialogTitle = computed(() => {
	const key = `${boxType.value}`;
	if (!validatenull(boxType.value)) {
		return crud.tableOption.value[key + 'Title'] || t(`crud.${key}Title`);
	}
	return '';
});
const dialogMenuPosition = computed(() => {
	return crud.option.dialogMenuPosition || 'right';
});
const submit = () => {
	tableFormRef.value?.submit();
};
const reset = () => {
	tableFormRef.value?.resetForm();
};
const handleOpened = () => {
	nextTick(() => initFun());
};
const getSlotName = (item: string) => {
	if (validatenull(item)) {
		return item.replace('-form', '');
	} else {
		return '';
	}
};
const handleChange = () => {
	crud.emit('update:modelValue', crud.tableForm);
	crud.emit('change', crud.tableForm);
};
const handleTabClick = (tab: any, event?: Event) => {
	crud.emit('tab-click', tab, event);
};
const handleFullScreen = () => {
	if (fullscreen.value) {
		fullscreen.value = false;
	} else {
		fullscreen.value = true;
	}
};
const handleError = (error: any) => {
	crud.emit('error', error);
};
const handleSubmit = (form: any, hide: () => void) => {
	if (isAdd.value) {
		rowSave(hide);
	} else if (isEdit.value) {
		rowUpdate(hide);
	}
};
const initFun = () => {
	['clearValidate', 'validate', 'resetForm'].forEach((ele) => {
		crud[ele] = tableFormRef.value?.[ele];
	});
};
// 保存
const rowSave = (hide: () => void) => {
	crud.emit('row-save', filterParams(crud.tableForm), closeDialog, hide);
};
// 更新
const rowUpdate = (hide: () => void) => {
	// console.log(crud.tableIndex, 'crud.tableForm');
	crud.emit('row-update', filterParams(crud.tableForm), crud.tableIndex.value, closeDialog, hide);
};
const closeDialog = (row?: any) => {
	row = deepClone(row);
	const callback = () => {
		if (isEdit.value) {
			let { parentList, index } = crud.findData(row[crud.rowKey]);
			if (parentList) {
				parentList.splice(index, 1);
				parentList.splice(index, 0, row);
			}
		} else if (isAdd.value) {
			let { item } = crud.findData(row[crud.rowParentKey]);
			if (item) {
				if (!item[crud.childrenKey]) {
					item[crud.childrenKey] = [];
					item[crud.hasChildrenKey] = true;
				}
				item[crud.childrenKey].push(row);
			} else {
				crud.list.push(row);
			}
		}
	};
	if (row) callback();
	hide();
};
// 隐藏表单
const hide = (done?: () => void) => {
	const callback = () => {
		done && done();
		Object.keys(crud.tableForm).forEach((ele) => delete crud.tableForm[ele]);
		crud.tableIndex = -1;
		boxVisible.value = false;
	};
	if (typeof crud.beforeClose === 'function') {
		crud.beforeClose(callback, boxType.value);
	} else {
		callback();
	}
};
// 显示表单
const show = (type: string) => {
	boxType.value = type;
	const callback = () => {
		fullscreen.value = crud.tableOption.value.dialogFullscreen;
		boxVisible.value = true;
	};
	if (typeof crud.beforeOpen === 'function') {
		crud.beforeOpen(callback, boxType.value);
	} else {
		callback();
	}
};
defineExpose({ show, tableFormRef, closeDialog });
</script>
