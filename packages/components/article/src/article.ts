import type { PropType } from 'vue'
import type Article from './article.vue'
export interface ArticleProps {
	title: string
	meta: string
	lead: string
	body: string
}
const propsDefault = {
	title: 'title',
	meta: 'meta',
	lead: 'lead',
	body: 'body'
}
export const articleProps = {
	data: Object as PropType<ArticleProps>,
	props: {
		type: Object as PropType<ArticleProps>,
		default: () => {
			return propsDefault
		}
	}
}
export type ArticleInstance = InstanceType<typeof Article>
