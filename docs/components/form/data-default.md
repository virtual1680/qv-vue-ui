> 数据默认值

:::demo

```vue
<template>
	<qv-form v-model="config.form" ref="qvFormRef" :option="option"> </qv-form>
</template>

<script lang="ts" setup>
import { reactive, ref, computed } from 'vue'
// import type { FormInstance } from 'qv-vue'
// import type { Ref } from 'vue'
const qvFormRef: Ref<FormInstance | undefined> = ref()
let config = reactive({
	form: {
		text: ''
	}
})
const option = computed(() => {
	return {
		column: [
			{
				label: '姓名',
				prop: 'text',
				rules: [{ required: true, message: '请输入姓名', trigger: 'blur' }]
			}
		]
	}
})
config.form.text = '9090909'
</script>
```

:::
