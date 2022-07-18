<template>
  <!-- :render-header="columnOption.renderHeader" -->
  <el-table-column
    v-if="dynamic.getColumnProp(columnOption, 'hide')"
    :prop="columnOption.prop"
    :label="columnOption.label"
    filter-placement="bottom-end"
    :filters="dynamic.getColumnProp(columnOption, 'filters')"
    :filter-method="
      dynamic.getColumnProp(columnOption, 'filterMethod')
        ? dynamic.handleFiltersMethod
        : undefined
    "
    :filter-multiple="validData(columnOption.filterMultiple, true)"
    :show-overflow-tooltip="columnOption.overHidden"
    :min-width="columnOption.minWidth"
    :sortable="dynamic.getColumnProp(columnOption, 'sortable')"
    :align="columnOption.align || crud.tableOption.align"
    :header-align="
      columnOption.headerAlign || crud.tableOption.value.headerAlign
    "
    :width="dynamic.getColumnProp(columnOption, 'width')"
    :fixed="dynamic.getColumnProp(columnOption, 'fixed')"
  >
    <template v-for="column in columnOption.children">
      <column-dynamic
        v-if="column.children && column.children.length > 0"
        :key="column.label"
        :column-option="column"
      >
        <template v-for="item in crud.mainSlot" #[item]="scope">
          <slot v-bind="scope" :name="item" />
        </template>
      </column-dynamic>
      <column-slot
        v-else
        :key="column.label + '1'"
        :column="column"
        :column-option="columnOption.children"
      >
        <template v-for="item in crud.mainSlot" #[item]="scope">
          <slot v-bind="scope" :name="item" />
        </template>
      </column-slot>
    </template>
  </el-table-column>
</template>

<script setup lang="ts" name="column-dynamic">
import { inject } from 'vue'
import { validData } from '@qv-vue/utils'
import columnSlot from './column-slot.vue'
import type { QvColumn } from '@qv-vue/types/qvue-ui'
import type { PropType } from 'vue'

const { crud, dynamic } = inject<any>('column')

defineProps({
  columnOption: {
    type: Object as PropType<QvColumn>,
    required: true,
  },
})
</script>
