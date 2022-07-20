<template>
	<div :class="formClass" :style="{ width: setPx(tableOption.formWidth, '100%') }">
		<el-form
			ref="formRef"
			:status-icon="tableOption.statusIcon"
			:model="form"
			:label-suffix="labelSuffix"
			:size="controlSize"
			:label-position="tableOption.labelPosition"
			:label-width="setPx(tableOption.labelWidth, labelWidth)"
			@submit.prevent>
			<el-row :span="24" :class="tabsClass">
				<qv-group
					v-for="(item, index) in columnOption"
					:key="item.prop"
					:tabs="isTabs"
					:arrow="item.arrow"
					:collapse="item.collapse"
					:display="vaildDisplay(item)"
					:icon="item.icon"
					:index="index"
					:header="!isTabs"
					:active="activeName"
					:label="item.label"
					@change="handleGroupClick">
					<template #tabs>
						<el-tabs v-if="isTabs && index == 1" v-model="activeName" :class="b('tabs')" :type="tabsType" @tab-click="handleTabClick">
							<template v-for="(tabs, index) in columnOption" :key="index">
								<el-tab-pane v-if="vaildDisplay(tabs) && index != 0" :name="index + ''">
									<template #label>
										<span>
											<slot v-if="getSlotName(tabs, 'H', slots)" :name="getSlotName(tabs, 'H')" :column="tabs" />
											<template v-else>
												<i :class="tabs.icon">&nbsp;</i>
												{{ tabs.label }}
											</template>
										</span>
									</template>
								</el-tab-pane>
							</template>
						</el-tabs>
					</template>
					<template v-if="getSlotName(item, 'H', slots)" #header>
						<slot :name="getSlotName(item, 'H')" :column="item" />
					</template>
					<div v-show="isGroupShow(item, index)" :class="b('group', { flex: validData(item.flex, true) })">
						<template v-for="(column, cindex) in item.column">
							<el-col
								v-if="vaildDisplay(column)"
								:key="cindex"
								:style="{ paddingLeft: gutter, paddingRight: gutter }"
								:span="getSpan(column)"
								:md="getSpan(column)"
								:sm="12"
								:xs="24"
								:offset="column.offset || 0"
								:class="groupItemClass(column)">
								<el-form-item
									:prop="column.prop"
									:label="column.label"
									:rules="column.rules"
									:class="b('item--' + (column.labelPosition || item.labelPosition || ''))"
									:label-position="column.labelPosition || item.labelPosition || tableOption.labelPosition"
									:label-width="getLabelWidth(column, item)">
									<template v-if="getSlotName(column, 'L', slots)" #label>
										<slot
											:name="getSlotName(column, 'L')"
											:column="column"
											:value="form[column.prop]"
											:readonly="column.readonly || readonly"
											:disabled="getDisabled(column)"
											:size="column.size || controlSize"
											:dic="DIC[column.prop]" />
									</template>
									<template v-else-if="column.labelTip" #label>
										<el-tooltip class="item" effect="dark" :placement="column.labelTipPlacement || 'top-start'">
											<template #content>
												<div v-html="column.labelTip" />
											</template>
											<el-icon>
												<InfoFilled />
											</el-icon>
										</el-tooltip>
										<span> {{ column.label }}{{ labelSuffix }}</span>
									</template>
									<template v-if="getSlotName(column, 'E')" #error="scope">
										<slot :name="getSlotName(column, 'E')" v-bind="formItemBind(scope, column)" />
									</template>
									<component
										:is="validTip(column) ? 'div' : 'elTooltip'"
										:disabled="validTip(column)"
										:content="validData(column.tip, getPlaceholder(column))"
										:placement="column.tipPlacement">
										<div>
											<slot
												v-if="slots[column.prop]"
												:value="form[column.prop]"
												:column="column"
												:label="form['$' + column.prop]"
												:size="column.size || controlSize"
												:readonly="column.readonly || readonly"
												:disabled="getDisabled(column)"
												:dic="DIC[column.prop]"
												:name="column.prop || ''" />
											<!-- :props="tableOption.props" -->
											<!-- :propsHttp="tableOption.propsHttp" -->
											<qv-temp-form
												v-else
												:ref="
													el => {
														bindRef(el, column.prop)
													}
												"
												v-model="form[column.prop]"
												:column="column"
												:dic="DIC[column.prop]"
												:props="column.props"
												:readonly="column.readonly || readonly"
												:propsHttp="column.propsHttp"
												:disabled="getDisabled(column)"
												:enter="tableOption.enter"
												:size="tableOption.size || controlSize"
												:column-slot="columnSlot"
												:type="column.type"
												@change="propChange(item.column, column)"
												@enter="submit">
												<template v-if="getSlotName(column, 'T', slots)" #default="scope">
													<slot :name="getSlotName(column, 'T')" v-bind="scope" />
												</template>
												<template v-for="item in columnSlot" #[item]="scope">
													<slot v-bind="scope" :name="item" />
												</template>
											</qv-temp-form>
										</div>
									</component>
								</el-form-item>
							</el-col>
							<div
								v-if="vaildDisplay(column) && column.row && column.span !== 24 && column.count"
								:key="`line${cindex}`"
								:class="b('line')"
								:style="{ width: (column.count / 24) * 100 + '%' }" />
						</template>
						<form-menu v-if="isMenu.search">
							<template #menu-form="scope">
								<slot name="menu-form" v-bind="scope" />
							</template>
						</form-menu>
					</div>
				</qv-group>
				<form-menu v-if="isMenu.default">
					<template #menu-form="scope">
						<slot name="menu-form" v-bind="scope" />
					</template>
				</form-menu>
			</el-row>
		</el-form>
	</div>
