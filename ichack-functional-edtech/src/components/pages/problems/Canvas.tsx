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
import { FuncEnum, ShapeEnum } from '@/components/nodes/Type';
import CustomNode from '@/components/nodes/CustomNode';
import { MakeBlue, MakeGreen, MakeRed } from '@/components/nodes/functions/Colour';
import { ShapeData } from '@/components/nodes/data/ShapeData';

// Define node types
const nodeTypes = {
  customNode: CustomNode,
};


function createNodesFromObjects(objectNode1: ShapeData, objectNode2: ShapeData): any[] {
  return [
    {
      id: "1",
      type: "customNode",
      position: { x: 250, y: 5 },
      data: { objectNode: objectNode1 },
    },
    {
      id: "2",
      type: "customNode",
      position: { x: 100, y: 100 },
      data: { objectNode: objectNode2 },
    },
  ];
}


// Define a function that returns different node sets based on the input type
function getStartNodes(num: number) {
  console.log(num);
  num = Number(num)
  switch (num) {
    case 1:
      const objectNode1 = new ShapeData(10, 'red', ShapeEnum.CIRCLE);
      const objectNode2 = new ShapeData(10, 'green', ShapeEnum.TRIANGLE);
      console.log("here")
      return createNodesFromObjects(objectNode1, objectNode2);

    case 2:
      const objectNode3 = new ShapeData(10, 'red', ShapeEnum.CIRCLE);
      const objectNode4 = new ShapeData(10, 'blue', ShapeEnum.TRIANGLE);
      return createNodesFromObjects(objectNode3, objectNode4);

    case 3:
      const objectNode5 = new ShapeData(10, 'green', ShapeEnum.RECTANGLE);
      const objectNode6 = new ShapeData(10, 'blue', ShapeEnum.TRIANGLE);
      return createNodesFromObjects(objectNode5, objectNode6);

    default:
      throw new Error(`no start '${num}' config that is recognised`);
      
  }
}

// Utility function to create new nodes based on type
function createNewNode(name: string) {
  switch (name) {
    case FuncEnum.MAKE_RED:
      return new MakeRed();
    case FuncEnum.MAKE_GREEN:
      return new MakeGreen();
    case FuncEnum.MAKE_BLUE:
      return new MakeBlue();
    default:
      throw new Error(`NotImplementedError: The node "${name}" is not supported.`);
  }
}

let id = 0;
const getId = () => `dndnode_${id++}`;

// Define DnDFlow component which accepts `initialNodes` as a prop
interface DnDFlowProps {
  initialNodes: { id: string, type: string, position: { x: number, y: number }, data: any }[];
}

const DnDFlow = ({ initialNodes }: DnDFlowProps) => {
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
      const nodeName = event.dataTransfer.getData('application/reactflow');
      console.log('Dropped Node Name:', nodeName);

      // Create a new node at the drop position
      const newNode = {
        id: getId(), // Use the dynamic ID generator to avoid conflicts
        type: 'customNode', // Make sure the type is correct (it should match one of the types defined in nodeTypes)
        position, // Position of the node from the drop
        data: { objectNode: createNewNode(nodeName) }, // Create a new object node based on the type
      };

      console.log("New Node:", newNode);

      // Update the state with the new node
      setNodes((nds) => nds.concat(newNode)); 
      console.log("Nodes after drop:", nodes);
    },
    [screenToFlowPosition, type] // Ensure the dependencies are correct
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
        <BottomDragBar nodeNames={["make red", "make green", "make blue"]}/>
      </div>
    </div>
  );
};

// Now Flow accepts initialNodes as a prop.
const Flow = ({ number }: { number: number }) => (
  <div className="flow-container">
  <ReactFlowProvider>
    <DnDProvider>
      <DnDFlow initialNodes={getStartNodes(number)} />
    </DnDProvider>
  </ReactFlowProvider>
  </div>
);

// Example usage with initialNodes:

export default Flow;
