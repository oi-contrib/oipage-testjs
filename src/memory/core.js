import mergeOption from "vislite/lib/mergeOption/index.es.js"

// 获取当前内存使用情况
let getMemoryUsage = () => {

    // Node.js环境
    if (typeof process !== 'undefined' && process.memoryUsage) {
        let memory = process.memoryUsage()
        return {

            // 如果 heapUsed 持续增长且不被垃圾回收释放，而 heapTotal 稳定，通常表明存在 JavaScript 对象内存泄漏

            used: memory.heapUsed, // 已使用
            total: memory.heapTotal, // 总共

            // 常驻内存大小，反映了Node.js进程当前占用的实际物理内存总量，会随着进程的运行、内存分配与释放、垃圾回收等动态变化
            limit: memory.rss // 限制
        }
    }

    // 浏览器环境（Chrome）
    else if (typeof performance !== 'undefined' && performance.memory) {
        let memory = performance.memory
        return {

            // 如果userdJSHeapSize的值大于totalJSHeapSize，就可能出现内存泄漏

            used: memory.usedJSHeapSize,
            total: memory.totalJSHeapSize,

            // JavaScript 堆内存上限‌，这个值并非固定不变，而是由浏览器引擎（如 Chrome 的 V8）根据多种动态因素实时计算和调整的
            limit: memory.jsHeapSizeLimit
        }
    }

    return {
        used: 0,
        total: 0,
        limit: 0
    }
}

// 内存监控核心模块
export default class Memory {

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

    // 监控函数执行期间的内存变化
    monitor(name, fn) {
        this.lifecycle.beforeItem({
            type: "monitor",
            it: {
                name,
                index: this.it_index
            }
        })

        let itInfo = {
            type: "monitor",
            error: false,
            it: {
                name,
                index: this.it_index++
            }
        }

        let beforeSnapshot = getMemoryUsage()
        beforeSnapshot.timestamp = Date.now()

        try { // 保证不会因为错误中断
            fn()
        } catch (e) {
            itInfo.error = true // 记录发生了错误
        }

        let afterSnapshot = getMemoryUsage()
        afterSnapshot.timestamp = Date.now()

        itInfo.result = {
            beforeSnapshot, afterSnapshot
        }
        this.lifecycle.afterItem(itInfo)

    }

}