"use client"
import DataObject from "../data/DataObject";
import { ListData } from "../data/ListData";
import { NatData } from "../data/NatData";
import { FuncEnum, TypeEnum } from "../Type";
import FunctionNode from "./Function";

export class ListLen extends FunctionNode {  
    constructor() {
      super(FuncEnum.LIST_LEN, [TypeEnum.LIST], [TypeEnum.NAT]);
    }
  
    // Logic method that changes the color of shape objects
    logic(inputs: ListData[][]): DataObject[] {
        console.log("inputs are", inputs)
        var out: DataObject[] = inputs.map((elem: ListData[], _) => {
            return new NatData(elem[0].size)
        });
      
        return out;
      }
  }

export class FilterEven extends FunctionNode {  
    constructor() {
        super(FuncEnum.FILTER_EVEN, [TypeEnum.LIST], [TypeEnum.NAT]);
    }

    // Logic method that changes the color of shape objects
    logic(inputs: ListData[][]): DataObject[] {
        console.log("inputs are", inputs);

        var out: DataObject[] = inputs.map((elem: ListData[]) => {
            // Assume elem[0].objects is an array of objects we want to filter
            const filteredObjects = elem[0].objects.filter((obj: any) => {
                // Cast each object to NatData
                const natData = obj as unknown as NatData;

                // Check if the number field is even
                return natData.number % 2 === 0;
            });

            // If there are any valid objects after filtering, return them as new NatData instances
            const new_objs = filteredObjects.map((obj: any) => new NatData(obj.number));
            return new ListData(new_objs)
        }).flat(); // Flatten the result to get a single array of NatData instances

        return out;
}
}

export class FilterOdd extends FunctionNode {  
    constructor() {
        super(FuncEnum.FILTER_ODD, [TypeEnum.LIST], [TypeEnum.NAT]);
    }

    // Logic method that changes the color of shape objects
    logic(inputs: ListData[][]): DataObject[] {
        var out: DataObject[] = inputs.map((elem: ListData[]) => {
            // Assume elem[0].objects is an array of objects we want to filter
            const filteredObjects = elem[0].objects.filter((obj: any) => {
                // Cast each object to NatData
                const natData = obj as unknown as NatData;

                // Check if the number field is ODD
                return natData.number % 2 !== 0;
            });

            // If there are any valid objects after filtering, return them as new NatData instances
            const new_objs = filteredObjects.map((obj: any) => new NatData(obj.number));
            return new ListData(new_objs)
        }).flat(); // Flatten the result to get a single array of NatData instances

        return out;
}
}
