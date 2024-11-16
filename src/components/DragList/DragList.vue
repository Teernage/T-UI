<template>
  <div v-drag-list="data" class="drag-list" @drag-list-updated="handleDragListUpdated">
    <slot v-for="item in data" :key="item.id" class="drag-item" :item="item" name="drag-item-data"></slot>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { vDragList } from './draggableList'
import type { DragItemType } from './types'

defineProps({
  data: {
    type: Array as PropType<DragItemType[]>,
    required: true,
    default: () => []
  }
})

const emits = defineEmits(['finishDrag'])

/**
 * 处理拖拽列表更新事件
 *
 * @param event 事件对象
 */
function handleDragListUpdated(event) {
  const { draggedItemData, updatedData } = event.detail
  emits('finishDrag', draggedItemData, updatedData)
}
</script>

<style scoped lang="less">
.drag-list {
  width: var(--drag-list-width, 500px);
  display: grid;
  grid-template-columns: repeat(var(--grid-columns, 6), 1fr);
  gap: var(--grid-gap, 40px);
}
</style>
