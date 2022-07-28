import { QvSearchColumn, QvSearchOption } from './search-type'
import { QvDialogOption } from './dialog-type'
import { QvMenuOption } from './menu-type'
import { QvBtnOption } from './btn-type'
import { FormItemRule } from 'element-plus'

type Placement =
	| 'top-start'
	| 'top'
	| 'top-end'
	| 'left-start'
	| 'leftleft-end'
	| 'right-start'
	| 'right'
	| 'right-endbottom-start'
	| 'bottom'
	| 'bottom-end'
export type QvValue = string | number | boolean | (string | number | boolean)[]
export interface DicProps {
	rowKey?: string
	rowParentKey?: string
	nodeKey?: string
	label?: string
	value?: string
	desc?: string
	groups?: string
	title?: string
	leaf?: string
	children?: string
	hasChildren?: string
	labelText?: string
	disabled?: string
}

export interface BaseColumn extends QvSearchColumn {
	/**
	 * 字符数据分离切割 默认 ','
	 */
	separator?: string
	align?: 'left' | 'center' | 'right'
	/**
	 * 暂不可用
	 * 是否开启加载html
	 * dicData:[label:'<div>我是html</div>',value:1]
	 */
	html?: boolean
	cell?: boolean
	/**
	 * 编辑窗口是否禁用
	 */
	editDisabled?: boolean
	/**
	 * 编辑窗口是否显示
	 */
	editDisplay?: boolean
	/**
	 * 编辑窗口中是否让该字段以详情的方式展示
	 */
	editDetail?: boolean
	/**
	 * 新增窗口是否禁用
	 */
	addDisabled?: boolean
	/**
	 * 新增窗口是否显示
	 */
	addDisplay?: boolean
	/**
	 * 新增窗口中是否让该字段以详情的方式展示
	 */
	addDetail?: boolean
	/**
	 * 详情窗口是否显示
	 */
	viewDisplay?: boolean
	/**
	 * 否让该字段以详情的方式展示
	 */
	detail?: boolean
	/**
	 * 字段排序 数组越小越靠前
	 */
	order?: number
	filter?: boolean
	filterMultiple?: boolean
	filters?: boolean | any[] | { text: string; value: string | number | boolean }[]
	filterMethod?: (value: any, row: any, column: any) => void
	filtersMethod?: (value: any, row: any, column: any) => void
	/**
	 * crud
	 * 是否固定
	 */
	fixed?: boolean
	formatter?: (row: any, value: any, label: string | string[] | number | number[], column: any) => any
	showColumn?: boolean
	sortable?: boolean
	// slot?: boolean
	// formslot?: boolean
	// labelslot?: boolean
	// errorslot?: boolean
	// headerslot?: boolean
	// typeslot?: boolean
	headerAlign?: 'right' | 'center' | 'left'
	/**
	 * 组件类型  默认 input
	 * select checkbox upload ....
	 */
	type?: string
	/**
	 * crud
	 * 表格列的宽度
	 */
	width?: number
	/**
	 * crud
	 * 表格列的最小宽度
	 */
	minWidth?: number
	/**
	 * form
	 * 分组展示时是否禁用展开
	 */
	arrow?: boolean
	/**
	 * form
	 * 分组展示时是否展开
	 */
	collapse?: boolean
	/**
	 * form
	 * 组件在表单是否独占一行
	 */
	row?: boolean
	/**
	 * form
	 * 组件在表单中栅格占位 默认 6
	 */
	span?: number
	/**
	 * form
	 * 组件是否开启清除按钮 默认 true
	 */
	clearable?: boolean
	/**
	 * form
	 * 组件是否禁用 默认 false
	 */
	disabled?: boolean
	/**
	 * crud
	 * 该列在表格中是否隐藏 默认 false
	 */
	hide?: boolean
	/**
	 * crud
	 * 是否让该列在表格中内容超出则显示... 默认 false
	 */
	overHidden?: boolean
	/**
	 * form
	 * 表单item组件 label文字
	 */
	label?: string
	/**
	 * form
	 * 表单item组件 label 宽度
	 */
	labelWidth?: number
	/**
	 * form
	 * 表单item组件 label 的显示位置
	 */
	labelPosition?: 'right' | 'left' | 'top'
	/**
	 * form
	 * 表单组件显示的tip文案
	 */
	tip?: string
	/**
	 * form
	 * 表单组件显示的tip文案的显示位置
	 */
	tipPlacement?: Placement
	/**
	 * form
	 * 表单item组件 label 的tip文案
	 */
	labelTip?: string
	/**
	 * form
	 * 表单item组件 label 的tip文案的显示位置
	 */
	labelTipPlacement?: Placement
	/**
	 * form
	 * 表单item组件占位提示
	 */
	placeholder?: string
	/**
	 * 该组件绑定的key
	 */
	prop: string
	bind?: string
	/**
	 * form
	 * 该组件是否只读
	 */
	readonly?: boolean
	/**
	 * form
	 * 表单item组件数据的校验规则
	 */
	rules?: FormItemRule[]
	/**
	 * form
	 * 表单item组件的大小
	 */
	size?: '' | 'default' | 'small' | 'large'
	/**
	 * form
	 * 表单item组件的列间距
	 */
	gutter?: number
	/**
	 * form
	 * 表单item组件是否展示
	 */
	display?: boolean
	/**
	 * form
	 * 表单item组件自定义key
	 */
	props?: DicProps
	dataType?: string
	/**
	 * form
	 * 默认值
	 */
	value?: QvValue
	/**
	 * form
	 * 组件的数据字典
	 */
	dicData?: { label: string; value: string | number | boolean }[]
	/**
	 * form
	 * 组件动态请求数据字典的url
	 */
	dicUrl?: string
	dicFlag?: boolean
	dicMethod?: 'get' | 'post'
	/**
	 * form
	 * 请求数据字典的请求参数
	 */
	dicQuery?: Record<string, string | number>
	/**
	 * form
	 * 数据字典格式化
	 */
	dicFormatter?: (res: any) => any[]
	blur?: (params: { value: QvValue; column: unknown }) => void
	focus?: (params: { value: QvValue; column: unknown }) => void
	change?: (params: { value: QvValue; column: unknown }) => void
	click?: (params: { value: QvValue; column: unknown }) => void
	enter?: (params: { value: QvValue; column: unknown }) => void
	typeformat?: (item: DicData, labelKey: string, valueKey: string) => string
	/**
	 * form
	 * 控制其他字段
	 */
	control?: <T = any>(value: unknown, form: T) => Record<string, QvColumn>
	icon?: string
	flex?: number
	children?: any
	/**
	 * form
	 * 第三方组件
	 */
	component?: string
	/**
	 * form
	 * 第三方组件事件
	 */
	event?: Record<string, (...args: any[]) => void>
	/**
	 * form
	 * 第三方组件属性
	 */
	params?: Record<string, unknown>
	offset?: number
	className?: string
	count?: number
	parentProp?: string
	target?: string
	limit?: number
	/**
	 * 是否多选
	 */
	multiple?: boolean
}
export interface QvGroupI {
	icon?: string
	label?: string
	collapse?: boolean
	arrow?: boolean
	prop?: string
	header?: boolean
	flex?: boolean
	labelPosition?: 'right' | 'top' | 'left'
	display?: boolean
	column: QvColumn[]
}
export interface QvOption extends QvSearchOption, QvDialogOption, QvMenuOption, QvBtnOption {
	sortable?: boolean
	rowSort?: boolean
	columnSort?: boolean
	expandAll?: boolean
	expandLevel?: number
	tree?: boolean
	column?: QvColumn[]
	footer?: QvColumn[]
	group?: QvGroupI[]
	title?: string
	titleSize?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
	tip?: boolean
	align?: 'left' | 'center' | 'right' //left
	enter?: boolean //false
	border?: boolean //false
	card?: boolean
	defaultSort?: any //TODO
	defaultExpandAll?: boolean
	treeProps?: DicProps
	expandRowKeys?: any[]
	expand?: boolean
	expandWidth?: number
	expandFixed?: boolean
	fit?: boolean
	span?: number
	gutter?: number
	width?: number | string
	height?: number | string
	calcHeight?: number
	header?: boolean
	index?: boolean
	indexWidth?: number
	indexFixed?: boolean
	rowKey?: string //id
	indeterminate?: boolean
	labelWidth?: string | number
	maxHeight?: number | string
	selection?: boolean
	selectionWidth?: number
	selectionFixed?: boolean
	selectable?: (row: any, index: number) => void
	reserveSelection?: boolean
	showHeader?: boolean
	showSummary?: boolean
	size?: '' | 'default' | 'small' | 'large'
	sumColumnList?: any[]
	stripe?: boolean
	emptyText?: string
	clearExclude?: string[]
	submitText?: string
	props?: DicProps
	disabled?: boolean
	readonly?: boolean
	tabsType?: string
	detail?: boolean
	tabs?: boolean
	labelSuffix?: string
	tabsActive?: string
	filterDic?: boolean
	filterNull?: boolean
	boxType?: string
	labelPosition?: 'right' | 'top' | 'left'
	statusIcon?: boolean
	formWidth?: string | number
	lazy?: boolean
	highlightCurrentRow?: boolean
	titleStyle?: any
	headerAlign?: 'right' | 'center' | 'left'
}
// extends BaseColumn
export interface InputColumn {
	prepend?: string
	prependClick?: () => void
	append?: string
	appendClick?: () => void
	maxRows?: number
	minRows?: number
	showPassword?: boolean
	showWordLimit?: boolean
	maxlength?: number
	minlength?: number
	prefixIcon?: string //暂时无效
	suffixIcon?: string //暂时无效
	autocomplete?: string
	suffix?: string
	suffixClick?: () => void
	prefix?: string
	prefixClick?: () => void
}
export interface SelectColumn {
	cascader?: string[]
	cascaderIndex?: number
	// multiple?: boolean
	tags?: boolean
	allowCreate?: boolean
	filterable?: boolean
	remote?: boolean
	remoteMethod?: () => void
	defaultFirstOption?: boolean
	loadingText?: string
	popperClass?: string
	popperAppendToBody?: boolean
	// 组件内需要
	noMatchText?: string
	drag?: boolean
	noDataText?: string
}

