import {SQLTemplate} from './base'
import {refWrap} from '../common'

export class SingleQueryTemplate extends SQLTemplate {
    public generate(options: any): string {
        let columns = ''
        let refBlock = ''
        const parentInfoArray = this.getParentNodeInfo()
        if(parentInfoArray && parentInfoArray.length>0){
            columns = parentInfoArray[0].columns.join(',')
            refBlock = refWrap(parentInfoArray[0].label)
        }
        let template = `
            select 
                ${columns}
            from 
                ${refBlock}
        `
        if(options.groupby){
            template += ` \n group by -----GROUP BY 语句-----`
            template += `\n having -----HAVING 语句-----`
        }
        return template
    }
}

export class SelectTemplate extends SingleQueryTemplate {
    public generate(options: any): string {
        return super.generate({...options, groupby: false})
    }
}

export class GroupByTemplate extends SingleQueryTemplate {
    public generate(options: any): string {
        return super.generate({...options, groupby:true})
    }
}