const { Unit } = require('../dist/test.js')

let ut = new Unit({
    lifecycle: {
        beforeAll: () => {
            console.log("> 单元测试：所有测试开始前运行")
        },
        beforeEach: (data) => {
            console.log(`> 单元测试：测试套件开始前运行`, data)
        },
        beforeItem: (data) => {
            console.log(`> 单元测试：测试用例开始前运行`, data)
        },
        afterItem: (data) => {
            console.log(`> 单元测试：测试用例结束后运行`, data)
        },
        afterEach: (data) => {
            console.log(`> 单元测试：测试套件结束后运行`, data)
        }
    }
})

ut.describe("测试 toBe 方法", () => {
    ut.it("1+1=2", () => {
        ut.expect(1 + 1).toBe(2)
    })

    ut.it("字符串相等", () => {
        ut.expect("hello").toBe("hello")
    })

    ut.it("not 1+1!=3", () => {
        ut.expect(1 + 1).not.toBe(3)
    })
})

ut.describe("测试 toEqual 方法", () => {
    ut.it("对象深度相等", () => {
        ut.expect({ a: 1, b: 2 }).toEqual({ a: 1, b: 2 })
    })

    ut.it("数组深度相等", () => {
        ut.expect([1, 2, 3]).toEqual([1, 2, 3])
    })

    ut.it("嵌套对象深度相等", () => {
        ut.expect({ a: { b: 1 } }).toEqual({ a: { b: 1 } })
    })

    ut.it("not 对象不相等", () => {
        ut.expect({ a: 1 }).not.toEqual({ a: 2 })
    })
})

ut.describe("测试 toBeTruthy 和 toBeFalsy 方法", () => {
    ut.it("真值判断", () => {
        ut.expect(true).toBeTruthy()
        ut.expect(1).toBeTruthy()
        ut.expect("hello").toBeTruthy()
    })

    ut.it("假值判断", () => {
        ut.expect(false).toBeFalsy()
        ut.expect(0).toBeFalsy()
        ut.expect("").toBeFalsy()
        ut.expect(null).toBeFalsy()
        ut.expect(undefined).toBeFalsy()
    })

    ut.it("not 真值判断", () => {
        ut.expect(false).not.toBeTruthy()
        ut.expect(0).not.toBeTruthy()
    })

    ut.it("not 假值判断", () => {
        ut.expect(true).not.toBeFalsy()
        ut.expect(1).not.toBeFalsy()
    })
})

ut.describe("测试 toBeNull 和 toBeUndefined 方法", () => {
    ut.it("null 判断", () => {
        ut.expect(null).toBeNull()
    })

    ut.it("undefined 判断", () => {
        ut.expect(undefined).toBeUndefined()
    })

    ut.it("defined 判断", () => {
        ut.expect(1).toBeDefined()
    })

    ut.it("not null 判断", () => {
        ut.expect(1).not.toBeNull()
    })

    ut.it("not undefined 判断", () => {
        ut.expect(1).not.toBeUndefined()
    })
})

ut.describe("测试数值比较方法", () => {
    ut.it("大于判断", () => {
        ut.expect(5).toBeGreaterThan(3)
    })

    ut.it("大于等于判断", () => {
        ut.expect(5).toBeGreaterThanOrEqual(5)
        ut.expect(5).toBeGreaterThanOrEqual(3)
    })

    ut.it("小于判断", () => {
        ut.expect(3).toBeLessThan(5)
    })

    ut.it("小于等于判断", () => {
        ut.expect(3).toBeLessThanOrEqual(3)
        ut.expect(3).toBeLessThanOrEqual(5)
    })

    ut.it("not 大于判断", () => {
        ut.expect(3).not.toBeGreaterThan(5)
    })
})

ut.describe("测试 toContain 方法", () => {
    ut.it("字符串包含", () => {
        ut.expect("hello world").toContain("world")
    })

    ut.it("数组包含", () => {
        ut.expect([1, 2, 3]).toContain(2)
    })

    ut.it("not 字符串不包含", () => {
        ut.expect("hello world").not.toContain("test")
    })

    ut.it("not 数组不包含", () => {
        ut.expect([1, 2, 3]).not.toContain(4)
    })
})