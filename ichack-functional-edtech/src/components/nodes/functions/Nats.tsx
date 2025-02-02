import { FuncEnum, TypeEnum } from "../Type";
import FunctionNode from "./Function";

export class MultiplyByTwo extends FunctionNode {  
    constructor() {
      super(FuncEnum.MULTIPLY_2, [TypeEnum.NAT], [TypeEnum.NAT]);
    }
  
    // Logic method that changes the color of shape objects
    logic(inputs: any[]): any[] {
      return inputs.map((nat) => ({
        ...nat,
        number: nat * 2,
      }));
    }
  }
