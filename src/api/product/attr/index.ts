import request from "@/utils/request";
import type { CategoryResponse, AttrResponse, Attr } from './type';

enum API {
    // 获取一级分类接口地址
    C1_URL = '/admin/product/getCategory1',
    // 获取二级分类接口地址
    C2_URL = '/admin/product/getCategory2/',
    // 获取三级分类接口地址
    C3_URL = '/admin/product/getCategory3/',
    // 获取分类下已有的属性与属性值
    ATTR_URL = '/admin/product/attrInfoList/',
    // 添加或修改属性接口
    ADDORUPDATEATTR_URL = '/admin/product/addOrUpdateAtrrInfo',
    // 删除某一个属性接口
    DELETEATTR_URL = '/admin/product/deleteAttr'
}

// 获取一级分类
export const reqC1 = () => request.get<any, CategoryResponse>(API.C1_URL)

// 获取二级分类
export const reqC2 = (category1Id: number) => {
    if (!category1Id) {
        return Promise.reject(new Error('无效的一级分类ID'));
    }
    return request.get<any, CategoryResponse>(API.C2_URL + category1Id)
}

// 获取三级分类
export const reqC3 = (category2Id: number) => {
    if (!category2Id) {
        return Promise.reject(new Error('无效的二级分类ID'));
    }
    return request.get<any, CategoryResponse>(API.C3_URL + category2Id)
}

//获取对应分类下已有的属性和属性值
export const reqAttr = (category1Id: number, category2Id: number, category3Id: number) => {
    if (!category1Id || !category2Id || !category3Id) {
        return Promise.reject(new Error('无效的分类ID'));
    }
    return request.get<any, AttrResponse>(API.ATTR_URL + category1Id + '/' + category2Id + '/' + category3Id)
}
// 添加或修改三级分类下的属性
export const reqAddOrUpdateAttr = (data: Attr) => request.post<any, any>(API.ADDORUPDATEATTR_URL, data)

// 删除某一个属性接口
export const reqRemoveAttr = (attrId: number) => request.delete<any, any>(`${API.DELETEATTR_URL}/${attrId}`)