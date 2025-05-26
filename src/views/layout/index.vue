<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_slider" :class="{ fold: layoutSettingStore.fold ? true : false }">
      <logo :fold="layoutSettingStore.fold" />
      <el-scrollbar>
        <el-menu background-color="#001529" text-color="white" :default-active="useRoute().path"
          :collapse="layoutSettingStore.fold">
          <Menu :menuList="menuList"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div class="layout_nav" :class="{ fold: layoutSettingStore.fold ? true : false }">
      <tabbar></tabbar>
    </div>
    <!-- 内容展示 -->
    <div class="layout_main" :class="{ fold: layoutSettingStore.fold ? true : false }">
      <router-view :key="viewKey"></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import Menu from './menu/index.vue'
import logo from './logo/index.vue'
import useUserStore from '@/store/modules/user'
import { useRoute } from 'vue-router'
import tabbar from '@/views/tabbar/index.vue'
import useLayoutSettingStore from '@/store/modules/setting'
import { provide, ref } from 'vue'
let layoutSettingStore = useLayoutSettingStore()
let userStore = useUserStore()
const menuList = userStore.menuRoutes
const viewKey = ref(0)
function refreshView() {
  viewKey.value++
}
provide('refreshView', refreshView)
</script>
<style lang="scss" scoped>
//左侧菜单栏中的导航条
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  // justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  // background: var(--el-color-primary-light-9);
  color: white;
}

.layout_container {
  width: 100%;
  height: 100vh;

  .layout_slider {
    overflow: hidden;
    background-color: #001529;
    width: $layout_slider_width;
    height: 100vh;
    transition: all 0.3s;

    &.fold {
      width: 60px;
      transition: all 0.3s;
    }
  }

  .layout_nav {
    position: absolute;
    top: 0;
    left: $layout_slider_width;
    width: calc(100% - $layout_slider_width);
    height: $layout_nav_height;
    font-size: 12px;

    &.fold {
      width: calc(100vw - 60px);
      left: 60px;
      transition: all 0.3s;
    }
  }

  .layout_main {
    box-sizing: border-box;
    position: absolute;
    top: $layout_nav_height;
    left: $layout_slider_width;
    width: calc(100% - $layout_slider_width);
    height: calc(100vh - $layout_nav_height);
    padding: 20px;
    overflow: auto;

    &.fold {
      width: calc(100vw - 60px);
      left: 60px;
      transition: all 0.3s;
    }
  }
}
</style>
