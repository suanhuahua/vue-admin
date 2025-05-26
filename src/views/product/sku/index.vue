<template>
  <div>
    <h1 class="gradient-text">
      <el-card>
        <el-table :data="skuArr" border style="margin:10px 0;">
          <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
          <el-table-column label="名称" align="center" show-overflow-tooltip width="180px">
            <template #default="scope">
              {{ scope.row.skuName }}
            </template>
          </el-table-column>
          <el-table-column label="描述" align="center" show-overflow-tooltip width="150px">
            <template #default="scope">
              {{ scope.row.SkuDesc }}
            </template>
          </el-table-column>
          <el-table-column label="图片" align="center" width="150px">
            <template #default="scope">
              <img style="width: 100px; height: 100px" :src="scope.row.skuDefaultImg" alt="">
            </template>
          </el-table-column>
          <el-table-column label="重量" align="center" width="150px">
            <template #default="scope">
              {{ scope.row.weight }}
            </template>
          </el-table-column>
          <el-table-column label="价格" align="center" width="150px">
            <template #default="scope">
              {{ scope.row.price }}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" fixed="right">
            <template #default="scope">
              <el-button :type="scope.row.isSale === 1 ? 'info' : 'success'" @click="changeSaleStatus(scope.row)"
                size="small" :title="scope.row.isSale === 1 ? '当前已上架' : '当前已下架'"
                :icon="scope.row.isSale === 1 ? 'Bottom' : 'Top'"></el-button>
              <el-button type="primary" size="small" icon="Edit"></el-button>
              <el-button type="primary" size="small" icon="InfoFilled" @click="findSku(scope.row)"></el-button>
              <el-popconfirm title="你确定要删除这个商品吗？" @confirm="deleteSku(scope.row)">
                <template #reference>
                  <el-button type="primary" size="small" icon="Delete"></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[3, 5, 7, 9]"
          layout="prev, pager, next, jumper,->,sizes,total" :total="total" @current-change="handler"
          @size-change="changeSize" />
        <el-drawer v-model="drawer">
          <template #header>
            <h4>查看商品的详情</h4>
          </template>
          <template #default>
            <el-row>
              <el-col :span="6">名称</el-col>
              <el-col :span="18">{{ skuInfo?.skuName }}</el-col>
            </el-row>
            <el-row>
              <el-col :span="6">描述</el-col>
              <el-col :span="18">{{ skuInfo?.SkuDesc }}</el-col>
            </el-row>
            <el-row style="margin: 5px 0;">
              <el-col :span="6">价格</el-col>
              <el-col :span="18">{{ skuInfo?.price }}</el-col>
            </el-row>
            <el-row>
              <el-col :span="9">商品图片</el-col>
              <el-col :span="15">
                <el-carousel :interval="4000" type="card" height="200px">
                  <el-carousel-item v-for="item in 6" :key="item">
                    <img :src="skuInfo?.skuDefaultImg" alt="" style="width: 100%; height: 100%;">
                  </el-carousel-item>
                </el-carousel>
              </el-col>

            </el-row>
          </template>

        </el-drawer>

      </el-card>
    </h1>
  </div>
</template>

<script setup lang="ts">
import { reqCancelSaleSku, reqDeleteSku, reqSaleSku, reqSkuList } from '@/api/product/sku';
import type { SkuData, SkuResponseData } from '@/api/product/sku/type';
import { ElMessage } from 'element-plus';
import { onMounted, ref } from 'vue';
let currentPage = ref(1)
let pageSize = ref(3)
let total = ref<number>(0)
let skuArr = ref<SkuData[]>([])
let drawer = ref<boolean>(false)
let skuInfo = ref<SkuData>()
onMounted(() => {
  getHasSpu()
})
const getHasSpu = async () => {
  let result: SkuResponseData = await reqSkuList(currentPage.value, pageSize.value)
  if (result.code === 200) {
    total.value = result.data.total
    skuArr.value = result.data.records
  }
}
const handler = (pageVal: number) => {
  currentPage.value = pageVal
  getHasSpu()
}
const changeSize = (size: number) => {
  pageSize.value = size
  getHasSpu()
}
const changeSaleStatus = async (sku: SkuData) => {
  if (sku.isSale === 1) {
    let result = await reqCancelSaleSku(Number(sku.id))
    if (result.code === 200) {
      ElMessage.success('商品下架成功')
      getHasSpu()
    } else {
      ElMessage.error(result.message)
    }
  } else {
    let result = await reqSaleSku(Number(sku.id))
    if (result.code === 200) {
      ElMessage.success('商品上架成功')
      getHasSpu()

    } else {
      ElMessage.error(result.message || '商品上架失败')
    }
  }
}
const findSku = (row: SkuData) => {
  drawer.value = true
  skuInfo.value = row

}
const deleteSku = async (row: SkuData) => {
  let result = await reqDeleteSku(Number(row.id))
  if (result.code === 200) {
    ElMessage.success('删除成功')
    getHasSpu()
  } else {
    ElMessage.error(result.message || '删除失败')
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

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
