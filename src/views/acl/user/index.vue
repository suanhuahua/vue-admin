<template>
  <div>
    <el-card style="height: 80px;">
      <el-form :inline="true" class="form">
        <el-form-item label="用户名">
          <el-input v-model.trim="keywords" placeholder="请您输入搜索用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="keywords ? false : true" @click="searchUserInfo">搜索</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin: 10px 0;">
      <el-button type="primary" size="default" @click="addUser">添加用户</el-button>
      <el-button type="primary" size="default" @click="deleteSelectUser">批量删除</el-button>
      <el-table :data="userArr" border style="margin: 10px 0px;" @selection-change="selectChange">
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column label="#" align="center" type="index"></el-table-column>
        <el-table-column label="id" align="center" prop="id">

        </el-table-column>
        <el-table-column label="用户名字" align="center">
          <template #default="scope">
            {{ scope.row.username }}
          </template>
        </el-table-column>
        <el-table-column label="用户名称" align="center">
          <template #default="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column label="用户角色" align="center">
          <template #default="scope">
            <template v-for="role in scope.row.roles">
              <el-tag>
                {{ role }}
              </el-tag>
            </template>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template #default="scope">
            {{ scope.row.createTime }}
          </template>
        </el-table-column>
        <el-table-column label="更新时间" align="center">
          <template #default="scope">
            {{ scope.row.updateTime }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="320px" align="center">
          <template #default="scope">
            <el-button type="primary" size="default" icon="User" @click="setRole(scope.row)">分配角色</el-button>
            <el-button type="primary" size="default" icon="Edit" @click="updateUser(scope.row)">编辑</el-button>
            <el-button type="primary" size="default" icon="Delete" @click="deleteUser(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 7, 9, 11]"
      layout="prev, pager, next, jumper,->,sizes,total" :total="total" @size-change="changeSize"
      @current-change="getHasUser" />
    <el-drawer v-model="drawer">
      <template #header>
        <h4>{{ userParams.id ? '修改用户' : '添加用户' }}</h4>
      </template>
      <template #default>
        <div>
          <el-form :model="userParams" :rules="rules" ref="formRef">
            <el-form-item label="用户姓名" prop="username">
              <el-input v-model.trim="userParams.username" placeholder="请您输入用户姓名"></el-input>
            </el-form-item>
            <el-form-item label="用户昵称" prop="name">
              <el-input v-model.trim="userParams.name" placeholder="请您输入用户昵称"></el-input>
            </el-form-item>
            <el-form-item v-if="!userParams.id" label="用户密码" prop="password">
              <el-input v-model.trim="userParams.password" placeholder="请您输入用户密码"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="save">确定</el-button>
        </div>
      </template>
    </el-drawer>
    <el-drawer v-model="drawer1">
      <template #header>
        <h4>分配角色</h4>
      </template>
      <template #default>
        <el-form>
          <el-form-item label="用户姓名">
            <el-input :disabled="true" v-model="userParams.username"></el-input>
          </el-form-item>
          <el-form-item label="职位列表">
            <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">
              全选
            </el-checkbox>
            <el-checkbox-group v-model="userRole" @change="handleCheckedChange">
              <el-checkbox v-for="(role) in allRole" :key="role.id" :value="role">{{ role.roleName
                }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>

      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="drawer1 = false">取消</el-button>
          <el-button type="primary" @click="confirmClick">确定</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { reqAddOrUpdateUser, reqAllRole, reqRemoveUser, reqSetUserRole, reqUserInfo } from '@/api/acl/user';
import type { AllRole, AllRoleResponseData, Records, SetRoleData, User } from '@/api/acl/user/type';
import validateUserName from '@/utils/validateUserName';
import { ElMessage } from 'element-plus';
import { nextTick, onMounted, reactive, ref } from 'vue';
let currentPage = ref<number>(1)
let pageSize = ref<number>(5)
let total = ref<number>(0)
let userArr = ref<Records>([])
let drawer = ref<boolean>(false)
let userParams = reactive<User>({})
let formRef = ref<any>()
let drawer1 = ref<boolean>(false)
let checkAll = ref<boolean>(false)
let isIndeterminate = ref<boolean>(false)
let allRole = ref<AllRole>([])
let userRole = ref<AllRole>([])
let selectUserId = ref<number[]>([])
let keywords = ref<string>()
onMounted(() => {
  getHasUser()
})
const getHasUser = async () => {
  let result = await reqUserInfo(currentPage.value, pageSize.value, keywords?.value)
  total.value = result.data.total
  if (result.code === 200) {
    userArr.value = result.data.records

  } else {
    ElMessage.error('获取用户列表失败！')
  }


}
const changeSize = () => {
  getHasUser()
}
const addUser = () => {
  drawer.value = true
  Object.assign(userParams, {
    id: 0,
    username: '',
    name: '',
    password: ''
  })
  nextTick(() => {
    formRef.value.resetFields()
  })
}
const updateUser = (row: User) => {
  drawer.value = true
  Object.assign(userParams, row)
  nextTick(() => {
    formRef.value.clearValidate('username')
    formRef.value.clearValidate('name')
  })
}
const save = async () => {
  await formRef.value.validate()
  let result: any = await reqAddOrUpdateUser(userParams)
  if (result.code === 200) {
    drawer.value = false
    getHasUser()
    ElMessage({
      type: 'success',
      message: userParams.id ? '更新成功' : '添加成功'
    })
  } else {
    drawer.value = false
    ElMessage({
      type: 'error',
      message: userParams.id ? '更新失败' : '添加失败'
    })
  }
  window.location.reload()
}
const cancel = () => {
  drawer.value = false

}
const setRole = async (row: User) => {
  Object.assign(userParams, row)
  let result: AllRoleResponseData = await reqAllRole(Number(userParams.id))
  if (result.code === 200) {
    drawer1.value = true
    allRole.value = result.data.allRolesList
    userRole.value = result.data.assignRoles
    checkAll.value = userRole.value.length === allRole.value.length

  }
}
const handleCheckAllChange = (val: boolean) => {
  userRole.value = val ? allRole.value : []
  isIndeterminate.value = false
}
const handleCheckedChange = (val: String[]) => {
  checkAll.value = val.length === allRole.value.length
  isIndeterminate.value = val.length !== allRole.value.length

}
const confirmClick = async () => {
  let data: SetRoleData = {
    userId: Number(userParams.id),
    roleIdList: userRole.value.map(item => { return (item.id as number) })
  }
  let result: any = await reqSetUserRole(data)
  if (result.code === 200) {
    getHasUser()
    ElMessage.success('分配职务成功！')
    drawer1.value = false
  } else {
    ElMessage.error('分配职务失败！')

  }
}
const deleteUser = async (row: User) => {
  let result: any = await reqRemoveUser(row.id as number)
  if (result.code === 200) {
    getHasUser()
    ElMessage.success('删除用户成功！')
  } else {
    getHasUser()
    ElMessage.error('删除用户失败！')
  }
}
const selectChange = (val: User[]) => {
  selectUserId.value = val.map((item: User) => item.id as number)
}
const deleteSelectUser = async () => {
  if (selectUserId.value.length === 0) {
    ElMessage.warning('请选择要删除的用户！')
    return
  }

  // 删除选中的用户
  for (const id of selectUserId.value) {
    const result: any = await reqRemoveUser(id)
    if (result.code !== 200) {
      ElMessage.error('删除用户失败！')
      return
    }
  }

  ElMessage.success('批量删除成功！')
  getHasUser()
  selectUserId.value = [] // 清空选择
}
const searchUserInfo = async () => {
  await getHasUser()
  keywords.value = ''
}
const rules = {
  username: [
    { trigger: 'blur', validator: validateUserName }
  ],
  name: [
    { required: true, trigger: 'blur' }
  ],
  password: [
    { required: true, trigger: 'blur' }
  ],
}
</script>
<style lang="scss" scoped>
.form {
  display: flex;
  align-items: center;
}
</style>
