> 数据验证

:::demo 配置验证字段的 rules 的数据对象即可，具体参考 element 中 form 表单校验的配置规则官方规则

```vue
<template>
	<qv-form v-model="config.form" ref="qvFormRef" :option="option" @submit="submit" @error="error"> </qv-form>
</template>

<script lang="ts" setup>
import { reactive, ref, computed, onMounted } from 'vue'
// import type { FormInstance } from 'qv-vue'
// import type { Ref } from 'vue'
// import { ElMessage } from 'element-plus'

const ElementPlus = ref()
onMounted(() => {
	import('element-plus').then(module => {
		ElementPlus.value = module
	})
})

const qvFormRef: Ref<FormInstance | undefined> = ref()
const dic = [
	{
		value: 'zhinan',
		label: '指南',
		children: [
			{
				value: 'shejiyuanze',
				label: '设计原则',
				children: [
					{
						value: 'yizhi',
						label: '一致'
					},
					{
						value: 'fankui',
						label: '反馈'
					}
				]
			}
		]
	}
]
let config = reactive({
	form: {
		name: '张三',
		password: ''
	}
})
const validatePass = (_: unknown, value: string, callback: (error?: Error) => void) => {
	if (value === '') {
		callback(new Error('请输入密码'))
	} else {
		callback()
	}
}
const validatePass2 = (_: unknown, value: string, callback: (error?: Error) => void) => {
	if (value === '') {
		callback(new Error('请再次输入密码'))
	} else if (value !== config.form.password) {
		callback(new Error('两次输入密码不一致!'))
	} else {
		callback()
	}
}
const option = computed(() => {
	return {
		column: [
			{
				label: '姓名',
				prop: 'name',
				rules: [{ required: true, message: '请输入姓名', trigger: 'blur' }]
			},
			{
				label: '性别',
				prop: 'sex',
				rules: [{ required: true, message: '请输入性别', trigger: 'blur' }]
			},
			{
				label: '多选',
				prop: 'cascader',
				type: 'cascader',
				dicData: dic,
				rules: [{ required: true, type: 'array', message: '请选择多选', trigger: 'blur' }]
			},
			{
				label: '密码',
				prop: 'password',
				type: 'password',
				rules: [{ validator: validatePass, trigger: 'blur' }]
			},
			{
				label: '确认密码',
				prop: 'oldpassword',
				type: 'password',
				rules: [{ validator: validatePass2, trigger: 'blur' }]
			}
		]
	}
})
const submit = (form: any, done: () => void) => {
	const { ElMessage } = ElementPlus.value
	ElMessage.success(JSON.stringify(form))
	done()
}
const error = (err: any) => {
	const { ElMessage } = ElementPlus.value
	ElMessage.success('请查看控制台')
	console.log(err)
}
</script>
```

:::
