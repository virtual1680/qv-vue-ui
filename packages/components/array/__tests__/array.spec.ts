import { mount } from '@vue/test-utils'
import Array from '../src/index.vue'

const AXIOM = 'Rem is the best girl'

describe('Array.vue', () => {
  test('render test', () => {
    const wrapper = mount(Array, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
