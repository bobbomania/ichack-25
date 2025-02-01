// components/Banner.tsx
import React from 'react';

export interface BannerProps {
  description: string;
}

const Banner = ({ description }: BannerProps) => {
  return (
    <div className="flex flex-col items-center p-4">
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Banner;
