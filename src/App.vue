<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Button from './components/Button/Button.vue'

const btn = ref()
onMounted(() => {
  console.log(btn.value.ref)
})
</script>

<template>
  <div>
    <Button type="success" plain ref="btn" :loading="true">哈哈哈哈</Button>
  </div>
</template>

<style scoped></style>
