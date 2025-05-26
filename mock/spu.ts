import type { SpuData } from '../src/api/product/spu/type';

// 在文件开头增加品牌列表
const brands = [
    { id: 1, name: 'Apple' },
    { id: 2, name: 'Samsung' },
    { id: 3, name: 'Huawei' },
    { id: 4, name: 'Xiaomi' },
    { id: 5, name: 'OPPO' },
    { id: 6, name: 'vivo' },
    { id: 7, name: 'Sony' },
    { id: 8, name: 'Canon' },
    { id: 9, name: 'LG' },
    { id: 10, name: 'Dell' }
];

// 生成SPU数据
function createSpuList() {
    // 手机数码分类下的SPU
    const phoneSpus = [
        { name: 'iPhone 14 Pro', desc: 'A16仿生芯片，4800万像素主摄', category3Id: 111 },
        { name: 'iPhone 14', desc: 'A15仿生芯片，双摄系统', category3Id: 111 },
        { name: 'Samsung Galaxy S23', desc: '骁龙8 Gen 2，5000万像素主摄', category3Id: 111 },
        { name: 'Huawei Mate 60', desc: '麒麟9000S，超长续航', category3Id: 111 },
        { name: 'Xiaomi 13 Pro', desc: '骁龙8 Gen 2，徕卡专业光学镜头', category3Id: 111 }
    ];

    // 游戏手机分类下的SPU
    const gamePhoneSpus = [
        { name: 'ROG Phone 7', desc: '骁龙8 Gen 2，165Hz刷新率', category3Id: 112 },
        { name: 'Red Magic 8 Pro', desc: '骁龙8 Gen 2，主动散热系统', category3Id: 112 },
        { name: 'Black Shark 5 Pro', desc: '骁龙8 Gen 1，磁动力升降肩键', category3Id: 112 }
    ];

    // 拍照手机分类下的SPU
    const cameraPhoneSpus = [
        { name: 'vivo X90 Pro+', desc: '蔡司专业影像，1英寸大底', category3Id: 113 },
        { name: 'OPPO Find X6 Pro', desc: '哈苏影像，超感光主摄', category3Id: 113 }
    ];

    // 手机配件分类下的SPU
    const phoneAccessorySpus = [
        { name: 'iPhone 14 Pro 手机壳', desc: '液态硅胶，防摔保护', category3Id: 121 },
        { name: 'Samsung S23 钢化膜', desc: '9H硬度，防指纹', category3Id: 122 },
        { name: '65W氮化镓充电器', desc: '多协议快充，小巧便携', category3Id: 123 }
    ];

    // 相机分类下的SPU
    const cameraSpus = [
        { name: 'Sony A7IV', desc: '全画幅微单，3300万像素', category3Id: 131 },
        { name: 'Canon R6 Mark II', desc: '全画幅微单，2420万像素', category3Id: 131 }
    ];

    // 电视分类下的SPU
    const tvSpus = [
        { name: 'Sony A95K', desc: 'QD-OLED面板，XR认知芯片', category3Id: 211 },
        { name: 'Samsung S95C', desc: 'QD-OLED面板，量子点技术', category3Id: 212 },
        { name: 'Xiaomi TV 6 OLED', desc: 'OLED面板，杜比视界', category3Id: 213 }
    ];

    // 空调分类下的SPU
    const acSpus = [
        { name: 'Gree 变频空调', desc: '一级能效，智能温控', category3Id: 221 },
        { name: 'Midea 中央空调', desc: '多联机，智能控制', category3Id: 222 },
        { name: 'Haier 柜式空调', desc: '3匹，智能除菌', category3Id: 223 }
    ];

    // 洗衣机分类下的SPU
    const washerSpus = [
        { name: 'LG 滚筒洗衣机', desc: '10kg大容量，AI智能投放', category3Id: 231 },
        { name: 'Samsung 波轮洗衣机', desc: '8kg容量，泡泡净技术', category3Id: 232 },
        { name: 'Haier 迷你洗衣机', desc: '3kg容量，壁挂式设计', category3Id: 233 }
    ];

    // 笔记本分类下的SPU
    const laptopSpus = [
        { name: 'MacBook Pro 14', desc: 'M2 Pro芯片，Liquid视网膜XDR显示屏', category3Id: 311 },
        { name: 'ThinkPad X1 Carbon', desc: '第13代酷睿，碳纤维机身', category3Id: 312 },
        { name: 'Dell XPS 13', desc: '第13代酷睿，InfinityEdge显示屏', category3Id: 313 }
    ];

    // 合并所有SPU数据
    const allSpus = [
        ...phoneSpus,
        ...gamePhoneSpus,
        ...cameraPhoneSpus,
        ...phoneAccessorySpus,
        ...cameraSpus,
        ...tvSpus,
        ...acSpus,
        ...washerSpus,
        ...laptopSpus
    ];

    return allSpus.map((spu, index) => {
        const tmId = Math.floor(Math.random() * 10) + 1;
        const brand = brands.find(b => b.id === tmId);

        return {
            id: index + 1,
            spuName: spu.name,
            description: spu.desc,
            category3Id: spu.category3Id,
            tmId: tmId,
            tmName: brand?.name || 'Unknown' // 增加品牌名称
        };
    });
}

