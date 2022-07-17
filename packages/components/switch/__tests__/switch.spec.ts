import { mount } from '@vue/test-utils'
import Switch from '../src/index.vue'

const AXIOM = 'Rem is the best girl'

describe('Switch.vue', () => {
  test('render test', () => {
    const wrapper = mount(Switch, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
