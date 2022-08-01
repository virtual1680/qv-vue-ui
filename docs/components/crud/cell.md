> 行编辑

:::demo

```vue
<template>
	<div>
		<qv-crud ref="avueRef" :data="config.data" :option="option" @row-update="addUpdate" @row-save="rowSave"> </qv-crud>
	</div>
</template>

<script lang="ts" setup>
import { reactive, computed, ref, onMounted, nextTick } from 'vue'
// import type { CrudInstance } from 'qv-vue'
const ElementPlus = ref()
onMounted(() => {
	import('element-plus').then(module => {
		ElementPlus.value = module
	})
})

const avueRef: Ref<CrudInstance | undefined> = ref()
let config = reactive({
	data: [
		{ id: 0, name: '王五', age: 18, sex: 1, $cellEdit: true },
		{ id: 1, name: '李四', age: 18, sex: 0 }
	]
})
const option = computed(() => {
	return {
		height: 200,
		addBtn: false,
		addRowBtn: true,
		cellBtn: true,
		menuWidth: 250,
		column: [
			{
				label: '姓名',
				prop: 'name',
				cell: true,
				rules: [{ required: true, message: '请输入姓名', trigger: 'blur' }]
			},
			{
				label: '性别',
				prop: 'sex',
				type: 'select',
				dicData: [
					{ label: '男', value: 0 },
					{ label: '女', value: 1 }
				],
				cell: true
			},
			{
				label: '年龄',
				prop: 'age',
				rules: [{ required: true, message: '请输入年龄', trigger: 'blur' }],
				cell: true
			}
		]
	}
})
const rowSave = (form, done, loading) => {
	const { ElMessage } = ElementPlus.value
	form.id = new Date().getTime()
	ElMessage.success('模拟网络请求')
	setTimeout(() => {
		ElMessage.success('关闭按钮等待')
		loading()
	}, 1000)
	setTimeout(() => {
		ElMessage.success('新增数据' + JSON.stringify(form))
		done(form)
	}, 2000)
}
const addUpdate = (form, index, done, loading) => {
	const { ElMessage } = ElementPlus.value
	ElMessage.success('模拟网络请求')
	setTimeout(() => {
		ElMessage.success('关闭按钮等待')
		loading()
	}, 1000)
	setTimeout(() => {
		ElMessage.success('编辑数据' + JSON.stringify(form) + '数据序号' + index)
		done(form)
	}, 2000)
}
</script>
```

:::

<style>
table th {
	text-align: left;
}
</style>
