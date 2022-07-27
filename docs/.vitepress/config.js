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
			{ text: '组件', link: '/components/forms/' },
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
				{ text: '表单(form)', link: '/components/forms/' },
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
