import { ReactNode } from "react";
import DataObject from "./DataObject";
import { TypeEnum } from "../Type";
import React from "react";

interface ListProps {
    objects: DataObject[]; // size in pixel    
     }    
      
export const ListComponent = ({ objects }: ListProps) => {
return (
    <div
    style={{
        display: "flex",
        justifyContent: "space-between", // Evenly space out the components
        width: "100%",
        alignItems: "center", // Vertically center the items
    }}
    >
    {objects.map((obj, index) => (
        <React.Fragment key={index}>
        {/* Actual component */}
        <div style={{ padding: "0 20px" }}>
            {obj.component}
        </div>

        {/* Vertical line between items, only if not the last item */}
        {index < objects.length - 1 && (
            <div
            style={{
                height: "30px", // Height of the separator
                width: "1px", // Width of the vertical line
                backgroundColor: "rgba(0, 0, 0, 0.2)", // Semi-opaque vertical line color
            }}
            />
        )}
        </React.Fragment>
    ))}
    </div>
);
};
      

export class ListData extends DataObject {
    public size: number;
    public objects: DataObject[];
  
    constructor(objects: DataObject[]) {
      // Get output types safely to prevent errors on empty lists
      const outs = objects.length > 0 ? objects[0].getOutputTypes() : [];
  
      // ✅ Call super() first with a temporary null component
      var comp: ReactNode = ListComponent({ objects });
      super(comp, [TypeEnum.LIST]);
  
      this.size = objects.length;
      this.objects = objects;
    }
  
    logic(inputs: any[]): any[] {
      return [this];
    }
  
    // ✅ Implement `.equals()` method
    equals(other: any): boolean {
      if (!(other instanceof ListData)) return false;
  
      // Compare sizes first for quick elimination
      if (this.size !== other.size) return false;
  
      // Compare each object in the list using `.equals()`
      return this.objects.every((obj, index) => 
        obj.equals(other.objects[index])
      );
    }
  }
  