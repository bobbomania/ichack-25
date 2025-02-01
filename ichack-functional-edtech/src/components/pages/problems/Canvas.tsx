"use client";

import React from "react";
import { ReactFlow, Background, Controls, useNodesState, useEdgesState } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import CustomNode from "@/components/nodes/CustomNode";
import { ShapeEnum } from "@/components/nodes/Type";
import { ShapeData } from "@/components/nodes/data/ShapeData";
import { MakeRed } from "@/components/nodes/functions/Colour";

// Define node types
const nodeTypes = {
  customNode: CustomNode,
};

// Create an ObjectNode instance
const objectNode = new ShapeData(10, 'red', ShapeEnum.CIRCLE)
const redNode = new MakeRed();
const initialNodes = [
  {
    id: "1",
    type: "customNode",
    position: { x: 250, y: 5 },
    data: { 'objectNode': objectNode },
  },
  {
    id: "2",
    type: "customNode",
    position: { x: 100, y: 100 },
    data: { 'objectNode': redNode },
  },
];

const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

const Flow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default Flow;