// 模拟数据存储
let spuList = createSpuList()

export default [
    // 获取SPU列表接口
    {
        url: '/api/admin/product',
        method: 'get',
        response: (config) => {
            try {
                // 解析页码和每页数量
                const page = Number(config.query.page) || 1
                const limit = Number(config.query.limit) || 10
                const category3Id = Number(config.query.category3Id)


                // 根据三级分类ID筛选数据
                const filteredSpus = spuList.filter(spu => spu.category3Id === category3Id)



                // 计算分页
                const start = (page - 1) * limit
                const end = start + limit
                const records = filteredSpus.slice(start, end)

                console.log('Pagination result:', {
                    start,
                    end,
                    recordsLength: records.length,
                    totalRecords: filteredSpus.length
                })

                const result = {
                    code: 200,
                    message: '获取SPU列表成功',
                    data: {
                        records,
                        total: filteredSpus.length,
                        size: limit,
                        current: page,
                        pages: Math.ceil(filteredSpus.length / limit)
                    },
                    ok: true
                }

                console.log('Sending response:', result)
                return result

            } catch (error) {
                console.error('Mock server error:', error)
                return {
                    code: 201,
                    message: '获取SPU列表失败',
                    data: {
                        records: [],
                        total: 0,
                        size: 10,
                        current: 1,
                        pages: 0
                    },
                    ok: false
                }
            }
        }
    },

    // 添加SPU接口
    {
        url: '/api/admin/product/addNewSpu',
        method: 'post',
        response: (config) => {
            try {
                const newSpu = config.body
                console.log('Received SPU data:', newSpu)

                // 生成新的ID
                const newId = spuList.length + 1
                const spuToAdd = {
                    ...newSpu,
                    id: newId
                }

                // 添加到列表中
                spuList.push(spuToAdd)

                return {
                    code: 200,
                    message: 'SPU添加成功',
                    data: null,
                    ok: true
                }
            } catch (error) {
                console.error('Error adding SPU:', error)
                return {
                    code: 201,
                    message: 'SPU添加失败',
                    data: null,
                    ok: false
                }
            }
        }
    },

    // 获取品牌列表接口
    {
        url: '/api/admin/product/getBrandList',
        method: 'get',
        response: () => {
            return {
                code: 200,
                message: '获取品牌列表成功',
                data: brands,
                ok: true
            }
        }
    },

    // 删除SPU接口
    {
        url: '/api/admin/product/deleteSpu/:spuId',
        method: 'delete',
        response: ({ url }) => {
            try {
                // 从URL中提取spuId
                const spuId = url.split('/').pop()
                console.log('Mock server received delete request for spuId:', spuId)

                if (!spuId) {
                    return {
                        code: 201,
                        message: 'SPU ID不能为空',
                        data: null,
                        ok: false
                    }
                }

                const index = spuList.findIndex(spu => spu.id === Number(spuId))
                console.log('Found SPU at index:', index, 'with ID:', spuId)

                if (index === -1) {
                    console.log('SPU not found with ID:', spuId)
                    return {
                        code: 201,
                        message: '未找到要删除的SPU',
                        data: null,
                        ok: false
                    }
                }

                // 删除SPU
                const deletedSpu = spuList.splice(index, 1)[0]
                console.log('Successfully deleted SPU:', deletedSpu)

                return {
                    code: 200,
                    message: 'SPU删除成功',
                    data: null,
                    ok: true
                }
            } catch (error) {
                console.error('Delete SPU error:', error)
                return {
                    code: 201,
                    message: 'SPU删除失败',
                    data: null,
                    ok: false
                }
            }
        }
    },

    // 更新SPU接口
    {
        url: '/api/admin/product/updateSpu',
        method: 'put',
        response: ({ body }) => {
            try {
                const updateData = body
                console.log('Updating SPU with data:', updateData)

                const index = spuList.findIndex(spu => spu.id === updateData.id)
                if (index === -1) {
                    return {
                        code: 201,
                        message: '未找到要更新的SPU',
                        data: null,
                        ok: false
                    }
                }

                // 更新SPU数据
                spuList[index] = {
                    ...spuList[index],
                    ...updateData
                }

                return {
                    code: 200,
                    message: 'SPU更新成功',
                    data: null,
                    ok: true
                }
            } catch (error) {
                console.error('Update SPU error:', error)
                return {
                    code: 201,
                    message: 'SPU更新失败',
                    data: null,
                    ok: false
                }
            }
        }
    }
]