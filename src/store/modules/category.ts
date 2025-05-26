import { reqC1, reqC2, reqC3 } from '@/api/product/attr';
import { ElMessage } from 'element-plus';
import { defineStore } from 'pinia'
import type { Category } from '@/api/product/attr/type';

const useCategoryStore = defineStore('CategoryStore', {
    state() {
        return {
            c1Arr: [] as Category[],
            c1Id: '' as string | number,
            c2Arr: [] as Category[],
            c2Id: '' as string | number,
            c3Id: '' as string | number,
            c3Arr: [] as Category[],

        }
    },
    actions: {
        // 获取一级分类
        async getC1() {
            try {
                const res = await reqC1();
                if (res.code === 200 && res.data) {
                    this.c1Arr = res.data;
                } else {
                    ElMessage({
                        type: 'error',
                        message: res.message || '获取一级分类失败'
                    });
                }
            } catch (error: any) {
                console.error('获取一级分类失败:', error);
                ElMessage({
                    type: 'error',
                    message: error.message || '获取一级分类失败'
                });
            }
        },
        // 获取二级分类
        async getC2(c1Id: number) {
            try {
                const res = await reqC2(c1Id);
                if (res.code === 200 && res.data) {
                    this.c2Arr = res.data;

                } else {
                    ElMessage({
                        type: 'error',
                        message: res.message || '获取二级分类失败'
                    });
                }
            } catch (error: any) {
                ElMessage({
                    type: 'error',
                    message: error.message || '获取二级分类失败'
                });
            }
        },
        // 获取三级分类
        async getC3(c2Id: number) {
            try {
                const res = await reqC3(c2Id);
                if (res.code === 200 && res.data) {
                    this.c3Arr = res.data;
                } else {
                    ElMessage({
                        type: 'error',
                        message: res.message || '获取三级分类失败'
                    });
                }
            } catch (error: any) {
                console.error('获取三级分类失败:', error);
                ElMessage({
                    type: 'error',
                    message: error.message || '获取三级分类失败'
                });
            }
        }
    }
})
export default useCategoryStore