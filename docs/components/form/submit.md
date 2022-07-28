> 防重提交

:::demo

```vue
<template>
	<qv-form v-model="config.form" ref="qvFormRef" :option="option" @submit="submit"> </qv-form>
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
	form: {}
})
const option: Ref<QvOption> = ref({
	column: [{ label: '姓名', prop: 'name' }]
} as QvOption)

const submit = (form: any, done: () => void) => {
	const { ElMessage } = ElementPlus.value
	ElMessage.success('2秒后关闭')
	setTimeout(() => {
		done()
	}, 2000)
}
</script>
```

:::
