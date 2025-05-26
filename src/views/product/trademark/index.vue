<template>
  <div class="gradient-text">
    <el-card>
      <el-button type="primary" icon="Plus" @click="handleAdd">添加品牌</el-button>
      <el-table :data="trademarkArr" style="width: 100%" border>
        <el-table-column label="序号" width="80px" align="center">
          <!-- scope.$index 是当前行的索引（从0开始） -->
          <template #default="scope">
            {{ (currentPage - 1) * pageSize + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="品牌名称" align="center" prop="tmName" />
        <el-table-column label="品牌LOGO" align="center">
          <!-- scope.row 包含当前行的所有数据 -->
          <template #default="scope">
            <img :src="scope.row.logoUrl" style="width: 100px; height: 100px" />
          </template>
        </el-table-column>
        <el-table-column label="品牌操作" align="center">
          <!-- 这里也可以使用 scope.row 来获取当前行的数据 -->
          <template #default="scope">
            <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>

      </el-table>
      <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 10, 15, 20]"
        :background="true" layout="prev, pager, next, jumper, ->, sizes, total" :total="total"
        @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </el-card>

    <!-- 添加/编辑品牌的对话框 -->
    <el-dialog v-model="dialogVisible" :title="dialogType === 'add' ? '添加品牌' : '编辑品牌'" width="500px">
      <el-form :model="trademarkForm" :rules="rules" ref="formRef" label-width="100px">
        <el-form-item label="品牌名称" prop="tmName">
          <el-input v-model="trademarkForm.tmName" placeholder="请输入品牌名称" />
        </el-form-item>
        <el-form-item label="品牌LOGO" prop="logoUrl">
          <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload" :show-file-list="false"
            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :http-request="customUpload">
            <img v-if="trademarkForm.logoUrl" :src="trademarkForm.logoUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { reqHasTrademark, reqAddOrUpdateTrademark, reqDeleteTrademark } from '@/api/product/trademark';
import { ref, onMounted, reactive } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus'
import type { FormInstance } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

// 定义品牌数据类型
interface Trademark {
  id: number;
  tmName: string;
  logoUrl: string;
}

let currentPage = ref(1)
let pageSize = ref(5)
let total = ref(0)
let trademarkArr = ref<Trademark[]>([])

// 对话框相关
const dialogVisible = ref(false)
const dialogType = ref<'add' | 'edit'>('add')
const formRef = ref<FormInstance>()

// 表单数据
const trademarkForm = reactive({
  id: 0,
  tmName: '',
  logoUrl: ''
})

// 表单验证规则
const rules = {
  tmName: [
    { required: true, message: '请输入品牌名称', trigger: 'blur' },
    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
  ],
  logoUrl: [
    { required: true, message: '请输入品牌LOGO地址', trigger: 'blur' }
  ]
}

// 重置表单
const resetForm = () => {
  if (formRef.value) {
    formRef.value.resetFields()
  }
  trademarkForm.id = 0
  trademarkForm.tmName = ''
  trademarkForm.logoUrl = ''
}

// 添加品牌
const handleAdd = () => {
  dialogType.value = 'add'
  resetForm() // 重置表单
  dialogVisible.value = true
}

// 编辑品牌
const handleEdit = (row: Trademark) => {
  dialogType.value = 'edit'
  resetForm() // 重置表单
  // 使用解构赋值来复制数据，避免直接引用
  trademarkForm.id = row.id
  trademarkForm.tmName = row.tmName
  trademarkForm.logoUrl = row.logoUrl
  dialogVisible.value = true
}

// 删除品牌
const handleDelete = (row: Trademark) => {
  ElMessageBox.confirm('确定要删除该品牌吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    try {
      const result = await reqDeleteTrademark(row.id)
      if (result.code === 200) {
        ElMessage.success('删除成功')
        // 如果当前页只有一条数据，删除后自动跳转到上一页
        if (trademarkArr.value.length === 1 && currentPage.value > 1) {
          currentPage.value--
        }
        getHasTradeMark()
      } else {
        ElMessage.error(result.message || '删除失败')
      }
    } catch (error: any) {
      ElMessage.error(error.message || '删除失败，请稍后重试')
    }
  }).catch(() => {
    ElMessage.info('已取消删除')
  })
}

