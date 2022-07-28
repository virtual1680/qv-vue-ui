> 标题字段宽度

::: demo widthLabel 为标题的宽度，默认为 110，可以配置到 option 下作用于全部,也可以单独配置每一项

```vue
<template>
	<qv-form v-model="config.form" :option="config.option"></qv-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

let config = reactive({
	form: {
		name: '我是50的宽度',
		sex: '我的宽度是150'
	},
	option: {
		// 所有字段生效
		labelWidth: 150,
		column: [
			{
				// 单个字段生效 优先级高于所有字段
				labelWidth: 50,
				label: '姓名',
				prop: 'name'
			},
			{ label: '性别', prop: 'sex' }
		]
	}
})
</script>
```

:::
