import type { PropType } from 'vue'

export interface TablePage {
	total: number // 总页数
	pagerCount: number //超过多少条隐藏
	currentPage: number // 当前页数
	pageSize: number // 每页显示多少条
	pageSizes: number[]
	layout: string
	background: boolean // 背景颜色
}
export interface PageProps {
	page: Partial<TablePage>
}

export default {
	page: {
		type: Object as PropType<PageProps['page']>,
		default: () => {
			return {}
		}
	}
}

// export type TablePage = ExtractPropTypes<typeof pageProps>;
