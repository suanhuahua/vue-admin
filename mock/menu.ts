import { routeMenuMap } from './user'

// 定义菜单类型
interface MenuItem {
    id: number
    createTime: string
    updateTime: string
    pid: number
    name: string
    code: string
    toCode: string | null
    type: number
    status: null
    level: number
    children: MenuItem[]
    select: boolean
}

// 定义routeMenuMap的类型
type RouteMenuMap = {
    [key: string]: MenuItem
}

// 递归查找菜单
const findMenuById = (menus: MenuItem[], id: number): MenuItem | null => {
    for (const menu of menus) {
        if (menu.id === id) {
            return menu
        }
        if (menu.children && menu.children.length > 0) {
            const found = findMenuById(menu.children, id)
            if (found) {
                return found
            }
        }
    }
    return null
}

// 递归获取所有菜单的最大id
const getMaxMenuId = (menus: MenuItem[]): number => {
    let maxId = 0
    for (const menu of menus) {
        if (menu.id > maxId) maxId = menu.id
        if (menu.children && menu.children.length > 0) {
            const childMax = getMaxMenuId(menu.children)
            if (childMax > maxId) maxId = childMax
        }
    }
    return maxId
}

// 递归删除菜单
const removeMenuById = (menus: MenuItem[], id: number): boolean => {
    for (let i = 0; i < menus.length; i++) {
        if (menus[i].id === id) {
            menus.splice(i, 1)
            return true
        }
        if (menus[i].children && menus[i].children.length > 0) {
            const removed = removeMenuById(menus[i].children, id)
            if (removed) return true
        }
    }
    return false
}

export default [
    {
        url: '/api/admin/acl/permission',
        method: 'get',
        response: () => {
            // 获取所有一级菜单
            const allMenus = Object.values(routeMenuMap as RouteMenuMap)
            return {
                code: 200,
                message: '获取全部菜单成功',
                ok: true,
                data: allMenus
            }
        }
    },
    // 添加与更新菜单
    {
        url: '/api/admin/acl/permission/save',
        method: 'put',
        response: ({ body }: { body: Partial<MenuItem> }) => {
            try {
                // 修复：递归获取所有菜单的最大id
                const allMenus = Object.values(routeMenuMap as RouteMenuMap)
                const newId = getMaxMenuId(allMenus) + 1

                // 创建新菜单对象
                const newMenu: MenuItem = {
                    id: newId,
                    createTime: new Date().toISOString(),
                    updateTime: new Date().toISOString(),
                    pid: body.pid || 0,
                    name: body.name || '',
                    code: body.code || '',
                    toCode: body.toCode || null,
                    type: body.type || 1,
                    status: null,
                    level: body.level || 1,
                    children: [],
                    select: false
                }

                // 如果是子菜单，递归查找父菜单并添加到其children中
                if (body.pid && body.pid !== 0) {
                    const parentMenu = findMenuById(allMenus, body.pid)
                    if (parentMenu) {
                        // 设置新菜单的level为父菜单level + 1
                        newMenu.level = parentMenu.level + 1
                        // 设置新菜单的pid为父菜单的id
                        newMenu.pid = parentMenu.id
                        parentMenu.children.push(newMenu)
                    } else {
                        return {
                            code: 201,
                            message: '父菜单不存在',
                            ok: false
                        }
                    }
                } else {
                    // 如果是顶级菜单，添加到routeMenuMap中
                    const menuKey = body.code || `menu_${newId}`
                        ; (routeMenuMap as RouteMenuMap)[menuKey] = newMenu
                }

                return {
                    code: 200,
                    message: '添加菜单成功',
                    ok: true
                }
            } catch (error) {
                console.error('Mock server error:', error)
                return {
                    code: 201,
                    message: '添加菜单失败',
                    ok: false
                }
            }
        }
    },
    // 更新菜单
    {
        url: '/api/admin/acl/permission/update',
        method: 'put',
        response: ({ body }: { body: Partial<MenuItem> }) => {
            try {
                // 递归查找要更新的菜单
                if (!body.id) {
                    return {
                        code: 201,
                        message: '菜单ID不能为空',
                        ok: false
                    }
                }
                const allMenus = Object.values(routeMenuMap as RouteMenuMap)
                const menuToUpdate = findMenuById(allMenus, body.id)
                if (!menuToUpdate) {
                    return {
                        code: 201,
                        message: '菜单不存在',
                        ok: false
                    }
                }

                // 更新菜单属性
                Object.assign(menuToUpdate, {
                    ...body,
                    updateTime: new Date().toISOString()
                })

                return {
                    code: 200,
                    message: '更新菜单成功',
                    ok: true
                }
            } catch (error) {
                console.error('Mock server error:', error)
                return {
                    code: 201,
                    message: '更新菜单失败',
                    ok: false
                }
            }
        }
    },
    // 删除菜单
    {
        url: /\/api\/admin\/acl\/permission\/remove\/(\d+)/,
        method: 'delete',
        response: (config: any) => {
            try {
                const id = parseInt(config.url.match(/remove\/(\d+)/)[1])
                // 先判断是否为一级菜单
                for (const key in routeMenuMap) {
                    if (routeMenuMap[key].id === id) {
                        delete routeMenuMap[key]
                        return { code: 200, message: '删除菜单成功', ok: true }
                    }
                }
                // 否则递归删除
                const allMenus = Object.values(routeMenuMap as RouteMenuMap)
                const removed = removeMenuById(allMenus, id)
                if (removed) {
                    return {
                        code: 200,
                        message: '删除菜单成功',
                        ok: true
                    }
                } else {
                    return {
                        code: 201,
                        message: '菜单不存在',
                        ok: false
                    }
                }
            } catch (error) {
                return {
                    code: 201,
                    message: '删除菜单失败',
                    ok: false
                }
            }
        }
    }
]
