> 操作栏配置

:::demo

```vue
<template>
	<div>
		<qv-crud
			ref="avueRef"
			:data="config.data"
			:option="option"
			@refresh-change="refreshChange"
			@row-save="rowSave"
			@row-update="rowUpdate"
			@row-del="rowDel">
			<template #menu>
				<el-button link>自定义</el-button>
			</template>
		</qv-crud>
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
		column: [
			{ label: '姓名', prop: 'name' },
			{ label: '年龄', prop: 'age' },
			{ label: '地址', span: 24, prop: 'address', type: 'textarea' }
		]
	}
})
const refreshChange = () => {
	const { ElMessage } = ElementPlus.value
	ElMessage.success('刷新回调')
}
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
const rowDel = (form, index, done) => {
	const { ElMessage, ElMessageBox } = ElementPlus.value
	ElMessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning'
	})
		.then(() => {
			done(form)
			ElMessage({ type: 'success', message: '删除成功!' })
		})
		.catch(() => {})
}
const rowUpdate = (form, index, done, loading) => {
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

> 属性

| 属性名称          | 类型              | 说明及注意事项   |
| ----------------- | ----------------- | ---------------- |
| `menu`            | `boolean`         | 是否显示操作栏   |
| `menuWidth`       | `number` `string` | 操作栏宽度       |
| `viewBtn`         | `boolean`         | 是否显示详情按钮 |
| `addBtn`          | `boolean`         | 是否显示新增按钮 |
| `editBtn`         | `boolean`         | 是否显示编辑按钮 |
| `copyBtn`         | `boolean`         | 是否显示复制按钮 |
| `delBtn`          | `boolean`         | 是否显示删除按钮 |
| `menuAlign`       | `string`          | 操作栏布局       |
| `menuHeaderAlign` | `string`          | 操作栏头部布局   |

> 方法

| 方法名称         | 回调参数                  | 说明及注意事项   |
| ---------------- | ------------------------- | ---------------- |
| `row-save`       | `form,done,loading`       | 点击新增保存回调 |
| `row-update`     | `form,index,done,loading` | 点击编辑回调     |
| `row-del`        | `form,index`              | 点击删除回调     |
| `refresh-change` | `无`                      | 点击刷新回调     |

<style>
table th {
	text-align: left;
}
</style>
