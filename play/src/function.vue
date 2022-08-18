<!--
 * @Author: qinhongyang virtual1680@gmail.com
 * @Date: 2022-08-18 09:15:55
 * @LastEditTime: 2022-08-18 10:11:18
 * @Description: 函数式表单用法
-->
<template>
	<div class="play-container">
		<el-button @click="open">打开弹窗</el-button>
	</div>
</template>

<script setup lang="ts">
// code here
import { getCurrentInstance, ref, nextTick } from 'vue'
// import DialogForm from '../../packages/components/form/src/dialog-form'

let option = ref({
	lazy: true,
	selection: true,
	rowKey: 'id',
	column: [
		{
			label: 'ID',
			prop: 'id'
		},
		{
			label: '姓名',
			prop: 'name'
		},
		{
			label: '日期',
			prop: 'date'
		},
		{
			label: '地址',
			prop: 'address',
			overHidden: true
		}
	]
})
const $proxy = getCurrentInstance()?.proxy
const open = () => {
	$proxy?.$dialogForm({ option: option.value })
}
</script>

<style lang="scss">
html,
body {
	width: 100vw;
	height: 100vh;
	margin: 0;
	#play {
		height: 100%;
		width: 100%;
		.play-container {
			height: 100%;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
}
</style>
