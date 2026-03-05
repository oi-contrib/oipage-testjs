const { Memory } = require('../dist/test.js')

let { monitor } = Memory.node()

// 1、监控内存变化

monitor("数组创建内存监控", () => {
    const arr = new Array(1000).fill(0).map((_, i) => ({ id: i, data: new Array(100).fill(i) }))
})