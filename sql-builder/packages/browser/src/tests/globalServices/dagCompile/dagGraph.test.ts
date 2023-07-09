import {DagNode, XflowGraphDataManager, DagGraphDataManager} from '../../../globalServices/dagCompile/dagGraph'


describe('DagNode', () => {
    let node: DagNode<{ name: string }>;
  
    beforeEach(() => {
      node = new DagNode('node-1', { name: 'Node 1' });
    });
  
    test('should add child node correctly', () => {
      const childNode = new DagNode('node-2', { name: 'Node 2' });
      node.addChild(childNode);
      expect(node.childrenIdSet.size).toBe(1);
      expect(node.childrenIdSet.has('node-2')).toBe(true);
      expect(childNode.parentIdSet.size).toBe(1);
      expect(childNode.parentIdSet.has('node-1')).toBe(true);
    });
  
    test('should remove child node correctly', () => {
      const childNode = new DagNode('node-2', { name: 'Node 2' });
      node.addChild(childNode);
      node.removeChild(childNode);
      expect(node.childrenIdSet.size).toBe(0);
      expect(node.childrenIdSet.has('node-2')).toBe(false);
      expect(childNode.parentIdSet.size).toBe(0);
      expect(childNode.parentIdSet.has('node-1')).toBe(false);
    });
});


describe('XflowGraphDataManager', () => {
  describe('setStateFromXflowGraphData', () => {
    it('should add nodes and edges correctly', () => {
      const graphData = {
        nodes: [
          { id: 'node1', label: 'Node 1' },
          { id: 'node2', label: 'Node 2' },
          { id: 'node3', label: 'Node 3' }
        ],
        edges: [
          { source: 'node1', target: 'node2' },
          { source: 'node1', target: 'node3' },
        ]
      };

      const dataManager = new XflowGraphDataManager();
      dataManager.setStateFromXflowGraphData(graphData);

      const nodes = dataManager.getNodes()

      // Check that edges were added correctly
      const node1 = dataManager.getNode('node1');
      const node2 = dataManager.getNode('node2');
      const node3 = dataManager.getNode('node3');
      expect(node1.childrenIdSet.size).toBe(2);
      expect(node1.childrenIdSet.has(node2.id)).toBe(true);
      expect(node1.childrenIdSet.has(node3.id)).toBe(true);
      expect(node2.childrenIdSet.size).toBe(0);
      expect(node2.childrenIdSet.has(node3.id)).toBe(false);
      expect(node3.parentIdSet.size).toBe(1);
      expect(node3.parentIdSet.has(node1.id)).toBe(true);
    });
  });
  describe('getNodeSortParentArray', ()=>{
    it('common case', ()=>{
      const graphData = {
        nodes: [
          { id: 'node1', label: 'Node 1', x:5 },
          { id: 'node2', label: 'Node 2', x:3 },
          { id: 'node3', label: 'Node 3' }
        ],
        edges: [
          { source: 'node1', target: 'node3' },
          { source: 'node2', target: 'node3' },
        ]
      };

      const dataManager = new XflowGraphDataManager();
      dataManager.setStateFromXflowGraphData(graphData)
      const result = dataManager.getNodeSortParentArray('node3').map(item=>item.id)
      expect(result).toEqual(['node2', 'node1'])
    })
  })
});

