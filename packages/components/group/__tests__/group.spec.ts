import { mount } from '@vue/test-utils'
import Group from '../src/index.vue'

const AXIOM = 'Rem is the best girl'

describe('Group.vue', () => {
  test('render test', () => {
    const wrapper = mount(Group, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
