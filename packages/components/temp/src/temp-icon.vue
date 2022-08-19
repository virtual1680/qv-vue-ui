<!--
 * @Author: qinhongyang virtual1680@gmail.com
 * @Date: 2022-08-18 08:51:31
 * @LastEditTime: 2022-08-19 15:29:54
 * @Description: 暂无
-->
<!-- eslint-disable prettier/prettier -->
<template>
	<span class="qv-icon" :class="{ 'qv-icon--small': small }">
		<svg v-if="text.includes('#')" aria-hidden="true">
			<use :xlink:href="text" />
		</svg>
		<el-icon v-else-if="text.includes('el-')" :size="size" :color="color">
			<component :is="text" />
		</el-icon>
		<i v-else :class="text" />
	</span>
</template>
<!-- eslint-disable prettier/prettier -->
<script lang="ts" setup>
defineOptions({
	name: 'qv-temp-icon'
})
defineProps({
	small: Boolean,
	color: String,
	size: {
		type: [String, Number],
		default: 32
	},
	text: {
		type: String,
		default: ''
	}
})
</script>
