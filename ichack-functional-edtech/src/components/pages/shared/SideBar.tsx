"use client";

import Link from "next/link";

interface Problem {
  id: number;
  name: string;
}

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const problems = [
  { id: 1, name: "Problem 1" },
  { id: 2, name: "Problem 2" },
  { id: 3, name: "Problem 3" },
];

export default function SideBar({toggleSidebar }: SidebarProps) {
  return (
    <aside
      className={`bg-white text-gray-800 h-screen fixed top-0 left-0 p-6 transition-all duration-300 ease-in-out overflow-hidden z-40 shadow-xl rounded-r-3xl`}
    >
      {/* Close button */}
      <button
        onClick={toggleSidebar}
        className="text-gray-800 text-3xl absolute top-4 right-4"
      >
        ×
      </button>

      {/* Sidebar Content */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Menu</h2>

        <ul className="space-y-4">
          {problems.length > 0 ? (
            problems.map((problem) => (
              <li key={problem.id}>
                <Link
                  href={`/problem/${problem.id}`}
                  className="block text-lg text-blue-600 hover:text-blue-500 transition duration-300"
                >
                  {problem.name}
                </Link>
              </li>
            ))
          ) : (
            <li className="text-gray-400">No Problems Available</li>
          )}
        </ul>
      </div>
    </aside>
  );
}
