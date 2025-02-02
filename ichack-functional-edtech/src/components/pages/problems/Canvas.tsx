"use client";

import { DnDProvider, useDnD } from './DnDContext';
import BottomDragBar from './BottomDragBar';
import { FuncEnum, ShapeEnum } from '@/components/nodes/Type';
import CustomNode from '@/components/nodes/CustomNode';
import { MakeBlue, MakeGreen, MakeRed } from '@/components/nodes/functions/Colour';
import { ShapeData } from '@/components/nodes/data/ShapeData';
import React, { useCallback, useState, useEffect, useRef } from "react";
import { ReactFlow, Background, Controls, useNodesState, useEdgesState, Connection, addEdge, useReactFlow, ReactFlowProvider } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { AnimatePresence, motion } from 'framer-motion';


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

  const [error, setError] = useState<{ message: string; position: { x: number; y: number } } | null>(null);

  const showError = (message: string, position: { x: number; y: number }) => {
    setError({ message, position });

    // Hide error after 1 second with fade-out and upward motion effect
    setTimeout(() => {
      setError(null);
    }, 1000);
  };

  const onConnect = useCallback(
    (params: Connection) => {
      const { source, target } = params;
      const sourceNode = nodes.find((node) => node.id === source);
      const targetNode = nodes.find((node) => node.id === target);

      if (sourceNode && targetNode) {
        var targetTypes = sourceNode.data.objectNode.getOutputTypes();
        var typeConnected = targetNode.data.objectNode.canConnectToInput(targetTypes);

        if (typeConnected != null) {
          targetNode.data.objectNode.connectInput(typeConnected, sourceNode.data.objectNode);
          setEdges((eds) => addEdge(params, eds));
        } else {
          console.log(`${targetNode.position.x} and ${targetNode.position.y}`)
          showError("❌ Cannot connect these nodes!", {
            x: targetNode.position.x,
            y: targetNode.position.y,
          });
        }
      }
    },
    [nodes, setEdges]
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
    <div className="flex h-screen" style={{position:"relative"}}>
        {/* 🔴 Error Popup */}
        <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{
              position: "absolute",
              left: error.position.x,
              top: error.position.y,
              backgroundColor: "rgba(255, 0, 0, 0.8)",
              color: "white",
              padding: "8px 12px",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: "bold",
              backdropFilter: "blur(8px)",
            }}
          >
            {error.message}
          </motion.div>
        )}
      </AnimatePresence>
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
  )};

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
