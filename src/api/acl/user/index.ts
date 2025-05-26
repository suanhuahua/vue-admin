import request from "@/utils/request";
import type { AllRoleResponseData, SetRoleData, User, UserResponseData } from "./type";

enum API {
    // 获取全部已有的用户信息
    ALLUSER_URL = '/admin/acl/user/',
    // 增加一个新的用户账号
    ADDUSER_URL = '/admin/acl/user/save',
    // 更新已有的用户账号
    UPDATEUSER_URL = '/admin/acl/user/update',
    // 获取全部职位，当前账号拥有的职位的接口
    ALLROLEURL = '/admin/acl/user/toAssign/',
    // 给已有的用户分配角色接口
    SETROLE_URL = '/admin/acl/user/doAssignRole',
    // 删除用户接口
    REMOVEUSER_URL = '/admin/acl/user/removeUser/'
}
// 获取全部已有的用户信息
export const reqUserInfo = (page: number, limit: number, username?: string) => request.get<any, UserResponseData>(API.ALLUSER_URL, {
    params: {
        page,
        limit,
        username
    }
})
// 增加或者修改已有的用户接口
export const reqAddOrUpdateUser = (data: User) => {
    if (data.id) {
        return request.put<any, any>(API.UPDATEUSER_URL, data)
    } else {
        return request.post<any, any>(API.ADDUSER_URL, data)
    }
}
// 获取全部职位，当前账号拥有的职位的接口
export const reqAllRole = (userId: number) => request.get<any, AllRoleResponseData>(API.ALLROLEURL + userId)
// 给已有的用户分配角色接口
export const reqSetUserRole = (data: SetRoleData) => request.post(API.SETROLE_URL, data)
// 删除用户接口
export const reqRemoveUser = (userId: number) => request.delete(API.REMOVEUSER_URL + userId)