import { mount } from '@vue/test-utils'
import InputIcon from '../src/index.vue'

const AXIOM = 'Rem is the best girl'

describe('InputIcon.vue', () => {
  test('render test', () => {
    const wrapper = mount(InputIcon, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
