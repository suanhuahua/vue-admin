<template>
  <div class="login_container">
    <el-row>
      <!-- element-plus里面分成24分，左侧的文字占12份，右侧的文字占12份 如果屏幕尺寸小于768 则左侧的文字不显示（占0份） 右侧占全部（24份）  -->
      <el-col :span="12" :xs="0">左侧的文字</el-col>
      <el-col :span="12" :xs="24">右侧的文字
        <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginForms">
          <h1>hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
          <el-form-item prop="username">
            <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" :prefix-icon="Lock" v-model="loginForm.password" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button v-loading.fullscreen.lock="fullscreenLoading" :loading="loading" class="login_button"
              type="primary" size="default" @click="userlogin(loginForm)">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
  <router-view></router-view>
</template>
<script lang="ts" setup>
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref, onMounted } from 'vue'
import type { loginForm } from '@/api/user/type'
import useUserStore from '@/store/modules/user'
import { useRoute, useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import { getTime } from '@/utils/time'
import validateUserName from '@/utils/validateUserName'
let loginForms = ref()
let loading = ref(false)
let $route = useRoute()
let $router = useRouter()
let loginForm = reactive({ username: 'admin', password: '111111' })
const userStore = useUserStore()
const fullscreenLoading = ref(false)

const userlogin = async (loginForm: loginForm) => {
  // 通过表单验证才发送请求
  try {
    await loginForms.value.validate()
  } catch (error) {
    return
  }
  fullscreenLoading.value = true
  setTimeout(() => {
    fullscreenLoading.value = false
    loading.value = true
    userStore.userLogin(loginForm).then(
      res => {
        ElNotification({
          type: 'success',
          message: '登录成功',
          title: getTime()
        })
        $router.push({ path: typeof $route.query.redirect === 'string' ? $route.query.redirect : '/' })
        loading.value = false
      },

      error => {
        loading.value = false
        ElNotification({
          type: 'error',
          message: error.message
        })
      }
    )
  }, 200)
}

//表单校验 这里的属性名一定要和prop loginForm里的username一样
const rules = reactive({
  username: [
    {
      required: true,
      message: '输入格式不正确，要求2-7位字符，且以字母开头，不能是纯数字',
      trigger: 'blur',
      validator: validateUserName
    }
  ],
  password: [
    { required: true, message: 'Please input Activity password', trigger: 'blur' },
    { min: 6, max: 10, message: 'Length should be 6 to 10', trigger: 'blur' }
  ]
})
</script>
<style lang="scss" scoped>
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;

  .login_form {
    position: relative; //relative：相对于原来位置移动，元素设置此属性之后仍然处在文档流中，不影响其他元素的布局
    top: 30vh;
    // background-color: red;
    width: 80%;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    padding: 40px;

    h1 {
      color: white;
      font-size: 40px;
    }

    h2 {
      font-size: 20px;
      color: white;
      margin: 20px 0;
    }

    .login_button {
      width: 100%;
    }
  }
}
</style>
