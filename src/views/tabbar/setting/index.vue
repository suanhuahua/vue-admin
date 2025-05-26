<template>
  <el-button size="default" icon="refresh" color="white" circle @click="refreshView"> </el-button>
  <el-button size="default" icon="FullScreen" color="white" circle @click="toggleFullScreen"></el-button>
  <el-popover class="box-item" title="主题设置" placement="bottom">
    <el-form>
      <el-form-item label="主题颜色">
        <el-color-picker @change="setColor" size="small" v-model="color" show-alpha :predefine="predefineColors"
          :teleported="false" />
      </el-form-item>
      <el-form-item label="暗黑模式">
        <el-switch @change="changeDark" v-model="dark" size="small" active-icon="MoonNight" inactive-icon="Sunny"
          :inline-prompt="true" />
      </el-form-item>
    </el-form>
    <template #reference>
      <el-button size="default" icon="Setting" color="white" circle></el-button>

    </template>
  </el-popover>
  <img :src="userStore.avatar" style="width: 50px; border-radius: 50%" alt="" />
  <el-dropdown style="cursor: pointer; height: 24px; margin: 0 10px">
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="quit">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">

import useUserStore from '@/store/modules/user'
import { inject, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const $route = useRoute()
const $router = useRouter()
const userStore = useUserStore()
const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])
let dark = ref<boolean>(false)
const refreshView = inject('refreshView') as () => void
function toggleFullScreen() {
  const docElm = document.documentElement
  if (!document.fullscreenElement) {
    docElm.requestFullscreen && docElm.requestFullscreen()
  } else {
    document.exitFullscreen && document.exitFullscreen()
  }
}
// 退出业务：1.删除存放在localstorage的token 2.路由页面跳转到login
function quit() {
  userStore.userLogout()
  $router.push({ path: '/login', query: { redirect: $route.path } })
}
const changeDark = () => {
  let html = document.documentElement
  dark.value ? html.className = 'dark' : html.className = ''
}
const setColor = () => {
  let html = document.documentElement
  html.style.setProperty('--el-color-primary', color.value)
}
</script>
<style lang="scss" scoped></style>