</template>
<script lang="ts" setup>
import { computed, nextTick, onMounted, provide, ref, unref, useSlots, watch } from 'vue'
import { calcCascader, calcCount, formInitVal, getPlaceholder, getSlotName, useBem, useInitCrud } from '@qv-vue/hooks'
import { clearVal, filterParams, findObject, setAsVal, setPx, validData, validatenull } from '@qv-vue/utils'
import { DIC_PROPS } from '@qv-vue/constants'
import { details, sendDic } from '@qv-vue/core'
import { QvTempForm } from '@qv-vue/components/temp'
import FormMenu from './menu.vue'
import { formProps } from './form'
import type { Ref } from 'vue'
import type { FormInstance } from 'element-plus'
import type { TempFormInstance } from '@qv-vue/components/temp'
import type { QvColumn, QvGroup } from '@qv-vue/types/qvue-ui'

defineOptions({
	name: 'qv-form'
})
const { b } = useBem('qv-form')
const emit = defineEmits<{
	(e: 'update:modelValue', value: any): void
	(e: 'update:status', value: any): void
	(e: 'reset-change'): void
	(e: 'tab-click', tab: any, event?: Event): void
	(e: 'submit', value: any, hide: () => void): void
	(e: 'error', value: any): void
	(e: 'change', value: any): void
}>()

const props = defineProps(formProps)
const slots = useSlots()

// const qvOption = ref(props.option);
// const optionRef: Ref<QvOption> = ref({} as QvOption)
// watch(
// 	() => props,
// 	() => {
// 		console.log('-=-qv-form=-=11-=', props.option)
// 	},
// 	{
// 		deep: true,
// 		immediate: true
// 	}
// )
// if (isRef(props.option)) {
// 	console.log('-=-=-isRef=-=-=-=-=-', isRef(props.option))
// } else {
// 	optionRef.value = props.option
// }
const { DIC, isMobile, rowKey, objectOption, controlSize, tableOption } = useInitCrud(props)
// const { b } = useBem('qv-form')

const activeName = ref('')
const labelWidth = ref(90)
const allDisabled = ref(false)
// const optionIndex = ref([]);
// const optionBox = ref(false);
const itemSpanDefault = ref(12)
const form: Ref<Record<string, any>> = ref({})
// const formFirst = ref(false);
const formList: Ref<any[]> = ref([])
const formBind: Ref<Record<string, any>> = ref({})
// const formDefault = ref({});
const formRef: Ref<FormInstance | undefined> = ref()
const propRef: Ref<Record<string, TempFormInstance>> = ref({})

