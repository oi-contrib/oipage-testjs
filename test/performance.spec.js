const { Performance } = require('../dist/test.js')

let pf = new Performance({
    lifecycle: {
        beforeItem: (data) => {
            console.log(`> 性能测试：测试用例开始前运行`, data)
        },
        afterItem: (data) => {
            console.log(`> 性能测试：测试用例结束后运行`, data)
        },
    }
})

// 1、基准测试

pf.benchmark("数组操作性能", () => {
    const arr = new Array(1000).fill(0).map((_, i) => i)
    arr.map(x => x * 2)
})