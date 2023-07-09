import { format } from 'sql-formatter';
import {extractColumnsFromSql} from '@/sqlParser'
import type { NsGraph} from '@antv/xflow'
import {getEditorSettingservice} from '@/globalServices'
import nunjucks from 'nunjucks'

const nunjucksEnv = nunjucks.configure('views', {
    autoescape: false
})

const getJinja2WrapBlockRegex = ()=>{
    const regexpStr = `\{[\{|%|#].*?[\}|%|#]\}`
    return new RegExp(regexpStr, 'gs')
}

export const parseSqlOutputColumns = (sql:string)=>{
    try {
        const replaceOldSyntax = replaceOldRef(sql)
        const template = nunjucks.compile(replaceOldSyntax, nunjucksEnv)
        let compiledSql = template.render({
            ref: (refName:string)=>{
                return 'tmp__' + refName
            }
        })
        const {columns} = extractColumnsFromSql(compiledSql)
        return {columns}
    } catch (error) {
        const msg = '该节点SQL语法错误:\n' + (error.message || '')
        return {columns:[], err: msg}
    }
}

// 格式化 jinja2sql
export const formatSQL = (sql: string) => {
    try {
        const editorSettingservice = getEditorSettingservice()
        const {tabWidth} = editorSettingservice.getState()
        const jinja2BlockStore = new Map<string, string>()
        let count = 0
        const replaceJinja2Block = sql.replaceAll(getJinja2WrapBlockRegex(), (matchStr)=>{
            const key = `ref_${count}`
            jinja2BlockStore.set(key, matchStr)
            count += 1
            return key
        })
        const formated = format(replaceJinja2Block, {
            tabWidth: tabWidth,
            keywordCase: 'upper'
        })
        let formatedSql = formated
        for(const [k, v] of jinja2BlockStore){
            formatedSql = formatedSql.replace(k, v)
        }
        return formatedSql
    } catch (error) {
        console.error('formatSQL error:', error)
        return sql
    } 
}

// 节点信息
interface NodeInfo {
    nodeConfig: NsGraph.INodeConfig,
    parentSet: Set<string>,
    childrenSet: Set<string>
}

// 画布全局数据
export interface IState {
    nodeMap: Map<string, NodeInfo>
}

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

const refWrap = (name:string)=> `{{ ref('${name}') }}`

export * from './dagGraph'
export * from './sqlTemplate'
export * from './builder'