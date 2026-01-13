import { ExpectType } from "./ExpectType"

export declare interface UnitTestInstance {
    /**
        * 定义测试套件
        * @param name 
        * @param fn 
        */
    describe(name: string, fn: Function): void;

    /**
     * 定义测试用例
     * @param name 
     * @param fn 
     */
    it(name: string, fn: Function): void;

    /**
     * 断言值是否符合预期
     * @param value 
     */
    expect(value: any): ExpectType;
}

interface NewUnitTestType {
    new(lifecycle: {

        /**
         * 在所有测试开始前执行
         */
        beforeAll?: () => void

        /**
         * 每个测试套件开始前
         * @param data 
         * @returns 
         */
        beforeEach?: (data: {
            describe: {
                name: string
                index: number
            }
        }) => void

        /**
         * 每个测试用例开始前
         * @param data 
         * @returns 
         */
        beforeItem?: (data: {
            it: {
                name: string
                index: number
            }
        }) => void

        /**
         * 每个测试用例结束后
         * @param data 
         * @returns 
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
         * @param data 
         * @returns 
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
    }): UnitTestInstance

}

export let UnitTest: NewUnitTestType