// components/Banner.tsx
import React from 'react';

export interface BannerProps {
  description: string;
  number: number;
}

const Banner = ({ description, number }: BannerProps) => {
  return (
    <div className="text-center">
    <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Problem {number}</h2>
    <p className="text-xl text-gray-600">
      {description}
    </p>
    </div>
  );
};

export default Banner;
