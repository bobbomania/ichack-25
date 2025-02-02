import { ReactNode } from "react";
import { TypeEnum, ShapeEnum } from "../Type";
import DataObject from "./DataObject";

// Circle Component that accepts size and color as props
interface NatProps {
    number: number; // size in pixels
      }
  
 
      
const NatComponent = ({ number }: NatProps) => {
  return <div>{number}</div>;
};
      
  
export class NatData extends DataObject {
      constructor(
        protected number:  number,
      ) {
        
        var comp: ReactNode = NatComponent({number});
        

        // Call the parent class constructor (ObjectNode)
        super(comp, [TypeEnum.NAT]);
      }

      logic(inputs: any[]): any[] {
        return [{'number': this.number}];
      }
}