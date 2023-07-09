import {DagNode, DagGraphDataManager} from '@/globalServices/dagCompile/dagGraph'
import {NodeSQLBuilder} from '@/globalServices/dagCompile/builder'
import {isEqualSql} from '@/globalServices/dagCompile/common'

describe('NodeSQLBuilder', () => {
    let manager;

    beforeEach(() => {
        manager = new DagGraphDataManager();
    });

    describe('build', ()=>{
        it('common build', ()=>{
            manager.addParam('p_1', 35)
            const nodeA = new DagNode('A', {id: 'A', nodeType: 'source', refName: 'ref_a', label: 'label_A'});
            const nodeB = new DagNode('B', {id: 'B', nodeType: 'code', label: 'label_B', sql: `sql_B`});
            const nodeC = new DagNode('C', {id: 'C', nodeType: 'code', label: 'label_C', sql: `{{ref('label_A')}}, {{ref('label_B')}}`});
            const nodeD = new DagNode('D', {id: 'D', nodeType: 'code', label: 'label_D', sql: `{{ref('label_C')}}, {{ref('p_1')}}`});
            nodeA.addChild(nodeC)
            nodeB.addChild(nodeC)
            nodeC.addChild(nodeD)
            manager.addNode(nodeA)
            manager.addNode(nodeB)
            manager.addNode(nodeC)
            manager.addNode(nodeD)

            const builder = new NodeSQLBuilder(nodeD.id, manager)
            const result = builder.build()
            let expectSql = 'with cte__label_B as (sql_B), cte__label_C as (ref_a, cte__label_B) cte__label_C, 35'
            expect(isEqualSql(result, expectSql)).toEqual(true)
        })

        it('should as code when nodeType miss', ()=>{
            manager.addParam('p_1', 35)
            const nodeA = new DagNode('A', {id: 'A', nodeType: 'source', refName: 'ref_a', label: 'label_A'});
            const nodeB = new DagNode('B', {id: 'B', label: 'label_B', sql: `sql_B`});
            const nodeC = new DagNode('C', {id: 'C', label: 'label_C', sql: `{{ref('label_A')}}, {{ref('label_B')}}`});
            const nodeD = new DagNode('D', {id: 'D', nodeType: 'code', label: 'label_D', sql: `{{ref('label_C')}}, {{ref('p_1')}}`});
            nodeA.addChild(nodeC)
            nodeB.addChild(nodeC)
            nodeC.addChild(nodeD)
            manager.addNode(nodeA)
            manager.addNode(nodeB)
            manager.addNode(nodeC)
            manager.addNode(nodeD)

            const builder = new NodeSQLBuilder(nodeD.id, manager)
            const result = builder.build()
            let expectSql = 'with cte__label_B as (sql_B), cte__label_C as (ref_a, cte__label_B) cte__label_C, 35'
            expect(isEqualSql(result, expectSql)).toEqual(true)
        })
    })
})