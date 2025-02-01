"use client";

import React from "react";
import { ReactFlow, Background, Controls, useNodesState, useEdgesState } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import CustomNode from "@/components/nodes/CustomNode";
import ObjectNode from "@/components/nodes/ObjectNode";
import Circle from "@/components/nodes/Circle";
import { ShapeType, Type } from "@/components/nodes/Type";
import DataObject from "@/components/nodes/DataObject";
import { ShapeData } from "@/components/nodes/ShapeData";

// Define node types
const nodeTypes = {
  customNode: CustomNode,
};

// Create an ObjectNode instance
const objectNode = new ShapeData(10, 'red', ShapeType.CIRCLE)
const initialNodes = [
  {
    id: "1",
    type: "customNode",
    position: { x: 250, y: 5 },
    data: { objectNode },
  },
  {
    id: "2",
    type: "customNode",
    position: { x: 100, y: 100 },
    data: { objectNode },
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
