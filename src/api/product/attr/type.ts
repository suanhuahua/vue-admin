// 分类数据类型
export interface Category {
    id: number;
    name: string;
}

// API响应数据类型
export interface CategoryResponse {
    code: number;
    data: Category[] | null;
    message: string;
    ok: boolean;
}

// 属性值数据类型
export interface AttrValue {
    id?: number;
    valueName: string;
    attrId?: number;
}

// 属性数据类型
export interface Attr {
    id?: number;
    attrName: string;
    categoryId: number | string;
    categoryLevel: number;
    attrValueList: AttrValue[];
}

// 属性响应数据类型
export interface AttrResponse {
    code: number;
    data: Attr[] | null;
    message: string;
    ok: boolean;
}
