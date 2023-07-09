import {NodeRenderConfigFactoy} from '@/globalServices/dagCompile/render'
import {DagNode, DagGraphDataManager} from '@/globalServices/dagCompile/dagGraph'

describe('NodeRenderConfigFactoy', () => {
    let factory: NodeRenderConfigFactoy;

    beforeEach(() => {
        factory = new NodeRenderConfigFactoy();
    })

    describe('getNodeRenderConfig', () => {        
        it('should return correct config when ref is a parent node label', () => {
            const pNode = new DagNode('n_1', {refName: 'n_1_ref', nodeType: 'source', label: 'n_1_label'})
            const cNode = new DagNode('n_2', {refName: 'n_2_ref', nodeType: 'code', label: 'n_2_label'})
            pNode.addChild(cNode)
            const graphDataManager = new DagGraphDataManager()
            graphDataManager.addNode(pNode)
            graphDataManager.addNode(cNode)
            graphDataManager.addParam('p_1', 'v_1')

            const config = factory.getNodeRenderConfig(cNode, graphDataManager);
            const result = config.ref('n_1_label');
            expect(result).toEqual(pNode.data.refName);
        });
        
        it('should return correct config when ref is a parameter', () => {
            const pNode = new DagNode('n_1', {refName: 'n_1_ref', nodeType: 'source', label: 'n_1_label'})
            const cNode = new DagNode('n_2', {refName: 'n_2_ref', nodeType: 'code', label: 'n_2_label'})
            pNode.addChild(cNode)
            const graphDataManager = new DagGraphDataManager()
            graphDataManager.addNode(pNode)
            graphDataManager.addNode(cNode)
            graphDataManager.addParam('p_1', 'v_1')

            const config = factory.getNodeRenderConfig(cNode, graphDataManager);
            const result = config.ref('p_1');
            expect(result).toEqual('v_1');
        });
        
        it('should throw error when ref is invalid', () => {
            const pNode = new DagNode('n_1', {refName: 'n_1_ref', nodeType: 'source', label: 'n_1_label'})
            const cNode = new DagNode('n_2', {refName: 'n_2_ref', nodeType: 'code', label: 'n_2_label'})
            pNode.addChild(cNode)
            const graphDataManager = new DagGraphDataManager()
            graphDataManager.addNode(pNode)
            graphDataManager.addNode(cNode)
            graphDataManager.addParam('p_1', 'v_1')

            const config = factory.getNodeRenderConfig(cNode, graphDataManager);   
            const invalidRef = 'invalid'   
            expect(() => {
                config.ref(invalidRef);
            }).toThrow('错误的引用: ' + invalidRef);
        });
    })
})