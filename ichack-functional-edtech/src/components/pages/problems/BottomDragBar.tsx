"use client";

import React, { useState } from "react";
import { useDnD } from "./DnDContext";
import { FuncEnum } from "@/components/nodes/Type";
import { ChevronDown, ChevronRight, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion"; // For smooth animations

const shapeFuncs = [FuncEnum.MAKE_RED, FuncEnum.MAKE_GREEN, FuncEnum.MAKE_BLUE];
const natFuncs = [FuncEnum.MULTIPLY_2, FuncEnum.MAKE_POLY];
const listFuncs = [FuncEnum.LIST_LEN, FuncEnum.FILTER_EVEN, FuncEnum.FILTER_ODD, FuncEnum.MAKE_POLYS];

const NodeList = () => {
  const [_, setType] = useDnD();
  const [isOpen, setIsOpen] = useState(true); // Sidebar open state
  const [expanded, setExpanded] = useState({
    shape: true,
    nat: true,
    str: true,
  });

  // Toggle dropdowns
  const toggleDropdown = (category: string) => {
    setExpanded((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  // Handle drag start
  const onDragStart = (event: any, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="fixed right-0 top-16 flex h-[90vh]">
      {/* Sidebar */}
      <motion.aside
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: isOpen ? "24rem" : "0", opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`bg-white/30 backdrop-blur-xl p-8 rounded-l-2xl shadow-2xl flex flex-col space-y-6 border border-white/20 overflow-hidden ${
          isOpen ? "w-96" : "w-0"
        }`}
      >
        {/* Description */}
        <div className="text-lg text-black text-center font-semibold tracking-wide">
          Drag these nodes to the right pane
        </div>

        {/* Function Sections */}
        {/* Function Sections */}
<div className="overflow-y-auto max-h-[80vh]">
  {[
    { title: "Shape Functions", key: "shape", funcs: shapeFuncs },
    { title: "Number Functions", key: "nat", funcs: natFuncs },
    { title: "List Functions", key: "str", funcs: listFuncs },
  ].map(({ title, key, funcs }) => (
    <div key={key} className="w-full">
      {/* Section Header */}
      <motion.button
        onClick={() => toggleDropdown(key)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        className="w-full flex items-center justify-between bg-white/50 backdrop-blur-md text-teal-900 rounded-xl p-4 cursor-pointer hover:bg-white/70 transition duration-300 ease-in-out shadow-lg border border-white/20 text-lg"
      >
        {title}
        {expanded[key] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
      </motion.button>

      {/* Expandable List with Smooth Animation */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: expanded[key] ? "auto" : 0, opacity: expanded[key] ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden mt-3"
      >
        {funcs.map((func) => (
          <motion.div
            key={func}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="dndnode bg-white/60 text-teal-900 rounded-xl p-4 cursor-pointer hover:bg-white/80 transform transition duration-300 ease-in-out shadow-md hover:shadow-xl w-full border border-white/20 text-lg"
            onDragStart={(event) => onDragStart(event, func)}
            draggable
          >
            {func}
          </motion.div>
        ))}
      </motion.div>
    </div>
  ))}
</div>

      </motion.aside>

      {/* Toggle Button (Permanent & Changes Icon) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white/20 backdrop-blur-md text-black p-4 rounded-l-2xl shadow-lg border border-white/30 hover:bg-white/40 transition duration-300 ease-in-out flex items-center justify-center"
      >
        {isOpen ? <ChevronRight size={28} /> : <ChevronLeft size={28} />}
      </button>
    </div>
  );
};

export default NodeList;
