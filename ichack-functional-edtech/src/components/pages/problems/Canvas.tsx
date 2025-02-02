"use client";

import { DnDProvider, useDnD } from './DnDContext';
import BottomDragBar from './BottomDragBar';
import { FuncEnum, ShapeEnum } from '@/components/nodes/Type';
import CustomNode from '@/components/nodes/CustomNode';
import { MakeBlue, MakeGreen, MakePolygon, MakeRed } from '@/components/nodes/functions/Colour';
import { ShapeData } from '@/components/nodes/data/ShapeData';
import React, { useCallback, useState, useEffect, useRef } from "react";
import { ReactFlow, Background, Controls, useNodesState, useEdgesState, Connection, addEdge, useReactFlow, ReactFlowProvider, reconnectEdge, getConnectedEdges } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { AnimatePresence, motion } from 'framer-motion';
import { MultiplyByTwo } from '@/components/nodes/functions/Nats';
import { NatData } from '@/components/nodes/data/NatData';
import DataObject from '@/components/nodes/data/DataObject';
import { ListData } from '@/components/nodes/data/ListData';
import EndNode from '@/components/nodes/EndNode';
import ObjectNode from '@/components/nodes/ObjectNode';
import { FilterCircle, FilterEven, FilterOdd, ListLen, MakePolygons } from '@/components/nodes/functions/Lists';


// Define node types
const nodeTypes = {
  customNode: CustomNode,
};

function createNodesFromObjects(objectNode1: DataObject, objectNode2: ObjectNode): any[] {
  return [
    {
      id: "1",
      type: "customNode",
      position: { x: 150, y: 150}, 
      data: { objectNode: objectNode1 },
      draggable: false, 
    },
    {
      id: "2",
      type: "customNode",
      position: { x: 850, y: 150 },
      data: { objectNode: objectNode2 },
    },
  ];
}


