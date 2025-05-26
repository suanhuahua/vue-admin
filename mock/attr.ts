// 商品属性管理模块接口
import { log } from 'console';
import type { MockMethod } from 'vite-plugin-mock'

// 定义分类数据类型
interface Category {
    id: number;
    name: string;
}

// 一级分类数据
const category1List: Category[] = [
    { id: 1, name: '手机数码' },
    { id: 2, name: '家用电器' },
    { id: 3, name: '电脑办公' },
    { id: 4, name: '服装鞋包' },
    { id: 5, name: '食品生鲜' }
];

// 二级分类数据
const category2List: Record<number, Category[]> = {
    1: [
        { id: 11, name: '手机通讯' },
        { id: 12, name: '手机配件' },
        { id: 13, name: '摄影摄像' }
    ],
    2: [
        { id: 21, name: '电视' },
        { id: 22, name: '空调' },
        { id: 23, name: '洗衣机' }
    ],
    3: [
        { id: 31, name: '笔记本' },
        { id: 32, name: '台式机' },
        { id: 33, name: '平板电脑' }
    ],
    4: [
        { id: 41, name: '女装' },
        { id: 42, name: '男装' },
        { id: 43, name: '内衣' }
    ],
    5: [
        { id: 51, name: '新鲜水果' },
        { id: 52, name: '海鲜水产' },
        { id: 53, name: '肉禽蛋品' }
    ]
};

// 三级分类数据
const category3List: Record<number, Category[]> = {
    11: [
        { id: 111, name: '手机' },
        { id: 112, name: '游戏手机' },
        { id: 113, name: '拍照手机' }
    ],
    12: [
        { id: 121, name: '手机壳' },
        { id: 122, name: '贴膜' },
        { id: 123, name: '充电器' }
    ],
    13: [
        { id: 131, name: '相机' },
        { id: 132, name: '摄像机' },
        { id: 133, name: '镜头' }
    ],
    21: [
        { id: 211, name: '超薄电视' },
        { id: 212, name: 'OLED电视' },
        { id: 213, name: '智能电视' }
    ],
    22: [
        { id: 221, name: '变频空调' },
        { id: 222, name: '中央空调' },
        { id: 223, name: '柜式空调' }
    ],
    23: [
        { id: 231, name: '滚筒洗衣机' },
        { id: 232, name: '波轮洗衣机' },
        { id: 233, name: '迷你洗衣机' }
    ],
    31: [
        { id: 311, name: '笔记本' },
        { id: 312, name: '台式机' },
        { id: 313, name: '平板电脑' }
    ],
    32: [
        { id: 321, name: '台式机' },
        { id: 322, name: '一体机' },
        { id: 323, name: '组装机' }
    ],
    33: [
        { id: 331, name: '平板电脑' },
        { id: 332, name: '电子书' },
        { id: 333, name: '学习机' }
    ],
    41: [
        { id: 411, name: '女装' },
        { id: 412, name: '男装' },
        { id: 413, name: '内衣' }
    ],
    42: [
        { id: 421, name: '衬衫' },
        { id: 422, name: '西装' },
        { id: 423, name: '休闲裤' }
    ],
    43: [
        { id: 431, name: '文胸' },
        { id: 432, name: '内裤' },
        { id: 433, name: '睡衣' }
    ],
    51: [
        { id: 511, name: '新鲜水果' },
        { id: 512, name: '香蕉' },
        { id: 513, name: '橙子' }
    ],
    52: [
        { id: 521, name: '鱼类' },
        { id: 522, name: '虾类' },
        { id: 523, name: '蟹类' }
    ],
    53: [
        { id: 531, name: '猪肉' },
        { id: 532, name: '牛肉' },
        { id: 533, name: '禽类' }
    ]
};

// 定义属性数据类型
interface AttrValue {
    id: number;
    valueName: string;
    attrId: number;
}

interface Attr {
    id: number;
    attrName: string;
    categoryId: number;
    categoryLevel: number;
    attrValueList: AttrValue[];
}

