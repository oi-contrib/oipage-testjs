export default class Expect {

    constructor(value, isNot) {
        this.value = value // 需要判断的值
        this.isNot = isNot // 是否取反判断
    }

    /**
     * 使用 Object.is 严格相等（适用于基本类型）
     * expect(5).toBe(5); // ✅
     * expect('5').toBe(5); // ❌（类型不同）
     * @param expect 
     */
    toBe(expect) {
        if (this.value !== expect) {
            if (!this.isNot) throw new Error(`Expected ${this.value} to be ${expect}`)
        } else {
            if (this.isNot) throw new Error(`Expected ${this.value} not to be ${expect}`)
        }
    }

    /**
     * 深度比较对象/数组内容，忽略引用差异
     * expect({ a: 1 }).toEqual({ a: 1 }); // ✅
     * expect([1, 2]).toEqual([1, 2]); // ✅
     * @param expect 
     */
    toEqual(expect) {

    }


}