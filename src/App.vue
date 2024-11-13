<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Button from './components/Button/Button.vue'
import Collapse from './components/Collapse/Collapse.vue'
import CollapseItem from './components/Collapse/CollapseItem.vue'
import Item from './components/Collapse/CollapseItem.vue'

const opendValue = ref(['a'])

setTimeout(() => {
  opendValue.value = ['a', 'b']
}, 2000)
</script>

<template>
  <div>
    <Collapse v-model="opendValue" accordion>
      <Item name="a" title="Title A">
        <h1>headline title</h1>
        <div>this is content a aaa</div>
      </Item>
      <Item name="b" title="Title B">
        <div>this is bbbbb test</div>
      </Item>
      <Item name="c" title="Disabled Title" disabled>
        <div>this is cccc test</div>
      </Item>
    </Collapse>
    {{ opendValue }}
  </div>
</template>

<style scoped></style>
