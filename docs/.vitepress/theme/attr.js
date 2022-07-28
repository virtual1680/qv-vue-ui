const a = [
	{ label: 'alone', type: 'Boolean', select: 'true/false', note: '单个模式(非数组模式)，type为array/url/img时生效', default: 'false' },
	{ label: 'limit', type: 'String/Number', note: '最大框的个数', default: '-' }
]
const o = [
	{ label: 'startPlaceholder', type: 'String', note: '日期/时间范围开始占位符' },
	{ label: 'endPlaceholder', type: 'String', note: '日期/时间范围结束占位符' },
	{ label: 'rangeSeparator', type: 'String', note: '选择范围时的分隔符', default: '-' },
	{ label: 'valueFormat', type: 'String', note: '真实值的时间格式' },
	{ label: 'format', type: 'String', note: '显示值时间格式', href: '/form/form-date' },
	{ label: 'pickerOptions', type: 'Object', note: '当前时间日期选择器特有的选项', default: '{}' }
]
export const paramsList = [
	{ label: 'value/v-model', type: 'Object', note: '绑定值' },
	{ label: 'data', tag: 2, type: 'Array', note: '表格的数组数据' },
	{
		label: 'option',
		type: 'Object',
		note: '表格总配置属性',
		children: [
			{
				label: 'column',
				type: 'Array',
				note: '表格列配置属性',
				children: [
					{
						label: '公用属性',
						children: [
							{ label: 'searchValue', tag: 2, note: '搜索表单的默认值' },
							{ label: 'searchPlaceholder', tag: 2, type: 'String', note: '搜索框辅助文字' },
							{ label: 'searchTip', tag: 2, type: 'String', note: '弹窗编辑文字提示' },
							{
								label: 'searchTipPlacement',
								tag: 2,
								type: 'String',
								select: 'top-start/top/top-end/left-start/left-end/right-start/right/right-end/bottom-start/bottom/bottom-end',
								note: '搜索框辅助文字提示展示方向',
								default: 'top'
							},
							{
								label: 'searchSpan',
								tag: 2,
								type: 'Number',
								select: 'top-start/top/top-end/left-start/left-end/right-start/right/right-end/bottom-start/bottom/bottom-end',
								note: '搜索框栅列',
								default: 8
							},
							{ label: 'searchSize', tag: 2, type: 'String', select: 'medium/small/mini', note: '搜索框大小', default: 'small' },
							{
								label: 'searchOrder',
								tag: 2,
								type: 'Number',
								note: '搜索字段位置排序(序号越大越靠前)',
								href: '/crud/crud-search.html#搜索字段排序'
							},
							{ label: 'searchGutter', tag: 2, type: 'Number', note: '搜索框的间距', default: '20' },
							{ label: 'searchRange', tag: 2, select: 'true/false', type: 'Boolean', note: '范围搜索', default: 'false' },
							{ label: 'searchType', tag: 2, type: 'string', note: '搜索框类型' },
							{ label: 'searchLabelWidth', tag: 2, type: 'Number', note: '搜索框的标题宽度', default: '80' },
							{ label: 'searchClearable', tag: 2, select: 'true/false', type: 'Boolean', note: '搜索框的清除按钮', default: 'false' },
							{ label: 'searchMultiple', tag: 2, select: 'true/false', type: 'Boolean', note: '搜索表单的是否多选', default: 'false' },
							{
								label: 'searchTags',
								tag: 2,
								select: 'true/false',
								type: 'Boolean',
								note: '多选时是否将选中值按文字的形式展示',
								default: 'false'
							},
							{ label: 'searchFilterable', tag: 2, select: 'true/false', type: 'Boolean', note: '是否可以输入搜索。', default: 'false' },
							{
								label: 'searchFilterMethod',
								tag: 2,
								type: 'Function',
								note: '数据过滤使用的方法，如果是多选的筛选项，对每一条数据会执行多次，任意一次返回true就会显示。'
							},
							{
								label: 'addDisabled',
								type: 'Boolean',
								tag: 2,
								select: 'true/false',
								note: '表单新增时是否禁止',
								default: 'false',
								href: '/crud/crud-form.html#字段不同状态'
							},
							{
								label: 'addDisplay',
								type: 'Boolean',
								tag: 2,
								select: 'true/false',
								note: '表单新增时是否可见',
								default: 'true',
								href: '/crud/crud-form.html#字段不同状态'
							},
							{
								label: 'addDetail',
								type: 'Boolean',
								tag: 2,
								select: 'true/false',
								note: '表单新增时是否为查看模式',
								default: 'false',
								href: '/crud/crud-form.html#字段不同状态'
							},
							{ label: 'align', type: 'String', tag: 2, select: 'left/center/right', note: '列的对其方式', default: 'left' },
							{
								label: 'html',
								type: 'Boolean',
								tag: 2,
								version: '2.8.23',
								select: 'true/false',
								note: '开启html转义',
								default: 'false',
								href: '/crud/crud-column.html#支持html转译'
							},
							{ label: 'cell', type: 'Boolean', tag: 2, select: 'true/false', note: '开启行编辑模式', default: 'false' },
							{
								label: 'editDisabled',
								type: 'Boolean',
								tag: 2,
								select: 'true/false',
								note: '表单编辑时是否禁止',
								default: 'false',
								href: '/crud/crud-form.html#字段不同状态'
							},
							{
								label: 'editDisplay',
								type: 'Boolean',
								tag: 2,
								select: 'true/false',
								note: '表单编辑时是否可见',
								default: 'true',
								href: '/crud/crud-form.html#字段不同状态'
							},
							{
								label: 'editDetail',
								type: 'Boolean',
								tag: 2,
								select: 'true/false',
								note: '表单编辑时是否为查看模式',
								default: 'false',
								href: '/crud/crud-form.html#字段不同状态'
							},
							{
								label: 'viewDisplay',
								type: 'Boolean',
								tag: 2,
								select: 'true/false',
								note: 'viewDisplay',
								default: 'true',
								href: '/crud/crud-form.html#字段不同状态'
							},
							{ label: 'order', type: 'Number', note: '字段位置排序，数字越大位置越靠前', href: '/crud/crud-form.html#字段排序' },
							{ label: 'filter', type: 'Boolean', tag: 2, select: 'true/false', note: '是否在动态搜索条件里面显示', default: 'true' },
							{ label: 'filterMultiple', type: 'Boolean', tag: 2, select: 'true/false', note: '数据过滤的选项是否多选', default: 'true' },
							{
								label: 'filters',
								type: 'Boolean/Array[{text,value}]',
								tag: 2,
								note: '传入true开启默认数据过滤的选项，也可以传入自定义数组格式，数组中的元素需要有text和value属性'
							},
							{
								label: 'filterMethod',
								type: 'Function',
								params: 'value,row,column',
								tag: 2,
								note: '数据过滤使用的方法，如果是多选的筛选项，对每一条数据会执行多次，任意一次返回true就会显示'
							},
							{ label: 'fixed', type: 'Boolean', select: 'true/left/right', tag: 2, note: '冻结列' },
							{ label: 'formatter', type: 'Function', params: 'row,value,label,column', tag: 2, note: '内容格式化' },
							{ label: 'showColumn', type: 'Boolean', select: 'true/false', tag: 2, note: '是否加入动态现隐列', default: 'true' },
							{ label: 'sortable', type: 'Boolean', select: 'true/false', tag: 2, note: '开启排序', default: 'false' },
							{ label: 'slot', type: 'Boolean', select: 'true/false', tag: 2, del: '2.8.0', note: '列自定义', default: 'false' },
							{
								label: 'formslot',
								type: 'Boolean',
								del: '2.8.0',
								select: 'true/false',
								note: '表单自定义',
								default: 'false',
								href: '/form/form-slot'
							},
							{
								label: 'labelslot',
								type: 'Boolean',
								select: 'true/false',
								note: '表单标题自定义',
								default: 'false',
								href: '/form/form-slot'
							},
							{
								label: 'errorslot',
								type: 'Boolean',
								select: 'true/false',
								note: '表单错误自定义',
								default: 'false',
								href: '/form/form-slot'
							},
							{
								label: 'headerslot',
								tag: 2,
								del: '2.8.0',
								version: '2.7.8',
								type: 'Boolean',
								select: 'true/false',
								note: '表头自定义',
								default: 'false',
								href: '/crud/crud-head.html#自定义列表头'
							},
							{
								label: 'searchslot',
								tag: 2,
								del: '2.8.0',
								version: '2.2.3',
								type: 'Boolean',
								select: 'true/false',
								note: '表格搜索选项的自定义',
								default: 'false',
								href: '/crud/crud-search.html自定义列搜索'
							},
							{
								label: 'typeslot',
								type: 'Boolean',
								del: '2.8.0',
								select: 'true/false',
								note: '组件下拉自定义',
								default: 'false',
								href: '/form/form-slot'
							},
							{ label: 'width', type: 'Number', tag: 2, note: '列宽度', default: 'auto' },
							{ label: 'minWidth', type: 'Number', tag: 2, note: '列最小宽度', default: 'auto' },
							{ label: 'arrow', type: 'Boolean', select: 'true/false', note: '分组折叠', default: 'true' },
							{ label: 'collapse', type: 'Boolean', select: 'true/false', note: '分组默认叠起', default: 'false' },
							{ label: 'row', type: 'Boolean', select: 'true/false', note: '是否单独成行', default: 'false' },
							{ label: 'clearable', type: 'Boolean', select: 'true/false', note: '是否可以清空选项', default: 'false' },
							{ label: 'disabled', type: 'Boolean', select: 'true/false', note: '禁止编辑', default: 'false' },
							{ label: 'hide', type: 'Boolean', tag: 2, select: 'true/false', note: '隐藏列', default: 'false' },
							{ label: 'overHidden', type: 'Boolean', tag: 2, select: 'true/false', note: '文字超出隐藏', default: 'false' },
							{ label: 'label', type: 'String', note: '标题名称' },
							{ label: 'labelWidth', type: 'Number', note: '标题名称宽度', default: 110 },
							{
								label: 'labelPosition',
								type: 'String',
								select: 'right/left/top',
								note: '表单域标签的位置，如果值为 left 或者 right 时，则需要设置 labelWidth',
								default: 'right'
							},
							{ label: 'tip', type: 'String', note: '文字提示' },
							{
								label: 'tipPlacement',
								type: 'String',
								select: 'top-start/top/top-end/left-start/leftleft-end/right-start/right/right-endbottom-start/bottom/bottom-end',
								note: '文字提示展示方向'
							},
							{ label: 'labelTip', type: 'String', note: '标题文字提示' },
							{
								label: 'labelTipPlacement',
								type: 'String',
								select: 'top-start/top/top-end/left-start/leftleft-end/right-start/right/right-endbottom-start/bottom/bottom-end',
								note: '标题文字提示展示方向'
							},
							{
								label: 'placeholder',
								type: 'String',
								select: 'top-start/top/top-end/left-start/leftleft-end/right-start/right/right-endbottom-start/bottom/bottom-end',
								note: '辅助语',
								default: '请选择/请输入label'
							},
							{ label: 'prop', type: 'String', note: '列字段(唯一不重复)' },
							{ label: 'bind', type: 'String', note: '深结构数据绑定取值', href: '/form/form-bind' },
							{ label: 'readonly', type: 'Boolean', select: 'true/false', note: '只读', default: !1 },
							{
								label: 'rules',
								type: 'Object',
								note: '验证规则可以参考<a href="https://github.com/yiminghe/async-validator">async-validator</a>',
								href: '/form/form-rules'
							},
							{ label: 'size', type: 'String', select: 'medium/small/mini', note: '控件大小', default: 'small' },
							{ label: 'control', type: 'Function', version: '2.8.6', note: '字段控制器', href: '/form/form-control' },
							{ label: 'span', type: 'Number', note: '栅列', default: '12' },
							{ label: 'gutter', type: 'Number', note: '项间距', default: '20' },
							{ label: 'display', type: 'Boolean', select: 'true/false', note: '是否可见', default: 'true' },
							{
								label: 'props',
								type: 'Object',
								note: '参数配置项',
								default: "{label:'label',value:'value'}",
								children: [
									{ label: 'label', type: 'String', note: '字典的名称属性值' },
									{ label: 'value', type: 'String', note: '字典的值属性值' },
									{ label: 'children', type: 'String', note: '字典的子属性值' },
									{ label: 'res', type: 'String', note: '字典返回的数据格式' }
								]
							},
							{ label: 'dataType', type: 'String', note: '数据类型用于数组和字符串之间的转化', href: '/docs/datatype' },
							{ label: 'value', note: '默认值' },
							{ label: 'dicData', type: 'Array', note: '字典' },
							{ label: 'dicUrl', type: 'String', note: '字典远程字典' },
							{
								label: 'dicFlag',
								type: 'Boolean',
								tag: 2,
								select: 'true/false',
								note: '表格打开表单的时候是否重新拉取字典',
								default: !1,
								href: '/crud/crud-dic'
							},
							{ label: 'dicMethod', type: 'String', select: 'get/post', note: '字典的请求方式', default: 'get' },
							{ label: 'dicQuery', type: 'Object', note: '字典的请求参数' },
							{ label: 'dicFormatter', type: 'Function', note: '字典的数据格式化', href: '/form/form-dic.html' },
							{ label: 'click', type: 'Function', params: '{value,column}', note: '点击事件' },
							{ label: 'change', type: 'Function', params: '{value,column}', note: '值改变事件' },
							{ label: 'focus', type: 'Function', params: '{value,column}', note: '聚焦事件' },
							{ label: 'blur', type: 'Function', params: '{value,column}', note: '失焦事件' }
						]
					},
					{
						label: 'input',
						note: '输入框',
						children: [
							{ label: 'append', type: 'String', note: '后面的辅助文字' },
							{ label: 'appendClick', type: 'Function', params: 'value', note: '搜索点击事件' },
							{ label: 'maxRows', type: 'Number', note: '最大行/最大值', default: 4 },
							{ label: 'minRows', type: 'Number', note: '最小行/最小值', default: 2 },
							{ label: 'prepend', type: 'String', note: '前面的辅助文字', default: 2 },
							{ label: 'showPassword', type: 'Boolean', select: 'true/false', version: '2.6.18', note: '密码是否可见', default: 'true' },
							{ label: 'showWordLimit', type: 'Boolean', select: 'true/false', note: '是否显示输入字数统计', default: 'true' },
							{ label: 'showWordLimit', type: 'Boolean', select: 'true/false', note: '是否显示输入字数统计', default: 'false' },
							{ label: 'maxlength', type: 'Number', note: '原生属性，最大输入长度' },
							{ label: 'minlength', type: 'Number', note: '原生属性，最小输入长度', default: 'false' },
							{ label: 'prefixIcon', type: 'String', note: '输入框头部图标' },
							{ label: 'suffixIcon', type: 'Number', note: '输入框尾部图标' }
						],
						href: '/component/input'
					},
					{
						label: 'select',
						note: '选择框',
						children: [
							{ label: 'cascader', type: 'Array', note: '级联的子节点prop' },
							{ label: 'cascaderIndex', type: 'Number', note: '级联的默认选项序号' },
							{ label: 'multiple', type: 'Boolean', select: 'true/false', note: '多选', default: 'false' },
							{ label: 'tags', type: 'Boolean', select: 'true/false', note: '多选时是否将选中值按文字的形式展示', default: 'false' },
							{
								label: 'allowCreate',
								type: 'Boolean',
								select: 'true/false',
								note: '是否允许用户创建新条目，需配合 filterable 使用',
								default: 'false'
							},
							{ label: 'filterable', type: 'Boolean', select: 'true/false', note: '是否可搜索', default: 'false' },
							{ label: 'remote', type: 'Boolean', select: 'true/false', note: '是否为远程搜索', default: 'false' },
							{ label: 'remoteMethod', type: 'Function', note: '是否为远程搜索' },
							{
								label: 'defaultFirstOption',
								type: 'Boolean',
								select: 'true/false',
								note: '在输入框按下回车，选择第一个匹配项。需配合 filterable 或 remote 使用',
								default: 'false'
							},
							{ label: 'loadingText', type: 'String', note: '远程加载时显示的文字', default: '加载中' },
							{ label: 'popperClass', type: 'String', note: 'Select 下拉框的类名', default: '-' },
							{
								label: 'popperAppendToBody',
								type: 'Boolean',
								note: '是否将弹出框插入至 body 元素。在弹出框的定位出现问题时，可将该属性设置为 false',
								default: 'true'
							}
						],
						href: '/component/select'
					},
					{ label: 'array', note: '数组框', children: a, href: '/component/array' },
					{ label: 'url', note: '超链接', children: a, href: '/component/url' },
					{ label: 'img', note: '图相框', children: a, href: '/component/img' },
					{
						label: 'cascader',
						note: '级联选择器',
						children: [
							{
								label: 'showAllLevels',
								type: 'Boolean',
								select: 'true/false',
								note: '级联输入框中是否显示选中值的完整路径',
								default: 'true'
							},
							{ label: 'tags', type: 'Boolean', select: 'true/false', note: '多选时是否将选中值按文字的形式展示', default: 'false' },
							{ label: 'separator', type: 'String', note: '选项分隔符' },
							{ label: 'filterable', type: 'Boolean', select: 'true/false', note: '是否可搜索选项', default: 'false' },
							{
								label: 'filterMethod',
								type: 'Function',
								note: '自定义搜索逻辑，第一个参数是节点node，第二个参数是搜索关键词keyword，通过返回布尔值表示是否命中\t',
								params: 'node, keyword'
							},
							{ label: 'expandTrigger', type: 'String', select: 'click/hover', note: '次级菜单的展开方式', default: 'click' },
							{ label: 'multiple', type: 'Boolean', select: 'true/false', note: '是否多选', default: 'false' },
							{ label: 'checkStrictly', type: 'Boolean', select: 'true/false', note: '是否严格的遵守父子节点不互相关联', default: 'false' },
							{
								label: 'emitPath',
								type: 'Boolean',
								select: 'true/false',
								note: '在选中节点改变时，是否返回由该节点所在的各级菜单的值所组成的数组，若设置false，则只返回该节点的值',
								default: 'true'
							},
							{
								label: 'lazy',
								type: 'Boolean',
								select: 'true/false',
								note: '是否动态加载子节点，需与 lazyLoad 方法结合使用',
								default: 'false'
							},
							{
								label: 'lazyLoad',
								type: 'Function',
								params: 'node, resolve',
								note: '加载动态数据的方法，仅在 lazy 为 true 时有效\tfunction(node, resolve)，node为当前点击的节点，resolve为数据加载完成的回调(必须调用)'
							}
						],
						href: '/component/cascader'
					},
					{
						label: 'checkbox',
						note: '多选框',
						children: [
							{ label: 'all', type: 'Boolean', select: 'true/false', version: '2.6.6', note: '是否启动全选', default: !1 },
							{ label: 'border', type: 'Boolean', select: 'true/false', note: '是否显示边框', default: !1 },
							{ label: 'min', type: 'Number', note: '可被勾选的 checkbox 的最小数量' },
							{ label: 'max', type: 'Number', note: '可被勾选的 checkbox 的最大数量' }
						],
						href: '/component/checkbox'
					},
					{ label: 'datetime', note: '日期选择器', children: o, href: '/component/datetime' },
					{ label: 'time', note: '时间选择器', children: o, href: '/component/time' },
					{
						label: 'dynamic',
						note: '子表单',
						children: [
							{ label: 'rowAdd', type: 'Function', note: '新增方法' },
							{ label: 'rowDel', type: 'Function', note: '删除方法' },
							{ label: 'type', type: 'String', select: 'form/crud', note: '展示类型', default: 'crud' }
						],
						href: '/component/dynamic'
					},
					{
						label: 'icon',
						note: '图标选择器',
						children: [{ label: 'iconList', type: 'Array', note: '图标数组' }],
						href: '/component/input-icon'
					},
					{
						label: 'radio',
						note: '单选框',
						children: [
							{ label: 'border', type: 'Boolean', select: 'true/false', note: '显示边框', default: 'false' },
							{ label: 'button', type: 'Boolean', select: 'true/false', note: '按钮组类型', default: 'false' }
						],
						href: '/component/radio'
					},
					{
						label: 'map',
						note: '地图选择器',
						children: [{ label: 'params', type: 'Object', note: '高德地图的初始化参数' }],
						href: '/component/input-map'
					},
					{
						label: 'number',
						note: '数字框',
						children: [
							{ label: 'precision', type: 'Number', note: '精度', default: 2 },
							{ label: 'min', type: 'Number', note: '设置计数器允许的最小值', default: '-Infinity' },
							{ label: 'max', type: 'Number', note: '设置计数器允许的最大值', default: 'Infinity' },
							{ label: 'step', type: 'Number', note: '计数器步长', default: '1' },
							{ label: 'controls', type: 'Boolean', select: 'true/false', note: '是否使用控制按钮', default: 'true' },
							{ label: 'controlsPosition', type: 'String', select: 'right/top', note: '控制按钮位置', default: 'top' }
						],
						href: '/component/input-number'
					},
					{
						label: 'switch',
						note: '开关',
						children: [
							{ label: 'len', type: 'Number', note: '滑块的宽度', default: '40' },
							{ label: 'activeIconClass', type: 'String', note: '打开时所显示图标的类名，设置此项会忽略active-text' },
							{ label: 'inactiveIconClass', type: 'String', note: '关闭时所显示图标的类名，设置此项会忽略 inactive-text' },
							{ label: 'activeColor', type: 'String', note: '打开时的背景色', default: '#409EFF' },
							{ label: 'inactiveColor', type: 'String', note: '关闭时的背景色', default: '#C0CCDA' }
						],
						href: '/component/input-switch'
					},
					{
						label: 'rate',
						note: '评价选择器',
						children: [
							{
								label: 'showText',
								type: 'Boolean',
								select: 'true/false',
								note: '是否显示辅助文字，若为真，则会从 texts 数组中选取当前分数对应的文字内容',
								default: 'false'
							},
							{
								label: 'iconClasses',
								type: 'Array/Object',
								note: 'icon 的类名。若传入数组，共有 3 个元素，为 3 个分段所对应的类名；若传入对象，可自定义分段，键名为分段的界限值，键值为对应的类名',
								default: "['el-icon-star-on', 'el-icon-star-on','el-icon-star-on']"
							},
							{ label: 'voidIconClass', type: 'String', note: '未选中 icon 的类名', default: 'el-icon-star-off' },
							{ label: 'max', type: 'Number', note: '最大分值', default: '5' },
							{
								label: 'colors',
								type: 'Array/Object',
								note: 'icon 的颜色。若传入数组，共有 3 个元素，为 3 个分段所对应的颜色；若传入对象，可自定义分段，键名为分段的界限值，键值为对应的颜色',
								default: "['#F7BA2A', '#F7BA2A', '#F7BA2A']"
							}
						],
						href: '/component/rate'
					},
					{
						label: 'slider',
						note: '滑块',
						children: [
							{ label: 'min', type: 'Number', note: '最小值', default: '0' },
							{ label: 'max', type: 'Number', note: '最大值', default: '100' },
							{ label: 'step', type: 'Number', note: '步长', default: '1' },
							{ label: 'range', type: 'Boolean', select: 'true/false', note: '是否为范围选择', default: 'false' },
							{ label: 'showInput', type: 'Boolean', select: 'true/false', note: '是否显示输入框，仅在非范围选择时有效', default: 'false' },
							{ label: 'showStops', type: 'Boolean', select: 'true/false', note: '是否显示间断点', default: 'false' },
							{ label: 'formatTooltip', type: 'Function', params: 'value', select: 'true/false', note: '格式化 tooltip message' }
						],
						href: '/component/slider'
					},
					{
						label: 'color',
						note: '颜色选择器',
						children: [{ label: 'colorFormat', type: 'String', select: 'hsl/hsv/hex/rgb', note: '颜色的格式', default: 'rgb' }],
						href: '/component/input-color'
					},
					{
						label: 'upload',
						note: '附件上传',
						children: [
							{ label: 'accept', type: 'String/Array', note: 'upload时文件类型' },
							{ label: 'fileSize', type: 'Number', note: '上传文件的大小限制，单位为M,超出回调upload-error函数' },
							{ label: 'action', type: 'String', note: '必选参数，上传的地址' },
							{
								label: 'propsHttp',
								type: 'Object',
								note: '返回数据结构体配置',
								children: [
									{
										label: 'home',
										type: 'String',
										note: "图片的根路径地址，例如返回data:{url:' / xxxx.jpg',name:''},home属性为http://xxx.com/,则最终的图片显示地址为http://xxx.com/xxxx.jpg"
									},
									{ label: 'res', type: 'String', note: "返回结构体的层次，例如返回data:{url:'',name:''},则res配置为data" },
									{ label: 'url', type: 'String', note: "上传成功返回结构体的图片地址，例如返回data:{urlsrc:'',name:''},则url配置为urlsrc" },
									{
										label: 'name',
										type: 'String',
										note: "上传成功返回结构体的图片名称，例如返回data:{urlsrc:'',namesrc:''},则name配置为namesrc，当listType为picture-img属性不存在"
									},
									{ label: 'fileName', type: 'String', note: '上传文件流时的名称', default: 'file' }
								]
							},
							{ label: 'data', version: '2.6.4', type: 'Object', note: '携带的附加参数' },
							{ label: 'headers', version: '2.6.4', type: 'Object', note: '携带的头部附加参数' },
							{ label: 'limit', type: 'Number', note: '最大允许上传个数' },
							{ label: 'listType', type: 'String', select: 'text/picture/picture-card', note: '文件列表的类型', default: 'text' },
							{ label: 'showFileList', type: 'Boolean', select: 'true/false', note: '是否显示已上传文件列表', default: 'true' },
							{ label: 'multiple', type: 'Boolean', select: 'true/false', note: '是否支持多选文件', default: 'false' },
							{
								label: 'canvasOption',
								type: 'Object',
								note: '图片水印配置',
								children: [
									{ label: 'text', type: 'String', note: '字体的文字', default: 'avuejs.com' },
									{ label: 'fontFamily', type: 'String', note: '字体类型', default: 'microsoft yahei' },
									{ label: 'color', type: 'String', note: '字体的颜色', default: '#999' },
									{ label: 'fontSize', type: 'String', note: '字体的大小', default: '16' },
									{ label: 'opacity', type: 'String', note: '文字的透明度', default: '100' },
									{ label: 'bottom', type: 'String', note: '文字距离图片底部的距离', default: '10' },
									{ label: 'right', type: 'String', note: '文字距离图片右边的距离', default: '10' },
									{ label: 'ratio', type: 'Number', note: '压缩图片比率0-1(可以是小数)', default: '1' }
								]
							}
						],
						href: '/component/upload'
					},
					{
						label: 'tree',
						note: '树型下拉框',
						children: [
							{ label: 'multiple', type: 'Boolean', select: 'true/false', note: '多选', default: 'false' },
							{
								label: 'tags',
								type: 'Boolean',
								select: 'true/false',
								note: '多选时是否将选中值按文字的形式展示',
								default: 'false',
								version: '2.7.10'
							},
							{
								label: 'checkStrictly',
								type: 'Boolean',
								select: 'true/false',
								note: '在显示复选框的情况下，是否严格的遵循父子不互相关联的做法',
								default: 'false'
							},
							{ label: 'accordion', type: 'Boolean', select: 'true/false', note: '是否每次只打开一个同级树节点展开', default: 'false' },
							{ label: 'defaultExpandAll', type: 'Boolean', select: 'true/false', note: '是否默认展开所有节点', default: 'false' },
							{
								label: 'expandOnClickNode',
								type: 'Boolean',
								select: 'true/false',
								note: '是否在点击节点的时候展开或者收缩节点,如果为 false，则只有点箭头图标的时候才会展开或者收缩节点',
								default: 'false'
							},
							{ label: 'defaultExpandedKeys', type: 'Array', note: '默认展开的节点的 key 的数组' },
							{ label: 'defaultCheckedKeys', type: 'Array', note: '默认勾选的节点的 key 的数组' },
							{ label: 'filters', type: 'Boolean', select: 'true/false', note: '是否开启条件筛选', default: 'true' },
							{ label: 'filterText', type: 'String', note: '条件筛选提示语', default: '请输入搜索关键字' },
							{ label: 'iconClass', type: 'String', note: '自定义树节点的图标' },
							{ label: 'leafOnly', type: 'Boolean', select: 'true/false', note: '子类全选时勾选值是否包含父类', default: 'true' },
							{ label: 'parent', type: 'Boolean', select: 'true/false', note: '父类是否可以点击和选择', default: 'true' },
							{ label: 'lazy', type: 'Boolean', select: 'true/false', note: '是否懒加载子节点，需与 load 方法结合使用', default: 'false' },
							{
								label: 'treeLoad',
								type: 'Function',
								params: 'node, resolve',
								note: '加载子树数据的方法，仅当 lazy 属性为true 时生效',
								href: '/crud/crud-tree'
							},
							{
								label: 'treeProps',
								type: 'Object',
								default: "{ hasChildren: 'hasChildren', children: 'children' }",
								note: '渲染嵌套数据的配置选项'
							},
							{
								label: 'nodeClick',
								type: 'Function',
								params: 'data, node,ref',
								note: '节点被点击时的回调,共三个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身。'
							},
							{
								label: 'checked',
								type: 'Function',
								params: 'checkedNodes、checkedKeys、halfCheckedNodes、halfCheckedKeys',
								note: '当复选框被点击的时候触发共,两个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、树目前的选中状态对象'
							},
							{ label: 'popperClass', type: 'String', note: 'Select 下拉框的类名', default: '-' },
							{
								label: 'popperAppendToBody',
								type: 'Boolean',
								note: '是否将弹出框插入至 body 元素。在弹出框的定位出现问题时，可将该属性设置为 false',
								default: 'true'
							}
						],
						href: '/component/input-tree'
					},
					{
						label: 'table',
						note: '表格选择器',
						children: [
							{ label: 'formatter', type: 'Function', params: 'row', note: '展示数据格式化' },
							{ label: 'onLoad', type: 'Function', params: '{ page, value,data }, callback', note: '首次加载数据、查询、翻页方法' }
						],
						href: '/component/input-table'
					}
				]
			},
			{ label: 'title', tag: 2, type: 'String', note: '表格头部表格' },
			{ label: 'addBtn', tag: 2, type: 'Boolean', note: '添加按钮', select: 'true/false', default: !0 },
			{ label: 'addTitle', tag: 2, type: 'String', note: '新增窗口文案', default: '新增' },
			{ label: 'addRowBtn', tag: 2, type: 'Boolean', select: 'true/false', note: '表格行编辑时添加按钮', default: 'false' },
			{ label: 'align', tag: 2, type: 'String', select: 'left/center/right', note: '表格列齐方式', default: 'left' },
			{ label: 'enter', type: 'Boolean', select: 'true/false', note: '回车按键触发提交表单', default: 'false' },
			{ label: 'border', tag: 2, type: 'Boolean', select: 'true/false', note: '表格边框', default: 'false' },
			{ label: 'cellBtn', tag: 2, type: 'Boolean', select: 'true/false', note: '表格行编辑操作按钮', default: 'true' },
			{
				label: 'card',
				tag: 2,
				type: 'Boolean',
				version: '2.7.9',
				select: 'true/false',
				note: '表格以卡片分层模式显示，搜索部分和主体部分分层展示',
				default: 'true'
			},
			{ label: 'dateBtn', tag: 2, type: 'Boolean', select: 'true/false', note: '日期组件按钮', default: 'false' },
			{ label: 'delBtn', tag: 2, type: 'Boolean', select: 'true/false', note: '行内删除按钮', default: 'true' },
			{ label: 'defaultSort', tag: 2, type: 'Object', note: "表格的排序字段{prop:'date',order:'descending'}prop默认排序字段，order排序方式" },
			{
				label: 'defaultExpandAll',
				tag: 2,
				type: 'Boolean',
				select: 'true/false',
				note: '是否默认展开所有行，"expand"为true的时候有效',
				default: 'false'
			},
			{
				label: 'expandRowKeys',
				tag: 2,
				type: 'Array',
				note: '可以通过该属性设置目前的展开行，需要设置rowKey属性才能使用，该属性为展开行的keys数组。'
			},
			{ label: 'editBtn', tag: 2, type: 'Boolean', select: 'true/false', note: '行内编辑按钮', default: 'true' },
			{ label: 'editTitle', tag: 2, type: 'String', note: '编辑窗口文案', default: '编辑' },
			{ label: 'emptyText', tag: 2, type: 'String', note: '空数据时显示的文本内容，也可以通过slot="empty"设置', default: '暂无数据' },
			{ label: 'expand', tag: 2, type: 'Boolean', select: 'true/false', note: '展开折叠行', default: 'false' },
			{ label: 'expandWidth', tag: 2, type: 'Number', note: '展开折叠行宽度', default: '50' },
			{ label: 'expandFixed', tag: 2, type: 'Boolean', version: '2.6.7', select: 'true/false', note: '展开列是否行冻结', default: 'true' },
			{ label: 'excelBtn', tag: 2, type: 'Boolean', select: 'true/false', note: '导出Excel按钮', default: 'false' },
			{ label: 'filterBtn', tag: 2, type: 'Boolean', select: 'true/false', note: '自定义过滤表格列按钮', default: 'false' },
			{ label: 'fit', tag: 2, type: 'Boolean', select: 'true/false', note: '是列的宽度是否自撑开属性', default: 'true' },
			{ label: 'height', tag: 2, type: 'Number/String', note: '表格高度默认值为auto自动高度配合calcHeight属性使用', default: 'auto' },
			{ label: 'header', tag: 2, type: 'Boolean', select: 'true/false', note: '表格头部中间菜单显隐', default: 'true' },
			{
				label: 'index',
				tag: 2,
				type: 'Boolean',
				select: 'true/false',
				note: '是否显示表格序号（根据分页会自动计算，比如每页10行，到了第二页就会从11开始记数）',
				default: 'false'
			},
			{ label: 'indexWidth', tag: 2, type: 'Number', note: '序号列宽度', default: 50 },
			{ label: 'indexFixed', tag: 2, type: 'Boolean', select: 'true/false', version: '2.6.7', note: '序号列是否冻结', default: 'true' },
			{ label: 'rowKey', tag: 2, type: 'String', note: '行数据的Key的主键，用于其他相关操作', default: 'id' },
			{
				label: 'indeterminate',
				tag: 2,
				type: 'Boolean',
				select: 'true/false',
				note: '只负责样式控制表格如果选择一半，不会出现半选',
				default: 'false'
			},
			{ label: 'labelWidth', type: 'Number', note: '弹出表单的标题的统一宽度', default: '110' },
			{ label: 'maxHeight', tag: 2, type: 'Number/String', note: '表格的最大高度', default: 'auto' },
			{ label: 'menu', tag: 2, type: 'Boolean', note: '是否显示操作菜单栏', select: 'true/false', default: 'true' },
			{
				label: 'menuPosition',
				tag: 2,
				type: 'String',
				note: '表格右侧行操作按钮的排列方式',
				select: 'left/center/right|right',
				default: 'center'
			},
			{ label: 'menuWidth', tag: 2, type: 'Number', note: '操作菜单栏的宽度', default: '240' },
			{ label: 'menuType', tag: 2, type: 'String', select: 'button/icon/text/menu', note: '操作菜单的按钮样式', default: 'text' },
			{ label: 'menuBtnTitle', tag: 2, type: 'String', note: '菜单按钮的文字信息', default: '功能' },
			{ label: 'menuBtn', tag: 1, type: 'Boolean', note: '表单操作菜单的显影', select: 'true/false', default: 'true' },
			{ label: 'menuSpan', tag: 1, type: 'Number', note: '表单操作菜单栅格占据的列数', default: '24' },
			{ label: 'menuPosition', type: 'String', tag: 1, select: 'left/center/right', note: '表单菜单按钮的排列方式', default: 'center' },
			{ label: 'menuTitle', tag: 2, type: 'String', note: '操作列的文字', default: '操作', href: '/crud/crud-text' },
			{
				label: 'menuFixed',
				tag: 2,
				version: '2.6.7',
				select: 'true/false/left/right',
				type: 'Boolean',
				note: '操作列是否冻结',
				default: 'right'
			},
			{ label: 'printBtn', tag: 2, select: 'true/false', type: 'Boolean', note: '表格打印导出按钮', default: 'false' },
			{
				label: 'copyBtn',
				tag: 2,
				select: 'true/false',
				type: 'Boolean',
				note: '表格行数据复制按钮',
				default: 'false',
				href: '/crud/crud-menu.html#复制按钮'
			},
			{ label: 'refreshBtn', tag: 2, select: 'true/false', type: 'Boolean', note: '刷新按钮', default: 'true' },
			{ label: 'saveBtn', tag: 2, select: 'true/false', type: 'Boolean', note: '保存按钮', default: 'true' },
			{ label: 'group', type: 'Array', note: '分组表单,放入正常的column配置就行', href: '/form/form-group' },
			{ label: 'updateBtn', tag: 2, select: 'true/false', type: 'Boolean', note: '更新按钮', default: 'true' },
			{ label: 'cancelBtn', tag: 2, select: 'true/false', type: 'Boolean', note: '取消按钮', default: 'true' },
			{
				label: 'selection',
				tag: 2,
				select: 'true/false',
				type: 'Boolean',
				note: '表格勾选列',
				default: 'false',
				href: '/crud/crud-row.html行多选'
			},
			{ label: 'selectionWidth', tag: 2, type: 'Number', note: '表格勾选列的宽度', default: '50' },
			{ label: 'selectionFixed', tag: 2, select: 'true/false', version: '2.6.7', type: 'Boolean', note: '表格勾选列', default: 'true' },
			{ label: 'searchBtn', tag: 2, select: 'true/false', type: 'Boolean', note: '搜索显隐按钮', default: 'true' },
			{ label: 'columnBtn', tag: 2, select: 'true/false', type: 'Boolean', note: '表格右侧操作列显隐的按钮', default: 'true' },
			{
				label: 'selectable',
				tag: 2,
				type: 'Function',
				note: 'election为true 的列有效，类型为 Function，Function 的返回值用来决定这一行的 CheckBox 是否可以勾选',
				params: 'row, index'
			},
			{
				label: 'reserveSelection',
				tag: 2,
				select: 'true/false',
				type: 'Boolean',
				note: '仅对 selection为true  的列有效，类型为 Boolean，为 true 则会在数据更新之后保留之前选中的数据（需指定 rowKey）',
				default: 'true'
			},
			{
				label: 'selectClearBtn',
				tag: 2,
				select: 'true/false',
				type: 'Boolean',
				note: '清空选中按钮（当selection为true起作用）',
				default: 'true'
			},
			{ label: 'showHeader', tag: 2, select: 'true/false', type: 'Boolean', note: '是否显示表格的表头', default: 'true' },
			{ label: 'showSummary', tag: 2, select: 'true/false', type: 'Boolean', note: '是否在表尾显示合计行', default: 'false' },
			{ label: 'size', select: 'medium/small/mini', type: 'String', note: '表格总控件大小', default: 'small' },
			{ label: 'sumColumnList', tag: 2, type: 'Array', note: '表格合计需要配置的字段' },
			{ label: 'stripe', tag: 2, select: 'true/false', type: 'Boolean', note: '表格条纹', default: 'false' },
			{ label: 'updateBtnTitle', tag: 2, type: 'String', note: '弹出框更新按钮标题', default: '修改' },
			{ label: 'viewBtn', tag: 2, select: 'true/false', type: 'Boolean', note: '查看按钮', default: 'false' },
			{ label: 'viewTitle', tag: 2, type: 'String', note: '查看窗口文案', default: '查看' },
			{ label: 'addBtnText', tag: 2, type: 'String', note: '新增按钮文案', default: '新增', href: '/crud/crud-text' },
			{ label: 'editBtnText', tag: 2, type: 'String', note: '编辑按钮文案', default: '编辑', href: '/crud/crud-text' },
			{ label: 'delBtnText', tag: 2, type: 'String', note: '删除按钮文案', default: '删除', href: '/crud/crud-text' },
			{ label: 'viewBtnText', tag: 2, type: 'String', note: '查看按钮文案', default: '查看', href: '/crud/crud-text' },
			{ label: 'searchBtnText', tag: 2, type: 'String', note: '搜索按钮文案', default: '搜索', href: '/crud/crud-text' },
			{ label: 'emptyBtnText', tag: 2, type: 'String', note: '清空按钮文案', default: '清空', href: '/crud/crud-text' },
			{ label: 'cancelBtnText', tag: 2, type: 'String', note: '取消按钮文案', default: '取消', href: '/crud/crud-text' },
			{ label: 'printBtnText', tag: 2, type: 'String', note: '打印按钮文案', default: '打印', href: '/crud/crud-text' },
			{ label: 'excelBtnText', tag: 2, type: 'String', note: '导出按钮文案', default: '导出', href: '/crud/crud-text' },
			{ label: 'updateBtnText', tag: 2, type: 'String', note: '修改按钮文案', default: '修改', href: '/crud/crud-text' },
			{ label: 'saveBtnText', tag: 2, type: 'String', note: '保存按钮文案', default: '保存', href: '/crud/crud-text' },
			{ label: 'dialogFullscreen', tag: 2, type: 'Boolean', select: 'true/false', note: '是否为全屏Dialog', default: 'false' },
			{ label: 'dialogCustomClass', tag: 2, type: 'String', select: '', note: 'dialogCustomClass' },
			{ label: 'dialogEscape', tag: 2, type: 'Boolean', select: 'true/false', note: '是否可以通过按下ESC关闭Dialog', default: 'true' },
			{ label: 'dialogClickModal', tag: 2, type: 'Boolean', select: 'true/false', note: '是否可以通过点击modal关闭Dialog', default: 'true' },
			{ label: 'dialogCloseBtn', tag: 2, type: 'Boolean', select: 'true/false', note: '是否显示关闭按钮', default: 'true' },
			{ label: 'dialogModal', tag: 2, type: 'Boolean', select: 'true/false', note: '是否需要遮罩层', default: 'true' },
			{
				label: 'dialogMenuPosition',
				tag: 2,
				version: '2.7.9',
				type: 'String',
				select: 'left/center/right',
				note: '弹出框按钮的位置',
				default: 'right'
			},
			{ label: 'dialogTop', tag: 2, type: 'String/Number', note: '弹出表单的弹窗具体顶部的距离', default: '25' },
			{
				label: 'dialogType',
				tag: 2,
				type: 'String',
				note: '弹出表单的类型',
				select: 'dialog/drawer',
				default: 'dialog',
				href: '/crud/crud-form.html打开表单方式'
			},
			{
				label: 'dialogDirection',
				tag: 2,
				type: 'String',
				note: 'Drawer 打开的方向',
				select: 'rtl/ltr/ttb/tbb',
				default: 'rtl',
				href: '/crud/crud-form.html打开表单方式'
			},
			{ label: 'dialogWidth', tag: 2, type: 'String/Number', note: '弹出表单的弹窗宽度', default: '69%' },
			{ label: 'dialogHeight', tag: 2, type: 'String/Number', note: '弹出表单的弹窗高度', default: 'auto' },
			{ label: 'searchShow', tag: 2, type: 'Boolean', select: 'true/false', note: '首次加载是否显示搜索', default: 'true' },
			{ label: 'searchShowBtn', tag: 2, type: 'Boolean', select: 'true/false', note: '搜索栏目折叠显隐按钮', default: 'true' },
			{
				label: 'searchEnter',
				tag: 2,
				version: '2.7.0',
				type: 'Boolean',
				select: 'true/false',
				note: '首次加载是否显示搜索',
				default: 'true'
			},
			{ label: 'searchIcon', tag: 2, version: '2.7.0', type: 'Boolean', select: 'true/false', note: '是否展示半收缩按钮', default: 'true' },
			{ label: 'searchIndex', tag: 2, version: '2.7.0', type: 'Number', note: '展示半收缩按钮的触发条件个数', default: '2' },
			{
				label: 'searchSize',
				tag: 2,
				version: '2.7.9',
				type: 'String',
				select: 'medium/small/mini',
				note: '搜索框整体布局大小',
				default: 'small'
			},
			{
				label: 'searchMenuPosition',
				tag: 2,
				version: '2.7.9',
				type: 'String',
				select: 'left/center/right',
				note: '搜索操作按钮的位置',
				default: 'right'
			},
			{ label: 'clearExclude', type: 'Array', version: '2.7.7', note: '重值不清空的字段' },
			{ label: 'submitBtn', type: 'Boolean', select: 'true/false', note: '提交按钮显隐', default: 'true' },
			{ label: 'submitText', type: 'String', note: '提交按钮文案', default: '提交' },
			{ label: 'emptyBtn', type: 'Boolean', select: 'true/false', note: '清空按钮显隐', default: 'true' },
			{ label: 'emptyText', type: 'String', note: '数据为空文案', default: '暂无数据', href: '/crud/crud-empty' }
		]
	},
	{
		label: 'before-open',
		tag: 2,
		params: 'done,type',
		type: 'Function',
		note: '打开前的回调，会暂停Dialog的打开function(done,type)，done用于关闭Dialog,type为当前窗口的类型',
		href: '/crud/crud-form.html#打开表单前'
	},
	{
		label: 'before-close',
		tag: 2,
		type: 'Function',
		params: 'done,type',
		note: '关闭前的回调，会暂停Dialog的关闭function(done,type)，done用于关闭Dialog,type为当前窗口的类型',
		href: '/crud/crud-form.html#关闭表单前'
	},
	{
		label: 'cell-class-name',
		tag: 2,
		type: 'Function',
		note: '单元格的className的回调方法，也可以使用字符串为所有单元格设置一个固定的className,function({row,column,rowIndex,columnIndex})'
	},
	{
		label: 'page',
		type: 'Object',
		tag: 2,
		note: '表格的分页数据(需要sync修饰符)',
		href: '/crud/crud-page',
		children: [
			{ label: 'total', type: 'Number', tag: 2, note: '总条数,如果为0的话不显示分页', default: 0 },
			{ label: 'currentPage', tag: 2, type: 'Number', note: '当前页数', default: 1 },
			{ label: 'background', tag: 2, type: 'Boolean', note: '是否为分页按钮添加背景色', default: !0 },
			{ label: 'pageSize', tag: 2, type: 'Number', note: '每页显示条目个数，支持.sync修饰符', default: 20 },
			{ label: 'pageSizes', tag: 2, type: 'Number', note: '分页的数组分段', default: '[10,20,30,50,100]' },
			{ label: 'pagerCount', tag: 2, type: 'Number', note: '页码按钮的数量，当总页数超过该值时会折叠', default: 5 }
		]
	},
	{
		label: 'permission',
		tag: 2,
		type: 'Array/Object/Function',
		note: '表格多个按钮权限控制，采用函数方式可以精确到行控制',
		href: '/crud/crud-permission'
	},
	{ label: 'search', tag: 2, type: 'Object', note: '表格搜索的表单的变量(需要sync修饰符)' },
	{
		label: 'header-cell-class-name',
		tag: 2,
		type: 'Function',
		note: '表头单元格的className的回调方法，也可以使用字符串为所有表头单元格设置一个固定的className,function({row,column,rowIndex,columnIndex})'
	},
	{
		label: 'row-class-name',
		tag: 2,
		type: 'Function',
		note: '行的className的回调方法，也可以使用字符串为所有行设置一个固定的className,function({row,rowIndex})'
	},
	{ label: 'span-method', tag: 2, type: 'Function', note: '合并行或列的计算方法Function({row,column,rowIndex,columnIndex})' },
	{ label: 'summary-method', tag: 2, type: 'Function', note: '自定义的合计计算方法Function({columns,data})' },
	{ label: 'table-loading', tag: 2, type: 'Boolean', note: '表格等待框的控制', default: !1 },
	{
		label: 'upload-before',
		type: 'Function',
		note: '图片上传前的回调,会暂停图片上传function(file,done,loading)，done用于继续图片上传，loading用于中断操作',
		href: '/form/form-upload'
	},
	{
		label: 'upload-after',
		type: 'Function',
		note: '图片上传后的回调,function(res,done)，done用于结束操作，loading用于中断操作',
		href: '/form/form-upload'
	},
	{
		label: 'upload-delete',
		type: 'Function',
		note: '删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止删除。function(file,column)',
		href: '/form/form-upload'
	},
	{ label: 'upload-preview', type: 'Function', note: '查看前的回调function(file,column,done)', href: '/form/form-upload' },
	{ label: 'upload-error', type: 'Function', note: '上传失败错误回调function(error,column)', href: '/form/form-upload' },
	{ label: 'upload-exceed', type: 'Function', note: '上传超过长度限制回调function(limit,files,fileList,column)', href: '/form/form-upload' }
]

