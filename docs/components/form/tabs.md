> 选项卡展示

:::demo

```vue
<template>
	<div>
		<el-button @click="tabs = !tabs">转化</el-button><br /><br />
		<qv-form v-model="config.form" @tab-click="handleTabClick" ref="qvFormRef" :option="option" @submit="submit">
			<template #group1-header>
				<span>自定义表头</span>
			</template>
		</qv-form>
	</div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
// import type { QvOption } from 'qv-vue/types/qvue-ui'
// import type { FormInstance } from 'qv-vue'
// import type { Ref } from 'vue'
// import { ElMessage } from 'element-plus'

const qvFormRef: Ref<FormInstance | undefined> = ref()

const ElementPlus = ref()
onMounted(() => {
	import('element-plus').then(module => {
		ElementPlus.value = module
	})
})
let config = reactive({
	form: {
		text: '文本',
		text1: '文本1',
		text2: '文本2',
		text3: '文本3'
	}
})
const tabs = ref(true)
const option: Ref<QvOption> = ref({
	tabs: tabs, //是否开启选项卡
	tabsActive: '2', //默认选中分组2->这里的2是算option中的column下标，分组2 刚好是第三个所以下标为 2
	column: [{ label: '内容1', prop: 'text1' }],
	group: [
		{
			icon: 'Search',
			label: '分组1',
			prop: 'group1',
			column: [{ label: '内容1', prop: 'text1' }]
		},
		{
			icon: 'Info',
			label: '分组2',
			prop: 'group2',
			column: [
				{ label: '选项卡2', prop: 'text2' },
				{ label: '选项卡3', prop: 'text3' }
			]
		}
	]
} as QvOption)

const submit = (form: any, done: () => void) => {
	const { ElMessage } = ElementPlus.value
	console.log('过滤数据--', form)
	done()
	ElMessage.success('当前数据' + JSON.stringify(config.form))
}
const handleTabClick = (tabs: any) => {
	const { ElMessage } = ElementPlus.value
	ElMessage.success('序号为:' + tabs.index)
}
</script>
```

:::
