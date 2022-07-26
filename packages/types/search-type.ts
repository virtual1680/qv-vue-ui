export interface QvSearchColumn {
	search?: boolean
	searchValue?: string | number | boolean
	searchPlaceholder?: string
	searchTip?: string
	searchTipPlacement?: string
	searchSpan?: number
	searchSize?: 'medium' | 'small' | 'mini'
	searchOrder?: number
	searchGutter?: number
	searchRange?: boolean
	searchType?: string
	searchLabelWidth?: number
	searchClearable?: boolean
	searchMultiple?: boolean
	searchTags?: boolean
	searchFilterable?: boolean
	searchRules?: any[]
	searchLabelPosition?: 'right' | 'top' | 'left'
	searchFilterMethod?: () => void
	searchslot?: boolean
}
export interface QvSearchOption {
	searchBtn?: boolean
	searchRowKey?: string
	searchFilterDic?: boolean
	searchFilterNull?: boolean
	searchBtnText?: string
	searchShow?: boolean
	searchShowBtn?: boolean
	searchEnter?: boolean
	searchIcon?: boolean
	searchIndex?: number
	searchMenuSpan?: number
	searchSpan?: number
	searchGutter?: number
	/**
	 * 搜索表单label的宽度
	 */
	searchLabelWidth?: number
	searchLabelPosition?: 'right' | 'top' | 'left'
	searchSize?: 'medium' | 'small' | 'mini'
	searchMenuPosition?: 'left' | 'center' | 'right'
}
