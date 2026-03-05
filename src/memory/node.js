import Memory from "./core.js"
import { formatBytes, formatTime } from "../tools/index.js"

export function MemoryNode() {

    // 统计信息
    const stats = {
        totalMonitors: 0,
        startTime: Date.now()
    }

    let mm = new Memory({
        lifecycle: {
            beforeAll: () => {
                console.log('\n🧠 开始运行内存监控测试...\n')
            },
            beforeItem: (data) => {
                stats.totalMonitors++
                process.stdout.write(`  🔄 ${data.it.name} `)
            },
            afterItem: (data) => {
                if (data.error) {
                    process.stdout.write('❌ 错误\n')
                    console.log(`     监控执行过程中发生错误`)
                } else {
                    process.stdout.write('✅ 完成\n')
                    const before = data.result.beforeSnapshot
                    const after = data.result.afterSnapshot
                    const usedDiff = after.used - before.used
                    const totalDiff = after.total - before.total
                    
                    console.log(`     内存使用变化: ${usedDiff >= 0 ? '+' : ''}${formatBytes(usedDiff)}`)
                    console.log(`     当前使用: ${formatBytes(after.used)}`)
                    console.log(`     当前总计: ${formatBytes(after.total)}`)
                }
            }
        }
    })

    // 添加结束处理
    process.on('beforeExit', () => {
        const duration = Date.now() - stats.startTime
        console.log('\n🏁 内存监控测试完成!')
        console.log('═'.repeat(50))
        console.log(`📈 总计: ${stats.totalMonitors} 个监控测试`)
        console.log(`⏱️  耗时: ${formatTime(duration)}`)
        console.log('\n🎉 内存监控测试执行完毕!')
    })

    return {
        monitor: mm.monitor.bind(mm)
    }
}