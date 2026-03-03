import mergeOption from "vislite/lib/mergeOption/index.es.js"

// 性能测试核心模块
export default class Performance {

    it_index = 0 // 当前测试用例索引

    // 生命周期钩子
    lifecycle = {
        beforeAll: () => { }, // 所有测试开始前
        beforeItem: (data) => { }, // 每个测试用例开始前
        afterItem: (data) => { }, // 每个测试用例结束后
    }

    constructor(options = {}) {
        mergeOption(this.lifecycle, options.lifecycle)

        this.lifecycle.beforeAll()
    }

    // 性能基准测试
    benchmark(name, fn, iterations = 1) {
        this.lifecycle.beforeItem({
            type: "benchmark",
            it: {
                name,
                index: this.it_index
            }
        })

        let itInfo = {
            type: "benchmark",
            error: false,
            it: {
                name,
                index: this.it_index++
            }
        }

        const startTime = performance.now()

        for (let i = 0; i < iterations; i++) {
            try { // 保证不会因为错误中断
                fn()
            } catch (e) {
                itInfo.error = true // 记录发生了错误
            }
        }

        const endTime = performance.now()

        itInfo.result = {
            averageTime: (endTime - startTime) / iterations
        }
        this.lifecycle.afterItem(itInfo)
    }

}