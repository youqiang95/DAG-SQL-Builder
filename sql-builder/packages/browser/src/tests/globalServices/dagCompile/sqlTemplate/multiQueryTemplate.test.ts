import {JoinTemplate, UnionTemplate} from '@/globalServices/dagCompile/sqlTemplate/multiQueryTemplate'
import {isEqualSql} from '@/globalServices/dagCompile/common'

describe('JoinTemplate', ()=>{
    describe('generate', ()=>{
        it('generate common', ()=>{
            const parentInfoArray = [
                {label: 'p_1', columns: ['c_1', 'c_2', 'c_3']},
                {label: 'p_2', columns: ['c_1', 'c_2', 'c_3']},
            ]
            const ins = new JoinTemplate(parentInfoArray)
            const result = ins.generate({joinKey: 'left join'})
            const  expectRet = `
                select p_1.c_1, p_1.c_2, p_1.c_3, p_2.c_1, p_2.c_2, p_2.c_3 
                from {{ ref('p_1') }} as p_1 
                    left join {{ ref('p_2') }} as p_2 on -----ON语句-----
                `
            expect(isEqualSql(result, expectRet)).toEqual(true)
        })

        it('generate when parent length>2', ()=>{
            const parentInfoArray = [
                {label: 'p_1', columns: ['c_1', 'c_2', 'c_3']},
                {label: 'p_2', columns: ['c_1', 'c_2', 'c_3']},
                {label: 'p_3', columns: ['c_1', 'c_2']},
            ]
            const ins = new JoinTemplate(parentInfoArray)
            const result = ins.generate({joinKey: 'left join'})
            const  expectRet = `
                select p_1.c_1, p_1.c_2, p_1.c_3, p_2.c_1, p_2.c_2, p_2.c_3, p_3.c_1, p_3.c_2
                from {{ ref('p_1') }} as p_1 
                    left join {{ ref('p_2') }} as p_2 on -----ON语句-----
                    left join {{ ref('p_3') }} as p_3 on -----ON语句-----
                `
            expect(isEqualSql(result, expectRet)).toEqual(true)
        })

        it('generate when parent length=1', ()=>{
            const parentInfoArray = [
                {label: 'p_1', columns: ['c_1', 'c_2', 'c_3']},
            ]
            const ins = new JoinTemplate(parentInfoArray)
            const result = ins.generate({joinKey: 'left join'})
            const  expectRet = `
                select p_1.c_1, p_1.c_2, p_1.c_3
                from {{ ref('p_1') }} as p_1 
                `
            expect(isEqualSql(result, expectRet)).toEqual(true)
        })

        it('generate when parent columns is empty', ()=>{
            const parentInfoArray = [
                {label: 'p_1', columns: []},
                {label: 'p_2', columns: ['c_1', 'c_2', 'c_3']},
            ]
            const ins = new JoinTemplate(parentInfoArray)
            const result = ins.generate({joinKey: 'left join'})
            const  expectRet = `
                select p_2.c_1, p_2.c_2, p_2.c_3
                from {{ ref('p_1') }} as p_1 
                left join {{ ref('p_2') }} as p_2 on -----ON语句-----
                `
            expect(isEqualSql(result, expectRet)).toEqual(true)
        })

        it('generate when parent length=0', ()=>{
            const parentInfoArray = [
            ]
            const ins = new JoinTemplate(parentInfoArray)
            const result = ins.generate({joinKey: 'left join'})
            const  expectRet = `
                select 
                from  
                `
            expect(isEqualSql(result, expectRet)).toEqual(true)
        })

        it('generate when join key is undefined', ()=>{
            const parentInfoArray = [
                {label: 'p_1', columns: ['c_1', 'c_2', 'c_3']},
                {label: 'p_2', columns: ['c_1', 'c_2', 'c_3']},
                {label: 'p_3', columns: ['c_1', 'c_2']},
            ]
            const ins = new JoinTemplate(parentInfoArray)
            const result = ins.generate({})
            const  expectRet = `
                select p_1.c_1, p_1.c_2, p_1.c_3, p_2.c_1, p_2.c_2, p_2.c_3, p_3.c_1, p_3.c_2
                from {{ ref('p_1') }} as p_1 
                    inner join {{ ref('p_2') }} as p_2 on -----ON语句-----
                    inner join {{ ref('p_3') }} as p_3 on -----ON语句-----
                `
            expect(isEqualSql(result, expectRet)).toEqual(true)
        })
    })
})

describe('UnionTemplate', ()=>{
    describe('generate', ()=>{
        it('common case', ()=>{
            const parentInfoArray = [
                {label: 'p_1', columns: ['c_1', 'c_2', 'c_3']},
                {label: 'p_2', columns: ['c_1', 'c_2', 'c_3']},
                {label: 'p_3', columns: ['c_1', 'c_2', 'c_3']},
            ]
            const ins = new UnionTemplate(parentInfoArray)
            const result = ins.generate({unionKey: 'union'})
            const  expectRet = `
                select 
                    c_1,
                    c_2, 
                    c_3
                from 
                    {{ ref('p_1') }}
                
                union 
                
                select 
                    c_1,
                    c_2, 
                    c_3
                from 
                    {{ ref('p_2') }}

                union

                select 
                    c_1,
                    c_2, 
                    c_3
                from 
                    {{ ref('p_3') }}
                `
            expect(isEqualSql(result, expectRet)).toEqual(true)
        })

        it('parent length=1', ()=>{
            const parentInfoArray = [
                {label: 'p_1', columns: ['c_1', 'c_2', 'c_3']}
            ]
            const ins = new UnionTemplate(parentInfoArray)
            const result = ins.generate({unionKey: 'union'})
            const  expectRet = `
                select 
                    c_1,
                    c_2, 
                    c_3
                from 
                    {{ ref('p_1') }}
                `
            expect(isEqualSql(result, expectRet)).toEqual(true)
        })
    })
})