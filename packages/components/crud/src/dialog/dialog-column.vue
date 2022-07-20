<template>
	<el-drawer
		append-to-body
		:custom-class="['qv-dialog', b('dialog'), b('column')].join(' ')"
		:title="t('crud.showTitle')"
		@opened="init"
		:size="crud.isMobile ? '100%' : '40%'"
		v-model="columnBox">
		<el-table :data="list" ref="tableRef" height="100%" :key="Math.random()" size="small" border>
			<el-table-column align="center" width="100" header-align="center" prop="label" key="label" :label="t('crud.column.name')"> </el-table-column>
			<template v-for="item in defaultColumn">
				<el-table-column :prop="item.prop" :key="item.prop" align="center" header-align="center" v-if="item.hide != true" :label="item.label">
					<template #="{ row }">
						<el-checkbox v-model="crud.objectOption.value[row.prop][item.prop]"></el-checkbox>
					</template>
				</el-table-column>
			</template>
		</el-table>
	</el-drawer>
</template>
<script lang="ts" setup>
import { computed, inject, ref, watch } from 'vue'
import config from '../config.js'
import { t } from '@qv-vue/locale'
import { useBem } from '@qv-vue/hooks'
import type { QvColumn } from '@qv-vue/types/qvue-ui'
import type { Ref } from 'vue'
import type { ElTable } from 'element-plus'

defineOptions({ name: 'dialog-column' })

const crud = inject<any>('crud')
const { b } = useBem('crud')
const columnBox = ref(false)
const bindList = ref({})
const tableRef: Ref<InstanceType<typeof ElTable> | undefined> = ref()

const defaultColumn = computed(() => {
	return [
		{ label: t('crud.column.hide'), prop: 'hide' },
		{ label: t('crud.column.fixed'), prop: 'fixed' },
		{ label: t('crud.column.filters'), prop: 'filters' },
		{ label: t('crud.column.sortable'), prop: 'sortable' },
		{ label: t('crud.column.width'), prop: 'width', hide: true }
	]
})
const list = computed(() => {
	let list: QvColumn[] = []
	crud.propOption.value.forEach((ele: QvColumn) => {
		if (ele.showColumn != false) {
			list.push(ele)
		}
	})
	return list
})
const rowDrop = () => {
	const el = tableRef.value?.$el.querySelectorAll(config.dropRowClass)[0]
	crud.tableDrop &&
		crud.tableDrop('column', el, (evt: any) => {
			const oldIndex = evt.oldIndex
			const newIndex = evt.newIndex
			crud.headerSort(oldIndex, newIndex)
			crud.refreshTable(() => rowDrop())
		})
}
const init = () => {
	crud.propOption.value.forEach((column: QvColumn) => {
		if (bindList[column.prop] === true) return
		defaultColumn.value.forEach((ele: { label: string; prop: string }) => {
			if (['hide', 'filters'].includes(ele.prop)) {
				watch(
					() => `crud.objectOption.${column.prop}.${ele.prop}`,
					() => {
						crud.refreshTable()
					}
				)
			}
		})
		bindList[column.prop] = true
	})
	rowDrop()
}
defineExpose({ columnBox })
</script>
