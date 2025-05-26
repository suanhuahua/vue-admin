<template>
  <div>
    <Category :scene="scene" />
    <el-card style="margin-top: 10px;">
      <el-button v-show="scene == 0" @click="addAttr" type="primary" icon="Plus" :disabled="!categoryStore.c3Id"
        style="margin: 10px 0;">添加平台属性</el-button>
      <div v-show="scene == 0">
        <el-table :data="attrArr" border>
          <el-table-column label="序号" type="index" width="80px" align="center">
          </el-table-column>
          <el-table-column label="属性名称" align="center">
            <template #default="scope">
              {{ scope.row.attrName }}
            </template>
          </el-table-column>
          <el-table-column label="属性值名称" align="center">
            <template #default="scope">
              <template v-for="attr in scope.row.attrValueList" :key="attr.id">
                <el-tag type="success">{{ attr.valueName }} </el-tag>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template #default="scope">
              <el-button type="primary" icon="Edit" circle @click="updateAttr(scope.row)" />
              <el-popconfirm title="是否确定删除" @confirm="deleteAtrr(scope.row)">
                <template #reference>
                  <el-button type="danger" icon="Delete" circle />
                </template>
              </el-popconfirm>
            </template>

          </el-table-column>
        </el-table>
      </div>
      <div v-show="scene == 1">
        <el-form :inline="true">
          <el-form-item label="属性名称">
            <el-input v-model="attrParams.attrName" placeholder="请您输入属性名" clearable @blur="validateAttrName" />
          </el-form-item>
        </el-form>
        <div style="margin:10px 0;">
          <el-button :disabled="!attrParams.attrName" type="primary" icon="Plus" @click="addAttrValue">添加属性值</el-button>
          <el-button @click="cancelAddAttr">取消</el-button>
        </div>
        <el-card>
          <el-table border :data="attrParams.attrValueList">
            <el-table-column label="序号" width="80px" align="center" type="index">
            </el-table-column>
            <el-table-column label="属性值" align="center">
              <template #default="scope">
                <el-input v-model.trim="scope.row.valueName" @blur="validateAttrValue(scope.row)"
                  placeholder="请输入属性值"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template #default="scope">
                <el-button type="danger" icon="Delete" circle @click="deleteAttrValue(scope.$index)" />
              </template>
            </el-table-column>
          </el-table>
          <div style="margin:10px 0;">
            <el-button type="primary" @click="saveAddAttr">保存</el-button>
            <el-button>取消</el-button>
          </div>

        </el-card>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reqAddOrUpdateAttr, reqAttr, reqRemoveAttr } from '@/api/product/attr';
import useCategoryStore from '@/store/modules/category';
import { reactive, ref, watch } from 'vue';
import { ElMessage } from 'element-plus';
import type { Attr } from '@/api/product/attr/type';
import useAttrStore from '@/store/modules/Attr';

const categoryStore = useCategoryStore();
const attrStore = useAttrStore();
let attrArr = ref<Attr[]>([]);
let scene = ref<Number>(0)
let attrParams = reactive<Attr>({
  attrName: "",
  attrValueList: [],
  categoryId: '',
  categoryLevel: 3
})
const addAttr = () => {
  scene.value = 1
  attrParams.categoryId = categoryStore.c3Id
}
const addAttrValue = () => {
  attrParams.attrValueList.push({
    valueName: '',
  })
}
const updateAttr = (data: Attr) => {
  scene.value = 1
  Object.assign(attrParams, JSON.parse(JSON.stringify(data)))

}
const deleteAtrr = async (data: Attr) => {
  if (!data.id) {
    ElMessage({
      type: 'error',
      message: '属性ID不存在'
    })
    return
  }
  await reqRemoveAttr(data.id)
  // 删除成功后刷新列表
  await getAttrList()
}
const cancelAddAttr = () => {
  scene.value = 0
  attrParams.attrName = ''
  attrParams.attrValueList = []
  attrParams.categoryId = ''

}
const validateAttrName = () => {
  if (!attrParams.attrName) return

  // 检查属性名称是否重复
  const isDuplicate = attrArr.value.some(item =>
    item.attrName === attrParams.attrName && item.id !== attrParams.id
  )

  if (isDuplicate) {
    ElMessage({
      type: 'warning',
      message: '属性名称已存在'
    })
    attrParams.attrName = ''
  }
}

