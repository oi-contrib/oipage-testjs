export default class Expect {

    constructor(value, isNot) {
        this.value = value // 需要判断的值
        this.isNot = isNot // 是否取反判断
    }

    /**
     * 深度比较两个值是否相等
     * @param {*} a
     * @param {*} b
     * @returns {boolean}
     */
    deepEqual(a, b) {
        // 基本类型比较
        if (a === b) return true;
        
        // 处理 null 和 undefined
        if (a == null || b == null) return a === b;
        
        // 处理 NaN
        if (Number.isNaN(a) && Number.isNaN(b)) return true;
        
        // 处理类型不同
        if (typeof a !== typeof b) return false;
        
        // 处理日期
        if (a instanceof Date && b instanceof Date) {
            return a.getTime() === b.getTime();
        }
        
        // 处理正则表达式
        if (a instanceof RegExp && b instanceof RegExp) {
            return a.toString() === b.toString();
        }
        
        // 处理数组
        if (Array.isArray(a) && Array.isArray(b)) {
            if (a.length !== b.length) return false;
            for (let i = 0; i < a.length; i++) {
                if (!this.deepEqual(a[i], b[i])) return false;
            }
            return true;
        }
        
        // 处理对象
        if (typeof a === 'object' && typeof b === 'object') {
            const keysA = Object.keys(a);
            const keysB = Object.keys(b);
            
            if (keysA.length !== keysB.length) return false;
            
            for (let key of keysA) {
                if (!keysB.includes(key)) return false;
                if (!this.deepEqual(a[key], b[key])) return false;
            }
            
            return true;
        }
        
        return false;
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
        const result = this.deepEqual(this.value, expect);
        
        if (!result) {
            if (!this.isNot) throw new Error(`Expected ${JSON.stringify(this.value)} to equal ${JSON.stringify(expect)}`)
        } else {
            if (this.isNot) throw new Error(`Expected ${JSON.stringify(this.value)} not to equal ${JSON.stringify(expect)}`)
        }
    }

    /**
     * 检查值是否为真值（truthy）
     * expect(true).toBeTruthy(); // ✅
     * expect(1).toBeTruthy(); // ✅
     * expect('').toBeTruthy(); // ❌
     * @param expect
     */
    toBeTruthy() {
        if (!this.value) {
            if (!this.isNot) throw new Error(`Expected ${this.value} to be truthy`)
        } else {
            if (this.isNot) throw new Error(`Expected ${this.value} not to be truthy`)
        }
    }

    /**
     * 检查值是否为假值（falsy）
     * expect(false).toBeFalsy(); // ✅
     * expect(0).toBeFalsy(); // ✅
     * expect(1).toBeFalsy(); // ❌
     * @param expect
     */
    toBeFalsy() {
        if (this.value) {
            if (!this.isNot) throw new Error(`Expected ${this.value} to be falsy`)
        } else {
            if (this.isNot) throw new Error(`Expected ${this.value} not to be falsy`)
        }
    }

    /**
     * 检查值是否为 null
     * expect(null).toBeNull(); // ✅
     * expect(undefined).toBeNull(); // ❌
     * @param expect
     */
    toBeNull() {
        if (this.value !== null) {
            if (!this.isNot) throw new Error(`Expected ${this.value} to be null`)
        } else {
            if (this.isNot) throw new Error(`Expected ${this.value} not to be null`)
        }
    }

    /**
     * 检查值是否为 undefined
     * expect(undefined).toBeUndefined(); // ✅
     * expect(null).toBeUndefined(); // ❌
     * @param expect
     */
    toBeUndefined() {
        if (this.value !== undefined) {
            if (!this.isNot) throw new Error(`Expected ${this.value} to be undefined`)
        } else {
            if (this.isNot) throw new Error(`Expected ${this.value} not to be undefined`)
        }
    }

    /**
     * 检查值是否为定义的值（非 undefined）
     * expect(1).toBeDefined(); // ✅
     * expect(undefined).toBeDefined(); // ❌
     * @param expect
     */
    toBeDefined() {
        if (this.value === undefined) {
            if (!this.isNot) throw new Error(`Expected ${this.value} to be defined`)
        } else {
            if (this.isNot) throw new Error(`Expected ${this.value} not to be defined`)
        }
    }

    /**
     * 检查值是否大于预期值
     * expect(5).toBeGreaterThan(3); // ✅
     * expect(3).toBeGreaterThan(5); // ❌
     * @param expect
     */
    toBeGreaterThan(expect) {
        if (!(this.value > expect)) {
            if (!this.isNot) throw new Error(`Expected ${this.value} to be greater than ${expect}`)
        } else {
            if (this.isNot) throw new Error(`Expected ${this.value} not to be greater than ${expect}`)
        }
    }

    /**
     * 检查值是否大于或等于预期值
     * expect(5).toBeGreaterThanOrEqual(5); // ✅
     * expect(3).toBeGreaterThanOrEqual(5); // ❌
     * @param expect
     */
    toBeGreaterThanOrEqual(expect) {
        if (!(this.value >= expect)) {
            if (!this.isNot) throw new Error(`Expected ${this.value} to be greater than or equal ${expect}`)
        } else {
            if (this.isNot) throw new Error(`Expected ${this.value} not to be greater than or equal ${expect}`)
        }
    }

    /**
     * 检查值是否小于预期值
     * expect(3).toBeLessThan(5); // ✅
     * expect(5).toBeLessThan(3); // ❌
     * @param expect
     */
    toBeLessThan(expect) {
        if (!(this.value < expect)) {
            if (!this.isNot) throw new Error(`Expected ${this.value} to be less than ${expect}`)
        } else {
            if (this.isNot) throw new Error(`Expected ${this.value} not to be less than ${expect}`)
        }
    }

    /**
     * 检查值是否小于或等于预期值
     * expect(3).toBeLessThanOrEqual(3); // ✅
     * expect(5).toBeLessThanOrEqual(3); // ❌
     * @param expect
     */
    toBeLessThanOrEqual(expect) {
        if (!(this.value <= expect)) {
            if (!this.isNot) throw new Error(`Expected ${this.value} to be less than or equal ${expect}`)
        } else {
            if (this.isNot) throw new Error(`Expected ${this.value} not to be less than or equal ${expect}`)
        }
    }

    /**
     * 检查字符串是否包含预期子字符串
     * expect('hello world').toContain('world'); // ✅
     * expect('hello world').toContain('test'); // ❌
     * @param expect
     */
    toContain(expect) {
        if (typeof this.value === 'string' && this.value.includes(expect)) {
            if (this.isNot) throw new Error(`Expected ${this.value} not to contain ${expect}`)
        } else if (Array.isArray(this.value) && this.value.includes(expect)) {
            if (this.isNot) throw new Error(`Expected ${JSON.stringify(this.value)} not to contain ${expect}`)
        } else {
            if (!this.isNot) throw new Error(`Expected ${this.value} to contain ${expect}`)
        }
    }


}