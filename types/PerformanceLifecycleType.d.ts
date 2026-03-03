/**
 * 性能测试生命周期钩子
 */
export interface PerformanceLifecycleType {
    /**
     * 在所有测试开始前执行
     */
    beforeAll?: () => void

    /**
     * 每个测试用例开始前
     * @param data 测试用例信息
     */
    beforeItem?: (data: {
        type: "benchmark"
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
        type: "benchmark"
        error: boolean
        it: {
            name: string
            index: number
        }
        result: {
            averageTime: number
        }
    }) => void
}