import request from "@/utils/request";
import type { SkuInfoData, SkuResponseData } from "./type";

enum API {
    // 获取已有商品的SKU
    SKU_URL = '/admin/product/list',
    // 上架接口
    SALE_URL = '/admin/product/onSale/',
    // 下架接口
    CANCELSALE_URL = '/admin/product/cancelSale/',
    // 获取商品详情接口 暂未写接口
    SKUINFO_URL = '/admin/product/getSkuInfo',
    // 删除SKU商品
    SKUDELETE_URL = '/admin/product/deleteSku'

}
// 获取已有商品的SKU
export const reqSkuList = (page: number, limit: number) => request.get<any, SkuResponseData>(API.SKU_URL, {
    params: {
        page,
        limit
    }
})
// 已有商品上架的请求
export const reqSaleSku = (skuId: number) => request.get<any, any>(API.SALE_URL + skuId)

// 已有商品下架的请求
export const reqCancelSaleSku = (skuId: number) => request.get<any, any>(API.CANCELSALE_URL + skuId)

// 获取已有商品的详细信息 暂未写接口
export const reqSkuInfo = (skuId: number) => request.get<any, SkuInfoData>(API.SKUINFO_URL + skuId)
// 删除SKU商品
export const reqDeleteSku = (SkuId: number) => request.delete<any, any>(API.SKUDELETE_URL + '/' + SkuId)