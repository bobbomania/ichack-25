import React, { ReactElement, ReactNode } from "react";
import { TypeEnum } from "../Type";
import FunctionNode from "./Function";
import DataObject from "../data/DataObject";
import { ShapeData } from "../data/ShapeData";

export class MakeRed extends FunctionNode {  
    constructor() {
      super("Make Red", [TypeEnum.NUMBER], [TypeEnum.SHAPE]);
    }
  
    // Logic method that changes the color of shape objects
    logic(inputs: any[]): any[] {
      return inputs.map((shape) => ({
        ...shape,
        color: 'red',
      }));
    }
  }
  
export class MakeGreen extends FunctionNode {  
  constructor() {
    super("Make Green", [TypeEnum.SHAPE], [TypeEnum.SHAPE]);
  }

  // Logic method that changes the color of shape objects
  logic(inputs: any[]): any[] {
    return inputs.map((shape) => ({
      ...shape,
      color: 'green',
    }));
  }
}

export class MakeBlue extends FunctionNode {  
  constructor() {
    super("Make Blue", [TypeEnum.SHAPE], [TypeEnum.SHAPE]);
  }

  // Logic method that changes the color of shape objects
  logic(inputs: ShapeData[][]): DataObject[] {
    var out: DataObject[] = inputs.map((shape: ShapeData[], index) => {
        return new ShapeData(shape[0].size, 'blue', shape[0].shapeType)
    });
  
    return out;
  }
}
