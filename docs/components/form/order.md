> 字段排序 以下性别字段是通过设置 order 属性来占据第一

:::demo 通过设置 order 来对 form-item 进行排序

```vue
<template>
	<qv-form ref="form" v-model="config.obj" :option="option"> </qv-form>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
// import { QvOption, QvValue } from '@qv-vue/es/types/qvue-ui'

const DIC1 = {
	VAILD: [
		{ label: '真', value: 'true' },
		{ label: '假', value: 'false' }
	],
	SEX: [
		{ label: '男', value: 0 },
		{ label: '女', value: 1 }
	]
}
let config = reactive({
	obj: {}
})
const option = computed<QvOption>((): QvOption => {
	return {
		column: [
			{ label: '姓名', prop: 'name' },
			{ label: '密码', prop: 'password', type: 'password' },
			{ label: '类型', prop: 'type', type: 'select', dicData: DIC1.VAILD },
			{ label: '权限', prop: 'grade', type: 'checkbox', dicData: DIC1.VAILD },
			{
				label: '性别',
				prop: 'sex',
				type: 'radio',
				dicData: DIC1.SEX,
				order: 1 // 字段排序
			},
			{ label: '数字', prop: 'number', type: 'number', precision: 2, minRows: 0, maxRows: 3 }
		]
	}
})
</script>
```

:::
