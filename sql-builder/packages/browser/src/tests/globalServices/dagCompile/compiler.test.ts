import {DagNode, DagGraphDataManager} from '@/globalServices/dagCompile/dagGraph'
import {NodeCompiler} from '@/globalServices/dagCompile/compiler'
import {getCteAliasName} from '@/globalServices/dagCompile/common'
import {NodeCompileError} from '@/error'
import {isEqualSql} from '@/globalServices/dagCompile/common'

describe('NodeCompiler', () => {
    describe('compile', () => {
        it('compile source node', () => {
            const pNode = new DagNode('n_1', {refName: 'n_1_ref', nodeType: 'source', label: 'n_1_label'})
            const refBlock = `{{ ref('n_1_label') }}`
            const sql = `select a, b from ${refBlock} ;`
            const cNode = new DagNode('n_2', {refName: 'n_2_ref', nodeType: 'code', label: 'n_2_label', sql: sql})
            pNode.addChild(cNode)
            const graphDataManager = new DagGraphDataManager()
            graphDataManager.addNode(pNode)
            graphDataManager.addNode(cNode)
            const nodeCompiler = new NodeCompiler(cNode.id, graphDataManager);
            const result = nodeCompiler.compile()
            const expectDelBlank = 'select a, b from n_1_ref'
            expect(isEqualSql(result, expectDelBlank)).toEqual(true)
        })

        it('compile code node', () => {
            const pNode = new DagNode('n_1', {refName: 'n_1_ref', nodeType: 'code', label: 'n_1_label'})
            const refBlock = `{{ ref('n_1_label') }}`
            const sql = `select a, b from ${refBlock} ;`
            const cNode = new DagNode('n_2', {refName: 'n_2_ref', nodeType: 'code', label: 'n_2_label', sql: sql})
            pNode.addChild(cNode)
            const graphDataManager = new DagGraphDataManager()
            graphDataManager.addNode(pNode)
            graphDataManager.addNode(cNode)
            const nodeCompiler = new NodeCompiler(cNode.id, graphDataManager);
            const result = nodeCompiler.compile()
            const expectDelBlank = `select a, b from ${getCteAliasName('n_1_label')}`
            expect(isEqualSql(result, expectDelBlank)).toEqual(true)
        })

        it('compile node ref params', () => {
            const pNode = new DagNode('n_1', {refName: 'n_1_ref', nodeType: 'code', label: 'n_1_label'})
            const refBlock = `{{ ref('p_1') }}`
            const sql = `select a, b from tb where ds>${refBlock} ;`
            const cNode = new DagNode('n_2', {refName: 'n_2_ref', nodeType: 'code', label: 'n_2_label', sql: sql})
            pNode.addChild(cNode)
            const graphDataManager = new DagGraphDataManager()
            graphDataManager.addNode(pNode)
            graphDataManager.addNode(cNode)
            graphDataManager.addParam('p_1', '35')

            const nodeCompiler = new NodeCompiler(cNode.id, graphDataManager);
            const result = nodeCompiler.compile()
            const expectDelBlank = `select a, b from tb where ds>35`
            expect(isEqualSql(result, expectDelBlank)).toEqual(true)
        })

        it('compile node ref one more parent node and params', () => {
            const pNode = new DagNode('n_1', {refName: 'n_1_ref', nodeType: 'source', label: 'n_1_label'})
            const pNode2 = new DagNode('n_3', {nodeType: 'code', label: 'n_3_label'})
            const refBlock = `{{ ref('n_1_label') }}`
            const refBlock2 = `{{ ref('n_3_label') }}`
            const sql = `select a, b from ${refBlock} left join ${refBlock2} where ds> {{ref('p_1')}};`
            const cNode = new DagNode('n_2', {refName: 'n_2_ref', nodeType: 'code', label: 'n_2_label', sql: sql})
            pNode.addChild(cNode)
            pNode2.addChild(cNode)
            const graphDataManager = new DagGraphDataManager()
            graphDataManager.addNode(pNode)
            graphDataManager.addNode(pNode2)
            graphDataManager.addNode(cNode)
            graphDataManager.addParam('p_1', '35')
            const nodeCompiler = new NodeCompiler(cNode.id, graphDataManager);
            const result = nodeCompiler.compile()
            const expectDelBlank = `select a, b from n_1_ref left join ${getCteAliasName('n_3_label')} where ds>35`
            expect(isEqualSql(result, expectDelBlank)).toEqual(true)
        })

        it('compile node ref invalid', () => {
            const pNode = new DagNode('n_1', {refName: 'n_1_ref', nodeType: 'source', label: 'n_1_label'})
            const pNode2 = new DagNode('n_3', {nodeType: 'code', label: 'n_3_label'})
            const sql = `select a, b from {{ ref('invalid_ref') }};`
            const cNode = new DagNode('n_2', {refName: 'n_2_ref', nodeType: 'code', label: 'n_2_label', sql: sql})
            pNode.addChild(cNode)
            pNode2.addChild(cNode)
            const graphDataManager = new DagGraphDataManager()
            graphDataManager.addNode(pNode)
            graphDataManager.addNode(pNode2)
            graphDataManager.addNode(cNode)
            const nodeCompiler = new NodeCompiler(cNode.id, graphDataManager);
            expect(()=>{
                const result = nodeCompiler.compile()
            }).toThrowError(NodeCompileError)
        })

        it('compile node when jinja error', () => {
            const pNode = new DagNode('n_1', {refName: 'n_1_ref', nodeType: 'source', label: 'n_1_label'})
            const pNode2 = new DagNode('n_3', {nodeType: 'code', label: 'n_3_label'})
            const sql = `select a, b from {% fds %};`
            const cNode = new DagNode('n_2', {refName: 'n_2_ref', nodeType: 'code', label: 'n_2_label', sql: sql})
            pNode.addChild(cNode)
            pNode2.addChild(cNode)
            const graphDataManager = new DagGraphDataManager()
            graphDataManager.addNode(pNode)
            graphDataManager.addNode(pNode2)
            graphDataManager.addNode(cNode)
            const nodeCompiler = new NodeCompiler(cNode.id, graphDataManager);
            expect(()=>{
                const result = nodeCompiler.compile()
            }).toThrowError(NodeCompileError)
        })

        it('compile node when nodeData.sql is undefined', ()=>{
            const pNode = new DagNode('n_1', {refName: 'n_1_ref', nodeType: 'source', label: 'n_1_label'})
            const pNode2 = new DagNode('n_3', {nodeType: 'code', label: 'n_3_label'})
            const cNode = new DagNode('n_2', {refName: 'n_2_ref', nodeType: 'code', label: 'n_2_label'})
            pNode.addChild(cNode)
            pNode2.addChild(cNode)
            const graphDataManager = new DagGraphDataManager()
            graphDataManager.addNode(pNode)
            graphDataManager.addNode(pNode2)
            graphDataManager.addNode(cNode)
            const nodeCompiler = new NodeCompiler(cNode.id, graphDataManager);
            const result = nodeCompiler.compile()
            expect(isEqualSql(result, '')).toEqual(true)
        })

        it('compile node when nodeData.nodeType is undefined', ()=>{
            const pNode = new DagNode('n_1', {refName: 'n_1_ref', nodeType: 'source', label: 'n_1_label'})
            const pNode2 = new DagNode('n_3', { label: 'n_3_label'})
            const cNode = new DagNode('n_2', {refName: 'n_2_ref', label: 'n_2_label'})
            pNode.addChild(cNode)
            pNode2.addChild(cNode)
            const graphDataManager = new DagGraphDataManager()
            graphDataManager.addNode(pNode)
            graphDataManager.addNode(pNode2)
            graphDataManager.addNode(cNode)
            const nodeCompiler = new NodeCompiler(cNode.id, graphDataManager);
            const result = nodeCompiler.compile()
            expect(isEqualSql(result, '')).toEqual(true)
        })
    })
})