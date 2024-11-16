<template>
  <div class="drag-item" draggable="true" :data-id="dragItemData.id">
    <div class="drag-item-img-container">
      <img draggable="false" class="drag-item-img" :src="dragItemData.icon" :alt="dragItemData.name" />
    </div>
    <div class="drag-item-text">{{ dragItemData.name }}</div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { DragItemType } from './types'

defineProps({
  dragItemData: {
    type: Object as PropType<DragItemType>,
    required: true
  }
})
</script>

<style scoped lang="less">
.drag-item {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: var(--drag-item-margin, 15px); /* Default margin */
  cursor: pointer;
  transition: opacity 0.3s ease;

  .drag-item-img-container {
    height: var(--drag-item-img-size, 60px); /* Default image size */
    width: var(--drag-item-img-size, 60px);

    .drag-item-img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }

  .drag-item-text {
    margin-top: var(--drag-item-text-margin-top, 8px);
    font-size: var(--drag-item-text-size, 14px);
    color: var(--drag-item-text-color, aliceblue); /* Default text color */
  }
}

.dragging {
  opacity: 0;
  background-color: transparent;
  color: transparent;
  img {
    display: none;
  }
  .drag-item-img-container {
    background-color: transparent;
  }
  .drag-item-text {
    color: transparent;
  }
}
</style>
