<template>
  <div>
    <el-card style="height: 80px;">
      <el-form :inline="true" class="form">
        <el-form-item label="职位搜索">
          <el-input placeholder="请输入职位名称" style="width: 150px;" v-model.trim="roleName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="!roleName" @click="getHasRoleList">搜索</el-button>
          <el-button @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin: 10px 0;">
      <el-button type="primary" icon="Plus" @click="addRole">添加职位</el-button>
      <el-table :data="allroleList" border style="margin: 10px 0;">
        <el-table-column type="index" align="center" label="#"></el-table-column>
        <el-table-column align="center" label="ID" prop="id"></el-table-column>
        <el-table-column align="center" label="职位名称" show-overflow-tooltip>
          <template #default="scope">
            <el-tag>
              {{ scope.row.roleName }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="创建时间" prop="createTime" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" label="更新时间" prop="updateTime" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" label="操作" width="280px">
          <template #default="scope">
            <el-button type="primary" size="small" icon="User" @click="setPermission(scope.row)">分配权限</el-button>
            <el-button type="primary" size="small" icon="Edit" @click="updateRole(scope.row)">编辑</el-button>
            <el-popconfirm title="你确定要删除吗？" @confirm="removeRole(scope.row)">
              <template #reference>
                <el-button type="primary" size="small" icon="Delete">删除</el-button>
              </template>

            </el-popconfirm>

          </template>
        </el-table-column>
      </el-table>
      <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 7, 9, 11]"
        layout="prev, pager, next, jumper,->,sizes,total" :total="total" @size-change="changeSize"
        @current-change="getHasRoleList" />
    </el-card>
    <el-dialog v-model="dialogVisible" :title="roleParams.id ? '修改职位' : '添加职位'" width="500"
      :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
      <el-form :model="roleParams" :rules="rules" ref="formRef">
        <el-form-item prop="roleName" label="职位名称">
          <el-input v-model="roleParams.roleName" placeholder="请输入职位名称"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="cancelRole">取消</el-button>
          <el-button type="primary" @click="saveRole">确认</el-button>
        </div>
      </template>
    </el-dialog>
    <el-drawer v-model="drawer">
      <template #header>
        <h4>分配权限</h4>
      </template>
      <template #default>
        <div>
          <el-tree ref="treeRef" style="max-width: 600px" :data="menuArr" show-checkbox node-key="id"
            :default-expand-all="true" :default-checked-keys="selectedArr" :props="{
              label: 'name',
              children: 'children'
            }" />
        </div>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="drawer = false">取消</el-button>
          <el-button type="primary" @click="handleAssignPermission">确认</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { reqAddOrUpdateRole, reqAllMenuList, reqAllRoleList, reqRemoveRole, reqSetPermission } from '@/api/acl/role'
import type { MenuList, RoleData } from '@/api/acl/role/type'
import { ElMessage } from 'element-plus'
import { ref, onMounted, nextTick } from 'vue'
import type { FormInstance, TreeInstance } from 'element-plus'
let currentPage = ref<number>(1)
let pageSize = ref<number>(5)
let total = ref<number>(0)
let allroleList = ref<RoleData[]>([])
let roleName = ref<string>('')
let dialogVisible = ref<boolean>(false)
let formRef = ref<FormInstance>()
let roleParams = ref<RoleData>({
  roleName: ''
})
let drawer = ref<boolean>(false)
let treeRef = ref<TreeInstance>()
let menuArr = ref<MenuList>([])
let selectedArr = ref<number[]>([])
const rules = {
  roleName: [
    { required: true, message: '请输入职位名称', trigger: 'blur' },
    { min: 2, max: 10, message: '职位名称长度在2-10个字符之间', trigger: 'blur' }
  ]
}

onMounted(() => {
  getHasRoleList()
})

const getHasRoleList = async () => {
  const result = await reqAllRoleList(currentPage.value, pageSize.value, roleName.value)
  if (result.code === 200) {
    allroleList.value = result.data.records
    total.value = result.data.total
  } else {
    ElMessage.error('获取列表失败！')
  }
}

const changeSize = (val: number) => {
  pageSize.value = val
  getHasRoleList()
}

const resetSearch = () => {
  roleName.value = ''
  getHasRoleList()
}

const addRole = () => {
  dialogVisible.value = true
  roleParams.value = {
    roleName: ''
  }
  nextTick(() => {
    formRef.value?.clearValidate('roleName')
  })
}

const updateRole = (row: RoleData) => {
  dialogVisible.value = true
  roleParams.value = { ...row }
  nextTick(() => {
    formRef.value?.clearValidate('roleName')
  })
}

const saveRole = async () => {
  if (!formRef.value) return

  await formRef.value.validate(async (valid) => {
    if (valid) {
      const result = await reqAddOrUpdateRole(roleParams.value)
      if (result.code === 200) {
        dialogVisible.value = false
        getHasRoleList()
        ElMessage({
          type: 'success',
          message: roleParams.value.id ? '修改成功！' : '添加成功！'
        })
      } else {
        ElMessage({
          type: 'error',
          message: result.message || (roleParams.value.id ? '修改失败！' : '添加失败！')
        })
      }
    }
  })
}

const cancelRole = () => {
  dialogVisible.value = false
  roleParams.value = {
    roleName: ''
  }
  nextTick(() => {
    formRef.value?.clearValidate('roleName')
  })
}
const setPermission = async (row: RoleData) => {
  drawer.value = true
  Object.assign(roleParams.value, row)
  let result = await reqAllMenuList(roleParams.value.id as number)
  if (result.code === 200) {
    menuArr.value = result.data
    selectedArr.value = []
    selectedArr.value = filterSelectArr(menuArr.value, [])
    nextTick(() => {
      if (treeRef.value) {
        treeRef.value.setCheckedKeys(selectedArr.value)
      }
    })
  } else {
    ElMessage.error('获取菜单数据失败')
  }
}
const filterSelectArr = (allData: any[], initArr: number[]): number[] => {
  allData.forEach((item: any) => {
    if (item.select) {
      if (!item.children || item.children.length === 0 || item.level === 4) {
        initArr.push(item.id)
      }
      if (item.children && item.children.length > 0) {
        filterSelectArr(item.children, initArr)
        const allChildrenSelected = item.children.every((child: any) => child.select)
        if (allChildrenSelected) {
          initArr.push(item.id)
        }
      }
    }
  })
  return initArr
}
const handleAssignPermission = async () => {
  if (!treeRef.value) return
  const roleId = roleParams.value.id
  const arr = treeRef.value.getCheckedKeys() || []
  const arr1 = treeRef.value.getHalfCheckedKeys() || []
  const permissionId = [...arr, ...arr1].map(id => Number(id))
  console.log(permissionId);

  // TODO: 调用分配权限的API
  let result = await reqSetPermission(roleId as number, permissionId)
  if (result.code === 200) {
    getHasRoleList()
    drawer.value = false
    ElMessage.success('分配权限成功！')
  } else {
    ElMessage.error('分配权限失败！')

  }
}
const removeRole = async (row: RoleData) => {
  try {
    const result = await reqRemoveRole(row.id as number)
    if (result.code === 200) {
      ElMessage.success('删除角色成功！')
      // 重新获取角色列表
      await getHasRoleList()
    } else {
      ElMessage.error(result.message || '删除角色失败！')
    }
  } catch (error) {
    console.error('删除角色失败:', error)
    ElMessage.error('删除角色失败！')
  }
}
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  align-items: center;
}
</style>
