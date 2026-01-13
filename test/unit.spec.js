const { UnitTest } = require('../dist/test.js')

let ut = new UnitTest({
    lifecycle: {
        beforeAll: () => {
            // console.log("> 单元测试：所有测试开始前运行")
        },
        beforeEach: (data) => {
            // console.log(`> 单元测试：测试套件开始前运行`, data)
        },
        beforeItem: (data) => {
            // console.log(`> 单元测试：测试用例开始前运行`, data)
        },
        afterItem: (data) => {
            console.log(`> 单元测试：测试用例结束后运行`, data)
        },
        afterEach: (data) => {
            // console.log(`> 单元测试：测试套件结束后运行`, data)
        }
    }
})

ut.describe("测试加法运算", () => {

    ut.it("1+1=2", () => {
        ut.expect(1 + 1).toBe(2)
    })

    ut.it("2+2=4", () => {
        ut.expect(2 + 2).toBe(4)
    })

    ut.it("not 1+1!=3", () => {
        // ut.expect(1+1).not.toBe(2)
        ut.expect(1 + 1).not.toBe(3)
    })
})