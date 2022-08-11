<template>
	<div>
		<div class="wel__header">分页</div>
		<p>
			页码:{{ config.page.currentPage }}
			<el-button size="small" @click="config.page.currentPage = config.page.currentPage + 1">页码+1</el-button>
		</p>
		<p>
			条数:{{ config.page.pageSize }}
			<el-button size="small" @click="config.page.pageSize = config.page.pageSize + 10">条数+10</el-button>
		</p>
		<p>
			总数:{{ config.page.total }}
			<el-button size="small" @click="config.page.total = config.page.total + 10">总页数+10</el-button>
		</p>
		<el-button size="small" @click="config.page.layout = 'sizes,pager'">简单模式</el-button>
		<el-button size="small" @click="config.page.layout = 'total, sizes, prev, pager, next, jumper'">复杂模式</el-button>
		<qv-crud
			:data="config.data"
			:option="option"
			:table-loading="config.showLoading"
			@row-update="rowUpdate"
			@search-change="searchChange"
			:page="config.page">
		</qv-crud>
	</div>
</template>

<script lang="ts" setup>
import { computed, reactive } from 'vue'

let config = reactive({
	page: {
		layout: 'total, sizes, prev, pager, next, jumper',
		background: false, //无背景色的分页 default value true
		total: 100,
		currentPage: 1,
		pageSize: 10,
		pagerCount: 5 //设置最大页码按钮数 default value 6
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
		title: '表格的标题',
		titleSize: 'h3',
		titleStyle: {
			color: 'red'
		},
		card: config.showCard,
		border: true,
		stripe: config.showStripe,
		showHeader: config.showHeader,
		index: true,
		size: 'default',
		dateBtn: true,
		calcHeight: 160,
		selection: true,
		page: config.showPage,
		align: 'center',
		menuAlign: 'center',
		menuType: config.menuType,
		menuBtnTitle: '自定义名称',
		height: 'auto',
		column: [
			{
				label: '姓名',
				type: 'input',
				prop: 'name',
				search: true
			},
			{
				search: true,
				label: '性别',
				prop: 'sex',
				type: 'select',
				dicData: [
					{ label: '男', value: 1 },
					{ label: '女', value: 2 }
				]
			}
		]
	}
})

const searchChange = (form: Record<string, unknown>, done: () => void) => {
	console.log('参数出来了', '-=-=-=', form)
	done()
}
const rowUpdate = (row: any, index: number, done: () => void, loading: () => void) => {
	// done();
	loading()
	console.log(row, index)
	row.name = '9090909'
	done()
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
