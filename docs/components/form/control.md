> 控制其它字段

:::demo 通过 control 方法属性来控制其他字段

```vue
<template>
	<qv-form v-model="config.form" ref="qvFormRef" :option="option"> </qv-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
// import type { QvOption } from 'qv-vue/types/qvue-ui'
// import type { FormInstance } from 'qv-vue'
// import type { Ref } from 'vue'
const qvFormRef: Ref<FormInstance | undefined> = ref()

let config = reactive({
	tabs: true,
	form: {
		text: '文本',
		text1: 0,
		text2: '文本2',
		text3: '文本3'
	}
})
const option: Ref<QvOption> = ref({
	column: [
		{
			label: '控制器',
			prop: 'text1',
			type: 'radio',
			dicData: [
				{ label: '显示', value: 0 },
				{ label: '隐藏', value: 1 }
			],
			control: (val: number, form: any) => {
				console.log(form)
				if (val === 0) {
					return {
						text2: { display: true },
						text3: { label: '内容3' }
					}
				} else {
					return {
						text2: { display: false },
						text3: { label: '发现我变了' }
					}
				}
			}
		},
		{ label: '内容2', prop: 'text2', display: true },
		{ label: '内容3', prop: 'text3' }
	]
} as QvOption)
</script>
```

:::
