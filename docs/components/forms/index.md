## 基本用法

> 文档案例

:::demo

```vue
<template>
	<div>
		<div>设置gutter属性调节栏之间的距离</div>
		<el-slider v-model="config.gutter"></el-slider>
		<div>
			详情展示:
			<el-button @click="config.detail = !config.detail" style="margin-left: 20px">{{ !config.detail ? '展示详情' : '展示表单' }}</el-button>
		</div>
		<qv-form ref="form" v-model="config.obj" :option="option" @reset-change="emptytChange" @submit="submit">
			<template #menu-form>
				<el-button @click="tip">自定义按钮</el-button>
			</template>
		</qv-form>
	</div>
</template>

<script lang="ts" setup>
import { computed, reactive } from 'vue'
// import { ElMessage } from 'element-plus'
// import { QvOption, QvValue } from 'qv-vue/es/types/qvue-ui'
const DIC = {
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
	showLoading: false,
	obj: {},
	sizeValue: 'default' as '' | 'default' | 'small' | 'large',
	gutter: 20,
	detail: false
})
const option = computed<QvOption>((): QvOption => {
	return {
		size: config.sizeValue,
		submitText: '完成',
		printBtn: false,
		gutter: config.gutter,
		detail: config.detail,
		column: [
			{
				label: '用户名',
				prop: 'username',
				tip: '这是信息提示',
				span: 8, //格栅栏数
				suffixIcon: 'Plus',
				prefixIcon: 'Search',
				maxlength: 3,
				minlength: 2,
				rules: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
				click: ({ value, column }: { value: QvValue; column: unknown }) => {
					console.log(value, column)
					ElMessage.success('click')
				}
			},
			{ label: '姓名', prop: 'name', disabled: true, span: 8 },
			{ label: '密码', prop: 'password', type: 'password', span: 8 },
			{ label: '类型', prop: 'type', type: 'select', dicData: DIC.VAILD, span: 8 },
			{
				label: '权限',
				prop: 'grade',
				span: 8,
				type: 'checkbox',
				dicData: DIC.VAILD
			},
			{
				label: '开关',
				prop: 'switch',
				span: 8,
				type: 'switch',
				dicData: DIC.SEX,
				hide: true,
				row: true
			},
			{
				label: '性别',
				prop: 'sex',
				type: 'radio',
				dicData: DIC.SEX,
				row: true,
				span: 24,
				order: 1 // 字段排序
			},
			{
				label: '数字',
				prop: 'number',
				type: 'number',
				precision: 2,
				minRows: 0,
				maxRows: 3
			},
			{
				label: '网站',
				span: 12,
				prop: 'url',
				prepend: 'http://',
				append: 'com',
				row: true,
				value: '90909090'
			},
			{
				label: '日期',
				prop: 'date',
				type: 'date',
				span: 8,
				format: 'YYYY-MM-DD',
				valueFormat: 'YYYY-MM-DD'
			},
			{
				label: '日期时间',
				prop: 'datetime',
				type: 'datetime',
				span: 8,
				format: 'YYYY-MM-DD hh:mm:ss',
				valueFormat: 'YYYY-MM-DD hh:mm:ss'
			},
			{
				label: '时间',
				prop: 'time',
				type: 'time',
				span: 8,
				format: 'HH:mm:ss',
				valueFormat: 'HH:mm:ss'
			},
			{
				label: '地址',
				span: 24,
				prop: 'address'
			},
			{
				label: '建议',
				span: 24,
				type: 'upload',
				action: 'api/upload',
				listType: 'picture-img',
				prop: 'adit'
			}
		]
	}
})
const emptytChange = () => {
	ElMessage.success('清空方法回调')
}
const submit = (form: any, done: () => void) => {
	console.log('过滤数据--', form)
	console.log('正常数据--', config.obj)
	done()
	// ElMessage.success('当前数据' + JSON.stringify(config.obj));
}
const tip = () => {
	ElMessage.success('自定义按钮')
}
</script>

<style scoped="scoped" lang="scss">
.wel {
	&__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 25px 40px;
		background-color: #ffffff;
		border-bottom: 1px solid #e8e8e8;
	}
	&__info {
		display: flex;
		align-items: center;
		&-img {
			display: block;
			width: 72px;
			height: 72px;
			border-radius: 72px;
			img {
				display: block;
				width: 100%;
				height: 100%;
			}
		}
		&-content {
			position: relative;
			margin-left: 24px;
			line-height: 22px;
			color: rgb(0 0 0 / 45%);
		}
		&-title {
			margin-bottom: 12px;
			font-size: 20px;
			font-weight: 500;
			line-height: 28px;
			color: rgb(0 0 0 / 85%);
		}
		&-subtitle {
			position: relative;
			font-size: 14px;
			line-height: 22px;
			color: rgb(0 0 0 / 45%);
		}
	}
	&__extra {
		&-item {
			position: relative;
			display: inline-block;
			padding: 0 32px;
			&:last-child {
				&::after {
					display: none;
				}
			}
			&::after {
				position: absolute;
				top: 30px;
				right: 0;
				width: 1px;
				height: 40px;
				content: '';
				background-color: #e8e8e8;
			}
		}
		&-title {
			margin-bottom: 4px;
			font-size: 14px;
			line-height: 22px;
			color: rgb(0 0 0 / 45%);
		}
		&-subtitle {
			margin: 0;
			font-size: 30px;
			line-height: 38px;
			color: rgb(0 0 0 / 85%);
			span {
				font-size: 20px;
				color: rgb(0 0 0 / 45%);
			}
		}
	}
}
</style>
```

