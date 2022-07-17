import { mount } from '@vue/test-utils'
import Date from '../src/index.vue'

const AXIOM = 'Rem is the best girl'

describe('Date.vue', () => {
  test('render test', () => {
    const wrapper = mount(Date, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