// Define a function that returns different node sets based on the input type
function getStartNodes(num: number) {
  num = Number(num)
  let target: DataObject;
  let start: DataObject;
  switch (num) {
    case 1:
      target = new ShapeData(40, 'blue', ShapeEnum.TRIANGLE);
      start = new ShapeData(40, 'blue', ShapeEnum.TRIANGLE);
      return createNodesFromObjects(start, EndNode(target));

    // change the colour
    case 2:
      start = new ShapeData(40, 'blue', ShapeEnum.TRIANGLE);
      target = new ShapeData(40, 'green', ShapeEnum.TRIANGLE)
      return createNodesFromObjects(start, EndNode(target));

    // make a polygon
    case 3:
      start = new NatData(4);
      target = new ShapeData(40, 'red', ShapeEnum.RECTANGLE);
      return createNodesFromObjects(start, EndNode(target));


    // make polys
    case 4:
      const objectNode2_1 = new NatData(3);
      const objectNode2_2 = new NatData(4);
      const objectNode2_3 = new NatData(0);
      const objectNodeList2 = [objectNode2_1, objectNode2_2, objectNode2_3]
      start = new ListData(objectNodeList2)
      const target_4_1 = new ShapeData(40, 'red', ShapeEnum.TRIANGLE)
      const target_4_2 = new ShapeData(40, 'red', ShapeEnum.RECTANGLE)
      const target_4_3 = new ShapeData(40, 'red', ShapeEnum.CIRCLE)
      const target_4_list = [target_4_1, target_4_2, target_4_3]
      target = new ListData(target_4_list)
    return createNodesFromObjects(start, EndNode(target))

    // get a single circle from a list of numbers
    case 5:
      const objectNode2_1_2 = new NatData(3);
      const objectNode2_1_5 = new NatData(3);

      const objectNode2_2_2 = new NatData(4);
      const objectNode3_2_2 = new NatData(4);
      const objectNode2_3_2 = new NatData(0);
      const objectNodeList2_2 = [objectNode2_1_2 , objectNode2_2_2, objectNode2_1_5, objectNode3_2_2, objectNode2_3_2]
      start = new ListData(objectNodeList2_2)
      target = new ShapeData(40, 'green', ShapeEnum.CIRCLE)
    return createNodesFromObjects(start, EndNode(target))

    // sum list and divide to make poly
    case 6:
      const objectNode_1_2 = new NatData(3);
      const objectNode_1_6 = new NatData(3);
      const objectNode_1_7 = new NatData(3);
      const objectNode_1_8 = new NatData(3);

      const objectNode1_2_3 = new NatData(4);
      const objectNode1_2_4 = new NatData(4);

      const objectNode_2_2 = new NatData(4);
      const objectNode_3_2 = new NatData(0);
      const objectNodeList_2 = [objectNode1_2_3, objectNode1_2_4, objectNode_1_7, objectNode_1_8 , objectNode_1_6, objectNode_3_2, objectNode_1_2, objectNode_2_2]
      start = new ListData(objectNodeList_2)

      target = new ShapeData(40, 'blue', ShapeEnum.TRIANGLE)
      return createNodesFromObjects(start, EndNode(target))
      
  
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
    case FuncEnum.MULTIPLY_2:
      return new MultiplyByTwo();
    case FuncEnum.LIST_LEN:
      return new ListLen();
    case FuncEnum.FILTER_EVEN:
      return new FilterEven();
    case FuncEnum.FILTER_ODD:
      return new FilterOdd();
    case FuncEnum.MAKE_POLY:
      return new MakePolygon();
    case FuncEnum.MAKE_POLYS:
      return new MakePolygons();
    case FuncEnum.FILTER_CIRCLE:
      return new FilterCircle();
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
  const edgeReconnectSuccessful = useRef(true);
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
      const { source, target,  sourceHandle, targetHandle } = params;
      const sourceNode = nodes.find((node) => node.id === source);
      const targetNode = nodes.find((node) => node.id === target);

      if (sourceNode && targetNode && sourceHandle && targetHandle) {
 
        const sourceIndex = parseInt(sourceHandle[sourceHandle.length-1], 10)
        const targetIndex = parseInt(targetHandle[targetHandle.length-1], 10)
        
        if (sourceNode.data.objectNode.getOutputTypes().length > sourceIndex && sourceIndex >= 0) {
          var targetType = sourceNode.data.objectNode.getOutputTypes()[sourceIndex];
          if (targetNode.data.objectNode.canConnectToInput(targetType, targetIndex)) {
            targetNode.data.objectNode.connectInput(sourceNode.data.objectNode, targetIndex)
            
            setEdges((eds) => addEdge(params, eds));
          } else {
            console.log(`${targetNode.position.x} and ${targetNode.position.y}`)
            showError("❌ Cannot connect these nodes!", {
              x: targetNode.position.x,
              y: targetNode.position.y,
            });
        }
        }
      }
    },
    [nodes, setEdges]
  );

  const onReconnectStart = useCallback((b:any, oldEdge: any) => {
    const {_, target, sourceHandle, targetHandle} = oldEdge;
    const targetNode = nodes.find((node) => node.id == target);

    if (targetNode && targetHandle) {
      const targetIndex = parseInt(targetHandle[targetHandle.length-1], 10)
      targetNode.data.objectNode.removeInputAtIndex(targetIndex);
    }

    edgeReconnectSuccessful.current = false;
  }, []);

  const onNodesDelete  = useCallback(( nodes: any) => {
      const connectedEdges = getConnectedEdges(nodes, edges);
      console.log(nodes)
      // Iterate over each deleted node
      nodes.forEach((deletedNode:any) => {
        // Filter for outgoing edges where the deleted node is the source
        const outgoingEdges = connectedEdges.filter(
          (edge: any) => edge.source === deletedNode.id
        );

        // Iterate over each outgoing edge
        outgoingEdges.forEach((edge: any) => {
          const {a, b, c, targetHandle} = edge
          const targetNode = nodes.find((node: any) => node.id == edge.target);
          console.log("DSKJNFDSJK")
          console.log(edge.target)
          console.log(targetHandle)
          console.log(targetNode)
          console.log("DSKJNFDSJK")

          if (targetNode && targetHandle) {
            console.log("IN HERE")
            const targetIndex = parseInt(targetHandle[targetHandle.length-1], 10)
            targetNode.data.objectNode.removeInputAtIndex(targetIndex);
          }
          // Perform your desired logic here
          // For example, you might want to remove or update related data
        });
      });
  }, [nodes, setEdges]);
 
  const onReconnect = useCallback((oldEdge: any, newConnection: any) => {
    onConnect(newConnection)
    // @ts-ignore
    setEdges((eds) => eds.filter((e) => e.id !== newConnection.id));

    edgeReconnectSuccessful.current = true;
    // @ts-ignore
    setEdges((els) => reconnectEdge(oldEdge, newConnection, els));
  }, []);
 
  const onReconnectEnd = useCallback((oldEdge: any, edge: any) => {
    if (!edgeReconnectSuccessful.current) {
      // @ts-ignore
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }
 
    edgeReconnectSuccessful.current = true;
  }, []);

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

      const nodeName = event.dataTransfer.getData('application/reactflow');

      // Create a new node at the drop position
      const newNode = {
        id: getId(), // Use the dynamic ID generator to avoid conflicts
        type: 'customNode', // Make sure the type is correct (it should match one of the types defined in nodeTypes)
        position, // Position of the node from the drop
        data: { objectNode: createNewNode(nodeName) }, // Create a new object node based on the type
      };

      // Update the state with the new node
      setNodes((nds) => nds.concat(newNode)); 
    },
    [screenToFlowPosition, type] // Ensure the dependencies are correct
  );

  return (
    <div className="flex h-screen w-screen">
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
              zIndex: 1000,
            }}
          >
            {error.message}
          </motion.div>
        )}
      </AnimatePresence>
  
      {/* ReactFlow Canvas (Takes full width) */}
      <div className="flex-grow h-full mx-auto max-w-5xl" style={{ transform: 'translateX(-300px)' }}>
        <div className="reactflow-wrapper w-full h-full" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodesDelete={onNodesDelete} // Attach the onNodesDelete callback
            snapToGrid
            onReconnect={onReconnect}
            onReconnectStart={onReconnectStart}
            onReconnectEnd={onReconnectEnd}
            onConnect={onConnect}
            style={{ backgroundColor: "#F7F9FB" }}
            disableKeyboardA11y={true}
          >
            <Controls />
            <Background />
          </ReactFlow>
        </div>
      </div>
      
    </div>
  );
}
  

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

export default Flow;
