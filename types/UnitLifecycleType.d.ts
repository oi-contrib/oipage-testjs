/**
 * 单元测试生命周期钩子
 */
export interface UnitLifecycleType {
    /**
     * 在所有测试开始前执行
     */
    beforeAll?: () => void

    /**
     * 每个测试套件开始前
     * @param data 测试套件信息
     */
    beforeEach?: (data: {
        describe: {
            name: string
            index: number
        }
    }) => void

    /**
     * 每个测试用例开始前
     * @param data 测试用例信息
     */
    beforeItem?: (data: {
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
        it: {
            name: string
            index: number
        }
        result: {
            status: 'passed' | 'failed'
            error: Error | null
        }
    }) => void

    /**
     * 每个测试套件结束后
     * @param data 测试结果信息
     */
    afterEach?: (data: {
        describe: {
            name: string
            index: number
        }
        result: {
            total: number
            failed: number
        }
    }) => void
}