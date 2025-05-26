<template>
  <el-card>
    <div class="card">
      <img :src="userStore.avatar" alt="" style="width: 200px; border-radius: 50%" />
      <div class="title">
        <span>{{ nowtime }}!</span>
        <span>{{ userStore.username }}</span>
      </div>
    </div>
  </el-card>
  <div class="bottom">
    <svg-icon name="welcome" width="500px" height="500px"></svg-icon>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useUserStore from '@/store/modules/user'
import { getTime } from '@/utils/time'
let userStore = useUserStore()
let nowtime = ref(getTime())
</script>
<style lang="scss" scoped>
.card {
  background-color: azure;
  display: flex;
  align-items: center;

  .title {
    padding-left: 20px;
    align-items: center;

    span {
      font-size: 20px;
      font-weight: bold;
    }
  }
}

.bottom {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
