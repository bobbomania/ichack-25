import DataObject from "../data/DataObject";
import { NatData } from "../data/NatData";
import { FuncEnum, TypeEnum } from "../Type";
import FunctionNode from "./Function";

export class ListLen extends FunctionNode {  
    constructor() {
      super(FuncEnum.LIST_LEN, TypeEnum[any], [TypeEnum.NAT]);
    }
  
    // Logic method that changes the color of shape objects
    logic(inputs: NatData[][]): DataObject[] {
      return new NatData(inputs[0].length);
  
    }
  }
