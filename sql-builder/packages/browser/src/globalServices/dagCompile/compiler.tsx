import {DagGraphDataManager} from './dagGraph'
import {NodeCompileError} from '@/error'
import {NodeRenderConfigFactoy} from './render'
import nunjucks from 'nunjucks'
import {refWrap, processSql} from './common'
const nunjucksEnv = nunjucks.configure('views', {
    autoescape: false
})

// 不被包裹的正则匹配
const beforeNoWrapRegexStr = (noWrapList: Array<string>) =>{
    let regexStr = '(?<!'
    let subRegexList: string[] = []
    for(let wrapStr of noWrapList){
        const noWrapStr = '[^' + wrapStr + ']'
        subRegexList.push('^' + `${noWrapStr}*${wrapStr}(${noWrapStr}*${wrapStr}${noWrapStr}*${wrapStr})*${noWrapStr}*`) 
    }
    regexStr += subRegexList.join('|') + ')'
    return regexStr
}

const wrapList = ['"', "'", '`']

// 子查询标识在sql中的正则表达式 (@xxx语法)
const getTableRegex = () =>{
    let regexpStr = beforeNoWrapRegexStr(wrapList)
    // regexpStr += `@\\s*([a-zA-Z][_a-zA-Z0-9]*)`
    regexpStr += `@\\s*([\u4E00-\u9FA5A-Za-z0-9_]*)`

    return new RegExp(regexpStr, 'g')
}

// 子查询标识两边有括号的正则表达式 （@xxx语法）
const getTableRegexBracket = ()=>{
    let regexpStr = beforeNoWrapRegexStr(wrapList)
    // regexpStr += `@\\s*([a-zA-Z][_a-zA-Z0-9]*)`
    regexpStr += `\\(\\s*@\\s*([\u4E00-\u9FA5A-Za-z0-9_]*)\\s*\\)`

    return new RegExp(regexpStr, 'g')
}

// Compatible with previous @ xxx syntax
const replaceOldRef = (sql:string)=>{
    const newSql = sql.replaceAll(getTableRegexBracket(), (matchStr:string, ...args)=> {
        const targetLabel = args[wrapList.length]
        return refWrap(targetLabel)
    }).replaceAll(getTableRegex(), (matchStr:string, ...args)=> {
        const targetLabel = args[wrapList.length]
        return refWrap(targetLabel)
    })
    return newSql
}

export class NodeCompiler {
    private nodeId: string;
    private graphDataManager: DagGraphDataManager<any>;
  
    constructor(nodeId: string, graphDataManager: DagGraphDataManager<any>) {
      this.nodeId = nodeId;
      this.graphDataManager = graphDataManager;
    }
  
    compile(): string {
        const node = this.graphDataManager.getNode(this.nodeId);
        if (!node || !node.data) {
            return ''
        }
        const nodeData = node.data
        try {
            if((nodeData.nodeType || 'code') === 'source'){
                return ''
            }
            const processed = processSql(nodeData.sql || '')
            const replaceOldSyntax = replaceOldRef(processed)
            const template = nunjucks.compile(replaceOldSyntax, nunjucksEnv)
            const renderConfig = new NodeRenderConfigFactoy().getNodeRenderConfig(node, this.graphDataManager)
            let compiledSql = template.render(renderConfig)
            return compiledSql
        } catch (error) {
            let errMsg = `节点(${nodeData.label})编译错误: ` + '\n'
            errMsg += error.message
            throw new NodeCompileError(errMsg)
        }
    }
}