const columnOption = computed(() => {
	const tOption = tableOption.value
	if (validatenull(tOption)) return []
	const column = tOption.column || []
	const group = tOption.group || []
	const footer = tOption.footer || []
	if (column.length !== 0) {
		group.unshift({
			header: false,
			column
		})
	}
	if (footer.length !== 0) {
		group.push({
			header: false,
			column: footer
		})
	}
	group.forEach((ele: QvGroup) => {
		ele.column = ele.column || []
		// 循环列的全部属性
		ele.column.forEach((column: QvColumn, cindex: number) => {
			//动态计算列的位置，如果为隐藏状态则或则手机状态不计算
			if (column.display !== false && !isMobile.value) {
				column = calcCount(column, itemSpanDefault.value, cindex === 0)
			}
		})
		//处理级联属性
		ele.column = calcCascader(ele.column)
		//根据order排序
		ele.column = ele.column.sort((a: any, b: any) => (b.order || 0) - (a.order || 0))
	})
	console.log('columnOption-end', group)
	return group
})

const propOption = computed(() => {
	const list: any[] = []
	columnOption.value.forEach((option: any) => {
		if (option.display !== false) {
			option.column.forEach((column: any) => list.push(column))
		}
	})
	return list
})
const tabsActive = computed(() => {
	return validData(tableOption.value.tabsActive, '1')
})
const forEachLabel = () => {
	if (tableOption.value.filterDic == true) {
		form.value = filterParams(form.value, ['$'], false)
		return
	}
	propOption.value.forEach(column => {
		let result
		const DIC_PROP = DIC.value[column.prop]
		if (!validatenull(DIC_PROP)) {
			result = details(form.value, column, tableOption.value, DIC_PROP as any)
			form.value[`$${column.prop}`] = result
		}
	})
}
//表单赋值
const setForm = (value: any) => {
	Object.keys(value).forEach(ele => {
		form.value[ele] = value[ele]
	})
	forEachLabel()
	if (tableOption.value.filterNull === true) {
		form.value = filterParams(form.value, [''], false)
	}
	// console.log('-=-=-=-form', form.value)
}
watch(
	() => tabsActive.value,
	val => {
		activeName.value = val
	},
	{
		immediate: true
	}
)
watch(
	() => props.modelValue,
	val => {
		setForm(val)
	},
	{ deep: true, immediate: true }
)
watch(
	() => DIC.value,
	() => {
		forEachLabel()
	},
	{ deep: true, immediate: true }
)
watch(
	() => allDisabled.value,
	val => {
		emit('update:status', val)
	},
	{ deep: true, immediate: true }
)
const columnSlot = computed(() => {
	return Object.keys(slots).filter(item => !propOption.value.map(ele => ele.prop).includes(item))
})
const labelSuffix = computed(() => {
	return tableOption.value.labelSuffix || ':'
})
const isMenu = computed(() => {
	// console.log(columnOption.value.length !== 1, 'columnOption.value.length');
	// return columnOption.value.length !== 1;
	// default 显示外面的  search 显示里面的 dialog 都不显示
	return {
		search: props.formBtn !== 'default' && props.formBtn !== 'dialog',
		default: props.formBtn !== 'search' && props.formBtn !== 'dialog'
	}
})
const isDetail = computed(() => {
	return detail.value === true
})
const isAdd = computed(() => {
	return boxType.value === 'add'
})
const isTabs = computed(() => {
	return tableOption.value.tabs === true
})
const isEdit = computed(() => {
	return boxType.value === 'edit'
})
const isView = computed(() => {
	return boxType.value === 'view'
})
const gutter = computed(() => {
	return setPx((tableOption.value.gutter || 10) / 2)
})
const detail = computed(() => {
	return tableOption.value.detail
})
const disabled = computed(() => {
	return tableOption.value.disabled
})
const readonly = computed(() => {
	return tableOption.value.readonly
})
const tabsType = computed(() => {
	return tableOption.value.tabsType
})
// const columnLen = computed(() => {
// 	return columnOption.value.length;
// });
const dynamicOption = computed(() => {
	const list: any[] = []
	propOption.value.forEach(ele => {
		if (ele.type == 'dynamic' && vaildDisplay(ele)) {
			list.push(ele)
		}
	})
	return list
})

