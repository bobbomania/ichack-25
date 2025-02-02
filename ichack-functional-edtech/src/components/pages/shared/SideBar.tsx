import Link from "next/link";

interface Problem {
  id: number;
  name: string;
}

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const problems: Problem[] = [
  { id: 1, name: "Problem 1" },
  { id: 2, name: "Problem 2" },
  { id: 3, name: "Problem 3" },
  { id: 4, name: "Problem 4" },
  { id: 5, name: "Problem 5" },
  { id: 6, name: "Problem 6" },
];

export default function SideBar({ isSidebarOpen, toggleSidebar }: SidebarProps) {
  return (
    <aside
      className={`bg-white text-gray-800 h-screen fixed top-0 left-0 p-6 transition-transform duration-300 ease-in-out z-40 shadow-xl rounded-r-3xl transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Close button */}
      <button
        onClick={toggleSidebar} // Call the toggleSidebar function when clicked
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
                <div className="relative group w-full">
                  <Link
                    href={`/problem/${problem.id}`}
                    className="block text-lg text-blue-600 transition duration-300 transform group-hover:scale-105 group-hover:rotate-3 group-active:rotate-1 group-active:scale-100 p-4 bg-white rounded-lg shadow-md hover:shadow-lg"
                  >
                    {problem.name}
                  </Link>
                </div>
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
