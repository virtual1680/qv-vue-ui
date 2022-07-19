import { mount } from '@vue/test-utils'
import Img from '../src/index.vue'

const AXIOM = 'Rem is the best girl'

describe('Img.vue', () => {
  test('render test', () => {
    const wrapper = mount(Img, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
