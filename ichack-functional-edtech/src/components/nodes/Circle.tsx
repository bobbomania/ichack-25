import React from 'react';
import { color } from 'framer-motion';
import { ShapeType, Type } from './Type';
import { ShapeData } from './ShapeData';

// Circle Component that accepts size and color as props
interface CircleProps {
  size: number; // size in pixels
  color: string; // color as a string (e.g., "red", "blue", "#ff0000")
}


const Circle = ({ size, color }: CircleProps) => new ShapeData(size, color, ShapeType.CIRCLE)
export default Circle;
