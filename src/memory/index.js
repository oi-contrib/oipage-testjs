import Memory from "./core"
import { MemoryNode } from "./node"
import { MemoryWeb } from "./web"

Memory.node = MemoryNode
Memory.web = MemoryWeb

export default Memory