export * from "./UnitTest"

import { UnitTestInstance } from "./UnitTest"

/**
 * Web环境下的单元测试函数
 */
export interface unit_web {
    (): UnitTestInstance
}

/**
 * Node环境下的单元测试函数
 */
export interface unit_node {
    (): UnitTestInstance
}