// 角色数据
export const roleList = [
  {
    id: 1,
    createTime: '2024-01-01 10:00:00',
    updateTime: '2024-01-01 10:00:00',
    roleName: '平台管理员'
  },
  {
    id: 2,
    createTime: '2024-01-01 10:00:00',
    updateTime: '2024-01-01 10:00:00',
    roleName: '系统管理员'
  },
  {
    id: 3,
    createTime: '2024-01-01 10:00:00',
    updateTime: '2024-01-01 10:00:00',
    roleName: '运营人员'
  },
  {
    id: 4,
    createTime: '2024-01-01 10:00:00',
    updateTime: '2024-01-01 10:00:00',
    roleName: '内容编辑'
  },
  {
    id: 5,
    createTime: '2024-01-01 10:00:00',
    updateTime: '2024-01-01 10:00:00',
    roleName: '市场专员'
  },
  {
    id: 6,
    createTime: '2024-01-01 10:00:00',
    updateTime: '2024-01-01 10:00:00',
    roleName: '开发人员'
  },
  {
    id: 7,
    createTime: '2024-01-01 10:00:00',
    updateTime: '2024-01-01 10:00:00',
    roleName: '测试人员'
  },
  {
    id: 8,
    createTime: '2024-01-01 10:00:00',
    updateTime: '2024-01-01 10:00:00',
    roleName: '设计师'
  },
  {
    id: 9,
    createTime: '2024-01-01 10:00:00',
    updateTime: '2024-01-01 10:00:00',
    roleName: '产品经理'
  },
  {
    id: 10,
    createTime: '2024-01-01 10:00:00',
    updateTime: '2024-01-01 10:00:00',
    roleName: '客服人员'
  },
  {
    id: 11,
    createTime: '2024-01-01 10:00:00',
    updateTime: '2024-01-01 10:00:00',
    roleName: '财务人员'
  },
  {
    id: 12,
    createTime: '2024-01-01 10:00:00',
    updateTime: '2024-01-01 10:00:00',
    roleName: '人力资源'
  },
  {
    id: 13,
    createTime: '2024-01-01 10:00:00',
    updateTime: '2024-01-01 10:00:00',
    roleName: '销售人员'
  }
]

