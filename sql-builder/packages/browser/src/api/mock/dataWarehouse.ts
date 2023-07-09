import {encryptString} from '@/common'

const fetchResultDelay = (result:any, delay=5000)=>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(result)
            console.log('mock fetch result:', result)
        }, delay)       
    })
}

const mysqlConfig = {
    sourceType: 'mysql',
    config: {
        host: 'test.com',
        user: 'test_user',
        database: 'db',
        port: 3306,
        password: encryptString('passwd')
    }
}

const postgresqlConfig = {
    sourceType: 'postgresql',
    config: {
        host: 'test.com',
        user: 'test_user',
        database: 'db',
        password: 5432,
        passwd: encryptString('passwd')
    }
}

const mockConfig = mysqlConfig

export const get_data_warehouse_config = ()=>{
    return fetchResultDelay({
        result: {
            err: null,
            sourceType: mysqlConfig.sourceType,
            config: mockConfig.config
        }
    })
} 

export const fetchTableListNoSchema = ()=>{
    return fetchResultDelay({
        result: [
            {
                name: 'table_1',
                is_view: false,
                ref_name: '`db.table_1`',
                columns: [
                    {name: 'col_1', type: 'string', is_partition: false},
                    {name: 'col_2', type: 'string', is_partition: true},
                ]
            },
            {
                name: 'table_2',
                is_view: false,
                ref_name: '`db.table_2`',
                columns: [
                    {name: 'col_1', type: 'string', is_partition: false},
                    {name: 'col_2', type: 'string', is_partition: true},
                ]
            }
        ]
    })
}

export const fetchTableListWithSchema = ()=>{
    let result = [
        {
            name: 'schema_1',
            children: [
                {
                    name: 'table_1',
                    is_view: false,
                    ref_name: '`schema_1.table_1`',
                    columns: [
                        {name: 'col_1', type: 'string', is_partition: false},
                        {name: 'col_2', type: 'string', is_partition: true},
                    ]
                },
                {
                    name: 'table_2',
                    is_view: false,
                    ref_name: '`schema_1.table_2`',
                    columns: [
                        {name: 'col_1', type: 'string', is_partition: false},
                        {name: 'col_2', type: 'string', is_partition: true},
                    ]
                }
            ]
        },
        {
            name: 'schema_2',
            children: [
                {
                    name: 'table_1',
                    is_view: false,
                    ref_name: '`schema_2.table_1`',
                    columns: [
                        {name: 'col_1', type: 'string', is_partition: false},
                        {name: 'col_2', type: 'string', is_partition: true},
                    ]
                },
                {
                    name: 'table_2',
                    is_view: false,
                    ref_name: '`schema_2.table_2`',
                    columns: [
                        {name: 'col_1', type: 'string', is_partition: false},
                        {name: 'col_2', type: 'string', is_partition: true},
                    ]
                }
            ]
        }
    ]
    for(let i=0; i<200; i++){
        result[0].children.push({
            name: 'table_@' + i,
            is_view: false,
            ref_name: '`schema_1.table_1`',
            columns: [
                {name: 'col_1', type: 'string', is_partition: false},
                {name: 'col_2', type: 'string', is_partition: true},
            ]
        })
    }
    return fetchResultDelay({
        result
    })
}

export const validate_sql = ()=>{
    return fetchResultDelay({
        result: {
            validate_result: 'fail',
            message: 'mock test error'
        }
    })
}

export const is_data_warehouse_connectable = ()=>{
    return fetchResultDelay({
        result: 'success'
    })
}

export const onUpdateDataWarehouseConfig = ()=>{
    return fetchResultDelay({})
}
