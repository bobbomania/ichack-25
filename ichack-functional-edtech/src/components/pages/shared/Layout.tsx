import React from 'react';
import { ReactNode } from 'react';
import NavBar from './NavBar';

interface LayoutProps {
  children: ReactNode; // This will be the content of each page
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex w-screen">
      <NavBar />
      {/* Main Content Area */}
      <div className="flex-grow w-screen">
        {children}
      </div>
    </div>
  );
};

export default Layout;
