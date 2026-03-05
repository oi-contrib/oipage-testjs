const { Memory } = require('../dist/test.js')

let mm = new Memory({
    lifecycle: {
        beforeItem: (data) => {
            console.log(`> 内存监控：测试用例开始前运行`, data)
        },
        afterItem: (data) => {
            console.log(`> 内存监控：测试用例结束后运行`, data)
        },
    }
})

// 1、监控内存变化

mm.monitor("数组创建内存监控", () => {
    const arr = new Array(1000).fill(0).map((_, i) => ({ id: i, data: new Array(100).fill(i) }))
})