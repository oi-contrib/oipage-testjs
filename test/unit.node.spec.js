const { Unit } = require('../dist/test.js')

let { describe, it, expect } = Unit.node()

describe("测试加法运算", () => {

    it("1+1=2", () => {
        expect(1 + 1).toBe(2)
    })

    it("2+2=4", () => {
        expect(2 + 2).toBe(4)
    })
})