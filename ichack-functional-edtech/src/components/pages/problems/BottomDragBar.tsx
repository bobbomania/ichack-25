import React from 'react';
import { useDnD } from './DnDContext';

interface NodeListProps {
  nodeNames: string[]; // Accepts a list of strings (node names)
}

const NodeList: React.FC<NodeListProps> = ({ nodeNames }) => {
  const [_, setType] = useDnD();

  const onDragStart = (event: any, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="fixed right-0 top-20 w-72 h-full bg-gradient-to-t from-teal-400 to-teal-300 p-6 rounded-l-3xl shadow-2xl flex flex-col justify-start mb-6">
      {/* Description */}
      <div className="description text-sm text-white mb-4 text-center font-semibold">
        Drag these nodes to the right pane
      </div>

      {/* Node Items */}
      <div className="flex flex-col space-y-4 w-full">
        {nodeNames.map((name) => (
          <div
            key={name} // Use the name as the unique key
            className="dndnode bg-white text-teal-700 rounded-lg p-6 cursor-pointer hover:bg-teal-50 transform transition duration-300 ease-in-out hover:scale-105 shadow-lg hover:shadow-xl w-full"
            onDragStart={(event) => onDragStart(event, name)} // Set type as the name
            draggable
          >
            {name}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default NodeList;
