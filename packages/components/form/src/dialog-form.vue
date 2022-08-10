<template>
	<el-dialog v-model="visible" destroy-on-close class="qv-dialog" :beforeClose="beforeClose" v-bind="dialog">
		<qv-form ref="qvFormRef" :option="{ ...option, ...{ menuBtn: false } }" v-model="data" @submit="handleSubmit" @reset-change="close"></qv-form>
		<span class="qv-dialog__footer" v-if="validData(option.menuBtn, true)" :class="'qv-dialog__footer--' + menuPosition">
			<el-button @click="submit" v-if="validData(option.submitBtn, true)" :size="props.option.size" :icon="option.submitIcon" type="primary">{{
				option.submitText
			}}</el-button>
			<el-button @click="reset" v-if="validData(option.emptyBtn, true)" :size="props.option.size" :icon="option.emptyIcon">{{
				option.emptyText
			}}</el-button>
		</span>
	</el-dialog>
</template>
<script lang="ts" setup>
// import create from 'core/create'
// import { lang } from '../../../locale/index'
import { computed, reactive, ref } from 'vue'
import { deepClone, validData } from '@qv-vue/utils'
import { FormInstance } from '@qv-vue/qv-vue'
import type { Ref } from 'vue'
import { dialogFormProps } from './dialog-form.type'
import { isFunction } from 'lodash'

defineOptions({ name: 'dialog-form' })

const props = defineProps(dialogFormProps)
// callback: null
const qvFormRef: Ref<FormInstance | undefined> = ref()
const visible = ref(false)
const option = ref({
	submitText: '提交',
	emptyText: '关闭',
	submitIcon: 'Check',
	emptyIcon: 'Close',
	column: []
})
const data = ref({})
const dialog: Ref<Record<string, any>> = ref({
	closeOnClickModal: false,
	beforeClose: null
})

const menuPosition = computed(() => {
	return props.option.menuPosition || 'center'
})
const show = () => {
	// this.callback = opt.callback
	// let dialog = deepClone(opt)
	// ;['callback', 'option', 'data'].forEach(ele => delete dialog[ele])
	// this.dialog = Object.assign(this.dialog, dialog)
	option.value = Object.assign(option.value, props.option)
	// this.data = opt.data
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
	this.callback && this.callback({ data: data, close: this.close, done: done })
}
</script>
