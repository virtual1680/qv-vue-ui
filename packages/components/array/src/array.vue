<!--
 * @Author: qinhongyang virtual1680@gmail.com
 * @Date: 2022-08-18 08:51:31
 * @LastEditTime: 2022-08-18 15:38:30
 * @Description: 暂无
-->
<template>
	<div :class="b()">
		<el-button type="primary" icon="Plus" circle :size="size" v-if="validatenull(text)" :disabled="disabled" @click="add()"></el-button>
		<div :class="b('item')" v-for="(item, index) in text" :key="index">
			<div :class="b('input')">
				<el-tooltip placement="bottom" :disabled="(!isImg && !isUrl) || validatenull(item)">
					<template #content>
						<el-image style="width: 150px" :src="item" @click="openImg(index)" fit="cover" v-if="isImg"></el-image>
						<el-link type="primary" :href="item" v-else-if="isUrl" :target="target">{{ item }}</el-link>
					</template>
					<el-input v-model="text[index]" :size="size" :placeholder="placeholder" :disabled="disabled"></el-input>
				</el-tooltip>
				<template v-if="!(disabled || readonly || alone)">
					<el-button type="primary" icon="Plus" circle :size="size" :disabled="disabled" @click="add(index)"></el-button>
					<el-button type="danger" icon="Minus" circle :size="size" :disabled="disabled" @click="remove(index)"></el-button>
				</template>
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useBem } from '@qv-vue/hooks'
import { validatenull } from '@qv-vue/utils'
import { arrayProps } from './array'
// import { ElButton, ElTooltip, ElImage, ElLink } from 'element-plus'
import type { Ref } from 'vue'
defineOptions({
	name: 'qv-array'
})
const { b } = useBem('qv-array')

const props = defineProps(arrayProps)
const text: Ref<string[]> = ref([])

const isImg = computed(() => {
	return props.type === 'img'
})
const isUrl = computed(() => {
	return props.type === 'url'
})
const add = (index: number = 0) => {
	text.value.splice(index + 1, 0, '')
}
const remove = (index: number) => {
	text.value.splice(index, 1)
}
const openImg = (index: number) => {
	const list = text.value.map(ele => {
		return { thumbUrl: ele, url: ele }
	})
	console.log(list, index)
	//TODO this.$ImagePreview(list, index);
}
</script>
<style></style>
