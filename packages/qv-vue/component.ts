/*
 * @Author: qinhongyang virtual1680@gmail.com
 * @Date: 2022-08-18 08:51:31
 * @LastEditTime: 2022-08-20 09:51:46
 * @Description: 暂无
 */
import { QvRate } from '@qv-vue/components/rate'
import { QvTempForm } from '@qv-vue/components/temp'
import { QvCard } from '@qv-vue/components/card'
import { QvCheckbox } from '@qv-vue/components/checkbox'
import { QvDate } from '@qv-vue/components/date'
import { QvGroup } from '@qv-vue/components/group'
import { QvInput } from '@qv-vue/components/input'
import { QvInputColor } from '@qv-vue/components/input-color'
import { QvInputIcon } from '@qv-vue/components/input-icon'
import { QvInputNumber } from '@qv-vue/components/input-number'
import { QvRadio } from '@qv-vue/components/radio'
import { QvSelect } from '@qv-vue/components/select'
import { QvSwitch } from '@qv-vue/components/switch'
import { QvTime } from '@qv-vue/components/time'
import { QvUpload } from '@qv-vue/components/upload'
import { QvArray } from '@qv-vue/components/array'
import { QvArticle } from '@qv-vue/components/article'
import { QvCarousel } from '@qv-vue/components/carousel'
import { QvCascader } from '@qv-vue/components/cascader'
import { QvTabs } from '@qv-vue/components/tabs'
import { QvImg } from '@qv-vue/components/img'
import { QvCrud } from '@qv-vue/components/crud'
import { QvForm } from '@qv-vue/components/form'
import { QvDialogForm } from '@qv-vue/components/form/index-dialog-form'
import type { Plugin } from 'vue'

export default [
	QvRate,
	QvTempForm,
	QvCard,
	QvCheckbox,
	QvDate,
	QvGroup,
	QvInput,
	QvInputColor,
	QvInputIcon,
	QvInputNumber,
	QvRadio,
	QvSelect,
	QvSwitch,
	QvTime,
	QvUpload,
	QvCrud,
	QvArray,
	QvArticle,
	QvCarousel,
	QvTabs,
	QvCascader,
	QvImg,
	QvForm,
	QvDialogForm
] as Plugin[]
