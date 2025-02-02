import React, { ReactNode } from 'react';
import ObjectNode from './ObjectNode';
import { TypeEnum } from './Type';
import DataObject from './data/DataObject';

interface props {
    children: any,
    onPlay: any
}


class EndNode_In extends ObjectNode {

        constructor(comp: ReactNode) {
    // Call the super constructor first, before accessing `this`
    super(comp, [TypeEnum.ANY], []);
  }

  render(): ReactNode {
    return (
        <div className="relative w-[400px] h-[400px] border-2 border-gray-300 rounded-lg overflow-hidden flex items-center justify-center">
        {/* Top Banner with Play Button */}
        <div className="absolute top-0 w-full bg-white-100 py-1 px-3 flex justify-end shadow-sm">
            <button
            onClick={this.updateComponent}
            className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white text-xs font-semibold rounded-full shadow hover:bg-blue-600 transition"
            >
            Go
            </button>
        </div>
    
        {/* Content */}
        <div className="w-full h-full flex">{this.currentComponentData}</div>
        </div>
    );
  }

  updateComponent = () => {
    if (this.inputTypes.length > 0 && this.inputTypes[0][1] != null ) {
        var final_out = this.inputTypes[0][1].run()
        if (final_out.length != 1) {
            alert("You misconnected the inputs!")
        } else {
            this.updateComponentData(final_out[0].render())
        }
    } else {
        alert("Uh oh not connected")
    }

  }

  logic(inputs: DataObject[][]): DataObject[] {
    return [];  
  }

}

const EndNode = new EndNode_In(<div/>)

export default EndNode;
