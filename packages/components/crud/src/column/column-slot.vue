<template>
	<!-- :render-header="column.renderHeader" -->
	<el-table-column
		v-if="dynamic.getColumnProp(column, 'hide')"
		:key="column.prop"
		:prop="column.prop"
		:label="column.label"
		:column-key="column.prop"
		filter-placement="bottom-end"
		:filters="dynamic.getColumnProp(column, 'filters')"
		:filter-method="dynamic.getColumnProp(column, 'filterMethod') ? dynamic.handleFiltersMethod : undefined"
		:filter-multiple="validData(column.filterMultiple, true)"
		:show-overflow-tooltip="column.overHidden"
		:min-width="column.minWidth"
		:sortable="dynamic.getColumnProp(column, 'sortable')"
		:align="column.align || crud.tableOption.value.align"
		:header-align="column.headerAlign || crud.tableOption.value.headerAlign"
		:width="dynamic.getColumnProp(column, 'width')"
		:fixed="dynamic.getColumnProp(column, 'fixed')">
		<template #header="{ $index }">
			<slot v-if="getSlotName(column, 'H', crud.slots)" :name="getSlotName(column, 'H')" v-bind="{ column, $index }" />
			<span v-else>{{ column.label }}</span>
		</template>
		<template #default="{ row, $index }">
			<el-form-item
				v-if="row.$cellEdit && column.cell"
				:prop="crud.value ? '' : `list.${$index}.${column.prop}`"
				:label="vaildLabel(column, row, ' ')"
				:label-width="vaildLabel(column, row, '1px')"
				:rules="column.rules">
				<el-tooltip
					:content="(crud.listError.value[`list.${$index}.${column.prop}`] || {}).msg"
					:disabled="!(crud.listError.value[`list.${$index}.${column.prop}`] || {}).valid"
					placement="top">
					<div>
						<slot
							v-if="getSlotName(column, 'F', crud.slots)"
							v-bind="{
								row: row,
								dic: crud.DIC[column.prop],
								size: crud.isMediumSize,
								index: $index,
								disabled: crud.btnDisabledList[$index],
								label: handleShowLabel(row, column, crud.DIC.value[column.prop]),
								$cell: row.$cellEdit
							}"
							:name="getSlotName(column, 'F')" />
						<qv-temp-form
							v-else
							v-model="row[column.prop]"
							:column="column"
							:size="crud.isMediumSize"
							:table-data="{
								index: $index,
								row: row,
								label: handleDetail(row, column)
							}"
							:dic="(crud.cascaderDIC.value[$index] || {})[column.prop] || crud.DIC.value[column.prop]"
							:props="column.props || crud.tableOption.value.props"
							:readonly="column.readonly"
							:disabled="crud.disabled || crud.tableOption.value.disabled || column.disabled || crud.btnDisabledList[$index]"
							:clearable="validData(column.clearable, false)"
							:column-slot="crud.mainSlot"
							@change="columnChange(row, column, $index)">
							<template v-for="item in crud.mainSlot" #[item]="scope">
								<slot v-bind="scope" :name="item" />
							</template>
						</qv-temp-form>
					</div>
				</el-tooltip>
			</el-form-item>
			<slot
				v-else-if="crud.slots[column.prop]"
				:row="row"
				:index="$index"
				:dic="crud.DIC.value[column.prop]"
				:size="crud.isMediumSize"
				:label="handleShowLabel(row, column, crud.DIC.value[column.prop])"
				:name="column.prop" />
			<template v-else>
				<span v-if="['img', 'upload'].includes(column.type || '')">
					<div class="qv-crud__img">
						<img
							v-for="(item, index) in getImgList(row, column)"
							:key="index"
							:src="item"
							v-bind="allParams(item)"
							@click.stop="openImg(getImgList(row, column), index)" />
					</div>
				</span>
				<el-link
					v-for="(item, index) in corArray(row[column.prop], column.separator)"
					v-else-if="'url' === column.type"
					:key="index"
					type="primary"
					:href="item"
					:target="column.target || '_blank'">
					{{ item }}
				</el-link>
				<qv-rate v-else-if="'rate' === column.type" v-model="row[column.prop]" disabled />
				<i v-else-if="'color' === column.type" class="qv-crud__color" :style="{ backgroundColor: row[column.prop] }" />
				<qv-temp-icon v-else-if="'icon' === column.type" :text="row[column.prop]" />
				<span v-else-if="column.html" v-html="handleDetail(row, column)" />
				<span v-else v-text="handleDetail(row, column)" />
			</template>
		</template>
	</el-table-column>
</template>

