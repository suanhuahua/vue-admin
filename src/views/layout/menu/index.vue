<template>
  <template v-for="(item, index) in menuList" :key="item.path">
    <!-- 一级菜单 -->
    <template v-if="!item.children" :key="item.path">
      <el-menu-item :index="item.path" v-if="!item.meta.hidden" @click="goRoute">
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <!-- 只有一个子项，直接渲染子项 -->
    <template v-if="item.children && item.children.length === 1">
      <el-menu-item :index="item.children[0].path" v-if="!item.children[0].meta.hidden" @click="goRoute">
        <el-icon>
          <component :is="item.children[0].meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.children[0].meta.title }}</span>
        </template>
      </el-menu-item>
    </template>

    <!-- 多个子项，递归渲染 -->
    <el-sub-menu v-else-if="item.children && item.children.length > 1" :index="item.path">
      <template #title>
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <Menu :menuList="item.children"></Menu>
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
defineProps(['menuList'])
defineOptions({ name: 'Menu' })
const router = useRouter()
const goRoute = (vc: any) => {
  router.push(vc.index)
}
</script>
<style lang="scss" scoped></style>
