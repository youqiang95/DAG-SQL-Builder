import {DagGraphDataManager} from './dagGraph'
import {NodeCompiler} from './compiler'
import {getCteAliasName} from './common'

export class NodeSQLBuilder {
    private nodeId: string;
    private graphDataManager: DagGraphDataManager<any>;
  
    constructor(nodeId: string, graphDataManager: DagGraphDataManager<any>) {
      this.nodeId = nodeId;
      this.graphDataManager = graphDataManager;
    }

    public build(){
        const depNodes = this.graphDataManager.getAllDependNodes(this.nodeId)
        let preSql = ''
        let isFirst = true
        for(const depNode of depNodes){
            const depNodeData = depNode.data
            const nodeType = depNodeData.nodeType || 'code'
            if(nodeType !== 'code'){
                continue
            }
            if(!isFirst){
                preSql += ', '
            }
            const compiler = new NodeCompiler(depNode.id, this.graphDataManager)
            preSql += (isFirst ? 'WITH ' : '')  +  `${getCteAliasName(depNodeData.label)} as (${compiler.compile()})`
            isFirst = false 
        }
        preSql += '\n'

        const curNodeCompiler = new NodeCompiler(this.nodeId, this.graphDataManager)
        const curNodeCompiled = curNodeCompiler.compile()
        const fullSql = preSql + curNodeCompiled
        return fullSql
    }
}