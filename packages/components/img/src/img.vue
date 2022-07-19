<template>
  <div :class="[b(), 'qv-img--' + column?.align]">
    <img
      v-if="status"
      :src="text"
      :width="setPx(column?.imgWidth || '', '100%')"
      :height="setPx(column?.imgHeight || '')"
    />
    <el-button v-else :size="size" :type="type" @click="handleViews">
      查 看
    </el-button>
    <el-dialog
      v-model="box"
      width="60%"
      :custom-class="{ 'qvue-img--fullscreen': column?.fullscreen }"
      :fullscreen="column?.fullscreen"
      append-to-body
    >
      <qv-carousel :option="option" />
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue'
import { setPx } from '@qv-vue/utils'
import { useBem, useEvent } from '@qv-vue/hooks'
import { imgProps } from './img'
defineOptions({
  name: 'qv-img',
})
const { b } = useBem('qv-img')

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
  (e: 'blur', value: any): void
  (e: 'click', value: any): void
  (e: 'change', value: any): void
  (e: 'focus', value: any): void
}>()
const props = defineProps(imgProps)
const { text, labelKey, valueKey, isArray } = useEvent(props, emit)
const box = ref(false)
const option = computed(() => {
  if (status.value || !text.value) return {}
  const list: { src: string; title?: string }[] = []
  text.value.forEach((ele: string) => {
    if (isArray.value) {
      list.push({
        src: ele,
      })
    } else {
      list.push({
        title: ele[labelKey.value],
        src: ele[valueKey.value],
      })
    }
  })
  return {
    autoplay: true,
    type: props.column?.imgType,
    fullscreen: props.column?.fullscreen,
    interval: 3000,
    data: list,
  }
})

const status = computed(() => {
  return props.column?.listType === 'picture-img'
})

const handleViews = () => {
  box.value = true
}
</script>
<style></style>
