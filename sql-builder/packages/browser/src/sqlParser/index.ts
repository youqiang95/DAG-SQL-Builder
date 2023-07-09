import {extractColumnsFromSql as extractColumnsFromSqlHive} from './hive'
export const extractColumnsFromSql = (sql:string)=>{
    return extractColumnsFromSqlHive(sql)
}