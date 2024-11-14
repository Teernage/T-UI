<template>
  <i class="vk-icon" :class="{ [`vk-icon--${type}`]: type }" :style="customStyles" v-bind="$attrs">
    <font-awesome-icon v-bind="filteredProps" />
  </i>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { omit } from 'lodash-es'
import { computed } from 'vue'
import type { IconProps } from './types'

defineOptions({
  name: 'VkIcon',
  inheritAttrs: false // 开启后父组件的属性会传递给子组件 如上面的所有props属性会传递给font-awesome-icon 注意使用给父组件的属性时需要使用v-bind="$attrs"防止一些属性失效的问题 如点击事件
})

const props = defineProps<IconProps>()
// 过滤掉不需要传递给font-awesome-icon的属性
const filteredProps = computed(() => omit(props, ['type', 'color']))

const customStyles = computed(() => {
  return props.color ? { color: props.color } : {}
})
</script>
