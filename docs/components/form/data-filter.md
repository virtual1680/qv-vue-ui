> 数据过滤

:::demo

```vue
<template>
	<div>
		<el-button size="small" type="danger" @click="filterDic">过滤数据字典</el-button>
		<el-button size="small" type="success" @click="filterNull">过滤空数据</el-button>
		<el-button size="small" type="primary" @click="filter">不过滤</el-button>
		<qv-form v-model="config.form" ref="qvFormRef" :option="option" @submit="submit"> </qv-form>
	</div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
// import type { QvOption } from 'qv-vue/es/types/qvue-ui';
// import type { FormInstance } from 'qv-vue';
// import type { Ref } from 'vue';

const ElementPlus = ref()
onMounted(() => {
	import('element-plus').then(module => {
		ElementPlus.value = module
	})
})

const qvFormRef: Ref<FormInstance | undefined> = ref()

let config = reactive({
	reload: Math.random(),
	form: {
		cascader: [0, 1],
		tree: 0
	}
})
const option: Ref<QvOption> = ref({
	column: [
		{ label: '姓名', prop: 'name' },
		{
			label: '级别',
			prop: 'cascader',
			type: 'cascader',
			dicData: [
				{
					label: '一级',
					value: 0,
					children: [
						{ label: '一级1', value: 1 },
						{ label: '一级2', value: 2 }
					]
				}
			]
		},
		{
			label: '树型',
			prop: 'tree',
			type: 'tree',
			dicData: [
				{
					label: '一级',
					value: 0,
					children: [
						{ label: '一级1', value: 1 },
						{ label: '一级2', value: 2 }
					]
				}
			]
		}
	]
} as QvOption)
const refresh = () => {
	config.reload = Math.random()
}
const filter = () => {
	option.value.filterDic = false
	option.value.filterNull = false
	refresh()
}
const filterDic = () => {
	option.value.filterDic = true
	refresh()
}
const filterNull = () => {
	option.value.filterNull = true
	refresh()
}
const submit = (form: any, done: () => void) => {
	const { ElMessage } = ElementPlus.value
	console.log('过滤数据--', form)
	done()
	ElMessage.success('当前数据' + JSON.stringify(config.form))
}
</script>
```

:::
