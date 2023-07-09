import {SingleQueryTemplate, SelectTemplate, GroupByTemplate} from '@/globalServices/dagCompile/sqlTemplate/singleQueryTemplate'
import {isEqualSql} from '@/globalServices/dagCompile/common'

describe('SingleQueryTemplate', ()=>{
    describe('generate', ()=>{
        it('common generate', ()=>{
            const parentInfoArray = [
                {label: 'p_1', columns: ['c_1', 'c_2', 'c_3']},
                {label: 'p_2', columns: ['c_1', 'c_2', 'c_3']},
            ]
            const ins = new SingleQueryTemplate(parentInfoArray)
            const result = ins.generate({})
            const expectRet = `select c_1, c_2, c_3 from {{ ref('p_1') }}`
            expect(isEqualSql(result, expectRet)).toEqual(true)
        })
        it('generate with group by', ()=>{
            const parentInfoArray = [
                {label: 'p_1', columns: ['c_1', 'c_2', 'c_3']},
                {label: 'p_2', columns: ['c_1', 'c_2', 'c_3']},
            ]
            const ins = new SingleQueryTemplate(parentInfoArray)
            const result = ins.generate({groupby:true})
            const expectRet = `select c_1, c_2, c_3 from {{ ref('p_1') }} group by -----GROUP BY 语句----- having  -----HAVING 语句-----`
            expect(isEqualSql(result, expectRet)).toEqual(true)
        })

        it('generate with no parent', ()=>{
            const parentInfoArray = []
            const ins = new SingleQueryTemplate(parentInfoArray)
            const result = ins.generate({})
            const expectRet = `select  from `
            expect(isEqualSql(result, expectRet)).toEqual(true)
        })
    })
})

describe('SelectTemplate', ()=>{
    describe('generate', ()=>{
        it('common case', ()=>{
            const parentInfoArray = [
                {label: 'p_1', columns: ['c_1', 'c_2', 'c_3']}
            ]
            const ins = new SelectTemplate(parentInfoArray)
            const result = ins.generate({groupby: true})
            const expectRet = `select c_1, c_2, c_3 from {{ ref('p_1') }}`
            expect(isEqualSql(result, expectRet)).toEqual(true)
        })
    })
})

describe('GroupByTemplate', ()=>{
    describe('generate', ()=>{
        it('common case', ()=>{
            const parentInfoArray = [
                {label: 'p_1', columns: ['c_1', 'c_2', 'c_3']}
            ]
            const ins = new GroupByTemplate(parentInfoArray)
            const result = ins.generate({})
            const expectRet = `select c_1, c_2, c_3 from {{ ref('p_1') }} group by -----GROUP BY 语句----- having -----HAVING 语句-----`
            expect(isEqualSql(result, expectRet)).toEqual(true)
        })
    })
})