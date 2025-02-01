import { ReactNode } from "react";
import { TypeEnum, ShapeEnum } from "../Type";
import DataObject from "./DataObject";

// Circle Component that accepts size and color as props
interface ShapeProps {
    size: number; // size in pixels
    color: string; // color as a string (e.g., "red", "blue", "#ff0000")
      }
  
const CircleComponent = ({ size, color }: ShapeProps) => {
    const circleStyle = {
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: color,
      borderRadius: '50%', // makes it a circle
    };
  
    return <div style={circleStyle} />;
  };

  const TriangleComponent = ({ size, color }: ShapeProps) => {
    const triangleStyle = {
      width: "0px",
      height: "0px",
      borderLeft: `${size / 2}px solid transparent`,
      borderRight: `${size / 2}px solid transparent`,
      borderBottom: `${size}px solid ${color}`,
    };
  
    return <div style={triangleStyle} />;
  };
  const RectangleComponent = ({ size, color }: ShapeProps) => {
    const rectangleStyle = {
      width: `${size * 1.5}px`,
      height: `${size}px`,
      backgroundColor: color,
      borderRadius: "10px", // Slightly rounded corners for a smooth look
    };
  
    return <div style={rectangleStyle} />;
  };

  
export class ShapeData extends DataObject {
      constructor(
        protected size:  number,
        protected color: string,
        protected shapeType: ShapeEnum,
      ) {
        
        var comp: ReactNode = null;
        switch (shapeType) {
            case ShapeEnum.CIRCLE: 
                comp = CircleComponent({size, color});
                break;
            
            case ShapeEnum.TRIANGLE:
                comp = TriangleComponent({size, color});
                break;
            
            case ShapeEnum.RECTANGLE:
                comp = RectangleComponent({size, color});
                break;
            default:
                throw new Error(`Shape type '${shapeType}' is not implemented`);
            
        }

        // Call the parent class constructor (ObjectNode)
        super(comp, [TypeEnum.SHAPE]);
      }

      logic(inputs: any[]): any[] {
        return [{'size': this.size, 'color': this.color}];
      }
}