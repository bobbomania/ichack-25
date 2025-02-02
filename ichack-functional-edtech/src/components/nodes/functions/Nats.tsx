import DataObject from "../data/DataObject";
import { NatData } from "../data/NatData";
import { FuncEnum, TypeEnum } from "../Type";
import FunctionNode from "./Function";

export class DivideByTwo extends FunctionNode {  
    constructor() {
      super(FuncEnum.DIVIDE_2, [TypeEnum.NAT], [TypeEnum.NAT]);
    }
  
    // Logic method that changes the color of shape objects
    logic(inputs: NatData[][]): DataObject[] {
      return inputs.map((shape: NatData[], _) => {
        return new NatData(Math.round(shape[0].number / 2))
    });
  
    }
  }
