import Performance from "./core.js"
import { formatTime } from "../tools/index.js"

export function PerformanceNode() {

    // 统计信息
    const stats = {
        totalBenchmarks: 0,
        startTime: Date.now()
    }

    let pf = new Performance({
        lifecycle: {
            beforeAll: () => {
                console.log('\n⚡ 开始运行性能测试...\n')
            },
            beforeItem: (data) => {
                stats.totalBenchmarks++
                process.stdout.write(`  🔄 ${data.it.name} `)
            },
            afterItem: (data) => {
                if (data.error) {
                    process.stdout.write('❌ 错误\n')
                    console.log(`     测试执行过程中发生错误`)
                } else {
                    process.stdout.write('✅ 完成\n')
                    console.log(`     平均耗时: ${formatTime(data.result.averageTime)}`)
                }
            }
        }
    })

    // 添加结束处理
    process.on('beforeExit', () => {
        const duration = Date.now() - stats.startTime
        console.log('\n🏁 性能测试完成!')
        console.log('═'.repeat(50))
        console.log(`📈 总计: ${stats.totalBenchmarks} 个基准测试`)
        console.log(`⏱️  耗时: ${formatTime(duration)}`)
        console.log('\n🎉 性能测试执行完毕!')
    })

    return {
        benchmark: pf.benchmark.bind(pf)
    }
}