// 路由组件与菜单的映射关系
export const routeMenuMap = {
  'home': {
    id: 1,
    createTime: '2024-01-01 10:00:00',
    updateTime: '2024-01-01 10:00:00',
    pid: 0,
    name: '首页',
    code: 'home',
    toCode: null,
    type: 1,
    status: null,
    level: 1,
    children: [],
    select: false
  },
  'acl': {
    id: 2,
    createTime: '2024-01-01 10:00:00',
    updateTime: '2024-01-01 10:00:00',
    pid: 0,
    name: '权限管理',
    code: 'acl',
    toCode: null,
    type: 1,
    status: null,
    level: 1,
    children: [
      {
        id: 3,
        createTime: '2024-01-01 10:00:00',
        updateTime: '2024-01-01 10:00:00',
        pid: 2,
        name: '用户管理',
        code: 'acl:user',
        toCode: 'user',
        type: 1,
        status: null,
        level: 2,
        children: [
          {
            id: 4,
            createTime: '2024-01-01 10:00:00',
            updateTime: '2024-01-01 10:00:00',
            pid: 3,
            name: '添加用户',
            code: 'acl:user:add',
            toCode: null,
            type: 2,
            status: null,
            level: 3,
            children: [],
            select: false
          },
          {
            id: 5,
            createTime: '2024-01-01 10:00:00',
            updateTime: '2024-01-01 10:00:00',
            pid: 3,
            name: '修改用户',
            code: 'acl:user:edit',
            toCode: null,
            type: 2,
            status: null,
            level: 3,
            children: [],
            select: false
          },
          {
            id: 6,
            createTime: '2024-01-01 10:00:00',
            updateTime: '2024-01-01 10:00:00',
            pid: 3,
            name: '删除用户',
            code: 'acl:user:remove',
            toCode: null,
            type: 2,
            status: null,
            level: 3,
            children: [],
            select: false
          },
          {
            id: 7,
            createTime: '2024-01-01 10:00:00',
            updateTime: '2024-01-01 10:00:00',
            pid: 3,
            name: '分配角色',
            code: 'acl:user:assign',
            toCode: null,
            type: 2,
            status: null,
            level: 3,
            children: [],
            select: false
          }
        ],
        select: false
      },
      {
        id: 8,
        createTime: '2024-01-01 10:00:00',
        updateTime: '2024-01-01 10:00:00',
        pid: 2,
        name: '角色管理',
        code: 'acl:role',
        toCode: 'role',
        type: 1,
        status: null,
        level: 2,
        children: [
          {
            id: 9,
            createTime: '2024-01-01 10:00:00',
            updateTime: '2024-01-01 10:00:00',
            pid: 8,
            name: '添加角色',
            code: 'acl:role:add',
            toCode: null,
            type: 2,
            status: null,
            level: 3,
            children: [],
            select: false
          },
          {
            id: 10,
            createTime: '2024-01-01 10:00:00',
            updateTime: '2024-01-01 10:00:00',
            pid: 8,
            name: '修改角色',
            code: 'acl:role:edit',
            toCode: null,
            type: 2,
            status: null,
            level: 3,
            children: [],
            select: false
          },
          {
            id: 11,
            createTime: '2024-01-01 10:00:00',
            updateTime: '2024-01-01 10:00:00',
            pid: 8,
            name: '删除角色',
            code: 'acl:role:remove',
            toCode: null,
            type: 2,
            status: null,
            level: 3,
            children: [],
            select: false
          },
          {
            id: 12,
            createTime: '2024-01-01 10:00:00',
            updateTime: '2024-01-01 10:00:00',
            pid: 8,
            name: '分配权限',
            code: 'acl:role:assign',
            toCode: null,
            type: 2,
            status: null,
            level: 3,
            children: [],
            select: false
          }
        ],
        select: false
      },
      {
        id: 13,
        createTime: '2024-01-01 10:00:00',
        updateTime: '2024-01-01 10:00:00',
        pid: 2,
        name: '菜单管理',
        code: 'acl:menu',
        toCode: 'menu',
        type: 1,
        status: null,
        level: 2,
        children: [
          {
            id: 14,
            createTime: '2024-01-01 10:00:00',
            updateTime: '2024-01-01 10:00:00',
            pid: 13,
            name: '添加菜单',
            code: 'acl:menu:add',
            toCode: null,
            type: 2,
            status: null,
            level: 3,
            children: [],
            select: false
          },
          {
            id: 15,
            createTime: '2024-01-01 10:00:00',
            updateTime: '2024-01-01 10:00:00',
            pid: 13,
            name: '修改菜单',
            code: 'acl:menu:edit',
            toCode: null,
            type: 2,
            status: null,
            level: 3,
            children: [],
            select: false
          },
          {
            id: 16,
            createTime: '2024-01-01 10:00:00',
            updateTime: '2024-01-01 10:00:00',
            pid: 13,
            name: '删除菜单',
            code: 'acl:menu:remove',
            toCode: null,
            type: 2,
            status: null,
            level: 3,
            children: [],
            select: false
          }
        ],
        select: false
      }
    ],
    select: false
  },
  'product': {
    id: 17,
    createTime: '2024-01-01 10:00:00',
    updateTime: '2024-01-01 10:00:00',
    pid: 0,
    name: '商品管理',
    code: 'product',
    toCode: null,
    type: 1,
    status: null,
    level: 1,
    children: [
      {
        id: 18,
        createTime: '2024-01-01 10:00:00',
        updateTime: '2024-01-01 10:00:00',
        pid: 17,
        name: '分类管理',
        code: 'product:category',
        toCode: 'category',
        type: 1,
        status: null,
        level: 2,
        children: [
          {
            id: 19,
            createTime: '2024-01-01 10:00:00',
            updateTime: '2024-01-01 10:00:00',
            pid: 18,
            name: '添加子分类',
            code: 'product:category:add',
            toCode: null,
            type: 2,
            status: null,
            level: 3,
            children: [],
            select: false
          },
          {
            id: 20,
            createTime: '2024-01-01 10:00:00',
            updateTime: '2024-01-01 10:00:00',
            pid: 18,
            name: '修改分类',
            code: 'product:category:edit',
            toCode: null,
            type: 2,
            status: null,
            level: 3,
            children: [],
            select: false
          },
          {
            id: 21,
            createTime: '2024-01-01 10:00:00',
            updateTime: '2024-01-01 10:00:00',
            pid: 18,
            name: '删除分类',
            code: 'product:category:remove',
            toCode: null,
            type: 2,
            status: null,
            level: 3,
            children: [],
            select: false
          }
        ],
        select: false
      },
      {
        id: 22,
        createTime: '2024-01-01 10:00:00',
        updateTime: '2024-01-01 10:00:00',
        pid: 17,
        name: '平台属性管理',
        code: 'product:attr',
        toCode: 'attr',
        type: 1,
        status: null,
        level: 2,
        children: [
          {
            id: 23,
            createTime: '2024-01-01 10:00:00',
            updateTime: '2024-01-01 10:00:00',
            pid: 22,
            name: '添加属性',
            code: 'product:attr:add',
            toCode: null,
            type: 2,
            status: null,
            level: 3,
            children: [],
            select: false
          },
          {
            id: 24,
            createTime: '2024-01-01 10:00:00',
            updateTime: '2024-01-01 10:00:00',
            pid: 22,
            name: '更新属性',
            code: 'product:attr:edit',
            toCode: null,
            type: 2,
            status: null,
            level: 3,
            children: [],
            select: false
          },
          {
            id: 25,
            createTime: '2024-01-01 10:00:00',
            updateTime: '2024-01-01 10:00:00',
            pid: 22,
            name: '删除属性',
            code: 'product:attr:remove',
            toCode: null,
            type: 2,
            status: null,
            level: 3,
            children: [],
            select: false
          }
        ],
        select: false
      },
      {
        id: 26,
        createTime: '2024-01-01 10:00:00',
        updateTime: '2024-01-01 10:00:00',
        pid: 17,
        name: '品牌管理',
        code: 'product:brand',
        toCode: 'trademark',
        type: 1,
        status: null,
        level: 2,
        children: [
          {
            id: 27,
            createTime: '2024-01-01 10:00:00',
            updateTime: '2024-01-01 10:00:00',
            pid: 26,
            name: '添加品牌',
            code: 'product:brand:add',
            toCode: null,
            type: 2,
            status: null,
            level: 3,
            children: [],
            select: false
          },
          {
            id: 28,
            createTime: '2024-01-01 10:00:00',
            updateTime: '2024-01-01 10:00:00',
            pid: 26,
            name: '修改品牌',
            code: 'product:brand:edit',
            toCode: null,
            type: 2,
            status: null,
            level: 3,
            children: [],
            select: false
          },
          {
            id: 29,
            createTime: '2024-01-01 10:00:00',
            updateTime: '2024-01-01 10:00:00',
            pid: 26,
            name: '删除品牌',
            code: 'product:brand:remove',
            toCode: null,
            type: 2,
            status: null,
            level: 3,
            children: [],
            select: false
          }
        ],
        select: false
      },
      {
        id: 30,
        createTime: '2024-01-01 10:00:00',
        updateTime: '2024-01-01 10:00:00',
        pid: 17,
        name: 'SPU管理',
        code: 'product:spu',
        toCode: 'spu',
        type: 1,
        status: null,
        level: 2,
        children: [
          {
            id: 31,
            createTime: '2024-01-01 10:00:00',
            updateTime: '2024-01-01 10:00:00',
            pid: 30,
            name: '编辑SPU',
            code: 'product:spu:edit',
            toCode: null,
            type: 2,
            status: null,
            level: 3,
            children: [],
            select: false
          },
          {
            id: 32,
            createTime: '2024-01-01 10:00:00',
            updateTime: '2024-01-01 10:00:00',
            pid: 30,
            name: '删除SPU',
            code: 'product:spu:remove',
            toCode: null,
            type: 2,
            status: null,
            level: 3,
            children: [],
            select: false
          }
        ],
        select: false
      },
      {
        id: 33,
        createTime: '2024-01-01 10:00:00',
        updateTime: '2024-01-01 10:00:00',
        pid: 17,
        name: 'SKU管理',
        code: 'product:sku',
        toCode: 'sku',
        type: 1,
        status: null,
        level: 2,
        children: [
          {
            id: 34,
            createTime: '2024-01-01 10:00:00',
            updateTime: '2024-01-01 10:00:00',
            pid: 33,
            name: 'SKU上下架',
            code: 'product:sku:status',
            toCode: null,
            type: 2,
            status: null,
            level: 3,
            children: [],
            select: false
          },
          {
            id: 35,
            createTime: '2024-01-01 10:00:00',
            updateTime: '2024-01-01 10:00:00',
            pid: 33,
            name: '更新SKU',
            code: 'product:sku:edit',
            toCode: null,
            type: 2,
            status: null,
            level: 3,
            children: [],
            select: false
          },
          {
            id: 36,
            createTime: '2024-01-01 10:00:00',
            updateTime: '2024-01-01 10:00:00',
            pid: 33,
            name: 'SKU详情',
            code: 'product:sku:detail',
            toCode: null,
            type: 2,
            status: null,
            level: 3,
            children: [],
            select: false
          },
          {
            id: 37,
            createTime: '2024-01-01 10:00:00',
            updateTime: '2024-01-01 10:00:00',
            pid: 33,
            name: '删除SKU',
            code: 'product:sku:remove',
            toCode: null,
            type: 2,
            status: null,
            level: 3,
            children: [],
            select: false
          }
        ],
        select: false
      }
    ],
    select: false
  }
}