export const eventList = [
	{ label: 'submit', tag: 1, params: 'form,done', note: '表单提交回调事件' },
	{ label: 'reset-change', tag: 1, note: '表单重置回调事件' },
	{ label: 'row-update', tag: 2, params: 'row,index,done,loading', note: '编辑数据后确定触发该事件' },
	{ label: 'row-save', tag: 2, params: 'row,done,loading', note: '新增数据后点击确定触发该事件' },
	{ label: 'row-del', tag: 2, params: 'row,index', note: '行数据删除时触发该事件' },
	{
		label: 'refresh-change',
		tag: 2,
		note: '点击刷新按钮触发该事件(由于page分页信息和search搜索信息是sync修饰符，可以直接通过this.page和this.search拿到)'
	},
	{
		label: 'search-change',
		tag: 2,
		params: 'form,done',
		note: '点击搜索后触发该事件(由于page分页信息和search搜索信息是sync修饰符，可以直接通过this.page和this.search拿到)'
	},
	{ label: 'search-reset', tag: 2, note: '清空搜索回调方法' },
	{ label: 'current-change', tag: 2, params: 'currentPage', note: '分页页码改变时会触发' },
	{ label: 'size-change', tag: 2, params: 'pageSize', note: 'pageSize改变时会触发' },
	{ label: 'select', tag: 2, params: 'selection,row', note: '当用户手动勾选数据行的Checkbox时触发的事件' },
	{ label: 'selectAll', tag: 2, params: 'selection', note: '当选择项发生变化时会触发该事件' },
	{ label: 'selectionChange', tag: 2, params: 'selection', note: '当选择项发生变化时会触发该事件' },
	{ label: 'dateChange', tag: 2, params: 'date', note: '表格日期选择范围回调方法' },
	{
		label: 'filterChange',
		tag: 2,
		params: 'filters',
		note: '当表格的筛选条件发生变化的时候会触发该事件，参数的值是一个对象，对象的key是column的columnKey，对应的value为用户选择的筛选条件的数组。'
	},
	{ label: 'cell-mouse-enter', tag: 2, params: 'row,column,cell,event', note: '当单元格hover进入时会触发该事件' },
	{ label: 'cell-mouse-leave', tag: 2, params: 'row,column,cell,event', note: '当单元格hover退出时会触发该事件' },
	{ label: 'cell-click', tag: 2, params: 'row,column,cell,event', note: '当某个单元格被点击时会触发该事件' },
	{ label: 'cell-dblclick', tag: 2, params: 'row,column,cell,event', note: '当某个单元格被双击击时会触发该事件' },
	{ label: 'row-click', tag: 2, params: 'row, column, event', note: '当某一行被点击时会触发该事件' },
	{ label: 'row-dblclick', tag: 2, params: 'row, column, event', note: '当某一行被双击时会触发该事件' },
	{ label: 'sort-change', tag: 2, params: '{column,prop,order}', note: '当表格的排序条件发生变化的时候会触发该事件' },
	{
		label: 'toggleRowExpansion',
		tag: 2,
		params: 'row,expanded',
		note: '用于可展开表格与树形表格，切换某一行的展开状态，如果使用了第二个参数，则是设置这一行展开与否（expanded为true则展开）'
	}
]