// 模拟属性数据
const attrList: Record<string, Attr[]> = {
    // 手机分类下的属性
    '111': [
        {
            id: 1,
            attrName: '屏幕尺寸',
            categoryId: 111,
            categoryLevel: 3,
            attrValueList: [
                { id: 1, valueName: '6.1英寸', attrId: 1 },
                { id: 2, valueName: '6.7英寸', attrId: 1 }
            ]
        },
        {
            id: 2,
            attrName: '颜色',
            categoryId: 111,
            categoryLevel: 3,
            attrValueList: [
                { id: 3, valueName: '黑色', attrId: 2 },
                { id: 4, valueName: '白色', attrId: 2 },
                { id: 5, valueName: '蓝色', attrId: 2 }
            ]
        },
        {
            id: 3,
            attrName: '运行内存',
            categoryId: 111,
            categoryLevel: 3,
            attrValueList: [
                { id: 6, valueName: '8GB', attrId: 3 },
                { id: 7, valueName: '12GB', attrId: 3 },
                { id: 8, valueName: '16GB', attrId: 3 }
            ]
        }
    ],
    // 游戏手机分类下的属性
    '112': [
        {
            id: 4,
            attrName: '处理器',
            categoryId: 112,
            categoryLevel: 3,
            attrValueList: [
                { id: 9, valueName: '骁龙8 Gen 2', attrId: 4 },
                { id: 10, valueName: '天玑9200+', attrId: 4 }
            ]
        },
        {
            id: 5,
            attrName: '散热系统',
            categoryId: 112,
            categoryLevel: 3,
            attrValueList: [
                { id: 11, valueName: '液冷散热', attrId: 5 },
                { id: 12, valueName: '石墨烯散热', attrId: 5 }
            ]
        }
    ],
    // 拍照手机分类下的属性
    '113': [
        {
            id: 17,
            attrName: '摄像头',
            categoryId: 113,
            categoryLevel: 3,
            attrValueList: [
                { id: 47, valueName: '5000万像素', attrId: 17 },
                { id: 48, valueName: '1亿像素', attrId: 17 }
            ]
        },
        {
            id: 18,
            attrName: '光学防抖',
            categoryId: 113,
            categoryLevel: 3,
            attrValueList: [
                { id: 49, valueName: '支持', attrId: 18 },
                { id: 50, valueName: '不支持', attrId: 18 }
            ]
        }
    ],
    // 手机壳分类下的属性
    '121': [
        {
            id: 19,
            attrName: '材质',
            categoryId: 121,
            categoryLevel: 3,
            attrValueList: [
                { id: 51, valueName: '硅胶', attrId: 19 },
                { id: 52, valueName: 'TPU', attrId: 19 },
                { id: 53, valueName: '皮革', attrId: 19 }
            ]
        },
        {
            id: 20,
            attrName: '防摔等级',
            categoryId: 121,
            categoryLevel: 3,
            attrValueList: [
                { id: 54, valueName: '1米', attrId: 20 },
                { id: 55, valueName: '2米', attrId: 20 },
                { id: 56, valueName: '3米', attrId: 20 }
            ]
        }
    ],
    // 贴膜分类下的属性
    '122': [
        {
            id: 21,
            attrName: '材质',
            categoryId: 122,
            categoryLevel: 3,
            attrValueList: [
                { id: 57, valueName: '钢化玻璃', attrId: 21 },
                { id: 58, valueName: '水凝膜', attrId: 21 }
            ]
        },
        {
            id: 22,
            attrName: '厚度',
            categoryId: 122,
            categoryLevel: 3,
            attrValueList: [
                { id: 59, valueName: '0.2mm', attrId: 22 },
                { id: 60, valueName: '0.3mm', attrId: 22 }
            ]
        }
    ],
    // 充电器分类下的属性
    '123': [
        {
            id: 23,
            attrName: '功率',
            categoryId: 123,
            categoryLevel: 3,
            attrValueList: [
                { id: 61, valueName: '20W', attrId: 23 },
                { id: 62, valueName: '30W', attrId: 23 },
                { id: 63, valueName: '65W', attrId: 23 }
            ]
        },
        {
            id: 24,
            attrName: '接口类型',
            categoryId: 123,
            categoryLevel: 3,
            attrValueList: [
                { id: 64, valueName: 'Type-C', attrId: 24 },
                { id: 65, valueName: 'Lightning', attrId: 24 }
            ]
        }
    ],
    // 相机分类下的属性
    '131': [
        {
            id: 25,
            attrName: '传感器',
            categoryId: 131,
            categoryLevel: 3,
            attrValueList: [
                { id: 66, valueName: 'APS-C', attrId: 25 },
                { id: 67, valueName: '全画幅', attrId: 25 }
            ]
        },
        {
            id: 26,
            attrName: '像素',
            categoryId: 131,
            categoryLevel: 3,
            attrValueList: [
                { id: 68, valueName: '2400万', attrId: 26 },
                { id: 69, valueName: '3000万', attrId: 26 }
            ]
        }
    ],
    // 摄像机分类下的属性
    '132': [
        {
            id: 27,
            attrName: '分辨率',
            categoryId: 132,
            categoryLevel: 3,
            attrValueList: [
                { id: 70, valueName: '4K', attrId: 27 },
                { id: 71, valueName: '8K', attrId: 27 }
            ]
        },
        {
            id: 28,
            attrName: '防抖',
            categoryId: 132,
            categoryLevel: 3,
            attrValueList: [
                { id: 72, valueName: '光学防抖', attrId: 28 },
                { id: 73, valueName: '电子防抖', attrId: 28 }
            ]
        }
    ],
    // 镜头分类下的属性
    '133': [
        {
            id: 29,
            attrName: '焦距',
            categoryId: 133,
            categoryLevel: 3,
            attrValueList: [
                { id: 74, valueName: '24-70mm', attrId: 29 },
                { id: 75, valueName: '70-200mm', attrId: 29 }
            ]
        },
        {
            id: 30,
            attrName: '光圈',
            categoryId: 133,
            categoryLevel: 3,
            attrValueList: [
                { id: 76, valueName: 'f/2.8', attrId: 30 },
                { id: 77, valueName: 'f/4', attrId: 30 }
            ]
        }
    ],
    // 电视分类下的属性
    '211': [
        {
            id: 6,
            attrName: '屏幕尺寸',
            categoryId: 211,
            categoryLevel: 3,
            attrValueList: [
                { id: 13, valueName: '55英寸', attrId: 6 },
                { id: 14, valueName: '65英寸', attrId: 6 },
                { id: 15, valueName: '75英寸', attrId: 6 }
            ]
        },
        {
            id: 7,
            attrName: '分辨率',
            categoryId: 211,
            categoryLevel: 3,
            attrValueList: [
                { id: 16, valueName: '4K', attrId: 7 },
                { id: 17, valueName: '8K', attrId: 7 }
            ]
        },
        {
            id: 8,
            attrName: '显示技术',
            categoryId: 211,
            categoryLevel: 3,
            attrValueList: [
                { id: 18, valueName: 'OLED', attrId: 8 },
                { id: 19, valueName: 'QLED', attrId: 8 },
                { id: 20, valueName: 'Mini LED', attrId: 8 }
            ]
        }
    ],
    // OLED电视分类下的属性
    '212': [
        {
            id: 31,
            attrName: '屏幕尺寸',
            categoryId: 212,
            categoryLevel: 3,
            attrValueList: [
                { id: 78, valueName: '55英寸', attrId: 31 },
                { id: 79, valueName: '65英寸', attrId: 31 },
                { id: 80, valueName: '77英寸', attrId: 31 }
            ]
        },
        {
            id: 32,
            attrName: '刷新率',
            categoryId: 212,
            categoryLevel: 3,
            attrValueList: [
                { id: 81, valueName: '120Hz', attrId: 32 },
                { id: 82, valueName: '144Hz', attrId: 32 }
            ]
        }
    ],
    // 智能电视分类下的属性
    '213': [
        {
            id: 33,
            attrName: '操作系统',
            categoryId: 213,
            categoryLevel: 3,
            attrValueList: [
                { id: 83, valueName: 'Android TV', attrId: 33 },
                { id: 84, valueName: 'WebOS', attrId: 33 }
            ]
        },
        {
            id: 34,
            attrName: '内存',
            categoryId: 213,
            categoryLevel: 3,
            attrValueList: [
                { id: 85, valueName: '2GB', attrId: 34 },
                { id: 86, valueName: '3GB', attrId: 34 }
            ]
        }
    ],
    // 空调分类下的属性
    '221': [
        {
            id: 9,
            attrName: '匹数',
            categoryId: 221,
            categoryLevel: 3,
            attrValueList: [
                { id: 21, valueName: '1.5匹', attrId: 9 },
                { id: 22, valueName: '2匹', attrId: 9 },
                { id: 23, valueName: '3匹', attrId: 9 }
            ]
        },
        {
            id: 10,
            attrName: '能效等级',
            categoryId: 221,
            categoryLevel: 3,
            attrValueList: [
                { id: 24, valueName: '一级能效', attrId: 10 },
                { id: 25, valueName: '二级能效', attrId: 10 },
                { id: 26, valueName: '三级能效', attrId: 10 }
            ]
        }
    ],
    // 中央空调分类下的属性
    '222': [
        {
            id: 35,
            attrName: '制冷量',
            categoryId: 222,
            categoryLevel: 3,
            attrValueList: [
                { id: 87, valueName: '5匹', attrId: 35 },
                { id: 88, valueName: '6匹', attrId: 35 },
                { id: 89, valueName: '8匹', attrId: 35 }
            ]
        },
        {
            id: 36,
            attrName: '能效比',
            categoryId: 222,
            categoryLevel: 3,
            attrValueList: [
                { id: 90, valueName: '3.5', attrId: 36 },
                { id: 91, valueName: '4.0', attrId: 36 }
            ]
        }
    ],
    // 柜式空调分类下的属性
    '223': [
        {
            id: 37,
            attrName: '匹数',
            categoryId: 223,
            categoryLevel: 3,
            attrValueList: [
                { id: 92, valueName: '2匹', attrId: 37 },
                { id: 93, valueName: '3匹', attrId: 37 },
                { id: 94, valueName: '5匹', attrId: 37 }
            ]
        },
        {
            id: 38,
            attrName: '送风方式',
            categoryId: 223,
            categoryLevel: 3,
            attrValueList: [
                { id: 95, valueName: '上下扫风', attrId: 38 },
                { id: 96, valueName: '左右扫风', attrId: 38 }
            ]
        }
    ],
    // 洗衣机分类下的属性
    '231': [
        {
            id: 39,
            attrName: '容量',
            categoryId: 231,
            categoryLevel: 3,
            attrValueList: [
                { id: 97, valueName: '8kg', attrId: 39 },
                { id: 98, valueName: '10kg', attrId: 39 },
                { id: 99, valueName: '12kg', attrId: 39 }
            ]
        },
        {
            id: 40,
            attrName: '能效等级',
            categoryId: 231,
            categoryLevel: 3,
            attrValueList: [
                { id: 100, valueName: '一级能效', attrId: 40 },
                { id: 101, valueName: '二级能效', attrId: 40 }
            ]
        }
    ],
    // 波轮洗衣机分类下的属性
    '232': [
        {
            id: 41,
            attrName: '容量',
            categoryId: 232,
            categoryLevel: 3,
            attrValueList: [
                { id: 102, valueName: '6kg', attrId: 41 },
                { id: 103, valueName: '8kg', attrId: 41 },
                { id: 104, valueName: '10kg', attrId: 41 }
            ]
        },
        {
            id: 42,
            attrName: '转速',
            categoryId: 232,
            categoryLevel: 3,
            attrValueList: [
                { id: 105, valueName: '800转/分', attrId: 42 },
                { id: 106, valueName: '1000转/分', attrId: 42 }
            ]
        }
    ],
    // 迷你洗衣机分类下的属性
    '233': [
        {
            id: 43,
            attrName: '容量',
            categoryId: 233,
            categoryLevel: 3,
            attrValueList: [
                { id: 107, valueName: '3kg', attrId: 43 },
                { id: 108, valueName: '4kg', attrId: 43 }
            ]
        },
        {
            id: 44,
            attrName: '安装方式',
            categoryId: 233,
            categoryLevel: 3,
            attrValueList: [
                { id: 109, valueName: '壁挂式', attrId: 44 },
                { id: 110, valueName: '台式', attrId: 44 }
            ]
        }
    ],
    // 笔记本分类下的属性
    '311': [
        {
            id: 11,
            attrName: '处理器',
            categoryId: 311,
            categoryLevel: 3,
            attrValueList: [
                { id: 27, valueName: 'i5', attrId: 11 },
                { id: 28, valueName: 'i7', attrId: 11 },
                { id: 29, valueName: 'i9', attrId: 11 }
            ]
        },
        {
            id: 12,
            attrName: '显卡',
            categoryId: 311,
            categoryLevel: 3,
            attrValueList: [
                { id: 30, valueName: 'RTX 3050', attrId: 12 },
                { id: 31, valueName: 'RTX 3060', attrId: 12 },
                { id: 32, valueName: 'RTX 3070', attrId: 12 }
            ]
        }
    ],
    // 轻薄本分类下的属性
    '312': [
        {
            id: 45,
            attrName: '处理器',
            categoryId: 312,
            categoryLevel: 3,
            attrValueList: [
                { id: 111, valueName: 'i5', attrId: 45 },
                { id: 112, valueName: 'i7', attrId: 45 }
            ]
        },
        {
            id: 46,
            attrName: '重量',
            categoryId: 312,
            categoryLevel: 3,
            attrValueList: [
                { id: 113, valueName: '1.3kg', attrId: 46 },
                { id: 114, valueName: '1.5kg', attrId: 46 }
            ]
        }
    ],
    // 商务本分类下的属性
    '313': [
        {
            id: 47,
            attrName: '处理器',
            categoryId: 313,
            categoryLevel: 3,
            attrValueList: [
                { id: 115, valueName: 'i5', attrId: 47 },
                { id: 116, valueName: 'i7', attrId: 47 }
            ]
        },
        {
            id: 48,
            attrName: '内存',
            categoryId: 313,
            categoryLevel: 3,
            attrValueList: [
                { id: 117, valueName: '16GB', attrId: 48 },
                { id: 118, valueName: '32GB', attrId: 48 }
            ]
        }
    ],
    // 台式机分类下的属性
    '321': [
        {
            id: 49,
            attrName: '处理器',
            categoryId: 321,
            categoryLevel: 3,
            attrValueList: [
                { id: 119, valueName: 'i5', attrId: 49 },
                { id: 120, valueName: 'i7', attrId: 49 },
                { id: 121, valueName: 'i9', attrId: 49 }
            ]
        },
        {
            id: 50,
            attrName: '显卡',
            categoryId: 321,
            categoryLevel: 3,
            attrValueList: [
                { id: 122, valueName: 'RTX 3060', attrId: 50 },
                { id: 123, valueName: 'RTX 3070', attrId: 50 },
                { id: 124, valueName: 'RTX 3080', attrId: 50 }
            ]
        }
    ],
    // 一体机分类下的属性
    '322': [
        {
            id: 51,
            attrName: '处理器',
            categoryId: 322,
            categoryLevel: 3,
            attrValueList: [
                { id: 125, valueName: 'i5', attrId: 51 },
                { id: 126, valueName: 'i7', attrId: 51 }
            ]
        },
        {
            id: 52,
            attrName: '屏幕尺寸',
            categoryId: 322,
            categoryLevel: 3,
            attrValueList: [
                { id: 127, valueName: '23.8英寸', attrId: 52 },
                { id: 128, valueName: '27英寸', attrId: 52 }
            ]
        }
    ],
    // 组装机分类下的属性
    '323': [
        {
            id: 53,
            attrName: '处理器',
            categoryId: 323,
            categoryLevel: 3,
            attrValueList: [
                { id: 129, valueName: 'i5', attrId: 53 },
                { id: 130, valueName: 'i7', attrId: 53 },
                { id: 131, valueName: 'i9', attrId: 53 }
            ]
        },
        {
            id: 54,
            attrName: '主板',
            categoryId: 323,
            categoryLevel: 3,
            attrValueList: [
                { id: 132, valueName: 'B660', attrId: 54 },
                { id: 133, valueName: 'Z690', attrId: 54 }
            ]
        }
    ],
    // 平板电脑分类下的属性
    '331': [
        {
            id: 55,
            attrName: '处理器',
            categoryId: 331,
            categoryLevel: 3,
            attrValueList: [
                { id: 134, valueName: 'A14', attrId: 55 },
                { id: 135, valueName: 'A15', attrId: 55 }
            ]
        },
        {
            id: 56,
            attrName: '屏幕尺寸',
            categoryId: 331,
            categoryLevel: 3,
            attrValueList: [
                { id: 136, valueName: '10.2英寸', attrId: 56 },
                { id: 137, valueName: '11英寸', attrId: 56 }
            ]
        }
    ],
    // 电子书分类下的属性
    '332': [
        {
            id: 57,
            attrName: '屏幕尺寸',
            categoryId: 332,
            categoryLevel: 3,
            attrValueList: [
                { id: 138, valueName: '6英寸', attrId: 57 },
                { id: 139, valueName: '7英寸', attrId: 57 }
            ]
        },
        {
            id: 58,
            attrName: '存储容量',
            categoryId: 332,
            categoryLevel: 3,
            attrValueList: [
                { id: 140, valueName: '8GB', attrId: 58 },
                { id: 141, valueName: '16GB', attrId: 58 }
            ]
        }
    ],
    // 学习机分类下的属性
    '333': [
        {
            id: 59,
            attrName: '屏幕尺寸',
            categoryId: 333,
            categoryLevel: 3,
            attrValueList: [
                { id: 142, valueName: '10.1英寸', attrId: 59 },
                { id: 143, valueName: '11英寸', attrId: 59 }
            ]
        },
        {
            id: 60,
            attrName: '内存',
            categoryId: 333,
            categoryLevel: 3,
            attrValueList: [
                { id: 144, valueName: '4GB', attrId: 60 },
                { id: 145, valueName: '6GB', attrId: 60 }
            ]
        }
    ],
    // 女装分类下的属性
    '411': [
        {
            id: 13,
            attrName: '尺码',
            categoryId: 411,
            categoryLevel: 3,
            attrValueList: [
                { id: 33, valueName: 'S', attrId: 13 },
                { id: 34, valueName: 'M', attrId: 13 },
                { id: 35, valueName: 'L', attrId: 13 },
                { id: 36, valueName: 'XL', attrId: 13 }
            ]
        },
        {
            id: 14,
            attrName: '颜色',
            categoryId: 411,
            categoryLevel: 3,
            attrValueList: [
                { id: 37, valueName: '红色', attrId: 14 },
                { id: 38, valueName: '白色', attrId: 14 },
                { id: 39, valueName: '黑色', attrId: 14 },
                { id: 40, valueName: '粉色', attrId: 14 }
            ]
        }
    ],
    // T恤分类下的属性
    '412': [
        {
            id: 61,
            attrName: '尺码',
            categoryId: 412,
            categoryLevel: 3,
            attrValueList: [
                { id: 146, valueName: 'S', attrId: 61 },
                { id: 147, valueName: 'M', attrId: 61 },
                { id: 148, valueName: 'L', attrId: 61 }
            ]
        },
        {
            id: 62,
            attrName: '材质',
            categoryId: 412,
            categoryLevel: 3,
            attrValueList: [
                { id: 149, valueName: '纯棉', attrId: 62 },
                { id: 150, valueName: '莫代尔', attrId: 62 }
            ]
        }
    ],
    // 牛仔裤分类下的属性
    '413': [
        {
            id: 63,
            attrName: '尺码',
            categoryId: 413,
            categoryLevel: 3,
            attrValueList: [
                { id: 151, valueName: '28', attrId: 63 },
                { id: 152, valueName: '29', attrId: 63 },
                { id: 153, valueName: '30', attrId: 63 }
            ]
        },
        {
            id: 64,
            attrName: '款式',
            categoryId: 413,
            categoryLevel: 3,
            attrValueList: [
                { id: 154, valueName: '直筒', attrId: 64 },
                { id: 155, valueName: '修身', attrId: 64 }
            ]
        }
    ],
    // 男装分类下的属性
    '421': [
        {
            id: 65,
            attrName: '尺码',
            categoryId: 421,
            categoryLevel: 3,
            attrValueList: [
                { id: 156, valueName: 'M', attrId: 65 },
                { id: 157, valueName: 'L', attrId: 65 },
                { id: 158, valueName: 'XL', attrId: 65 }
            ]
        },
        {
            id: 66,
            attrName: '材质',
            categoryId: 421,
            categoryLevel: 3,
            attrValueList: [
                { id: 159, valueName: '棉', attrId: 66 },
                { id: 160, valueName: '亚麻', attrId: 66 }
            ]
        }
    ],
    // 西装分类下的属性
    '422': [
        {
            id: 67,
            attrName: '尺码',
            categoryId: 422,
            categoryLevel: 3,
            attrValueList: [
                { id: 161, valueName: '48', attrId: 67 },
                { id: 162, valueName: '50', attrId: 67 },
                { id: 163, valueName: '52', attrId: 67 }
            ]
        },
        {
            id: 68,
            attrName: '款式',
            categoryId: 422,
            categoryLevel: 3,
            attrValueList: [
                { id: 164, valueName: '单排扣', attrId: 68 },
                { id: 165, valueName: '双排扣', attrId: 68 }
            ]
        }
    ],
    // 休闲裤分类下的属性
    '423': [
        {
            id: 69,
            attrName: '尺码',
            categoryId: 423,
            categoryLevel: 3,
            attrValueList: [
                { id: 166, valueName: '30', attrId: 69 },
                { id: 167, valueName: '32', attrId: 69 },
                { id: 168, valueName: '34', attrId: 69 }
            ]
        },
        {
            id: 70,
            attrName: '款式',
            categoryId: 423,
            categoryLevel: 3,
            attrValueList: [
                { id: 169, valueName: '直筒', attrId: 70 },
                { id: 170, valueName: '束脚', attrId: 70 }
            ]
        }
    ],
    // 内衣分类下的属性
    '431': [
        {
            id: 71,
            attrName: '尺码',
            categoryId: 431,
            categoryLevel: 3,
            attrValueList: [
                { id: 171, valueName: '75B', attrId: 71 },
                { id: 172, valueName: '80B', attrId: 71 },
                { id: 173, valueName: '85B', attrId: 71 }
            ]
        },
        {
            id: 72,
            attrName: '材质',
            categoryId: 431,
            categoryLevel: 3,
            attrValueList: [
                { id: 174, valueName: '棉质', attrId: 72 },
                { id: 175, valueName: '蕾丝', attrId: 72 }
            ]
        }
    ],
    // 内裤分类下的属性
    '432': [
        {
            id: 73,
            attrName: '尺码',
            categoryId: 432,
            categoryLevel: 3,
            attrValueList: [
                { id: 176, valueName: 'M', attrId: 73 },
                { id: 177, valueName: 'L', attrId: 73 },
                { id: 178, valueName: 'XL', attrId: 73 }
            ]
        },
        {
            id: 74,
            attrName: '材质',
            categoryId: 432,
            categoryLevel: 3,
            attrValueList: [
                { id: 179, valueName: '纯棉', attrId: 74 },
                { id: 180, valueName: '莫代尔', attrId: 74 }
            ]
        }
    ],
    // 睡衣分类下的属性
    '433': [
        {
            id: 75,
            attrName: '尺码',
            categoryId: 433,
            categoryLevel: 3,
            attrValueList: [
                { id: 181, valueName: 'M', attrId: 75 },
                { id: 182, valueName: 'L', attrId: 75 },
                { id: 183, valueName: 'XL', attrId: 75 }
            ]
        },
        {
            id: 76,
            attrName: '材质',
            categoryId: 433,
            categoryLevel: 3,
            attrValueList: [
                { id: 184, valueName: '棉质', attrId: 76 },
                { id: 185, valueName: '真丝', attrId: 76 }
            ]
        }
    ],
    // 水果分类下的属性
    '511': [
        {
            id: 15,
            attrName: '规格',
            categoryId: 511,
            categoryLevel: 3,
            attrValueList: [
                { id: 41, valueName: '小果', attrId: 15 },
                { id: 42, valueName: '中果', attrId: 15 },
                { id: 43, valueName: '大果', attrId: 15 }
            ]
        },
        {
            id: 16,
            attrName: '产地',
            categoryId: 511,
            categoryLevel: 3,
            attrValueList: [
                { id: 44, valueName: '山东', attrId: 16 },
                { id: 45, valueName: '陕西', attrId: 16 },
                { id: 46, valueName: '新疆', attrId: 16 }
            ]
        }
    ],
    // 香蕉分类下的属性
    '512': [
        {
            id: 77,
            attrName: '规格',
            categoryId: 512,
            categoryLevel: 3,
            attrValueList: [
                { id: 186, valueName: '小把', attrId: 77 },
                { id: 187, valueName: '大把', attrId: 77 }
            ]
        },
        {
            id: 78,
            attrName: '产地',
            categoryId: 512,
            categoryLevel: 3,
            attrValueList: [
                { id: 188, valueName: '海南', attrId: 78 },
                { id: 189, valueName: '广西', attrId: 78 }
            ]
        }
    ],
    // 橙子分类下的属性
    '513': [
        {
            id: 79,
            attrName: '规格',
            categoryId: 513,
            categoryLevel: 3,
            attrValueList: [
                { id: 190, valueName: '小果', attrId: 79 },
                { id: 191, valueName: '中果', attrId: 79 },
                { id: 192, valueName: '大果', attrId: 79 }
            ]
        },
        {
            id: 80,
            attrName: '产地',
            categoryId: 513,
            categoryLevel: 3,
            attrValueList: [
                { id: 193, valueName: '江西', attrId: 80 },
                { id: 194, valueName: '湖南', attrId: 80 }
            ]
        }
    ],
    // 鱼类分类下的属性
    '521': [
        {
            id: 81,
            attrName: '规格',
            categoryId: 521,
            categoryLevel: 3,
            attrValueList: [
                { id: 195, valueName: '500g', attrId: 81 },
                { id: 196, valueName: '1000g', attrId: 81 }
            ]
        },
        {
            id: 82,
            attrName: '产地',
            categoryId: 521,
            categoryLevel: 3,
            attrValueList: [
                { id: 197, valueName: '舟山', attrId: 82 },
                { id: 198, valueName: '大连', attrId: 82 }
            ]
        }
    ],
    // 虾类分类下的属性
    '522': [
        {
            id: 83,
            attrName: '规格',
            categoryId: 522,
            categoryLevel: 3,
            attrValueList: [
                { id: 199, valueName: '500g', attrId: 83 },
                { id: 200, valueName: '1000g', attrId: 83 }
            ]
        },
        {
            id: 84,
            attrName: '产地',
            categoryId: 522,
            categoryLevel: 3,
            attrValueList: [
                { id: 201, valueName: '青岛', attrId: 84 },
                { id: 202, valueName: '湛江', attrId: 84 }
            ]
        }
    ],
    // 蟹类分类下的属性
    '523': [
        {
            id: 85,
            attrName: '规格',
            categoryId: 523,
            categoryLevel: 3,
            attrValueList: [
                { id: 203, valueName: '500g', attrId: 85 },
                { id: 204, valueName: '1000g', attrId: 85 }
            ]
        },
        {
            id: 86,
            attrName: '产地',
            categoryId: 523,
            categoryLevel: 3,
            attrValueList: [
                { id: 205, valueName: '阳澄湖', attrId: 86 },
                { id: 206, valueName: '太湖', attrId: 86 }
            ]
        }
    ],
    // 猪肉分类下的属性
    '531': [
        {
            id: 87,
            attrName: '部位',
            categoryId: 531,
            categoryLevel: 3,
            attrValueList: [
                { id: 207, valueName: '五花肉', attrId: 87 },
                { id: 208, valueName: '里脊肉', attrId: 87 },
                { id: 209, valueName: '排骨', attrId: 87 }
            ]
        },
        {
            id: 88,
            attrName: '规格',
            categoryId: 531,
            categoryLevel: 3,
            attrValueList: [
                { id: 210, valueName: '500g', attrId: 88 },
                { id: 211, valueName: '1000g', attrId: 88 }
            ]
        }
    ],
    // 牛肉分类下的属性
    '532': [
        {
            id: 89,
            attrName: '部位',
            categoryId: 532,
            categoryLevel: 3,
            attrValueList: [
                { id: 212, valueName: '牛腩', attrId: 89 },
                { id: 213, valueName: '牛里脊', attrId: 89 },
                { id: 214, valueName: '牛腱子', attrId: 89 }
            ]
        },
        {
            id: 90,
            attrName: '规格',
            categoryId: 532,
            categoryLevel: 3,
            attrValueList: [
                { id: 215, valueName: '500g', attrId: 90 },
                { id: 216, valueName: '1000g', attrId: 90 }
            ]
        }
    ],
    // 禽类分类下的属性
    '533': [
        {
            id: 91,
            attrName: '品种',
            categoryId: 533,
            categoryLevel: 3,
            attrValueList: [
                { id: 217, valueName: '三黄鸡', attrId: 91 },
                { id: 218, valueName: '乌鸡', attrId: 91 },
                { id: 219, valueName: '土鸡', attrId: 91 }
            ]
        },
        {
            id: 92,
            attrName: '规格',
            categoryId: 533,
            categoryLevel: 3,
            attrValueList: [
                { id: 220, valueName: '500g', attrId: 92 },
                { id: 221, valueName: '1000g', attrId: 92 }
            ]
        }
    ]
};

