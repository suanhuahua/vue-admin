<template>
  <div class="logo">
    <img @click="init" src="@\assets\images\logo.jpg" alt="" />
    <p v-show="!fold">硅谷甄选管理系统平台</p>
  </div>
</template>

<script setup lang="ts">
defineProps(['fold'])
import { ElLoading } from 'element-plus'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const fullscreenLoading = ref(false)
const router = useRouter()
fullscreenLoading.value = true
function init() {
  // 打开全屏加载
  const loadingInstance = ElLoading.service({
    fullscreen: true,
    lock: true,
    text: '加载中...'
  })
  setTimeout(() => {
    loadingInstance.close() // 关闭加载
    router.push('/')
  }, 200)
}

</script>
<style lang="scss" scoped>
.logo {
  display: flex;
  align-items: center;
  padding-left: 5px;
  margin-top: 10px; // 这里logo相对于菜单栏来说是子元素 当给子元素添加margin-top 父元素也会受到影响 解决方法是在父容器加overflfow属性

  img {
    cursor: pointer;
    width: 50px;
  }
  p {
    overflow: hidden;
    margin-left: 6px;
    font-size: 18px;
    color: white;
  }
}
</style>
