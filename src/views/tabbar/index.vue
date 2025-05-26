<template>
  <div class="tabbar">
    <div class="tabbar_left">
      <breadcrumb></breadcrumb>
    </div>
    <div class="tabbar_right">
      <setting></setting>
    </div>
  </div>
</template>

<script setup lang="ts">
import breadcrumb from '@/views/tabbar/breadcrumb/index.vue'
import setting from '@/views/tabbar/setting/index.vue'
</script>
<style lang="scss" scoped>
.tabbar {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  background-color: linear-gradient(to right, white, black, white);
  .tabbar_left {
    padding-left: 10px;
    display: flex;
    align-items: center;
  }
  .tabbar_right {
    display: flex;
    align-items: center;
    img {
      width: 30px;
      height: 30px;
    }
  }
}
</style>
