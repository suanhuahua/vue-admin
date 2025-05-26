import request from "@/utils/request";
import type { MenuResponseData, RoleData, RoleResponseData } from "./type";

enum API {
    // 获取全部的职位接口
    ALLROLE_URL = '/admin/acl/role/',
    // 添加新的职位接口
    ADDROLE_URL = '/admin/acl/role/save',
    // 更新已有的职位
    UPDATEROLE_URL = '/admin/acl/role/update',
    // 获取全部的菜单与按钮的数据
    ALLPERMISSION = '/admin/acl/permission/toAssign/',
    // 给相应的职位分配权限
    SETPERMISSION_URL = '/admin/acl/permission/doAssign/?',
    //删除已有的职位
    REMOVEROLE_URL = '/admin/acl/role/remove/'
}

// 获取全部的职位接口
export const reqAllRoleList = (page: number, limit: number, roleName?: string) => request.get<any, RoleResponseData>(API.ALLROLE_URL, {
    params: {
        page,
        limit,
        roleName
    }
})

// 添加职位与更新已有职位的接口
export const reqAddOrUpdateRole = (data: RoleData) => {
    if (data.id) {
        return request.put<any, { code: number; message: string; ok: boolean }>(API.UPDATEROLE_URL, data)
    } else {
        return request.post<any, { code: number; message: string; ok: boolean }>(API.ADDROLE_URL, data)
    }
}

// 获取全部的菜单与当前用户ID的菜单的数据
export const reqAllMenuList = (roleId: number, route?: string) => request.get<any, MenuResponseData>(API.ALLPERMISSION + roleId, {
    params: {
        route
    }
})
// 给相应的职位分配权限
export const reqSetPermission = (roleId: number, permissionId: number[]) =>
    request.post<any, { code: number; message: string; ok: boolean }>(
        `${API.SETPERMISSION_URL}roleId=${roleId}`,
        permissionId
    )
//删除已有的职位
export const reqRemoveRole = (roleId: number) => request.delete<any, { code: number; message: string; ok: boolean }>(API.REMOVEROLE_URL + roleId)