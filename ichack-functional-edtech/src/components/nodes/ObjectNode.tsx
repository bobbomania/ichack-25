import React, { ReactNode } from "react";
import { InputOutputType, Type } from "./Type";

// Define the types for inputs and outputs

export abstract class ObjectNode {
  protected componentData: ReactNode;
  protected inputTypes: [InputOutputType, ObjectNode  | null][];
  protected outputTypes: InputOutputType[];

  constructor(
    componentData: ReactNode,
    inputTypes: InputOutputType[],
    outputTypes: InputOutputType[]
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
  canConnectInput(type: InputOutputType, value: any, pos: number): boolean {
    const input = this.inputTypes[pos];
    return input[0] == type;
  }

  // Example method to set an input link
  canConnectOutput(type: InputOutputType, value: any, pos: number): boolean {
    const output = this.outputTypes[pos];
    return output[0] == type;
  }

  // Get all input links
  getInputTypes(): [InputOutputType, any][] {
    return this.inputTypes;
  }

  // Get all output links
  getOutputTypes(): InputOutputType[] {
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
