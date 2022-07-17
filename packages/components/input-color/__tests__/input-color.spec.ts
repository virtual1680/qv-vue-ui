import { mount } from '@vue/test-utils'
import InputColor from '../src/index.vue'

const AXIOM = 'Rem is the best girl'

describe('InputColor.vue', () => {
  test('render test', () => {
    const wrapper = mount(InputColor, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
