"use client";

import React, { useCallback, useState, useEffect } from "react";
import { ReactFlow, Background, Controls, useNodesState, useEdgesState, Connection, addEdge } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import CustomNode from "@/components/nodes/CustomNode";
import { ShapeEnum } from "@/components/nodes/Type";
import { ShapeData } from "@/components/nodes/data/ShapeData";
import { MakeBlue, MakeRed } from "@/components/nodes/functions/Colour";
import { motion, AnimatePresence } from "framer-motion";
import EndNode from "@/components/nodes/EndNode";

// Define node types
const nodeTypes = {
  customNode: CustomNode,
};

// Create an ObjectNode instance
const objectNode = new ShapeData(10, 'red', ShapeEnum.CIRCLE);
const redNode = new MakeRed();
const blueNode = new MakeBlue();
const endNode = EndNode;

const initialNodes = [
  {
    id: "1",
    type: "customNode",
    position: { x: 250, y: 5 },
    data: { objectNode },
    draggable: false,
  },
  {
    id: "2",
    type: "customNode",
    position: { x: 100, y: 100 },
    data: { objectNode: blueNode },
  },
  {
    id: "3",
    type: "customNode",
    position: { x: 50, y: 100 },
    data: { objectNode: endNode },
  },
];

const Flow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
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

  return (
    <div style={{ width: "100%", height: "500px", position: "relative" }}>
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

      {/* React Flow Canvas */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default Flow;
