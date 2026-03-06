# 性能测试

## 引入

```js
import { Performance } from "@oipage/testjs"
```

## 使用

```js
let { benchmark } = Performance.web()
```

> 上面是浏览器端例子，如果是nodejs，把 `Performance.web()` 改成 `Performance.node()` 即可，其余不变

**返回值:**
- `benchmark`: 定义性能基准测试

现在，我们就可以开始编写我们的性能测试用例了，比如：

```js
benchmark("数组操作性能测试", () => {
    let arr = []
    for (let i = 0; i < 10000; i++) {
        arr.push(i)
    }
    return arr
}, 100)

benchmark("字符串拼接性能测试", () => {
    let str = ""
    for (let i = 0; i < 1000; i++) {
        str += "test"
    }
    return str
}, 50)
```

## benchmark(name, fn, iterations = 1)

定义一个性能基准测试。

**参数:**
- `name`: 测试名称
- `fn`: 要测试的函数
- `iterations`: 迭代次数，默认为1

**返回值:**
- `result`: 测试结果对象，包含 `averageTime` 平均执行时间（毫秒）

## 高级用法

手动创建测试实例，其中lifecycle会在测试不同阶段执行，参数data记录的相关信息和测试结果，用户可以根据这里的信息个性化显示测试结果：

```js
let pf = new Performance({
    lifecycle: {
        beforeAll: () => { // 所有测试开始前运行

        },
        beforeItem: (data) => { // 测试套件开始前运行
            
        },
        afterItem: (data) => { // 测试用例结束后运行
           
        }
    }
})

// 使用方式
pf.benchmark("自定义测试", () => {
    // 测试代码
})
```

**返回值:**
- `pf.benchmark`: 定义性能基准测试

其余和前置说明一致。