> 按钮文案 | 图标

:::demo

```vue
<template>
	<div>
		<qv-crud ref="avueRef" :data="config.data" :option="option"></qv-crud>
	</div>
</template>

<script lang="ts" setup>
import { reactive, computed, ref, onMounted, nextTick } from 'vue'

const ElementPlus = ref()
onMounted(() => {
	import('element-plus').then(module => {
		ElementPlus.value = module
	})
})

const avueRef: Ref<CrudInstance | undefined> = ref()
let config = reactive({
	data: [
		{ name: '张三', age: 12, address: '码云的地址' },
		{ name: '李四', age: 13, address: '码云的地址' }
	]
})
const option = computed(() => {
	return {
		height: 200,
		viewBtn: true,
		editBtn: false,
		delBtn: false,
		copyBtn: true,
		menuTitle: '其它',
		addTitle: '保存标题',
		editTitle: '编辑标题',
		viewTitle: '查看标题',
		searchBtnText: '搜索文案',
		emptyBtnText: '清空文案',
		addBtnText: '新增文案',
		addBtnIcon: 'User',
		delBtnText: '删除文案',
		// delBtnIcon: 'Delete',
		// editBtnIcon: 'Edit',
		editBtnText: '编辑文案',
		viewBtnText: '查看文案',
		updateBtnText: '修改文案',
		saveBtnText: '保存文案',
		cancelBtnText: '取消文案',
		searchMenuSpan: 8,
		column: [
			{ label: '姓名', prop: 'name', search: true },
			{ label: '年龄', prop: 'age' },
			{ label: '地址', span: 24, prop: 'address', type: 'textarea' }
		]
	}
})
</script>
```

:::
