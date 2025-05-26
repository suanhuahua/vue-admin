/// <reference types="vite/client" />
import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

// 声明 import.meta.glob 的类型
interface ImportMeta {
    glob: (pattern: string, options?: { import?: string; eager?: boolean }) => Record<string, any>
}

const modules = import.meta.glob('./*.ts', {
    import: 'default',
    eager: true,
})

const mockModules: any[] = []
Object.keys(modules).forEach((key) => {
    if (key.includes('_')) {
        return
    }
    mockModules.push(...(modules[key] as any))
})

export function setupProdMockServer() {
    createProdMockServer(mockModules)
}