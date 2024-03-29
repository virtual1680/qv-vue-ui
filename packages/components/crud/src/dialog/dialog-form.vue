<template>
	<component
		:is="dialogType"
		v-model="boxVisible"
		:destroy-on-close="validData(crud.tableOption.dialogDestroy, true)"
		:draggable="validData(crud.tableOption.dialogDrag, config.dialogDrag)"
		:custom-class="['qv-dialog', ...b('dialog', { fullscreen: fullscreen, dialog: !isDrawer }), crud.tableOption.dialogCustomClass].join(' ')"
		:append-to-body="validData(crud.tableOption.dialogAppendToBody, true)"
		:top="dialogTop"
		:title="dialogTitle"
		:close-on-press-escape="crud.tableOption.dialogEscape"
		:close-on-click-modal="validData(crud.tableOption.dialogClickModal, false)"
		:modal="crud.tableOption.dialogModal"
		:show-close="crud.tableOption.dialogCloseBtn"
		v-bind="params"
		:before-close="hide"
		@opened="handleOpened">
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
		<qv-form
			ref="tableFormRef"
			v-model="crudTableForm"
			v-model:status="disabled"
			form-btn="dialog"
			:option="option"
			@change="handleChange"
			@submit="handleSubmit"
			@reset-change="hide"
			@tab-click="handleTabClick"
			@error="handleError">
			<!-- 循环form表单卡槽 -->
			<template v-for="item in crud.formSlot" #[getSlotName(item)]="scope">
				<slot v-bind="scope" :name="item" />
			</template>
		</qv-form>
		<span class="qv-dialog__footer" :class="'qv-dialog__footer--' + dialogMenuPosition">
			<el-button
				v-if="validData(option.submitBtn, true) && !isView"
				:disabled="disabled"
				:size="crud.controlSize.value"
				:icon="option.submitIcon"
				type="primary"
				@click="submit">
				{{ option.submitText }}
			</el-button>
			<el-button
				v-if="validData(option.emptyBtn, true) && !isView"
				:disabled="disabled"
				:size="crud.controlSize.value"
				:icon="option.emptyIcon"
				@click="reset">
				{{ option.emptyText }}
			</el-button>
			<slot name="menu-form" :disabled="disabled" :size="crud.controlSize" :type="boxType" />
		</span>
	</component>
</template>

<script setup lang="ts">
import { computed, inject, nextTick, ref } from 'vue'
import { useBem } from '@qv-vue/hooks'
import { deepClone, filterParams, setPx, validData, validatenull } from '@qv-vue/utils'
import { t } from '@qv-vue/locale'
import configDe from '../config'
import type { FormInstance } from '@qv-vue/components/form'
import type { Ref } from 'vue'
const crud = inject<any>('crud')

const { b } = useBem('qv-crud')

const tableFormRef: Ref<FormInstance | undefined> = ref()
const disabled = ref(false)
const config = ref(configDe)
const boxType = ref('')
const fullscreen = ref(false)
const boxVisible = ref(false)
const crudTableForm = ref({})

