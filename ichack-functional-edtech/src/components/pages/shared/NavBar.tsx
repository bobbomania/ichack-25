"use client";

import { useState } from "react";
import Sidebar from "./SideBar"; // Import the Sidebar component
import Link from "next/link";

export default function NavBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative">
      {/* Navbar */}
      <nav className="bg-indigo-700 text-white p-4 flex justify-between items-center fixed top-0 left-0 w-full z-50">
        {/* Hamburger menu for mobile */}
        <button
          onClick={toggleSidebar}
          className="text-white text-3xl"
        >
          ☰
        </button>

        {/* Fun Learning - Link to Home page, now aligned to the right */}
        <div className="text-lg font-bold text-white">
          <Link
            href="/"
            className="hover:text-gray-200 transition duration-300"
          >
            Fun Learning
          </Link>
        </div>
      </nav>

      {/* Conditionally render Sidebar */}
      {isSidebarOpen && (
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      )}
    </div>
  );
}
