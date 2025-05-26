<template>
  <svg :width="width" :height="height">
    <use :xlink:href="prefix + name" :style="{ fill: color }"></use>
  </svg>
</template>

<script setup lang="ts">
defineProps({
  prefix: {
    type: String,
    default: '#icon-'
  },
  name: String,
  color: {
    type: String,
    default: '#F00'
  },
  width: {
    type: String,
    default: '32px'
  },
  height: {
    type: String,
    default: '32px'
  }
})
</script>
<style lang="scss" scoped></style>
