<template>
  <el-icon style="margin-right: 10px; cursor: pointer" @click="changeIcon">
    <component :is="layoutSettingStore.fold ? 'Fold' : 'Expand'"></component>
  </el-icon>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item
      v-for="(item, index) in useRoute().matched"
      :key="index"
      style="cursor: pointer"
      v-show="item.meta.title"
      :to="item.path"
    >
      <el-icon style="margin-right: 2px">
        <component :is="item.meta.icon"></component>
      </el-icon>
      <span>{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import useLayoutSettingStore from '@/store/modules/setting'
import { useRoute } from 'vue-router'
const layoutSettingStore = useLayoutSettingStore()
function changeIcon() {
  layoutSettingStore.$state.fold = !layoutSettingStore.$state.fold
}
</script>
<style lang="scss" scoped></style>
