> 分组展示

:::demo

```vue
<template>
	<div>
		<qv-form v-model="config.form" ref="qvFormRef" :option="option" @submit="submit">
			<!-- 自定义分组头部 -->
			<template #group1-header="{ column }">
				<el-icon>
					<component :is="column.icon" />
				</el-icon>
				<el-tag>{{ column.label }}</el-tag>
			</template>
			<!-- 自定义选项卡3输入框 -->
			<template #text3="{}"> <el-input placeholder="自定义" v-model="config.form.text3"></el-input> </template
		></qv-form>
	</div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
// import type { FormInstance } from 'qv-vue'
// import type { QvOption } from 'qv-vue/types/qvue-ui'
// import type { Ref } from 'vue'
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
const option: Ref<QvOption> = ref({
	column: [{ label: '内容', prop: 'text' }],
	group: [
		{
			icon: 'Pouring',
			label: '分组1',
			collapse: true, //是否展开
			prop: 'group1',
			column: [{ label: '内容1', prop: 'text1' }]
		},
		{
			icon: 'Info',
			label: '分组2',
			arrow: false, //是否禁用展开关闭
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
</script>
```

:::