const menuPosition = computed(() => {
	if (tableOption.value.menuPosition) {
		return tableOption.value.menuPosition
	} else {
		return 'center'
	}
})
const boxType = computed(() => {
	return tableOption.value.boxType
})
const isPrint = computed(() => {
	return validData(tableOption.value.printBtn, false)
})
const formClass = computed(() => {
	return [b(), { 'qv--detail': isDetail.value }]
})
const tabsClass = computed(() => {
	return { 'qv-form__tabs': isTabs.value }
})
const groupItemClass = (column: any) => {
	return [b('row'), { 'qv--detail qv--detail__column': vaildDetail(column) }, column.className]
}
const formItemBind = (scope: any, column: any) => {
	return Object.assign(scope, {
		column,
		value: form.value[column.prop],
		readonly: column.readonly || readonly,
		disabled: getDisabled(column),
		size: column.size || controlSize,
		dic: DIC.value[column.prop]
	})
}
// const menuSpan = computed(() => {
// 	return tableOption.value.menuSpan || 24;
// });

const bindRef = (refs: any, prop: string) => {
	propRef.value[prop] = refs as TempFormInstance
}

const getDisabled = (column: any) => {
	return vaildDetail(column) || isDetail.value || vaildDisabled(column) || allDisabled.value
}
const getSpan = (column: any) => {
	return column.span || tableOption.value.span || itemSpanDefault.value
}
const isGroupShow = (item: any, index: number) => {
	if (isTabs.value) {
		return index == Number.parseInt(activeName.value) || index == 0
	} else {
		return true
	}
}

const handleGroupClick = (activeNames: string) => {
	emit('tab-click', activeNames)
}
const handleTabClick = (tab: any, event: Event) => {
	emit('tab-click', tab, event)
}
const getLabelWidth = (column: any, item: any) => {
	let result
	if (!validatenull(column.labelWidth)) {
		result = column.labelWidth
	} else if (!validatenull(item.labelWidth)) {
		result = item.labelWidth
	} else {
		result = tableOption.value.labelWidth
	}
	return setPx(result, labelWidth.value.toString())
}
//对部分表单字段进行校验的方法
const validateField = (val: any) => {
	return formRef.value?.validateField(val)
}
const validTip = (column: any) => {
	return !column.tip || column.type === 'upload'
}
const getPropRef = (prop: string) => {
	return propRef.value[prop] //[0]
}
const dataFormat = () => {
	setForm(Object.assign(formInitVal(propOption.value), form.value))
}
const setVal = () => {
	emit('update:modelValue', form.value)
	emit('change', form.value)
}
const setControl = () => {
	propOption.value.forEach((column: any) => {
		const prop = column.prop
		const bind = column.bind
		const control = column.control
		// let value = form.value;
		if (!formBind.value[prop]) {
			if (bind) {
				watch(form.value[prop], (n, o) => {
					if (n != o) setAsVal(form.value, bind, n)
				})
				watch(form.value[bind], (n, o) => {
					if (n != o) form.value[prop] = n
				})
				form.value[prop] = eval(`value.${bind}`)
			}
			if (control) {
				const callback = () => {
					const controlList = control(form.value[column.prop], form.value) || {}
					Object.keys(controlList).forEach(item => {
						objectOption.value[item] = {
							...(objectOption.value[item] as object),
							...controlList[item]
						}
						if (controlList[item].dicData) DIC.value[item] = controlList[item].dicData
					})
				}
				watch(form.value[prop], () => {
					callback()
				})
				callback()
			}
			formBind.value[prop] = true
		}
	})
}

const handleChange = (list: any, column: any) => {
	nextTick(() => {
		const cascader = column.cascader
		const str: string = cascader.join(',')
		cascader.forEach((item: any) => {
			const columnNextProp = item
			const value = form.value[column.prop]
			// 下一个节点
			const columnNext = findObject(list, columnNextProp)
			if (validatenull(columnNext)) return
			// 如果不是首次加载则清空全部关联节点的属性值和字典值
			if (formList.value.includes(str)) {
				//清空子类字典列表和值
				cascader.forEach((ele: any) => {
					form.value[ele] = ''
					DIC.value[ele] = []
				})
			}
			/**
			 * 1.判断当前节点是否有下级节点
			 * 2.判断当前节点是否有值
			 */
			if (validatenull(cascader) || validatenull(value) || validatenull(columnNext)) {
				return
			}
			// 根据当前节点值获取下一个节点的字典
			sendDic({
				column: columnNext,
				value,
				form: form.value
			}).then((res: any) => {
				//首次加载的放入队列记录
				if (!formList.value.includes(str)) formList.value.push(str)
				// 修改字典
				const dic: any[] = res || []
				DIC.value[columnNextProp] = dic
				if (!validatenull(dic) && !validatenull(dic) && !validatenull(columnNext.cascaderIndex) && validatenull(form.value[columnNextProp])) {
					form.value[columnNextProp] = dic[columnNext.cascaderIndex][(columnNext.props || {}).value || DIC_PROPS.value]
				}
			})
		})
	})
}
const handlePrint = () => {
	// this.$Print(this.$el);
}
const propChange = (option: QvColumn[], column: QvColumn) => {
	forEachLabel()
	setVal()
	if (column.cascader) {
		handleChange(option, column)
	}
}

