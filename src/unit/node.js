import Unit from "./core.js"

export function UnitNode() {

    // 统计信息
    const stats = {
        totalSuites: 0,
        totalTests: 0,
        passedTests: 0,
        failedTests: 0,
        startTime: Date.now()
    }

    let ut = new Unit({
        lifecycle: {
            beforeAll: () => {
                console.log('\n🧪 开始运行单元测试...\n')
            },
            beforeEach: (data) => {
                stats.totalSuites++
                console.log(`📁 测试套件: ${data.describe.name}`)
                console.log('─'.repeat(50))
            },
            beforeItem: (data) => {
                stats.totalTests++
                process.stdout.write(`  🔄 ${data.it.name} `)
            },
            afterItem: (data) => {
                if (data.result.status === 'passed') {
                    stats.passedTests++
                    process.stdout.write('✅ 通过\n')
                } else {
                    stats.failedTests++
                    process.stdout.write('❌ 失败\n')
                    console.log(`     错误: ${data.result.error.message}`)
                    if (data.result.error.stack) {
                        console.log(`     ${data.result.error.stack.split('\n')[1].trim()}`)
                    }
                }
            },
            afterEach: (data) => {
                const suiteResult = data.result
                const passed = suiteResult.total - suiteResult.failed
                const failed = suiteResult.failed

                console.log(`\n📊 套件结果: ${passed} 通过, ${failed} 失败`)
                console.log('─'.repeat(50))
                console.log()
            }
        }
    })

    // 添加结束处理
    process.on('beforeExit', () => {
        const duration = Date.now() - stats.startTime
        console.log('\n🏁 测试完成!')
        console.log('═'.repeat(50))
        console.log(`📈 总计: ${stats.totalSuites} 套件, ${stats.totalTests} 用例`)
        console.log(`✅ 通过: ${stats.passedTests}`)
        console.log(`❌ 失败: ${stats.failedTests}`)
        console.log(`⏱️  耗时: ${duration}ms`)

        if (stats.failedTests > 0) {
            console.log('\n💡 有测试失败，请检查上面的详细信息')
            process.exit(1)
        } else {
            console.log('\n🎉 所有测试通过!')
            process.exit(0)
        }
    })

    return {
        describe: ut.describe.bind(ut),
        it: ut.it.bind(ut),
        expect: ut.expect.bind(ut)
    }
}