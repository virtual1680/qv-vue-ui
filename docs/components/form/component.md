> 引入三方组件

:::demo 通过设置 component 来加载第三方组件，event 添加组件事件，params 添加组件所需参数

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
			{
				label: '我是自定义组件',
				labelWidth: 120,
				prop: 'divider',
				component: 'elTree', //ele树
				span: 24,
				event: {
					//组件事件
					'node-click': node => {
						const { ElMessage } = ElementPlus.value
						ElMessage.success('点到' + node.label + '了')
					}
				},
				params: {
					// 组件需要绑定的数据
					data: [
						{
							label: 'Level one 1',
							children: [
								{
									label: 'Level two 1-1',
									children: [{ label: 'Level three 1-1-1' }]
								}
							]
						},
						{
							label: 'Level one 2',
							children: [
								{
									label: 'Level two 2-1',
									children: [{ label: 'Level three 2-1-1' }]
								},
								{
									label: 'Level two 2-2',
									children: [{ label: 'Level three 2-2-1' }]
								}
							]
						}
					]
				}
			},
			{
				label: '',
				labelWidth: 40,
				prop: 'divider',
				component: 'elDivider', //ele分割线
				span: 24,
				event: {
					click: () => {
						const { ElMessage } = ElementPlus.value
						ElMessage.success('点击方法')
					}
				},
				params: {
					html: '<h4 style="color:red">自定义html标签,点我触发方法</h4>',
					contentPosition: 'left'
				}
			}
		]
	}
})
</script>
```

:::
