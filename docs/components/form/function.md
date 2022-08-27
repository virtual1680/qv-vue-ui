> 函数用法 后期更新

:::demo

```vue
<template>
	<div class="play-container">
		<el-button @click="open">打开弹窗</el-button>
		<qv-dialog-form :option="option" :data="data" ref="qvDialogFormRef"></qv-dialog-form>
	</div>
</template>
<script setup lang="ts">
// code here
import { getCurrentInstance, ref, nextTick, onMounted } from 'vue'
// import { QvDialogFormInstance } from '@qv-vue/qv-vue'
const qvDialogFormRef: Ref<QvDialogFormInstance | undefined> = ref()
const ElementPlus = ref()
onMounted(() => {
	import('element-plus').then(module => {
		ElementPlus.value = module
	})
})
const data = ref({ username: '我是用户名' })
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
let option = ref({
	size: 'default',
	addTitle: '我是标题',
	submitText: '完成',
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
			rules: [{ required: true, message: '请输入用户名', trigger: 'blur' }]
		},
		{ label: '姓名', prop: 'name', disabled: true, span: 8 },
		{ label: '密码', prop: 'password', type: 'password', span: 8 },
		{ label: '类型', prop: 'type', type: 'select', dicData: DIC.VAILD, span: 8 },
		{ label: '权限', prop: 'grade', span: 8, type: 'checkbox', dicData: DIC.VAILD },
		{ label: '开关', prop: 'switch', span: 8, type: 'switch', dicData: DIC.SEX, hide: true, row: true },
		{ label: '性别', prop: 'sex', type: 'radio', dicData: DIC.SEX, row: true },
		{ label: '数字', prop: 'number', type: 'number', span: 8, precision: 2, minRows: 0, maxRows: 3, row: true },
		{ label: '网站', span: 12, prop: 'url', prepend: 'http://', append: 'com', row: true },
		{ label: '日期', prop: 'date', type: 'date', span: 8, format: 'YYYY-MM-DD', valueFormat: 'YYYY-MM-DD' },
		{ label: '日期时间', prop: 'datetime', type: 'datetime', span: 8, format: 'YYYY-MM-DD hh:mm:ss', valueFormat: 'YYYY-MM-DD hh:mm:ss' },
		{ label: '时间', prop: 'time', type: 'time', span: 8, format: 'HH:mm:ss', valueFormat: 'HH:mm:ss' },
		{ label: '地址', span: 24, prop: 'address' },
		{ label: '建议', span: 24, type: 'upload', listType: 'picture-img', prop: 'adit' },
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
					const { ElMessage } = ElementPlus.value
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
					const { ElMessage } = ElementPlus.value
					ElMessage.success('点击方法')
				}
			},
			params: {
				html: '<h2 style="color:red">自定义html标签,点我触发方法</h2>',
				contentPosition: 'left'
			}
		}
	]
})
const $proxy = getCurrentInstance()?.proxy
const open = () => {
	qvDialogFormRef.value?.show((data: any, close: () => void, done: () => void) => {
		//关闭加载
		done()
		// 关闭弹窗
		close()
		// 表单数据
		console.log(data)
	})
}
</script>
```

:::
