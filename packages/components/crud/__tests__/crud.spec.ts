import { mount } from '@vue/test-utils'
import Crud from '../src/index.vue'

const AXIOM = 'Rem is the best girl'

describe('Crud.vue', () => {
  test('render test', () => {
    const wrapper = mount(Crud, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
