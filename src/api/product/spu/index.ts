import request from "@/utils/request";
import type { HasSpuResponseData, SpuData, BrandListResponse } from "./type";

enum API {
    // 获取已有的SPU数据
    HASSPU_API = '/admin/product',
    // 添加新的SPU数据
    ADDNEW_SPU = '/admin/product/addNewSpu',
    // 获取品牌列表
    GET_BRAND_LIST = '/admin/product/getBrandList',
    // 删除SPU
    DELETE_SPU = '/admin/product/deleteSpu',
    // 更新SPU
    UPDATE_SPU = '/admin/product/updateSpu'
}

// 获取某一个三级分类下已有的SPU数据
export const reqHasSpu = (page: number, limit: number, category3Id: string | number) =>
    request.get<any, HasSpuResponseData>(API.HASSPU_API, {
        params: {
            page,
            limit,
            category3Id
        }
    })

// 添加新的SPU数据
export const reqAddSpu = (data: SpuData) => request.post<any, HasSpuResponseData>(API.ADDNEW_SPU, data)

// 获取品牌列表
export const reqBrandList = () => request.get<any, BrandListResponse>(API.GET_BRAND_LIST)

// 删除SPU
export const reqDeleteSpu = (spuId: number) => {
    return request.delete<any, any>(`${API.DELETE_SPU}/${spuId}`)
}

// 更新SPU
export const reqUpdateSpu = (data: SpuData) => request.put<any, any>(API.UPDATE_SPU, data)