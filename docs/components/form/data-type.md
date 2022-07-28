> 数据类型
> 有些数据是数组形式的，我们传入字符串是无法识别的，解决数据字典和字段类型不匹配问题,配置 dataType 属性(string / number)

:::demo

```vue
<template>
	<qv-form v-model="config.form" ref="qvFormRef" :option="option"> </qv-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
// import type { QvOption } from 'qv-vue/types/qvue-ui'
// import type { FormInstance } from 'qv-vue'
// import type { Ref } from 'vue'
// import { ElMessage } from 'element-plus'

const qvFormRef: Ref<FormInstance | undefined> = ref()

let config = reactive({
	form: {
		cascader: '1,2', //这里实际我们需要的是数组number[1,2],但是我们传的是字符串 这就需要设置 dataType: 'number',内部转换
		province: 120000,
		radio: 1,
		checkbox: '1,2,3', // 同理
		selects: '1,2,3' // 同理
	}
})
let baseUrl = 'https://cli.avuejs.com/api/area'
const option: Ref<QvOption> = ref({
	column: [
		{
			label: '单选',
			prop: 'radio',
			type: 'radio',
			dataType: 'number',
			dicData: [
				{ label: '选项1', value: 1 },
				{ label: '选项2', value: 2 },
				{ label: '选项3', value: 3 }
			]
		},
		{
			label: '多选',
			prop: 'checkbox',
			type: 'checkbox',
			dataType: 'number',
			dicData: [
				{ label: '选项1', value: 1 },
				{ label: '选项2', value: 2 },
				{ label: '选项3', value: 3 }
			]
		},
		{
			label: '多选',
			prop: 'selects',
			type: 'select',
			multiple: true,
			// dataType: 'string',
			dicData: [
				{ label: '选项1', value: '1' },
				{ label: '选项2', value: '2' },
				{ label: '选项3', value: '3' }
			]
		},
		{
			label: '级联',
			prop: 'cascader',
			type: 'cascader',
			dataType: 'number',
			dicData: [
				{
					label: '级别1',
					value: 1,
					children: [{ label: '级别2', value: 2 }]
				}
			],
			rules: [{ required: true, message: '请选择级联', trigger: 'blur' }]
		},
		{
			label: '省份',
			prop: 'province',
			type: 'select',
			dataType: 'number',
			props: {
				label: 'name',
				value: 'code'
			},
			dicUrl: `${baseUrl}/getProvince?time=789`,
			rules: [
				{
					required: true,
					message: '请选择省份',
					trigger: 'blur'
				}
			]
		}
	]
} as QvOption)
</script>
```

:::
