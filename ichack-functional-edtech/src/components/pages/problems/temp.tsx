"use client";

import React, { useRef, useCallback } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  useReactFlow,
  Background,
} from '@xyflow/react';
 
import '@xyflow/react/dist/style.css';
import { DnDProvider, useDnD } from './DnDContext';
import BottomDragBar from './BottomDragBar';
import { ShapeData } from '@/components/nodes/ShapeData';
import { ShapeType } from '@/components/nodes/Type';
import CustomNode from '@/components/nodes/CustomNode';
 
// Define node types
const nodeTypes = {
  customNode: CustomNode,
};

const objectNode1 = new ShapeData(10, 'red', ShapeType.CIRCLE)
const objectNode2 = new ShapeData(10, 'red', ShapeType.TRIANGLE)
const initialNodes = [
  {
    id: "1",
    type: "customNode",
    position: { x: 250, y: 5 },
    data: { objectNode1 },
  },
  {
    id: "2",
    type: "customNode",
    position: { x: 100, y: 100 },
    data: { objectNode2 },
  },
];
 
let id = 0;
const getId = () => `dndnode_${id++}`;
 
const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();
  const [type] = useDnD();
 
  const onConnect = useCallback(
    // @ts-ignore
    (params: any) => setEdges((eds: any) => addEdge(params, eds)),
    [],
  );
 
  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);
 
  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();
 
      // check if the dropped element is valid
      if (!type) {
        return;
      }
 
      // project was renamed to screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };
    //   @ts-ignore
      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, type],
  );
 
  return (
    <div className="dndflow">
      <div className="reactflow-wrapper" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          fitView
          style={{ backgroundColor: "#F7F9FB" }}
        >
          <Controls />
          <Background />
        </ReactFlow>
      </div>
      <BottomDragBar />
    </div>
  );
};
 
export default () => (
  <ReactFlowProvider>
    <DnDProvider>
      <DnDFlow />
    </DnDProvider>
  </ReactFlowProvider>
);