import { ReactNode } from "react";
import DataObject from "./DataObject";
import { TypeEnum } from "../Type";
import React from "react";

interface ListProps {
    objects: DataObject[]; // size in pixel    
     }    
      
const ListComponent = ({ objects }: ListProps) => {
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
  constructor(objects: DataObject[]) {
    // Get output types safely to prevent errors on empty lists
    const outs = objects.length > 0 ? objects[0].getOutputTypes() : [];

    var comp: ReactNode = ListComponent({objects});
        
    // ✅ Call super() first with a temporary null component
    super(comp, outs);
  }

  logic(inputs: any[]): any[] {
    return [this];
  }
}
