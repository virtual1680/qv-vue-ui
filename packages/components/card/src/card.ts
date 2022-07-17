import type { PropType } from 'vue'
import type Card from './card.vue'

export interface CardProps {
  option?: {
    span: number
    gutter: number
    addBtn: boolean
    props: { img: string; title: string; info: string }
  }
  data?: any[]
}

export const cardProps = {
  option: Object as PropType<CardProps['option']>,
  data: {
    type: Array as PropType<CardProps['data']>,
    default: () => [],
  },
}
export type CardInstance = InstanceType<typeof Card>
