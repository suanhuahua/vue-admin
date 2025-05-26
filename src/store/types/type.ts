import type { RoleData } from '@/api/acl/role/type'

export interface UserState {
    token: string
    avatar: string
    name: string
    userList: any[]
    total: number
    roleStore: any
    buttons: string[]
}

export interface UserData {
    id?: number
    username: string
    password?: string
    name: string
    phone?: string
    roleId: number
    roleName?: string
} 