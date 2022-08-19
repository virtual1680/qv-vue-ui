/*
 * @Author: qinhongyang virtual1680@gmail.com
 * @Date: 2022-08-18 08:51:31
 * @LastEditTime: 2022-08-19 14:06:53
 * @Description: 暂无
 */
// For this project development
import '@vue/runtime-core'

declare module '@vue/runtime-core' {
	// GlobalComponents for Volar
	export interface GlobalComponents {
		QvRate: typeof import('qv-vue')['QvRate']
		QvCard: typeof import('qv-vue')['QvCard']
		QvCheckbox: typeof import('qv-vue')['QvCheckbox']
		QvDate: typeof import('qv-vue')['QvDate']
		QvGroup: typeof import('qv-vue')['QvGroup']
		QvInput: typeof import('qv-vue')['QvInput']
		QvInputColor: typeof import('qv-vue')['QvInputColor']
		QvInputIcon: typeof import('qv-vue')['QvInputIcon']
		QvInputNumber: typeof import('qv-vue')['QvInputNumber']
		QvRadio: typeof import('qv-vue')['QvRadio']
		QvSelect: typeof import('qv-vue')['QvSelect']
		QvSwitch: typeof import('qv-vue')['QvSwitch']
		QvTime: typeof import('qv-vue')['QvTime']
		QvArray: typeof import('qv-vue')['QvArray']
		QvArticle: typeof import('qv-vue')['QvArticle']
		QvCarousel: typeof import('qv-vue')['QvCarousel']
		QvCascader: typeof import('qv-vue')['QvCascader']
		QvImg: typeof import('qv-vue')['QvImg']
		QvTabs: typeof import('qv-vue')['QvTabs']
		QvCrud: typeof import('qv-vue')['QvCrud']
		QvForm: typeof import('qv-vue')['QvForm']
	}

	interface ComponentCustomProperties {
		$dialogForm: typeof import('qv-vue')['QvDialogForm']
	}
}

export {}
