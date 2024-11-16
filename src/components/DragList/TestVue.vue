<template>
  <div>
    <DragList :data="ceshiData" :style="parentStyles" @finish-drag="handleDragListUpdated">
      <template #drag-item-data="{ item }">
        <DragItem :drag-item-data="item"></DragItem>
      </template>
    </DragList>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DragList from './DragList.vue'
import DragItem from './DragItem.vue'

const url =
  'https://infinityicon.infinitynewtab.com/icon/1676018043738.png?imageMogr2/thumbnail/176x/format/webp/blur/1x0/quality/100|imageslim'

const ceshiData = ref([
  { id: '1', name: '应用1', icon: url },
  { id: '2', name: '应用2', icon: url },
  { id: '3', name: '应用3', icon: url },
  { id: '4', name: '应用4', icon: url },
  { id: '5', name: '应用5', icon: url },
  { id: '6', name: '应用6', icon: url },
  { id: '7', name: '应用7', icon: url },
  { id: '8', name: '应用8', icon: url },
  { id: '9', name: '应用9', icon: url },
  { id: '10', name: '应用10', icon: url }
])

/**
 * 处理拖拽列表更新的事件
 *
 * @param updatedData 更新后的列表数据
 * @param draggedItemData 被拖拽的项的数据
 */
function handleDragListUpdated(updatedData, draggedItemData) {
  console.log(updatedData, draggedItemData)
}

const parentStyles = {
  '--drag-list-width': '800px',
  '--drag-list-border': '2px solid blue',
  '--drag-item-margin': '15px 40px',
  '--drag-item-img-size': '100px',
  '--drag-item-text-color': 'red',
  '--drag-item-text-size': '18px',
  '--drag-item-text-margin-top': '10px',
  '--grid-columns': '5',
  '--grid-gap': '20px'
}
</script>
