> 隐藏字段

:::demo 对应的字段配置 display 为 false 即可隐藏

```vue
<template>
	<el-button @click="change">{{ show ? '隐藏' : '显示' }}</el-button>
	<qv-form v-model="config.form" :option="config.option"></qv-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
const show = ref(false)
let config = reactive({
	form: {},
	option: {
		column: [
			{ label: '姓名', prop: 'name', span: 8 },
			{
				label: '密码',
				prop: 'password',
				type: 'password',
				display: show //对应的字段配置 display 为 false 即可隐藏
			}
		]
	}
})
const change = () => {
	show.value = !show.value
}
</script>
```

:::
