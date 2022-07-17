<template>
  <div :class="b()">
    <el-row :span="24" :gutter="gutter">
      <el-col v-if="validData(option?.addBtn, true)" :span="span">
        <div :class="b('item', { add: true })" @click="rowAdd()">
          <el-icon>
            <Plus />
          </el-icon>
          <span>添加</span>
        </div>
      </el-col>
      <el-col v-for="(item, index) in data" :key="index" :span="span">
        <div :class="b('item')" @click="rowClick(item, index)">
          <div :class="b('body')">
            <div :class="b('avatar')">
              <img :src="item[imgKey]" alt="" />
            </div>
            <div :class="b('detail')">
              <div :class="b('title')">{{ item[titleKey] }}</div>
              <div :class="b('info')">{{ item[infoKey] }}</div>
            </div>
          </div>
          <div :class="b('menu')">
            <slot name="menu" :index="index" :row="item" />
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useBem } from '@qv-vue/hooks'
import { validData } from '@qv-vue/utils'
import { cardProps } from './card'
defineOptions({
  name: 'qv-card',
})
const { b } = useBem('qv-card')
const emit = defineEmits<{
  (e: 'row-add'): void
  (e: 'row-click', row: any, index: number): void
}>()
const pDefault = {
  img: 'img',
  title: 'title',
  info: 'info',
}
const props = defineProps(cardProps)
const propsDefault = ref(pDefault)

const imgKey = computed(() => {
  return props.option?.props.img || propsDefault.value.img
})
const titleKey = computed(() => {
  return props.option?.props.title || propsDefault.value.title
})
const infoKey = computed(() => {
  return props.option?.props.info || propsDefault.value.info
})
const span = computed(() => {
  return props.option?.span || 8
})
const gutter = computed(() => {
  return props.option?.gutter || 20
})
const rowAdd = () => {
  emit('row-add')
}
const rowClick = (row: any, index: number) => {
  emit('row-click', row, index)
}
</script>
<style></style>
