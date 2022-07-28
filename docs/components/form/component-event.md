> 组件事件

:::demo 目前组件有 4 个事件 change,click,focus,blur

```vue
<template>
	<qv-form ref="form" v-model="config.obj" :option="option"> </qv-form>
</template>

<script lang="ts" setup>
import { computed, reactive, onMounted, ref } from 'vue'
// import { QvOption, QvValue } from '@qv-vue/es/types/qvue-ui'
const ElementPlus = ref()
onMounted(() => {
	import('element-plus').then(module => {
		ElementPlus.value = module
	})
})

let config = reactive({
	obj: {}
})
const option = computed<QvOption>((): QvOption => {
	return {
		column: [
			{
				label: '用户名',
				prop: 'username',
				span: 24, //格栅栏数
				suffixIcon: 'Plus',
				prefixIcon: 'Search',
				maxlength: 80,
				minlength: 2,
				rules: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
				click: ({ value, column }: { value: QvValue; column: unknown }) => {
					const { ElMessage } = ElementPlus.value
					console.log(value, column)
					ElMessage.success('click')
				},
				change: ({ value, column }) => {
					const { ElMessage } = ElementPlus.value
					ElMessage.success('change事件查看控制台')
					console.log('值改变', value, column)
				},
				focus: ({ value, column }) => {
					const { ElMessage } = ElementPlus.value
					ElMessage.success('focus事件查看控制台')
					console.log('获取焦点', value, column)
				},
				blur: ({ value, column }) => {
					const { ElMessage } = ElementPlus.value
					ElMessage.success('blur事件查看控制台')
					console.log('失去焦点', value, column)
				},
				enter: ({ value, column }) => {
					const { ElMessage } = ElementPlus.value
					ElMessage.success('enter事件查看控制台')
					console.log('回车事件', value, column)
				}
			}
		]
	}
})
</script>
```

:::
