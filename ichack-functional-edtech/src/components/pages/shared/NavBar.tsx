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

        {/* Link to Home page, centered */}
        <div className="flex-grow text-center">
          <Link
            href="/"
            className="text-white text-lg hover:text-gray-200 transition duration-300"
          >
            Home
          </Link>
        </div>

        {/* Logo or Title on the far right */}
        <div className="text-2xl font-semibold ml-4">
          Fun Learning
        </div>
      </nav>

      <div className="mt-16">
        {/* Content below navbar */}
      </div>

      {/* Conditionally render Sidebar */}
      {isSidebarOpen && (
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      )}
    </div>
  );
}
