import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Collapse from './Collapse.vue'
import CollapseItem from './CollapseItem.vue'

describe('Collapse.vue', () => {
  test('basic collapse', async () => {
    const wrapper = mount(
      () => (
        <Collapse modelValue={['a']}>
          <CollapseItem name="a" title="title a">
            content a
          </CollapseItem>
          <CollapseItem name="b" title="title b">
            content b
          </CollapseItem>
          <CollapseItem name="c" title="title c" disabled>
            content c
          </CollapseItem>
        </Collapse>
      ),
      {
        global: {
          stubs: ['Icon']
        },
        attachTo: document.body
      }
    )

    const headers = wrapper.findAll('.vk-collapse-item__header')
    const contents = wrapper.findAll('.vk-collapse-item__content')

    // 长度
    expect(headers.length).toBe(3)
    expect(contents.length).toBe(3)

    // 文本
    const firstHeader = headers[0]
    const secondHeader = headers[1]
    expect(headers[0].text()).toBe('title a')

    // 内容
    const firstContent = contents[0]
    const secondContent = contents[1]
    const disabledContent = contents[2]
    expect(firstContent.isVisible()).toBeTruthy()
    expect(secondContent.isVisible()).toBeFalsy()

    // 行为 默认展开第一条
    await firstHeader.trigger('click') // 点击第一条
    expect(firstContent.isVisible()).toBeFalsy() // 点击第一条后内容隐藏
    await secondHeader.trigger('click') // 点击第二条
    expect(secondContent.isVisible()).toBeTruthy() // 点击第二条后内容显示

    // disabled
    const disabledHeader = headers[2]
    expect(disabledHeader.classes()).toContain('is-disabled')
    await disabledHeader.trigger('click')
    expect(disabledContent.isVisible()).toBeFalsy() // disabled条目 点击后不显示内容
  })
})
