import mergeOption from "vislite/lib/mergeOption/index.es.js"
import Expect from "./expect.js"

// 单元测试核心模块
export default class Unit {

    describe_index = 0 // 当前测试套件索引
    describe_total = 0 // 当前测试套件的测试用例总数
    describe_failed = 0 // 当前测试套件的失败用例数
    it_index = 0 // 当前测试用例索引

    // 生命周期钩子
    lifecycle = {
        beforeAll: () => { }, // 所有测试开始前
        beforeEach: (data) => { }, // 每个测试套件开始前
        beforeItem: (data) => { }, // 每个测试用例开始前
        afterItem: (data) => { }, // 每个测试用例结束后
        afterEach: (data) => { }, // 每个测试套件结束后
    }

    constructor(options = {}) {
        mergeOption(this.lifecycle, options.lifecycle)

        this.lifecycle.beforeAll()
    }

    // 定义测试套件
    describe(name, fn) {
        this.lifecycle.beforeEach({
            describe: {
                name,
                index: this.describe_index
            }
        })
        this.describe_total = 0
        this.describe_failed = 0
        this.it_index = 0
        fn()
        this.lifecycle.afterEach({
            describe: {
                name,
                index: this.describe_index++
            },
            result: {
                total: this.describe_total,
                failed: this.describe_failed
            }
        })
    }

    // 定义测试用例
    it(name, fn) {
        this.lifecycle.beforeItem({
            it: {
                name,
                index: this.it_index
            }
        })

        this.describe_total++

        let itInfo = {
            it: {
                name,
                index: this.it_index++
            }
        }

        try {
            fn();
            itInfo.result = {
                status: 'passed',
                error: null
            }
            this.lifecycle.afterItem(itInfo)
        } catch (err) {
            this.describe_failed++

            itInfo.result = {
                status: 'failed',
                error: err
            }
            this.lifecycle.afterItem(itInfo)
        }
    }

    // 定义断言
    expect(value) {
        let expect = new Expect(value, false)
        expect.not = new Expect(value, true)
        return expect
    }
}