// 提交表单
const handleSubmit = async () => {
  if (!formRef.value) return

  await formRef.value.validate(async (valid) => {
    if (valid) {
      try {
        // 根据对话框类型决定是添加还是修改
        const result = await reqAddOrUpdateTrademark({
          id: dialogType.value === 'edit' ? trademarkForm.id : undefined,
          tmName: trademarkForm.tmName,
          logoUrl: trademarkForm.logoUrl
        })

        if (result.code === 200) {
          ElMessage.success(dialogType.value === 'add' ? '添加成功' : '修改成功')
          dialogVisible.value = false
          getHasTradeMark()
        } else {
          ElMessage.error(result.message || (dialogType.value === 'add' ? '添加失败' : '修改失败'))
        }
      } catch (error) {
        ElMessage.error(dialogType.value === 'add' ? '添加失败' : '修改失败')
      }
    }
  })
}

// 分页相关
const handleSizeChange = (val: number) => {
  pageSize.value = val
  getHasTradeMark()
}

const handleCurrentChange = (val: number) => {
  currentPage.value = val
  getHasTradeMark()
}

const getHasTradeMark = async () => {
  try {
    const result: any = await reqHasTrademark(currentPage.value, pageSize.value)
    if (result.code === 200) {
      total.value = result.data.total
      trademarkArr.value = [...result.data.records]
      // console.log('品牌列表数据：', result.data)
    } else {
      console.error('获取品牌列表失败:', result.message)
      ElMessage.error(result.message || '获取品牌列表失败')
    }
  } catch (error) {
    console.error('请求出错:', error)
    ElMessage.error('获取品牌列表失败，请稍后重试')
  }
}

// 自定义上传方法
const customUpload = async (options: any) => {
  try {
    const file = options.file
    // 将文件转换为base64
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = async (e) => {
      const base64 = e.target?.result
      if (base64) {
        // 发送base64数据到服务器
        const response = await fetch('/api/admin/product/fileUpload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            file: base64
          })
        })

        const result = await response.json()
        if (result.code === 200) {
          options.onSuccess(result)
        } else {
          options.onError(new Error(result.message || '上传失败'))
        }
      } else {
        options.onError(new Error('文件读取失败'))
      }
    }
    reader.onerror = () => {
      options.onError(new Error('文件读取失败'))
    }
  } catch (error) {
    console.error('上传失败:', error)
    options.onError(error)
  }
}

// 上传成功回调
const handleAvatarSuccess = (response: any) => {
  if (response.code === 200) {
    trademarkForm.logoUrl = response.data
    ElMessage.success('图片上传成功')
    formRef.value?.clearValidate('logoUrl')
  } else {
    ElMessage.error(response.message || '图片上传失败')
  }
}

// 上传前的验证
const beforeAvatarUpload = (file: File) => {
  const isJPG = file.type === 'image/jpeg'
  const isPNG = file.type === 'image/png'
  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isJPG && !isPNG) {
    ElMessage.error('上传图片只能是 JPG 或 PNG 格式!')
    return false
  }
  if (!isLt2M) {
    ElMessage.error('上传图片大小不能超过 2MB!')
    return false
  }
  return true
}

onMounted(() => {
  getHasTradeMark()
})
</script>
<style lang="scss" scoped>
.gradient-text {
  background-size: 200% auto;
  background-clip: text;
  -webkit-background-clip: text;
  animation: gradient-load 0.3s ease-in-out;
}

@keyframes gradient-load {
  from {
    background-position: 200% 0;
    opacity: 0;
  }

  to {
    background-position: 0 0;
    opacity: 1;
  }
}

.avatar-uploader {
  :deep(.el-upload) {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);

    &:hover {
      border-color: var(--el-color-primary);
    }
  }
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
  line-height: 178px;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
