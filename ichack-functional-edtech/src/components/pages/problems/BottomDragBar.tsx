import React from 'react';
import { useDnD } from './DnDContext';
 
export default () => {
  const [_, setType] = useDnD();
 
  const onDragStart = (event: any, nodeType: any) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };
 
  return (
    <aside className="w-64 bg-gray-200 p-4 h-screen overflow-y-auto">
  <div className="description text-sm text-gray-700 mb-4">
    You can drag these nodes to the pane on the right.
  </div>

  <div
    className="dndnode bg-blue-500 text-white rounded p-2 mb-3 cursor-pointer hover:bg-blue-400"
    onDragStart={(event) => onDragStart(event, 'input')}
    draggable
  >
    Input Node
  </div>

  <div
    className="dndnode bg-green-500 text-white rounded p-2 mb-3 cursor-pointer hover:bg-green-400"
    onDragStart={(event) => onDragStart(event, 'default')}
    draggable
  >
    Default Node
  </div>

  <div
    className="dndnode bg-red-500 text-white rounded p-2 mb-3 cursor-pointer hover:bg-red-400"
    onDragStart={(event) => onDragStart(event, 'output')}
    draggable
  >
    Output Node
  </div>
</aside>

  );
};