<script setup lang="ts">
import { inject, nextTick } from 'vue'
import { details, sendDic } from '@qv-vue/core'
import { DIC_PROPS, DIC_SPLIT, typeList } from '@qv-vue/constants'
import QvTempForm from '@qv-vue/components/temp/src/temp-form.vue'
import QvTempIcon from '@qv-vue/components/temp/src/icon.vue'
import { deepClone, findObject, validData, validatenull } from '@qv-vue/utils'
import { getSlotName } from '@qv-vue/hooks'
import type { QvColumn } from '@qv-vue/types/qvue-ui'
import type { PropType } from 'vue'

const { crud, dynamic } = inject<any>('column')
defineOptions({
	name: 'column-slot'
})
defineProps({
	column: {
		type: Object as PropType<QvColumn>,
		default: () => ({})
	},
	columnOption: {
		type: Array as PropType<QvColumn[]>,
		default: () => []
	}
})

const count = {}

const allParams = (item: any) => {
	return {
		is: typeList.video.test(item) ? 'video' : 'img'
	}
}
const vaildLabel = (column: any, row: any, val: any) => {
	if (column.rules && row.$cellEdit) {
		return val
	}
}
const handleShowLabel = (row: any, column: any, DIC: any) => {
	let result: any = ''
	if (!validatenull(DIC)) {
		result = details(row, column, crud.tableOption.value, DIC)
		row[`$${column.prop}`] = result
	}
	return result
}
const columnChange = (row: any, column: any, index: number) => {
	const key = `${index}-${column.prop}`
	if (!count[key]) {
		handleChange(column, row)
		if (typeof column.change === 'function' && column.cell == true) {
			column.change({ row, column, index, value: row[column.prop] })
		}
	}
	count[key] = true
	nextTick(() => (count[key] = false))
}
const handleChange = (column: any, row: any) => {
	if (!column.cascader) return
	nextTick(() => {
		const columnOption = [...crud.propOption]
		//本节点;
		const cascader = column.cascader
		// const str = cascader.join(',');
		cascader.forEach((item: any) => {
			const columnNextProp = item
			const value = row[column.prop]
			const rowIndex = row.$index
			// 下一个节点
			const columnNext = findObject(columnOption, columnNextProp)
			if (validatenull(columnNext)) return
			// 如果本节点没有字典则创建节点数组
			if (validatenull(crud.cascaderDIC[rowIndex])) {
				crud.cascaderDIC[rowIndex] = {}
			}
			if (crud.formIndexList.includes(rowIndex)) {
				//清空子类字典
				cascader.forEach((ele: any) => {
					crud.cascaderDIC[rowIndex][ele.prop] = []
					cascader.forEach((ele: any) => (row[ele] = ''))
				})
			}
			//最后一级
			if (validatenull(cascader) || validatenull(value) || validatenull(columnNext)) {
				return
			}
			sendDic({
				column: columnNext,
				value,
				form: row
			}).then(res => {
				//首次加载的放入队列记录
				if (!crud.formIndexList.includes(rowIndex)) crud.formIndexList.push(rowIndex)
				const dic: any = res || []
				// 修改字典
				crud.cascaderDIC[rowIndex][columnNextProp] = dic

				if (!validatenull(dic[columnNext.cascaderIndex]) && !validatenull(dic) && !validatenull(columnNext.cascaderIndex)) {
					row[columnNextProp] = dic[columnNext.cascaderIndex][(columnNext.props || {}).value || DIC_PROPS.value]
				}
			})
		})
	})
}
const openImg = (list: any[], index: number) => {
	list = list.map(ele => {
		return { thumbUrl: ele, url: ele }
	})
	console.log(list, index)

	// this.$ImagePreview(list, index);
}
const corArray = (list: any, separator = DIC_SPLIT) => {
	if (validatenull(list)) {
		return []
	} else if (!Array.isArray(list)) {
		return list.split(separator)
	}
	return list
}
const handleDetail = (row: any, column: any) => {
	let result = row[column.prop]
	const DIC = column.parentProp ? (crud.cascaderDIC.value[row.$index] || {})[column.prop] : crud.DIC.value[column.prop]
	result = details(row, column, crud.tableOption.value, DIC)
	if (!validatenull(DIC)) {
		row[`$${column.prop}`] = result
	}
	// console.log('handleDetail====', result, t, column.prop);
	return result
}
const getImgList = (row: any, column: any) => {
	const url = (column.propsHttp || {}).home || ''
	const value = (column.props || {}).value || DIC_PROPS.value
	const result = handleDetail(row, column)
	if (validatenull(result)) return []
	if (column.listType == 'picture-img') return [url + result]
	const list = corArray(deepClone(result), column.separator)
	list.forEach((ele: any, index: number) => {
		list[index] = url + (typeof ele === 'object' ? ele[value] : ele)
	})
	return list
}
</script>

<style></style>