export const slotList = [
	{
		label: '列名称',
		note: '表格模式下为列自定义内容，表单模式下为表单子自定义内容，参数为{row,column,label,dic,index,disabled,readonly,size}',
		href: '/crud/crud-column.html#自定义列'
	},
	{
		label: '列名称Form(nameForm)',
		tag: 2,
		note: '表格模式下表单自定义列的内容，参数为{row,column,label,dic,index,disabled,readonly,size}',
		href: '/crud/crud-form.html#自定义表单'
	},
	{
		label: '列名称Type(nameType)',
		note: '表单自定义列的内容，参数为{row,column,label,value}',
		href: '/form/form-select.html#自定义节点内容'
	},
	{ label: '列名称Header(nameHeader)', tag: 2, note: '表单自定义列的内容，参数为{column}', href: '/crud/crud-head.html#自定义列表头' },
	{ label: 'empty', tag: 2, note: '暂无数据的自定义卡槽', href: '/crud/crud-empty' },
	{ label: 'expand', tag: 2, note: '折叠板的自定义内容,参数为{row,label,dic,index}', href: '/crud/crud-row.html#展开行' },
	{ label: 'menu', tag: 2, note: '菜单的操作按钮自定义内容,参数为{row,label,dic,index}', href: '/crud/crud-menu' },
	{
		label: 'menuForm',
		note: '表单操作按钮的自定义内容,参数为{row,label,dic,$index}',
		href: 'https://avuejs.com/crud/crud-btn-slot.html#自定义弹窗内按钮'
	},
	{ label: 'header', tag: 2, note: '表格区域头部自定义卡槽', href: '/crud/crud-default.html#其它自定义卡槽' },
	{ label: 'footer', tag: 2, note: '表格区域尾部自定义卡槽', href: '/crud/crud-default.html#其它自定义卡槽' },
	{ label: 'page', tag: 2, note: '表格分页区域自定义卡槽', href: '/crud/crud-default.html#其它自定义卡槽' },
	{ label: 'menuLeft', tag: 2, note: '表格头部左侧内容卡槽', href: '/crud/crud-head.html#自定义菜单栏左边' },
	{ label: 'menuRight', tag: 2, note: '表格头部右侧内容', href: '/crud/crud-head.html#自定义菜单栏右边' },
	{ label: 'menuBtn', tag: 2, note: '操作栏目下拉菜单自定义(要用el-dropdown-item组件包裹起来),参数为{row,label,dic，index}' },
	{ label: 'search', tag: 2, note: '表格搜索区域自定义卡槽', href: '/crud/crud-search.html#自定义搜索卡槽' },
	{ label: 'searchMenu', tag: 2, note: '表格搜索区域搜索按钮自定义卡槽', href: '/crud/crud-search.html#自定义搜索卡槽' }
]

