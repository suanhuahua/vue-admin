<template>
    <el-card>
        <el-form :inline="true">
            <el-form-item label="一级分类">
                <el-select style="width: 220px;" v-model="categoryStore.c1Id" @change="updateCategory1"
                    :disabled="scene === 1 ? true : false">
                    <el-option v-for="(c1) in categoryStore.c1Arr" :key="c1.id" :label="c1.name" :value="c1.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="二级分类">
                <el-select style="width: 220px;" v-model="categoryStore.c2Id" @change="updateCategory2"
                    :disabled="scene === 1 ? true : false">
                    <el-option v-for="(c2) in categoryStore.c2Arr" :key="c2.id" :label="c2.name" :value="c2.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="三级分类">
                <el-select style="width: 220px;" v-model="categoryStore.c3Id" :disabled="scene === 1 ? true : false">
                    <el-option v-for="(c3) in categoryStore.c3Arr" :key="c3.id" :label="c3.name" :value="c3.id" />
                </el-select>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import useCategoryStore from '@/store/modules/category'
let categoryStore = useCategoryStore()
defineProps(['scene'])
// 组件挂载时获取一级分类
onMounted(() => {
    categoryStore.getC1()
});

// 一级分类选择器改变时触发
const updateCategory1 = () => {
    categoryStore.c2Id = ''
    categoryStore.c2Arr = []
    categoryStore.c3Id = ''
    categoryStore.c3Arr = []
    // 确保c1Id是数字类型
    const c1Id = Number(categoryStore.c1Id);
    if (c1Id) {
        categoryStore.getC2(c1Id);
    }
}
// 二级分类选择器改变时触发
const updateCategory2 = () => {
    categoryStore.c3Id = ''
    categoryStore.c3Arr = []
    // 确保c2Id是数字类型
    const c2Id = Number(categoryStore.c2Id);
    if (c2Id) {
        categoryStore.getC3(c2Id);
    }
}

</script>

<style lang="scss"></style>