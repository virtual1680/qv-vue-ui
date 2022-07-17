<template>
  <el-input-number
    v-model.number="text"
    :class="b()"
    :precision="column?.precision"
    :placeholder="placeholder"
    :size="size"
    :min="column?.min"
    :max="column?.max"
    :step="column?.step"
    :clearable="clearableVal"
    :readonly="readonly"
    :controls-position="column?.controlsPosition"
    :controls="column?.controls"
    :label="placeholder"
    :disabled="disabled"
    @click="handleClick"
    @focus="handleFocus"
    @blur="handleBlur"
  />
</template>
<script lang="ts" setup>
import { useBem, useEvent } from '@qv-vue/hooks'
import { inputNumberProps } from './input-number'
defineOptions({
  name: 'qv-input-number',
})
const { b } = useBem('qv-input-number')
const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
  (e: 'blur', value: any): void
  (e: 'click', value: any): void
  (e: 'change', value: any): void
  (e: 'focus', value: any): void
}>()
const props = defineProps(inputNumberProps)
const { text, handleFocus, handleClick, handleBlur, clearableVal } = useEvent(
  props,
  emit
)
</script>
<style></style>
