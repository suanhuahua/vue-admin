// 服务器全部接口返回的类型
export interface ResponseData {
    code: number,
    message: string,
    ok: boolean,
}

export interface SpuData {
    id?: number,
    spuName: string,
    description: string,
    category3Id: number | string,
    tmId: number | undefined,
    tmName?: string,
}
export type Records = SpuData[];
export interface HasSpuResponseData extends ResponseData {
    data: {
        records: Records,
        total: number,
        size: number,
        current: number,
        pages: number
    }
}

export interface Brand {
    id: number
    name: string
}

export interface BrandListResponse {
    code: number
    message: string
    data: Brand[]
    ok: boolean
}