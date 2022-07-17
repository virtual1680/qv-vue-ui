import type Group from './group.vue'

export const groupProps = {
  arrow: {
    type: Boolean,
    default: true,
  },
  collapse: {
    type: Boolean,
    default: true,
  },
  header: {
    type: Boolean,
    default: true,
  },
  icon: String,
  display: {
    type: Boolean,
    default: true,
  },
  card: {
    type: Boolean,
    default: false,
  },
  label: String,
}
export type GroupInstance = InstanceType<typeof Group>