:::

## 标题字段宽度

> widthLabel 为标题的宽度，默认为 110，可以配置到 option 下作用于全部,也可以单独配置每一项

::: demo

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
			{
				label: '性别',
				prop: 'sex'
			}
		]
	}
})
</script>
```

:::

## 隐藏字段

> 对应的字段配置 display 为 false 即可隐藏

:::demo

```vue
<template>
	<qv-form v-model="config.form" :option="config.option"></qv-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

let config = reactive({
	form: {},
	option: {
		column: [
			{
				label: '姓名',
				prop: 'name',
				span: 8
			},
			{
				label: '密码',
				prop: 'password',
				type: 'password',
				display: false //对应的字段配置 display 为 false 即可隐藏
			}
		]
	}
})
</script>
```

:::

## 自定义卡槽

> 可以自定义内容、标题、错误提示、按钮、样式

:::demo

```vue
<template>
	<qv-form v-model="config.form" ref="qvFormRef" :option="config.option">
		<!-- 自定义label -->
		<template #text-label>
			<span>姓名22</span>
			<el-tooltip class="item" effect="dark" content="文字提示" placement="top-start">
				<i class="el-icon-warning"></i>
			</el-tooltip>
		</template>
		<!-- 自定义内容 #text 是 column 的 prop 与之相对应 -->
		<template #text="scope">
			<div>
				<el-tag>{{ config.form.text ? config.form.text : '暂时没有内容' }}</el-tag>
				<el-input v-model="config.form.text" placeholder="这里是自定的表单"></el-input>
				{{ scope }}
			</div>
		</template>
		<!-- 自定义错误提示 -->
		<template #text-error="{ error }">
			<p style="color: pink">自定义提示{{ error }}</p>
		</template>
		<!-- 自定义按钮 -->
		<template #menu-form="{}">
			<el-button icon="User" type="primary" @click="handleSubmit">自定义提交</el-button>
			<el-button icon="Delete" @click="handleEmpty">自定义清空</el-button>
		</template>
	</qv-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
// import { ElMessage } from 'element-plus'
// import type { FormInstance } from 'qv-vue'
// import type { Ref } from 'vue'
// import { QvOption } from 'qv-vue/es/types/qvue-ui'
const qvFormRef: Ref<FormInstance | undefined> = ref()
let config = reactive({
	form: {
		text: ''
	},
	option: {
		emptyBtn: false, //隐藏本身的清空按钮
		submitBtn: false, //隐藏本身的提交按钮
		column: [
			{
				label: '姓名',
				prop: 'text',
				rules: [{ required: true, message: '请输入姓名', trigger: 'blur' }]
			},
			{
				label: '性别',
				prop: 'sex',
				labelPosition: 'top',
				span: 6,
				className: 'formClassName' //自定义样式
			}
		]
	} as QvOption
})
const handleEmpty = () => {
	qvFormRef.value?.resetForm()
	config.form.text = ''
}
const handleSubmit = () => {
	//this.$refs.form.submit();
	qvFormRef.value?.validate((vaild, done) => {
		if (vaild) {
			ElMessage.success(JSON.stringify(config.form))
			setTimeout(() => {
				done()
			}, 2000)
		}
	})
}
</script>
<style>
.formClassName {
	padding: 0 0 0 55px !important;
	color: #ffffff;
	background-color: red;
}
</style>
```

:::

## 数据默认值

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

## 数据验证

> 配置验证字段的 rules 的数据对象即可，具体参考 element 中 form 表单校验的配置规则官方规则

:::demo

```vue
<template>
	<qv-form v-model="config.form" ref="qvFormRef" :option="option" @submit="submit" @error="error"> </qv-form>
</template>

<script lang="ts" setup>
import { reactive, ref, computed } from 'vue'
// import type { FormInstance } from 'qv-vue'
// import type { Ref } from 'vue'
// import { ElMessage } from 'element-plus'
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
	ElMessage.success(JSON.stringify(form))
	done()
}
const error = (err: any) => {
	ElMessage.success('请查看控制台')
	console.log(err)
}
</script>
```

:::

## 数据字典

::: tip

```
//使用网络请求字典需要引入 axios
import { createApp } from 'vue'
import axios from 'axios'
const app = createApp({})
app.use(Avue,{axios})

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
import { reactive, ref } from 'vue' //, nextTick
// import { findObject } from 'qv-vue';
// import type { QvOption } from 'qv-vue/es/types/qvue-ui'
// import type { FormInstance } from 'qv-vue'
// import type { Ref } from 'vue'
// import { ElMessage } from 'element-plus'

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
	ElMessage.success(JSON.stringify(form))
	done()
}
const error = (err: any) => {
	ElMessage.success('请查看控制台')
	console.log(err)
}

const updateOption = () => {
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
	// const form = qvFormRef.value;
	ElMessage.success('先设置本地字典1s后请求url')
	form?.updateDic('checkbox', [
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
		form?.updateDic('checkbox')
	}, 1000)
}
</script>
```

:::

## 数据类型

:::demo

```vue

```

:::

## 数据过滤

:::demo

```vue

```

:::

<!-- 防重提交 -->
<!-- 字段排序 -->
<!-- 引入三方组件 -->
<!-- 组件事件 -->
<!-- 布局设置 -->
<!-- 分组展示 -->
<!-- 选项卡展示 -->
<!-- 控制其它字段 -->
