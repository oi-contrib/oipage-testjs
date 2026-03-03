const { Performance } = require('../dist/test.js')

let { benchmark } = Performance.node()

// 1、基准测试

benchmark("数组操作性能", () => {
    const arr = new Array(1000).fill(0).map((_, i) => i)
    arr.map(x => x * 2)
})