import { ReactNode } from "react";
import { TypeEnum } from "./Type";

// Define the types for inputs and outputs

export abstract class ObjectNode {
  protected componentData: ReactNode;
  protected inputTypes: [TypeEnum, ObjectNode  | null][];
  protected outputTypes: TypeEnum[];

  constructor(
    componentData: ReactNode,
    inputTypes: TypeEnum[],
    outputTypes: TypeEnum[]
  ) {
    this.componentData = componentData;
    // Initialize input and output links with null values
    this.inputTypes = inputTypes.map((type) => [type, null]);
    this.outputTypes = outputTypes;
  }

  // Render function returns the React component
  render(): ReactNode {
    return this.componentData;
  }

  // Example method to set an input link
  canConnectToInput(types: TypeEnum[]): TypeEnum | null {
    for (var i=0; i < this.inputTypes.length; i++) {
      var currInput = this.inputTypes[i];
      for (var j=0; j < types.length; j++) {
        if (currInput[1] == null && currInput[0] == types[j]) {
          return types[j];
        }
      }
    }

    return null;
  }

  connectInput(type: TypeEnum, obj: ObjectNode): void {
    for (var i=0; i < this.inputTypes.length; i++) {
      if (this.inputTypes[i][0] == type) {
        this.inputTypes[i][1] = obj;
        return;
      }
    }
  }

  // Get all input links
  getInputTypes(): [TypeEnum, any][] {
    return this.inputTypes;
  }

  // Get all output links
  getOutputTypes(): TypeEnum[] {
    return this.outputTypes;
  }

    // The run method that does something with the inputs and outputs
    run(): any {
      // Example logic for running the function: process inputs and produce outputs
      const inputs = this.getInputTypes().map(([type, value]) => value);
      const outputs = this.logic(inputs);  // Call the logic method
  
      // caching
      // // Set the output values
      // this.getOutputTypes().forEach(([type, output], index) => {
      //   // Assuming we map outputs to corresponding links
      //   this.outputTypes[index][1] = outputs[index];  // Set output value
      // });
  
      return outputs;
    }


// Abstract method where the function's logic is implemented by subclasses
abstract logic(inputs: any[]): any[];  
}

export default ObjectNode;
