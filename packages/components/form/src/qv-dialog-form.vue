<!--
 * @Author: qinhongyang virtual1680@gmail.com
 * @Date: 2022-08-18 08:51:31
 * @LastEditTime: 2022-09-19 17:10:55
 * @Description: dialog form
-->
<template>
	<el-dialog v-model="visible" :title="props.option.addTitle" destroy-on-close class="qv-dialog" :beforeClose="beforeClose" v-bind="dialog">
		<div>
			<qv-form ref="qvFormRef" :option="option" v-model="data" @submit="handleSubmit" @reset-change="close"></qv-form>
			<span class="qv-dialog__footer" :class="'qv-dialog__footer--' + menuPosition">
				<el-button @click="submit" v-if="validData(option.submitBtn, true)" :size="props.option.size" :icon="option.submitIcon" type="primary">{{
					option.submitText
				}}</el-button>
				<el-button @click="reset" v-if="validData(option.emptyBtn, true)" :size="props.option.size" :icon="option.emptyIcon">{{
					option.emptyText
				}}</el-button>
			</span>
		</div>
	</el-dialog>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue'
import { validData } from '@qv-vue/utils'
import { dialogFormProps } from './qv-dialog-form.type'
import { isFunction } from 'lodash'
import { QvForm } from '@qv-vue/components/form/'
import { ElButton, ElDialog } from 'element-plus'
import type { FormInstance } from './form'
import type { Ref } from 'vue'

defineOptions({ name: 'qv-dialog-form', components: { QvForm } })

const props = defineProps(dialogFormProps)

const qvFormRef: Ref<FormInstance | undefined> = ref()
const visible = ref(false)
const option = ref({
	submitText: '提交',
	emptyText: '关闭',
	submitIcon: 'Check',
	emptyIcon: 'Close',
	menuBtn: false,
	column: []
})
const data = ref({})
const dialog: Ref<Record<string, any>> = ref({
	closeOnClickModal: false,
	beforeClose: null
})
const callback: Ref<any> = ref()
const menuPosition = computed(() => {
	return props.option.menuPosition || 'right'
})
const show = <T = any>(result: (data: T, close: () => void, done: () => void) => void) => {
	dialog.value = Object.assign(dialog.value, props.dialog)
	option.value = Object.assign(option.value, props.option)
	data.value = props.data
	callback.value = result
	visible.value = true
}
const submit = () => {
	qvFormRef.value?.submit()
}
const reset = () => {
	qvFormRef.value?.resetForm()
}

const close = () => {
	const callback = () => {
		visible.value = false
	}
	if (isFunction(dialog.value.beforeClose)) {
		dialog.value.beforeClose(callback)
	} else {
		callback()
	}
}
const beforeClose = (done: () => void) => {
	done()
	close()
}
const handleSubmit = (data: any, done: any) => {
	callback.value && callback.value(data, close, done)
}
defineExpose({ show })
</script>
