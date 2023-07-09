import {DagNode, DagGraphDataManager} from './dagGraph'
import {getCteAliasName} from './common'

export class NodeRenderConfigFactoy{
    public getNodeRenderConfig(node: DagNode<any>, graphDataManager: DagGraphDataManager<any>){
        return {
            ref: (refName:string)=>{
                const parentLabelMap = new Map<string, DagNode<any>>()
                node.parentIdSet.forEach((pId)=>{
                    const pNode = graphDataManager.getNode(pId)
                    parentLabelMap.set(pNode.data.label, pNode)
                })
                if(parentLabelMap.has(refName)){
                    const pNode = parentLabelMap.get(refName)
                    if(pNode.data && pNode.data.nodeType === 'source'){
                        return pNode.data.refName
                    }
                    else{
                        return getCteAliasName(refName)
                    }
                }
                const paramVal = graphDataManager.getParam(refName)
                if(paramVal){
                    return paramVal
                }
                throw new Error('错误的引用: ' + refName)
            }
        }
    }
}

