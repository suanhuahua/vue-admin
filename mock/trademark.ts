import axios from "axios"
import { log } from "console"

//品牌信息数据
function createTrademarkList() {
    const brands = [
        '华为', '小米', '苹果', '三星', 'OPPO', 'vivo', '魅族', '一加', 'realme', 'iQOO',
        '联想', '华硕', '戴尔', '惠普', '宏碁', '微软', '索尼', 'LG', '松下', '夏普',
        '飞利浦', '西门子', '博世', '松下', '三菱', '日立', '东芝', '美的', '格力', '海尔',
        '海信', '创维', 'TCL', '康佳', '长虹', '奥克斯', '志高', '格兰仕', '苏泊尔', '九阳',
        '奔腾', '小熊', '美的', '格力', '海尔', '海信', '创维', 'TCL', '康佳', '长虹',
        '奥克斯', '志高', '格兰仕', '苏泊尔', '九阳', '奔腾', '小熊', '美的', '格力', '海尔',
        '海信', '创维', 'TCL', '康佳', '长虹', '奥克斯', '志高', '格兰仕', '苏泊尔', '九阳',
        '奔腾', '小熊', '美的', '格力', '海尔', '海信', '创维', 'TCL', '康佳', '长虹',
        '奥克斯', '志高', '格兰仕', '苏泊尔', '九阳', '奔腾', '小熊', '美的', '格力', '海尔',
        '海信', '创维', 'TCL', '康佳', '长虹', '奥克斯', '志高', '格兰仕', '苏泊尔', '九阳'
    ]

    // 使用默认图片作为备用
    const defaultLogo = 'https://img.alicdn.com/imgextra/i4/O1CN01Z5paLz1O0zuCC7osS_!!6000000001644-55-tps-83-82.svg'

    // 生成随机URL图片
    const getRandomImageUrl = (index: number) => {
        // 使用索引和当前时间戳的组合来确保每个URL都是唯一的
        return `https://picsum.photos/200/200?random=${Date.now() + index}`
    }

    return brands.map((brand, index) => ({
        id: index + 1,
        tmName: brand,
        logoUrl: getRandomImageUrl(index)
    }))
}

// 模拟数据存储
let trademarkList = createTrademarkList()

export default [
    // 获取品牌列表接口
    {
        url: '/api/admin/product/baseTrademark',
        method: 'post',
        response: ({ body }) => {
            try {
                const { page, limit } = body

                if (!page || !limit || page < 1 || limit < 1) {
                    return {
                        code: 201,
                        message: '参数错误',
                        data: null,
                        total: 0
                    }
                }

                const start = (page - 1) * limit
                const end = start + limit
                const records = trademarkList.slice(start, end)

                return {
                    code: 200,
                    message: 'success',
                    data: {
                        records,
                        total: trademarkList.length,
                        size: limit,
                        current: page,
                        pages: Math.ceil(trademarkList.length / limit)
                    },
                    total: trademarkList.length
                }
            } catch (error) {
                return {
                    code: 201,
                    message: '获取品牌列表失败',
                    data: null,
                    total: 0
                }
            }
        }
    },
    // 添加或修改品牌
    {
        url: '/api/admin/product/baseTrademark/save',
        method: 'post',
        response: ({ body }) => {
            try {
                // 如果是编辑操作，更新现有数据
                if (body.id) {
                    const index = trademarkList.findIndex(item => item.id === body.id)
                    if (index !== -1) {
                        trademarkList[index] = { ...trademarkList[index], ...body }
                        return {
                            code: 200,
                            message: '修改成功',
                            data: null
                        }
                    }
                    return {
                        code: 201,
                        message: '品牌不存在',
                        data: null
                    }
                } else {
                    // 如果是添加操作，创建新数据
                    const newTrademark = {
                        id: trademarkList.length + 1,
                        ...body
                    }
                    trademarkList.unshift(newTrademark)
                    return {
                        code: 200,
                        message: '添加成功',
                        data: null
                    }
                }
            } catch (error) {
                return {
                    code: 201,
                    message: body.id ? '修改失败' : '添加失败',
                    data: null
                }
            }
        }
    },
    // 删除品牌
    {
        url: '/api/admin/product/baseTrademark/remove',
        method: 'delete',
        response: ({ query }) => {
            try {
                const id = Number(query.id)
                if (isNaN(id)) {
                    return {
                        code: 201,
                        message: '无效的ID',
                        data: null,
                        ok: false
                    }
                }

                const index = trademarkList.findIndex(item => item.id === id)
                if (index === -1) {
                    return {
                        code: 201,
                        message: '品牌不存在',
                        data: null,
                        ok: false
                    }
                }

                // 从数组中删除元素
                trademarkList.splice(index, 1)

                // 重新生成ID，确保ID连续
                trademarkList = trademarkList.map((item, index) => ({
                    ...item,
                    id: index + 1
                }))

                return {
                    code: 200,
                    message: '删除成功',
                    data: null,
                    ok: true
                }
            } catch (error) {
                return {
                    code: 201,
                    message: '删除失败',
                    data: null,
                    ok: false
                }
            }
        }
    }
]
