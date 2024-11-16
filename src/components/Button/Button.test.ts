import { describe, expect, test } from "vitest";
import { mount } from '@vue/test-utils';
import Button from "./Button.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Icon from "../Icon/Icon.vue";


describe('Button.vue', () => {
  test('basic button', () => {
    const wrapper = mount(Button, {
      props: {
        type: 'primary'
      },
      slots: {
        default: '我是按钮文案'
      }
    })
    console.log(wrapper.html());
    expect(wrapper.classes()).toContain('vk-button--primary')
    expect(wrapper.get('button').text()).toBe('我是按钮文案')
    wrapper.get('button').trigger('click')
    console.log(wrapper.emitted())
  })

  test('disabled button', () => {
    const wrapper = mount(Button, {
      props: {
        disabled: true
      },
      slots: {
        default: '我是按钮文案'
      }
    })
    // 判断是否添加了disabled属性
    expect(wrapper.attributes('disabled')).toBeDefined()
    expect(wrapper.find('button').element.disabled).toBeDefined()
    wrapper.get('button').trigger('click')
    expect(wrapper.emitted()).not.toHaveProperty('click')

  })

  // 测试icon按钮
  test('icon button', () => {
    const wrapper = mount(Button, {
      props: {
        icon: 'arrow-up' // button中的icon图标
      },
      slots: { // button文本  
        default: 'icon'
      },
      global: {
        stubs: ['FontAwesomeIcon'] // 引入FontAwesomeIcon图标icon组件,否则测试用例会提示找不到FontAwesomeIcon组件的错误
      }
    })
    console.log(wrapper.html())
    const iconElement = wrapper.findComponent(FontAwesomeIcon)
    expect(iconElement.exists()).toBeTruthy() // 判断是否存在icon组件
    expect(iconElement.props('icon')).toBe('arrow-up') // 判断icon组件的icon属性是否为arrow-up
  })


  test('loding button', () => {
    const wrapper = mount(Button, {
      props: {
        loading: true
      },
      slots: { // button文本  
        default: 'loading'
      },
      global: {
        stubs: ['Icon']
      }
    })
    console.log(wrapper.html())
    const iconElement = wrapper.findComponent(Icon)
    expect(iconElement.exists()).toBeTruthy() // 判断是否存在icon组件
    expect(iconElement.attributes('icon')).toBe('spinner') // 判断是否存在icon组件
    expect(wrapper.attributes('disabled')).toBeDefined() // 判断icon组件的icon属性是否为arrow-up
  })
})