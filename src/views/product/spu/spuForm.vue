<template>
    <div class="gradient-text">
        <el-form :model="spuForm" ref="formRef" :rules="rules">
            <el-form-item label="SPU名称" prop="spuName">
                <el-input v-model="spuForm.spuName" placeholder="请输入SPU名称"></el-input>
            </el-form-item>
            <el-form-item label="SPU品牌" prop="tmId">
                <el-select v-model="spuForm.tmId" placeholder="请选择品牌">
                    <el-option v-for="brand in brandList" :key="brand.id" :label="brand.name" :value="brand.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="SPU描述" prop="description">
                <el-input v-model="spuForm.description" type="textarea" placeholder="请输入描述" :rows="4" />
            </el-form-item>
        </el-form>
        <el-button style="margin-left: 90px;" type="primary" @click="saveSpu">保存</el-button>
        <el-button type="primary" @click="cancelAddSpu">取消</el-button>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import type { SpuData, Brand } from '@/api/product/spu/type'
import useCategoryStore from '@/store/modules/category'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { reqAddSpu, reqBrandList, reqUpdateSpu } from '@/api/product/spu'

const props = defineProps<{
    spuData?: SpuData | null
}>()

const $emit = defineEmits(['changeScene', 'refresh'])
const categoryStore = useCategoryStore()

// 表单数据
const spuForm = ref<SpuData>({
    spuName: '',
    description: '',
    category3Id: '',
    tmId: undefined as unknown as number,
    tmName: ''
})

// 监听props变化，更新表单数据
watch(() => props.spuData, (newVal) => {
    if (newVal) {
        spuForm.value = { ...newVal }
    } else {
        // 重置表单
        spuForm.value = {
            spuName: '',
            description: '',
            category3Id: categoryStore.c3Id,
            tmId: undefined as unknown as number,
            tmName: ''
        }
    }
}, { immediate: true })

// 品牌列表
const brandList = ref<Brand[]>([])

// 表单引用
const formRef = ref<FormInstance>()

// 表单验证规则
const rules: FormRules = {
    spuName: [
        { required: true, message: '请输入SPU名称', trigger: 'blur' }
    ],
    description: [
        { required: true, message: '请输入SPU描述', trigger: 'blur' }
    ],
    tmId: [
        { required: true, message: '请选择品牌', trigger: 'change', type: 'number' }
    ]
}

// 初始化
onMounted(async () => {
    // 获取品牌列表
    try {
        const result = await reqBrandList()
        if (result.code === 200) {
            brandList.value = result.data
        } else {
            ElMessage.error('获取品牌列表失败')
        }
    } catch (error) {
        ElMessage.error('获取品牌列表失败')
    }
})

// 保存SPU
const saveSpu = async () => {
    if (!formRef.value) return

    try {
        await formRef.value.validate()

        // 设置品牌名称
        const selectedBrand = brandList.value.find(brand => brand.id === spuForm.value.tmId)
        spuForm.value.tmName = selectedBrand?.name || ''

        // 确保category3Id是数字类型
        spuForm.value.category3Id = Number(spuForm.value.category3Id)

        // 根据是否有id判断是新增还是更新
        const result = await (spuForm.value.id ? reqUpdateSpu(spuForm.value) : reqAddSpu(spuForm.value))

        if (result.code === 200) {
            ElMessage.success(spuForm.value.id ? 'SPU更新成功' : 'SPU添加成功')
            // 重置表单并返回列表页
            formRef.value?.resetFields()
            $emit('changeScene', 0)
            $emit('refresh') // 通知父组件刷新数据
        } else {
            ElMessage.error(result.message || (spuForm.value.id ? 'SPU更新失败' : 'SPU添加失败'))
        }
    } catch (error) {
        ElMessage.error('请完善表单信息')
    }
}

const cancelAddSpu = () => {
    formRef.value?.resetFields()
    $emit('changeScene', 0)
}
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