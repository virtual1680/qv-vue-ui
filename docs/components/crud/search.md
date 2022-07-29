> 搜索

:::demo

```vue
<template>
	<div>
		<qv-crud
			:data="config.data"
			v-model:search="config.search"
			:option="option"
			@search-change="searchChange"
			@search-reset="resetChange"
			@date-change="dateChange">
			<!-- 自定义搜索按钮 -->
			<!-- <template #search-menu="{ row, size }">
				<el-button :size="size.value" @click="searchSubmit(row)">自定义提交</el-button>
			</template> -->
			<!-- 在search表单中添加自定义的组件 -->
			<template #search="{ row, size }">
				<div>
					<el-tag>标题</el-tag>
					<el-input placeholder="自定义输入框" style="width:200px" :size="size.value" v-model="config.search.name"></el-input>
				</div>
			</template>
			<!-- 自定义 sex 搜索组件-->
			<template #sex-search="{ row, size }">
				<el-input placeholder="自定义输入框" :size="size.value" v-model="config.search.sex"></el-input>
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

let config = reactive({
	//搜索的表单对象
	search: {
		name: 'virtual1680' //搜索默认值
	},
	data: [
		{ name: '张三', sex: '男', address: '给付对价阿卡丽' },
		{ name: '李四', sex: '女', address: '发拉进来' }
	]
})

const option = computed(() => {
	return {
		align: 'center',
		menuAlign: 'center',
		height: 300,
		searchIndex: 2, //配置收缩展示的个数,默认为3个
		searchIcon: true, //是否启用功能按钮,
		dateBtn: true, //是否显示单独日期搜索
		searchMenuSpan: 8, //搜索按钮单独成行
		// searchShowBtn: false, //隐藏搜索折叠按钮
		searchBtnText: '查询', //自定义搜索按钮文案
		searchBtnIcon: 'Search', //自定义搜索按钮图标
		emptyBtnText: '重置', //自定义搜索清空按钮文案
		emptyBtnIcon: 'Close', //自定义搜索清空按钮图标
		searchLabelWidth: 80, //searchLabelWidth为标题的宽度，默认为110，可以配置到option下作用于全部,也可以单独配置每一项
		column: [
			{
				searchLabelWidth: 55, //单独配置
				label: '姓名',
				prop: 'name',
				searchTip: '我是一个默认提示语', //设置提示文案
				searchTipPlacement: 'left', //设置提示显示位置
				searchRules: [{ required: true, message: '请输入姓名', trigger: 'blur' }], //验证规则
				search: true //是否参与搜索
			},
			{
				label: '性别',
				prop: 'sex',
				search: true,
				searchOrder: 1 //搜索表单item排序
			},
			{
				label: '地址',
				prop: 'address'
			},
			{
				label: '日期',
				prop: 'date',
				type: 'datetime',
				searchSpan: 12, //searchSpan搜索框的宽度
				searchRange: true, //searchRange配置后可以开启范围搜索
				search: true
			}
		]
	}
})
// search-reset点击清空的执行方法
const resetChange = (item: any) => {
	const { ElMessage } = ElementPlus.value
	ElMessage.success('清空回调')
}
// search-change为点击搜索后执行方法，done方法为关闭等待框
const searchChange = (params: any, done: () => void) => {
	const { ElMessage } = ElementPlus.value
	ElMessage.success('2s后关闭锁定')
	setTimeout(() => {
		done()
		ElMessage.success(JSON.stringify(params))
	}, 2000)
}
const dateChange = (date: any) => {
	const { ElMessage } = ElementPlus.value
	ElMessage.success(JSON.stringify(date))
}
</script>
```

:::
