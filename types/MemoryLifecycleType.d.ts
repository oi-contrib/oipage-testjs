/**
 * 内存测试生命周期钩子
 */
export interface MemoryLifecycleType {
    /**
     * 在所有测试开始前执行
     */
    beforeAll?: () => void

    /**
     * 每个测试用例开始前
     * @param data 测试用例信息
     */
    beforeItem?: (data: {
        type: "monitor"
        it: {
            name: string
            index: number
        }
    }) => void

    /**
     * 每个测试用例结束后
     * @param data 测试结果信息
     */
    afterItem?: (data: {
        type: "monitor"
        error: boolean
        it: {
            name: string
            index: number
        }
        result: {
            beforeSnapshot: {
                used: number
                total: number
                limit: number
                timestamp: number
            }
            afterSnapshot: {
                used: number
                total: number
                limit: number
                timestamp: number
            }
        }
    }) => void
}