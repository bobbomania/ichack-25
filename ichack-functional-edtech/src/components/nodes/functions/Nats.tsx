import DataObject from "../data/DataObject";
import { NatData } from "../data/NatData";
import { FuncEnum, TypeEnum } from "../Type";
import FunctionNode from "./Function";

export class MultiplyByTwo extends FunctionNode {  
    constructor() {
      super(FuncEnum.MULTIPLY_2, [TypeEnum.NAT], [TypeEnum.NAT]);
    }
  
    // Logic method that changes the color of shape objects
    logic(inputs: NatData[][]): DataObject[] {
      return inputs.map((shape: NatData[], _) => {
        return new NatData(shape[0].number * 2)
    });
  
    }
  }
