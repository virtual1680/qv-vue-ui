// docs/.vitepress/config.js
module.exports = {
	title: 'QvVue', // 站点名称
	description: 'A Component Library for Vue 3',
	base: '/', // 部署的基础路径
	head: [
		// 生成html的head配置：站点favicon...
	],
	themeConfig: {
		algolia: {
			// 展示搜索框
			appKey: '',
			indexName: '',
			searchParameters: {
				faeFilters: ['tags: guide, api']
			}
		},
		nav: [
			// 头部导航
			{ text: '指南', link: '/guide/intro/' },
			{ text: '组件', link: '/components/form/' },
			{ text: 'NPM', link: 'https://www.npmjs.com/package/qv-vue' }, // 外部链接有特定标识
			{
				text: 'Gitee',
				link: 'https://gitee.com/virtual1680/qv-vue-ui'
			},
			{
				text: 'Github',
				link: 'https://github.com/virtual1680/qv-vue-ui'
			} // 外部链接有特定标识
		],
		sidebar: {
			// 左侧菜单 路由
			'/guide/': [
				{ text: '介绍', link: '/guide/intro/' },
				{ text: '快速开始', link: '/guide/quickstart/' }
			],
			'/components/': [
				{
					text: '表单(form)',
					link: '/components/form/',
					children: [
						{ text: '基础用法', link: '/components/form/basics' },
						{ text: '函数用法', link: '/components/form/function' },
						{ text: '标题宽度', link: '/components/form/title-width' },
						{ text: '隐藏字段', link: '/components/form/display' },
						{ text: '自定义卡槽', link: '/components/form/custom-slot' },
						{ text: '数据默认值', link: '/components/form/data-default' },
						{ text: '数据验证', link: '/components/form/data-validate' },
						{ text: '数据字典', link: '/components/form/data-dic' },
						{ text: '数据类型', link: '/components/form/data-type' },
						{ text: '数据过滤', link: '/components/form/data-filter' },
						{ text: '防重提交', link: '/components/form/submit' },
						{ text: '字段排序', link: '/components/form/order' },
						{ text: '引入三方组件', link: '/components/form/component' },
						{ text: '组件事件', link: '/components/form/component-event' },
						{ text: '分组展示', link: '/components/form/group' },
						{ text: '选项卡展示', link: '/components/form/tabs' },
						{ text: '控制其它字段', link: '/components/form/control' },
						{ text: '辅助提示语', link: '/components/form/tip' }
					]
				},
				{ text: '表单(crud)', link: '/components/crud/' }
				// -- append sidebar --
			]
		}
	},
	markdown: {
		// =展开收起
		config: md => {
			const { demoBlockPlugin } = require('vitepress-theme-demoblock')
			md.use(demoBlockPlugin)
		}
	},
	lastUpdated: '上次更新' // 获取每个文件最后一次 git 提交的 UNIX 时间戳(ms)，同时它将以合适的日期格式显示在每一页的底部
}
