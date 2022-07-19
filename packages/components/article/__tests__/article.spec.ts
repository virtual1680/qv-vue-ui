import { mount } from '@vue/test-utils'
import Article from '../src/index.vue'

const AXIOM = 'Rem is the best girl'

describe('Article.vue', () => {
  test('render test', () => {
    const wrapper = mount(Article, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