const validateAttrValue = (row: any) => {
  if (!row.valueName) {
    ElMessage({
      type: 'warning',
      message: '属性值不能为空'
    })
    return
  }

  // 检查属性值是否重复
  const isDuplicate = attrParams.attrValueList.some((item, index) =>
    item.valueName === row.valueName && index !== attrParams.attrValueList.indexOf(row)
  )

  if (isDuplicate) {
    ElMessage({
      type: 'warning',
      message: '属性值已存在'
    })
    row.valueName = ''
  }
}

const deleteAttrValue = (index: number) => {
  attrParams.attrValueList.splice(index, 1)
}

const saveAddAttr = async () => {
  try {
    // 校验属性名称
    if (!attrParams.attrName) {
      ElMessage({
        type: 'warning',
        message: '属性名称不能为空'
      })
      return
    }

    // 校验属性名称是否重复
    const isDuplicateName = attrArr.value.some(item =>
      item.attrName === attrParams.attrName && item.id !== attrParams.id
    )
    if (isDuplicateName) {
      ElMessage({
        type: 'warning',
        message: '属性名称已存在'
      })
      return
    }

    // 校验属性值列表
    if (attrParams.attrValueList.length === 0) {
      ElMessage({
        type: 'warning',
        message: '请至少添加一个属性值'
      })
      return
    }

    // 校验每个属性值是否为空
    const emptyValue = attrParams.attrValueList.find(item => !item.valueName)
    if (emptyValue) {
      ElMessage({
        type: 'warning',
        message: '属性值不能为空'
      })
      return
    }

    // 校验属性值是否重复
    const valueNames = attrParams.attrValueList.map(item => item.valueName)
    const uniqueValueNames = new Set(valueNames)
    if (valueNames.length !== uniqueValueNames.size) {
      ElMessage({
        type: 'warning',
        message: '存在重复的属性值'
      })
      return
    }

    let result = await reqAddOrUpdateAttr(attrParams)
    if (result.code === 200) {
      ElMessage({
        type: 'success',
        message: '保存成功'
      })
      // 重新获取属性列表
      await getAttrList()
      // 重置表单
      attrParams.attrName = ''
      attrParams.attrValueList = []
      attrParams.categoryId = ''
      // 切换场景
      scene.value = 0
    } else {
      ElMessage({
        type: 'error',
        message: result.message || '保存失败'
      })
    }
  } catch (error: any) {
    ElMessage({
      type: 'error',
      message: error.message || '保存失败'
    })
  }
}
// 获取属性列表
const getAttrList = async () => {
  try {
    if (!categoryStore.c1Id || !categoryStore.c2Id || !categoryStore.c3Id) {
      return;
    }
    const res = await reqAttr(
      Number(categoryStore.c1Id),
      Number(categoryStore.c2Id),
      Number(categoryStore.c3Id)
    );
    const data = res.data || [];
    attrArr.value = data;
    attrStore.setAttrList(data);
  } catch (error: any) {
    console.error('获取属性列表失败:', error);
    ElMessage({
      type: 'error',
      message: error.message || '获取属性列表失败'
    });
  }
};

// 监听三级分类ID变化
watch(
  () => categoryStore.c3Id,
  (newVal) => {
    if (newVal) {
      getAttrList();
    } else {
      attrArr.value = [];
      attrStore.setAttrList([]);
    }
  }
);

// 初始化时从 store 恢复数据
attrArr.value = attrStore.attrList;
</script>

<style lang="scss" scoped>
.gradient-text {
  background-size: 200% auto;
  background-clip: text;
  -webkit-background-clip: text;
  animation: gradient-load 2s ease-in-out;
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
