<template>
	<div>
		<div class="wel__header">首页</div>
		<qv-form ref="form" v-model="config.obj" :option="option" @reset-change="emptytChange" @submit="submit">
			<template #menu-form>
				<el-button @click="tip">自定义按钮</el-button>
			</template>
		</qv-form>
	</div>
</template>

<script lang="ts" setup>
import { computed, reactive } from 'vue'
import { ElMessage } from 'element-plus'
// import { QvOption } from '@qv-vue/types/qvue-ui'
import type { QvOption } from '@qv-vue/types/qvue-ui'
const DIC = {
	VAILD: [
		{ label: '真', value: 'true' },
		{ label: '假', value: 'false' }
	],
	SEX: [
		{ label: '男', value: 0 },
		{ label: '女', value: 1 }
	]
}
let config = reactive({
	showLoading: false,
	obj: {},
	sizeValue: 'default'
})
const option = computed(() => {
	return {
		size: 'default',
		submitText: '完成',
		printBtn: false,
		column: [
			{
				label: '用户名',
				prop: 'username',
				tip: '这是信息提示',
				span: 8,
				searchLabelWidth: 3,
				suffixIcon: 'Plus',
				prefixIcon: 'Search',
				maxlength: 3,
				minlength: 2,
				rules: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
				click: ({ value, column }) => {
					console.log(value, column)
					ElMessage.success('click')
				},
				change: ({ value, column }) => {
					ElMessage.success('change事件查看控制台')
					console.log('值改变', value, column)
				},

				focus: ({ value, column }) => {
					ElMessage.success('focus事件查看控制台')
					console.log('获取焦点', value, column)
				},
				blur: ({ value, column }) => {
					ElMessage.success('blur事件查看控制台')
					console.log('失去焦点', value, column)
				}
			},
			{ label: '姓名', prop: 'name', disabled: true, span: 8, value: '哈哈好' },
			{ label: '密码', prop: 'password', type: 'password', span: 8 },
			{ label: '类型', prop: 'type', type: 'select', dicData: DIC.VAILD, span: 6 },
			{
				label: '权限',
				prop: 'grade',
				span: 6,
				type: 'checkbox',
				dicData: DIC.VAILD
			},
			{
				label: '开关',
				prop: 'switch',
				span: 6,
				type: 'switch',
				dicData: DIC.SEX,
				hide: true,
				row: true
			},
			{
				label: '性别',
				prop: 'sex',
				type: 'radio',
				dicData: DIC.SEX,
				row: true
			},
			{
				label: '数字',
				prop: 'number',
				type: 'number',
				span: 6,
				precision: 2,
				minRows: 0,
				maxRows: 3,
				row: true
			},
			{
				label: '网站',
				span: 12,
				prop: 'url',
				prepend: 'http://',
				append: 'com',
				row: true
			},
			{
				label: '日期',
				prop: 'date',
				type: 'date',
				span: 8,
				format: 'YYYY-MM-DD',
				valueFormat: 'YYYY-MM-DD'
			},
			{
				label: '日期时间',
				prop: 'datetime',
				type: 'datetime',
				span: 8,
				format: 'YYYY-MM-DD hh:mm:ss',
				valueFormat: 'YYYY-MM-DD hh:mm:ss'
			},
			{
				label: '时间',
				prop: 'time',
				type: 'time',
				span: 8,
				format: 'HH:mm:ss',
				valueFormat: 'HH:mm:ss'
			},
			{
				label: '地址',
				span: 24,
				prop: 'address',
				value: '909090'
			},
			{
				label: '建议',
				span: 24,
				type: 'upload',
				listType: 'picture-img',
				prop: 'adit'
			},
			//自定义组件
			{
				label: '我是自定义组件',
				labelWidth: 120,
				prop: 'divider',
				component: 'elTree', //ele树
				span: 24,
				event: {
					//组件事件
					click: () => {
						ElMessage.success('点击方法')
					}
				},
				params: {
					data: [
						{
							label: 'Level one 1',
							children: [
								{
									label: 'Level two 1-1',
									children: [
										{
											label: 'Level three 1-1-1'
										}
									]
								}
							]
						},
						{
							label: 'Level one 2',
							children: [
								{
									label: 'Level two 2-1',
									children: [
										{
											label: 'Level three 2-1-1'
										}
									]
								},
								{
									label: 'Level two 2-2',
									children: [
										{
											label: 'Level three 2-2-1'
										}
									]
								}
							]
						}
					]
				}
			},
			{
				label: '',
				labelWidth: 40,
				prop: 'divider',
				component: 'elDivider', //ele分割线
				span: 24,
				event: {
					click: () => {
						ElMessage.success('点击方法')
					}
				},
				params: {
					html: '<h2 style="color:red">自定义html标签,点我触发方法</h2>',
					contentPosition: 'left'
				}
			}
		]
	} as QvOption
})
const emptytChange = () => {
	ElMessage.success('清空方法回调')
}
const submit = (form: any, done: () => void) => {
	console.log('过滤数据--', form)
	console.log('正常数据--', config.obj)
	done()
	// ElMessage.success('当前数据' + JSON.stringify(config.obj));
}
const tip = () => {
	ElMessage.success('自定义按钮')
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
