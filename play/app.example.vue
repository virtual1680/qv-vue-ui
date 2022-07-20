<template>
	<div class="play-container">
		<el-icon color="#409EFC">
			<el-icon-check />
		</el-icon>
		<el-icon>
			<el-icon-menu />
		</el-icon>
		<el-button>test</el-button>
		<div v-loading="true" />
	</div>
</template>

<script setup lang="ts">
// code here
import { ref, reactive } from 'vue'

const data = ref([
	{
		username: 'smallwei',
		name: 'qv',
		password: '123456',
		newpassword: '123456',
		date: '2019-01-01',
		textarea: '这是一条很长很长很长很长很长很长很长很长的个性签名'
	},
	{
		username: 'smallwei',
		name: 'qv',
		password: '123456',
		newpassword: '123456',
		date: '2019-01-01',
		textarea: '这是一条很长很长很长很长很长很长很长很长的个性签名'
	},

	{
		username: 'smallwei',
		name: 'qv',
		password: '123456',
		newpassword: '123456',
		date: '2019-01-01',
		textarea: '这是一条很长很长很长很长很长很长很长很长的个性签名'
	},
	{
		username: 'smallwei',
		name: 'qv',
		password: '123456',
		newpassword: '123456',
		date: '2019-01-01',
		textarea: '这是一条很长很长很长很长很长很长很长很长的个性签名'
	},
	{
		username: 'smallwei',
		name: 'qv',
		password: '123456',
		newpassword: '123456',
		date: '2019-01-01',
		textarea: '这是一条很长很长很长很长很长很长很长很长的个性签名'
	},
	{
		username: 'smallwei',
		name: 'qv',
		password: '123456',
		newpassword: '123456',
		date: '2019-01-01',
		textarea: '这是一条很长很长很长很长很长很长很长很长的个性签名'
	},
	{
		username: 'smallwei',
		name: 'qv',
		password: '123456',
		newpassword: '123456',
		date: '2019-01-01',
		textarea: '这是一条很长很长很长很长很长很长很长很长的个性签名'
	}
])
let option = ref({})
setTimeout(() => {
	option.value = {
		column: [
			{
				label: '用户名',
				prop: 'username',
				span: 14,
				row: true
			},
			{
				label: '姓名',
				prop: 'name',
				span: 14,
				row: true
			},
			{
				label: '密码',
				prop: 'password',
				type: 'password',
				span: 14,
				row: true
			},
			{
				label: '确认密码',
				prop: 'newpassword',
				type: 'password',
				hide: true,
				span: 14,
				row: true
			},
			{
				label: '申请日期',
				prop: 'date',
				type: 'date',
				span: 14,
				row: true
			},
			{
				label: '个性签名',
				prop: 'textarea',
				type: 'textarea',
				minRows: 8,
				span: 24,
				overHidden: true,
				row: true
			}
		]
	}
}, 2000)
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
