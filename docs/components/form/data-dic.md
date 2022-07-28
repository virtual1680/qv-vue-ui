> 数据字典

::: tip

```
//使用网络请求字典需要引入 axios
import { createApp } from 'vue'
import axios from 'axios'
const app = createApp({})
app.use(QvVue,{axios})

//具体demo https://github.com/virtual1680/q-admin
```

:::

:::demo

```vue
<template>
	<div>
		<el-button @click="updateOption">切换类型</el-button>
		<el-button @click="updateUrlDic">切换字典数据</el-button>
		<qv-form v-model="config.form" ref="qvFormRef" :option="option" @submit="submit" @error="error"> </qv-form>
	</div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, nextTick } from 'vue' //, nextTick
// import { findObject } from 'qv-vue';
// import type { QvOption } from 'qv-vue/es/types/qvue-ui'
// import type { FormInstance } from 'qv-vue'
// import type { Ref } from 'vue'
// import { ElMessage } from 'element-plus'

const ElementPlus = ref()
const QvVue = ref()
onMounted(() => {
	import('element-plus').then(module => {
		ElementPlus.value = module
	})
	import('@qv-vue').then(module => {
		QvVue.value = module
	})
})

const qvFormRef: Ref<FormInstance | undefined> = ref()

let config = reactive({
	form: {
		name: '张三',
		province: '110000',
		city1: '110100',
		city2: '110100',
		area: '110101'
	}
})
let baseUrl = 'https://cli.avuejs.com/api/area'
const option: Ref<QvOption> = ref({
	column: [
		{
			label: '权限',
			prop: 'grade',
			type: 'select',
			// * 字段配置 配置props对应的label和value即可
			props: { label: 'name', value: 'code' },
			dicData: [
				{ name: '有权限', code: 1 },
				{ name: '无权限', code: 0 },
				{ name: '禁止项', code: -1, disabled: true } //设置disabled 禁止选择
			]
		},
		{
			label: 'get请求',
			prop: 'province1',
			type: 'select',
			props: {
				label: 'name',
				value: 'code'
			},
			dicUrl: `${baseUrl}/getProvince?time=123`,
			//格式化数据
			dicFormatter: (data: any) => {
				data.forEach((ele: any) => {
					ele.name = ele.name + '字典格式化'
				})
				data.unshift({ name: '追加字典', code: -1 })
				return data
			}
		},
		{
			label: '省份',
			prop: 'province',
			type: 'select',
			cascader: ['city1', 'city2'],
			cascaderIndex: 1,
			props: {
				label: 'name',
				value: 'code'
			},
			dicUrl: `${baseUrl}/getProvince?time=456`
		},
		{
			width: 120,
			label: '城市1',
			prop: 'city1',
			type: 'select',
			cascader: ['area'],
			cascaderIndex: 1,
			cell: true,
			props: { label: 'name', value: 'code' },
			dicUrl: `${baseUrl}/getCity/{{key}}`, // 注意由于没有moke数据这里会报错，
			rules: [{ required: true, message: '请选择城市1', trigger: 'blur' }]
		},
		{
			width: 120,
			label: '城市2',
			prop: 'city2',
			type: 'select',
			cascaderIndex: 2,
			cell: true,
			props: { label: 'name', value: 'code' },
			dicUrl: `${baseUrl}/getCity/{{key}}`,
			rules: [{ required: true, message: '请选择城市2', trigger: 'blur' }]
		},
		{
			width: 120,
			label: '地区',
			prop: 'area',
			cell: true,
			props: { label: 'name', value: 'code' },
			type: 'select',
			dicUrl: `${baseUrl}/getArea/{{key}}?province={{province}}`,
			rules: [{ required: true, message: '请选择地区', trigger: 'blur' }]
		},
		{
			label: '字典',
			prop: 'checkbox',
			span: 24,
			type: 'checkbox',
			dicUrl: `${baseUrl}/getProvince?time=789`,
			props: {
				label: 'name',
				value: 'code'
			},
			dicData: [
				{ name: '单选字典1', code: 1 },
				{ name: '单选字典0', code: 2 }
			]
		}
	]
} as QvOption)
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

const updateOption = () => {
	const { findObject } = QvVue.value
	nextTick(() => {
		let column = findObject(option.value.column, 'checkbox')
		column.type = 'radio'
		column.dicData = [
			{
				label: '下拉框字典1',
				value: 1
			},
			{
				label: '下拉框字典0',
				value: 2
			}
		]
	})
}
const updateUrlDic = () => {
	const { ElMessage } = ElementPlus.value
	ElMessage.success('先设置本地字典1s后请求url')
	qvFormRef.value?.updateDic('checkbox', [
		{
			name: '字典1',
			code: 1
		},
		{
			name: '字典0',
			code: 2
		}
	])
	setTimeout(() => {
		qvFormRef.value?.updateDic('checkbox')
	}, 1000)
}
</script>
```

:::