// 角色-菜单关联数据
export const roleMenuMap = {
  1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37], // 平台管理员拥有所有权限
  2: [1, 2, 3, 4, 9],
  3: [1], // 运营人员只有首页权限
  4: [1], // 内容编辑只有首页权限
  5: [1], // 市场专员只有首页权限
  6: [1], // 开发人员只有首页权限
  7: [1], // 测试人员只有首页权限
  8: [1], // 设计师只有首页权限
  9: [1], // 产品经理只有首页权限
  10: [1], // 客服人员只有首页权限
  11: [1], // 财务人员只有首页权限
  12: [1], // 人力资源只有首页权限
  13: [1] // 销售人员只有首页权限
}

// 递归设置菜单选中状态
const setMenuSelect = (menus: any[], selectedIds: number[]) => {
  // 创建一个Map来存储所有菜单的父子关系
  const menuMap = new Map<number, any>()

  // 首先构建菜单映射关系
  const buildMenuMap = (menu: any) => {
    menuMap.set(menu.id, menu)
    if (menu.children && menu.children.length > 0) {
      menu.children.forEach(buildMenuMap)
    }
  }
  menus.forEach(buildMenuMap)

  // 获取菜单的所有父菜单ID
  const getParentIds = (menuId: number): number[] => {
    const menu = menuMap.get(menuId)
    if (!menu || !menu.pid) return []
    return [menu.pid, ...getParentIds(menu.pid)]
  }

  // 处理所有选中的菜单ID，包括它们的父菜单
  const allSelectedIds = new Set(selectedIds)
  selectedIds.forEach(id => {
    const parentIds = getParentIds(id)
    parentIds.forEach(pid => allSelectedIds.add(pid))
  })

  // 设置菜单选中状态
  const processMenu = (menu: any) => {
    // 先处理子菜单
    if (menu.children && menu.children.length > 0) {
      menu.children.forEach(processMenu)
    }
    // 设置当前菜单的选中状态
    menu.select = allSelectedIds.has(menu.id)
  }

  // 处理所有顶级菜单
  menus.forEach(processMenu)
  return menus
}

