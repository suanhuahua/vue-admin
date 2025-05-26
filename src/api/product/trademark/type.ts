// 品牌数据类型
export interface Trademark {
    id: number
    tmName: string
    logoUrl: string
}

// 品牌列表请求参数类型
export interface TrademarkParams {
    page: number
    limit: number
}

// 品牌列表响应数据类型
export interface TrademarkResponse {
    records: Trademark[]
    total: number
    size: number
    current: number
    pages: number
}
