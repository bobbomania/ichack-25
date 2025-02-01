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
    data: { 'objectNode':objectNode1 },
  },
  {
    id: "2",
    type: "customNode",
    position: { x: 100, y: 100 },
    data: { 'objectNode': objectNode2 },
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
      
      // Get the drop position
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
  
      console.log("Drop Position:", position);
  
      // Create a new node at the drop position
      const newNode = {
        id: getId(), // Use the dynamic ID generator to avoid conflicts
        type: 'customNode', // Make sure the type is correct (it should match one of the types defined in nodeTypes)
        position, // Position of the node from the drop
        data: { label: `${type} node`, objectNode: objectNode1 }, // Make sure objectNode1 is defined and correct
      };
  
      console.log("New Node:", newNode);
  
      // Update the state with the new node
      setNodes((nds) => nds.concat(newNode));
      console.log("Nodes after drop:", nodes);
    },
    [screenToFlowPosition, type, objectNode1] // Ensure the dependencies are correct
  );
  
 
  return (
    <div className="flex h-screen">
      {/* Left Panel (DnDFlow) */}
      <div className="flex-grow">
        <div className="reactflow-wrapper w-full h-full" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
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
      </div>
      
      {/* Right Panel (for BottomDragBar) */}
      <div className="w-64 bg-gray-200 p-4 h-screen">
        <BottomDragBar />
      </div>
    </div>
  );
};
 
const Flow = () => (
  <ReactFlowProvider>
    <DnDProvider>
      <DnDFlow />
    </DnDProvider>
  </ReactFlowProvider>
);

export default Flow;