const vaildDetail = (column: any) => {
	let key
	if (detail.value) return false
	if (!validatenull(column.detail)) {
		key = 'detail'
	} else if (isAdd.value) {
		key = 'addDetail'
	} else if (isEdit.value) {
		key = 'editDetail'
	} else if (isView.value) {
		return false
	}
	if (key) return validData(column[key], false)
	return false
}
// 验证表单是否禁止
const vaildDisabled = (column: any) => {
	let key
	if (disabled.value) return true
	if (!validatenull(column.disabled)) {
		key = 'disabled'
	} else if (isAdd.value) {
		key = 'addDisabled'
	} else if (isEdit.value) {
		key = 'editDisabled'
	} else if (isView.value) {
		return true
	}
	if (key) return validData(column[key], false)
	return false
}
// 验证表单是否显隐
const vaildDisplay = (column: any) => {
	let key
	if (!validatenull(column.display)) {
		key = 'display'
	} else if (isAdd.value) {
		key = 'addDisplay'
	} else if (isEdit.value) {
		key = 'editDisplay'
	} else if (isView.value) {
		key = 'viewDisplay'
	} else {
		return true
	}
	if (key) return validData(column[key], true)
	return true
}
const clearValidate = (list?: any) => {
	formRef.value?.clearValidate(list)
}
const validateCellForm = () => {
	return new Promise(resolve => {
		formRef.value?.validate((valid: any, msg: any) => {
			resolve(msg)
		})
	})
}
const validate = async (callback: (validate: boolean, hide: () => void, result?: any) => void) => {
	await formRef.value?.validate((valid, msg) => {
		console.log('form---load', valid)
		const dynamicList: any[] = []
		const dynamicName: any[] = []
		const dynamicError: Record<string, any> = {}
		dynamicOption.value.forEach((ele: any) => {
			const isForm = ele.children.type === 'form'
			dynamicName.push(ele.prop)
			if (isForm) {
				if (!validatenull(propRef.value[ele.prop]?.tempRef.value.$refs.main)) {
					propRef.value[ele.prop].tempRef.value.$refs.main.forEach((ele: any) => {
						dynamicList.push(ele.validateCellForm())
					})
				}
			} else {
				dynamicList.push(propRef.value[ele.prop].tempRef.value.$refs.main.validateCellForm())
			}
		})
		Promise.all(dynamicList).then(res => {
			// let count = 0;
			res.forEach((error, index) => {
				if (!validatenull(error)) {
					dynamicError[dynamicName[index]] = error
				}
			})
			const result = Object.assign(dynamicError, msg)
			if (validatenull(result)) {
				show()
				callback(true, hide)
			} else {
				callback(false, hide, result)
			}
		})
	})
}
const resetForm = () => {
	form.value = clearVal(form.value, (tableOption.value.clearExclude || []).concat([rowKey.value]))
	nextTick(() => {
		clearValidate()
		emit('reset-change')
	})
}
const resetFields = () => {
	formRef.value?.resetFields()
}
const show = () => {
	allDisabled.value = true
}
const hide = () => {
	allDisabled.value = false
}
const submit = () => {
	validate((valid, done, msg) => {
		if (valid) {
			const data = filterParams(unref(form))
			emit('submit', data, done)
		} else {
			emit('error', msg)
		}
	})
}
onMounted(() => {
	dataFormat()
	setControl()
})
defineExpose({
	validateField,
	resetFields,
	resetForm,
	validateCellForm,
	getPropRef,
	submit,
	clearValidate,
	validate
})
provide('formSafe', {
	tableOption,
	resetForm,
	allDisabled,
	submit,
	controlSize,
	isPrint,
	menuPosition,
	handlePrint,
	isMenu
})
</script>
<style></style>
