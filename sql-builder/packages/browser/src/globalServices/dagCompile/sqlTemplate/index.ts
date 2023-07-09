import {SQLTemplateType} from './common'
import {IParentNodeInfo} from './base'
import {SelectTemplate,GroupByTemplate} from './singleQueryTemplate'
import {JoinTemplate, UnionTemplate} from './multiQueryTemplate'

export const generateSQLTemplate = (type:SQLTemplateType, parentNodeInfo: IParentNodeInfo[])=>{
    switch(type){
        case SQLTemplateType.SELECT:
            return new SelectTemplate(parentNodeInfo).generate({})
        case SQLTemplateType.GROUPBY:
            return new GroupByTemplate(parentNodeInfo).generate({})
        case SQLTemplateType.FULLJOIN:
            return new JoinTemplate(parentNodeInfo).generate({joinKey: 'full join'})
        case SQLTemplateType.INNERJOIN:
            return new JoinTemplate(parentNodeInfo).generate({joinKey: 'inner join'})
        case SQLTemplateType.LEFTJOIN:
            return new JoinTemplate(parentNodeInfo).generate({joinKey: 'left join'})
        case SQLTemplateType.RIGHTJOIN:
            return new JoinTemplate(parentNodeInfo).generate({joinKey: 'right join'})
        case SQLTemplateType.UNION:
            return new UnionTemplate(parentNodeInfo).generate({unionKey: 'union'})
        case SQLTemplateType.UNIONALL:
            return new UnionTemplate(parentNodeInfo).generate({unionKey: 'union all'})
        default:
            return ''
    }
}