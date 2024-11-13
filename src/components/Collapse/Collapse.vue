<template>
  <div class="vk-collapse">
    <slot />
  </div>
</template>
<script setup lang="ts">
import type { NameType, CollapseProps, CollapseEmits } from './types'
import { ref, provide, watch } from 'vue'
import { collapseContextKey } from './types'

defineOptions({ name: 'VkCollapse' })

const props = defineProps<CollapseProps>()
const emits = defineEmits<CollapseEmits>()

// 当前激活的面板名称
const activeNames = ref<NameType[]>(props.modelValue || [])

watch(
  () => props.modelValue,
  () => {
    activeNames.value = props.modelValue
  }
)

// 手风琴模式下，只能有一个被展开
if (props.accordion && activeNames.value.length > 1) {
  console.warn('warning: accordion mode only allows one item to be expanded at a time.')
}

/**
 * 处理项目点击事件
 *
 * @param name 项目名称，类型为NameType
 */
const handleItemClick = (name: NameType) => {
  // 手风琴模式下，每次点击只允许展开一个
  if (props.accordion) {
    activeNames.value = activeNames.value[0] === name ? [] : [name]
  }
  // 非手风琴模式下，允许同时展开多个
  else {
    const index = activeNames.value.indexOf(name)
    if (index > -1) {
      // 存在则删除
      activeNames.value.splice(index, 1)
    } else {
      // 不存在则添加
      activeNames.value.push(name)
    }
  }

  emits('update:modelValue', activeNames.value)
  emits('change', activeNames.value)
}

provide(collapseContextKey, {
  activeNames,
  handleItemClick
})
</script>