export default [
    // 获取一级分类
    {
        url: '/api/admin/product/getCategory1',
        method: 'get',
        response: () => {
            return {
                code: 200,
                data: category1List,
                message: '获取一级分类成功',
                ok: true
            }
        }
    },
    // 获取二级分类
    {
        url: '/api/admin/product/getCategory2/:category1Id',
        method: 'get',
        response: (config) => {
            const category1Id = config.query?.category1Id;
            // 检查category1Id是否存在
            if (!category1Id || !category2List[Number(category1Id)]) {
                return {
                    code: 201,
                    data: null,
                    message: '获取二级分类失败：无效的一级分类ID',
                    ok: false
                }
            }
            return {
                code: 200,
                data: category2List[Number(category1Id)],
                message: '获取二级分类成功',
                ok: true
            }
        }
    },
    // 获取三级分类
    {
        url: '/api/admin/product/getCategory3/:category2Id',
        method: 'get',
        response: (config) => {
            // 从URL中获取category2Id
            const category2Id = config.query?.category2Id;
            // 检查category2Id是否存在
            if (!category2Id || !category3List[Number(category2Id)]) {
                return {
                    code: 201,
                    data: null,
                    message: '获取三级分类失败:无效的二级分类ID',
                    ok: false
                }
            }
            return {
                code: 200,
                data: category3List[Number(category2Id)],
                message: '获取三级分类成功',
                ok: true
            }
        }
    },
    // 获取分类下已有的属性与属性值
    {
        url: '/api/admin/product/attrInfoList/:category1Id/:category2Id/:category3Id',
        method: 'get',
        response: (config) => {
            // 从URL中获取参数
            const urlParts = config.url?.split('/') || [];
            const category3Id = urlParts[urlParts.length - 1];
            const category2Id = urlParts[urlParts.length - 2];
            const category1Id = urlParts[urlParts.length - 3];


            if (!category1Id || !category2Id || !category3Id) {
                return {
                    code: 201,
                    data: null,
                    message: '获取属性失败：分类ID不完整',
                    ok: false
                }
            }

            const key = category3Id;
            const attrData = attrList[key] || [];
            return {
                code: 200,
                data: attrData,
                message: '获取属性成功',
                ok: true
            }
        }
    },
    // 添加或修改属性
    {
        url: '/api/admin/product/addOrUpdateAtrrInfo',
        method: 'post',
        response: (config) => {
            const data = config.body;

            // 验证必要字段
            if (!data.attrName || !data.categoryId || !data.categoryLevel) {
                return {
                    code: 201,
                    data: null,
                    message: '添加或修改属性失败：缺少必要字段',
                    ok: false
                }
            }

            // 如果是修改操作（有id）
            if (data.id) {
                const categoryId = data.categoryId.toString();
                const currentAttrList = attrList[categoryId] || [];
                const index = currentAttrList.findIndex(item => item.id === data.id);

                if (index !== -1) {
                    // 更新现有属性
                    currentAttrList[index] = {
                        ...currentAttrList[index],
                        ...data,
                        attrValueList: data.attrValueList.map((value: any) => ({
                            ...value,
                            attrId: data.id
                        }))
                    };
                    return {
                        code: 200,
                        data: null,
                        message: '修改属性成功',
                        ok: true
                    }
                }
            }

            // 如果是添加操作
            const categoryId = data.categoryId.toString();
            if (!attrList[categoryId]) {
                attrList[categoryId] = [];
            }

            // 生成新的id
            const newId = Math.max(0, ...attrList[categoryId].map(item => item.id)) + 1;

            // 添加新属性
            const newAttr = {
                ...data,
                id: newId,
                attrValueList: data.attrValueList.map((value: any) => ({
                    ...value,
                    id: Math.max(0, ...attrList[categoryId].flatMap(item => item.attrValueList.map(v => v.id))) + 1,
                    attrId: newId
                }))
            };

            attrList[categoryId].push(newAttr);

            return {
                code: 200,
                data: null,
                message: '添加属性成功',
                ok: true
            }
        }
    },
    // 删除属性
    {
        url: '/api/admin/product/deleteAttr/:attrId',
        method: 'delete',
        response: (config) => {
            // 从URL中获取属性ID
            const urlParts = config.url?.split('/') || [];
            const attrId = Number(urlParts[urlParts.length - 1]);

            if (!attrId) {
                return {
                    code: 201,
                    data: null,
                    message: '删除属性失败：无效的属性ID',
                    ok: false
                }
            }

            // 遍历所有分类查找并删除属性
            let deleted = false;
            for (const categoryId in attrList) {
                const index = attrList[categoryId].findIndex(item => item.id === attrId);
                if (index !== -1) {
                    attrList[categoryId].splice(index, 1);
                    deleted = true;
                    break;
                }
            }

            if (deleted) {
                return {
                    code: 200,
                    data: null,
                    message: '删除属性成功',
                    ok: true
                }
            } else {
                return {
                    code: 201,
                    data: null,
                    message: '删除属性失败：未找到指定属性',
                    ok: false
                }
            }
        }
    }
] as MockMethod[] 