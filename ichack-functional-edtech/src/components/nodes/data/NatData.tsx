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
        public number:  number,
      ) {
        
        var comp: ReactNode = NatComponent({number});
        

        // Call the parent class constructor (ObjectNode)
        super(comp, [TypeEnum.NAT]);
      }

      logic(inputs: any[]): any[] {
        return [this];
      }

       // ✅ Implement `.equals()` method
      equals(other: any): boolean {
        if (!(other instanceof NatData)) return false;
    
        return this.number == other.number
      }
}