export const methodsList = [
	{ label: 'init', note: '重新初始化（多数用于服务端加载或者更新网络字典）', href: '/crud/crud-reload' },
	{ label: 'dicInit', note: '重新初始化字典，当type为cascader,更新级联字典', href: '/crud/crud-dic' },
	{ label: 'updateDic', note: '更新字典', href: '/form/form-dic' },
	{ label: 'clearValidate', note: '清空表格中表单验证' },
	{ label: 'rowAdd', tag: 2, note: '打开表单新增窗口' },
	{ label: 'getPropRef', params: 'prop', note: '获取prop的ref对象Function(prop)', href: '/crud/crud-form.html#组件对象' },
	{ label: 'rowSave', tag: 2, params: 'row,done,loading', note: '表单保存调用Function(row,done,loading)' },
	{ label: 'rowUpdate', tag: 2, params: 'row,index,done,loadings', note: '表单更新调用Function(row,index,done,loading)' },
	{ label: 'rowView', tag: 2, params: 'row,index', note: '打开表单查看窗口Function(row,index)' },
	{ label: 'rowEdit', tag: 2, params: 'row,index', note: '打开表单编辑窗口Function(row,index)' },
	{ label: 'rowCell', tag: 2, note: '打开行编辑Function(row,index)' },
	{ label: 'rowPrint', tag: 2, note: '打印表格' },
	{ label: 'rowExcel', tag: 2, note: '导出表格' },
	{ label: 'submit', tag: 1, note: '提交表单数据' },
	{ label: 'resetForm', tag: 1, note: '清空表单数据(只有打开编辑的dialog才可以操作)' },
	{
		label: 'validate',
		tag: 1,
		params: 'valid,done',
		note: '对整个表单进行校验的方法，validate((valid,done,msg)=>{}),done用于重置表单的禁止状态,msg为错误的校验信息'
	},
	{
		label: 'setCurrentRow',
		tag: 2,
		note: '用于单选表格，设定某一行为选中行，如果调用时不加参数，则会取消目前高亮行的选中状态。Function(row)'
	},
	{ label: 'selectClear', tag: 2, note: '用于多选表格，清空用户的选择' },
	{ label: 'searchReset', tag: 2, note: '清空搜索栏目的值' },
	{ label: 'toggleSelection', tag: 2, note: '用于多选表格，切换所有行的选中状态' },
	{ label: 'doLayout', tag: 2, note: '对Crud进行重新布局。当 Table 或其祖先元素由隐藏切换为显示时，可能需要调用此方法' },
	{ label: 'refreshTable', tag: 2, note: '对Crud进行重新布局。当 Table 或其祖先元素由隐藏切换为显示时，可能需要调用此方法' }
]
