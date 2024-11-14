<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Button from './components/Button/Button.vue'
import Collapse from './components/Collapse/Collapse.vue'
import CollapseItem from './components/Collapse/CollapseItem.vue'
import Item from './components/Collapse/CollapseItem.vue'
import Icon from './components/Icon/Icon.vue'

const opendValue = ref(['a'])
</script>

<template>
  <div>
    <Button type="primary" size="lg" loading>Primary</Button>
    <Button type="danger" size="lg" icon="arrow-up">Primary</Button>

    <Icon icon="arrow-up" type="primary" spin size="48px" />

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
