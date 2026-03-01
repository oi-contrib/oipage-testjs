import Unit from "./core.js"

export function UnitWeb() {

    // 统计信息
    const stats = {
        totalSuites: 0,
        totalTests: 0,
        passedTests: 0,
        failedTests: 0,
        startTime: Date.now()
    }

    // DOM元素
    let container = null
    let header = null
    let content = null
    let toggleBtn = null
    let isDragging = false
    let dragOffset = { x: 0, y: 0 }
    let isMinimized = false

    // 创建测试结果显示容器
    function createTestContainer() {
        if (container) return

        // 创建容器 - 简化样式
        container = document.createElement('div')
        container.id = 'unit-test-container'
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            width: 300px;
            background: #fff;
            border: 1px solid #ddd;
            border-radius: 4px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: 14px;
            color: #333;
            overflow: hidden;
            cursor: move;
            transition: all 0.05s ease;
        `

        // 创建头部 - 简化样式
        header = document.createElement('div')
        header.style.cssText = `
            padding: 8px 12px;
            background: #f5f5f5;
            border-bottom: 1px solid #ddd;
            display: flex;
            justify-content: space-between;
            align-items: center;
            user-select: none;
        `

        const title = document.createElement('div')
        title.textContent = '🧪 单元测试'
        title.style.cssText = `
            font-weight: 500;
            font-size: 14px;
            white-space: nowrap;
        `

        toggleBtn = document.createElement('button')
        toggleBtn.innerHTML = '−'
        toggleBtn.style.cssText = `
            background: none;
            border: none;
            color: #666;
            font-size: 16px;
            cursor: pointer;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 2px;
        `
        toggleBtn.onmouseover = () => toggleBtn.style.background = '#eee'
        toggleBtn.onmouseout = () => toggleBtn.style.background = 'none'
        toggleBtn.onclick = toggleContainer

        header.appendChild(title)
        header.appendChild(toggleBtn)
        container.appendChild(header)

        // 创建内容区域 - 简化样式
        content = document.createElement('div')
        content.style.cssText = `
            padding: 10px;
            max-height: 300px;
            overflow-y: auto;
            background: #fff;
        `
        container.appendChild(content)

        // 添加拖拽功能
        header.addEventListener('mousedown', startDrag)
        document.addEventListener('mousemove', drag)
        document.addEventListener('mouseup', stopDrag)

        document.body.appendChild(container)
    }

    // 切换容器显示/隐藏
    function toggleContainer() {
        isMinimized = !isMinimized
        if (isMinimized) {
            content.style.display = 'none'
            container.style.width = '200px'
            toggleBtn.innerHTML = '+'
        } else {
            content.style.display = 'block'
            container.style.width = '300px'
            toggleBtn.innerHTML = '−'
        }
    }

    // 拖拽功能
    function startDrag(e) {
        isDragging = true
        dragOffset.x = e.clientX - container.offsetLeft
        dragOffset.y = e.clientY - container.offsetTop
        container.style.cursor = 'grabbing'
    }

    function drag(e) {
        if (!isDragging) return
        e.preventDefault()
        container.style.right = (document.documentElement.clientWidth - e.clientX + dragOffset.x - container.clientWidth) + 'px'
        container.style.top = (e.clientY - dragOffset.y) + 'px'
    }

    function stopDrag() {
        isDragging = false
        container.style.cursor = 'move'
    }

    // 添加测试项到内容区域 - 简化样式
    function addTestItem(name, status, error = null) {
        if (!content) return

        const item = document.createElement('div')
        item.style.cssText = `
            margin-bottom: 6px;
            padding: 4px 6px;
            border-left: 2px solid ${status === 'passed' ? '#4caf50' : '#f44336'};
            background: #f9f9f9;
            font-size: 12px;
            line-height: 1.2;
        `

        const icon = status === 'passed' ? '✓' : '✗'
        const color = status === 'passed' ? '#4caf50' : '#f44336'

        item.innerHTML = `
            <div style="display: flex; align-items: flex-start;">
                <span style="color: ${color}; margin-right: 4px; font-weight: bold;">${icon}</span>
                <span style="flex: 1;">${name}</span>
            </div>
            ${error ? `<div style="margin-top: 2px; color: #d32f2f; font-size: 11px; padding-left: 14px;">${error.message}</div>` : ''}
        `

        content.appendChild(item)
        content.scrollTop = content.scrollHeight
    }

    // 更新统计信息 - 简化显示
    function updateStats() {
        if (!header) return

        const passed = stats.totalTests - stats.failedTests
        const failed = stats.failedTests

        const title = header.querySelector('div')
        title.innerHTML = `
            🧪 单元测试 (${passed}/${stats.totalTests})
            <span style="color: ${failed > 0 ? '#d32f2f' : '#388e3c'}; margin-left: 6px; font-size: 12px;">
                ${failed > 0 ? `${failed} 失败` : '通过'}
            </span>
        `
    }

    let ut = new Unit({
        lifecycle: {
            beforeAll: () => {
                createTestContainer()
            },
            beforeEach: (data) => {
                stats.totalSuites++
                const suiteDiv = document.createElement('div')
                suiteDiv.style.cssText = `
                    margin-bottom: 8px;
                    padding: 4px 6px;
                    background: #f5f5f5;
                    border-bottom: 1px solid #eee;
                    font-weight: 500;
                    font-size: 12px;
                    color: #555;
                `
                suiteDiv.innerHTML = `📁 ${data.describe.name}`
                content.appendChild(suiteDiv)
            },
            beforeItem: (data) => {
                stats.totalTests++
            },
            afterItem: (data) => {
                if (data.result.status === 'passed') {
                    stats.passedTests++
                } else {
                    stats.failedTests++
                }

                addTestItem(data.it.name, data.result.status, data.result.error)
                updateStats()
            },
            afterEach: (data) => {
                // 每个套件结束时的处理
            }
        }
    })

    // 监听页面卸载事件 - 简化显示
    window.addEventListener('beforeunload', () => {
        if (container) {
            const summary = document.createElement('div')
            summary.style.cssText = `
                margin-top: 8px;
                padding: 6px;
                background: #f5f5f5;
                border-top: 1px solid #eee;
                font-size: 11px;
                color: #666;
            `

            const duration = Date.now() - stats.startTime
            const passed = stats.totalTests - stats.failedTests
            const failed = stats.failedTests

            summary.innerHTML = `
                <div style="font-weight: 500; margin-bottom: 2px;">测试完成</div>
                <div>总计: ${stats.totalTests} | 通过: <span style="color: #388e3c;">${passed}</span>${failed > 0 ? ` | 失败: <span style="color: #d32f2f;">${failed}</span>` : ''}</div>
                <div style="font-size: 10px; margin-top: 1px;">${duration}ms</div>
            `

            content.appendChild(summary)
            content.scrollTop = content.scrollHeight
        }
    })

    return {
        describe: ut.describe.bind(ut),
        it: ut.it.bind(ut),
        expect: ut.expect.bind(ut)
    }

}