// 根据路由获取菜单数据
// const getMenuByRoute = (route: string) => {
//   // 将路由路径转换为菜单代码
//   const routeParts = route.split('/')
//   const mainRoute = routeParts[1] || 'home'

//   // 获取主菜单
//   const mainMenu = routeMenuMap[mainRoute as keyof typeof routeMenuMap]
//   if (!mainMenu) return null

//   // 如果有子路由，查找对应的子菜单
//   if (routeParts.length > 2) {
//     const subRoute = routeParts[2]
//     const subMenu = mainMenu.children?.find(menu => menu.toCode === subRoute)
//     if (subMenu) {
//       return {
//         ...mainMenu,
//         children: [subMenu]
//       }
//     }
//   }

//   return mainMenu
// }

//用户信息数据
function createUserList() {
  return [
    {
      id: 1,
      createTime: '2024-01-01 10:00:00',
      updateTime: '2024-01-01 10:00:00',
      username: 'admin',
      password: '111111',
      name: '管理员',
      phone: '13800138000',
      roleName: '平台管理员',
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      desc: '平台管理员',
      roles: ['平台管理员'],
      buttons: ['cuser.detail'],
      routes: ['Acl', 'User', 'Role', 'Permission', 'Product', 'Trademark', 'Attr', 'Spu', 'Sku'],
      token: 'Admin Token'
    },
    {
      id: 2,
      createTime: '2024-01-02 11:00:00',
      updateTime: '2024-01-02 11:00:00',
      username: 'system',
      password: '111111',
      name: '系统管理员',
      phone: '13800138001',
      roleName: '系统管理员',
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      desc: '系统管理员',
      roles: ['系统管理员'],
      buttons: ['cuser.detail', 'cuser.user'],
      routes: ['Acl', 'User', 'Role', 'Permission', 'Product', 'Trademark', 'Attr', 'Spu', 'Sku'],
      token: 'System Token'
    },
    {
      id: 3,
      createTime: '2024-01-03 12:00:00',
      updateTime: '2024-01-03 12:00:00',
      username: 'operator',
      password: '111111',
      name: '运营人员',
      phone: '13800138002',
      roleName: '运营人员',
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      desc: '运营人员',
      roles: ['运营人员'],
      buttons: ['cuser.detail'],
      routes: ['Acl', 'User', 'Role', 'Permission', 'Product', 'Trademark', 'Attr', 'Spu', 'Sku'],
      token: 'Operator Token'
    },
    {
      id: 4,
      createTime: '2024-01-04 13:00:00',
      updateTime: '2024-01-04 13:00:00',
      username: 'editor',
      password: '111111',
      name: '内容编辑',
      phone: '13800138003',
      roleName: '内容编辑',
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      desc: '内容编辑',
      roles: ['内容编辑'],
      buttons: ['cuser.detail'],
      routes: ['Acl', 'User', 'Role', 'Permission', 'Product', 'Trademark', 'Attr', 'Spu', 'Sku'],
      token: 'Editor Token'
    },
    {
      id: 5,
      createTime: '2024-01-05 14:00:00',
      updateTime: '2024-01-05 14:00:00',
      username: 'marketer',
      password: '111111',
      name: '市场专员',
      phone: '13800138004',
      roleName: '市场专员',
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      desc: '市场专员',
      roles: ['市场专员'],
      buttons: ['cuser.detail'],
      routes: ['Acl', 'User', 'Role', 'Permission', 'Product', 'Trademark', 'Attr', 'Spu', 'Sku'],
      token: 'Marketer Token'
    },
    {
      id: 6,
      createTime: '2024-01-06 15:00:00',
      updateTime: '2024-01-06 15:00:00',
      username: 'developer',
      password: '111111',
      name: '开发人员',
      phone: '13800138005',
      roleName: '开发人员',
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      desc: '开发人员',
      roles: ['开发人员'],
      buttons: ['cuser.detail'],
      routes: ['Acl', 'User', 'Role', 'Permission', 'Product', 'Trademark', 'Attr', 'Spu', 'Sku'],

      token: 'Developer Token'
    },
    {
      id: 7,
      createTime: '2024-01-07 16:00:00',
      updateTime: '2024-01-07 16:00:00',
      username: 'tester',
      password: '111111',
      name: '测试人员',
      phone: '13800138006',
      roleName: '测试人员',
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      desc: '测试人员',
      roles: ['测试人员'],
      buttons: ['cuser.detail'],
      routes: ['Acl', 'User', 'Role', 'Permission', 'Product', 'Trademark', 'Attr', 'Spu', 'Sku'],

      token: 'Tester Token'
    },
    {
      id: 8,
      createTime: '2024-01-08 17:00:00',
      updateTime: '2024-01-08 17:00:00',
      username: 'designer',
      password: '111111',
      name: '设计师',
      phone: '13800138007',
      roleName: '设计师',
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      desc: '设计师',
      roles: ['设计师'],
      buttons: ['cuser.detail'],
      routes: ['Acl', 'User', 'Role', 'Permission', 'Product', 'Trademark', 'Attr', 'Spu', 'Sku'],

      token: 'Designer Token'
    },
    {
      id: 9,
      createTime: '2024-01-09 18:00:00',
      updateTime: '2024-01-09 18:00:00',
      username: 'product',
      password: '111111',
      name: '产品经理',
      phone: '13800138008',
      roleName: '产品经理',
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      desc: '产品经理',
      roles: ['产品经理'],
      buttons: ['cuser.detail'],
      routes: ['Acl', 'User', 'Role', 'Permission', 'Product', 'Trademark', 'Attr', 'Spu', 'Sku'],

      token: 'Product Token'
    },
    {
      id: 10,
      createTime: '2024-01-10 19:00:00',
      updateTime: '2024-01-10 19:00:00',
      username: 'support',
      password: '111111',
      name: '客服人员',
      phone: '13800138009',
      roleName: '客服人员',
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      desc: '客服人员',
      roles: ['客服人员'],
      buttons: ['cuser.detail'],
      routes: ['Acl', 'User', 'Role', 'Permission', 'Product', 'Trademark', 'Attr', 'Spu', 'Sku'],

      token: 'Support Token'
    },
    {
      id: 11,
      createTime: '2024-01-11 20:00:00',
      updateTime: '2024-01-11 20:00:00',
      username: 'finance',
      password: '111111',
      name: '财务人员',
      phone: '13800138010',
      roleName: '财务人员',
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      desc: '财务人员',
      roles: ['财务人员'],
      buttons: ['cuser.detail'],
      routes: ['Acl', 'User', 'Role', 'Permission', 'Product', 'Trademark', 'Attr', 'Spu', 'Sku'],

      token: 'Finance Token'
    },
    {
      id: 12,
      createTime: '2024-01-12 21:00:00',
      updateTime: '2024-01-12 21:00:00',
      username: 'hr',
      password: '111111',
      name: '人力资源',
      phone: '13800138011',
      roleName: '人力资源',
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      desc: '人力资源',
      roles: ['人力资源'],
      buttons: ['cuser.detail'],
      routes: ['Acl', 'User', 'Role', 'Permission', 'Product', 'Trademark', 'Attr', 'Spu', 'Sku'],
      token: 'HR Token'
    },
    {
      id: 13,
      createTime: '2024-01-13 22:00:00',
      updateTime: '2024-01-13 22:00:00',
      username: 'sales',
      password: '111111',
      name: '销售人员',
      phone: '13800138012',
      roleName: '销售人员',
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      desc: '销售人员',
      roles: ['销售人员'],
      buttons: ['cuser.detail'],
      routes: ['Acl', 'User', 'Role', 'Permission', 'Product', 'Trademark', 'Attr', 'Spu', 'Sku'],
      token: 'Sales Token'
    }
  ]
}

