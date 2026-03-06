# 内存监控

## 引入

```js
import { Memory } from "@oipage/testjs"
```

## 使用

```js
let { monitor } = Memory.web()
```

> 上面是浏览器端例子，如果是nodejs，把 `Memory.web()` 改成 `Memory.node()` 即可，其余不变

**返回值:**
- `monitor`: 定义内存监控测试

现在，我们就可以开始编写我们的内存监控测试用例了，比如：

```js
monitor("数组内存占用测试", () => {
    let arr = []
    for (let i = 0; i < 10000; i++) {
        arr.push(i)
    }
    return arr
})

monitor("对象内存占用测试", () => {
    let obj = {}
    for (let i = 0; i < 1000; i++) {
        obj[`key${i}`] = `value${i}`
    }
    return obj
})
```

## monitor(name, fn)

定义一个内存监控测试。

**参数:**
- `name`: 测试名称
- `fn`: 要监控的函数

**返回值:**
- `result`: 测试结果对象，包含 `beforeSnapshot` 和 `afterSnapshot` 两个内存快照

## 内存快照说明

每个内存快照包含以下信息：

- `used`: 已使用的内存（字节）
- `total`: 总分配的内存（字节）
- `limit`: 内存限制（字节）
- `timestamp`: 时间戳（毫秒）

## 内存泄漏检测

通过比较函数执行前后的内存使用情况，可以检测潜在的内存泄漏：

```js
monitor("检查内存泄漏", () => {
    let elements = []
    for (let i = 0; i < 1000; i++) {
        elements.push(document.createElement('div'))
    }
    // 注意：这里故意不清理elements，可能导致内存泄漏
})
```

## 高级用法

手动创建测试实例，其中lifecycle会在测试不同阶段执行，参数data记录的相关信息和测试结果，用户可以根据这里的信息个性化显示测试结果：

```js
let mm = new Memory({
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
mm.monitor("自定义内存监控", () => {
    // 监控代码
})
```

**返回值:**
- `mm.monitor`: 定义内存监控测试

其余和前置说明一致。