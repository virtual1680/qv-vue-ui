import type { QvColumn } from '@qv-vue/types/qvue-ui'
import type { PropType } from 'vue'
import type Tabs from './tabs.vue'
export interface TabsProps {
	position: string
	type: string
	column: QvColumn
}
export const tabsProps = {
	option: Object as PropType<TabsProps>
}
export type TabsInstance = InstanceType<typeof Tabs>