describe('DagGraphDataManager', () => {
  let manager;

  beforeEach(() => {
    manager = new DagGraphDataManager();
  });

  describe('addNode', () => {
    it('should add a node to the node map', () => {
      const node = { id: 'node1' };
      manager.addNode(node);
      expect(manager.getNode('node1')).toEqual(node);
    });
  });

  describe('getNode', () => {
    it('should return the node with the specified ID', () => {
      const node1 = { id: 'node1' };
      const node2 = { id: 'node2' };
      manager.addNode(node1);
      manager.addNode(node2);
      expect(manager.getNode('node1')).toEqual(node1);
      expect(manager.getNode('node2')).toEqual(node2);
    });

    it('should return undefined if the node is not found', () => {
      expect(manager.getNode('node1')).toBeUndefined();
    });
  });

  describe('getNodes', () => {
    it('should return an iterable of all nodes in the node map', () => {
      const node1 = { id: 'node1' };
      const node2 = { id: 'node2' };
      manager.addNode(node1);
      manager.addNode(node2);
      const nodes = manager.getNodes();
      expect(nodes.next()).toEqual({ done: false, value: node1 });
      expect(nodes.next()).toEqual({ done: false, value: node2 });
      expect(nodes.next()).toEqual({ done: true, value: undefined });
    });
  });

  describe('addParam', () => {
    it('should add a parameter to the parameter map', () => {
      manager.addParam('param1', 'value1');
      expect(manager.getParam('param1')).toEqual('value1');
    });
  });

  describe('removeParam', () => {
    it('should remove a parameter from the parameter map', () => {
      manager.addParam('param1', 'value1');
      manager.removeParam('param1');
      expect(manager.getParam('param1')).toBeUndefined();
    });
  });

  describe('getParam', () => {
    it('should return the value of the parameter with the specified key', () => {
      manager.addParam('param1', 'value1');
      expect(manager.getParam('param1')).toEqual('value1');
    });

    it('should return undefined if the parameter is not found', () => {
      expect(manager.getParam('param1')).toBeUndefined();
    });
  });

  describe('getAllDependNodes', () => {
    it('returns all dependent nodes of a given node', () => {
      const nodeA = new DagNode('A', {id: 'A'});
      const nodeB = new DagNode('B', {id: 'B'});
      const nodeC = new DagNode('C', {id: 'C'});
      const nodeD = new DagNode('D', {id: 'D'});
      nodeA.addChild(nodeB)
      nodeA.addChild(nodeC)
      nodeB.addChild(nodeD)
      nodeC.addChild(nodeD)
      manager.addNode(nodeA)
      manager.addNode(nodeB)
      manager.addNode(nodeC)
      manager.addNode(nodeD)
      
      const result = manager.getAllDependNodes(nodeD.id)
      const expectResult = [nodeA, nodeB, nodeC]
      const expectResult2 = [nodeA, nodeC, nodeB]

      expect(result.length).toEqual(3)

      const assertResult = result.every((value, index)=> value===expectResult[index]) || result.every((value, index)=> value===expectResult2[index])
      expect(assertResult).toEqual(true)
    });

    it('should throw Error when hasCycle', () => {
      const nodeA = new DagNode('A', {id: 'A'});
      const nodeB = new DagNode('B', {id: 'B'});
      const nodeC = new DagNode('C', {id: 'C'});
      const nodeD = new DagNode('D', {id: 'D'});
      const nodeE = new DagNode('E', {id: 'E'});
      nodeA.addChild(nodeB)
      nodeA.addChild(nodeC)
      nodeB.addChild(nodeD)
      nodeD.addChild(nodeE)
      nodeE.addChild(nodeB)

      manager.addNode(nodeA)
      manager.addNode(nodeB)
      manager.addNode(nodeC)
      manager.addNode(nodeD)
      manager.addNode(nodeE)

      expect(()=>{
        manager.getAllDependNodes('C')
      }).toThrowError()
    });

    it('should return undefined if the parameter is not found', () => {
      expect(manager.getParam('param1')).toBeUndefined();
    });
  });


  describe('hasCycle', () => {
    it('returns hasCycle', () => {
      const nodeA = new DagNode('A', {id: 'A'});
      const nodeB = new DagNode('B', {id: 'B'});
      const nodeC = new DagNode('C', {id: 'C'});
      const nodeD = new DagNode('D', {id: 'D'});
      const nodeE = new DagNode('E', {id: 'E'});
      nodeA.addChild(nodeB)
      nodeA.addChild(nodeC)
      nodeB.addChild(nodeD)
      nodeD.addChild(nodeE)
      nodeE.addChild(nodeB)

      manager.addNode(nodeA)
      manager.addNode(nodeB)
      manager.addNode(nodeC)
      manager.addNode(nodeD)
      manager.addNode(nodeE)
      
      const result = manager.hasCycle()

      expect(result).toEqual(true)
    });
  });
});