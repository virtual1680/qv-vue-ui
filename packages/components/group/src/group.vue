<template>
	<div v-if="display" :class="[b({ header: !isHeader }), b({ arrow: !arrow })]">
		<slot name="tabs" />
		<el-collapse v-model="activeName" @change="handleChange">
			<el-collapse-item :name="1" :disabled="!arrow">
				<template v-if="slots.header && header" #title>
					<div :class="b('header')">
						<slot name="header" />
					</div>
				</template>
				<template v-else-if="(label || icon) && header" #title>
					<div :class="b('header')">
						<i v-if="icon" :class="[icon, b('icon')]" />
						<h1 v-if="label" :class="b('title')">{{ label }}</h1>
					</div>
				</template>
				<slot />
			</el-collapse-item>
		</el-collapse>
	</div>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref, useSlots, watch } from 'vue'
import { useBem } from '@qv-vue/hooks'
import { groupProps } from './group'
import type { Ref } from 'vue'
defineOptions({
	name: 'qv-group'
})
const { b } = useBem('qv-group')
const emit = defineEmits<{ (e: 'change', value: number[]): void }>()
const props = defineProps(groupProps)
const slots = useSlots()
const activeName: Ref<number[]> = ref([])
const handleChange = (activeNames: number[]) => {
	emit('change', activeNames)
}
const text = computed(() => {
	return props.collapse ? 1 : 0
})
const isHeader = computed(() => {
	return (slots.header && props.header) || ((props.label || props.icon) && props.header)
})
watch(
	() => text.value,
	val => {
		activeName.value = [val]
	}
)
onMounted(() => {
	activeName.value = [text.value]
})
</script>
<style></style>
