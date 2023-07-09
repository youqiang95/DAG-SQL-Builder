import type { NsGraph} from '@antv/xflow'

interface INodeInfo {
    nodeConfig: NsGraph.INodeConfig,
    parentSet: Set<string>,
    childrenSet: Set<string>
}

export interface IState {
    nodeMap: Map<string, INodeInfo>
}

export class DagNode<T> {
    id: string;
    data: T;
    parentIdSet: Set<string>;
    childrenIdSet: Set<string>;
  
    constructor(id: string, data: T, parentIdSet: Set<string> = new Set(), childrenIdSet: Set<string> = new Set()) {
      this.id = id;
      this.data = data;
      this.parentIdSet = parentIdSet;
      this.childrenIdSet = childrenIdSet;
    }
  
    addChild(child: DagNode<T>): void {
      this.childrenIdSet.add(child.id);
      child.parentIdSet.add(this.id);
    }
  
    removeChild(child: DagNode<T>): void {
      this.childrenIdSet.delete(child.id);
      child.parentIdSet.delete(this.id);
    }
}

export class DagGraphDataManager<T> {
    private nodeMap: Map<string, DagNode<T>>;
    private paramMap: Map<string, string>

    constructor() {
        this.nodeMap = new Map();
        this.paramMap = new Map<string, string>();
    }
  
    addNode(node: DagNode<T>): void {
        this.nodeMap.set(node.id, node);
    }
    getNode(nodeId: string): DagNode<T> | undefined {
        return this.nodeMap.get(nodeId);
    }
  
    getNodes(): IterableIterator<DagNode<T>> {
        return this.nodeMap.values();
    }

    public addParam(key: string, value: string): void {
        this.paramMap.set(key, value);
    }
    
    public removeParam(key: string): void {
        this.paramMap.delete(key);
    }

    public getParam(key: string): string | undefined {
        return this.paramMap.get(key);
    }

    private __getAllDependNodesHelper(id: string, resultArray: DagNode<T>[], visitedMap: Map<string, boolean>) {
        const node = this.nodeMap.get(id);
        if (!node || visitedMap.get(id)) {
            return;
        }
        visitedMap.set(id, true);
        for (const parentId of node.parentIdSet) {
            this.__getAllDependNodesHelper(parentId, resultArray, visitedMap);
        }
        resultArray.push(node);
    }

    public getAllDependNodes(id: string): DagNode<T>[] {
        if(this.hasCycle()){
            throw new Error('错误：画布中存在环!')
        }
        const resultArray: DagNode<T>[] = [];
        const visitedMap: Map<string, boolean> = new Map();
        this.__getAllDependNodesHelper(id, resultArray, visitedMap);
        resultArray.pop()
        return resultArray
    }

    public hasCycle(){
        const visitedMap: Map<string, boolean> = new Map();
        const inDegreeMap: Map<string, number> = new Map();
        const queue: string[] = [];

        // 初始化入度为 0 的节点
        for (const [id, node] of this.nodeMap) {
            inDegreeMap.set(id, 0);
        }

        // 计算每个节点的入度
        for (const [id, node] of this.nodeMap) {
            for (const childId of node.childrenIdSet) {
                inDegreeMap.set(childId, inDegreeMap.get(childId) + 1);
            }
        }

        // 将入度为 0 的节点加入队列
        for (const [id, inDegree] of inDegreeMap) {
            if (inDegree === 0) {
            queue.push(id);
            }
        }

        while (queue.length > 0) {
            const id = queue.shift();
            visitedMap.set(id, true);
            const node = this.nodeMap.get(id);
        
            for (const childId of node.childrenIdSet) {
              inDegreeMap.set(childId, inDegreeMap.get(childId) - 1);
              if (inDegreeMap.get(childId) === 0) {
                queue.push(childId);
              }
            }
        }

        // 如果有节点没有被访问过，则说明图中存在环
        return visitedMap.size !== this.nodeMap.size;
    }
}

export class XflowGraphDataManager extends DagGraphDataManager<NsGraph.INodeConfig> {
    public setStateFromXflowGraphData(graphData: NsGraph.IGraphData): void {
        const {nodes, edges} = graphData
        const nodeMap = new Map<string, DagNode<NsGraph.INodeConfig>>()
        // nodes
        for(let i=0; i<nodes.length; i++){
            const nodeConfig = nodes[i]
            const dagNode = new DagNode<NsGraph.INodeConfig>(nodeConfig.id, nodeConfig)
            nodeMap.set(nodeConfig.id, dagNode)
        }
        // edges
        for(let i=0; i<edges.length; i++){
            const edgeConfig = edges[i]
            const {source, target} = edgeConfig
            if(!(source && target)) continue
            const sourceNode = nodeMap.get(source)
            const targetNode = nodeMap.get(target)
            if(!(sourceNode && targetNode)) continue
            sourceNode.addChild(targetNode)
        }
        nodeMap.forEach((node) => {
            this.addNode(node)
        }) 
    }

    public getNodeSortParentArray(nodeId:string){
        let result = []
        const node = this.getNode(nodeId)
        for(const pid of node.parentIdSet){
            const pNode = this.getNode(pid)
            if(pNode){
                result.push(pNode)
            }
        }
        result.sort((a, b)=>a.data.x-b.data.x)
        return result
    }
}