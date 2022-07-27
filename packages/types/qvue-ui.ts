import { QvSearchColumn, QvSearchOption } from './search-type'
import { QvDialogOption } from './dialog-type'
import { QvMenuOption } from './menu-type'
import { QvBtnOption } from './btn-type'

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
	separator?: string
	align?: 'left' | 'center' | 'right'
	html?: boolean
	cell?: boolean
	editDisabled?: boolean
	editDisplay?: boolean
	editDetail?: boolean
	addDisabled?: boolean
	addDisplay?: boolean
	addDetail?: boolean
	viewDisplay?: boolean
	// 是否让该字段展示详情
	detail?: boolean
	order?: number
	filter?: boolean
	filterMultiple?: boolean
	filters?: boolean | any[] | { text: string; value: string | number | boolean }[]
	filterMethod?: (value: any, row: any, column: any) => void
	filtersMethod?: (value: any, row: any, column: any) => void
	fixed?: boolean
	formatter?: (row: any, value: any, label: string | string[] | number | number[], column: any) => any
	showColumn?: boolean
	sortable?: boolean
	slot?: boolean
	formslot?: boolean
	labelslot?: boolean
	errorslot?: boolean
	headerslot?: boolean
	typeslot?: boolean
	headerAlign?: 'right' | 'center' | 'left'
	type?: string //''
	width?: number
	minWidth?: number
	arrow?: boolean
	collapse?: boolean
	row?: boolean
	clearable?: boolean //true
	disabled?: boolean //false
	hide?: boolean
	overHidden?: boolean
	label?: string //''
	labelWidth?: number
	labelPosition?: 'right' | 'left' | 'top'
	tip?: string //'
	tipPlacement?: Placement
	labelTip?: string
	labelTipPlacement?: Placement
	placeholder?: string //''
	prop: string //''
	bind?: string
	readonly?: boolean
	rules?: any //FormRules
	size?: '' | 'default' | 'small' | 'large'
	span?: number
	gutter?: number
	display?: boolean
	props?: DicProps
	dataType?: string
	value?: QvValue
	dicData?: { label: string; value: string | number | boolean }[]
	dicUrl?: string //''
	dicFlag?: boolean
	dicMethod?: 'get' | 'post'
	dicQuery?: Record<string, string>
	dicFormatter?: (res: any) => void
	blur?: (params: { value: QvValue; column: unknown }) => void
	focus?: (params: { value: QvValue; column: unknown }) => void
	change?: (params: { value: QvValue; column: unknown }) => void
	click?: (params: { value: QvValue; column: unknown }) => void
	enter?: (params: { value: QvValue; column: unknown }) => void
	typeformat?: (item: DicData, labelKey: string, valueKey: string) => string
	control?: (value: unknown) => void
	icon?: string
	flex?: number
	children?: any
	component?: string
	offset?: number
	className?: string
	count?: number
	parentProp?: string
	target?: string
	limit?: number
	multiple?: boolean
	event?: Record<string, (...args: any[]) => void>
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
export interface MapColumn {
	params?: Record<string, unknown>
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
		MapColumn,
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
