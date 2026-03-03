/**
 * 格式化字节显示
 * @param {number} bytes 字节数
 * @returns {string} 格式化后的字节字符串
 */
export function formatBytes(bytes) {
    if (bytes === 0) return '0 B'
    
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(Math.abs(bytes)) / Math.log(k))
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

/**
 * 格式化时间显示
 * @param {number} ms 毫秒数
 * @returns {string} 格式化后的时间字符串
 */
export function formatTime(ms) {
    if (ms < 1) {
        return `${(ms * 1000).toFixed(2)}μs`
    } else if (ms < 1000) {
        return `${ms.toFixed(2)}ms`
    } else {
        return `${(ms / 1000).toFixed(2)}s`
    }
}