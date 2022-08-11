<template>
	<div>
		<div class="wel__header">表头</div>
		<qv-crud
			:data="config.data"
			:option="option"
			:table-loading="config.showLoading"
			@search-reset="resetChange"
			@search-change="searchChange"
			:search="config.search">
			<!-- 自定义表头 -->
			<template #name-header="{ column }">
				<el-tag>我是自定义{{ (column || {}).label }}-{{ (column || {}).prop }}</el-tag>
			</template>
			<!-- 自定义左边按钮 -->
			<template #menu-left="{ size }">
				<el-button type="primary" :size="size">自定义按钮</el-button>
			</template>
			<!-- 自定义右边按钮 -->
			<template #menu-right="{ size }">
				<el-button type="primary" icon="Edit" circle :size="size"></el-button>
			</template>
		</qv-crud>
	</div>
</template>

<script lang="ts" setup>
import { computed, reactive } from 'vue'
import { ElMessage } from 'element-plus'

let config = reactive({
	search: {
		name: 'small',
		sex: 1
	},
	data: [
		{
			name: '张三',
			age: 14,
			address: '110000',
			phone1: '17547400800',
			phone: '17547400800',
			icon: 'el-icon-time',
			test: 1,
			sex: '男'
		},
		{
			name: '王五',
			age: 10,
			address: '120000',
			test: 1,
			sex: '女',
			icon: 'el-icon-star-on',
			phone1: '17547400800',
			phone: '17547400800'
		}
	],
	menuType: 'text',
	showLoading: false,
	showCard: false,
	showBorder: true,
	showStripe: false,
	showHeader: true,
	showIndex: true,
	showCheckbox: false,
	showPage: true,
	sizeValue: 'small'
})
const option = computed(() => {
	return {
		headerAlign: 'center',
		showHeader: true, //是否显示表头
		// searchLabelWidth: 160, // 可以全局设置
		expandLevel: 3,
		// searchIndex: 4,
		height: 'auto',
		calcHeight: 80,
		column: [
			{
				// searchLabelWidth: 150, // 局部设置
				label: '超级姓名',
				type: 'input',
				prop: 'name',
				search: true
			},
			{
				label: '多级表头',
				children: [
					{
						label: '信息',
						children: [
							{
								label: '年龄',
								prop: 'age',
								search: true
							},
							{
								label: '手机号',
								search: true,
								prop: 'phone'
							}
						]
					},
					{
						label: '地区',
						prop: 'address',
						type: 'select',
						props: {
							label: 'name',
							value: 'code'
						},
						dicUrl: 'https://cli.avuejs.com/api/area/getProvince'
					}
				]
			},
			{
				search: true,
				label: '性别',
				prop: 'sex',
				type: 'select',
				dicData: [
					{ label: '男', value: 1 },
					{ label: '女', value: 2 }
				]
			},
			{
				search: true,
				label: '性别1',
				prop: 'sex1',
				type: 'select',
				dicData: [
					{ label: '男', value: 1 },
					{ label: '女', value: 2 }
				]
			}
		]
	}
})

/**
 * 搜索方法
 */
const searchChange = (form: Record<string, unknown>, done: () => void) => {
	ElMessage.success(JSON.stringify(form))
	done()
}
// 清空回调
const resetChange = () => {
	ElMessage.success('清空回调')
}
</script>

<style scoped="scoped" lang="scss">
.wel {
	&__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 25px 40px;
		background-color: #ffffff;
		border-bottom: 1px solid #e8e8e8;
	}
	&__info {
		display: flex;
		align-items: center;
		&-img {
			display: block;
			width: 72px;
			height: 72px;
			border-radius: 72px;
			img {
				display: block;
				width: 100%;
				height: 100%;
			}
		}
		&-content {
			position: relative;
			margin-left: 24px;
			line-height: 22px;
			color: rgb(0 0 0 / 45%);
		}
		&-title {
			margin-bottom: 12px;
			font-size: 20px;
			font-weight: 500;
			line-height: 28px;
			color: rgb(0 0 0 / 85%);
		}
		&-subtitle {
			position: relative;
			font-size: 14px;
			line-height: 22px;
			color: rgb(0 0 0 / 45%);
		}
	}
	&__extra {
		&-item {
			position: relative;
			display: inline-block;
			padding: 0 32px;
			&:last-child {
				&::after {
					display: none;
				}
			}
			&::after {
				position: absolute;
				top: 30px;
				right: 0;
				width: 1px;
				height: 40px;
				content: '';
				background-color: #e8e8e8;
			}
		}
		&-title {
			margin-bottom: 4px;
			font-size: 14px;
			line-height: 22px;
			color: rgb(0 0 0 / 45%);
		}
		&-subtitle {
			margin: 0;
			font-size: 30px;
			line-height: 38px;
			color: rgb(0 0 0 / 85%);
			span {
				font-size: 20px;
				color: rgb(0 0 0 / 45%);
			}
		}
	}
}
</style>
