
export const getCteAliasName = (name:string)=>{
    return 'cte__' + name
}

export const refWrap = (name:string)=> `{{ ref('${name}') }}`

export const processSql = (sql:string)=>{
    const trimmedSql = sql.trim()
    if (trimmedSql.endsWith(';')) {
        return trimmedSql.slice(0, -1)
    } else {
        return trimmedSql;
    }
}

export const isEqualSql = (sqlA:string, sqlB:string)=>{
    return processSql(sqlA.replaceAll(/\s/g, '').toLowerCase()) === processSql(sqlB.replaceAll(/\s/g, '').toLowerCase())
}