import { TypeEnum, FuncEnum, ShapeEnum } from "../Type";
import FunctionNode from "./Function";
import DataObject from "../data/DataObject";
import { ShapeData } from "../data/ShapeData";
import { NatData } from "../data/NatData";

export class MakeRed extends FunctionNode {  
    constructor() {
      super(FuncEnum.MAKE_RED, [TypeEnum.SHAPE], [TypeEnum.SHAPE]);
    }
  
    // Logic method that changes the color of shape objects
    logic(inputs: ShapeData[][]): DataObject[] {
      var out: DataObject[] = inputs.map((shape: ShapeData[], index) => {
          return new ShapeData(shape[0].size, 'red', shape[0].shapeType)
      });
    
      return out;
    }
  }
  
export class MakeGreen extends FunctionNode {  
  constructor() {
    super(FuncEnum.MAKE_GREEN, [TypeEnum.SHAPE], [TypeEnum.SHAPE]);
  }

  // Logic method that changes the color of shape objects
  logic(inputs: ShapeData[][]): DataObject[] {
    var out: DataObject[] = inputs.map((shape: ShapeData[], index) => {
        return new ShapeData(shape[0].size, 'green', shape[0].shapeType)
    });
  
    return out;
  }
}

export class MakeBlue extends FunctionNode {  
  constructor() {
    super(FuncEnum.MAKE_BLUE, [TypeEnum.SHAPE], [TypeEnum.SHAPE]);
  }

  // Logic method that changes the color of shape objects
  logic(inputs: ShapeData[][]): DataObject[] {
    var out: DataObject[] = inputs.map((shape: ShapeData[], index) => {
        return new ShapeData(shape[0].size, 'blue', shape[0].shapeType)
    });
  
    return out;
  }
}



export class MakePolygon extends FunctionNode {  
  constructor() {
    super(FuncEnum.MAKE_POLY, [TypeEnum.NAT], [TypeEnum.SHAPE]);
  }

  // Logic method that changes the color of shape objects
  logic(inputs: NatData[][]): DataObject[] {
    var out: DataObject[] = inputs.map((number: NatData[], index) => {
        switch (number[0].number) {
            case 0:
                return new ShapeData(40, "red", ShapeEnum.CIRCLE)
            case 4:
                return new ShapeData(40, "red", ShapeEnum.RECTANGLE)
            case 3:
                return new ShapeData(40, "red", ShapeEnum.TRIANGLE)
            default:
                throw new Error("wrong sides shape not supported")
        }    });

    return out;
  }
}