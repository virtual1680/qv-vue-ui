<template>
	<el-col
		v-if="validData(formSafe.tableOption.value.menuBtn, true)"
		:span="menuSpan"
		:md="menuSpan"
		:sm="12"
		:xs="24"
		:style="styleName"
		:class="[b('menu', [formSafe.menuPosition]), 'no-print']">
		<el-button
			v-if="formSafe.isPrint.value"
			type="primary"
			:size="formSafe.controlSize.value"
			icon="Printer"
			:loading="formSafe.allDisabled.value"
			@click="formSafe.handlePrint">
			{{ validData(formSafe.tableOption.value.printText, t('form.printBtn')) }}
		</el-button>
		<el-button
			v-if="validData(formSafe.tableOption.value.submitBtn, true)"
			type="primary"
			:size="formSafe.controlSize.value"
			:icon="formSafe.tableOption.value.submitIcon || 'Check'"
			:loading="formSafe.allDisabled.value"
			@click="formSafe.submit">
			{{ validData(formSafe.tableOption.value.submitText, t('form.submitBtn')) }}
		</el-button>
		<el-button
			v-if="validData(formSafe.tableOption.value.emptyBtn, true)"
			:icon="formSafe.tableOption.value.emptyIcon || 'Delete'"
			:size="formSafe.controlSize.value"
			:loading="formSafe.allDisabled.value"
			@click="formSafe.resetForm">
			{{ validData(formSafe.tableOption.value.emptyText, t('form.emptyBtn')) }}
		</el-button>
		<slot name="menu-form" :disabled="formSafe.allDisabled" :size="formSafe.controlSize" />
	</el-col>
</template>
<script setup lang="ts">
import { computed, inject } from 'vue'
import { validData } from '@qv-vue/utils'
import { t } from '@qv-vue/locale'
import { useBem } from '@qv-vue/hooks'
defineOptions({
	name: 'form-menu'
})
const { b } = useBem('qv-form')
const formSafe = inject<any>('formSafe')

const menuSpan = computed(() => {
	return formSafe.tableOption.value.menuSpan || 24
})
const styleName = computed(() => {
	if (menuSpan.value !== 24) {
		return {
			padding: 0
		}
	}
	return {}
})
</script>
