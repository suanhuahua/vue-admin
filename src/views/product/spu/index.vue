<template>
  <div class="gradient-text">
    <Category></Category>
    <el-card>
      <div v-show="scene === 0">
        <el-button @click="addSpu" type="primary" icon="Plus"
          :disabled="useCategoryStore().c3Id ? false : true">添加SPU</el-button>
        <el-table :data="spuStore.records">
          <el-table-column width="80px" align="center" label="序号" type="index"></el-table-column>
          <el-table-column label="SPU名称" align="center">
            <template #default="scope">
              {{ scope.row.spuName }}
            </template>
          </el-table-column>
          <el-table-column label="SPU描述" align="center">
            <template #default="scope">
              {{ scope.row.description }}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template #default="scope">
              <el-button size="small" icon="Plus" type="primary" @click="addSku">添加SKU</el-button>
              <el-button size="small" icon="Edit" type="primary" @click="editSpu(scope.row)">编辑</el-button>
              <el-button size="small" icon="View" type="primary">查看</el-button>
              <el-button size="small" icon="Delete" type="danger" @click="deleteSpu(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[3, 5, 7]"
          :background="true" layout="prev, pager, next, jumper,->,sizes,total" :total="spuStore.total"
          @current-change="handleCurrentChange" @size-change="handleSizeChange" />
      </div>
      <SpuForm v-show="scene === 1" :spu-data="currentSpu" @change-scene="changeScene" @refresh="refreshData" />
      <SkuForm v-show="scene === 2" />
    </el-card>

  </div>
</template>

<script setup lang="ts">
import { reqHasSpu, reqDeleteSpu } from '@/api/product/spu';
import useCategoryStore from '@/store/modules/category';
import { onMounted, ref, watch } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import SkuForm from './skuForm.vue';
import SpuForm from './spuForm.vue';
import useSpuStore from '@/store/modules/spu';
import type { SpuData } from '@/api/product/spu/type';

let spuStore = useSpuStore()
let currentPage = ref(1)
let pageSize = ref(3)
let scene = ref(0)
let currentSpu = ref<SpuData | null>(null)

const getHasSpu = async () => {
  try {
    if (!useCategoryStore().c3Id) {
      ElMessage.warning('请先选择三级分类')
      return
    }
    const requestParams = {
      page: currentPage.value,
      limit: pageSize.value,
      category3Id: useCategoryStore().c3Id
    }

    let result = await reqHasSpu(currentPage.value, pageSize.value, useCategoryStore().c3Id)

    if (!result) {
      ElMessage.error('API响应为空')
      return
    }

    if (result.code === 200) {
      if (!result.data) {
        ElMessage.warning('返回的数据为空')
        spuStore.records = []
        spuStore.total = 0
        return
      }



      spuStore.records = result.data.records || []
      spuStore.total = result.data.total || 0


    } else {
      ElMessage.error(result.message || '获取SPU数据失败')
    }
  } catch (error: any) {
    console.error('SPU API error:', error)
    ElMessage.error(error.message || '获取SPU数据失败')
  }
}

watch(() => useCategoryStore().c3Id, (newVal) => {
  if (newVal) {
    currentPage.value = 1
    pageSize.value = 3 // 重置每页显示数量
    getHasSpu()
  } else {
    spuStore.records = []
    spuStore.total = 0
  }
}, { immediate: true })

onMounted(() => {
  if (useCategoryStore().c3Id) {
    getHasSpu()
  }
})

const handleCurrentChange = (page: number) => {
  currentPage.value = page
  getHasSpu()
}

const handleSizeChange = (size: number) => {
  pageSize.value = size
  currentPage.value = 1 // 切换每页显示数量时，重置到第一页
  getHasSpu()
}

const addSpu = () => {
  scene.value = 1
  currentSpu.value = null // 清空当前SPU数据，表示是新增
}

const editSpu = (row: SpuData) => {
  scene.value = 1
  currentSpu.value = { ...row } // 传递SPU数据副本到表单
}

const addSku = () => {
  scene.value = 2
}

const changeScene = (newscene: number) => {
  scene.value = newscene
}

const refreshData = async () => {
  // 重置到第一页
  currentPage.value = 1
  // 重新获取数据
  await getHasSpu()
}

// 删除SPU
const deleteSpu = async (row: any) => {
  try {

    await ElMessageBox.confirm(
      `确定要删除 ${row.spuName} 吗？`,
      '警告',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    )

    const result = await reqDeleteSpu(row.id)

    if (result.code === 200) {
      ElMessage.success('删除成功')
      // 如果当前页只有一条数据，且不是第一页，则跳转到上一页
      if (spuStore.records.length === 1 && currentPage.value > 1) {
        currentPage.value--
      }
      // 重新获取数据
      await getHasSpu()
    } else {
      ElMessage.error(result.message || '删除失败')
    }
  } catch (error: any) {
    if (error?.message?.includes('cancel')) {
    } else {
      return
    }
  }
}
</script>
<style lang="scss" scoped>
.gradient-text {
  background-size: 200% auto;
  background-clip: text;
  -webkit-background-clip: text;
  animation: gradient-load .2s ease-in-out;
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
</style>
