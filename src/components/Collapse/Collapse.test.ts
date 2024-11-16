import { describe, test } from "vitest";
import { h } from 'vue';
import { mount } from "@vue/test-utils";
import Collapse from "./Collapse.vue";
import CollapseItem from "./CollapseItem.vue";

describe("Collapse.vue", () => {
  test('basic collapse', () => {
    const wrapper = mount(Collapse, {
      props: {
        modelValue: ['1']
      },
      slots: {
        default: () => [h(CollapseItem, { name: '1', title: 'Title A' }, 'content a')]
      },
      global: {
        stubs: ['Icon']
      }
    })
    console.log(wrapper.html());
  })
})