import { mount } from '@vue/test-utils'
import Temp from '../src/index.vue'

const AXIOM = 'Rem is the best girl'

describe('Temp.vue', () => {
  test('render test', () => {
    const wrapper = mount(Temp, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
