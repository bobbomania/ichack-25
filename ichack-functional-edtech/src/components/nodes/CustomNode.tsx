import React, { memo } from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import ObjectNode from "./ObjectNode";

const CustomNode: React.FC<NodeProps> = ({ data }) => {
    // @ts-ignore
  const objectNode: ObjectNode = data.objectNode; // ObjectNode instance

  return (
    <div className="p-4 bg-white border rounded shadow-md">
      {/* Render the ObjectNode component */}
      {objectNode.render()}

      {/* Input Handles */}
      {objectNode.getInputTypes().map((_, i) => {
        return (
        <Handle
          key={`input-${i}`}
          type="target"
          position={Position.Left}
          id={`input-${i}`}
          isConnectable={true}
        />
      )})}

      {/* Output Handles */}
      {objectNode.getOutputTypes().map((_, i) => (
        <Handle
          key={`output-${i}`}
          type="source"
          position={Position.Right}
          id={`output-${i}`}
          isConnectable={true}
        />
      ))}
    </div>
  );
};

export default memo(CustomNode);
