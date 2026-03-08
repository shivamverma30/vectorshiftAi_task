// ui.js
// Main ReactFlow canvas. Handles drag-drop from toolbar,
// node registration, and canvas config.

import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

import { InputNode }  from './nodes/inputNode';
import { LLMNode }    from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode }   from './nodes/textNode';
import { NoteNode }   from './nodes/noteNode';
import { APINode }    from './nodes/apiNode';
import { FilterNode } from './nodes/filterNode';
import { MathNode }   from './nodes/mathNode';
import { TimerNode }  from './nodes/timerNode';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };

const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  note: NoteNode,
  api: APINode,
  filter: FilterNode,
  math: MathNode,
  timer: TimerNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const { nodes, edges, getNodeID, addNode, onNodesChange, onEdgesChange, onConnect } =
    useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => ({ id: nodeID, nodeType: type });

  const onDrop = useCallback((event) => {
    event.preventDefault();
    const bounds = reactFlowWrapper.current.getBoundingClientRect();
    if (!event?.dataTransfer?.getData('application/reactflow')) return;
    const { nodeType: type } = JSON.parse(event.dataTransfer.getData('application/reactflow'));
    if (!type) return;
    const position = reactFlowInstance.project({
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
    });
    const nodeID = getNodeID(type);
    addNode({ id: nodeID, type, position, data: getInitNodeData(nodeID, type) });
  }, [reactFlowInstance]);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div ref={reactFlowWrapper} style={{ height: '100%', width: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        connectionLineType="smoothstep"
        fitView
        style={{ background: '#0e1117' }}
      >
        <Background color="#1e2840" gap={24} variant="dots" size={1.2} />
        <Controls style={{ bottom: 20, left: 20 }} />
        <MiniMap
          nodeColor={() => '#1c2333'}
          maskColor="rgba(10,13,22,0.7)"
          style={{ bottom: 20, right: 20, borderRadius: '10px' }}
        />
      </ReactFlow>
    </div>
  );
};
