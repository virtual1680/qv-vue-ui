<!-- eslint-disable vue/no-lone-template -->
<!-- eslint-disable vue/valid-attribute-name -->
<template>
	<!-- 操作栏 -->
	<el-table-column
		v-if="validData(crud.tableOption.menu, config.menu) && crud.getPermission('menu')"
		:class="b('btn')"
		prop="menu"
		:fixed="validData(crud.tableOption.menuFixed, config.menuFixed)"
		:label="crud.tableOption.menuTitle || t('crud.menu')"
		:align="crud.tableOption.menuAlign || config.menuAlign"
		:header-align="crud.tableOption.menuHeaderAlign || config.menuHeaderAlign"
		:width="crud.isMobile ? crud.tableOption.menuXsWidth || config.menuXsWidth : crud.tableOption.menuWidth || config.menuWidth">
		<template #="{ row, $index }">
			<el-dropdown v-if="isMenu" :size="crud.isMediumSize">
				<el-button text :size="crud.isMediumSize">
					{{ crud.tableOption.menuBtnTitle || t('crud.menuBtn') }}
					<el-icon class="el-icon--right&quot;">
						<ArrowDown />
					</el-icon>
				</el-button>
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item
							v-if="validData(crud.tableOption.viewBtn, config.viewBtn)"
							v-permission="crud.getPermission('viewBtn', row, $index)"
							:icon="crud.getBtnIcon('viewBtn')"
							@click="crud.rowView(row, $index)">
							{{ crud.menuIcon('viewBtn') }}
						</el-dropdown-item>
						<el-dropdown-item
							v-if="validData(crud.tableOption.editBtn, config.editBtn)"
							v-permission="crud.getPermission('editBtn', row, $index)"
							:icon="crud.getBtnIcon('editBtn')"
							@click="crud.rowEdit(row, $index)">
							{{ crud.menuIcon('editBtn') }}
						</el-dropdown-item>
						<el-dropdown-item
							v-if="validData(crud.tableOption.copyBtn, config.copyBtn)"
							v-permission="crud.getPermission('copyBtn', row, $index)"
							:icon="crud.getBtnIcon('copyBtn')"
							@click="crud.rowCopy(row)">
							{{ crud.menuIcon('copyBtn') }}
						</el-dropdown-item>
						<el-dropdown-item
							v-if="validData(crud.tableOption.delBtn, config.delBtn)"
							v-permission="crud.getPermission('delBtn', row, $index)"
							:icon="crud.getBtnIcon('delBtn')"
							@click="crud.rowDel(row, $index)">
							{{ crud.menuIcon('delBtn') }}
						</el-dropdown-item>
						<slot name="menuBtn" :row="row" :type="menuText('primary')" :disabled="crud.btnDisabled" :size="crud.isMediumSize" :index="$index" />
					</el-dropdown-menu>
				</template>
			</el-dropdown>
			<template v-else-if="['button', 'link', 'icon'].includes(menuType)">
				<template v-if="validData(crud.tableOption.cellBtn, config.cellBtn)">
					<el-button
						v-if="validData(crud.tableOption.editBtn, config.editBtn) && !row.$cellEdit"
						v-permission="crud.getPermission('editBtn', row, $index)"
						:type="menuText('primary')"
						:link="isTextMenu"
						:icon="crud.getBtnIcon('editBtn')"
						:size="crud.isMediumSize"
						:disabled="crud.btnDisabledList[$index]"
						@click.stop="crud.rowCell(row, $index)">
						<template v-if="!isIconMenu">
							{{ crud.menuIcon('editBtn') }}
						</template>
					</el-button>

					<el-button
						v-else-if="validData(crud.tableOption.saveBtn, config.saveBtn) && row.$cellEdit"
						v-permission="crud.getPermission('saveBtn', row, $index)"
						:type="menuText('primary')"
						:link="isTextMenu"
						:icon="crud.getBtnIcon('saveBtn')"
						:size="crud.isMediumSize"
						:disabled="crud.btnDisabledList[$index]"
						@click.stop="crud.rowCell(row, $index)">
						<template v-if="!isIconMenu">
							{{ crud.menuIcon('saveBtn') }}
						</template>
					</el-button>
					<el-button
						v-if="row.$cellEdit"
						:type="menuText('danger')"
						:link="isTextMenu"
						:icon="crud.getBtnIcon('cancelBtn')"
						:size="crud.isMediumSize"
						:disabled="crud.btnDisabledList[$index]"
						@click.stop="crud.rowCancel(row, $index)">
						<template v-if="!isIconMenu">
							{{ crud.menuIcon('cancelBtn') }}
						</template>
					</el-button>
				</template>
				<el-button
					v-if="validData(crud.tableOption.viewBtn, config.viewBtn)"
					v-permission="crud.getPermission('viewBtn', row, $index)"
					:type="menuText('success')"
					:link="isTextMenu"
					:icon="crud.getBtnIcon('viewBtn')"
					:size="crud.isMediumSize"
					:disabled="crud.btnDisabled"
					@click.stop="crud.rowView(row, $index)">
					<template v-if="!isIconMenu">
						{{ crud.menuIcon('viewBtn') }}
					</template>
				</el-button>
				<el-button
					v-if="validData(crud.tableOption.editBtn, config.editBtn) && !crud.tableOption.cellBtn"
					v-permission="crud.getPermission('editBtn', row, $index)"
					:type="menuText('primary')"
					:link="isTextMenu"
					:icon="crud.getBtnIcon('editBtn')"
					:size="crud.isMediumSize"
					:disabled="crud.btnDisabled"
					@click.stop="crud.rowEdit(row, $index)">
					<template v-if="!isIconMenu">
						{{ crud.menuIcon('editBtn') }}
					</template>
				</el-button>
				<el-button
					v-if="validData(crud.tableOption.copyBtn, config.copyBtn)"
					v-permission="crud.getPermission('copyBtn', row, $index)"
					:type="menuText('primary')"
					:link="isTextMenu"
					:icon="crud.getBtnIcon('copyBtn')"
					:size="crud.isMediumSize"
					:disabled="crud.btnDisabled"
					@click.stop="crud.rowCopy(row)">
					<template v-if="!isIconMenu">
						{{ crud.menuIcon('copyBtn') }}
					</template>
				</el-button>
				<el-button
					v-if="validData(crud.tableOption.delBtn, config.delBtn) && !row.$cellEdit"
					v-permission="crud.getPermission('delBtn', row, $index)"
					:type="menuText('danger')"
					:link="isTextMenu"
					:icon="crud.getBtnIcon('delBtn')"
					:size="crud.isMediumSize"
					:disabled="crud.btnDisabled"
					@click.stop="crud.rowDel(row, $index)">
					<template v-if="!isIconMenu">
						{{ crud.menuIcon('delBtn') }}
					</template>
				</el-button>
			</template>
			<slot name="menu" :row="row" :type="menuText('primary')" :disabled="crud.btnDisabled" :size="crud.isMediumSize" :index="$index" />
		</template>
	</el-table-column>
</template>

<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import { validData } from '@qv-vue/utils'
import { useBem } from '@qv-vue/hooks'
import { t } from '@qv-vue/locale'
import configDe from '../config'
const crud = inject<any>('crud')
const { b } = useBem('qv-crud')

const config = ref(configDe)
// const defaultMenuType = getCurrentInstance()?.proxy?.$qv.menuType
const menuType = computed(() => {
	return crud.tableOption.menuType || 'link' //defaultMenuType //this.$AVUE.menuType
})
const isIconMenu = computed(() => {
	return menuType.value === 'icon'
})
const isTextMenu = computed(() => {
	return menuType.value === 'link'
})
const isMenu = computed(() => {
	return menuType.value === 'menu'
})
const menuText = (value: string) => {
	return value
}
</script>
