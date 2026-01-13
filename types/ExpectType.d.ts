export declare interface ExpectType {

    /**
     * toBe
     */
    not: this

    /**
     * 使用 Object.is 严格相等（适用于基本类型）
     * @param expect 
     */
    toBe(expect: any): void;

    /**
     * 深度比较对象/数组内容，忽略引用差异
     * @param expect 
     */
    toEqual(expect: any): void;



}