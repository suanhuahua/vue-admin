export interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}

export interface SkuData {
    id: number | string,
    spuId: number,
    price: number,
    skuName: string,
    SkuDesc: string,
    weight: string,
    tmId: string,
    category3Id: number,
    skuDefaultImg: string,
    isSale: number // 0 for not on sale, 1 for on sale
}
export interface SkuResponseData extends ResponseData {
    data: {
        records: SkuData[],
        total: number,
        size: number,
        current: number,
        pages: number,
        searchCount: boolean,
        optimizeCountSql: boolean,
        hitCount: boolean
    }
}

export interface SkuInfoData extends ResponseData {
    data: SkuData
}