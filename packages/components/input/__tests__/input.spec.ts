import { mount } from '@vue/test-utils'
import Input from '../src/index.vue'

const AXIOM = 'Rem is the best girl'

describe('Input.vue', () => {
  test('render test', () => {
    const wrapper = mount(Input, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
