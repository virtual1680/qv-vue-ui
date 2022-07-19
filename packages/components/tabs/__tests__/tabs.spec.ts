import { mount } from '@vue/test-utils'
import Tabs from '../src/index.vue'

const AXIOM = 'Rem is the best girl'

describe('Tabs.vue', () => {
  test('render test', () => {
    const wrapper = mount(Tabs, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
