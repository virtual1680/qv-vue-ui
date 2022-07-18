<!-- eslint-disable vue/no-v-html -->
<template>
  <span v-if="['img', 'upload'].includes(column.type)">
    <div class="qv-crud__img">
      <img
        v-for="(item, index) in getImgList(row, column)"
        :key="index"
        :src="item"
        @click="openImg(getImgList(row, column), index)"
      />
    </div>
  </span>
  <span v-else-if="['url'].includes(column.type)">
    <el-link
      v-for="(item, index) in corArray(row[column.prop], column.separator)"
      :key="index"
      type="primary"
      :href="item"
      :target="column.target || '_blank'"
    >
      {{ item }}
    </el-link>
  </span>
  <span v-else-if="['rate'].includes(column.type)">
    <qv-rate v-model="row[column.prop]" disabled />
  </span>
  <span v-else v-html="handleDetail(row, column)" />
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { details } from '@qv-vue/core'
import { DIC_PROPS, DIC_SPLIT } from '@qv-vue/constants'
import { deepClone, validatenull } from '@qv-vue/utils'
import { ElMessage } from 'element-plus'
import type { QvColumn } from '@qv-vue/types/qvue-ui'

export interface MenuProps {
  column: QvColumn
  row: Record<string, unknown>
}
const crud = inject<any>('crud')
defineProps<MenuProps>()

const openImg = (list: any[], index: number) => {
  list = list.map((ele: string) => {
    return { thumbUrl: ele, url: ele }
  })
  ElMessage.error('这个功能没完善')
  console.log(index)
  //TODO this.$ImagePreview(list, index);
}
const corArray = (list: any, separator = DIC_SPLIT) => {
  if (validatenull(list)) {
    return []
  } else if (!Array.isArray(list)) {
    return list.split(separator)
  }
  return list
}
const getImgList = (row: any, column: QvColumn) => {
  const url = (column.propsHttp || {}).home || ''
  const value = (column.props || {}).value || DIC_PROPS.value
  if (validatenull(row[column.prop])) return []
  if (column.listType == 'picture-img') return [url + row[column.prop]]
  const list = corArray(deepClone(row[column.prop]), column.separator)
  list.forEach((ele: any, index: number) => {
    if (typeof ele === 'object') {
      list[index] = url + ele[value]
    } else {
      list[index] = url + ele
    }
  })
  return list
}
const handleDetail = (row: any, column: QvColumn) => {
  let result = row[column.prop]
  const DIC = column.parentProp
    ? (crud.cascaderDIC[row.$index] || {})[column.prop]
    : crud.DIC[column.prop]
  result = details(row, column, crud.tableOption, DIC)
  if (!validatenull(DIC)) {
    row[`$${column.prop}`] = result
  }
  return result
}
</script>

<style></style>
