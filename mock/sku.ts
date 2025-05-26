import { log } from 'console'
import type { SkuData } from '../src/api/product/sku/type'

// 生成SKU数据
function createSkuList() {
    const skus: SkuData[] = [
        // 手机类SKU (category3Id: 111)
        {
            id: 1,
            spuId: 1,
            price: 999.99,
            skuName: "iPhone 14 Pro 128GB 暗紫色",
            SkuDesc: "A16仿生芯片，4800万像素主摄，暗紫色版本",
            weight: "206g",
            tmId: "1",
            category3Id: 111,
            skuDefaultImg: `https://picsum.photos/200/200?random=${Math.random()}`,
            isSale: 1
        },
        {
            id: 2,
            spuId: 1,
            price: 1099.99,
            skuName: "iPhone 14 Pro 256GB 金色",
            SkuDesc: "A16仿生芯片，4800万像素主摄，金色版本",
            weight: "206g",
            tmId: "1",
            category3Id: 111,
            skuDefaultImg: `https://picsum.photos/200/200?random=${Math.random()}`,
            isSale: 1
        },
        // 游戏手机SKU (category3Id: 112)
        {
            id: 3,
            spuId: 2,
            price: 799.99,
            skuName: "ROG Phone 7 256GB 黑色",
            SkuDesc: "骁龙8 Gen 2，165Hz刷新率，黑色版本",
            weight: "239g",
            tmId: "2",
            category3Id: 112,
            skuDefaultImg: `https://picsum.photos/200/200?random=${Math.random()}`,
            isSale: 1
        },
        // 相机SKU (category3Id: 131)
        {
            id: 4,
            spuId: 3,
            price: 1999.99,
            skuName: "Sony A7IV 机身",
            SkuDesc: "全画幅微单，3300万像素，机身",
            weight: "658g",
            tmId: "7",
            category3Id: 131,
            skuDefaultImg: `https://picsum.photos/200/200?random=${Math.random()}`,
            isSale: 1
        },
        // 笔记本SKU (category3Id: 311)
        {
            id: 5,
            spuId: 4,
            price: 1299.99,
            skuName: "MacBook Pro 14 M2 Pro 512GB",
            SkuDesc: "M2 Pro芯片，14寸视网膜显示屏，深空灰色",
            weight: "1.6kg",
            tmId: "1",
            category3Id: 311,
            skuDefaultImg: `https://picsum.photos/200/200?random=${Math.random()}`,
            isSale: 1
        }
    ]

    return skus
}

// 模拟数据存储
let skuList = createSkuList()

export default [
    // 获取SKU列表接口
    {
        url: '/api/admin/product/list',
        method: 'get',
        response: (config) => {
            try {
                // 从查询参数中获取页码和每页数量
                const pageNum = parseInt(config.query.page) || 1
                const pageSize = parseInt(config.query.limit) || 10

                if (pageNum < 1 || pageSize < 1) {
                    return {
                        code: 201,
                        message: '参数错误',
                        data: {
                            records: [],
                            total: 0,
                            size: pageSize,
                            current: pageNum,
                            pages: 0,
                            searchCount: true,
                            optimizeCountSql: true,
                            hitCount: false
                        }
                    }
                }

                // 计算分页
                const start = (pageNum - 1) * pageSize
                const end = start + pageSize
                const records = skuList.slice(start, end)

                return {
                    code: 200,
                    message: '获取SKU列表成功',
                    data: {
                        records,
                        total: skuList.length,
                        size: pageSize,
                        current: pageNum,
                        pages: Math.ceil(skuList.length / pageSize),
                        searchCount: true,
                        optimizeCountSql: true,
                        hitCount: false
                    }
                }

            } catch (error) {
                console.error('Mock server error:', error)
                return {
                    code: 201,
                    message: '获取SKU列表失败',
                    data: {
                        records: [],
                        total: 0,
                        size: 10,
                        current: 1,
                        pages: 0,
                        searchCount: true,
                        optimizeCountSql: true,
                        hitCount: false
                    }
                }
            }
        }
    },
    // 商品上架接口
    {
        url: '/api/admin/product/onSale/:skuId',
        method: 'get',
        response: (config) => {
            try {
                // 从URL中获取skuId
                const skuId = parseInt(config.url.split('/').pop() || '0')

                if (!skuId) {
                    return {
                        code: 201,
                        message: '参数错误',
                        data: null
                    }
                }

                // 查找对应的SKU并更新状态
                const sku = skuList.find(item => item.id === skuId)
                if (!sku) {
                    return {
                        code: 201,
                        message: '未找到对应的SKU',
                        data: null
                    }
                }

                // 更新上架状态
                sku.isSale = 1

                return {
                    code: 200,
                    message: '商品上架成功',
                    data: null
                }
            } catch (error) {
                console.error('Mock server error:', error)
                return {
                    code: 201,
                    message: '商品上架失败',
                    data: null
                }
            }
        }
    },
    // 商品下架接口
    {
        url: '/api/admin/product/cancelSale/:skuId',
        method: 'get',
        response: (config) => {
            try {
                // 从URL中获取skuId
                const skuId = parseInt(config.url.split('/').pop() || '0')

                if (!skuId) {
                    return {
                        code: 201,
                        message: '参数错误',
                        data: null
                    }
                }

                // 查找对应的SKU并更新状态
                const sku = skuList.find(item => item.id === skuId)
                if (!sku) {
                    return {
                        code: 201,
                        message: '未找到对应的SKU',
                        data: null
                    }
                }

                // 更新下架状态
                sku.isSale = 0

                return {
                    code: 200,
                    message: '商品下架成功',
                    data: null
                }
            } catch (error) {
                console.error('Mock server error:', error)
                return {
                    code: 201,
                    message: '商品下架失败',
                    data: null
                }
            }
        }
    },
    // 删除SKU商品接口
    {
        url: '/api/admin/product/deleteSku/:skuId',
        method: 'delete',
        response: (config) => {
            try {
                // 从URL中获取skuId
                const skuId = parseInt(config.url.split('/').pop() || '0')

                if (!skuId) {
                    return {
                        code: 201,
                        message: '参数错误',
                        data: null
                    }
                }

                // 查找对应的SKU
                const skuIndex = skuList.findIndex(item => item.id === skuId)
                if (skuIndex === -1) {
                    return {
                        code: 201,
                        message: '未找到对应的SKU',
                        data: null
                    }
                }

                // 从数组中删除SKU
                skuList.splice(skuIndex, 1)

                return {
                    code: 200,
                    message: '删除SKU成功',
                    data: null
                }
            } catch (error) {
                console.error('Mock server error:', error)
                return {
                    code: 201,
                    message: '删除SKU失败',
                    data: null
                }
            }
        }
    }
]
