# 单元测试

## 引入

```js
import { Unit } from "@oipage/testjs"
```

## 使用

```js
let { describe, it, expect } = Unit.web()
```

> 上面是浏览器端例子，如果是nodejs，把 `Unit.web()` 改成 `Unit.node()` 即可，其余不变

**返回值:**
- `describe`: 定义测试套件
- `it`: 定义测试用例
- `expect`: 创建断言

现在，我们就可以开始编写我们的单元测试用例了，比如：

```js
describe("测试若干方法", () => {
    it("1+1=2", () => {
        expect(1 + 1).toBe(2)
    })

    it("数组深度相等", () => {
        expect([1, 2, 3]).toEqual([1, 2, 3])
    })
})
```

上面的toBe和toEqual就是可以使用的断言方法，具体的有：

## 断言方法

### `toBe(value)`
使用 Object.is 严格相等（适用于基本类型）:
```js
expect(5).toBe(5); // ✅
expect('5').toBe(5); // ❌（类型不同）
```

### `toEqual(value)`
深度比较对象/数组内容，忽略引用差异:
```js
expect({ a: 1 }).toEqual({ a: 1 }); // ✅
expect([1, 2]).toEqual([1, 2]); // ✅
```

### `toBeTruthy()`
检查值是否为真值（truthy）:
```js
expect(true).toBeTruthy(); // ✅
expect(1).toBeTruthy(); // ✅
expect('').toBeTruthy(); // ❌
```

### `toBeFalsy()`
检查值是否为假值（falsy）:
```js
expect(false).toBeFalsy(); // ✅
expect(0).toBeFalsy(); // ✅
expect(1).toBeFalsy(); // ❌
```

### `toBeNull()`
检查值是否为 null:
```js
expect(null).toBeNull(); // ✅
expect(undefined).toBeNull(); // ❌
```

### `toBeUndefined()`
检查值是否为 undefined:
```js
expect(undefined).toBeUndefined(); // ✅
expect(null).toBeUndefined(); // ❌
```

### `toBeDefined()`
检查值是否为定义的值（非 undefined）:
```js
expect(1).toBeDefined(); // ✅
expect(undefined).toBeDefined(); // ❌
```

### `toBeGreaterThan(value)`
检查值是否大于预期值:
```js
expect(5).toBeGreaterThan(3); // ✅
expect(3).toBeGreaterThan(5); // ❌
```

### `toBeGreaterThanOrEqual(value)`
检查值是否大于或等于预期值:
```js
expect(5).toBeGreaterThanOrEqual(5); // ✅
expect(3).toBeGreaterThanOrEqual(5); // ❌
```

### `toBeLessThan(value)`
检查值是否小于预期值:
```js
expect(3).toBeLessThan(5); // ✅
expect(5).toBeLessThan(3); // ❌
```

### `toBeLessThanOrEqual(value)`
检查值是否小于或等于预期值:
```js
expect(3).toBeLessThanOrEqual(3); // ✅
expect(5).toBeLessThanOrEqual(3); // ❌
```

### `toContain(value)`
检查字符串是否包含预期子字符串，或数组是否包含预期元素:
```js
expect('hello world').toContain('world'); // ✅
expect('hello world').toContain('test'); // ❌
expect([1, 2, 3]).toContain(2); // ✅
expect([1, 2, 3]).toContain(4); // ❌
```

## 高级用法

手动创建测试实例，其中lifecycle会在测试不同阶段执行，参数data记录的相关信息和测试结果，用户可以根据这里的信息个性化显示测试结果：

```js
let ut = new Unit({
    lifecycle: {
        beforeAll: () => { // 所有测试开始前运行

        },
        beforeEach: (data) => { // 测试套件开始前运行
            
        },
        beforeItem: (data) => { // 测试用例开始前运行
            
        },
        afterItem: (data) => { // 测试用例结束后运行
           
        },
        afterEach: (data) => { // 测试套件结束后运行
            
        }
    }
})
```

**返回值:**
- `ut.describe`: 定义测试套件
- `ut.it`: 定义测试用例
- `ut.expect`: 创建断言

其余和前置说明一致。