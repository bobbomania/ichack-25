import { TypeEnum, FuncEnum } from "../Type";
import FunctionNode from "./Function";

export class MakeRed extends FunctionNode {  
    constructor() {
      super(FuncEnum.MAKE_RED, [TypeEnum.NUMBER], [TypeEnum.SHAPE]);
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
    super(FuncEnum.MAKE_GREEN, [TypeEnum.SHAPE], [TypeEnum.SHAPE]);
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
    super(FuncEnum.MAKE_BLUE, [TypeEnum.SHAPE], [TypeEnum.SHAPE]);
  }

  // Logic method that changes the color of shape objects
  logic(inputs: any[]): any[] {
    return inputs.map((shape) => ({
      ...shape,
      color: 'blue',
    }));
  }
}
