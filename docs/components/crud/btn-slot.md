> 按钮自定义

:::demo

```vue
<template>
	<div>
		<qv-crud ref="avueRef" :data="config.data" :option="option">
			<template slot-scope="scope" #menu-left="{ size }">
				<el-button type="danger" icon="Plus" :size="size" @click="avueRef.rowAdd()">新增</el-button>
			</template>
			<template slot-scope="{ row, index }" #menu="{ size, row, index }">
				<el-button type="success" icon="View" :size="size" @click="avueRef.rowView(row, index)">查看</el-button>
				<el-button type="danger" icon="Edit" :size="size" @click="avueRef.rowEdit(row, index)">编辑</el-button>
				<el-button type="success" icon="Delete" :size="size" @click="avueRef.rowDel(row, index)">删除</el-button>
			</template>
			<template slot-scope="{ row, index, type }" #menu-form="{ type, size }">
				<el-button type="primary" icon="Check" :size="size" v-if="type == 'add'" @click="avueRef.rowSave()">自定义新增</el-button>
				<el-button type="primary" icon="Check" :size="size" v-if="type == 'edit'" @click="avueRef.rowUpdate()">自定义修改</el-button>
				<el-button type="primary" icon="Check" :size="size" @click="avueRef.closeDialog()">取消</el-button>
			</template>
		</qv-crud>
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
		{ name: '张三', age: 12, address: '码云的地址' },
		{ name: '李四', age: 13, address: '码云的地址' }
	]
})
const option = computed(() => {
	return {
		height: 200,
		addBtn: false,
		delBtn: false,
		editBtn: false,
		viewBtn: false,
		copyBtn: true,
		saveBtn: false,
		updateBtn: false,
		cancelBtn: false,
		menuWidth: 300,
		column: [
			{ label: '姓名', prop: 'name' },
			{ label: '年龄', prop: 'age' },
			{ label: '地址', span: 24, prop: 'address', type: 'textarea' }
		]
	}
})
</script>
```

:::

<style>
table th {
	text-align: left;
}
</style>
