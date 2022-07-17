<template>
  <el-select
    ref="mainRef"
    v-model="text"
    :class="b()"
    :size="size"
    :multiple-limit="column?.limit"
    :allow-create="column?.allowCreate"
    :default-first-option="column?.defaultFirstOption"
    :disabled="disabled"
    :loading="loading"
    :loading-text="column?.loadingText"
    :multiple="column?.multiple"
    :filterable="column?.remote ? true : column?.filterable"
    :remote="column?.remote"
    :readonly="readonly"
    :no-match-text="column?.noMatchText"
    :no-data-text="column?.noDataText"
    :remote-method="handleRemoteMethod"
    :popper-class="column?.popperClass"
    :popper-append-to-body="column?.popperAppendToBody"
    :collapse-tags="column?.tags"
    :clearable="clearableVal"
    :placeholder="placeholder"
    @focus="handleFocus"
    @blur="handleBlur"
    @click="handleClick"
    @change="changeSelect"
  >
    <template v-if="isGroup">
      <el-option-group
        v-for="(item, index) in netDic"
        :key="index"
        :label="getLabelText(item)"
      >
        <el-option
          v-for="(citem, cindex) in item[groupsKey]"
          :key="cindex"
          :disabled="citem[disabledKey]"
          :label="getLabelText(citem)"
          :value="citem[valueKey]"
        >
          <template #default>
            <slot
              v-if="slots.default"
              :label="labelKey"
              :value="valueKey"
              :item="citem"
            />
            <template v-else>
              <span>{{ getLabelText(citem) }}</span>
              <span v-if="citem[descKey]" :class="b('desc')">{{
                citem[descKey]
              }}</span>
            </template>
          </template>
        </el-option>
      </el-option-group>
    </template>
    <template v-else>
      <el-checkbox
        v-if="column?.all"
        v-model="checkAll"
        :class="b('check')"
        @change="selectAll"
      >
        全选
      </el-checkbox>
      <el-option
        v-for="(item, index) in netDic"
        :key="index"
        :disabled="item[disabledKey]"
        :label="getLabelText(item)"
        :value="item[valueKey]"
      >
        <template #default>
          <slot
            v-if="slots.default"
            :label="labelKey"
            :value="valueKey"
            :item="item"
          />
          <template v-else>
            <span>{{ getLabelText(item) }}</span>
            <span v-if="item[descKey]" :class="b('desc')">{{
              item[descKey]
            }}</span>
          </template>
        </template>
      </el-option>
    </template>
  </el-select>
</template>
<script lang="ts" setup>
import { onMounted, ref, useSlots, watch } from 'vue'
import { useBem, useEvent } from '@qv-vue/hooks'
import { validatenull } from '@qv-vue/utils'
import { ElSelect } from 'element-plus'
import { sendDic } from '@qv-vue/core'
import { DIC_SPLIT } from '@qv-vue/constants'
import { selectProps } from './select'

import type { Ref } from 'vue'

defineOptions({
  name: 'qv-select',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
  (e: 'blur', value: any): void
  (e: 'click', value: any): void
  (e: 'change', value: any): void
  (e: 'focus', value: any): void
}>()

const props = defineProps(selectProps)
const slots = useSlots()
const { b } = useBem('select')
const mainRef: Ref<InstanceType<typeof ElSelect> | null> = ref(null)
const checkAll = ref(false)
const created = ref(false)
const netDic = ref([] as any[])
const loading = ref(false)

const handleModelValue = () => {
  if (!validatenull(text.value)) {
    if (props.column?.remote && !created.value) {
      created.value = true
      handleRemoteMethod(
        props.column?.multiple ? text.value.join(DIC_SPLIT) : text.value
      )
    }
  }
}

let {
  text,
  handleFocus,
  handleBlur,
  isGroup,
  labelKey,
  groupsKey,
  descKey,
  handleClick,
  clearableVal,
  valueKey,
  disabledKey,
  getLabelText,
} = useEvent(props, emit, { handleModelValue })

const setSort = () => {
  // if (!window['Sortable']) {
  //   packages.logs('Sortable')
  //   return
  // }
  // const el = mainRef.value?.$el.querySelectorAll('.el-select__tags > span')[0]
  // window['Sortable'].create(el, {
  //   animation: 100,
  //   onEnd: (evt: any) => {
  //     const targetRow = (props.modelValue as any[]).splice(evt.oldIndex, 1)[0]
  //     ;(props.modelValue as any[]).splice(evt.newIndex, 0, targetRow)
  //   },
  // })
}
const handleRemoteMethod = (query: any) => {
  loading.value = true
  sendDic({
    column: props.column,
    value: query,
  }).then((res: any) => {
    loading.value = false
    netDic.value = res
  })
}
const selectAll = () => {
  text.value = []
  if (checkAll.value) {
    netDic.value.map((item) => text.value.push(item[valueKey.value]))
  } else {
    text.value = []
  }
}
const changeSelect = (val: any[]) => {
  checkAll.value = val.length === netDic.value.length
}
watch(
  () => props.dic,
  (val) => {
    netDic.value = val || []
  },
  {
    immediate: true,
  }
)
onMounted(() => {
  if (props.column?.drag) {
    setSort()
  }
})
</script>
<style></style>
