<template>
	<div :class="b()">
		<div :class="b('header')">
			<div :class="b('title')" v-if="title" v-text="title"></div>
			<small :class="b('meta')" v-if="meta" v-text="meta"></small>
		</div>
		<div :class="b('lead')" v-text="lead" v-if="lead"></div>
		<div :class="b('body')" v-if="body" v-html="body"></div>
	</div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { useBem } from '@qv-vue/hooks'
import { articleProps } from './article'
defineOptions({
	name: 'qv-article'
})
const { b } = useBem('qv-article')

const props = defineProps(articleProps)

const titleKey = computed(() => {
	return props.props.title
})
const metaKey = computed(() => {
	return props.props.meta
})
const leadKey = computed(() => {
	return props.props.lead
})
const bodyKey = computed(() => {
	return props.props.body
})
const title = computed(() => {
	return props.data?.[titleKey.value]
})
const meta = computed(() => {
	return props.data?.[metaKey.value]
})
const lead = computed(() => {
	return props.data?.[leadKey.value]
})
const body = computed(() => {
	return props.data?.[bodyKey.value]
})
</script>
<style></style>
