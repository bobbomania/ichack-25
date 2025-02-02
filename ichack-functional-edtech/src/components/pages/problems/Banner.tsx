// components/Banner.tsx
import React, { ReactNode } from 'react';

export interface BannerProps {
  description: string;
  title: string;
  smallBoxComponent: ReactNode;
}

const Banner = ({ description, title, smallBoxComponent }: BannerProps) => {
  return (
    <div className="flex items-center justify-between bg-gray-100 opacity-100 p-4 rounded-lg shadow-md">
      {/* Left Section: Title & Description */}
      <div>
        <h2 className="text-lg opacity-100 font-semibold text-gray-900">{title}</h2>
        <p className="text-sm opacity-100 text-gray-600">{description}</p>
      </div>
  
      {/* Right Section: Small Box Component */}
      <div className="min-w-[100px] min-h-[100px] opacity-100 flex items-center justify-center border-2 border-gray-300 rounded-lg bg-white shadow-sm p-2">
        {smallBoxComponent}
      </div>
    </div>
  );
  
};

export default Banner;
