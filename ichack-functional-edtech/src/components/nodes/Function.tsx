import React from 'react';
import ObjectNode from './ObjectNode';
import { Type } from './Type';

// Define the types for inputs and outputs
type InputOutputType = typeof Type;

interface FunctionProps {
    name: string,
}

const makeReactComponent = ( name: string ) => {return ( <div><p> {name}  </p></div>
)};


abstract class Function extends ObjectNode {
  constructor(
    functionName: string,
    inputTypes: [InputOutputType, ObjectNode | null][],
    outputTypes: [InputOutputType, ObjectNode | null][]
  ) {
    // Call the parent class constructor (ObjectNode)
        // @ts-ignore

    super(makeReactComponent(functionName), inputTypes, outputTypes);
  }

}

export default Function;