export interface ImgColumn {
	// target?: string
	alone?: boolean
	imgWidth?: number | string
	imgHeight?: number | string
	fullscreen?: boolean
	imgType?: string
}

export interface CascaderColumn {
	lazyLoad?: (node: unknown, resolve: () => void) => void
	lazy?: boolean
	emitPath?: boolean
	checkStrictly?: boolean
	// multiple?: boolean
	// filterMethod?: (node?: unknown, keyword?: unknown) => void
	expandTrigger?: 'click' | 'hover'
	filterable?: boolean
	// separator?: string
	tags?: boolean
	showAllLevels?: boolean
}
export interface CheckboxColumn {
	all?: boolean
	border?: boolean
	min?: number
	max?: number
}
export interface DateColumn {
	startPlaceholder?: string
	endPlaceholder?: string
	rangeSeparator?: string
	valueFormat?: string
	format?: string
	pickerOptions?: unknown //{}
	defaultTime?: string[] | string
	defaultValue?: string[] | string
	unlinkPanels?: boolean
	// * 文本框可输入
	editable?: boolean
	// * 设置快捷选项，需要传入数组对象
	shortcuts?: { text: string; value: Date | (() => any[]) }
}

export interface DynamicColumn {
	rowAdd?: () => void
	type?: 'form' | 'crud'
}
export interface IconItem {
	value?: string
	size?: string
	color?: string
	label?: string
}
export interface IconColumn {
	dialogWidth?: string | number
	iconList?: IconItem[]
}
export interface RadioColumn {
	border?: boolean
	button?: boolean
}

