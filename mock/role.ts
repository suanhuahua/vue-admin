// 从user.ts中导入角色数据
import { roleList, roleMenuMap, userList } from './user'

// 生成唯一ID
const generateId = () => {
    return Math.max(0, ...roleList.map(role => role.id || 0)) + 1
}

// 获取当前时间
const getCurrentTime = () => {
    return new Date().toISOString()
}

export default [
    // 获取全部职位列表
    {
        url: '/api/admin/acl/role/',
        method: 'get',
        response: (config) => {
            try {
                // 从查询参数中获取页码、每页数量和角色名称
                const page = parseInt(config.query.page) || 1
                const limit = parseInt(config.query.limit) || 5
                const roleName = config.query.roleName || ''

                if (page < 1 || limit < 1) {
                    return {
                        code: 201,
                        message: '参数错误',
                        data: {
                            records: [],
                            total: 0,
                            size: limit,
                            current: page,
                            orders: [],
                            optimizeCountSql: true,
                            hitCount: false,
                            countId: null,
                            maxLimit: null,
                            searchCount: true,
                            pages: 0
                        }
                    }
                }

                // 根据角色名称筛选数据
                let filteredList = roleList
                if (roleName) {
                    filteredList = roleList.filter(role =>
                        role.roleName.toLowerCase().includes(roleName.toLowerCase())
                    )
                }

                // 计算分页
                const start = (page - 1) * limit
                const end = start + limit
                const records = filteredList.slice(start, end)

                return {
                    code: 200,
                    message: '获取角色列表成功',
                    data: {
                        records,
                        total: filteredList.length,
                        size: limit,
                        current: page,
                        orders: [],
                        optimizeCountSql: true,
                        hitCount: false,
                        countId: null,
                        maxLimit: null,
                        searchCount: true,
                        pages: Math.ceil(filteredList.length / limit)
                    }
                }
            } catch (error) {
                console.error('Mock server error:', error)
                return {
                    code: 201,
                    message: '获取角色列表失败',
                    data: {
                        records: [],
                        total: 0,
                        size: 5,
                        current: 1,
                        orders: [],
                        optimizeCountSql: true,
                        hitCount: false,
                        countId: null,
                        maxLimit: null,
                        searchCount: true,
                        pages: 0
                    }
                }
            }
        }
    },
    // 添加新职位
    {
        url: '/api/admin/acl/role/save',
        method: 'post',
        response: (config) => {
            try {
                const { roleName } = config.body

                // 验证角色名称
                if (!roleName || typeof roleName !== 'string' || roleName.length < 2 || roleName.length > 10) {
                    return {
                        code: 201,
                        message: '角色名称长度必须在2-10个字符之间',
                        ok: false
                    }
                }

                // 检查角色名称是否已存在
                if (roleList.some(role => role.roleName === roleName)) {
                    return {
                        code: 201,
                        message: '角色名称已存在',
                        ok: false
                    }
                }

                // 创建新角色
                const newRole = {
                    id: generateId(),
                    roleName,
                    createTime: getCurrentTime(),
                    updateTime: getCurrentTime(),
                    remark: null
                }

                // 添加到角色列表
                roleList.push(newRole)

                return {
                    code: 200,
                    message: '添加角色成功',
                    ok: true
                }
            } catch (error) {
                console.error('Mock server error:', error)
                return {
                    code: 201,
                    message: '添加角色失败',
                    ok: false
                }
            }
        }
    },
    // 更新已有职位
    {
        url: '/api/admin/acl/role/update',
        method: 'put',
        response: (config) => {
            try {
                const { id, roleName } = config.body

                // 验证参数
                if (!id || !roleName || typeof roleName !== 'string' || roleName.length < 2 || roleName.length > 10) {
                    return {
                        code: 201,
                        message: '参数错误',
                        ok: false
                    }
                }

                // 查找要更新的角色
                const roleIndex = roleList.findIndex(role => role.id === id)
                if (roleIndex === -1) {
                    return {
                        code: 201,
                        message: '角色不存在',
                        ok: false
                    }
                }

                // 检查新角色名称是否与其他角色重复
                if (roleList.some(role => role.id !== id && role.roleName === roleName)) {
                    return {
                        code: 201,
                        message: '角色名称已存在',
                        ok: false
                    }
                }

                // 更新角色信息
                roleList[roleIndex] = {
                    ...roleList[roleIndex],
                    roleName,
                    updateTime: getCurrentTime()
                }

                return {
                    code: 200,
                    message: '更新角色成功',
                    ok: true
                }
            } catch (error) {
                console.error('Mock server error:', error)
                return {
                    code: 201,
                    message: '更新角色失败',
                    ok: false
                }
            }
        }
    },
    // 删除角色
    {
        url: '/api/admin/acl/role/remove/:roleId',
        method: 'delete',
        response: (config) => {
            try {
                // 从URL中获取roleId
                const roleId = parseInt(config.url.split('/').pop() || '0')

                if (!roleId) {
                    return {
                        code: 201,
                        message: '参数错误',
                        ok: false
                    }
                }

                // 查找角色索引
                const roleIndex = roleList.findIndex(role => role.id === roleId)
                if (roleIndex === -1) {
                    return {
                        code: 201,
                        message: '角色不存在',
                        ok: false
                    }
                }

                // 检查是否有用户正在使用该角色
                const roleToDelete = roleList[roleIndex]
                const usersWithRole = userList.filter(user => user.roles.includes(roleToDelete.roleName))
                if (usersWithRole.length > 0) {
                    return {
                        code: 201,
                        message: '该角色正在被用户使用，无法删除',
                        ok: false
                    }
                }

                // 从角色列表中删除角色
                roleList.splice(roleIndex, 1)
                // 同时删除该角色的权限映射
                delete roleMenuMap[roleId as keyof typeof roleMenuMap]

                return {
                    code: 200,
                    message: '删除角色成功',
                    ok: true
                }
            } catch (error) {
                console.error('Mock server error:', error)
                return {
                    code: 201,
                    message: '删除角色失败',
                    ok: false
                }
            }
        }
    }
]
