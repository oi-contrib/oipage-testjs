/**
 * 断言
 */
export class ExpectType {

    /**
     * 取反断言，用于否定匹配
     */
    not: this

    /**
     * 使用 Object.is 严格相等（适用于基本类型）
     * @param expect 预期值
     */
    toBe(expect: any): void;

    /**
     * 深度比较对象/数组内容，忽略引用差异
     * @param expect 预期值
     */
    toEqual(expect: any): void;

    /**
     * 检查值是否为真值（truthy）
     */
    toBeTruthy(): void;

    /**
     * 检查值是否为假值（falsy）
     */
    toBeFalsy(): void;

    /**
     * 检查值是否为 null
     */
    toBeNull(): void;

    /**
     * 检查值是否为 undefined
     */
    toBeUndefined(): void;

    /**
     * 检查值是否为定义的值（非 undefined）
     */
    toBeDefined(): void;

    /**
     * 检查值是否大于预期值
     * @param expect 预期值
     */
    toBeGreaterThan(expect: number): void;

    /**
     * 检查值是否大于或等于预期值
     * @param expect 预期值
     */
    toBeGreaterThanOrEqual(expect: number): void;

    /**
     * 检查值是否小于预期值
     * @param expect 预期值
     */
    toBeLessThan(expect: number): void;

    /**
     * 检查值是否小于或等于预期值
     * @param expect 预期值
     */
    toBeLessThanOrEqual(expect: number): void;

    /**
     * 检查字符串或数组是否包含预期子字符串或元素
     * @param expect 预期值
     */
    toContain(expect: any): void;
}