// 模拟数据存储
export let userList = createUserList()

export default [
  // 用户登录接口
  {
    url: '/api/user/login', //请求地址
    method: 'post', //请求方式
    response: ({ body }) => {
      //获取请求体携带过来的用户名与密码
      const { username, password } = body
      //调用获取用户信息函数,用于判断是否有此用户
      const checkUser = userList.find(item => item.username === username && item.password === password)
      //没有用户返回失败信息
      if (!checkUser) {
        return { code: 201, data: { message: '账号或者密码不正确' } }
      }
      //如果有返回成功信息
      const { token } = checkUser
      return { code: 200, data: { token } }
    }
  },
  // 获取用户信息
  {
    url: '/api/user/info',
    method: 'get',
    response: request => {
      //获取请求头携带token
      const token = request.headers.token
      //查看用户信息是否包含有次token用户
      const checkUser = userList.find(item => item.token === token)
      //没有返回失败的信息
      if (!checkUser) {
        return { code: 201, data: { message: '获取用户信息失败' } }
      }
      //如果有返回成功信息
      return { code: 200, data: { checkUser } }
    }
  },
  // 获取用户列表
  {
    url: '/api/admin/acl/user',
    method: 'get',
    response: (config) => {
      try {
        // 从查询参数中获取页码、每页数量和用户名
        const page = parseInt(config.query.page) || 1
        const limit = parseInt(config.query.limit) || 5
        const username = config.query.username || ''

        if (page < 1 || limit < 1) {
          return {
            code: 201,
            message: '参数错误',
            data: {
              records: [],
              total: 0,
              size: limit,
              current: page,
              pages: 0
            }
          }
        }

        // 根据用户名筛选数据
        let filteredList = userList
        if (username) {
          filteredList = userList.filter(user =>
            user.username.toLowerCase().includes(username.toLowerCase())
          )
        }

        // 计算分页
        const start = (page - 1) * limit
        const end = start + limit
        const records = filteredList.slice(start, end)

        return {
          code: 200,
          message: '获取用户列表成功',
          data: {
            records,
            total: filteredList.length,
            size: limit,
            current: page,
            pages: Math.ceil(filteredList.length / limit)
          }
        }
      } catch (error) {
        console.error('Mock server error:', error)
        return {
          code: 201,
          message: '获取用户列表失败',
          data: {
            records: [],
            total: 0,
            size: 5,
            current: 1,
            pages: 0
          }
        }
      }
    }
  },
  // 添加用户
  {
    url: '/api/admin/acl/user/save',
    method: 'post',
    response: ({ body }) => {
      try {
        // 检查用户名是否已存在
        const existingUser = userList.find(item => item.username === body.username)
        if (existingUser) {
          return {
            code: 201,
            message: '用户名已存在',
            data: null
          }
        }

        // 创建新用户
        const newUser = {
          id: userList.length + 1,
          createTime: new Date().toLocaleString(),
          updateTime: new Date().toLocaleString(),
          ...body,
          avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
          roles: [body.roleName],
          buttons: ['cuser.detail'],
          routes: ['home'],
          token: `${body.username} Token`
        }

        // 添加到用户列表
        userList.push(newUser)
        console.log(userList)
        return {
          code: 200,
          message: '添加用户成功',
          data: null
        }
      } catch (error) {
        console.error('Mock server error:', error)
        return {
          code: 201,
          message: '添加用户失败',
          data: null
        }
      }
    }
  },
  // 更新用户
  {
    url: '/api/admin/acl/user/update',
    method: 'put',
    response: ({ body }) => {
      try {
        // 查找要更新的用户
        const userIndex = userList.findIndex(item => item.id === body.id)
        if (userIndex === -1) {
          return {
            code: 201,
            message: '用户不存在',
            data: null
          }
        }

        // 检查用户名是否与其他用户重复
        const duplicateUser = userList.find(item =>
          item.username === body.username && item.id !== body.id
        )
        if (duplicateUser) {
          return {
            code: 201,
            message: '用户名已存在',
            data: null
          }
        }

        // 更新用户信息
        const updatedUser = {
          ...userList[userIndex],
          ...body,
          updateTime: new Date().toLocaleString(),
          roles: [body.roleName]
        }

        // 更新用户列表
        userList[userIndex] = updatedUser

        return {
          code: 200,
          message: '更新用户成功',
          data: null
        }
      } catch (error) {
        console.error('Mock server error:', error)
        return {
          code: 201,
          message: '更新用户失败',
          data: null
        }
      }
    }
  },
  // 获取用户角色
  {
    url: '/api/admin/acl/user/toAssign/:userId',
    method: 'get',
    response: (config) => {
      try {
        // 从URL中获取userId
        const userId = parseInt(config.url.split('/').pop() || '0')

        if (!userId) {
          return {
            code: 201,
            message: '参数错误',
            data: {
              assignRoles: [],
              allRolesList: []
            }
          }
        }

        // 查找用户
        const user = userList.find(item => item.id === userId)
        if (!user) {
          return {
            code: 201,
            message: '用户不存在',
            data: {
              assignRoles: [],
              allRolesList: []
            }
          }
        }

        // 获取用户已分配的角色
        const assignRoles = roleList.filter(role =>
          user.roles.includes(role.roleName)
        )

        return {
          code: 200,
          message: '获取用户角色成功',
          data: {
            assignRoles, // 已分配的角色
            allRolesList: roleList // 所有角色
          }
        }
      } catch (error) {
        console.error('Mock server error:', error)
        return {
          code: 201,
          message: '获取用户角色失败',
          data: {
            assignRoles: [],
            allRolesList: []
          }
        }
      }
    }
  },
  // 分配用户角色
  {
    url: '/api/admin/acl/user/doAssignRole',
    method: 'post',
    response: ({ body }) => {
      try {
        const { userId, roleIdList } = body

        // 验证参数
        if (!userId || !roleIdList || !Array.isArray(roleIdList)) {
          return {
            code: 201,
            message: '参数错误',
            data: null
          }
        }

        // 查找用户
        const userIndex = userList.findIndex(item => item.id === userId)
        if (userIndex === -1) {
          return {
            code: 201,
            message: '用户不存在',
            data: null
          }
        }

        // 获取选中的角色名称
        const selectedRoles = roleList
          .filter(role => roleIdList.includes(role.id))
          .map(role => role.roleName)

        // 更新用户角色
        userList[userIndex] = {
          ...userList[userIndex],
          roles: selectedRoles,
          roleName: selectedRoles[0] || '', // 设置主要角色
          updateTime: new Date().toLocaleString()
        }

        return {
          code: 200,
          message: '分配角色成功',
          data: null
        }
      } catch (error) {
        console.error('Mock server error:', error)
        return {
          code: 201,
          message: '分配角色失败',
          data: null
        }
      }
    }
  },
  // 删除用户
  {
    url: '/api/admin/acl/user/removeUser/:userId',
    method: 'delete',
    response: (config) => {
      try {
        // 从URL中获取userId
        const userId = parseInt(config.url.split('/').pop() || '0')

        if (!userId) {
          return {
            code: 201,
            message: '参数错误',
            data: null
          }
        }

        // 查找用户索引
        const userIndex = userList.findIndex(item => item.id === userId)
        if (userIndex === -1) {
          return {
            code: 201,
            message: '用户不存在',
            data: null
          }
        }

        // 从用户列表中删除用户
        userList.splice(userIndex, 1)

        return {
          code: 200,
          message: '删除用户成功',
          data: null
        }
      } catch (error) {
        console.error('Mock server error:', error)
        return {
          code: 201,
          message: '删除用户失败',
          data: null
        }
      }
    }
  },
  // 获取菜单数据
  {
    url: '/api/admin/acl/permission/toAssign/:roleId',
    method: 'get',
    response: (config) => {
      try {
        // 从URL中获取roleId
        const roleId = parseInt(config.url.split('/').pop() || '0')

        if (!roleId) {
          return {
            code: 201,
            message: '参数错误',
            data: []
          }
        }

        // 获取角色对应的菜单ID列表
        const selectedMenuIds = roleMenuMap[roleId as keyof typeof roleMenuMap] || []

        // 返回所有菜单数据
        const allMenus = Object.values(routeMenuMap)
        const menusWithSelect = setMenuSelect(allMenus, selectedMenuIds)

        return {
          code: 200,
          message: '获取菜单数据成功',
          data: menusWithSelect
        }
      } catch (error) {
        console.error('Mock server error:', error)
        return {
          code: 201,
          message: '获取菜单数据失败',
          data: []
        }
      }
    }
  },
  // 给相应的职位分配权限
  {
    url: '/api/admin/acl/permission/doAssign/',
    method: 'post',
    response: (config) => {
      try {
        // 从URL中获取roleId
        const roleId = parseInt(config.url.split('roleId=')[1] || '0')
        // 从请求体中获取permissionId
        const permissionId = config.body

        // 验证参数
        if (!roleId || !permissionId || !Array.isArray(permissionId)) {
          return {
            code: 201,
            message: '参数错误',
            ok: false
          }
        }

        // 验证角色是否存在
        const roleExists = roleList.some(role => role.id === roleId)
        if (!roleExists) {
          return {
            code: 201,
            message: '角色不存在',
            ok: false
          }
        }

        // 验证权限ID是否有效
        const allMenuIds = new Set<number>()
        const collectMenuIds = (menus: any[]) => {
          menus.forEach(menu => {
            allMenuIds.add(menu.id)
            if (menu.children && menu.children.length > 0) {
              collectMenuIds(menu.children)
            }
          })
        }
        collectMenuIds(Object.values(routeMenuMap))

        const invalidIds = permissionId.filter(id => !allMenuIds.has(id))
        if (invalidIds.length > 0) {
          return {
            code: 201,
            message: `存在无效的权限ID: ${invalidIds.join(', ')}`,
            ok: false
          }
        }

        // 更新角色的权限
        roleMenuMap[roleId as keyof typeof roleMenuMap] = permissionId

        return {
          code: 200,
          message: '分配权限成功',
          ok: true
        }
      } catch (error) {
        console.error('Mock server error:', error)
        return {
          code: 201,
          message: '分配权限失败',
          ok: false
        }
      }
    }
  }
]