export interface NumberColumn {
	precision?: number
	min?: number
	max?: number
	step?: number
	controls?: boolean
	controlsPosition?: 'right' | 'top'
}
export interface SwitchColumn {
	len?: number
	activeIconClass?: string
	inactiveIconClass?: string
	activeColor?: string
	inactiveColor?: string
}

export interface RateColumn {
	showText?: boolean
	iconClasses?: string[] | Record<string, unknown>
	voidIconClass?: string
	activeColor?: string
	max?: number
	colors?: string[] | Record<string, unknown>
	texts?: string[]
}

export interface SliderColumn {
	min?: number
	max?: number
	step?: number
	range?: boolean
	showInput?: boolean
	showStops?: boolean
	formatTooltip?: (value: number) => boolean | boolean
}
export interface ColorColumn {
	showAlpha?: boolean
	colorFormat?: 'hsl' | 'hsv' | 'hex' | 'rgb'
}
export interface PropsHttp {
	name?: string
	url?: string
	fileName?: string
	res?: string
	home?: string
}
export interface CanvasOption {
	text?: string
	fontFamily?: string
	color?: string
	fontSize?: string
	opacity?: string
	bottom?: string
	right?: string
	ratio?: number //0-1
}
export interface UpLoadColumn {
	accept?: string | string[]
	fileSize?: number //unit M
	action?: string
	dragFile?: false
	propsHttp?: PropsHttp
	data?: Record<string, string | Blob>
	headers?: Record<string, string>
	// limit?: number
	listType?: 'picture' | 'picture-card' | 'picture-img'
	showFileList?: boolean
	// multiple?: boolean
	canvasOption?: CanvasOption
	oss?: string
	onRemove?: (file: any, fileList: any) => void
	uploadError?: (error: any, column: any) => void
	uploadDelete?: (file: any, column: any) => Promise<any>
	uploadPreview?: (file: any, column: any, callback: () => void) => void
	uploadExceed?: (limit: number, files: any, fileList: any[], column: any) => void
	httpRequest?: (config: any) => void
	uploadAfter?: (res: any, show: (data: any) => void, loading: () => void, column: any) => void
	uploadBefore?: (res: any, callback: (newFile: any) => void, loading: () => void, column: any) => void
}

