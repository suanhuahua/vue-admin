<template>
  <div>
    <el-table :data="permissionArr" style="width: 100%; margin-top: 20px;" row-key="id" border>
      <el-table-column label="名称" align="center" prop="name"></el-table-column>
      <el-table-column label="权限值" align="center" prop="code"></el-table-column>
      <el-table-column label="修改时间" align="center" prop="updateTime"></el-table-column>
      <el-table-column label="操作" align="center" width="280px">
        <template #default="scope">
          <el-button type="primary" size="small" icon="Plus" :disabled="scope.row.level === 3 ? true : false"
            @click="addPermission(scope.row)">{{
              scope.row.level === 2 ? '添加功能' : '添加菜单' }}</el-button>
          <el-button type="primary" size="small" icon="Edit" @click="updatePermission(scope.row)">编辑</el-button>
          <el-popconfirm :title="`您确定要删除吗${scope.row.name}吗？`" @confirm="removeMenu(scope.row)">
            <template #reference>
              <el-button type="primary" size="small" icon="Delete">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialogVisible" :title="menuData.id ? '修改菜单' : '添加菜单'" width="500">
      <el-form>
        <el-form-item label="名称">
          <el-input placeholder="请您输入菜单名称" v-model="menuData.name"></el-input>
        </el-form-item>
        <el-form-item label="权限">
          <el-input placeholder="请您输入权限名称" v-model="menuData.code"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="save">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { reqAddOrUpdateMenu, reqAllPermission, reqRemoveMenu } from '@/api/acl/menu';
import type { MenuParams, Permission, PermissionList } from '@/api/acl/menu/type';
import { ElMessage } from 'element-plus';
import { onMounted, reactive, ref } from 'vue';
let permissionArr = ref<PermissionList>()
let dialogVisible = ref<boolean>(false)
let menuData = reactive<MenuParams>({
  "code": "",
  "level": 0,
  "name": "",
  "pid": 0,
})
onMounted(() => {
  getHasPermission()
})
const getHasPermission = async () => {
  let result = await reqAllPermission()
  if (result.code === 200) {
    permissionArr.value = result.data
  }
}
const addPermission = (row: Permission) => {
  Object.assign(menuData, {
    id: 0,
    "code": "",
    "level": 0,
    "name": "",
    "pid": 0,
  })
  dialogVisible.value = true
  menuData.level = row.level + 1
  menuData.pid = row.id as number
  menuData.name = ''
  menuData.code = ''
}
const save = async () => {
  let result = await reqAddOrUpdateMenu(menuData)
  if (result.code === 200) {
    getHasPermission()
    ElMessage.success(menuData.id ? '修改成功！' : '添加成功！')
    dialogVisible.value = false
  } else {
    ElMessage.error(menuData.id ? '修改失败！' : '添加失败！')
    dialogVisible.value = false

  }
}
const updatePermission = (row: Permission) => {
  dialogVisible.value = true
  Object.assign(menuData, row)


}
const removeMenu = async (row: Permission) => {
  let result: any = await reqRemoveMenu(row.id)
  if (result.code === 200) {
    ElMessage.success('删除成功')
    getHasPermission()
  } else {
    ElMessage.success('删除失败')
    getHasPermission()

  }
}
</script>
<style lang="scss" scoped></style>
