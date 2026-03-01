import { ExpectType } from "./ExpectType"
import { UnitLifecycleType } from "./UnitLifecycleType"

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