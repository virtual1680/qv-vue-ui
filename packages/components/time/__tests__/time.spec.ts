import { mount } from '@vue/test-utils'
import Time from '../src/index.vue'

const AXIOM = 'Rem is the best girl'

describe('Time.vue', () => {
  test('render test', () => {
    const wrapper = mount(Time, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
