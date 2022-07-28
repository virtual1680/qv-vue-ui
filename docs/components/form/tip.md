> 辅助提示语

:::demo 通过 tip、labelTip 设置提示语

```vue
<template>
	<qv-form v-model="config.form" :option="config.option"></qv-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

let config = reactive({
	form: {},
	option: {
		column: [{ label: '姓名', prop: 'name', tip: '我是姓名', labelTip: '我是label' }]
	} as QvOption
})
</script>
```

:::
