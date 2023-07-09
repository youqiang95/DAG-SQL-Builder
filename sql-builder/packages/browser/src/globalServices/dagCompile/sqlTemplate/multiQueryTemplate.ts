import {SQLTemplate} from './base'
import {refWrap} from '../common'

export class MultiQueryTemplate extends SQLTemplate {

}

export class JoinTemplate extends MultiQueryTemplate {
    public generate(options: any): string {
        let baseBlock = ''
        const joinKey = options.joinKey || 'inner join'
        const parentInfoArray = this.getParentNodeInfo()
        let columns = [] 
        let joins = []
        if(parentInfoArray && parentInfoArray.length>0){
            parentInfoArray.forEach((item, idx)=>{
                let pColumns = item.columns.map(col=>`${item.label}.${col}`)
                columns = [...columns, ...pColumns]
                if(idx === 0){
                    baseBlock = `${refWrap(item.label)} as ${item.label} \n`
                }
                else {
                    joins.push(`${joinKey} ${refWrap(item.label)} as ${item.label} on -----ON语句-----`)
                }
            })
        }
        let columnsBlock = columns.join(',')
        let joinBlock = joins.join('\n')
        let template = `
            select 
                ${columnsBlock}
            from 
                ${baseBlock}
                ${joinBlock}
        `
        return template
    }
}

export class UnionTemplate extends MultiQueryTemplate {
    public generate(options: any): string {
        const unionKey = options.unionKey || 'union all'
        const parentInfoArray = this.getParentNodeInfo()
        let blocks = []
        if(parentInfoArray && parentInfoArray.length>0){
            parentInfoArray.forEach((item, idx)=>{
                let columns = item.columns.join(',')
                let query = `
                    select 
                        ${columns}
                    from 
                        ${refWrap(item.label)}
                `
                blocks.push(query)
            })
        }
        let template = blocks.join(unionKey + '\n')
        return template
    }
}