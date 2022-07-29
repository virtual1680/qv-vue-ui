> 表头设置

:::demo

```vue
<template>
	<div>
		<qv-crud :data="config.data" :option="option" :table-loading="config.showLoading">
			<!-- 自定义表头 -->
			<template #name-header="{ column }">
				<el-tag>自定义{{ (column || {}).label }}-{{ (column || {}).prop }}</el-tag>
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
import { reactive, computed, ref, onMounted, nextTick } from 'vue'

const ElementPlus = ref()
onMounted(() => {
	import('element-plus').then(module => {
		ElementPlus.value = module
	})
})

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
		expandLevel: 3,
		searchMenuSpan: 6,
		height: 300,
		column: [
			{
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
</script>
```

:::
