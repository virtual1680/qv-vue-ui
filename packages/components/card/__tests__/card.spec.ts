import { mount } from '@vue/test-utils'
import Card from '../src/index.vue'

const AXIOM = 'Rem is the best girl'

describe('Card.vue', () => {
  test('render test', () => {
    const wrapper = mount(Card, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