export interface TreeColumn {
	iconClass?: string
	filterText?: string
	filters?: boolean
	defaultCheckedKeys?: unknown[]
	defaultExpandedKeys?: unknown[]
	expandOnClickNode?: boolean
	defaultExpandAll?: boolean
	accordion?: boolean
	checkStrictly?: boolean
	// multiple?: boolean
	tags?: boolean
	leafOnly?: boolean
	parent?: boolean
	lazy?: boolean
	lazyLoad?: (node: unknown, resolve: () => void) => void
	treeProps?: { hasChildren: string; children: string }
	nodeClick?: (data: unknown, node: unknown, ref: unknown) => void
	checked?: (checkedNodes: unknown, checkedKeys: unknown, halfCheckedNodes: unknown, halfCheckedKeys: unknown) => void
	popperClass?: string
	popperAppendToBody?: boolean // 重复 select
}
export interface TableColumn {
	formatter?: (row: unknown) => void
	onLoad?: (params: { page: unknown; value: unknown; data: unknown }, callback: () => void) => void
}

export interface QvColumn
	extends UpLoadColumn,
		CanvasOption,
		CascaderColumn,
		ColorColumn,
		SliderColumn,
		RateColumn,
		SwitchColumn,
		NumberColumn,
		RadioColumn,
		DateColumn,
		SelectColumn,
		InputColumn,
		CheckboxColumn,
		IconColumn,
		ImgColumn,
		BaseColumn {}

export type DicData = {
	label: string
	value: string | number | boolean
	[key: string]: any
}
export interface EventProps {
	modelValue?: any
	dic?: DicData[]
	column: QvColumn
	size?: '' | 'default' | 'small' | 'large' | undefined
	disabled?: boolean
	tableData?: any
	readonly?: boolean
	placeholder?: string
	props?: DicProps
	propsHttp?: PropsHttp
	type?: string
}