const isView = computed(() => {
	return boxType.value === 'view'
})
const isAdd = computed(() => {
	return boxType.value === 'add'
})
const isEdit = computed(() => {
	return boxType.value === 'edit'
})
const width = computed(() => {
	const dialogWidth = crud.tableOption.value.dialogWidth
	const defaultWidth = crud.isMobile ? '100%' : config.value.dialogWidth
	const result = validData(dialogWidth, defaultWidth)
	return setPx(result)
})
const dialogType = computed(() => {
	return isDrawer.value ? 'elDrawer' : 'elDialog'
})
const dialogTop = computed(() => {
	return !isDrawer.value && !fullscreen.value ? crud.tableOption.value.dialogTop : '0'
})
const isDrawer = computed(() => {
	return crud.tableOption.value.dialogType === 'drawer'
})
const params = computed(() => {
	return isDrawer.value
		? {
				size: fullscreen.value ? '100%' : width.value,
				direction: crud.tableOption.value.dialogDirection
		  }
		: {
				width: width.value,
				fullscreen: fullscreen.value
		  }
})
const option = computed(() => {
	const tOption = deepClone(crud.tableOption.value)
	tOption.boxType = boxType.value
	tOption.column = deepClone(crud.propOption.value)

	tOption.menuBtn = false
	if (isAdd.value) {
		tOption.submitBtn = tOption.saveBtn
		tOption.submitText = crud.menuIcon('saveBtn')
		tOption.submitIcon = crud.getBtnIcon('saveBtn')
	} else if (isEdit.value) {
		tOption.submitBtn = tOption.updateBtn
		tOption.submitText = crud.menuIcon('updateBtn')
		tOption.submitIcon = crud.getBtnIcon('updateBtn')
	} else if (isView.value) {
		tOption.detail = true
	}
	tOption.emptyBtn = tOption.cancelBtn
	tOption.emptyIcon = crud.getBtnIcon('cancelBtn')
	tOption.emptyText = crud.menuIcon('cancelBtn')
	//不分组的表单不加载字典
	if (!crud.isGroup) {
		tOption.dicFlag = false
		tOption.dicData = crud.DIC
	}
	if (!validatenull(tOption.dicFlag)) {
		tOption.column.forEach((ele: any) => {
			ele.boxType = boxType.value
			ele.dicFlag = ele.dicFlag || tOption.dicFlag
		})
	}
	return tOption
})
const dialogTitle = computed(() => {
	const key = `${boxType.value}`
	if (!validatenull(boxType.value)) {
		return crud.tableOption.value[`${key}Title`] || t(`crud.${key}Title`)
	}
	return ''
})
const dialogMenuPosition = computed(() => {
	return crud.option.dialogMenuPosition || 'right'
})
const submit = () => {
	tableFormRef.value?.submit()
}
const reset = () => {
	tableFormRef.value?.resetForm()
}
const handleOpened = () => {
	nextTick(() => initFun())
}
const getSlotName = (item: string) => {
	if (validatenull(item)) {
		return item.replace('-form', '')
	} else {
		return ''
	}
}
const handleChange = () => {
	crud.emit('update:modelValue', crudTableForm.value)
	crud.emit('change', crudTableForm.value)
}
const handleTabClick = (tab: any, event?: Event) => {
	crud.emit('tab-click', tab, event)
}
const handleFullScreen = () => {
	if (fullscreen.value) {
		fullscreen.value = false
	} else {
		fullscreen.value = true
	}
}
const handleError = (error: any) => {
	crud.emit('error', error)
}
const handleSubmit = (form: any, hide: () => void) => {
	if (isAdd.value) {
		rowSave(hide)
	} else if (isEdit.value) {
		rowUpdate(hide)
	}
}
const initFun = () => {
	crud['clearValidate'] = tableFormRef.value?.clearValidate
	crud['validate'] = tableFormRef.value?.validate
	crud['resetForm'] = tableFormRef.value?.resetForm
}
// 保存
const rowSave = (hide: () => void) => {
	crud.emit('row-save', filterParams(crudTableForm.value), closeDialog, hide)
}
// 更新
const rowUpdate = (hide: () => void) => {
	// console.log(crud.tableIndex, 'crud.tableForm');
	crud.emit('row-update', filterParams(crudTableForm.value), crud.tableIndex.value, closeDialog, hide)
}
const closeDialog = (row?: any) => {
	row = deepClone(row)
	const callback = () => {
		if (isEdit.value) {
			const { parentList, index } = crud.findData(row[crud.rowKey])
			if (parentList) {
				parentList.splice(index, 1)
				parentList.splice(index, 0, row)
			}
		} else if (isAdd.value) {
			const { item } = crud.findData(row[crud.rowParentKey])
			if (item) {
				if (!item[crud.childrenKey]) {
					item[crud.childrenKey] = []
					item[crud.hasChildrenKey] = true
				}
				item[crud.childrenKey].push(row)
			} else {
				crud.list.push(row)
			}
		}
	}
	if (row) callback()
	hide()
}
// 隐藏表单
const hide = (done?: () => void) => {
	const callback = () => {
		done && done()
		Object.keys(crudTableForm.value).forEach(ele => delete crudTableForm.value[ele])
		crud.tableIndex = -1
		boxVisible.value = false
	}
	if (typeof crud.beforeClose === 'function') {
		crud.beforeClose(callback, boxType.value)
	} else {
		callback()
	}
}
// 显示表单
const show = (type: string) => {
	boxType.value = type
	const callback = () => {
		fullscreen.value = crud.tableOption.value.dialogFullscreen
		boxVisible.value = true
	}
	if (typeof crud.beforeOpen === 'function') {
		crud.beforeOpen(callback, boxType.value)
	} else {
		callback()
	}
	// console.log(crud.tableForm.value)
	crudTableForm.value = crud.tableForm.value
}

defineExpose({ show, tableFormRef, closeDialog })
</script>
