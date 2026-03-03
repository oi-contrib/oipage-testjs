import Performance from "./core"
import { PerformanceNode } from "./node"
import { PerformanceWeb } from "./web"

Performance.node = PerformanceNode
Performance.web = PerformanceWeb

export default Performance