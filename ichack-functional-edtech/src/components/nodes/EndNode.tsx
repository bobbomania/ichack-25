import React, { ReactNode } from 'react';
import ObjectNode from './ObjectNode';
import { TypeEnum } from './Type';
import DataObject from './data/DataObject';


import { CheckCircleIcon } from '@heroicons/react/24/solid';

const WrappedWithCheckmark = ({ children }) => (
  <div className="flex items-center relative">
    <CheckCircleIcon className="w-6 h-6 text-green-500 mr-2" />
    <div className="relative">
      {children}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30"></div>
    </div>
  </div>
);




interface props {
    children: any,
    onPlay: any
}


class EndNode_In extends ObjectNode {
    target;
        constructor(comp: ReactNode, target: DataObject) {
    // Call the super constructor first, before accessing `this`
    super(comp, [TypeEnum.ANY], []);
    this.target = target;
  }

  render(): ReactNode {
    return (
        <div className="relative flex flex-col min-w-[100px] min-h-[100px] w-fit h-fit border-2 border-gray-300 rounded-lg overflow-hidden">
          {/* Top Banner with Play Button */}
          <div className="flex justify-end bg-gray-100 py-1 px-3 shadow-sm">
            <button
              onClick={this.updateComponent}
              className="w-5 h-5 flex items-center justify-center bg-blue-500 text-white text-[8px] font-semibold rounded-full shadow hover:bg-blue-600 transition"
            >
              Go
            </button>
          </div>
      
          {/* Content Area */}
          <div className="flex flex-1 items-center justify-center p-2">
            {this.currentComponentData}
          </div>
        </div>
      );
      
      
  }
  

  updateComponent = () => {
    if (this.inputTypes.length > 0 && this.inputTypes[0][1] != null ) {
        var final_out = this.inputTypes[0][1].run()
        console.log(final_out)
        if (final_out.length != 1) {
            alert("You misconnected the inputs!")
        } else {
            if (this.target.equals(final_out[0])) {
              console.log("SUCC")
              this.updateComponentData(WrappedWithCheckmark(final_out[0].render()))
            }
            else {
              this.updateComponentData(final_out[0].render());
            }
            
        }
    } else {
        alert("Uh oh not connected")
    }

  }

  logic(inputs: DataObject[][]): DataObject[] {
    return [];  
  }

}

const EndNode = (target: DataObject) => { return new EndNode_In(<div/>, target) }

export default EndNode;