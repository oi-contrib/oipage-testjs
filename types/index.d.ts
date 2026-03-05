import { ExpectType } from "./ExpectType"
import { UnitLifecycleType } from "./UnitLifecycleType"
import { PerformanceLifecycleType } from "./PerformanceLifecycleType"
import { MemoryLifecycleType } from "./MemoryLifecycleType"

export class Unit extends ExpectType {
    constructor(option?: {
        lifecycle?: UnitLifecycleType
    })

    /**
     * Node环境下的单元测试函数
     */
    node(): ExpectType

    /**
     * Web环境下的单元测试函数
     */
    web(): ExpectType
}

export class Performance {
    constructor(option?: {
        lifecycle?: PerformanceLifecycleType
    })

    /**
     * 性能基准测试
     * @param name 测试名称
     * @param fn 测试函数
     * @param iterations 迭代次数，默认为1
     */
    benchmark(name: string, fn: () => void, iterations?: number): void

    /**
     * Node环境下的性能测试函数
     */
    node(): Performance

    /**
     * Web环境下的性能测试函数
     */
    web(): Performance
}

export class Memory {
    constructor(option?: {
        lifecycle?: MemoryLifecycleType
    })

    /**
     * 监控函数执行期间的内存变化
     * @param name 测试名称
     * @param fn 测试函数
     */
    monitor(name: string, fn: () => void): void

    /**
     * Node环境下的内存测试函数
     */
    node(): Memory

    /**
     * Web环境下的内存测试函数
     */
    web(): Memory
}