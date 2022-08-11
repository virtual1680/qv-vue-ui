<template>
	<div>
		<div class="wel__header">搜索</div>
		<p>{{ config.search }}</p>
		<qv-crud
			:data="config.data"
			:option="option"
			v-model="form"
			:before-open="beforeOpen"
			:table-loading="config.showLoading"
			@search-reset="resetChange"
			@search-change="searchChange"
			@date-change="dateChange"
			:search="config.search">
			<!-- <template #search-menu="{ row, size }">
				<el-button :size="size.value" @click="searchSubmit(row)">自定义提交</el-button>
			</template> -->
			<template #search="{ row, size }">
				<el-tag>标题{{ size.value }}</el-tag>
				<el-input placeholder="自定义输入框" :size="size.value" style="width: 200px" v-model="config.search.name"></el-input>
			</template>
			<template #age-search="{ disabled, size }">
				<el-slider :disabled="disabled" :size="size.value" v-model="config.search.age"></el-slider>
			</template>
		</qv-crud>
	</div>
</template>

<script lang="ts" setup>
// TODO 多级联动 and 单独日期搜索 and 单行多行展开
import { computed, reactive, onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
const form = ref({})
let config = reactive({
	search: {
		name: 'small',
		sex: [1]
	},
	data: [
		{ name: '张三', sex: '男' },
		{ name: '李四', sex: '女' },
		{ name: '王五', sex: '女' },
		{ name: '赵六', sex: '男' }
	],
	menuType: 'text',
	showLoading: false,
	showCard: false,
	showBorder: true,
	showStripe: false,
	showHeader: true,
	showIndex: true,
	showCheckbox: false,
	showPage: true,
	sizeValue: 'small'
})
const option = computed(() => {
	return {
		height: 500,
		border: true,
		searchIndex: 3,
		searchIcon: true,
		searchMenuSpan: 5,
		dateBtn: true, //是否显示单独日期搜索
		searchFilterDic: false, // 是否过滤字典
		searchFilterNull: false, //是否过滤空数组
		searchBtnText: '查询', // 搜索按钮 文案
		searchBtnIcon: 'Search', // 搜索按钮 icon
		emptyBtnText: '重置', // 清空按钮 文案
		emptyBtnIcon: 'Close', // 清空按钮 icon
		searchLabelWidth: 160, // 可以全局设置
		searchShowBtn: true, // 是否显示 （展开/关闭）搜索按钮
		column: [
			{
				// searchLabelWidth: 150, // 局部设置
				label: '我是超级长姓名',
				type: 'input',
				prop: 'name',
				// searchValue: '默认值姓名',
				search: true, // * 添加search为true 即可
				searchTip: '我是一个左边提示语',
				searchTipPlacement: 'left',
				// TODO 搜索表单验证问题
				searchRules: [
					{
						required: true,
						message: '请输入姓名',
						trigger: 'blur'
					}
				],
				rules: [
					{
						required: true,
						message: '请输入姓名',
						trigger: 'blur'
					}
				]
			},
			{
				// searchLabelWidth: 30,
				label: '搜索字段label的width',
				type: 'input',
				prop: 'age',
				searchOrder: 1, // 搜索字段排序
				search: true // * 添加search为true 即可
			},
			{
				search: true,
				label: '性别',
				prop: 'sex',
				type: 'select',
				searchType: 'checkbox', // 定义搜索表单 sex 为checkbox
				dicData: [
					{ label: '男', value: 1 },
					{ label: '女', value: 2 }
				]
			},
			{
				label: '日期',
				prop: 'date1',
				type: 'datetime',
				search: true
			},
			{
				label: '日期',
				prop: 'date',
				type: 'datetime',
				searchSpan: 12, //searchSpan搜索框的宽度
				searchRange: true, //searchRange配置后可以开启范围搜索
				search: true
			}
		]
	}
})

const searchSubmit = (row: any) => {
	console.log(row)
}
/**
 * 搜索方法
 */
const searchChange = (form: Record<string, unknown>, done: () => void) => {
	ElMessage.success(JSON.stringify(form))
	done()
}
// 清空回调
const resetChange = () => {
	ElMessage.success('清空回调')
}
const beforeOpen = (done: () => void, type: string) => {
	console.log(form.value, type)

	done()
}
const dateChange = (date: any) => {
	ElMessage.success(JSON.stringify(date))
}
onMounted(() => {
	option.value.border = false
})
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
