// 品牌管理模块接口
import request from "@/utils/request";
import type { TrademarkParams, TrademarkResponse } from './type'

enum API {
    // 获取已有品牌接口
    TRADEMARK_URL = '/admin/product/baseTrademark',
    // 添加或修改品牌
    ADD_OR_UPDATE_TRADEMARK_URL = '/admin/product/baseTrademark/save',
    // 删除品牌
    DELETE_TRADEMARK_URL = '/admin/product/baseTrademark/remove'
}

// 获取品牌列表
export const reqHasTrademark = (page: number, limit: number) =>
    request.post<any, TrademarkResponse>(API.TRADEMARK_URL, {
        page,
        limit
    } as TrademarkParams)

// 添加或修改品牌
export const reqAddOrUpdateTrademark = (data: any) => {
    return request.post<any, any>(API.ADD_OR_UPDATE_TRADEMARK_URL, data)
}

// 删除品牌
export const reqDeleteTrademark = (id: number) => {
    if (!id) {
        return Promise.reject(new Error('无效的品牌ID'));
    }
    return request.delete<any, any>(`${API.DELETE_TRADEMARK_URL}`, {
        params: { id }
    });
}
