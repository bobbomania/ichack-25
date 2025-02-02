import { TypeEnum, FuncEnum } from "../Type";
import FunctionNode from "./Function";
import DataObject from "../data/DataObject";
import { ShapeData } from "../data/ShapeData";

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
