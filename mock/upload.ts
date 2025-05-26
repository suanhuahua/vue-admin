import { MockMethod } from 'vite-plugin-mock'

// 模拟图片存储
const imageMap = new Map<string, string>()

export default [
    {
        url: '/api/admin/product/fileUpload',
        method: 'post',
        response: ({ body }) => {
            try {
                // 从请求体中获取base64数据
                const file = body.file
                if (!file) {
                    console.error('未接收到文件:', body)
                    return {
                        code: 201,
                        message: '未接收到文件',
                        data: null
                    }
                }

                // 生成唯一的文件名
                const fileName = `trademark_${Date.now()}.jpg`

                // 存储图片数据
                imageMap.set(fileName, file)

                // 直接返回base64数据
                return {
                    code: 200,
                    message: '上传成功',
                    data: file
                }
            } catch (error) {
                console.error('文件上传失败:', error)
                return {
                    code: 201,
                    message: '文件上传失败',
                    data: null
                }
            }
        }
    }
] as MockMethod[] 