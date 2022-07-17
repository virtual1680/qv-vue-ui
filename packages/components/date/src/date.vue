<template>
  <div :class="b()">
    <!-- :disabled-date="column.disabledDate" -->
    <el-date-picker
      v-model="text"
      :type="type"
      :popper-class="column?.popperClass"
      :size="size"
      :editable="column?.editable"
      :unlink-panels="column?.unlinkPanels"
      :readonly="readonly"
      :default-value="column?.defaultValue"
      :default-time="column?.defaultTime"
      :range-separator="column?.rangeSeparator"
      :start-placeholder="column?.startPlaceholder"
      :end-placeholder="column?.endPlaceholder"
      :format="column?.format"
      :clearable="clearableVal"
      :shortcuts="column?.shortcuts"
      :value-format="column?.valueFormat"
      :placeholder="placeholder"
      :disabled="disabled"
      @blur="handleBlur"
      @focus="handleFocus"
      @click="handleClick"
    />
  </div>
</template>
<script lang="ts" setup>
import { useBem, useEvent } from '@qv-vue/hooks'
import { dateProps } from './date'
defineOptions({
  name: 'qv-date',
})
const { b } = useBem('qv-date')
const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
  (e: 'blur', value: any): void
  (e: 'click', value: any): void
  (e: 'change', value: any): void
  (e: 'focus', value: any): void
}>()
const props = defineProps(dateProps)
const handleTextValue = (val: unknown) => {
  console.log(val, props.placeholder)
  // if (Array.isArray(val) && validatenull(val)) {
  // 	text.value = val.join(',');
  // }
}
const { text, clearableVal, handleBlur, handleClick, handleFocus } = useEvent(
  props,
  emit,
  { handleTextValue }
)
</script>
<style></style>
